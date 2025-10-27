# Configuración de Conexiones a Base de Datos - Tiphone v6

**Fuente**: Web.config
**Fecha de análisis**: 2025-10-27

---

## 1. Tecnologías Identificadas

### Framework y Versión
- **ASP.NET Framework**: 4.8
- **Entity Framework**: 6.0.0.0
- **Provider**: SQLOLEDB.1 (SQL Server)

### Motor de Base de Datos
- **SQL Server** (principal)
- **Oracle** (soporte, no activo actualmente)

---

## 2. Bases de Datos del Sistema

El sistema Tiphone utiliza **4 bases de datos principales**:

| Base de Datos | Nombre Configurado | Propósito |
|--------------|-------------------|-----------|
| General | `CC_GENERAL` | Configuración general del sistema |
| Tiphone | `CC_TIPHONE` | Datos principales de Tiphone |
| IVR | `CC_IVR` | Sistema de IVR (Interactive Voice Response) |
| Estadísticas | `CC_ESTADISTICAS` | Datos estadísticos e históricos |

### Configuración en Web.config

```xml
<add key="GeneralDatabaseName" value="CC_GENERAL"/>
<add key="TiphoneDatabaseName" value="CC_TIPHONE"/>
<add key="IVRDatabaseName" value="CC_IVR"/>
<add key="BDEstadisticas" value="CC_ESTADISTICAS"/>
```

---

## 3. Cadena de Conexión Principal

### Conexión Activa (SQL Server)

```
Provider=SQLOLEDB.1;
Persist Security Info=True;
Data Source=VPCSQLMS\Pre;
User Id=sa;
Password=T1p40N3;
Connection Timeout=150;
```

**Parámetros**:
- **Provider**: SQLOLEDB.1 (OLE DB provider para SQL Server)
- **Data Source**: `VPCSQLMS\Pre` (Servidor\Instancia)
- **User Id**: `sa` (Usuario administrador)
- **Password**: `T1p40N3` (⚠️ Contraseña hardcodeada)
- **Connection Timeout**: 150 segundos
- **Query Timeout**: 520 segundos (configurado separadamente)

### Otras Conexiones Disponibles (Comentadas)

El archivo contiene múltiples cadenas de conexión comentadas para diferentes entornos:
- Developer3
- Aliseda
- ACTIVA
- Demo
- ServiHabitat
- Developer2
- OpenBank
- FairMoney
- IP directa (172.20.49.6)

---

## 4. Soporte Oracle

Existe configuración para Oracle (comentada):

```xml
<!--add key="ConnectionString" value="Persist Security Info=True;
Data Source=ADLRCO;
User ID=CC_GENERAL;
Password=CC_GENERAL;
PROVIDER=OraOLEDB.Oracle.1;" /-->
```

**Configuración Oracle**:
```xml
<add key="AlterSessionOracle" value="alter session set nls_date_format='dd/mm/yyyy hh24:mi:ss'"/>
```

---

## 5. Configuración de Sesión y Seguridad

### Autenticación
- **Modo**: Forms Authentication
- **Login URL**: `~/Login.aspx`
- **Timeout**: 120 minutos
- **Sliding Expiration**: true
- **Cookie Expiration**: 120 minutos (configurable)

```xml
<authentication mode="Forms">
  <forms defaultUrl="~/Login.aspx"
         loginUrl="~/Login.aspx"
         slidingExpiration="true"
         timeout="120"/>
</authentication>
```

### Sesión
- **Session Timeout**: 200 minutos
- **ViewState**: Cifrado deshabilitado (Never)
- **ViewState MAC**: Deshabilitado (false)

⚠️ **IMPORTANTE**: ViewState sin cifrado y sin MAC representa un riesgo de seguridad

---

## 6. Parámetros de Rendimiento

### Límites de Datos
```xml
<httpRuntime maxRequestLength="106954752" executionTimeout="120"/>
<!-- maxRequestLength ~102 GB en kilobytes -->
```

### JSON
```xml
<jsonSerialization maxJsonLength="1000000000"/>
<add key="aspnet:MaxJsonDeserializerMembers" value="150000"/>
```

### Base de Datos
```xml
<add key="ProcessTimeOut" value="10000"/>
<add key="NumeroReintentosCC" value="3"/>
<add key="QueryTimeout" value="520"/> <!-- segundos -->
```

---

## 7. Security Center (OAuth)

Sistema de autenticación centralizado:

```xml
<add key="SecurityCenterUrl" value="https://vpcpre.adlantia.com/SecurityCenter"/>
<add key="SecCenter_client_id" value="ManteniWeb"/>
<add key="SecCenter_client_secret" value="fiJnJKSi3EeH5S0AT6CGA"/>
<add key="SecCenter_scope" value="mantpersuaderapi.admin"/>
```

**Uso de Token**:
```xml
<add key="UsarSecurityToken" value="N"/>  <!-- Actualmente desactivado -->
<add key="UsuarioToken" value="adlantia"/>
<add key="ContrasenaToken" value="T1p40N3"/>
```

---

## 8. Integraciones con Otros Sistemas

### 8.1 Sistema de Grabaciones

**API de Grabaciones**:
```
https://vpcpre.adlantia.com/tiphoneRecords/api/recordings/
```

**Endpoints**:
- Query: `/api/recordings/`
- Consulta: `/api/recordings/QueryVoiceRecord?type=Record&reference=`
- Voice Mail: `/tiphonerecords/QueryVoiceRecord.aspx?type=VoiceMail&ref=`

**Rutas locales**:
- Descarga: `C:\Temp\Grabaciones`

**Limitación de fechas**:
```xml
<add key="LimitarFechasGrabaciones" value="N"/>
<add key="TipoLimitacionGrabaciones" value="D"/> <!-- D=días, M=meses, A=años -->
<add key="ValorLimitacionGrabaciones" value="7"/>
```

### 8.2 MantPersuader API

```xml
<add key="WSMantPersuaderURL" value="https://vpcpre.adlantia.com/MantPersuaderApi/api/v1.0"/>
<add key="RutaCargaFicherosMantPersuader" value="\\vpcservihabitat\c$\Temp\FicherosToImp"/>
```

### 8.3 Sistema de Chat

**Chat File API**:
```
https://vpcpre.adlantia.com/ChatFileApi/api/chats/
```

**Chat Server**:
```
https://vpcpre.adlantia.com/ChatServer/
```

**Endpoints**:
- Plantillas: `/ChatServer/Plantilla/`
- Emails: `/ChatServer/SendEmail/`

### 8.4 Email

**Ubicación de adjuntos**:
```
http://ADL8269/AdjuntosCorreo
```

**Respuesta automática** (legacy):
```xml
<add key="URLWSSubirFicherosRespuestaAutomatica" value="http://vpcpre.adlantia.com/SubirFicheros/SubirFicheros.svc/"/>
<add key="PathUbicacionFicherosRespuestaAutomatica" value="http://vpcpre.adlantia.com/FicherosRespAutom/"/>
```

### 8.5 Asterisk (VoIP)

**Mensajes de audio**:
```xml
<add key="RutaMensajesTiphone" value="\\CRK8269\Temp\Tiphone"/>
<add key="RutaMensajesAsterisk" value="\\CRK8269\Temp\Tiphone\Asterisk"/>
<add key="RutaDestinoMensajesAsterisk" value="/TiphoneAsterisk/sonidos"/>
```

**Configuración**:
```xml
<add key="RutaConfiguracionAsterisk" value="\\192.168.1.159\Configuracion"/>
```

**Certificados SSL**:
```xml
<add key="RutaCertificadosWindows" value="C:\Temp\OpenSSl_pruebas"/>
<add key="RutaOpenSSL" value="C:\Program Files\OpenSSL-Win64\bin"/>
```

---

## 9. Configuración Específica de Cliente

### Persuader (Motor de Campañas)
```xml
<add key="FechaCeroReprogramaciones" value="Persuader"/>
<add key="OrderByPersuader" value="ORDER BY A.prioridad DESC, A.peso DESC, A.cliente_id, B.peso DESC, B.prioridad DESC"/>
```

### Leroy Merlin
```xml
<add key="AdministraParametros" value="0"/>
<add key="NombreTablaParamConfig" value="RCO_FLAGS_CONTROL"/>
```

### Modelo Organizativo
```xml
<add key="AplicarModeloOrganizativo" value="0"/>
```

---

## 10. Parámetros de Configuración Importantes

### Idioma
```xml
<add key="InitialSystemLanguage" value="es"/>
<add key="FormatDate" value="dd/MM/yyyy"/>
<add key="FormatDateTime" value="dd/MM/yyyy HH:mm:ss"/>
```

### Debug
```xml
<add key="MostrarTodasQuerys" value="1"/>
<customErrors mode="Off"/>
```

### Operador Extendido
```xml
<add key="UsarOperadorExtendido" value="0"/>
```

### Visualización
```xml
<add key="MostrarDescripcion" value="1"/>
<add key="MostrarRegistrosCampana" value="1"/>
```

### Histórico
```xml
<add key="OcultarBuscadorHistoricoRegistros" value="S"/>
<add key="OperadoresAccesoHistoricoRegistros" value=""/>
```

---

## 11. Dependencias y Ensamblados

### Principales
- **log4net** - Logging
- **Entity Framework 6.0.0.0**
- **AjaxControlToolkit**
- **Newtonsoft.Json 13.0.0.0**
- **Microsoft.Owin 4.2.2.0**
- **WebGrease 1.6.5135.21930**

---

## 12. Riesgos de Seguridad Identificados

⚠️ **CRÍTICO**:
1. Contraseñas hardcodeadas en Web.config
2. Usuario `sa` de SQL Server
3. ViewState sin cifrado ni MAC
4. Custom errors en modo Off (expone detalles de error)
5. Múltiples URLs y credenciales en texto plano

⚠️ **ALTO**:
1. Rutas UNC con permisos de red
2. Certificados en rutas temporales
3. Timeout de sesión muy largo (200 min)
4. Event validation deshabilitado

---

## 13. Tabla de Parámetros Configurables

| Parámetro | Valor Actual | Descripción |
|-----------|--------------|-------------|
| Subsistema | 1 | ID del subsistema |
| Setting | 1 | ID de configuración |
| TiempoExpiracionCookie | 120 | Minutos |
| TiempoEsperaAlertas | 2500 | Milisegundos |
| InformeEstadosRegistros | 1 | Activado |
| arrancaLogInicio | 0 | Desactivado |
| SQL | 1 | Usando SQL Server |

---

## 14. Entidades de Base de Datos Identificadas

Basado en los parámetros y referencias en el código, se identifican las siguientes entidades principales:

### CC_GENERAL
- Configuración del sistema
- Subsistemas
- Parámetros generales

### CC_TIPHONE
- Campañas
- Listas
- Operadores
- Grupos
- Tipificaciones
- Skills / SkillSets
- Canales
- Calendarios
- Horarios
- Predicciones
- Reprogramaciones
- Posiciones
- Certificados

### CC_IVR
- Sistemas IVR
- Scripts IVR
- Mensajes IVR
- Grupos IVR
- Sistemas de encaminamiento

### CC_ESTADISTICAS
- Histórico de llamadas
- Estadísticas de operadores
- Estadísticas de campañas
- Grabaciones
- Registros de actividad

---

## 15. Próximos Pasos

- [ ] Obtener scripts de creación de base de datos
- [ ] Documentar todas las tablas y sus relaciones
- [ ] Crear diagrama ER completo
- [ ] Identificar stored procedures
- [ ] Documentar vistas y funciones
- [ ] Analizar índices existentes
- [ ] Revisar constraints y foreign keys
- [ ] Proponer mejoras de seguridad para la nueva arquitectura

---

## 16. Recomendaciones para Migración

### Base de Datos
1. **Usar Entity Framework Core 8** en lugar de EF 6
2. **Implementar Repository Pattern**
3. **Usar Connection Pooling adecuado**
4. **Separar connection strings por entorno** (Development, Staging, Production)
5. **Usar Azure Key Vault o Variables de Entorno** para secretos
6. **Implementar Dapper** para queries complejas (mejor rendimiento)

### Seguridad
1. **Eliminar hardcoded credentials**
2. **Implementar JWT con refresh tokens**
3. **Usar HTTPS obligatorio**
4. **Implementar rate limiting**
5. **Auditoría de accesos a datos sensibles**

### Arquitectura
1. **Implementar CQRS** para operaciones complejas
2. **Usar Redis** para caché y sesiones
3. **Implementar health checks**
4. **Logging estructurado** con Serilog
5. **Métricas** con Application Insights o Prometheus

---

**Documento generado a partir de Web.config**
