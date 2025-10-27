# Plan de Documentación Técnica - Migración Tiphone v6
## Objetivo: Generar aplicación Angular + .NET Core

---

## FASE 1: ANÁLISIS Y EXTRACCIÓN DE CONOCIMIENTO

### 1.1 Análisis del Manual de Usuario (ManualMD/)
**Objetivo**: Extraer funcionalidades, flujos de negocio y reglas

**Tareas**:
- [ ] Consolidar archivos MD fragmentados en estructura coherente
- [ ] Crear índice completo de funcionalidades por módulo
- [ ] Extraer y documentar:
  - Flujos de usuario (workflows)
  - Reglas de negocio
  - Validaciones y restricciones
  - Permisos y roles
  - Mensajes de error/validación

**Entregables**:
- `docs/01-Funcionalidades/README.md` - Índice maestro
- `docs/01-Funcionalidades/modulo-[nombre]/` - Una carpeta por módulo
- `docs/01-Funcionalidades/flujos-negocio.md` - Diagramas de flujo
- `docs/01-Funcionalidades/reglas-negocio.md` - Reglas y validaciones

---

### 1.2 Análisis del Código Fuente ASP.NET
**Objetivo**: Ingeniería inversa de la aplicación actual

**Tareas**:
- [ ] **Inventario de archivos**:
  - Listar todos los .aspx (páginas)
  - Listar todos los .cs (code-behind)
  - Listar todos los .js (lógica cliente)
  - Listar .asmx (web services)

- [ ] **Análisis de estructura**:
  - Identificar carpetas y organización
  - Mapear relaciones entre páginas
  - Identificar controles de usuario (Controles/)
  - Analizar Scripts/, Resources/, Content/

- [ ] **Extracción de componentes**:
  - ViewState y gestión de estado
  - Postbacks y eventos
  - Validaciones client-side
  - AJAX calls
  - DataTables configuration

**Entregables**:
- `docs/02-Codigo-Actual/inventario-archivos.md`
- `docs/02-Codigo-Actual/estructura-proyecto.md`
- `docs/02-Codigo-Actual/mapa-navegacion.md`
- `docs/02-Codigo-Actual/componentes-reutilizables.md`

---

### 1.3 Análisis de Base de Datos
**Objetivo**: Documentar modelo de datos

**Tareas**:
- [ ] Analizar conexiones a BBDD en Web.config
- [ ] Identificar strings de conexión y providers
- [ ] Extraer queries SQL del código
- [ ] Documentar stored procedures mencionados
- [ ] Identificar entidades principales
- [ ] Mapear relaciones entre tablas

**Entregables**:
- `docs/03-Base-Datos/esquema-bd.md`
- `docs/03-Base-Datos/entidades.md`
- `docs/03-Base-Datos/relaciones-er-diagram.md`
- `docs/03-Base-Datos/queries-importantes.md`
- `docs/03-Base-Datos/stored-procedures.md`

---

### 1.4 Análisis de APIs y Servicios
**Objetivo**: Documentar contratos de servicios

**Tareas**:
- [ ] Analizar archivos .asmx (Web Services)
- [ ] Identificar endpoints y métodos
- [ ] Documentar parámetros de entrada/salida
- [ ] Analizar llamadas AJAX en JavaScript
- [ ] Identificar integraciones externas
- [ ] Documentar autenticación y autorización

**Entregables**:
- `docs/04-APIs-Servicios/web-services.md`
- `docs/04-APIs-Servicios/endpoints.md`
- `docs/04-APIs-Servicios/contratos-datos.md`
- `docs/04-APIs-Servicios/autenticacion.md`

---

## FASE 2: DISEÑO DE ARQUITECTURA NUEVA

### 2.1 Arquitectura Angular Frontend
**Objetivo**: Diseñar estructura de aplicación Angular

**Tareas**:
- [ ] Definir estructura de módulos Angular
- [ ] Diseñar sistema de routing
- [ ] Definir componentes principales
- [ ] Diseñar servicios y estado (NgRx/Signals)
- [ ] Planificar guards y interceptors
- [ ] Diseñar sistema de autenticación JWT
- [ ] Definir estructura de formularios reactivos
- [ ] Planificar manejo de errores

**Entregables**:
- `docs/05-Arquitectura-Angular/estructura-modulos.md`
- `docs/05-Arquitectura-Angular/componentes-principales.md`
- `docs/05-Arquitectura-Angular/servicios.md`
- `docs/05-Arquitectura-Angular/routing.md`
- `docs/05-Arquitectura-Angular/state-management.md`
- `docs/05-Arquitectura-Angular/diagrama-arquitectura.md`

---

### 2.2 Arquitectura .NET Core Backend
**Objetivo**: Diseñar API REST con .NET Core

**Tareas**:
- [ ] Definir estructura de proyecto .NET Core
- [ ] Diseñar arquitectura en capas:
  - API Layer (Controllers)
  - Business Logic Layer (Services)
  - Data Access Layer (Repositories)
  - Domain Layer (Entities/Models)
- [ ] Definir DTOs y mapeos (AutoMapper)
- [ ] Diseñar sistema de autenticación (JWT)
- [ ] Planificar middleware y filtros
- [ ] Diseñar manejo de excepciones
- [ ] Planificar logging y monitoring
- [ ] Definir estrategia de testing

**Entregables**:
- `docs/06-Arquitectura-DotNet/estructura-proyecto.md`
- `docs/06-Arquitectura-DotNet/capas-arquitectura.md`
- `docs/06-Arquitectura-DotNet/controllers.md`
- `docs/06-Arquitectura-DotNet/servicios-negocio.md`
- `docs/06-Arquitectura-DotNet/repositorios-datos.md`
- `docs/06-Arquitectura-DotNet/dtos-modelos.md`
- `docs/06-Arquitectura-DotNet/seguridad.md`

---

### 2.3 Diseño de Base de Datos
**Objetivo**: Modernizar esquema de base de datos si es necesario

**Tareas**:
- [ ] Revisar esquema actual
- [ ] Proponer mejoras de normalización
- [ ] Diseñar índices optimizados
- [ ] Planificar estrategia de migración
- [ ] Definir scripts de migración

**Entregables**:
- `docs/07-Base-Datos-Nueva/esquema-propuesto.md`
- `docs/07-Base-Datos-Nueva/migraciones.sql`
- `docs/07-Base-Datos-Nueva/indices.md`

---

## FASE 3: MAPEO FUNCIONALIDADES (OLD → NEW)

### 3.1 Matriz de Conversión
**Objetivo**: Mapear cada página .aspx a componente Angular

**Tareas**:
- [ ] Crear matriz: Página ASP.NET → Componente Angular
- [ ] Para cada página documentar:
  - Funcionalidad actual
  - Componente Angular equivalente
  - Servicios necesarios
  - Endpoints API necesarios
  - Estado a gestionar
  - Validaciones
  - Permisos
- [ ] Priorizar módulos por criticidad

**Entregables**:
- `docs/08-Mapeo-Conversion/matriz-conversion.xlsx`
- `docs/08-Mapeo-Conversion/matriz-conversion.md`
- `docs/08-Mapeo-Conversion/priorizacion-modulos.md`

---

### 3.2 Especificaciones Técnicas por Módulo
**Objetivo**: Documentación técnica detallada para desarrollo

**Para cada módulo crear**:
- [ ] Especificación funcional
- [ ] Componentes Angular a crear
- [ ] Servicios Angular a crear
- [ ] Endpoints API .NET a crear
- [ ] DTOs necesarios
- [ ] Entidades de base de datos involucradas
- [ ] Casos de uso
- [ ] Casos de prueba

**Entregables**:
- `docs/09-Especificaciones-Modulos/[modulo-nombre]/`
  - `funcional.md`
  - `tecnico-frontend.md`
  - `tecnico-backend.md`
  - `casos-uso.md`
  - `casos-prueba.md`

---

## FASE 4: DOCUMENTACIÓN COMPLEMENTARIA

### 4.1 Guías de Desarrollo
**Tareas**:
- [ ] Estándares de código Angular
- [ ] Estándares de código .NET
- [ ] Convenciones de nombrado
- [ ] Estructura de commits
- [ ] Proceso de code review
- [ ] Guía de testing

**Entregables**:
- `docs/10-Guias/coding-standards-angular.md`
- `docs/10-Guias/coding-standards-dotnet.md`
- `docs/10-Guias/git-workflow.md`
- `docs/10-Guias/testing-strategy.md`

---

### 4.2 Diseño UI/UX
**Tareas**:
- [ ] Analizar UI actual (capturas)
- [ ] Proponer mejoras de UX
- [ ] Diseñar sistema de componentes
- [ ] Definir librería UI (Angular Material, PrimeNG, etc.)
- [ ] Crear paleta de colores
- [ ] Definir tipografía
- [ ] Diseñar responsive breakpoints

**Entregables**:
- `docs/11-Diseno-UI/analisis-ui-actual.md`
- `docs/11-Diseno-UI/propuesta-ux.md`
- `docs/11-Diseno-UI/sistema-componentes.md`
- `docs/11-Diseno-UI/guia-estilos.md`
- `docs/11-Diseno-UI/wireframes/` (Figma/imágenes)

---

### 4.3 Plan de Migración
**Tareas**:
- [ ] Estrategia de migración (big bang vs incremental)
- [ ] Plan de fases
- [ ] Estimación de esfuerzo por módulo
- [ ] Identificación de riesgos
- [ ] Plan de mitigación de riesgos
- [ ] Estrategia de testing
- [ ] Plan de despliegue

**Entregables**:
- `docs/12-Plan-Migracion/estrategia.md`
- `docs/12-Plan-Migracion/cronograma.md`
- `docs/12-Plan-Migracion/estimaciones.md`
- `docs/12-Plan-Migracion/riesgos.md`
- `docs/12-Plan-Migracion/plan-testing.md`
- `docs/12-Plan-Migracion/plan-despliegue.md`

---

## FASE 5: PROTOTIPO Y VALIDACIÓN

### 5.1 Prototipo Técnico
**Tareas**:
- [ ] Crear proyecto Angular base
- [ ] Crear proyecto .NET Core base
- [ ] Implementar autenticación
- [ ] Implementar 1-2 módulos completos
- [ ] Validar arquitectura
- [ ] Ajustar según feedback

**Entregables**:
- Repositorio con código prototipo
- Documento de lecciones aprendidas

---

## ESTRUCTURA DE CARPETAS PROPUESTA

```
ManteniWeb/
├── docs/
│   ├── 00-Resumen-Ejecutivo/
│   ├── 01-Funcionalidades/
│   ├── 02-Codigo-Actual/
│   ├── 03-Base-Datos/
│   ├── 04-APIs-Servicios/
│   ├── 05-Arquitectura-Angular/
│   ├── 06-Arquitectura-DotNet/
│   ├── 07-Base-Datos-Nueva/
│   ├── 08-Mapeo-Conversion/
│   ├── 09-Especificaciones-Modulos/
│   ├── 10-Guias/
│   ├── 11-Diseno-UI/
│   └── 12-Plan-Migracion/
├── ManualMD/ (manual existente)
└── [código actual .aspx, .cs, etc.]
```

---

## HERRAMIENTAS RECOMENDADAS

### Análisis y Documentación
- **Diagrams**: Draw.io, Mermaid, PlantUML
- **Wireframes**: Figma, Balsamiq
- **Gestión**: Notion, Confluence, GitHub Wiki

### Desarrollo
- **Angular**: Angular CLI v17+, Angular Material/PrimeNG
- **.NET**: .NET 8, Entity Framework Core, AutoMapper
- **Base de datos**: SQL Server / PostgreSQL
- **Testing**: Jest, Jasmine, xUnit
- **CI/CD**: GitHub Actions, Azure DevOps

---

## PRÓXIMOS PASOS INMEDIATOS

1. **Crear estructura de carpetas de documentación**
2. **Empezar con FASE 1.1**: Análisis del Manual
3. **Ejecutar FASE 1.2**: Inventario de código
4. **Realizar FASE 1.3**: Análisis de BBDD

---

## NOTAS

- Este plan es iterativo y se refinará según avancemos
- Priorizar documentación de módulos críticos
- Mantener documentación versionada en Git
- Revisar y actualizar este plan semanalmente
