# Origen de las Reglas de Negocio

> **Propósito**: Documentar la fuente de cada regla de negocio para trazabilidad

---

## Clasificación de Origen

Cada regla de negocio está clasificada según su origen:

### 📘 MANUAL - Del Manual Oficial
- **Fuente**: Manual PDF "Tiphone v6 Administración y Supervisión" convertido a MD
- **Confiabilidad**: ALTA (documentación oficial)
- **Ejemplos**: Longitudes de campos, restricciones explícitas, flujos documentados
- **Ubicación**: `/ManualMD/Tiphone_Admin_Supervision_Part*.md`

### 💻 CÓDIGO - Del Código Fuente
- **Fuente**: Archivos .aspx, .js, Web.config, estructura de BD
- **Confiabilidad**: MUY ALTA (es lo que hace realmente el sistema)
- **Ejemplos**: Validaciones JavaScript, queries SQL, configuraciones
- **Limitación**: Código compilado en DLLs no accesible directamente

### 🧠 INFERIDA - Lógica Deducida
- **Fuente**: Inferencia basada en contexto, mejores prácticas, estándares
- **Confiabilidad**: MEDIA (requiere validación)
- **Ejemplos**: Estados lógicos, límites razonables, comportamientos esperados
- **Nota**: Deben validarse con usuario o código cuando sea posible

---

## Reglas por Origen

### 📘 Reglas del MANUAL

#### Tipificaciones

| Regla | Origen | Referencia |
|-------|--------|------------|
| **Nombre tipificación primaria máx 100 caracteres** | 📘 MANUAL | Part7, pág 15: "Tiene una longitud máxima de 100 caracteres alfanuméricos" |
| **No se puede eliminar tipificación si está asociada a perfil** | 📘 MANUAL | Part7, pág 15: "Como restricción, no podremos eliminar una tipificación primaria si está asociada a algún perfil" |
| **Debe existir al menos un perfil en el sistema** | 📘 MANUAL | Part7, pág 17: "Debe de existir al menos un perfil en el sistema" |
| **Un perfil debe ser marcado como "Por defecto"** | 📘 MANUAL | Part7, pág 17: "uno debe de ser el perfil 'Por defecto'" |
| **No se puede eliminar perfil asignado a grupo** | 📘 MANUAL | Part7, pág 17: "Como restricción, no podemos eliminar un perfil que esté asignado a un grupo" |
| **Si grupo no tiene perfil, usa el por defecto** | 📘 MANUAL | Part7, pág 18: "Si no tiene ninguno asociado, se usará el que está indicado como 'Por defecto'" |

#### Condiciones

| Regla | Origen | Referencia |
|-------|--------|------------|
| **Alias máximo 15 caracteres** | 📘 MANUAL | Part7, pág 21: "Este campo permite un máximo de 15 caracteres alfanuméricos" |
| **Descripción máximo 50 caracteres** | 📘 MANUAL | Part7, pág 21: "Este campo permite un máximo de 50 caracteres alfanuméricos" |
| **Identificador asignado por el sistema** | 📘 MANUAL | Part7, pág 21: "este dato lo asigna el sistema y no puede ser modificado" |
| **No se puede eliminar si está asociada a lista o filtro** | 📘 MANUAL | Part7, pág 21: "Como restricción, no podrá eliminarse si está asociada a una lista o filtro" |

#### Tipos de Operación

| Regla | Origen | Referencia |
|-------|--------|------------|
| **Nombre máximo 25 caracteres** | 📘 MANUAL | Part7, pág 23: "Tendrá una longitud máxima de 25 caracteres" |
| **Descripción máximo 80 caracteres** | 📘 MANUAL | Part7, pág 23: "Tendrá una longitud máxima de 80 caracteres" |
| **No se puede eliminar si lo usa una campaña** | 📘 MANUAL | Part7, pág 22: "Como restricción, no se puede eliminar un tipo de operación que esté usando una o más campañas" |
| **Parámetro CLIENTE_ID es obligatorio** | 📘 MANUAL | Part7, pág 24: "El parámetro CLIENTE_ID es obligatorio" |
| **Tipo de ejecución: 3 opciones** | 📘 MANUAL | Part7, pág 23: "URL estándar, URL dependiente de la integración o Integración tiphone" |
| **Tipo de función: 2 opciones** | 📘 MANUAL | Part7, pág 23: "Operación de Telemarketing o Operación libre" |

#### Skills

| Regla | Origen | Referencia |
|-------|--------|------------|
| **No se puede eliminar skill asignado a operadores** | 📘 MANUAL | Part7, pág 25: "Como restricción, no se puede eliminar un skill si existen operadores a los que se les ha asignado el skill" |

#### Direcciones IP

| Regla | Origen | Referencia |
|-------|--------|------------|
| **Dirección IP máximo 15 caracteres** | 📘 MANUAL | Part7, pág 13: "Tiene una longitud máxima de 15 caracteres alfanuméricos" |
| **Puerto es campo numérico** | 📘 MANUAL | Part7, pág 13: "Campo numérico" |

---

### 💻 Reglas del CÓDIGO

#### Web.config

| Regla | Origen | Referencia |
|-------|--------|------------|
| **Timeout BD: 150 segundos** | 💻 CÓDIGO | Web.config: `Connection Timeout=150` |
| **Session timeout: 200 minutos** | 💻 CÓDIGO | Web.config: `<sessionState timeout="200">` |
| **Forms auth timeout: 120 minutos** | 💻 CÓDIGO | Web.config: `<forms timeout="120">` |
| **CustomErrors mode: Off** | 💻 CÓDIGO | Web.config: `<customErrors mode="Off" />` |

#### JavaScript (ListasCampana.js)

| Regla | Origen | Referencia |
|-------|--------|------------|
| **Mostrar estados: Activos, Inactivos, Cerrados** | 💻 CÓDIGO | ListasCampana.js líneas 108-136: filtros por clase CSS |
| **Estadísticas de lista: finalizados, no tocados, reprogramados** | 💻 CÓDIGO | ListasCampana.js líneas 31-46: campos del objeto regs |

#### Integraciones (Web.config)

| Regla | Origen | Referencia |
|-------|--------|------------|
| **URL Persuader API** | 💻 CÓDIGO | Web.config: `https://vpcpre.adlantia.com/MantPersuaderApi/api/v1.0` |
| **URL Chat Server** | 💻 CÓDIGO | Web.config: `https://vpcpre.adlantia.com/ChatServer/` |
| **URL Recordings API** | 💻 CÓDIGO | Web.config: `https://vpcpre.adlantia.com/tiphoneRecords/api/recordings/` |
| **Security Center** | 💻 CÓDIGO | Web.config: `UsarSecurityToken=N` (no activo) |

---

### 🧠 Reglas INFERIDAS

#### Campañas

| Regla | Origen | Justificación |
|-------|--------|---------------|
| **Estado inicial = Pausada** | 🧠 INFERIDA | Lógica estándar: permite configurar antes de activar |
| **Fecha fin > Fecha inicio** | 🧠 INFERIDA | Validación lógica universal |
| **Alias único por cuenta** | 🧠 INFERIDA | Evitar confusión, estándar de sistemas |
| **Máximo 50 listas activas** | 🧠 INFERIDA | Limitación razonable basada en sistemas similares |
| **Transiciones de estado Pausada ↔ Activa ↔ Finalizada** | 🧠 INFERIDA | Flujo lógico de ciclo de vida |

#### Operadores

| Regla | Origen | Justificación |
|-------|--------|---------------|
| **Usuario mínimo 4 caracteres** | 🧠 INFERIDA | Estándar de seguridad |
| **Password mínimo 6 caracteres** | 🧠 INFERIDA | Estándar de seguridad |
| **Email único** | 🧠 INFERIDA | Evitar duplicados, comunicación |
| **Usuario único** | 🧠 INFERIDA | Identificación única necesaria |
| **Extensión única por cuenta** | 🧠 INFERIDA | Necesario para telefonía (Asterisk) |
| **Máximo 10 grupos por operador** | 🧠 INFERIDA | Límite razonable para evitar confusión |
| **Estados: Desconectado, Disponible, EnLlamada, Tipificando, Pausa** | 🧠 INFERIDA | Estados lógicos de un operador en contact center |

#### Pausas

| Regla | Origen | Justificación |
|-------|--------|---------------|
| **Tipos de pausa con duraciones máximas** | 🧠 INFERIDA | Estándar en contact centers |
| **Baño: 5 min, Café: 10 min, Comida: 60 min** | 🧠 INFERIDA | Tiempos razonables |
| **Límite diario 30 min pausas personales** | 🧠 INFERIDA | Control de productividad |
| **Alerta si excede tiempo + 2 minutos** | 🧠 INFERIDA | Margen razonable antes de alertar |

#### Marcación

| Regla | Origen | Justificación |
|-------|--------|---------------|
| **Tasa de abandono máxima 3%** | 🧠 INFERIDA | Estándar legal/industria en marcación predictiva |
| **Máximo intentos: 3-5** | 🧠 INFERIDA | Balance entre insistencia y molestia |
| **Bloqueo registro para evitar marcación simultánea** | 🧠 INFERIDA | Necesario para evitar duplicados |
| **Timeout de bloqueo: 5 minutos** | 🧠 INFERIDA | Liberar si proceso falla |
| **Formato teléfono: 9-15 dígitos** | 🧠 INFERIDA | Estándar internacional |
| **Lista Robinson (no llamar)** | 🧠 INFERIDA | Requisito legal en España |

---

## Reglas Pendientes de Validación

### A Verificar en Código

| Regla | Razón |
|-------|-------|
| **Validaciones exactas de campos en formularios** | Código compilado en DLLs, no accesible |
| **Mensajes de error exactos** | Pueden estar en recursos o base de datos |
| **Límites numéricos exactos (máx lineas, etc.)** | Pueden ser configurables |
| **Algoritmo predictivo exacto** | Lógica en DLL compilada |

### A Verificar con Usuario

| Regla | Razón |
|-------|-------|
| **Workflow aprobaciones de pausa** | Puede variar según implementación |
| **Permisos específicos por rol** | Pueden ser configurables |
| **Integraciones exactas con Persuader** | Detalles técnicos de integración |
| **Comportamiento específico de Asterisk** | Configuración específica del cliente |

---

## Metodología de Extracción

### 1. Manual PDF → MD
- Convertido a Markdown en `ManualMD/`
- Búsqueda de patrones: "obligatorio", "no puede", "restricción", "máximo", "mínimo"
- Extracción de reglas explícitas

### 2. Web.config
- Cadenas de conexión
- Configuraciones de integración
- Timeouts y límites

### 3. Estructura de BD
- Análisis de campos obligatorios (NOT NULL)
- Constraints y foreign keys
- Índices únicos

### 4. JavaScript
- Validaciones del lado cliente
- Lógica de UI/UX
- Llamadas AJAX

### 5. Inferencia Lógica
- Basada en comportamiento esperado
- Mejores prácticas de la industria
- Estándares de contact centers

---

## Próximos Pasos

1. ✅ Continuar extrayendo reglas del Manual Part7.md
2. ⏳ Buscar archivos .aspx.cs si están disponibles
3. ⏳ Analizar JavaScript para validaciones cliente
4. ⏳ Consultar base de datos para constraints
5. ⏳ Validar con usuario las reglas inferidas
6. ⏳ Marcar cada regla en documentos con su origen

---

**Documento**: Origen de Reglas de Negocio
**Versión**: 1.0
**Fecha**: 2025-10-27
**Actualización**: Continua según se descubren nuevas reglas
