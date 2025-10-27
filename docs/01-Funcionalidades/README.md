# Índice de Funcionalidades - Tiphone Contact Center v6

**Basado en**: Manual de Administración y Supervisión
**Fecha**: 2025-10-27

---

## Módulos Principales del Sistema

### 1. CONFIGURACIÓN GENERAL
Administración de parámetros y configuración del sistema

#### 1.1 Apariencia
- Configuración de tema visual por usuario
- Personalización de interfaz

#### 1.2 Direcciones IP
- **CRUD** de servidores del sistema
- Configuración de parámetros de conexión:
  - Dirección IP
  - Puerto de comunicación
  - Time-out de conexión

#### 1.3 Tipificaciones
Sistema de clasificación de llamadas/interacciones

##### 1.3.1 Tipificaciones de Primer y Segundo Nivel
- Gestión de tipificaciones primarias
- Asociación de tipificaciones secundarias
- **CRUD** de tipificaciones
- Validación: No eliminar si está asociada a un perfil

##### 1.3.2 Perfiles de Tipificaciones
- Agrupación de tipificaciones primarias
- Definición de perfil "Por defecto"
- **CRUD** de perfiles
- Validación: No eliminar si está asignado a un grupo

##### 1.3.3 Asignar Perfil a Grupo
- Asignación de perfiles a grupos de atención
- Si no tiene perfil → usa el "Por defecto"

#### 1.4 Condiciones
- **CRUD** de condiciones (sentencias SQL)
- Campos:
  - Identificador (auto)
  - Alias (15 caracteres)
  - Descripción (50 caracteres)
  - Condición (SQL)
- Validación: No eliminar si está en lista o filtro

#### 1.5 Tipos de Operación
- **CRUD** de tipos de operación
- Configuración:
  - Tipo de ejecución: URL estándar, URL dependiente, Integración Tiphone
  - Tipo de función: Telemarketing u Operación libre
  - Grabación de voz: Sí/No
  - Múltiples instancias: Sí/No
  - URL y parámetros (POST)
- Validación: No eliminar si lo usa una campaña

#### 1.6 Skills
Sistema de habilidades de operadores

- **CRUD** de skills
- Asignación a operadores con prioridad
- Validación: No eliminar si tiene operadores asignados

#### 1.7 SkillSets
Conjuntos de habilidades

- **CRUD** de skillsets
- Configuración:
  - Skills relacionados (obligatorio/opcional/excluyente)
  - Peso de cada skill
  - Prioridad en cola

#### 1.8 Conjuntos de Operadores (Grupos de Operadores)
- **CRUD** de conjuntos
- Asignación de operadores al conjunto
- Asociación de skillsets

#### 1.9 Canales de Comunicación
- **CRUD** de canales
- Configuración:
  - Código de canal
  - Nombre
  - Número máximo de acciones
- **Asignación de canales a grupos**:
  - Por grupo de atención
  - Por operador (activo/inactivo)

#### 1.10 Instancias de Bases de Datos
- **CRUD** de instancias BBDD
- Configuración:
  - ID instancia
  - Nombre
  - Cadena de conexión
  - Motor de BBDD
  - Pool de conexiones (mín/máx)
  - Formatos de fecha y hora
  - Punto decimal
  - Delimitadores

#### 1.11 Calendarios
Sistema de gestión de horarios

##### 1.11.1 Horarios
- **CRUD** de horarios
- Configuración por día de semana
- Horarios partidos (ej: 9-14 y 16-18:30)
- Asociación a calendarios

##### 1.11.2 Calendarios
- **CRUD** de calendarios
- Asociación a horario
- Mensaje fuera de servicio
- Vinculación de días especiales
- Asociación a listas/campañas

##### 1.11.3 Días Especiales
- **CRUD** de días especiales (festivos/horarios especiales)
- Configuración:
  - Fecha
  - Horario o Sin servicio
  - Mensaje fuera de servicio
- Asignación a grupos

#### 1.12 Predicciones
- **CRUD** de predicciones del sistema
- Configuración de algoritmos predictivos

#### 1.13 Reprogramaciones
- **CRUD** de reglas de reprogramación
- Configuración de lógica de reprogramación de llamadas

#### 1.14 Alertas de Monitor
- Configuración de alertas del sistema
- Umbrales y notificaciones

#### 1.15 Llamada Saliente
Configuración de llamadas outbound

##### 1.15.1 Reglas de Marcación
- Definición de reglas de marcado

##### 1.15.2 Prefijos de Marcación
- Gestión de prefijos

##### 1.15.3 Grupos de Teléfonos
- Agrupación lógica de números

---

### 2. CAMPAÑAS
Gestión de campañas de llamada saliente

#### 2.1 Gestión de Campañas
- **Crear campaña**
- **Modificar/Visualizar campaña**
- **Acciones**:
  - Nuevo
  - Copiar campaña

#### 2.2 Listas
- Gestión de listas de registros
- Asignación a campaña
- Edición de registros

#### 2.3 Resultados de Negocio
- Definición de resultados posibles
- Clasificación de outcomes

#### 2.4 Filtros
- Creación de filtros para listas
- Condiciones de filtrado

#### 2.5 Reprogramación
- Configuración de reprogramación específica de campaña

#### 2.6 Predicción
- Configuración de predicción específica de campaña
- Algoritmos de marcación predictiva

#### 2.7 Horario
- Asignación de calendario a campaña

#### 2.8 Días Especiales
- Configuración de días especiales de campaña

#### 2.9 Supervisión
- Monitorización en tiempo real
- Estadísticas de campaña

#### 2.10 Buscador de Registros
- Búsqueda de registros en campaña
- Filtros avanzados

---

### 3. GRUPOS

#### 3.1 Grupos de Atención
Grupos para gestión de llamadas entrantes

- **CRUD** de grupos de atención
- **Operadores**: Asignación de operadores al grupo
- **Horario**: Asignación de calendario
- **Días especiales**: Configuración específica
- **Eliminar grupo**
  - Validación: Verificar dependencias

#### 3.2 Grupos de Distribución
Grupos para distribución de llamadas

- **CRUD** de grupos de distribución
- **Operadores**: Asignación de operadores
- **Horario**: Asignación de calendario
- **Días especiales**: Configuración específica
- **Programar canales**: Asignación de canales
- **Eliminar grupo**

---

### 4. OPERADORES
Gestión de agentes del call center

#### 4.1 CRUD de Operadores
- Alta, modificación, consulta, baja

#### 4.2 Acciones sobre Operador

##### 4.2.1 Cambiar Contraseña
- Modificación de contraseña del operador

##### 4.2.2 Grupos
- Asignación a grupos de atención
- Asignación a grupos de distribución

##### 4.2.3 Listas
- Asignación de listas de campaña

##### 4.2.4 Permisos
- Gestión de permisos del operador
- Roles y accesos

##### 4.2.5 Eliminar Operador
- Baja de operador del sistema

---

### 5. POSICIONES
Puestos de trabajo físicos/lógicos

#### 5.1 CRUD de Posiciones
- Gestión de posiciones de operador

#### 5.2 Eliminar Posición
- Baja de posición del sistema

---

### 6. GRABACIONES
Gestión de grabaciones de llamadas

- Acceso a grabaciones
- Reproducción
- Descarga

---

### 7. MONITORES REMOTOS
Supervisión remota

- Configuración de monitores remotos
- Acceso desde ubicaciones externas

---

### 8. MONITORIZACIONES
Monitorización del sistema

- Configuración de monitorizaciones
- Dashboards de supervisión

---

### 9. GESTIONES OFFLINE
Gestión de interacciones fuera de línea

#### 9.1 Gestiones Offline Generales
- Visualización de gestiones offline
- Buscador de mensajes
- Acciones sobre gestiones

#### 9.2 Gestiones de Correo
- Gestión específica de emails
- Bandeja de entrada
- Respuestas automáticas
- Templates

---

### 10. GESTOR DE COLAS (ICD - Incoming Call Distribution)
Sistema de gestión de colas de llamadas

#### 10.1 Sistemas de Gestión de Colas
- Configuración de sistemas ICD
- Reglas de encolamiento

#### 10.2 Mensajes del Gestor de Colas
- Gestión de mensajes de cola
- Locuciones

#### 10.3 Scripts del Gestor de Colas
- Lógica de distribución
- Scripts de encolamiento

---

### 11. OPERADOR AUTOMÁTICO (IVR)
Interactive Voice Response

#### 11.1 Sistemas de IVR
- **CRUD** de sistemas IVR
- Configuración de menús
- Acciones del IVR

#### 11.2 Mensajes de la IVR
- Gestión de locuciones
- Archivos de audio

#### 11.3 Scripts de IVR
- Diseño de flujos IVR
- Lógica de navegación

---

### 12. CHAT
Gestión de chat web

#### 12.1 Mantenimiento Chat
- Configuración general de chat

#### 12.2 Servicios Chat
- **CRUD** de servicios de chat
- Configuración de canales

#### 12.3 Dominios de Confianza
- Gestión de dominios permitidos
- Whitelist/Blacklist

#### 12.4 Etiquetas Chat
- Sistema de etiquetado de conversaciones

#### 12.5 Formularios Chat
- Formularios prechat
- Formularios postchat

#### 12.6 Páginas Chat
- Configuración de páginas web con chat

#### 12.7 Comandos Chat
- Comandos para operadores

#### 12.8 Direcciones Bloqueadas
- Gestión de IPs bloqueadas

#### 12.9 Buscador de Chats
- Búsqueda de conversaciones históricas

---

### 13. EMAIL/CORREO
Gestión de emails

#### 13.1 Cuentas de Email
- **CRUD** de cuentas de correo
- Configuración SMTP/IMAP

#### 13.2 Templates de Respuesta Automática
- Gestión de plantillas
- Respuestas predefinidas

#### 13.3 Buscador de Emails
- Búsqueda de emails históricos

#### 13.4 Resumen de Emails
- Estadísticas de emails

---

### 14. BUZÓN DE VOZ
Gestión de mensajes de voz

#### 14.1 Buscador de Buzón de Voz
- Búsqueda de mensajes

#### 14.2 Resumen de Buzón de Voz
- Estadísticas de mensajes de voz

---

### 15. ESTADÍSTICAS E INFORMES

#### 15.1 Servicio de Estadísticas
- Configuración de estadísticas

#### 15.2 Servicio Estadísticas Datos
- Datos estadísticos del sistema

#### 15.3 Informes de Carga
- Informes de carga de datos

---

### 16. ADMINISTRACIÓN AVANZADA

#### 16.1 Certificados
- Gestión de certificados SSL/TLS

#### 16.2 Servidores
- **CRUD** de servidores del sistema

#### 16.3 Subsistemas
- Gestión de subsistemas

#### 16.4 Activaciones
- Licencias y activaciones

#### 16.5 Parámetros de Configuración
- Configuración avanzada del sistema

---

## Resumen de Funcionalidades por Tipo

### Funcionalidades CRUD (Create, Read, Update, Delete)
- Campañas
- Operadores
- Grupos (Atención y Distribución)
- Posiciones
- Tipificaciones
- Condiciones
- Skills / SkillSets
- Conjuntos de Operadores
- Canales
- Instancias BBDD
- Calendarios / Horarios / Días Especiales
- Predicciones
- Reprogramaciones
- Sistemas IVR
- Servicios Chat
- Cuentas Email

### Funcionalidades de Asignación/Relación
- Operadores ↔ Grupos
- Operadores ↔ Listas
- Operadores ↔ Skills
- Grupos ↔ Perfiles de Tipificación
- Grupos ↔ Canales
- Campañas ↔ Calendarios
- Listas ↔ Operadores

### Funcionalidades de Búsqueda
- Buscador de registros de campaña
- Buscador de chats
- Buscador de emails
- Buscador de gestiones offline
- Buscador de buzón de voz

### Funcionalidades de Supervisión/Monitorización
- Supervisión de campañas
- Monitores remotos
- Monitorizaciones
- Estadísticas e informes

### Funcionalidades de Configuración
- Apariencia
- Parámetros de configuración
- Direcciones IP
- Certificados
- Servidores

---

## Permisos Identificados

- **Administrar subsistema**
- **Supervisar subsistema**
- **Administrar operadores**
- **Administrar campañas** (todas o algunas)
- **Supervisar campañas** (todas o algunas)

---

## Próximos Pasos

- [ ] Detallar casos de uso por funcionalidad
- [ ] Documentar reglas de negocio específicas
- [ ] Identificar validaciones de cada módulo
- [ ] Mapear flujos de navegación
- [ ] Documentar integraciones entre módulos

---

**Documento generado a partir del Manual de Administración y Supervisión**
