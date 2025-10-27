# Diagramas de Secuencia - Flujos Principales

## 1. Autenticación y Login

```mermaid
sequenceDiagram
    actor Usuario
    participant LoginComponent
    participant AuthService
    participant HttpClient
    participant AuthController
    participant UserService
    participant DB
    participant TokenService

    Usuario->>LoginComponent: Ingresar credenciales
    LoginComponent->>LoginComponent: Validar formulario
    LoginComponent->>AuthService: login(username, password)
    AuthService->>HttpClient: POST /api/auth/login
    HttpClient->>AuthController: {username, password}

    AuthController->>UserService: ValidateCredentials(username, password)
    UserService->>DB: SELECT * FROM Operador WHERE login = ?
    DB-->>UserService: Usuario encontrado
    UserService->>UserService: VerifyPassword(password, hash)

    alt Credenciales válidas
        UserService-->>AuthController: Usuario válido
        AuthController->>TokenService: GenerateJWT(usuario)
        TokenService-->>AuthController: JWT Token
        AuthController-->>HttpClient: {token, usuario, permisos}
        HttpClient-->>AuthService: Response OK
        AuthService->>AuthService: guardarToken(token)
        AuthService->>AuthService: guardarUsuario(usuario)
        AuthService-->>LoginComponent: Login exitoso
        LoginComponent->>LoginComponent: Navegar a /dashboard
        LoginComponent-->>Usuario: Mostrar dashboard
    else Credenciales inválidas
        UserService-->>AuthController: Credenciales inválidas
        AuthController-->>HttpClient: 401 Unauthorized
        HttpClient-->>AuthService: Error
        AuthService-->>LoginComponent: Error de autenticación
        LoginComponent-->>Usuario: Mostrar mensaje de error
    end
```

---

## 2. Creación de Campaña

```mermaid
sequenceDiagram
    actor Usuario
    participant CampanaComponent
    participant CampanaService
    participant Store
    participant API
    participant CampanaController
    participant CampanaUseCase
    participant CampanaRepository
    participant DB

    Usuario->>CampanaComponent: Completar formulario
    Usuario->>CampanaComponent: Click en "Guardar"

    CampanaComponent->>CampanaComponent: Validar formulario
    CampanaComponent->>CampanaService: crearCampana(datos)
    CampanaService->>API: POST /api/campanas

    API->>CampanaController: {campanaDto}
    CampanaController->>CampanaController: Validar JWT
    CampanaController->>CampanaController: Validar permisos
    CampanaController->>CampanaUseCase: Crear(campanaDto)

    CampanaUseCase->>CampanaUseCase: ValidarDatos(campanaDto)
    CampanaUseCase->>CampanaUseCase: MapearACampana(dto)
    CampanaUseCase->>CampanaRepository: Add(campana)

    CampanaRepository->>DB: INSERT INTO Campana
    DB-->>CampanaRepository: Id generado
    CampanaRepository-->>CampanaUseCase: Campaña creada

    CampanaUseCase->>CampanaUseCase: MapearADto(campana)
    CampanaUseCase-->>CampanaController: CampanaDto
    CampanaController-->>API: 201 Created

    API-->>CampanaService: Campaña creada
    CampanaService->>Store: dispatch(agregarCampana)
    Store-->>CampanaComponent: Estado actualizado
    CampanaComponent-->>Usuario: Mostrar éxito + Navegar a detalle
```

---

## 3. Asignación de Operador a Grupo

```mermaid
sequenceDiagram
    actor Supervisor
    participant GrupoComponent
    participant OperadorSelector
    participant GrupoService
    participant API
    participant GrupoController
    participant GrupoUseCase
    participant OperadorRepository
    participant GrupoRepository
    participant DB

    Supervisor->>GrupoComponent: Abrir grupo
    GrupoComponent->>GrupoService: obtenerGrupo(id)
    GrupoService->>API: GET /api/grupos/{id}
    API-->>GrupoService: Grupo con operadores
    GrupoService-->>GrupoComponent: Grupo

    GrupoComponent-->>Supervisor: Mostrar detalle del grupo
    Supervisor->>GrupoComponent: Click "Asignar operador"
    GrupoComponent->>OperadorSelector: Abrir modal

    OperadorSelector->>GrupoService: obtenerOperadoresDisponibles()
    GrupoService->>API: GET /api/operadores?disponibles=true
    API-->>OperadorSelector: Lista de operadores
    OperadorSelector-->>Supervisor: Mostrar operadores

    Supervisor->>OperadorSelector: Seleccionar operador
    Supervisor->>OperadorSelector: Establecer prioridad
    Supervisor->>OperadorSelector: Click "Asignar"

    OperadorSelector->>GrupoService: asignarOperador(grupoId, operadorId, prioridad)
    GrupoService->>API: POST /api/grupos/{id}/operadores

    API->>GrupoController: {operadorId, prioridad}
    GrupoController->>GrupoUseCase: AsignarOperador(grupoId, operadorId, prioridad)

    GrupoUseCase->>OperadorRepository: GetById(operadorId)
    OperadorRepository->>DB: SELECT * FROM Operador
    DB-->>OperadorRepository: Operador

    GrupoUseCase->>GrupoRepository: GetById(grupoId)
    GrupoRepository->>DB: SELECT * FROM GrupoAtencion
    DB-->>GrupoRepository: Grupo

    GrupoUseCase->>GrupoUseCase: ValidarAsignacion()
    GrupoUseCase->>GrupoRepository: AsignarOperador(grupo, operador, prioridad)
    GrupoRepository->>DB: INSERT INTO OperadorGrupo
    DB-->>GrupoRepository: OK

    GrupoRepository-->>GrupoUseCase: Asignación exitosa
    GrupoUseCase-->>GrupoController: OK
    GrupoController-->>API: 200 OK

    API-->>GrupoService: Asignación exitosa
    GrupoService-->>OperadorSelector: OK
    OperadorSelector->>OperadorSelector: Cerrar modal
    OperadorSelector->>GrupoComponent: actualizar()
    GrupoComponent-->>Supervisor: Mostrar operador asignado
```

---

## 4. Supervisión de Campaña en Tiempo Real

```mermaid
sequenceDiagram
    actor Supervisor
    participant SupervisionComponent
    participant WebSocketService
    participant SupervisionService
    participant API
    participant SignalRHub
    participant CampanaService
    participant DB
    participant Redis

    Supervisor->>SupervisionComponent: Abrir supervisión
    SupervisionComponent->>SupervisionService: obtenerDatosCampana(id)
    SupervisionService->>API: GET /api/campanas/{id}/supervison
    API-->>SupervisionService: Datos iniciales
    SupervisionService-->>SupervisionComponent: Datos

    SupervisionComponent->>WebSocketService: conectar(campanaid)
    WebSocketService->>SignalRHub: Connect
    SignalRHub->>SignalRHub: JoinGroup(campanaId)
    SignalRHub-->>WebSocketService: Conectado
    WebSocketService-->>SupervisionComponent: Conexión establecida

    SupervisionComponent-->>Supervisor: Mostrar dashboard

    loop Cada 5 segundos
        CampanaService->>DB: Consultar métricas
        DB-->>CampanaService: Métricas actualizadas
        CampanaService->>Redis: Actualizar caché
        CampanaService->>SignalRHub: PublishUpdate(campanaId, metricas)
        SignalRHub->>WebSocketService: Notificar actualización
        WebSocketService->>SupervisionComponent: onUpdate(metricas)
        SupervisionComponent->>SupervisionComponent: Actualizar gráficos
        SupervisionComponent-->>Supervisor: Vista actualizada
    end

    Note over Supervisor,Redis: Actualización en tiempo real de:<br/>- Llamadas activas<br/>- Operadores disponibles<br/>- Registros procesados<br/>- Resultados de negocio

    Supervisor->>SupervisionComponent: Cerrar supervisión
    SupervisionComponent->>WebSocketService: desconectar()
    WebSocketService->>SignalRHub: Disconnect
    SignalRHub->>SignalRHub: LeaveGroup(campanaId)
```

---

## 5. Llamada Saliente (Outbound)

```mermaid
sequenceDiagram
    actor Operador
    participant AgentApp
    participant CampanaService
    participant API
    participant PersuaderService
    participant RegistroRepository
    participant TelephonyService
    participant AsteriskAPI
    participant DB

    Operador->>AgentApp: Estado "Disponible"
    AgentApp->>CampanaService: obtenerProximoRegistro()
    CampanaService->>API: POST /api/campanas/siguiente-registro

    API->>PersuaderService: ObtenerProximoRegistro(operadorId)
    PersuaderService->>PersuaderService: AplicarAlgoritmoPrediccion()
    PersuaderService->>RegistroRepository: GetProximoRegistro(criteria)

    RegistroRepository->>DB: Query con filtros y prioridades
    DB-->>RegistroRepository: Registro
    RegistroRepository-->>PersuaderService: Registro

    PersuaderService->>RegistroRepository: MarcarComoEnProceso(registroId, operadorId)
    RegistroRepository->>DB: UPDATE Registro

    PersuaderService-->>API: RegistroDto
    API-->>CampanaService: Registro
    CampanaService-->>AgentApp: Registro asignado

    AgentApp-->>Operador: Mostrar datos del cliente

    alt Marcación Manual
        Operador->>AgentApp: Click "Llamar"
        AgentApp->>TelephonyService: iniciarLlamada(telefono)
    else Marcación Predictiva
        API->>TelephonyService: iniciarLlamadaAutomatica(telefono, operadorId)
    end

    TelephonyService->>AsteriskAPI: Originate(telefono, extension)
    AsteriskAPI-->>TelephonyService: Call initiated
    TelephonyService->>DB: INSERT INTO Llamada (estado='iniciada')

    TelephonyService-->>AgentApp: Llamada en curso
    AgentApp-->>Operador: Estado "En llamada"

    alt Cliente contesta
        AsteriskAPI->>TelephonyService: CallAnswered
        TelephonyService->>DB: UPDATE Llamada (estado='contestada')
        TelephonyService-->>AgentApp: Cliente contestó
        AgentApp-->>Operador: Iniciar conversación

        Note over Operador,DB: Conversación...

        Operador->>AgentApp: Finalizar y tipificar
        AgentApp->>AgentApp: Mostrar modal tipificación
        Operador->>AgentApp: Seleccionar tipificación
        AgentApp->>CampanaService: tipificarLlamada(llamadaId, tipificacion)
        CampanaService->>API: POST /api/llamadas/{id}/tipificar
        API->>DB: UPDATE Registro + Llamada

    else Cliente no contesta
        AsteriskAPI->>TelephonyService: CallNoAnswer
        TelephonyService->>DB: UPDATE Llamada (estado='no_contestada')
        TelephonyService->>RegistroRepository: IncrementarIntentos(registroId)
        RegistroRepository->>DB: UPDATE Registro
    end

    TelephonyService->>AgentApp: Llamada finalizada
    AgentApp->>Operador: Estado "Disponible"
```

---

## 6. Gestión de Chat

```mermaid
sequenceDiagram
    actor Cliente
    actor Operador
    participant ChatWidget
    participant ChatServer
    participant Cola
    participant AgentApp
    participant ChatService
    participant DB

    Cliente->>ChatWidget: Iniciar chat
    ChatWidget->>ChatWidget: Mostrar formulario pre-chat
    Cliente->>ChatWidget: Completar formulario

    ChatWidget->>ChatServer: POST /api/chat/iniciar
    ChatServer->>DB: INSERT INTO GestionChat
    ChatServer->>Cola: EnqueueChat(gestionId, datos)
    Cola-->>ChatServer: Chat encolado
    ChatServer-->>ChatWidget: {chatId, posicionCola}

    ChatWidget-->>Cliente: "Espere su turno..."

    Note over Cola,AgentApp: Sistema de distribución

    Cola->>Cola: ObtenerOperadorDisponible()
    Cola->>AgentApp: AsignarChat(operadorId, chatId)
    AgentApp-->>Operador: Nuevo chat asignado

    Operador->>AgentApp: Aceptar chat
    AgentApp->>ChatService: aceptarChat(chatId)
    ChatService->>DB: UPDATE GestionChat (operadorId, estado)
    ChatService->>ChatServer: ChatAceptado(chatId)
    ChatServer->>ChatWidget: Operador asignado

    ChatWidget-->>Cliente: Conectado con operador

    loop Conversación
        alt Cliente envía mensaje
            Cliente->>ChatWidget: Escribir mensaje
            ChatWidget->>ChatServer: SendMessage(chatId, mensaje)
            ChatServer->>DB: INSERT INTO MensajeChat
            ChatServer->>AgentApp: NotifyMessage(operadorId, mensaje)
            AgentApp-->>Operador: Mostrar mensaje del cliente
        else Operador envía mensaje
            Operador->>AgentApp: Escribir mensaje
            AgentApp->>ChatService: enviarMensaje(chatId, mensaje)
            ChatService->>DB: INSERT INTO MensajeChat
            ChatService->>ChatServer: SendToClient(chatId, mensaje)
            ChatServer->>ChatWidget: NotifyMessage(mensaje)
            ChatWidget-->>Cliente: Mostrar mensaje del operador
        end
    end

    alt Cliente cierra chat
        Cliente->>ChatWidget: Cerrar chat
        ChatWidget->>ChatServer: CloseChat(chatId)
    else Operador cierra chat
        Operador->>AgentApp: Finalizar chat
        AgentApp->>ChatService: finalizarChat(chatId)
        ChatService->>ChatServer: CloseChat(chatId)
    end

    ChatServer->>DB: UPDATE GestionChat (fecha_fin, duracion)
    ChatServer->>AgentApp: ChatFinalizado
    ChatServer->>ChatWidget: ChatFinalizado

    AgentApp->>AgentApp: Mostrar formulario post-chat
    Operador->>AgentApp: Tipificar y agregar notas
    AgentApp->>ChatService: guardarTipificacion(chatId, tipificacion)
    ChatService->>DB: UPDATE GestionChat

    AgentApp-->>Operador: Chat finalizado
    ChatWidget-->>Cliente: Gracias por contactarnos
```

---

## 7. Reprogramación de Registros

```mermaid
sequenceDiagram
    actor Sistema
    participant ReprogramacionJob
    participant ReprogramacionService
    participant CampanaRepository
    participant RegistroRepository
    participant ReglaRepository
    participant DB

    Sistema->>ReprogramacionJob: Ejecutar (cada hora)
    ReprogramacionJob->>ReprogramacionService: EjecutarReprogramaciones()

    ReprogramacionService->>CampanaRepository: GetCampanasActivas()
    CampanaRepository->>DB: SELECT * FROM Campana WHERE activa = true
    DB-->>CampanaRepository: Lista de campañas

    loop Para cada campaña
        ReprogramacionService->>CampanaRepository: GetReprogramacion(campanaId)
        CampanaRepository->>DB: SELECT * FROM Reprogramacion
        DB-->>CampanaRepository: Configuración

        ReprogramacionService->>ReglaRepository: GetReglas(reprogramacionId)
        ReglaRepository->>DB: SELECT * FROM ReglaReprogramacion
        DB-->>ReglaRepository: Reglas

        ReprogramacionService->>RegistroRepository: GetRegistrosParaReprogramar(campanaId)
        RegistroRepository->>DB: Query con condiciones
        DB-->>RegistroRepository: Registros

        loop Para cada registro
            ReprogramacionService->>ReprogramacionService: AplicarReglas(registro, reglas)

            alt Debe reprogramarse
                ReprogramacionService->>ReprogramacionService: CalcularNuevaFecha(registro, regla)
                ReprogramacionService->>RegistroRepository: Reprogramar(registroId, nuevaFecha)
                RegistroRepository->>DB: UPDATE Registro SET fecha_reprogramada
                DB-->>RegistroRepository: OK

                ReprogramacionService->>DB: INSERT INTO HistoricoReprogramacion
            else No se reprograma
                Note over ReprogramacionService: Registro no cumple condiciones
            end
        end
    end

    ReprogramacionService-->>ReprogramacionJob: Proceso completado
    ReprogramacionJob->>ReprogramacionJob: Log resultado
```

---

## 8. Exportación de Datos (Excel)

```mermaid
sequenceDiagram
    actor Usuario
    participant DataTableComponent
    participant ExportService
    participant API
    participant ExportController
    participant ReportService
    participant RegistroRepository
    participant DB
    participant ExcelGenerator

    Usuario->>DataTableComponent: Click "Exportar a Excel"
    DataTableComponent->>DataTableComponent: Mostrar opciones de exportación
    Usuario->>DataTableComponent: Seleccionar filtros y campos

    DataTableComponent->>ExportService: exportarExcel(filtros, campos)
    ExportService->>API: POST /api/export/registros/excel

    API->>ExportController: {filtros, campos}
    ExportController->>ExportController: Validar permisos
    ExportController->>ReportService: GenerarExcelRegistros(filtros, campos)

    ReportService->>RegistroRepository: GetConFiltros(filtros)
    RegistroRepository->>DB: Query con filtros
    DB-->>RegistroRepository: Datos (puede ser mucho volumen)

    alt Datos > 10,000 registros
        RegistroRepository-->>ReportService: Procesar en lotes
        loop Por cada lote
            ReportService->>ExcelGenerator: AgregarFilas(lote)
        end
    else Datos <= 10,000
        ReportService->>ExcelGenerator: GenerarExcel(datos, campos)
    end

    ExcelGenerator->>ExcelGenerator: Crear libro Excel
    ExcelGenerator->>ExcelGenerator: Aplicar estilos
    ExcelGenerator->>ExcelGenerator: Agregar encabezados
    ExcelGenerator->>ExcelGenerator: Agregar datos
    ExcelGenerator-->>ReportService: Archivo Excel

    ReportService-->>ExportController: byte[] archivo
    ExportController-->>API: File(archivo, "application/xlsx")

    API-->>ExportService: Blob
    ExportService->>ExportService: Crear URL temporal
    ExportService->>ExportService: Descargar archivo
    ExportService-->>DataTableComponent: Descarga iniciada

    DataTableComponent-->>Usuario: "Archivo descargado"
```

---

## Patrones Observados

1. **Request-Response**: Patrón estándar para operaciones CRUD
2. **WebSocket/SignalR**: Para actualizaciones en tiempo real
3. **Job/Background Task**: Para procesos batch como reprogramaciones
4. **Queue Pattern**: Para gestión de chats y llamadas
5. **Retry Pattern**: Para llamadas que no se completan
6. **Circuit Breaker**: Para llamadas a APIs externas
