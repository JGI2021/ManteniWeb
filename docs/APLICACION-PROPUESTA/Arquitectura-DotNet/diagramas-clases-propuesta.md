# Diagramas de Clases - Módulos Tiphone v6

## 1. Módulo de Campañas

```mermaid
classDiagram
    class Campana {
        +int Id
        +string Alias
        +string Descripcion
        +int TipoOperacionId
        +int CalendarioId
        +int? PrediccionId
        +int? ReprogramacionId
        +bool Activa
        +DateTime FechaInicio
        +DateTime? FechaFin
        +List~Lista~ Listas
        +List~Filtro~ Filtros
        +List~ResultadoNegocio~ Resultados
        +TipoOperacion TipoOperacion
        +Calendario Calendario
        +Prediccion Prediccion
        +Reprogramacion Reprogramacion
        +AgregarLista(Lista lista)
        +ActivarCampana()
        +DesactivarCampana()
        +ObtenerEstadisticas()
    }

    class Lista {
        +int Id
        +int CampanaId
        +string Nombre
        +string Descripcion
        +int TotalRegistros
        +bool Activa
        +Campana Campana
        +List~Registro~ Registros
        +List~OperadorLista~ OperadoresAsignados
        +AgregarRegistro(Registro registro)
        +AsignarOperador(Operador operador)
        +ObtenerRegistrosPendientes()
        +CalcularProgreso()
    }

    class Registro {
        +long Id
        +int ListaId
        +string ClienteId
        +string Telefono
        +int? ResultadoNegocioId
        +int? TipificacionPrimariaId
        +int? TipificacionSecu

ndariaId
        +DateTime FechaAlta
        +DateTime? FechaUltimoIntento
        +int Intentos
        +int Prioridad
        +int Peso
        +Dictionary~string,object~ DatosAdicionales
        +Lista Lista
        +ResultadoNegocio Resultado
        +Tipificar(int primaria, int secundaria)
        +IncrementarIntentos()
        +ActualizarPrioridad(int nuevaPrioridad)
    }

    class Filtro {
        +int Id
        +int ListaId
        +string Nombre
        +int CondicionId
        +Dictionary~string,object~ Parametros
        +Lista Lista
        +Condicion Condicion
        +Aplicar()
        +Validar()
    }

    class ResultadoNegocio {
        +int Id
        +int CampanaId
        +string Codigo
        +string Descripcion
        +bool RequiereReprogramacion
        +Campana Campana
    }

    class TipoOperacion {
        +int Id
        +string Nombre
        +string Descripcion
        +TipoEjecucion TipoEjecucion
        +TipoFuncion TipoFuncion
        +bool GrabarVoz
        +bool MultiplesInstancias
        +string Url
        +Dictionary~string,object~ Parametros
        +Ejecutar()
        +Validar()
    }

    Campana "1" *-- "*" Lista
    Campana "1" *-- "*" Filtro
    Campana "1" *-- "*" ResultadoNegocio
    Campana "*" --> "1" TipoOperacion
    Lista "1" *-- "*" Registro
    Filtro "*" --> "1" Lista
    Registro "*" --> "0..1" ResultadoNegocio
```

---

## 2. Módulo de Operadores y Grupos

```mermaid
classDiagram
    class Operador {
        +int Id
        +string Login
        +string Nombre
        +string PasswordHash
        +int RolId
        +bool Activo
        +DateTime FechaAlta
        +DateTime? UltimoAcceso
        +Rol Rol
        +List~OperadorGrupo~ Grupos
        +List~OperadorSkill~ Skills
        +List~OperadorLista~ Listas
        +CambiarPassword(string nuevaPassword)
        +AsignarGrupo(GrupoAtencion grupo, int prioridad)
        +AsignarSkill(Skill skill, int prioridad)
        +VerificarPermiso(string permiso)
        +ObtenerEstadisticas()
    }

    class Rol {
        +int Id
        +string Nombre
        +string Descripcion
        +List~string~ Permisos
        +AgregarPermiso(string permiso)
        +QuitarPermiso(string permiso)
        +TienePermiso(string permiso)
    }

    class GrupoAtencion {
        +int Id
        +string Nombre
        +string Descripcion
        +int CalendarioId
        +int? PerfilTipificacionId
        +int Prioridad
        +bool Activo
        +Calendario Calendario
        +PerfilTipificacion PerfilTipificacion
        +List~OperadorGrupo~ Operadores
        +List~GrupoCanal~ Canales
        +AgregarOperador(Operador operador, int prioridad)
        +AsignarCanal(Canal canal)
        +EstaDisponible(DateTime fechaHora)
    }

    class GrupoDistribucion {
        +int Id
        +string Nombre
        +string Descripcion
        +int CalendarioId
        +bool Activo
        +Calendario Calendario
        +List~OperadorGrupo~ Operadores
        +DistribuirLlamada(Llamada llamada)
        +ObtenerOperadorDisponible()
    }

    class OperadorGrupo {
        +int OperadorId
        +int GrupoId
        +int Prioridad
        +DateTime FechaAsignacion
        +Operador Operador
        +GrupoAtencion Grupo
    }

    class Skill {
        +int Id
        +string Nombre
        +string Descripcion
        +List~OperadorSkill~ Operadores
        +List~SkillSetSkill~ SkillSets
    }

    class SkillSet {
        +int Id
        +string Nombre
        +int PrioridadCola
        +List~SkillSetSkill~ Skills
        +AgregarSkill(Skill skill, TipoSkill tipo, int peso)
        +ValidarOperador(Operador operador)
    }

    class OperadorSkill {
        +int OperadorId
        +int SkillId
        +int Prioridad
        +Operador Operador
        +Skill Skill
    }

    class SkillSetSkill {
        +int SkillSetId
        +int SkillId
        +TipoSkill Tipo
        +int Peso
        +SkillSet SkillSet
        +Skill Skill
    }

    class Canal {
        +int Id
        +string Codigo
        +string Nombre
        +int MaxAcciones
        +List~GrupoCanal~ Grupos
    }

    class GrupoCanal {
        +int GrupoId
        +int CanalId
        +int OperadorId
        +bool Activo
        +GrupoAtencion Grupo
        +Canal Canal
        +Operador Operador
    }

    Operador "*" --> "1" Rol
    Operador "1" -- "*" OperadorGrupo
    GrupoAtencion "1" -- "*" OperadorGrupo
    GrupoDistribucion "1" -- "*" OperadorGrupo
    Operador "1" -- "*" OperadorSkill
    Skill "1" -- "*" OperadorSkill
    SkillSet "1" *-- "*" SkillSetSkill
    Skill "1" -- "*" SkillSetSkill
    GrupoAtencion "1" -- "*" GrupoCanal
    Canal "1" -- "*" GrupoCanal
```

---

## 3. Módulo de Tipificaciones

```mermaid
classDiagram
    class TipificacionPrimaria {
        +int Id
        +string Nombre
        +string Descripcion
        +List~TipificacionSecundaria~ TipificacionesSecundarias
        +List~PerfilTipificacion~ Perfiles
        +AgregarSecundaria(TipificacionSecundaria secundaria)
        +EliminarSecundaria(int id)
    }

    class TipificacionSecundaria {
        +int Id
        +int TipificacionPrimariaId
        +string Nombre
        +string Descripcion
        +TipificacionPrimaria TipificacionPrimaria
    }

    class PerfilTipificacion {
        +int Id
        +string Nombre
        +bool EsDefecto
        +List~TipificacionPrimaria~ Tipificaciones
        +List~GrupoPerfilTipificacion~ Grupos
        +AgregarTipificacion(TipificacionPrimaria tipificacion)
        +QuitarTipificacion(int id)
        +MarcarComoDefecto()
    }

    class GrupoPerfilTipificacion {
        +int GrupoId
        +int PerfilId
        +GrupoAtencion Grupo
        +PerfilTipificacion Perfil
    }

    TipificacionPrimaria "1" *-- "*" TipificacionSecundaria
    PerfilTipificacion "*" -- "*" TipificacionPrimaria
    PerfilTipificacion "1" -- "*" GrupoPerfilTipificacion
```

---

## 4. Módulo de Calendario y Horarios

```mermaid
classDiagram
    class Calendario {
        +int Id
        +string Nombre
        +int HorarioId
        +string MensajeFueraServicio
        +Horario Horario
        +List~DiaEspecial~ DiasEspeciales
        +EstaDisponible(DateTime fechaHora)
        +ObtenerProximoHorarioDisponible()
        +AgregarDiaEspecial(DiaEspecial dia)
    }

    class Horario {
        +int Id
        +string Nombre
        +Dictionary~DiaSemana,List~RangoHorario~~ HorarioSemana
        +AgregarRango(DiaSemana dia, TimeSpan inicio, TimeSpan fin)
        +EstaDisponible(DateTime fechaHora)
        +ObtenerRangos(DiaSemana dia)
    }

    class RangoHorario {
        +TimeSpan Inicio
        +TimeSpan Fin
        +bool Contiene(TimeSpan hora)
    }

    class DiaEspecial {
        +int Id
        +DateTime Fecha
        +int? HorarioId
        +string Mensaje
        +bool SinServicio
        +Horario Horario
        +List~DiaEspecialGrupo~ Grupos
        +List~DiaEspecialCampana~ Campanas
        +EsAplicable(DateTime fecha)
    }

    class DiaEspecialGrupo {
        +int GrupoId
        +int DiaEspecialId
        +GrupoAtencion Grupo
        +DiaEspecial DiaEspecial
    }

    class DiaEspecialCampana {
        +int CampanaId
        +int DiaEspecialId
        +Campana Campana
        +DiaEspecial DiaEspecial
    }

    Calendario "*" --> "1" Horario
    Calendario "1" *-- "*" DiaEspecial
    DiaEspecial "*" --> "0..1" Horario
    Horario "1" *-- "*" RangoHorario
    DiaEspecial "1" -- "*" DiaEspecialGrupo
    DiaEspecial "1" -- "*" DiaEspecialCampana
```

---

## 5. Módulo de IVR

```mermaid
classDiagram
    class SistemaIVR {
        +int Id
        +string Nombre
        +string Descripcion
        +bool Activo
        +List~GrupoIVR~ Grupos
        +List~ScriptIVR~ Scripts
        +List~MensajeIVR~ Mensajes
        +Ejecutar(string telefono)
        +Activar()
        +Desactivar()
    }

    class GrupoIVR {
        +int Id
        +int SistemaIVRId
        +string Nombre
        +int Prioridad
        +SistemaIVR Sistema
        +List~IVRLista~ Listas
    }

    class ScriptIVR {
        +int Id
        +int SistemaIVRId
        +string Nombre
        +string Version
        +DateTime FechaCreacion
        +SistemaIVR Sistema
        +List~NodoIVR~ Nodos
        +NodoIVR NodoInicial
        +Ejecutar()
        +Validar()
    }

    class NodoIVR {
        +int Id
        +int ScriptIVRId
        +int? NodoPadreId
        +TipoNodo Tipo
        +int? MensajeId
        +Dictionary~string,object~ Configuracion
        +ScriptIVR Script
        +NodoIVR NodoPadre
        +List~OpcionIVR~ Opciones
        +MensajeIVR Mensaje
        +Procesar(string entrada)
    }

    class OpcionIVR {
        +int Id
        +int NodoId
        +string Digito
        +int NodoDestinoId
        +NodoIVR Nodo
        +NodoIVR NodoDestino
    }

    class MensajeIVR {
        +int Id
        +string Nombre
        +string ArchivoAudio
        +string TextoTTS
        +string Idioma
        +Reproducir()
    }

    SistemaIVR "1" *-- "*" GrupoIVR
    SistemaIVR "1" *-- "*" ScriptIVR
    SistemaIVR "1" -- "*" MensajeIVR
    ScriptIVR "1" *-- "*" NodoIVR
    NodoIVR "1" *-- "*" OpcionIVR
    NodoIVR "*" --> "0..1" MensajeIVR
    OpcionIVR "*" --> "1" NodoIVR
```

---

## 6. Módulo de Chat

```mermaid
classDiagram
    class ServicioChat {
        +int Id
        +string Nombre
        +string Descripcion
        +bool Activo
        +Dictionary~string,object~ Configuracion
        +List~FormularioChat~ Formularios
        +List~PaginaChat~ Paginas
        +List~EtiquetaChat~ Etiquetas
        +IniciarChat(string clienteEmail)
        +FinalizarChat(int gestionId)
    }

    class FormularioChat {
        +int Id
        +int ServicioId
        +string Nombre
        +TipoFormulario Tipo
        +List~CampoFormulario~ Campos
        +ServicioChat Servicio
        +Validar()
        +ObtenerDatos()
    }

    class CampoFormulario {
        +int Id
        +int FormularioId
        +string Nombre
        +TipoCampo Tipo
        +bool Requerido
        +string ValidacionRegex
        +FormularioChat Formulario
    }

    class PaginaChat {
        +int Id
        +int ServicioId
        +string Url
        +string Nombre
        +bool Activa
        +ServicioChat Servicio
    }

    class EtiquetaChat {
        +int Id
        +string Nombre
        +string Color
        +List~GestionChat~ Gestiones
    }

    class GestionChat {
        +long Id
        +int OperadorId
        +int ServicioId
        +DateTime FechaHoraInicio
        +DateTime? FechaHoraFin
        +int Duracion
        +int MensajesEnviados
        +int MensajesRecibidos
        +string ClienteEmail
        +string ClienteNombre
        +List~MensajeChat~ Mensajes
        +List~EtiquetaChat~ Etiquetas
        +Operador Operador
        +ServicioChat Servicio
        +EnviarMensaje(string texto)
        +Finalizar()
        +AgregarEtiqueta(EtiquetaChat etiqueta)
    }

    class MensajeChat {
        +long Id
        +long GestionId
        +DateTime FechaHora
        +string Emisor
        +string Texto
        +TipoMensaje Tipo
        +GestionChat Gestion
    }

    class DominionConfianza {
        +int Id
        +string Dominio
        +bool Permitido
        +DateTime FechaAlta
    }

    class DireccionBloqueada {
        +int Id
        +string DireccionIP
        +string Motivo
        +DateTime FechaBlogueo
        +DateTime? FechaExpiracion
    }

    ServicioChat "1" *-- "*" FormularioChat
    ServicioChat "1" *-- "*" PaginaChat
    FormularioChat "1" *-- "*" CampoFormulario
    ServicioChat "1" -- "*" GestionChat
    GestionChat "1" *-- "*" MensajeChat
    GestionChat "*" -- "*" EtiquetaChat
```

---

## 7. DTOs (Data Transfer Objects)

```mermaid
classDiagram
    class CampanaDto {
        +int Id
        +string Alias
        +string Descripcion
        +bool Activa
        +DateTime FechaInicio
        +DateTime? FechaFin
        +int TotalListas
        +int TotalRegistros
    }

    class OperadorDto {
        +int Id
        +string Login
        +string Nombre
        +string RolNombre
        +bool Activo
        +List~string~ Grupos
        +List~string~ Skills
    }

    class GrupoDto {
        +int Id
        +string Nombre
        +string Descripcion
        +int TotalOperadores
        +bool Activo
    }

    class RegistroDto {
        +long Id
        +string ClienteId
        +string Telefono
        +int Intentos
        +string EstadoActual
        +Dictionary~string,object~ Datos
    }

    class LlamadaDto {
        +long Id
        +DateTime FechaHora
        +int Duracion
        +string OperadorNombre
        +string ClienteId
        +string Resultado
        +bool TieneGrabacion
    }
```

---

## Enumeraciones

```mermaid
classDiagram
    class TipoEjecucion {
        <<enumeration>>
        UrlEstandar
        UrlDependiente
        IntegracionTiphone
    }

    class TipoFuncion {
        <<enumeration>>
        Telemarketing
        OperacionLibre
    }

    class TipoNodo {
        <<enumeration>>
        Menu
        Mensaje
        Transferencia
        ColgarLlamada
        ConsultaBBDD
    }

    class TipoSkill {
        <<enumeration>>
        Obligatorio
        Opcional
        Excluyente
    }

    class DiaSemana {
        <<enumeration>>
        Lunes
        Martes
        Miercoles
        Jueves
        Viernes
        Sabado
        Domingo
    }

    class TipoFormulario {
        <<enumeration>>
        PreChat
        PostChat
    }

    class TipoCampo {
        <<enumeration>>
        Texto
        Email
        Telefono
        TextoLargo
        Select
        Checkbox
    }

    class TipoMensaje {
        <<enumeration>>
        Cliente
        Operador
        Sistema
    }
```

---

## Patrones de Diseño Aplicados

### 1. Repository Pattern
```mermaid
classDiagram
    class IRepository~T~ {
        <<interface>>
        +GetById(int id) T
        +GetAll() List~T~
        +Add(T entity) void
        +Update(T entity) void
        +Delete(int id) void
        +SaveChanges() void
    }

    class ICampanaRepository {
        <<interface>>
        +GetConListas(int id) Campana
        +GetActivas() List~Campana~
        +GetPorOperador(int operadorId) List~Campana~
    }

    class CampanaRepository {
        -DbContext _context
        +GetConListas(int id) Campana
        +GetActivas() List~Campana~
        +GetPorOperador(int operadorId) List~Campana~
    }

    IRepository <|-- ICampanaRepository
    ICampanaRepository <|.. CampanaRepository
```

### 2. Unit of Work Pattern
```mermaid
classDiagram
    class IUnitOfWork {
        <<interface>>
        +ICampanaRepository Campanas
        +IOperadorRepository Operadores
        +IGrupoRepository Grupos
        +Commit() void
        +Rollback() void
    }

    class UnitOfWork {
        -DbContext _context
        -ICampanaRepository _campanas
        -IOperadorRepository _operadores
        +Commit() void
        +Rollback() void
    }

    IUnitOfWork <|.. UnitOfWork
```

---

**Convenciones de Notación**:
- `+` : public
- `-` : private
- `#` : protected
- `~` : package/internal
- `*` : composición
- `o` : agregación
- `-->` : asociación
- `<|--` : herencia
- `<|..` : implementación de interfaz
