# Estructura del Proyecto - Tiphone v6 ManteniWeb

**Fecha de análisis**: 2025-10-27
**Tecnología**: ASP.NET Web Forms 4.8

---

## 1. Arquitectura General

### Patrón Arquitectónico
**ASP.NET Web Forms** con modelo Code-Behind

```
Presentación (ASPX + JavaScript)
         ↓
Code-Behind (ASPX.CS - compilado)
         ↓
Lógica de Negocio (DLLs en /bin)
         ↓
Acceso a Datos (4 Bases de Datos)
```

### Características de Web Forms
- Event-driven programming
- ViewState para gestión de estado
- Postback model
- Server controls
- Code-behind pattern

---

## 2. Estructura de Carpetas

```
ManteniWeb/
├── *.aspx (155)                    # Páginas web principales
├── *.asmx (2)                      # Web Services
├── Global.asax                     # Aplicación global
├── Web.config                      # Configuración
├
├── bin/                            # Binarios compilados
│   └── *.dll                       # Ensamblados
├
├── Controles/                      # Controles de usuario
│   └── *.ascx                      # User Controls reutilizables
├
├── Models/                         # Modelos de datos
├
├── Views/                          # Vistas
├
├── Scripts/                        # JavaScript de aplicación
│   ├── Infraestructura/
│   ├── Negocio/
│   └── Utilidades/
├
├── js/                             # JavaScript adicional
├── css/                            # Estilos CSS
├
├── Content/                        # Assets estáticos
│   ├── DataTables/                 # Librerías DataTables
│   └── ...
├
├── Resources/                      # Recursos (imágenes, iconos)
├── images/                         # Imágenes
├── img/                            # Imágenes adicionales
├── fonts/                          # Tipografías
├
├── jquery/                         # Librería jQuery
├── bootstrap/                      # Framework Bootstrap
├── bootstrap-datetimepicker/       # Plugin DatePicker
├── footable/                       # Plugin tablas responsive
├── nouislider/                     # Plugin sliders
├── locales/                        # Archivos de idioma
├
├── ManualMD/                       # Manual en Markdown
└── docs/                           # Documentación nueva (generada)
```

---

## 3. Páginas ASPX por Categoría

### 3.1 Configuración (17 páginas)
```
Apariencia.aspx
Settings.aspx
DireccionesIP.aspx
ParametrosConfig.aspx
ParametrosConfigLista.aspx
Certificado.aspx
Certificados.aspx
Servidor.aspx
Servidores.aspx
Subsistema.aspx
Subsistemas.aspx
Activaciones.aspx
OrganizacionMenu.aspx
NetworkAddress.aspx
MenuPrincipal.aspx
Principal.aspx
Navegacion.aspx
```

### 3.2 Autenticación y Sesión (3 páginas)
```
Login.aspx
MatarSesion.aspx
SesionCaducada.aspx
```

### 3.3 Tipificaciones (5 páginas)
```
TipificacionesMenu.aspx
TipificacionPrimaria.aspx
TipificacionesPrimarias.aspx
Tipificaciones.aspx
PerfilDeTipificaciones.aspx
GruposParaTipificaciones.aspx
```

### 3.4 Condiciones y Operaciones (4 páginas)
```
Condicion.aspx
Condiciones.aspx
TipoDeOperacion.aspx
OperationTypes.aspx
```

### 3.5 Skills y Conjuntos (6 páginas)
```
Skill.aspx
Skills.aspx
SkillSet.aspx
SkillSets.aspx
ConjuntoDeOperadores.aspx
ConjuntosDeOperadores.aspx
```

### 3.6 Canales (5 páginas)
```
Canal.aspx
Canales.aspx
CanalIVR.aspx
CanalesIVR.aspx
AsignacionCanales.aspx
```

### 3.7 Base de Datos (7 páginas)
```
ConexionBBDD.aspx
ConexionesBBDD.aspx
Instancia.aspx
InstanciasBBDD.aspx
TablaBBDD.aspx
TablasBBDD.aspx
SolicitudesBBDD.aspx
```

### 3.8 Calendario y Horarios (8 páginas)
```
Calendario.aspx
CalendarioCopia.aspx
Horario.aspx
HorarioSistema.aspx
HorarioTienda.aspx
HorariosTiendas.aspx
DiaEspecialCalendario.aspx
```

### 3.9 Predicciones (3 páginas)
```
PrediccionSistema.aspx
PrediccionesSistema.aspx
```

### 3.10 Reprogramaciones (6 páginas)
```
Reprogramacion.aspx
Reprogramaciones.aspx
ReprogramacionResultados.aspx
ReprogramacionesRsVarios.aspx
DReprogramacionCampana.aspx
```

### 3.11 Campañas (15 páginas)
```
Campana.aspx
Campanas.aspx
CampanaCopia.aspx
ListaCampana.aspx
ListasCampana.aspx
EdicionRegistrosCampana.aspx
EdicionRegistrosCampana2Col.aspx
FiltrosCampana.aspx
RdoNegocio.aspx
RdosNegocioCampana.aspx
SupervisionCampana.aspx
DiasEspecialesCampana.aspx
DiaEspecialCampana.aspx
InformesDeCarga.aspx
```

### 3.12 Operadores (9 páginas)
```
Operador.aspx
OperadoreDefectoCampana.aspx
OperadoresDeLista.aspx
OperadoresDeLista4.aspx
OperadoresDelGrupo.aspx
ComandosOperadores.aspx
PermisosDelOperador.aspx
GruposDelOperador.aspx
ListasDelOperador.aspx
```

### 3.13 Grupos (10 páginas)
```
GrupoAtencion.aspx
GruposAtencion.aspx
GrupoDistribucion.aspx
GruposDistribucion.aspx
GrupoIVR.aspx
GruposIVR.aspx
DiaEspecialGrupos.aspx
```

### 3.14 IVR (7 páginas)
```
GestorIVR.aspx
SistemaIVR.aspx
SistemasIVR.aspx
ScriptIVR.aspx
ScriptsIVR.aspx
MensajesIVR.aspx
IVRsEnListas.aspx
```

### 3.15 Encaminamientos (6 páginas)
```
Encaminamientos.aspx
SistemaEncaminamientos.aspx
SistemasEncaminamientos.aspx
ScriptEncaminamientos.aspx
ScriptsEncaminamientos.aspx
MensajesEncaminamientos.aspx
```

### 3.16 Chat (11 páginas)
```
MantenimientoChat.aspx
ServicioChat.aspx
ServiciosChat.aspx
ChatDominioConfianza.aspx
ChatDominiosConfianza.aspx
EtiquetaChat.aspx
EtiquetasChat.aspx
FormulariosChat.aspx
PaginaChat_2.aspx
PaginasChat.aspx
ComandoChat.aspx
DireccionBloqueada.aspx
DireccionesBloqueadasChat.aspx
BuscadorChats.aspx
```

### 3.17 Email (8 páginas)
```
CuentaEmail.aspx
CuentasEmail.aspx
CuentasCorreo.aspx
TemplateRespuestaAutom.aspx
TemplatesRespuestaAutom.aspx
BuscadorEmails.aspx
ResumenEmails.aspx
BuscadorGestionesOffLineMail.aspx
ResumenGestionesOffLineMail.aspx
```

### 3.18 Gestiones Offline (4 páginas)
```
BuscadorGestionesOffLine.aspx
ResumenGestionesOffLine.aspx
```

### 3.19 Buzón de Voz (2 páginas)
```
BuscadorBuzonDeVoz.aspx
ResumenBuzonDeVoz.aspx
```

### 3.20 Teléfono (6 páginas)
```
ConfigLlamadaSaliente.aspx
ResultadosLlamadas.aspx
EditarDatosTelefono.aspx
EditarDatosTelefono2Col.aspx
Filtro.aspx
```

### 3.21 Posiciones (3 páginas)
```
Posicion.aspx
Posiciones.aspx
PosicionEliminar.aspx
```

### 3.22 Monitorización (5 páginas)
```
Monitorizacion.aspx
Monitorizaciones.aspx
MonitorRemoto.aspx
MonitoresRemotos.aspx
AlertasMonitor.aspx
```

### 3.23 Estadísticas (3 páginas)
```
ServicioEstadisticas.aspx
ServicioEstadisticasDatos.aspx
```

### 3.24 LME/Tiendas (3 páginas)
```
TiendaLME.aspx
TiendasLME.aspx
TiendasLMEEditMultiple.aspx
```

### 3.25 Otros (5 páginas)
```
Website.aspx
Websites.aspx
Expresiones.aspx
UploadFiles.aspx
Esperar.aspx
Index.html
```

---

## 4. Controles de Usuario (/Controles)

Los controles reutilizables (.ascx) se encuentran en la carpeta `/Controles`.

**Estimación**: ~25 controles de usuario

Ejemplos probables:
- Grillas/Tablas
- Selectores
- Calendarios
- Modales
- Menús
- Breadcrumbs

---

## 5. JavaScript (/Scripts y /js)

### Organización probable:
```
/Scripts/
  ├── Infraestructura/      # Utilidades base
  ├── Negocio/              # Lógica de negocio
  └── Utilidades/           # Helpers
```

**Total**: ~83 archivos JavaScript

### Principales usos identificados:
- Validaciones client-side
- Llamadas AJAX
- DataTables configuration
- Interacción con Web Services
- Gestión de estado en cliente

---

## 6. Librerías Frontend

### Core
- **jQuery** (versión a determinar)
- **Bootstrap** (versión a determinar)
- **AJAX Control Toolkit**

### Plugins
- **DataTables** + extensiones completas:
  - AutoFill
  - Buttons (Excel, PDF, Print)
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
- **Bootstrap DateTimePicker**
- **JSZip** - Para exportación Excel

---

## 7. Web Services (.asmx)

### Servicios identificados:
1. **Conexiones.asmx** - Gestión de conexiones
2. **Formulario.asmx** - Operaciones con formularios

**Nota**: El code-behind está compilado en DLLs

---

## 8. Ensamblados (/bin)

Los DLLs compilados contienen:
- Code-behind de todas las páginas ASPX
- Lógica de negocio
- Acceso a datos
- Modelos
- Utilidades

**Estimación**: ~85 DLLs

---

## 9. Patrones de Nomenclatura Identificados

### Páginas Maestro-Detalle
- Plural → Lista: `Campanas.aspx`
- Singular → Detalle: `Campana.aspx`

### Buscadores
- Prefijo "Buscador": `BuscadorChats.aspx`

### Resúmenes
- Prefijo "Resumen": `ResumenEmails.aspx`

### Edición
- Prefijo "Editar" o "Edicion": `EditarDatosTelefono.aspx`

### Copias
- Sufijo "Copia": `CampanaCopia.aspx`

### Eliminación
- Sufijo "Eliminar": `PosicionEliminar.aspx`

---

## 10. Flujos de Navegación Típicos

### Ejemplo: Gestión de Campañas
```
MenuPrincipal.aspx
    ↓
Campanas.aspx (Lista)
    ↓
Campana.aspx (Detalle)
    ↓
    ├→ ListasCampana.aspx
    ├→ FiltrosCampana.aspx
    ├→ SupervisionCampana.aspx
    └→ RdosNegocioCampana.aspx
```

### Ejemplo: Gestión de Operadores
```
MenuPrincipal.aspx
    ↓
Operadores (Lista)
    ↓
Operador.aspx (Detalle)
    ↓
    ├→ GruposDelOperador.aspx
    ├→ ListasDelOperador.aspx
    └→ PermisosDelOperador.aspx
```

---

## 11. Modelo de Autenticación

### Forms Authentication
- Login: `Login.aspx`
- Sesión: 200 minutos
- Cookie: 120 minutos
- Sliding Expiration: Sí

### Gestión de Sesión
- Almacenamiento: InProc (servidor)
- Timeout configurable
- Manejo de expiración: `SesionCaducada.aspx`

---

## 12. Integración con APIs Externas

Basado en Web.config:

1. **TiphoneRecords API** - Grabaciones
2. **MantPersuader API** - Motor de campañas
3. **ChatFile API** - Chat
4. **ChatServer** - Servidor de chat
5. **Security Center** - OAuth
6. **SubirFicheros.svc** - Upload de archivos

---

## 13. Tecnologías para Migración

### De ASP.NET Web Forms a Angular + .NET Core

| Componente Web Forms | Equivalente Angular + .NET |
|---------------------|---------------------------|
| ASPX Pages | Angular Components |
| Code-Behind | .NET Core Controllers/Services |
| ViewState | NgRx/Signals State Management |
| Server Controls | Angular Components Library |
| Postback | HTTP Calls (REST API) |
| AJAX Control Toolkit | Angular Material/PrimeNG |
| .asmx Web Services | .NET Core Web API |
| Global.asax | Startup.cs / Program.cs |
| Web.config | appsettings.json + env vars |

---

## 14. Complejidad Estimada de Migración

### Alta Complejidad (40 páginas)
- Campañas y listas
- Supervisión en tiempo real
- IVR y Encaminamientos
- Chat (integración compleja)

### Media Complejidad (70 páginas)
- CRUD estándar
- Formularios con validaciones
- Búsquedas y filtros

### Baja Complejidad (45 páginas)
- Configuración simple
- Visualización de datos
- Páginas estáticas

---

## 15. Dependencias Críticas

### Servidor
- **Windows Server** (rutas UNC, permisos NTFS)
- **SQL Server**
- **IIS**

### Servicios Externos
- **Persuader** (motor propietario de campañas)
- **Asterisk** (VoIP)
- **Security Center** (OAuth)

### Almacenamiento
- Archivos en red (UNC paths)
- Grabaciones en rutas específicas
- Certificados SSL

---

## 16. Recomendaciones para Nueva Arquitectura

### Frontend (Angular 17+)
```
src/
├── app/
│   ├── core/                  # Servicios singleton
│   ├── shared/                # Componentes compartidos
│   ├── features/              # Módulos por funcionalidad
│   │   ├── campaigns/
│   │   ├── operators/
│   │   ├── groups/
│   │   └── ...
│   ├── models/                # Interfaces y tipos
│   └── state/                 # Gestión de estado
```

### Backend (.NET 8)
```
src/
├── API/                       # Controllers
├── Application/               # Casos de uso, DTOs
├── Domain/                    # Entidades, interfaces
├── Infrastructure/            # Repositorios, DbContext
└── Shared/                    # Utilidades compartidas
```

---

## 17. Próximos Pasos de Análisis

- [ ] Descompilar DLLs para análisis de lógica
- [ ] Documentar controles de usuario
- [ ] Mapear JavaScript a TypeScript
- [ ] Analizar dependencias entre páginas
- [ ] Documentar validaciones de negocio
- [ ] Identificar consultas SQL embebidas
- [ ] Revisar manejo de concurrencia

---

**Documento generado mediante análisis del código fuente**
