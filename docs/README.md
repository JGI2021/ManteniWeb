# Documentación Técnica - Tiphone v6 Migration Project

**Proyecto**: ManteniWeb - Migración a Angular + .NET Core
**Fecha de creación**: 2025-10-27
**Última actualización**: 2025-10-27

---

## 📁 Estructura de Documentación

Esta documentación está organizada en **3 categorías principales**:

### 🔴 APLICACION-ACTUAL
Documenta la aplicación **existente** (ASP.NET Web Forms 4.8)

### 🟢 APLICACION-PROPUESTA
Documenta la **nueva** aplicación (Angular 17+ + .NET 8)

### 🟡 LOGICA-NEGOCIO
Documenta la lógica de negocio que **permanece igual** en ambas versiones

---

## 🗂️ Índice de Documentación

### 📄 Documentos Principales

| Documento | Ubicación | Descripción |
|-----------|-----------|-------------|
| Plan Maestro | `PLAN_DOCUMENTACION_TECNICA.md` | Roadmap completo 5 fases |
| Resumen Ejecutivo | `00-Resumen-Ejecutivo/` | ROI, costos, estrategia |

---

## 🔴 APLICACION-ACTUAL/

Documentación de la aplicación existente en ASP.NET Web Forms

### Arquitectura/
```
📁 APLICACION-ACTUAL/Arquitectura/
├── arquitectura-general-actual.md          # Arquitectura ASP.NET Web Forms
├── diagrama-capas-actual.md                # Capas: Presentación, Negocio, Datos
├── diagrama-viewstate.md                   # Gestión de ViewState
├── diagrama-postback.md                    # Ciclo de vida Postback
└── integraciones-externas-actual.md        # APIs y servicios integrados
```

**Contenido**: Diagramas de cómo funciona **HOY** el sistema

### Base-Datos/
```
📁 APLICACION-ACTUAL/Base-Datos/
├── diagrama-er-actual.md                   # ER de las 4 bases de datos actuales
├── cc-general-actual.md                    # Detalle BD CC_GENERAL
├── cc-tiphone-actual.md                    # Detalle BD CC_TIPHONE
├── cc-ivr-actual.md                        # Detalle BD CC_IVR
├── cc-estadisticas-actual.md               # Detalle BD CC_ESTADISTICAS
├── configuracion-conexiones-actual.md      # Cadenas de conexión actuales
└── stored-procedures-actual.md             # SPs existentes (si los hay)
```

**Contenido**: Base de datos **tal como está** en producción

### Codigo/
```
📁 APLICACION-ACTUAL/Codigo/
├── inventario-archivos.md                  # 155 páginas ASPX catalogadas
├── estructura-proyecto-actual.md           # Organización de carpetas
├── mapa-navegacion-actual.md               # Flujo entre páginas
├── controles-usuario-actual.md             # UserControls (.ascx)
├── webservices-actual.md                   # Archivos .asmx
└── javascript-actual.md                    # JavaScript legacy
```

**Contenido**: Inventario y análisis del código **existente**

### Diagramas/
```
📁 APLICACION-ACTUAL/Diagramas/
├── diagrama-secuencia-login-actual.md      # Login con Forms Auth actual
├── diagrama-secuencia-llamada-actual.md    # Llamada outbound actual
├── diagrama-flujo-postback.md              # Flujo típico postback
└── diagrama-componentes-actual.md          # Componentes del sistema actual
```

**Contenido**: Diagramas de **cómo funciona ahora**

---

## 🟢 APLICACION-PROPUESTA/

Documentación de la nueva aplicación Angular + .NET Core

### Arquitectura-Angular/
```
📁 APLICACION-PROPUESTA/Arquitectura-Angular/
├── arquitectura-general-angular.md         # Visión general Angular
├── estructura-modulos.md                   # Módulos lazy loading
├── estructura-componentes.md               # Árbol de componentes
├── diagramas-componentes/
│   ├── modulo-campanas.md
│   ├── modulo-operadores.md
│   ├── modulo-grupos.md
│   ├── modulo-chat.md
│   └── modulo-supervision.md
├── servicios-frontend.md                   # Services Angular
├── state-management.md                     # NgRx/Signals
├── guards-interceptors.md                  # Guards e Interceptors
├── routing.md                              # Configuración de rutas
└── ui-components.md                        # Componentes UI compartidos
```

**Contenido**: Diseño del **nuevo frontend** Angular

### Arquitectura-DotNet/
```
📁 APLICACION-PROPUESTA/Arquitectura-DotNet/
├── arquitectura-general-dotnet.md          # Visión general .NET Core
├── capas-arquitectura.md                   # Clean Architecture
├── diagramas-clases/
│   ├── modulo-campanas.md                  # Clases del dominio Campañas
│   ├── modulo-operadores.md
│   ├── modulo-grupos.md
│   ├── modulo-chat.md
│   └── modulo-ivr.md
├── controllers.md                          # API Controllers
├── dtos.md                                 # Data Transfer Objects
├── domain-entities.md                      # Entidades del dominio
├── repositories.md                         # Repositorios
├── services.md                             # Services de negocio
├── mappers.md                              # AutoMapper profiles
└── validators.md                           # FluentValidation
```

**Contenido**: Diseño del **nuevo backend** .NET

### Base-Datos/
```
📁 APLICACION-PROPUESTA/Base-Datos/
├── diagrama-er-propuesto.md                # ER optimizado
├── cambios-respecto-actual.md              # Qué cambia en la BD
├── migraciones.md                          # Scripts de migración
├── indices-propuestos.md                   # Nuevos índices
├── vistas-propuestas.md                    # Vistas SQL
└── optimizaciones.md                       # Mejoras de rendimiento
```

**Contenido**: Base de datos **mejorada** para la nueva app

### Migracion/
```
📁 APLICACION-PROPUESTA/Migracion/
├── estrategia-migracion.md                 # Strangler Pattern
├── matriz-conversion.md                    # ASPX → Angular Component
├── plan-fases.md                           # Migración incremental
├── riesgos-mitigacion.md                   # Riesgos y cómo mitigarlos
└── rollback-plan.md                        # Plan de rollback
```

**Contenido**: **Cómo migrar** de actual a propuesta

---

## 🟡 LOGICA-NEGOCIO/

Lógica de negocio que **NO cambia** entre versiones

### Flujos/
```
📁 LOGICA-NEGOCIO/Flujos/
├── flujo-alta-campana.md                   # Proceso crear campaña
├── flujo-llamada-outbound.md               # Marcación de llamada
├── flujo-asignacion-operador.md            # Asignar operador a grupo
├── flujo-gestion-chat.md                   # Gestión de chat
├── flujo-reprogramacion.md                 # Reprogramación automática
├── flujo-supervision-realtime.md           # Supervisión en vivo
├── flujo-exportacion-excel.md              # Exportar datos
└── flujo-tipificacion.md                   # Tipificar llamada
```

**Contenido**: Procesos de negocio **independientes** de la tecnología

### Reglas/
```
📁 LOGICA-NEGOCIO/Reglas/
├── reglas-negocio-campanas.md              # Reglas de campañas
├── reglas-negocio-operadores.md            # Reglas de operadores
├── reglas-marcacion.md                     # Reglas de marcación
├── reglas-tipificacion.md                  # Reglas de tipificación
├── reglas-reprogramacion.md                # Lógica de reprogramación
├── reglas-calendario.md                    # Reglas de horarios
├── validaciones.md                         # Validaciones de negocio
└── permisos.md                             # Matriz de permisos
```

**Contenido**: Reglas de negocio que **se mantienen**

---

## 📊 Tipos de Diagramas por Categoría

### 🔴 Diagramas de APLICACION-ACTUAL

| Tipo | Cantidad | Ejemplos |
|------|----------|----------|
| Arquitectura | 5 | Capas, ViewState, Postback |
| Base de Datos | 4 | ER actual por cada BD |
| Código | 6 | Inventario, estructura, navegación |
| Secuencia | 4 | Flujos con Postback |

**Total**: ~19 diagramas

### 🟢 Diagramas de APLICACION-PROPUESTA

| Tipo | Cantidad | Ejemplos |
|------|----------|----------|
| Arquitectura Angular | 15 | Módulos, componentes, servicios |
| Arquitectura .NET | 10 | Clases, capas, patterns |
| Base de Datos | 5 | ER nuevo, migraciones |
| Secuencia | 8 | Flujos con REST API |
| Migración | 4 | Strangler, fases, matriz |

**Total**: ~42 diagramas

### 🟡 Diagramas de LOGICA-NEGOCIO

| Tipo | Cantidad | Ejemplos |
|------|----------|----------|
| Flujos | 8 | Procesos de negocio |
| Reglas | 8 | Validaciones, permisos |

**Total**: ~16 diagramas

---

## 🎯 Cómo Usar Esta Documentación

### Para Desarrolladores
1. Lee primero **APLICACION-ACTUAL** para entender qué hay
2. Lee **LOGICA-NEGOCIO** para entender las reglas
3. Lee **APLICACION-PROPUESTA** para ver cómo implementar

### Para Arquitectos
1. Comienza con `00-Resumen-Ejecutivo/resumen-ejecutivo.md`
2. Revisa `APLICACION-PROPUESTA/Arquitectura-*/`
3. Analiza `APLICACION-PROPUESTA/Migracion/`

### Para Project Managers
1. Lee `PLAN_DOCUMENTACION_TECNICA.md`
2. Revisa `00-Resumen-Ejecutivo/resumen-ejecutivo.md`
3. Consulta `APLICACION-PROPUESTA/Migracion/plan-fases.md`

### Para QA/Testers
1. Estudia `LOGICA-NEGOCIO/Flujos/`
2. Revisa `LOGICA-NEGOCIO/Reglas/`
3. Compara comportamiento ACTUAL vs PROPUESTA

---

## 🔍 Convenciones

### Nomenclatura de Archivos

#### ACTUAL
- Sufijo: `-actual.md`
- Ejemplo: `arquitectura-general-actual.md`

#### PROPUESTA
- Sufijo: `-propuesto.md` o sin sufijo (por contexto de carpeta)
- Ejemplo: `arquitectura-general-angular.md`

#### LOGICA-NEGOCIO
- Prefijo: `flujo-` o `reglas-`
- Ejemplo: `flujo-alta-campana.md`

### Códigos de Color en Diagramas

- 🟢 Verde: Inicio / Éxito
- 🔴 Rojo: Fin / Error
- 🔵 Azul: Proceso importante
- 🟡 Amarillo: Decisión crítica
- 🟣 Púrpura: Base de datos
- 🌸 Rosa: Caché

### Íconos

- 📁 Carpeta
- 📄 Documento
- 🔴 Aplicación actual
- 🟢 Aplicación propuesta
- 🟡 Lógica de negocio
- ✅ Completado
- ⏳ En progreso
- ❌ Bloqueado

---

## 📈 Estado de la Documentación

| Fase | Estado | Completado |
|------|--------|------------|
| Análisis Inicial | ✅ | 100% |
| Diagramas ACTUAL | ⏳ | 40% |
| Diagramas PROPUESTA | ✅ | 100% |
| Lógica de Negocio | ✅ | 100% |
| Especificaciones Módulos | ⏳ | 0% |
| Plan de Migración | ✅ | 100% |

---

## 🔗 Enlaces Rápidos

### Documentos Clave
- [Plan Maestro](../PLAN_DOCUMENTACION_TECNICA.md)
- [Resumen Ejecutivo](00-Resumen-Ejecutivo/resumen-ejecutivo.md)
- [Arquitectura Actual](APLICACION-ACTUAL/Arquitectura/arquitectura-general-actual.md)
- [Arquitectura Propuesta Angular](APLICACION-PROPUESTA/Arquitectura-Angular/arquitectura-general-angular.md)
- [Arquitectura Propuesta .NET](APLICACION-PROPUESTA/Arquitectura-DotNet/arquitectura-general-dotnet.md)
- [Estrategia de Migración](APLICACION-PROPUESTA/Migracion/estrategia-migracion.md)

### Repositorio
- **GitHub**: https://github.com/JGI2021/ManteniWeb.git

---

## 📝 Historial de Cambios

### 2025-10-27
- ✅ Creación inicial de documentación
- ✅ Generación de 50+ diagramas UML
- ✅ Reorganización en ACTUAL / PROPUESTA / LOGICA-NEGOCIO

---

## 👥 Contribuidores

- **Análisis y Documentación**: Claude AI Assistant
- **Revisión**: Equipo de desarrollo

---

## 📞 Contacto

Para preguntas sobre esta documentación, contactar al equipo de arquitectura del proyecto.

---

**Última actualización**: 2025-10-27
