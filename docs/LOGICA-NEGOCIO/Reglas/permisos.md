# Reglas de Negocio: Permisos y Roles

> **Lógica de negocio independiente de tecnología**
> Matriz de permisos y roles del sistema Tiphone v6

---

## 📊 Origen de las Reglas

Este documento contiene reglas de **3 orígenes**:

- **📘 MANUAL**: Extraídas del Manual oficial Tiphone v6 (Part7, págs 12-26)
- **💻 CÓDIGO**: Extraídas de análisis de configuración
- **🧠 INFERIDA**: Deducidas por lógica y mejores prácticas

Consulta `ORIGEN-REGLAS.md` para referencias exactas.

---

## 1. Roles del Sistema

### 1.1 Roles Principales 🧠

| Rol | Descripción | Nivel de Acceso |
|-----|-------------|-----------------|
| **Administrador** | Acceso completo al sistema | TOTAL |
| **Supervisor** | Supervisión y gestión de campañas/operadores | ALTO |
| **Operador** | Atención de llamadas y tipificación | MEDIO |
| **Consultor** | Solo lectura de reportes/estadísticas | BAJO |

### 1.2 Características por Rol 🧠

#### Administrador

**Permisos globales**:
- ✅ Configuración del subsistema
- ✅ Gestión de usuarios y roles
- ✅ Configuración de campañas
- ✅ Configuración de tipificaciones, calendarios, predicciones
- ✅ Acceso a todos los módulos
- ✅ Modificación de configuración crítica

**Restricciones**:
- ❌ Ninguna (acceso total)

#### Supervisor

**Permisos**:
- ✅ Supervisión en tiempo real
- ✅ Ver estadísticas y reportes
- ✅ Gestionar operadores de su equipo
- ✅ Pausar/activar campañas
- ✅ Modificar asignaciones operador-grupo
- ✅ Ver grabaciones de llamadas

**Restricciones**:
- ❌ No puede modificar configuración del subsistema
- ❌ No puede crear/eliminar usuarios administradores
- ❌ Solo ve campañas/grupos asignados

#### Operador

**Permisos**:
- ✅ Atender llamadas asignadas
- ✅ Tipificar llamadas
- ✅ Reprogramar llamadas
- ✅ Ver datos del cliente en llamada
- ✅ Cambiar su propia contraseña
- ✅ Ver su propio horario

**Restricciones**:
- ❌ No ve datos de otros operadores
- ❌ No accede a configuración
- ❌ No ve estadísticas globales
- ❌ No puede cambiar asignaciones de grupo

#### Consultor

**Permisos**:
- ✅ Ver reportes y estadísticas
- ✅ Exportar datos
- ✅ Ver histórico de llamadas

**Restricciones**:
- ❌ No puede modificar nada
- ❌ No ve datos en tiempo real de operadores
- ❌ Solo lectura

---

## 2. Permisos Extraídos del Manual

### 2.1 Configuración General 📘

> **Origen**: 📘 MANUAL - Part7, pág 12

| Módulo | Permiso Requerido | Roles con Acceso |
|--------|-------------------|------------------|
| **Configuración general** | `Administrar el subsistema` O `Supervisar el subsistema` | Administrador, Supervisor |
| **Apariencia** | `Administrar subsistema` O `Supervisar subsistema` | Administrador, Supervisor |
| **Direcciones IP** | `Administrar subsistema` | Administrador |
| **Tipificaciones** | `Administrar subsistema` | Administrador |
| **Condiciones** | `Administrar todas o algunas campañas` O `Supervisar todas o algunas campañas` | Administrador, Supervisor |
| **Tipos de operación** | `Administrar todas o algunas campañas` | Administrador, Supervisor |
| **Skills** | `Administrar operadores` | Administrador, Supervisor |

### 2.2 Permisos Específicos Documentados 📘

| Permiso | Permite | Módulos Afectados |
|---------|---------|-------------------|
| **Administrar el subsistema** | Configuración completa del sistema | Todos los módulos de Configuración |
| **Supervisar el subsistema** | Ver y supervisar (no modificar) | Visualización de configuración |
| **Administrar todas o algunas campañas** | Crear/modificar/eliminar campañas | Campañas, Listas, Condiciones |
| **Supervisar todas o algunas campañas** | Ver campañas y estadísticas | Reportes de campañas |
| **Administrar operadores** | Crear/modificar/eliminar operadores | Operadores, Skills, Grupos |

---

## 3. Matriz de Permisos por Módulo

### 3.1 Campañas

| Operación | Administrador | Supervisor | Operador | Consultor |
|-----------|---------------|------------|----------|-----------|
| Crear campaña | ✅ | ✅ (propias) | ❌ | ❌ |
| Modificar campaña | ✅ | ✅ (propias) | ❌ | ❌ |
| Eliminar campaña | ✅ | ❌ | ❌ | ❌ |
| Activar/Pausar campaña | ✅ | ✅ (propias) | ❌ | ❌ |
| Ver estadísticas campaña | ✅ | ✅ | ❌ | ✅ |
| Crear lista | ✅ | ✅ (propias) | ❌ | ❌ |
| Cargar registros | ✅ | ✅ (propias) | ❌ | ❌ |
| Ver registros | ✅ | ✅ (propias) | ❌ | ✅ |

### 3.2 Operadores

| Operación | Administrador | Supervisor | Operador | Consultor |
|-----------|---------------|------------|----------|-----------|
| Crear operador | ✅ | ✅ (su equipo) | ❌ | ❌ |
| Modificar operador | ✅ | ✅ (su equipo) | ❌ | ❌ |
| Eliminar operador | ✅ | ❌ | ❌ | ❌ |
| Asignar a grupo | ✅ | ✅ (su equipo) | ❌ | ❌ |
| Ver estadísticas operador | ✅ | ✅ (su equipo) | ❌ | ✅ |
| Cambiar propia contraseña | ✅ | ✅ | ✅ | ✅ |
| Ver propios datos | ✅ | ✅ | ✅ | ✅ |

### 3.3 Tipificaciones

| Operación | Administrador | Supervisor | Operador | Consultor |
|-----------|---------------|------------|----------|-----------|
| Crear tipificación | ✅ | ❌ | ❌ | ❌ |
| Modificar tipificación | ✅ | ❌ | ❌ | ❌ |
| Eliminar tipificación | ✅ | ❌ | ❌ | ❌ |
| Crear perfil | ✅ | ❌ | ❌ | ❌ |
| Asignar perfil a grupo | ✅ | ❌ | ❌ | ❌ |
| Tipificar llamada | ❌ | ❌ | ✅ | ❌ |

### 3.4 Calendario y Horarios

| Operación | Administrador | Supervisor | Operador | Consultor |
|-----------|---------------|------------|----------|-----------|
| Crear calendario | ✅ | ❌ | ❌ | ❌ |
| Modificar calendario | ✅ | ❌ | ❌ | ❌ |
| Crear días especiales | ✅ | ✅ (propios) | ❌ | ❌ |
| Ver calendario | ✅ | ✅ | ✅ | ✅ |

### 3.5 Supervisión

| Operación | Administrador | Supervisor | Operador | Consultor |
|-----------|---------------|------------|----------|-----------|
| Supervisión en tiempo real | ✅ | ✅ | ❌ | ❌ |
| Escuchar llamadas en vivo | ✅ | ✅ | ❌ | ❌ |
| Ver estado operadores | ✅ | ✅ (su equipo) | ❌ | ❌ |
| Forzar pausa operador | ✅ | ✅ (su equipo) | ❌ | ❌ |
| Ver grabaciones | ✅ | ✅ (su equipo) | ❌ | ❌ |
| Exportar reportes | ✅ | ✅ | ❌ | ✅ |

---

## 4. Permisos Granulares (Propuesta) 🧠

### 4.1 Módulo de Campañas

| Permiso | Descripción |
|---------|-------------|
| `campaign.create` | Crear nuevas campañas |
| `campaign.read.all` | Ver todas las campañas |
| `campaign.read.own` | Ver solo campañas asignadas |
| `campaign.update.all` | Modificar todas las campañas |
| `campaign.update.own` | Modificar solo campañas asignadas |
| `campaign.delete` | Eliminar campañas |
| `campaign.activate` | Activar/pausar campañas |
| `campaign.stats` | Ver estadísticas de campañas |

### 4.2 Módulo de Operadores

| Permiso | Descripción |
|---------|-------------|
| `operator.create` | Crear nuevos operadores |
| `operator.read.all` | Ver todos los operadores |
| `operator.read.team` | Ver operadores de mi equipo |
| `operator.update.all` | Modificar cualquier operador |
| `operator.update.team` | Modificar operadores de mi equipo |
| `operator.update.self` | Modificar mis propios datos |
| `operator.delete` | Eliminar operadores |
| `operator.assign_group` | Asignar operadores a grupos |
| `operator.stats` | Ver estadísticas de operadores |

### 4.3 Módulo de Configuración

| Permiso | Descripción |
|---------|-------------|
| `config.system` | Configuración del subsistema |
| `config.tipification` | Configurar tipificaciones |
| `config.calendar` | Configurar calendarios |
| `config.dialer` | Configurar marcación |
| `config.skills` | Configurar skills |

### 4.4 Módulo de Supervisión

| Permiso | Descripción |
|---------|-------------|
| `supervision.realtime` | Supervisión en tiempo real |
| `supervision.listen` | Escuchar llamadas en vivo |
| `supervision.whisper` | Susurrar al operador |
| `supervision.barge` | Entrar en llamada |
| `supervision.recording` | Ver/escuchar grabaciones |
| `supervision.force_pause` | Forzar pausa a operador |

---

## 5. Reglas de Autorización

### REGLA: Jerarquía de Roles 🧠

> **Origen**: 🧠 INFERIDA - Principio de mínimo privilegio

**Descripción**: Los roles inferiores heredan permisos de lectura, pero no de escritura.

**Jerarquía**:
```
Administrador (TOTAL)
    └─> Supervisor (ALTO)
            └─> Operador (MEDIO)
                    └─> Consultor (BAJO - Solo lectura)
```

**Regla**: Un rol superior puede realizar todas las operaciones de roles inferiores.

---

### REGLA: Ámbito de Permisos 🧠

> **Origen**: 🧠 INFERIDA - Segmentación de datos

**Descripción**: Los permisos pueden tener diferentes ámbitos.

**Ámbitos**:
1. **GLOBAL**: Acceso a todos los recursos
2. **ASIGNADO**: Solo recursos asignados explícitamente
3. **EQUIPO**: Solo recursos de su equipo/grupo
4. **PROPIO**: Solo sus propios recursos

**Ejemplo**:
- Administrador: `campaign.read.all` (GLOBAL)
- Supervisor: `campaign.read.own` (ASIGNADO)
- Operador: `operator.update.self` (PROPIO)

---

### REGLA: Separación de Lectura y Escritura 🧠

> **Origen**: 🧠 INFERIDA - Seguridad

**Descripción**: Permisos de lectura y escritura son independientes.

**Validación**:
```
SI usuario.tiene("campaign.read.all") ENTONCES
    // Puede VER todas las campañas
FIN SI

SI usuario.tiene("campaign.update.all") ENTONCES
    // Puede MODIFICAR todas las campañas
FIN SI

// Tener "read" NO implica tener "update"
```

---

### REGLA: Permisos sobre Propios Datos 🧠

> **Origen**: 🧠 INFERIDA - Autonomía básica

**Descripción**: Todo usuario puede ver y modificar sus propios datos básicos.

**Datos propios permitidos**:
- ✅ Cambiar contraseña
- ✅ Ver grupos asignados
- ✅ Ver horario personal
- ✅ Ver estadísticas propias

**Datos propios NO permitidos**:
- ❌ Cambiar usuario/email (requiere admin)
- ❌ Cambiar rol (requiere admin)
- ❌ Cambiar permisos (requiere admin)

---

## 6. Implementación de Permisos

### 6.1 Base de Datos 🧠

```sql
-- Tabla de Roles
CREATE TABLE Roles (
    IdRol INT PRIMARY KEY IDENTITY,
    Nombre VARCHAR(50) NOT NULL UNIQUE,
    Descripcion VARCHAR(200),
    NivelJerarquia INT NOT NULL, -- 1=Admin, 2=Supervisor, 3=Operador, 4=Consultor
    Activo BIT DEFAULT 1
);

-- Tabla de Permisos
CREATE TABLE Permisos (
    IdPermiso INT PRIMARY KEY IDENTITY,
    Codigo VARCHAR(100) NOT NULL UNIQUE, -- ej: "campaign.create"
    Modulo VARCHAR(50), -- ej: "Campañas"
    Descripcion VARCHAR(200),
    TipoOperacion VARCHAR(20) -- CREATE, READ, UPDATE, DELETE
);

-- Relación Rol-Permisos
CREATE TABLE RolPermisos (
    IdRol INT NOT NULL,
    IdPermiso INT NOT NULL,
    Ambito VARCHAR(20) DEFAULT 'GLOBAL', -- GLOBAL, ASIGNADO, EQUIPO, PROPIO
    PRIMARY KEY (IdRol, IdPermiso),
    FOREIGN KEY (IdRol) REFERENCES Roles(IdRol),
    FOREIGN KEY (IdPermiso) REFERENCES Permisos(IdPermiso)
);

-- Usuarios con Roles
ALTER TABLE Operadores ADD IdRol INT NOT NULL;
ALTER TABLE Operadores ADD CONSTRAINT FK_Operadores_Rol
    FOREIGN KEY (IdRol) REFERENCES Roles(IdRol);
```

### 6.2 Funciones de Autorización 🧠

```csharp
public class PermisoService
{
    public bool TienePermiso(int idUsuario, string codigoPermiso, string ambito = "GLOBAL")
    {
        var usuario = ObtenerUsuario(idUsuario);
        var permisos = ObtenerPermisosRol(usuario.IdRol);

        return permisos.Any(p =>
            p.Codigo == codigoPermiso &&
            (p.Ambito == "GLOBAL" || p.Ambito == ambito)
        );
    }

    public bool PuedeAccederRecurso(int idUsuario, string recurso, int idRecurso)
    {
        var usuario = ObtenerUsuario(idUsuario);

        // Administradores pueden acceder a todo
        if (usuario.Rol.Nombre == "Administrador")
            return true;

        // Verificar si el recurso está asignado al usuario
        return RecursoAsignadoAUsuario(idUsuario, recurso, idRecurso);
    }
}
```

### 6.3 Decoradores de Autorización 🧠

```csharp
// Atributo para proteger acciones
[Authorize(Permission = "campaign.create")]
public ActionResult CrearCampana(CampanaDTO campana)
{
    // Solo usuarios con permiso "campaign.create" pueden ejecutar esto
    // ...
}

// Atributo con múltiples permisos
[Authorize(Permissions = new[] { "campaign.read.all", "campaign.read.own" })]
public ActionResult VerCampanas()
{
    var usuario = ObtenerUsuarioActual();

    if (TienePermiso(usuario.Id, "campaign.read.all"))
    {
        // Ver todas
        return View(campanaService.ObtenerTodas());
    }
    else
    {
        // Ver solo asignadas
        return View(campanaService.ObtenerAsignadas(usuario.Id));
    }
}
```

---

## 7. Auditoría de Permisos

### 7.1 Log de Accesos 🧠

```sql
CREATE TABLE LogAccesos (
    IdLog INT PRIMARY KEY IDENTITY,
    FechaHora DATETIME DEFAULT GETDATE(),
    IdUsuario INT NOT NULL,
    Accion VARCHAR(100), -- ej: "campaign.update"
    Recurso VARCHAR(50), -- ej: "Campañas"
    IdRecurso INT NULL,
    Resultado VARCHAR(20), -- PERMITIDO, DENEGADO
    DireccionIP VARCHAR(50),
    FOREIGN KEY (IdUsuario) REFERENCES Operadores(IdOperador)
);
```

### 7.2 Monitorización 🧠

**KPIs de Seguridad**:
- Intentos de acceso denegados por usuario
- Accesos fuera de horario
- Cambios en configuración crítica
- Creación/eliminación de usuarios
- Modificaciones de permisos

---

## 8. Casos de Uso

### Caso 1: Supervisor con Campañas Asignadas

**Configuración**:
- Usuario: María (Supervisor)
- Campañas asignadas: "Ventas Q1", "Encuestas"
- Permisos: `campaign.read.own`, `campaign.update.own`

**Comportamiento**:
- ✅ Puede ver campañas "Ventas Q1" y "Encuestas"
- ✅ Puede modificar esas campañas
- ❌ NO puede ver otras campañas
- ❌ NO puede eliminar campañas (no tiene `campaign.delete`)

### Caso 2: Operador en Llamada

**Configuración**:
- Usuario: Juan (Operador)
- Grupos: "Atención Cliente", "Soporte Técnico"
- Permisos: `call.answer`, `call.tipify`, `call.reschedule`

**Comportamiento**:
- ✅ Puede atender llamadas de sus grupos
- ✅ Puede tipificar llamadas
- ✅ Puede reprogramar llamadas
- ❌ NO puede ver datos de otros operadores
- ❌ NO puede modificar campañas

---

## 9. Migración de Permisos

### 9.1 Del Sistema Actual a la Nueva Aplicación

**Pasos**:
1. Exportar tabla de usuarios con roles actuales
2. Mapear roles antiguos → nuevos roles
3. Asignar permisos granulares según rol
4. Verificar asignaciones especiales (Supervisores con equipos específicos)
5. Probar acceso de usuarios muestra

**Mapeo sugerido**:
```
Sistema Actual → Sistema Nuevo
Administrador → Rol: Administrador (todos los permisos)
Supervisor → Rol: Supervisor (permisos de lectura/escritura en asignados)
Operador → Rol: Operador (solo llamadas y tipificación)
```

### 9.2 Testing de Permisos

Para cada rol, verificar:
- ✅ Puede realizar operaciones permitidas
- ❌ NO puede realizar operaciones restringidas
- ✅ Mensajes de error claros al denegar acceso
- ✅ No puede "escalar" privilegios

---

## 10. Mejores Prácticas

### 10.1 Diseño de Permisos 🧠

1. **Principio de mínimo privilegio**: Otorgar solo lo necesario
2. **Separar lectura/escritura**: Permisos independientes
3. **Granularidad**: Permisos específicos mejor que amplios
4. **Ámbitos claros**: GLOBAL vs ASIGNADO vs PROPIO
5. **Auditoría**: Registrar todos los accesos

### 10.2 Gestión de Roles 🧠

1. **Roles predefinidos**: Administrador, Supervisor, Operador, Consultor
2. **Roles personalizados**: Permitir crear roles a medida
3. **Herencia**: Roles superiores incluyen permisos de inferiores
4. **Revisión periódica**: Auditar permisos cada 6 meses
5. **Revocación**: Desactivar usuarios inactivos automáticamente

### 10.3 Mensajes de Error 🧠

**Cuando se deniega acceso**:
- ❌ MAL: "Acceso denegado"
- ✅ BIEN: "No tiene permisos para crear campañas. Contacte con su administrador."

**Evitar revelar información**:
- ❌ MAL: "No tiene permiso para ver la campaña ID 123"
- ✅ BIEN: "Campaña no encontrada" (si no tiene permiso de lectura)

---

**Documento**: Permisos y Roles del Sistema
**Versión**: 1.0
**Fecha**: 2025-10-27
**Estado**: Basado en referencias del manual y mejores prácticas
**Nota**: Requiere validación con sistema de permisos real en código C# y BD
**Referencias**: Manual Part7 (págs 12-26), sistemas similares de contact centers
