# Inventario de Archivos - Proyecto Tiphone v6

**Fecha**: 2025-10-27
**Proyecto**: ManteniWeb - Tiphone Contact Center Administration

---

## Resumen Ejecutivo

| Tipo de Archivo | Cantidad | Ubicación |
|-----------------|----------|-----------|
| Páginas ASPX | 155 | Raíz del proyecto |
| Web Services (.asmx) | 2 | Raíz del proyecto |
| Archivos JavaScript | ~83 | /js, /Scripts, /jquery |
| Archivos CSS | ~48 | /css, /Content |
| Controles de Usuario | ~25 | /Controles |
| Modelos | ~3 | /Models |
| Vistas | ~32 | /Views |
| Recursos | ~69 | /Resources |

---

## 1. Páginas ASPX (155 archivos)

### Principales Módulos Identificados por Prefijo

#### Administración General
- `Apariencia.aspx` - Configuración de apariencia
- `Settings.aspx` - Configuración general
- `MenuPrincipal.aspx` - Menú principal
- `Principal.aspx` - Página principal
- `Login.aspx` - Autenticación
- `Navegacion.aspx` - Navegación
- `Esperar.aspx` - Página de espera

#### Campañas
- `Campana.aspx` - Gestión de campaña
- `Campanas.aspx` - Lista de campañas
- `CampanaCopia.aspx` - Copiar campaña
- `ListaCampana.aspx` - Lista de campaña
- `ListasCampana.aspx` - Listas de campaña
- `EdicionRegistrosCampana.aspx` - Edición de registros
- `EdicionRegistrosCampana2Col.aspx` - Edición 2 columnas
- `FiltrosCampana.aspx` - Filtros de campaña
- `RdosNegocioCampana.aspx` - Resultados de negocio
- `SupervisionCampana.aspx` - Supervisión de campaña
- `DiasEspecialesCampana.aspx` - Días especiales
- `DiaEspecialCampana.aspx` - Día especial individual

#### Operadores
- `Operador.aspx` - Gestión de operador
- `OperadoreDefectoCampana.aspx` - Operador por defecto
- `OperadoresDeLista.aspx` - Operadores de lista
- `OperadoresDeLista4.aspx` - Operadores de lista v4
- `OperadoresDelGrupo.aspx` - Operadores del grupo
- `ComandosOperadores.aspx` - Comandos de operadores
- `PermisosDelOperador.aspx` - Permisos del operador
- `GruposDelOperador.aspx` - Grupos del operador
- `ListasDelOperador.aspx` - Listas del operador

#### Grupos
- `GrupoAtencion.aspx` - Grupo de atención
- `GruposAtencion.aspx` - Lista de grupos de atención
- `GrupoDistribucion.aspx` - Grupo de distribución
- `GruposDistribucion.aspx` - Lista de grupos de distribución
- `GrupoIVR.aspx` - Grupo IVR
- `GruposIVR.aspx` - Lista de grupos IVR
- `ConjuntoDeOperadores.aspx` - Conjunto de operadores
- `ConjuntosDeOperadores.aspx` - Lista de conjuntos
- `GruposParaTipificaciones.aspx` - Grupos para tipificaciones
- `DiaEspecialGrupos.aspx` - Día especial de grupos

#### Calendario y Horarios
- `Calendario.aspx` - Gestión de calendario
- `CalendarioCopia.aspx` - Copiar calendario
- `Horario.aspx` - Gestión de horario
- `HorarioSistema.aspx` - Horario del sistema
- `HorarioTienda.aspx` - Horario de tienda
- `HorariosTiendas.aspx` - Lista de horarios de tiendas
- `DiaEspecialCalendario.aspx` - Día especial en calendario

#### Predicciones y Reprogramaciones
- `PrediccionSistema.aspx` - Predicción del sistema
- `PrediccionesSistema.aspx` - Lista de predicciones
- `Reprogramacion.aspx` - Reprogramación
- `Reprogramaciones.aspx` - Lista de reprogramaciones
- `ReprogramacionResultados.aspx` - Resultados de reprogramación
- `ReprogramacionesRsVarios.aspx` - Reprogramaciones varios resultados
- `DReprogramacionCampana.aspx` - Reprogramación de campaña

#### Tipificaciones
- `Tipificaciones.aspx` - Gestión de tipificaciones
- `TipificacionesMenu.aspx` - Menú de tipificaciones
- `TipificacionPrimaria.aspx` - Tipificación primaria
- `TipificacionesPrimarias.aspx` - Lista de tipificaciones primarias
- `PerfilDeTipificaciones.aspx` - Perfil de tipificaciones

#### Condiciones y Operaciones
- `Condicion.aspx` - Gestión de condición
- `Condiciones.aspx` - Lista de condiciones
- `TipoDeOperacion.aspx` - Tipo de operación
- `OperationTypes.aspx` - Tipos de operación

#### Skills y SkillSets
- `Skill.aspx` - Gestión de skill
- `Skills.aspx` - Lista de skills
- `SkillSet.aspx` - Gestión de skillset
- `SkillSets.aspx` - Lista de skillsets

#### Canales de Comunicación
- `Canal.aspx` - Gestión de canal
- `Canales.aspx` - Lista de canales
- `CanalIVR.aspx` - Canal IVR
- `CanalesIVR.aspx` - Lista de canales IVR
- `AsignacionCanales.aspx` - Asignación de canales

#### Base de Datos
- `ConexionBBDD.aspx` - Conexión a BBDD
- `ConexionesBBDD.aspx` - Lista de conexiones
- `Instancia.aspx` - Instancia de BBDD
- `InstanciasBBDD.aspx` - Lista de instancias
- `TablaBBDD.aspx` - Tabla de BBDD
- `TablasBBDD.aspx` - Lista de tablas
- `SolicitudesBBDD.aspx` - Solicitudes a BBDD

#### IVR (Interactive Voice Response)
- `GestorIVR.aspx` - Gestor IVR
- `SistemaIVR.aspx` - Sistema IVR
- `SistemasIVR.aspx` - Lista de sistemas IVR
- `ScriptIVR.aspx` - Script IVR
- `ScriptsIVR.aspx` - Lista de scripts IVR
- `MensajesIVR.aspx` - Mensajes IVR
- `IVRsEnListas.aspx` - IVRs en listas

#### Encaminamientos (Routing)
- `Encaminamientos.aspx` - Gestión de encaminamientos
- `SistemaEncaminamientos.aspx` - Sistema de encaminamientos
- `SistemasEncaminamientos.aspx` - Lista de sistemas
- `ScriptEncaminamientos.aspx` - Script de encaminamientos
- `ScriptsEncaminamientos.aspx` - Lista de scripts
- `MensajesEncaminamientos.aspx` - Mensajes de encaminamientos

#### Chat
- `MantenimientoChat.aspx` - Mantenimiento de chat
- `ServicioChat.aspx` - Servicio de chat
- `ServiciosChat.aspx` - Lista de servicios de chat
- `ChatDominioConfianza.aspx` - Dominio de confianza
- `ChatDominiosConfianza.aspx` - Lista de dominios
- `EtiquetaChat.aspx` - Etiqueta de chat
- `EtiquetasChat.aspx` - Lista de etiquetas
- `FormulariosChat.aspx` - Formularios de chat
- `PaginaChat_2.aspx` - Página de chat
- `PaginasChat.aspx` - Lista de páginas de chat
- `ComandoChat.aspx` - Comando de chat
- `DireccionBloqueada.aspx` - Dirección bloqueada
- `DireccionesBloqueadasChat.aspx` - Lista de direcciones bloqueadas
- `BuscadorChats.aspx` - Buscador de chats

#### Email / Correo
- `CuentaEmail.aspx` - Cuenta de email
- `CuentasEmail.aspx` - Lista de cuentas email
- `CuentasCorreo.aspx` - Cuentas de correo
- `TemplateRespuestaAutom.aspx` - Template de respuesta automática
- `TemplatesRespuestaAutom.aspx` - Lista de templates
- `BuscadorEmails.aspx` - Buscador de emails
- `ResumenEmails.aspx` - Resumen de emails

#### Gestiones Offline
- `BuscadorGestionesOffLine.aspx` - Buscador de gestiones offline
- `BuscadorGestionesOffLineMail.aspx` - Buscador offline mail
- `ResumenGestionesOffLine.aspx` - Resumen gestiones offline
- `ResumenGestionesOffLineMail.aspx` - Resumen offline mail

#### Buzón de Voz
- `BuscadorBuzonDeVoz.aspx` - Buscador de buzón de voz
- `ResumenBuzonDeVoz.aspx` - Resumen buzón de voz

#### Teléfono y Llamadas
- `ConfigLlamadaSaliente.aspx` - Configuración llamada saliente
- `ResultadosLlamadas.aspx` - Resultados de llamadas
- `EditarDatosTelefono.aspx` - Editar datos de teléfono
- `EditarDatosTelefono2Col.aspx` - Editar datos 2 columnas

#### Posiciones
- `Posicion.aspx` - Gestión de posición
- `Posiciones.aspx` - Lista de posiciones
- `PosicionEliminar.aspx` - Eliminar posición

#### Monitorización
- `Monitorizacion.aspx` - Monitorización
- `Monitorizaciones.aspx` - Lista de monitorizaciones
- `MonitorRemoto.aspx` - Monitor remoto
- `MonitoresRemotos.aspx` - Lista de monitores remotos
- `AlertasMonitor.aspx` - Alertas de monitor

#### Estadísticas
- `ServicioEstadisticas.aspx` - Servicio de estadísticas
- `ServicioEstadisticasDatos.aspx` - Servicio estadísticas datos

#### Certificados y Seguridad
- `Certificado.aspx` - Gestión de certificado
- `Certificados.aspx` - Lista de certificados
- `MatarSesion.aspx` - Matar sesión

#### Infraestructura
- `Servidor.aspx` - Gestión de servidor
- `Servidores.aspx` - Lista de servidores
- `DireccionesIP.aspx` - Direcciones IP
- `NetworkAddress.aspx` - Dirección de red
- `Subsistema.aspx` - Subsistema
- `Subsistemas.aspx` - Lista de subsistemas
- `Activaciones.aspx` - Activaciones

#### LME (Location Management Engine)
- `TiendaLME.aspx` - Tienda LME
- `TiendasLME.aspx` - Lista de tiendas LME
- `TiendasLMEEditMultiple.aspx` - Edición múltiple tiendas

#### Configuración
- `ParametrosConfig.aspx` - Parámetros de configuración
- `ParametrosConfigLista.aspx` - Lista parámetros config
- `OrganizacionMenu.aspx` - Organización del menú

#### Resultados y Filtros
- `RdoNegocio.aspx` - Resultado de negocio
- `Filtro.aspx` - Gestión de filtro

#### Otros
- `Website.aspx` - Sitio web
- `Websites.aspx` - Lista de sitios web
- `Expresiones.aspx` - Expresiones
- `UploadFiles.aspx` - Subir archivos
- `InformesDeCarga.aspx` - Informes de carga
- `Index.html` - Página índice

---

## 2. Web Services (.asmx)

- `Conexiones.asmx` - Servicio de conexiones
- `Formulario.asmx` - Servicio de formularios

---

## 3. Carpetas Principales

### /bin
Binarios compilados de la aplicación (.dll)

### /Content
Assets de contenido estático
- `/DataTables` - Librerías DataTables con múltiples extensiones

### /Controles
Controles de usuario reutilizables (user controls .ascx)

### /Scripts
Scripts JavaScript de la aplicación

### /js
JavaScript adicional

### /css
Hojas de estilo CSS

### /Models
Modelos de datos

### /Views
Vistas de la aplicación

### /Resources
Recursos de la aplicación (imágenes, iconos, archivos estáticos)

### /jquery
Librería jQuery

### /bootstrap
Framework Bootstrap

### /bootstrap-datetimepicker
Plugin DateTimePicker para Bootstrap

### /footable
Plugin FooTable (tablas responsive)

### /nouislider
Plugin noUiSlider (sliders)

### /fonts
Fuentes tipográficas

### /images
Imágenes de la aplicación

### /img
Imágenes adicionales

### /locales
Archivos de localización/idiomas

### /ManualMD
Manual convertido a Markdown (7 archivos)

---

## 4. Archivos de Configuración

- `Web.config` - Configuración principal de ASP.NET
- `Global.asax` - Archivo de aplicación global
- `packages.config` - Paquetes NuGet
- `libman.json` - Library Manager configuration
- `.editorconfig` - Configuración del editor

---

## 5. Librerías y Frameworks Identificados

### Frontend
- **jQuery** - Librería JavaScript
- **Bootstrap** - Framework CSS
- **DataTables** - Plugin de tablas con múltiples extensiones:
  - AutoFill
  - Buttons
  - ColReorder
  - FixedColumns
  - FixedHeader
  - KeyTable
  - Responsive
  - RowGroup
  - RowReorder
  - Scroller
  - SearchBuilder
  - SearchPanes
  - Select
  - DateTime
- **FooTable** - Tablas responsive
- **noUiSlider** - Sliders
- **Bootstrap DateTimePicker** - Selector de fechas

### Backend
- **ASP.NET Web Forms** - Framework principal
- **.NET Framework** (versión a determinar desde Web.config)

---

## 6. Patrones Identificados en Nomenclatura

### Páginas Listado (Plural)
Archivos con nombres en plural suelen mostrar listados:
- `Campanas.aspx`, `Operadores.aspx`, `Grupos.aspx`, etc.

### Páginas Detalle (Singular)
Archivos en singular suelen ser formularios de detalle:
- `Campana.aspx`, `Operador.aspx`, `Grupo.aspx`, etc.

### Páginas de Búsqueda
Prefijo "Buscador":
- `BuscadorChats.aspx`, `BuscadorEmails.aspx`, etc.

### Páginas de Resumen
Prefijo "Resumen":
- `ResumenEmails.aspx`, `ResumenGestionesOffLine.aspx`, etc.

---

## 7. Módulos Funcionales Principales

Con base en el análisis de archivos, se identifican estos módulos:

1. **Administración General** (8 páginas)
2. **Campañas** (15 páginas)
3. **Operadores** (9 páginas)
4. **Grupos** (10 páginas)
5. **Calendario y Horarios** (8 páginas)
6. **Predicciones y Reprogramaciones** (7 páginas)
7. **Tipificaciones** (5 páginas)
8. **Skills y SkillSets** (4 páginas)
9. **Canales de Comunicación** (5 páginas)
10. **Base de Datos** (7 páginas)
11. **IVR** (7 páginas)
12. **Encaminamientos** (6 páginas)
13. **Chat** (11 páginas)
14. **Email/Correo** (8 páginas)
15. **Gestiones Offline** (4 páginas)
16. **Buzón de Voz** (2 páginas)
17. **Teléfono y Llamadas** (3 páginas)
18. **Posiciones** (3 páginas)
19. **Monitorización** (5 páginas)
20. **LME (Tiendas)** (3 páginas)

---

## 8. Próximos Pasos de Análisis

- [ ] Analizar code-behind de cada .aspx (.aspx.cs)
- [ ] Documentar modelos de datos en /Models
- [ ] Analizar JavaScript en /Scripts y /js
- [ ] Revisar Web.config para conexiones y configuración
- [ ] Analizar controles de usuario en /Controles
- [ ] Documentar servicios .asmx en detalle
- [ ] Mapear relaciones entre páginas (navegación)

---

**Documento generado automáticamente**
