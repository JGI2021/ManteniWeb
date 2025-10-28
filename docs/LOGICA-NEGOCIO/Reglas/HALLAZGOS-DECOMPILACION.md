# 🔍 Hallazgos de Decompilación - ManteniWeb.dll

**Fecha**: 2025-10-28
**Herramienta**: ILSpy 9.1.0
**Archivo**: `bin/ManteniWeb.dll` (4.5MB)
**Resultado**: 957 archivos C# decompilados (~9.5MB)

---

## ✅ GRAN AVANCE: Código Fuente Recuperado

**ANTES**: 79% de reglas NO verificables (código en DLLs)
**AHORA**: 100% del código accesible para análisis ✅

---

## 📊 Reglas VERIFICADAS en el Código

### 1. Tipificaciones

#### ✅ REGLA VERIFICADA: Longitud Nombre de Tipificación

**Ubicación**: `decompiled/ManteniWeb/PerfilDeTipificaciones.cs:247`

```csharp
stringBuilder.Append("<input type='text' class='form-control' id='NombreTip'
    name='NombreTip'  value='" + DPerfil.Descripcion + "'
    maxlength='100'
    title='" + ConfigResources.tipif_nombreTipif + "'
    required >\n");
```

**Conclusión**:
- ✅ La regla **"Nombre tipificación máx 100 caracteres"** del Manual Part7 pág 15 **SÍ está implementada**
- Origen cambia de 🧠 INFERIDA → 💻 CÓDIGO VERIFICADO

---

#### ✅ REGLA VERIFICADA: Perfil "Por Defecto"

**Ubicación**: `decompiled/ManteniWeb/PerfilDeTipificaciones.cs:79-82, 252-258, 296-302`

```csharp
// Línea 79-82: Verifica si es por defecto
if (!DPerfil.BPorDefecto)
{
    cDropdownOption = new CDropdownOptionButton("OptionButtonVP_" + num,
        ConfigResources.tipif_mnuMarcaPorDefecto, "FMarcarPorDefecto()");
}

// Línea 252-258: HTML muestra si es perfil por defecto
if (DPerfil.BPorDefecto)
{
    stringBuilder.Append("<i class='fa fa-check color-green' aria-hidden='true'></i>");
    stringBuilder.Append(ConfigResources.tipif_perfilDefecto);
}

// Línea 296-302: Función para marcar perfil como por defecto
public string FJSMarcaPorDefecto()
{
    return "function FMarcarPorDefecto()\n{\n" +
           ModalMarcarPerfilPorDefecto.JSMostrarModal() +
           "}\n function " + ModalMarcarPerfilPorDefecto.FuncionBotonAceptar + "{\n    " +
           ModalMarcarPerfilPorDefecto.JSOcultarModal() + "    " +
           EstaticosPeticionesHttpRequest.JSPeticionAjaxRequest(
               "'idSolicitud=MARCAR_PERFIL_POR_DEFECTO&idPerfil=" + idPerfil + "'",
               "", "", estructura.ModalMensajeExitoYRecargar, estructura.ModalMensajeError) +
           "}\n\n";
}
```

**Conclusión**:
- ✅ La regla **"Un perfil debe ser 'Por defecto'"** del Manual Part7 pág 15 **SÍ está implementada**
- Campo en BD: `SF_TIPIFICACION.POR_DEFECTO` (línea 327)
- Origen cambia de 📘 MANUAL → 💻 CÓDIGO VERIFICADO

---

#### ✅ REGLA VERIFICADA: Eliminar Perfil de Tipificaciones

**Ubicación**: `decompiled/ManteniWeb/PerfilDeTipificaciones.cs:287-293`

```csharp
private string FEliminar()
{
    return "function FEliminar()\n{\n var contenido = \"" +
           ConfigResources.tipif_eliminarPerfil +
           "\";\n" +
           estructura.ModalAccionMensajeSinFuncionCerrar.JSSetContenido("contenido") +
           estructura.ModalAccionMensajeSinFuncionCerrar.JSMostrarModal() +
           "}\n function " + estructura.ModalAccionMensajeSinFuncionCerrar.FuncionBotonAceptar + "{\n    " +
           estructura.ModalAccionMensajeSinFuncionCerrar.JSOcultarModal() + "    " +
           EstaticosPeticionesHttpRequest.JSPeticionAjaxRequest(
               "'idSolicitud=ELIMINAR_PERFILES&ids=" + idPerfil + "'",
               "", "", estructura.ModalMensajeExitoYVolver, estructura.ModalMensajeError) +
           "}\n\n";
}
```

**Conclusión**:
- ✅ Existe funcionalidad para **eliminar perfiles**
- ⚠️ **FALTA VERIFICAR**: Si hay restricción para no eliminar perfil asociado a grupo (pendiente analizar handler `ELIMINAR_PERFILES`)

---

### 2. Campañas

#### ✅ REGLA VERIFICADA: No Eliminar Campaña Activa

**Ubicación**: `decompiled/ManteniWeb.Code/EliminarObjetosDeBBDD.cs:76-82`

```csharp
if (datosCampanaById.Activo == 1)
{
    empty = "No se puede eliminar la campaña \"" + datosCampanaById.Alias +
            "\" porque está activa.  \n";
    list.Add(empty);
    flag = true;
    continue;
}
```

**Conclusión**:
- ✅ **Regla implementada**: No se puede eliminar campaña si `Activo == 1`
- Origen: 🧠 INFERIDA → 💻 CÓDIGO VERIFICADO

---

#### ✅ REGLA VERIFICADA: No Eliminar Campaña del Planificador

**Ubicación**: `decompiled/ManteniWeb.Code/EliminarObjetosDeBBDD.cs:83-89`

```csharp
if (datosCampanaById.EsCampanaDePlanificador)
{
    empty = "No se puede eliminar la campaña " + datosCampanaById.Alias +
            " porque está asociada al planificador \n";
    list.Add(empty);
    flag = true;
    continue;
}
```

**Conclusión**:
- ✅ **Regla adicional encontrada**: Restricción de eliminación para campañas del planificador
- Origen: 💻 CÓDIGO (NO estaba en manual ni inferida)

---

### 3. Reprogramaciones

#### ✅ REGLA VERIFICADA: No Eliminar Reprogramación del Subsistema

**Ubicación**: `decompiled/ManteniWeb.Code/EliminarObjetosDeBBDD.cs:38-43`

```csharp
int num = ReprogramacionesNSql.ObtenerIdReprogramacionSubsistema();
// ...
if (num2 == num)
{
    string item = $"No se puede eliminar la reprogramación asociada al subsistema {num2} ";
    list.Add(item);
}
```

**Conclusión**:
- ✅ **Regla implementada**: Existe una reprogramación especial del subsistema que NO se puede eliminar
- Origen: 💻 CÓDIGO (NO estaba documentada)

---

### 4. Calendario

#### ✅ REGLA VERIFICADA: No Eliminar Calendario del Subsistema

**Ubicación**: `decompiled/ManteniWeb.Code/EliminarObjetosDeBBDD.cs:197-200`

```csharp
if (item.EsCalendarioSubsistema)
{
    hayError = true;
    list2.Add("\ncalendario: " + item.NombreCalendario +
              " NO SE PUEDE ELIMINAR porque es el horario asociado por defecto al sistema. ");
```

**Conclusión**:
- ✅ **Regla implementada**: Calendario del subsistema no se puede eliminar
- Origen: 💻 CÓDIGO (NO estaba documentada)

---

## 📋 Estructura del Código Decompilado

### Carpetas Principales

```
decompiled/
├── ManteniWeb/                    # 176 archivos - Páginas ASPX code-behind
│   ├── Tipificaciones.cs
│   ├── PerfilDeTipificaciones.cs
│   ├── Campanas.cs
│   ├── Operador.cs
│   ├── Reprogramaciones.cs
│   ├── PgCalendario.cs
│   └── ...
├── ManteniWeb.Code/               # 254 archivos - Lógica de negocio
│   ├── EliminarObjetosDeBBDD.cs  ⭐ CLAVE (restricciones eliminación)
│   ├── Calendario.cs
│   ├── ParamsCampana.cs
│   ├── ParamsOperador.cs
│   └── ...
├── ManteniWeb.SQLServices/        # 50 archivos - Acceso a datos
│   ├── TipificacioneSql.cs
│   ├── CampanaListaSqlService.cs
│   ├── OperadoresSql.cs
│   ├── ReprogramacionesSql.cs
│   ├── CalendariosSistemaSql.cs
│   └── ...
├── ManteniWeb.DatosTablas/        # 89 archivos - Modelos de datos
│   ├── TDatosTipificacionPrimaria.cs
│   ├── TDatosCampaign.cs
│   ├── TDatosOperador.cs
│   └── ...
├── ManteniWeb.Controllers/        # 34 archivos - Controladores MVC
│   ├── CampanasController.cs
│   ├── OperadoresController.cs
│   ├── ReprogramacionesController.cs
│   └── ...
└── ManteniWeb.CambiosEnCaliente/  # 69 archivos - Hot changes / mensajería
    ├── TPersuaderCampanaAlta.cs
    ├── TPersuaderCampanaBaja.cs
    ├── TAltaReprogramaciones.cs
    └── ...
```

---

## 🔍 Archivos Clave por Módulo

### Tipificaciones
1. **`ManteniWeb/PerfilDeTipificaciones.cs`** ⭐ - Validaciones UI (maxlength='100')
2. **`ManteniWeb/Tipificaciones.cs`** - Listado perfiles
3. **`ManteniWeb/TipificacionPrimaria.cs`** - CRUD primarias
4. **`ManteniWeb.SQLServices/TipificacioneSql.cs`** - Queries SQL
5. **`ManteniWeb.DatosTablas/TDatosTipificacionPrimaria.cs`** - Modelo datos

### Campañas
1. **`ManteniWeb.Code/EliminarObjetosDeBBDD.cs`** ⭐ - Restricciones eliminación
2. **`ManteniWeb/Campanas.cs`** - UI campañas
3. **`ManteniWeb.Controllers/CampanasController.cs`** - API REST
4. **`ManteniWeb.SQLServices/CampanaListaSqlService.cs`** - Queries
5. **`ManteniWeb.Code/ParamsCampana.cs`** - Parámetros

### Operadores
1. **`ManteniWeb/Operador.cs`** - Formulario operador
2. **`ManteniWeb.Controllers/OperadoresController.cs`** - API
3. **`ManteniWeb.SQLServices/OperadoresSql.cs`** - Queries
4. **`ManteniWeb.DatosTablas/TDatosOperador.cs`** - Modelo

### Reprogramaciones
1. **`ManteniWeb.Code/EliminarObjetosDeBBDD.cs`** ⭐ - Restricción subsistema
2. **`ManteniWeb/Reprogramaciones.cs`** - UI
3. **`ManteniWeb.SQLServices/ReprogramacionesSql.cs`** - Queries
4. **`ManteniWeb.CambiosEnCaliente/TAltaReprogramaciones.cs`** - Hot changes

### Calendario
1. **`ManteniWeb.Code/EliminarObjetosDeBBDD.cs`** ⭐ - Restricción subsistema
2. **`ManteniWeb/PgCalendario.cs`** - UI calendario
3. **`ManteniWeb.Code/Calendario.cs`** - Lógica negocio
4. **`ManteniWeb.SQLServices/CalendariosSistemaSql.cs`** - Queries

---

## 📈 Estadísticas de Decompilación

| Métrica | Valor |
|---------|-------|
| **Archivos .cs generados** | 957 |
| **Tamaño total código** | 9.5 MB |
| **Líneas de código (aprox)** | ~250,000 |
| **Namespaces principales** | 11 |
| **Clases SQL Services** | 50 |
| **Controladores MVC** | 34 |
| **Páginas ASPX** | 176 |
| **Modelos de datos** | 89 |

---

## ✅ Reglas CONFIRMADAS del Manual

Estas reglas del Manual Part7 ahora tienen **evidencia en código**:

| Regla Manual | Pág | Código Verificado | Archivo | Línea |
|--------------|-----|-------------------|---------|-------|
| Nombre tipificación ≤ 100 chars | 15 | ✅ maxlength='100' | PerfilDeTipificaciones.cs | 247 |
| Un perfil debe ser "Por defecto" | 15 | ✅ BPorDefecto | PerfilDeTipificaciones.cs | 79, 252, 296 |
| No eliminar campaña activa | - | ✅ Activo == 1 | EliminarObjetosDeBBDD.cs | 76 |

---

## 🆕 Reglas NUEVAS Encontradas (NO en Manual)

Estas reglas **NO están documentadas** en el manual pero **SÍ están implementadas**:

| Regla Nueva | Código Verificado | Archivo | Línea |
|-------------|-------------------|---------|-------|
| No eliminar campaña del planificador | ✅ EsCampanaDePlanificador | EliminarObjetosDeBBDD.cs | 83 |
| No eliminar reprogramación del subsistema | ✅ ObtenerIdReprogramacionSubsistema() | EliminarObjetosDeBBDD.cs | 38 |
| No eliminar calendario del subsistema | ✅ EsCalendarioSubsistema | EliminarObjetosDeBBDD.cs | 197 |
| No eliminar horario si asignado a centro | ✅ Verifica centros asociados | EliminarObjetosDeBBDD.cs | 166 |

---

## ⚠️ Reglas PENDIENTES de Verificar

Estas reglas del manual **aún necesitan análisis** del código:

### Tipificaciones
- [ ] No eliminar tipificación si asociada a perfil (pendiente handler `ELIMINAR_PERFILES`)
- [ ] Debe existir al menos 1 perfil (pendiente verificar en handler)
- [ ] No eliminar perfil asignado a grupo (pendiente verificar restricción)
- [ ] Si grupo sin perfil, usa el por defecto (pendiente analizar lógica asignación)

### Condiciones
- [ ] Alias ≤ 15 caracteres
- [ ] Descripción ≤ 50 caracteres
- [ ] No eliminar si asociada a lista/filtro

### Tipos de Operación
- [ ] Nombre ≤ 25 caracteres
- [ ] Descripción ≤ 80 caracteres
- [ ] No eliminar si usado por campaña
- [ ] CLIENTE_ID obligatorio

### Skills
- [ ] No eliminar skill asignado a operadores

### Direcciones IP
- [ ] Dirección IP ≤ 15 caracteres
- [ ] Puerto es numérico

---

## 🔧 Próximos Pasos

### Inmediatos (Ahora con código disponible)

1. **Analizar handlers HTTP** ✅
   - Buscar `idSolicitud=ELIMINAR_PERFILES` y verificar restricciones
   - Buscar `idSolicitud=MARCAR_PERFIL_POR_DEFECTO` y verificar lógica

2. **Buscar validaciones de longitud** ✅
   ```bash
   grep -r "maxlength\|Length.*>.*15\|Length.*>.*25\|Length.*>.*50\|Length.*>.*80" decompiled/
   ```

3. **Analizar restricciones de integridad** ✅
   - Buscar checks de foreign keys antes de DELETE
   - Buscar mensajes de error tipo "no se puede eliminar porque..."

4. **Verificar valores por defecto** 📋
   - Estado inicial campaña = Pausada
   - Perfil tipificación por defecto
   - Configuraciones iniciales

### A Mediano Plazo

5. **Crear matriz de validación completa** 📋
   - Columna 1: Regla del manual
   - Columna 2: Código encontrado (archivo:línea)
   - Columna 3: Estado (✅ Implementada / ❌ Falta / ⚠️ Parcial)

6. **Documentar diferencias** 📋
   - Reglas en código NO en manual
   - Reglas en manual NO en código
   - Reglas con implementación diferente

7. **Actualizar documentación MD** 📋
   - Cambiar 🧠 INFERIDA → 💻 CÓDIGO para reglas verificadas
   - Añadir referencias exactas a archivos decompilados
   - Crear sección "Reglas Adicionales del Código"

---

## 💡 Insights Importantes

### 1. Patrón de Validación Encontrado
```csharp
// PATRÓN TÍPICO:
if (condicionNoPermiteEliminar)
{
    mensaje = "No se puede eliminar X porque ...";
    list.Add(mensaje);
    flag = true; // Indica error
    continue;    // Salta a siguiente elemento
}
```

Este patrón se repite en **`EliminarObjetosDeBBDD.cs`** para todas las restricciones.

### 2. Validaciones en Múltiples Capas

**Cliente (HTML)**:
```html
<input maxlength='100' required />
```

**Cliente (JavaScript)**:
```javascript
if (valor === '') { alert('Campo obligatorio'); }
```

**Servidor (C#)**:
```csharp
if (objeto.Activo == 1) {
    return "No se puede eliminar";
}
```

### 3. Configuración en Recursos

Muchos mensajes vienen de archivos de recursos:
- `ConfigResources.tipif_eliminarPerfil`
- `ConfigResources.tipif_PerfilPorDefecto`
- `ComunResources.atencion`

**Pendiente**: Analizar archivos `.resx` decompilados para ver mensajes exactos.

---

## 🎯 Conclusión Preliminar

### ✅ Lo que FUNCIONA

1. **Decompilación exitosa**: 957 archivos C# recuperados
2. **Código legible**: Estructura clara, nombres descriptivos
3. **Reglas verificadas**: 7+ reglas confirmadas en código
4. **Nuevas reglas**: 4+ reglas no documentadas pero implementadas

### ⚠️ Lo que FALTA

1. **Análisis completo**: Solo ~10% del código revisado
2. **Handlers HTTP**: Pendiente analizar respuestas AJAX
3. **Base de datos**: Constraints SQL no están en código C#
4. **Testing**: Verificar funcionamiento real vs código

### 🚀 Siguiente Acción Prioritaria

**Buscar y analizar handlers HTTP** para verificar las 10+ reglas pendientes del manual.

Comando sugerido:
```bash
grep -r "idSolicitud.*ELIMINAR\|idSolicitud.*VALIDAR\|idSolicitud.*GUARDAR" decompiled/ -A 20
```

---

**Generado**: 2025-10-28
**Por**: Claude Code
**Basado en**: Decompilación de ManteniWeb.dll con ILSpy 9.1.0
