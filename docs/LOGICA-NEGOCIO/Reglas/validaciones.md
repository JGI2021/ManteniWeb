# Reglas de Negocio: Validaciones Generales

> **Lógica de negocio independiente de tecnología**
> Catálogo consolidado de todas las validaciones del sistema Tiphone v6

---

## 📊 Origen de las Reglas

Este documento consolida validaciones de **3 orígenes**:

- **📘 MANUAL**: Extraídas del Manual oficial Tiphone v6
- **💻 CÓDIGO**: Extraídas del código fuente
- **🧠 INFERIDA**: Deducidas por lógica/mejores prácticas

Este documento actúa como **índice centralizado** de todas las validaciones documentadas en otros archivos de reglas.

---

## 1. Clasificación de Validaciones

### Por Tipo

| Tipo | Descripción | Ejemplos |
|------|-------------|----------|
| **Formato** | Estructura de datos | Email, teléfono, fecha |
| **Longitud** | Mínimo/máximo caracteres | Nombre <= 100, Alias <= 15 |
| **Rango** | Valores numéricos | Edad 18-99, Prioridad 1-5 |
| **Obligatoriedad** | Campos requeridos | Alias, Nombre, Teléfono |
| **Unicidad** | Valores únicos | Email, Usuario, Extensión |
| **Integridad** | Relaciones entre entidades | No eliminar si tiene hijos |
| **Negocio** | Lógica específica | Fecha fin > inicio, Perfil por defecto |
| **Temporal** | Fechas y horarios | Fecha futura, Horario laboral |

### Por Severidad

| Severidad | Comportamiento | Ejemplos |
|-----------|----------------|----------|
| **ERROR** | Bloquea operación | Campo obligatorio vacío |
| **ADVERTENCIA** | Permite continuar con confirmación | Horario fuera de rango legal |
| **INFO** | Solo informa | Registro guardado correctamente |

---

## 2. Validaciones por Módulo

### 2.1 Tipificaciones

Referencia: `reglas-tipificacion.md`

| Validación | Tipo | Origen | Mensaje |
|------------|------|--------|---------|
| **Nombre tipificación <= 100 caracteres** | Longitud | 📘 MANUAL | "El nombre no puede superar los 100 caracteres" |
| **Nombre tipificación obligatorio** | Obligatoriedad | 🧠 INFERIDA | "El nombre es obligatorio" |
| **No eliminar tipificación asociada a perfil** | Integridad | 📘 MANUAL | "No se puede eliminar porque está asociada a perfiles" |
| **Debe existir al menos 1 perfil** | Negocio | 📘 MANUAL | "Debe existir al menos un perfil en el sistema" |
| **Un perfil debe ser "Por defecto"** | Negocio | 📘 MANUAL | "No se puede eliminar el perfil por defecto" |
| **No eliminar perfil asignado a grupo** | Integridad | 📘 MANUAL | "No se puede eliminar porque está asignado a grupos" |

### 2.2 Condiciones

Referencia: `reglas-tipificacion.md`

| Validación | Tipo | Origen | Mensaje |
|------------|------|--------|---------|
| **Alias <= 15 caracteres** | Longitud | 📘 MANUAL | "El alias no puede superar los 15 caracteres" |
| **Descripción <= 50 caracteres** | Longitud | 📘 MANUAL | "La descripción no puede superar los 50 caracteres" |
| **Identificador asignado por sistema** | Formato | 📘 MANUAL | "El identificador no puede ser modificado" |
| **No eliminar si asociada a lista o filtro** | Integridad | 📘 MANUAL | "No se puede eliminar porque está asociada a listas/filtros" |

### 2.3 Tipos de Operación

Referencia: `reglas-tipificacion.md`

| Validación | Tipo | Origen | Mensaje |
|------------|------|--------|---------|
| **Nombre <= 25 caracteres** | Longitud | 📘 MANUAL | "El nombre no puede superar los 25 caracteres" |
| **Descripción <= 80 caracteres** | Longitud | 📘 MANUAL | "La descripción no puede superar los 80 caracteres" |
| **No eliminar si usado por campaña** | Integridad | 📘 MANUAL | "No se puede eliminar porque lo usan una o más campañas" |
| **CLIENTE_ID obligatorio** | Obligatoriedad | 📘 MANUAL | "El parámetro CLIENTE_ID es obligatorio" |
| **Tipo ejecución: 3 opciones** | Rango | 📘 MANUAL | "Seleccione: URL estándar, URL dependiente o Integración tiphone" |
| **Tipo función: 2 opciones** | Rango | 📘 MANUAL | "Seleccione: Operación Telemarketing u Operación libre" |

### 2.4 Skills

Referencia: `reglas-tipificacion.md`

| Validación | Tipo | Origen | Mensaje |
|------------|------|--------|---------|
| **No eliminar skill asignado a operadores** | Integridad | 📘 MANUAL | "No se puede eliminar porque hay operadores con este skill" |

### 2.5 Direcciones IP

Referencia: `ORIGEN-REGLAS.md`

| Validación | Tipo | Origen | Mensaje |
|------------|------|--------|---------|
| **Dirección IP <= 15 caracteres** | Longitud | 📘 MANUAL | "La dirección IP no puede superar los 15 caracteres" |
| **Puerto es numérico** | Formato | 📘 MANUAL | "El puerto debe ser un valor numérico" |
| **Formato IP válido** | Formato | 🧠 INFERIDA | "Formato de IP inválido (ej: 192.168.1.1)" |
| **Puerto en rango 1-65535** | Rango | 🧠 INFERIDA | "El puerto debe estar entre 1 y 65535" |

### 2.6 Campañas

Referencia: `reglas-negocio-campanas.md`

| Validación | Tipo | Origen | Mensaje |
|------------|------|--------|---------|
| **Alias obligatorio** | Obligatoriedad | 🧠 INFERIDA | "El alias es obligatorio" |
| **Alias único por cuenta** | Unicidad | 🧠 INFERIDA | "Ya existe una campaña con ese alias" |
| **Nombre obligatorio** | Obligatoriedad | 🧠 INFERIDA | "El nombre es obligatorio" |
| **Fecha fin > Fecha inicio** | Temporal | 🧠 INFERIDA | "La fecha de fin debe ser posterior a la de inicio" |
| **Estado inicial = Pausada** | Negocio | 🧠 INFERIDA | "Nueva campaña se crea en estado Pausada" |
| **Máximo 50 listas activas** | Rango | 🧠 INFERIDA | "La campaña ya tiene 50 listas activas" |
| **Transiciones de estado válidas** | Negocio | 🧠 INFERIDA | "No se puede pasar de Finalizada a Activa" |

### 2.7 Operadores

Referencia: `reglas-negocio-operadores.md`

| Validación | Tipo | Origen | Mensaje |
|------------|------|--------|---------|
| **Usuario >= 4 caracteres** | Longitud | 🧠 INFERIDA | "El usuario debe tener al menos 4 caracteres" |
| **Password >= 6 caracteres** | Longitud | 🧠 INFERIDA | "La contraseña debe tener al menos 6 caracteres" |
| **Email único** | Unicidad | 🧠 INFERIDA | "Ya existe un operador con ese email" |
| **Usuario único** | Unicidad | 🧠 INFERIDA | "Ya existe un operador con ese usuario" |
| **Extensión única por cuenta** | Unicidad | 🧠 INFERIDA | "Ya existe un operador con esa extensión" |
| **Máximo 10 grupos por operador** | Rango | 🧠 INFERIDA | "Un operador no puede pertenecer a más de 10 grupos" |
| **Email formato válido** | Formato | 🧠 INFERIDA | "Formato de email inválido" |
| **Extensión numérica** | Formato | 🧠 INFERIDA | "La extensión debe ser numérica" |

### 2.8 Marcación

Referencia: `reglas-marcacion.md`

| Validación | Tipo | Origen | Mensaje |
|------------|------|--------|---------|
| **Formato teléfono: 9-15 dígitos** | Longitud | 🧠 INFERIDA | "El teléfono debe tener entre 9 y 15 dígitos" |
| **Teléfono solo números** | Formato | 🧠 INFERIDA | "El teléfono solo puede contener números" |
| **Tasa de abandono <= 3%** | Rango | 🧠 INFERIDA | "Tasa de abandono máxima: 3%" |
| **Máximo intentos: 3-5** | Rango | 🧠 INFERIDA | "Se ha alcanzado el máximo de intentos" |
| **Timeout de bloqueo: 5 minutos** | Temporal | 🧠 INFERIDA | "Registro bloqueado temporalmente" |
| **No marcar números en Lista Robinson** | Negocio | 🧠 INFERIDA | "Número en lista de exclusión (Robinson)" |

### 2.9 Reprogramaciones

Referencia: `reglas-reprogramacion.md`

| Validación | Tipo | Origen | Mensaje |
|------------|------|--------|---------|
| **Fecha obligatoria** | Obligatoriedad | 🧠 INFERIDA | "La fecha de reprogramación es obligatoria" |
| **Hora obligatoria** | Obligatoriedad | 🧠 INFERIDA | "La hora de reprogramación es obligatoria" |
| **Fecha futura** | Temporal | 🧠 INFERIDA | "La fecha debe ser futura" |
| **Máximo 3 intentos diarios** | Rango | 🧠 INFERIDA | "Máximo de intentos diarios alcanzado (3)" |
| **Máximo 10 intentos totales** | Rango | 🧠 INFERIDA | "Máximo de intentos totales alcanzado (10)" |
| **Horario permitido** | Temporal | 🧠 INFERIDA | "Fuera del horario permitido (09:00-21:00)" |
| **No reprogramar en festivo** | Temporal | 🧠 INFERIDA | "No se puede programar en día festivo" |
| **Tipificación permite reprogram** | Negocio | 🧠 INFERIDA | "Esta tipificación no permite reprogramación" |

### 2.10 Calendario

Referencia: `reglas-calendario.md`

| Validación | Tipo | Origen | Mensaje |
|------------|------|--------|---------|
| **Hora inicio obligatoria** | Obligatoriedad | 🧠 INFERIDA | "La hora de inicio es obligatoria" |
| **Hora fin obligatoria** | Obligatoriedad | 🧠 INFERIDA | "La hora de fin es obligatoria" |
| **Hora fin > Hora inicio** | Temporal | 🧠 INFERIDA | "La hora de fin debe ser posterior a la de inicio" |
| **Al menos 1 día seleccionado** | Obligatoriedad | 💻 CÓDIGO | "Debe seleccionar al menos un día" |
| **Horarios no se solapan** | Negocio | 🧠 INFERIDA | "Los horarios se solapan" |
| **Horario legal (09:00-21:00)** | Rango | 🧠 INFERIDA | "Fuera del horario legal recomendado" |

---

## 3. Validaciones de Formato

### 3.1 Email 🧠

```regex
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```

**Ejemplos válidos**:
- usuario@ejemplo.com
- nombre.apellido@empresa.es
- test+tag@dominio.co.uk

**Ejemplos inválidos**:
- usuario@ejemplo (sin dominio completo)
- @ejemplo.com (sin nombre)
- usuario@.com (sin subdominio)

### 3.2 Teléfono 🧠

```regex
^\+?[0-9]{9,15}$
```

**Ejemplos válidos**:
- 912345678 (España fijo)
- 612345678 (España móvil)
- +34912345678 (Internacional)
- 0034612345678 (Internacional alternativo)

**Ejemplos inválidos**:
- 12345 (muy corto)
- 91-234-56-78 (con guiones)
- (91) 234 5678 (con paréntesis/espacios)

### 3.3 Dirección IP 🧠

```regex
^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$
```

**Ejemplos válidos**:
- 192.168.1.1
- 10.0.0.1
- 172.16.0.1

**Ejemplos inválidos**:
- 256.1.1.1 (octeto > 255)
- 192.168.1 (solo 3 octetos)
- 192.168.01.1 (ceros a la izquierda)

### 3.4 Fecha 🧠

**Formato**: ISO 8601 `YYYY-MM-DD` o español `DD/MM/YYYY`

**Ejemplos válidos**:
- 2025-10-27
- 27/10/2025

**Validaciones adicionales**:
- Año entre 1900 y 2100
- Mes entre 1 y 12
- Día válido para el mes (considerar bisiestos)

### 3.5 Hora 🧠

**Formato**: 24 horas `HH:MM` o `HH:MM:SS`

**Ejemplos válidos**:
- 09:00
- 14:30
- 23:59:59

**Ejemplos inválidos**:
- 25:00 (hora > 23)
- 14:60 (minutos > 59)
- 9:00 (sin cero inicial)

---

## 4. Validaciones de Integridad Referencial

### Reglas de Eliminación

| Entidad | No se puede eliminar si... | Acción |
|---------|---------------------------|--------|
| **Tipificación Primaria** | Asociada a perfil | Desasociar primero |
| **Perfil** | Asignado a grupo | Desasignar primero |
| **Perfil** | Es el último del sistema | Crear otro primero |
| **Perfil** | Es el "Por defecto" | Marcar otro como defecto |
| **Condición** | Asociada a lista o filtro | Desasociar primero |
| **Tipo de Operación** | Usado por campaña | Cambiar campaña primero |
| **Skill** | Asignado a operadores | Desasignar primero |
| **Campaña** | Tiene llamadas activas | Finalizar llamadas primero |
| **Operador** | En llamada activa | Esperar fin de llamada |
| **Grupo** | Tiene operadores asignados | Reasignar operadores |
| **Calendario** | Usado por campaña/grupo | Cambiar a otro calendario |

### Cascada de Eliminación Permitida 🧠

| Entidad Padre | Entidad Hija | Comportamiento |
|---------------|--------------|----------------|
| **Campaña** | Listas | Eliminar en cascada |
| **Lista** | Registros | Eliminar en cascada |
| **Tipificación Primaria** | Tipificaciones Secundarias | Eliminar en cascada |
| **Calendario** | Horarios | Eliminar en cascada |
| **Calendario** | Días Especiales | Eliminar en cascada |

---

## 5. Matriz de Validaciones por Operación

### Crear

| Módulo | Validaciones Aplicables |
|--------|------------------------|
| **Campaña** | Obligatoriedad, Unicidad, Formato, Fechas |
| **Operador** | Obligatoriedad, Unicidad, Formato, Longitud |
| **Tipificación** | Obligatoriedad, Longitud |
| **Horario** | Obligatoriedad, Rango temporal, Solapamiento |
| **Reprogramación** | Obligatoriedad, Fecha futura, Horario |

### Modificar

| Módulo | Validaciones Adicionales |
|--------|-------------------------|
| **Campaña** | Estado válido para modificación |
| **Operador** | No en llamada activa |
| **Perfil** | Si es defecto, marcar otro primero |
| **Horario** | No afectar llamadas en curso |

### Eliminar

| Módulo | Validaciones Adicionales |
|--------|-------------------------|
| **Tipificación** | No asociada a perfil |
| **Perfil** | No asignado a grupo, no último, no defecto |
| **Skill** | No asignado a operadores |
| **Campaña** | Sin llamadas activas |

---

## 6. Mensajes de Validación Estandarizados

### Plantillas de Mensajes

**ERROR - Campo obligatorio**:
```
"El campo {nombre_campo} es obligatorio"
"El {entidad} debe tener un {campo}"
```

**ERROR - Longitud excedida**:
```
"El campo {nombre_campo} no puede superar los {max} caracteres"
"El {entidad} tiene una longitud máxima de {max} caracteres"
```

**ERROR - Formato inválido**:
```
"El formato del {nombre_campo} es inválido"
"El {nombre_campo} debe tener el formato {formato}"
```

**ERROR - Unicidad**:
```
"Ya existe un {entidad} con ese {campo}"
"El {campo} '{valor}' ya está en uso"
```

**ERROR - Integridad referencial**:
```
"No se puede eliminar {entidad} porque está asociado/usado por {entidad_relacionada}"
"Primero debe desasociar/desasignar {entidad} de {entidad_relacionada}"
```

**ADVERTENCIA - Fuera de rango legal**:
```
"El {campo} está fuera del rango legal/recomendado ({min}-{max})"
"Se recomienda que {campo} esté entre {min} y {max}"
```

---

## 7. Validaciones del Lado Cliente vs Servidor

### Cliente (JavaScript/Angular) 🧠

**Propósito**: Mejorar UX, feedback inmediato

**Validaciones recomendadas**:
- ✅ Formato (email, teléfono, IP)
- ✅ Longitud (min/max caracteres)
- ✅ Obligatoriedad
- ✅ Formato de fecha/hora
- ✅ Rangos numéricos simples

**NO confiar 100%**: El cliente es manipulable

### Servidor (C# / .NET) 🧠

**Propósito**: Seguridad, integridad

**Validaciones OBLIGATORIAS**:
- ✅ TODAS las validaciones del cliente
- ✅ Unicidad (consultar BD)
- ✅ Integridad referencial (consultar BD)
- ✅ Lógica de negocio compleja
- ✅ Permisos y autorización
- ✅ Validaciones de estado

**Principio**: Never trust the client

---

## 8. Códigos de Error Estandarizados 🧠

### Propuesta de Códigos

| Código | Categoría | Ejemplos |
|--------|-----------|----------|
| **VAL-001** | Campo obligatorio | Email, Nombre, Alias |
| **VAL-002** | Longitud excedida | Nombre > 100 |
| **VAL-003** | Longitud insuficiente | Password < 6 |
| **VAL-004** | Formato inválido | Email, Teléfono, IP |
| **VAL-005** | Valor duplicado | Email, Usuario, Extensión |
| **VAL-006** | Fuera de rango | Puerto < 1, Prioridad > 5 |
| **VAL-007** | Fecha/hora inválida | Fecha pasada, Hora fin < inicio |
| **VAL-008** | Integridad referencial | Eliminar con hijos |
| **VAL-009** | Regla de negocio | No último perfil, No defecto |
| **VAL-010** | Estado inválido | Modificar finalizada |

**Uso**:
```json
{
  "success": false,
  "errorCode": "VAL-005",
  "errorMessage": "Ya existe un operador con el email 'juan@ejemplo.com'",
  "field": "email",
  "value": "juan@ejemplo.com"
}
```

---

## 9. Testing de Validaciones

### Casos de Prueba por Validación

Para cada validación, probar:

1. **Happy path**: Valor válido → Acepta
2. **Boundary**: Valor en límite → Acepta/Rechaza según corresponda
3. **Invalid**: Valor inválido → Rechaza con mensaje correcto
4. **Null/Empty**: Valor nulo/vacío → Acepta si opcional, rechaza si obligatorio
5. **SQL Injection**: Intentar inyección → Debe sanitizar/rechazar
6. **XSS**: Intentar script injection → Debe sanitizar/rechazar

### Ejemplo: Validación de Email

```gherkin
Escenario: Email válido
  Dado un operador con email "usuario@ejemplo.com"
  Cuando se guarda el operador
  Entonces la operación debe tener éxito

Escenario: Email sin dominio
  Dado un operador con email "usuario@ejemplo"
  Cuando se guarda el operador
  Entonces debe mostrar error "Formato de email inválido"

Escenario: Email vacío (obligatorio)
  Dado un operador sin email
  Cuando se guarda el operador
  Entonces debe mostrar error "El email es obligatorio"

Escenario: Email duplicado
  Dado un operador existente con email "juan@ejemplo.com"
  Y un nuevo operador con email "juan@ejemplo.com"
  Cuando se guarda el nuevo operador
  Entonces debe mostrar error "Ya existe un operador con ese email"
```

---

## 10. Mejores Prácticas

### 10.1 Diseño de Validaciones 🧠

1. **Validar temprano**: Cliente primero, servidor siempre
2. **Mensajes claros**: Indicar qué está mal y cómo corregirlo
3. **Consistencia**: Mismo campo, mismo mensaje en toda la app
4. **Internacionalización**: Mensajes traducibles
5. **Logging**: Registrar validaciones fallidas para análisis

### 10.2 Implementación 🧠

```csharp
// Ejemplo de validación reutilizable
public class ValidadorCampos
{
    public static ValidationResult ValidarEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            return ValidationResult.Error("VAL-001", "El email es obligatorio");

        var regex = new Regex(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
        if (!regex.IsMatch(email))
            return ValidationResult.Error("VAL-004", "Formato de email inválido");

        return ValidationResult.Success();
    }
}
```

### 10.3 Documentación 🧠

Cada validación debe documentar:
- **Qué**: Descripción de la regla
- **Por qué**: Razón de negocio o técnica
- **Cuándo**: En qué operaciones aplica
- **Dónde**: Cliente, servidor o ambos
- **Mensaje**: Texto exacto del error

---

**Documento**: Validaciones Generales del Sistema
**Versión**: 1.0
**Fecha**: 2025-10-27
**Estado**: Catálogo consolidado de validaciones de todos los módulos
**Referencias**: reglas-tipificacion.md, reglas-negocio-campanas.md, reglas-negocio-operadores.md, reglas-marcacion.md, reglas-reprogramacion.md, reglas-calendario.md
