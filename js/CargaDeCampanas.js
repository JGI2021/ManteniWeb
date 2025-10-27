
class CamposTablaTrabajo {
    constructor(campo) {
        this.campo = campo;
        this.seleccionado = false;
//        this.seleccionado = seleccionado;
//        this.campofichero = campofichero;
    }
}


class CamposFichero {
    constructor(campo, seleccionado, posicion, campotrabajo) {
        this.campo = campo;
        this.seleccionado = seleccionado;
        this.posicion = posicion;
        this.campotrabajo = campotrabajo;
        this.pk = false;
        this.telefono = false;
        this.campotablacliente = "0";
        this.campoID = campo.replace(' ', '_');
    }
}


// Variable donde se guardan los valores de los campos de la tabla de trabajo
var arrCampos = [];
var arrCamposFichero = [];

// Variables con los campos de para la tabla de cliente
class CamposTablaCliente {
    constructor(campo, nombre, campofichero) {
        this.campo = campo;
        this.nombre = nombre;
        this.campofichero = campofichero;
        this.campoId = campofichero.replace(' ', '_');
    }
}

var arrCliente = [new CamposTablaCliente("1", 'Nombre', ''), new CamposTablaCliente("2", 'Dirección', ''), new CamposTablaCliente("3", 'Localidad', ''),
                  new CamposTablaCliente("4", 'Provincia', ''), new CamposTablaCliente("5", 'Código postal', ''), new CamposTablaCliente("6", 'País', ''),
                  new CamposTablaCliente("7", 'Valor 1', ''), new CamposTablaCliente("8", 'Valor 2', ''), new CamposTablaCliente("9", 'Literal 1', ''),
                  new CamposTablaCliente("10", 'Literal 2', '')];


///***************************************************************
/// Buscamos los procesos asociados a la campaña seleccionada
/// Con los datos obtenidos se rellena el combo de procesos
///***************************************************************
function ObtenerProcesos(idcampana)
{
    var params = { 'idcampana': idcampana };
    //Paso a la variable oculta la campaña seleccionada
    $('#idcampanasselected').val(idcampana);

    $.ajax({
        type: "POST",
        url: getAbsolutePath() + "/CargaFicherosCampana.aspx/GetProcesos",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8", 
        success: function(data) 
        {
            if (data === null) { 
                alert('Se ha producido un error al recuperar los procesos asociados al proceso de carga de la campaña '); 
            }
            $('#idProceso').find('option').remove();
            $('#idProceso').append('<option value=\"\" disabled selected hidden > &#60; Seleccione un proceso de carga &#62; </option>'); 
            $('#idProceso').append('<option value=\"-1\" > Nuevo proceso de carga  </option>');
            $('#idProceso').prop('disabled', false);
            RellenaSelectProcesos(data);

        },   error: function(e) { console.log(e);  }
    });
}; 



function RellenaSelectProcesos(resp) 
{
    var arr = $.parseJSON(resp.d);

    $.each(arr, function (index, proceso) {
        $('#idProceso').append('<option value=\"' + proceso.idProcesoCarga + '\" >' + proceso.nombreProceso + '</option>');
    });
}



///******************************************************************
//  Rellena los datos de la tabla de relaciones 
//  Se pasa el fichero a la ruta de carga y se leen sus campos.
//  Si es una carega nueva se rellenan los datos de la tabla con lo leido del fichero 
//  sino con los datos asociados al proceso
//*******************************************************************
function ObtenerDatosProceso(idproceso) 
{
    // Paso a la variable oculta el valor que se ha seleccionadop en el Selector
    $('#idprocesoselected').val(idproceso);

    if (FicheroCarga.files.length === 0) 
    { 
        alert('Debe seleccionar primero el fichero '); 
        $('#idProceso').find('option').remove();
        $('#idProceso').append('<option value=\"\" disabled selected hidden > Seleccione un proceso de carga  ... </option>'); 
        $('#idProceso').append('<option value=\"-1\" > Nuevo proceso de carga ... </option>');
        return 
    } 

    var nombreFichero1 = ''; 
    /// Si se ha seleccionado uno nuevo se envía el fichero a la ruta de carga y se leen sus campos
    if (FicheroCarga.files.length > 0) {
        var file = FicheroCarga.files[0];
        nombreFichero1 = 'C' + new Date().getTime() + '_' + FicheroCarga.files[0].name;
        // Antes de subirlo guardo el nomre para luego poder biuscarlo
        $('#nombreficherocarga').val(nombreFichero1);

        uploadBlobOrFileIR(file, nombreFichero1,
        function (uploaded) {
            return true;
        });
        //        function readyCallback() { }

        // Antes de activar el tab de relaciones quito la clase de desactivo del tab
        $('#Cabecera_Relaciones').removeClass('disabled');
        $('#Cabecera_Relaciones').removeClass('disabledTab');
        // Desactivo el tab tres por si estaba activo
        if (!$('#Cabecera_Resultados').hasClass('disabled'))
        {
            $('#Cabecera_Resultados').addClass('disabled');
            $('#Cabecera_Resultados').addClass('disabledTab');
        }
        // Activo el panel de Relaciones entre campos del fichero y tabla de trabajo
        $('#tab_dos').trigger('click');
        /// Miro si es un proceso nuevo o uno que ya existe.
        if (idproceso === '-1') {
            NuevoProcesoDeCarga(nombreFichero1);
        }
            /// el proceso ya existe, en este caso se leen los datos de la base de datos y se rellena el formulario con lo que se ha leido de las tablas
        else {
            var extension = 'XLSX';
            if (nombreFichero1.toUpperCase().endsWith('.XLSX'))
            { extension = 'XLSX'; }
            else if (nombreFichero1.toUpperCase().endsWith('.XLS')) { extension = 'XLS'; }
            else if (nombreFichero1.toUpperCase().endsWith('.CSV')) extension = 'CSV';

            var params = { 'idproceso': idproceso, 'ficheroCarga': nombreFichero1, 'extension': extension };
            $.ajax({
                type: "POST",
                url: getAbsolutePath()  + "/CargaFicherosCampana.aspx/GetDatosProceso",
                data: JSON.stringify(params),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data === null) {
                        alert('Se ha producido un error al recuperar los procesos asociados al proceso ');
                    }

                    RellenaDatosProceso(data, nombreFichero1);
                }, error: function (e) { console.log(e); }
            });
        }
    }
} 


/// Entrada de datos de un proceso ya existente
/// Rellena los datos del formulario relaciones y filtros con los datos recibidos del proceso seleccionado
function RellenaDatosProceso(resp, fichero) {
    var proceso = $.parseJSON(resp.d);

    if (proceso.resultado === 'KO')
    {
        alert("Error al comparar los datos del fichero con lo que tiene asignado el proceso seleccionado: \n" + proceso.error);
        return;
    }

    var extension = 'XLSX';
    if (fichero.toUpperCase().endsWith('.XLSX'))
    { extension = 'XLSX'; }
    else if (fichero.toUpperCase().endsWith('.XLS')) { extension = 'XLS'; }
    else if (fichero.toUpperCase().endsWith('.CSV')) extension = 'CSV';

    if (extension !== proceso.tipoFicheroCarga)
    {
        alert("El tipo de extensión del fichero no coincide con el dato almacenado del proceso seleccionado");
    }

    $('#LabelTipoDichero').val('Fichero: ' + extension.toUpperCase());

    // Guardo la extensión del fichero para luego poder buscarlo
    $('#extensionficherocarga').val(extension);
    $('#IdNombreProceso').val(proceso.nombreProceso);
    // Oculto el panel que controla los check de tabla por defecto o tabla propia
    $('#DivChecksTablasPropias').css('display', 'none');

    $('#slBasesDeDatos').css('visibility', 'visible');

    // Marco como no visibles todas las opciones del selector para que solo quede la base de datos seleccionada y no puedan cambiar
    // el combo tiene que estar visible para que viaje al pulsar el botón cargar sino habría que pasar el seleccionado a una variable oculta
    var options = $('#slBasesDeDatos option');
    //Obtengo un array con todos los valores 
    var values = $.map(options, function (option) {
        return option.value;
    });
    // reviso el array y marco como no visible los que no son la base de datos seleccionada
    values.forEach(function (item, index) {
        if (item !== proceso.basedatosTablaTrabajo)
            $('#slBasesDeDatos option[value=\"' + item + '\"]').css('display', 'none');
        else
            $('#slBasesDeDatos option[value=\"' + item + '\"]').prop('selected', 'selected');
    });


    // Hacemos lo mismo con las tablas
    $('#slTablas').css('visibility', 'visible');
    $('#slTablas').prop('disabled', false);

    $('#slTablas').append($('<option>', {
        value: proceso.nombreTablaTrabajo,
        text: proceso.nombreTablaTrabajo
    }));

    var options2 = $('#slTablas option');
    //Obtengo un array con todos los valores 
    var values2 = $.map(options2, function (option) {
        return option.value;
    });
    // reviso el array y marco como no visible los que no son la base de datos seleccionada
    values2.forEach(function (item, index) {
        if (item !== proceso.nombreTablaTrabajo)
            $('#slTablas option[value=\"' + item + '\"]').css('display', 'none');
        else {
            $('#slTablas option[value=\"' + item + '\"]').prop('selected', 'selected');
        }
    });
    
 
    //////////////////////////////////////
    /// Relleno la parte de filtros
    //////////////////////////////////////
    if (proceso.filtros.incompleto === "1")
        $('#ChkIncompleto').attr('checked', true);
    else
        $('#ChkIncompleto').attr('checked', false);

    if (proceso.filtros.duplicado === "1")
        $('#ChkDuplicado').attr('checked', true);
    else
        $('#ChkDuplicado').attr('checked', false);

    if (proceso.filtros.tfnoErroneo === "1") {
        $('#ChkTfnoErroneo').attr('checked', true);
        // si activo los erróneos habilito los campos de min, max longituud y el de prefijos
        CamposTfnoErroneo();
    }
    else
        $('#ChkDuplicado').attr('checked', false);


    if (proceso.filtros.minTamanoTfnoErroneo > 0)
        $('#TfnoErrMinValue').val(proceso.filtros.minTamanoTfnoErroneo);
    else
        $('#TfnoErrMinValue').val('');

    if (proceso.filtros.maxTamanoTfnoErroneo > 0)
        $('#TfnoErrMaxValues').val(proceso.filtros.maxTamanoTfnoErroneo);
    else
        $('#TfnoErrMaxValues').val('');

    if (proceso.filtros.caracteresInvalidos === "1")
        $('#ChkTfnoCaracterInvalido').attr('checked', true);
    else
        $('#ChkTfnoCaracterInvalido').attr('checked', false);

    if (proceso.filtros.recuperaTelefonos === "1")
        $('#ChkTfnoRecuperar').attr('checked', true);
    else
        $('#ChkTfnoRecuperar').attr('checked', false);

    $('#TfnoErrPrefijo').val(proceso.filtros.prefijo);

    // Pongo el tipo de carga que tiene asociado por defecto
    if (proceso.tipocarga === 'carganueva')
        $('#ChkTCargaNueva').attr('checked', true);
    else if (proceso.tipocarga === 'solonuevos')
        $('#ChkSoloNuevos').attr('checked', true);
    else if (proceso.tipocarga === 'solofinalizados')
        $('#ChkActualiza').attr('checked', true);
    else if (proceso.tipocarga === 'incorporacarga')
        $('#ChkSoloCarga').attr('checked', true);



    ///////////////////////////
    /// Formulario d erelaciones
    ///////////////////////////
    $('#TablaCampos > tr').empty();

    // Vacío los array porque los voy a rellenar con los datos que he recuperado del proceso seleccionado, del servidor.
    arrCampos = []
    arrCamposFichero = []
   

    // Creo las filas y relleno los combos con los datos
    $.each (proceso.lsRelaciones, function (index, relacion) {
        arrCampos.push(new CamposTablaTrabajo(relacion.campoTablaTrabajo));
        // Creamos la fila con los selectores y checks
        CreaFilaTabla(relacion.campoFichero);
        var campofichero = relacion.campoFichero;
        // Si tiene asociado un campo de la tabla de trabajo lo incluimos en el selector y lo marcamos como seleccionado. También se incluye en el array
        if (relacion.campoTablaTrabajo !== '') {            
            $('#sltr' + campofichero).append($('<option>', {
                value: 'cmp_' + relacion.campoTablaTrabajo,
                text: relacion.campoTablaTrabajo,
                selected: true
            }));
            // Incluimos el campo en el array
            arrCamposFichero.push(new CamposFichero(relacion.campoFichero, true, relacion.posicionCampoFichero, relacion.campoTablaTrabajo));
        }
        else {
            arrCamposFichero.push(new CamposFichero(relacion.campoFichero, false, relacion.posicionCampoFichero, ''));
        }
        // añadimos los campos de trabajo que no se están seleccionados al combo
        proceso.lsRestoCampos.forEach(function (camporesto, index) {
            $('#sltr' + relacion.campoFichero).append($('<option>', {
                value: 'cmp_' + camporesto,
                text: camporesto
            }));
        });
    });
    // añado el resto de campos de la tabla de trabajo al array
    proceso.lsRestoCampos.forEach(function (camporesto, index) {
        arrCampos.push(new CamposTablaTrabajo(camporesto));
    });
 

    // Miramos que campos son PK, telefono o tienen asignao un campo de la tabla cliente
    $.each(proceso.lsRelaciones, function (index, relacion) {
        var campofichero = relacion.campoFichero;

        // Busco el elemento dentro del array por si tiene alguna de las siguientes opciones poder
        // actaulizar el array
        var result = arrCamposFichero.find(function (elemento) {
            return elemento.campo === campofichero
        });

        // Si él campo está marcado como el de identificador lo marcamos
        if (relacion.esIdCliente === "1") {
            $('#rd' + campofichero).attr('checked', true);
            if (result !== null)
                result.pk = true;
        }
        // Si el campo es de tipo teléfono lo marcamos
        if (relacion.esCampoTelefono === "1") {
            $('#chk' + campofichero).attr('checked', true);
            if (result !== null)
                result.telefono = true;
        }
        // Si hay seleccionado algún campo de la tabla de cliente lo marcamos como seleccionado
        if (relacion.relacionConTablaCliente !== "0") {
            $('#slcl' + campofichero + ' option[value="' + relacion.relacionConTablaCliente + '"]').attr('selected', 'selected');
            if (result !== null)
                result.campotablacliente = relacion.relacionConTablaCliente;
            // Elimino de los combos el que esta seleccionado salvo del propio
            arrCamposFichero.forEach(function (elem, index) {
                if (elem.campo !== campofichero)
                    $('#slcl' + elem.campo + ' option[value=\"' + relacion.relacionConTablaCliente + '\"]').remove();
            });
        }
    });
}


///// Función que sube el fichero a la ruta de carga. Está en el ASPX de carga ya que necesita as rutas 
//function uploadBlobOrFileIR(blobOrFile, nameFile, done) 
//{
//    uploadBlobOrFileUnFicheroDone('" + WebConfigParams.URLWSSubirFicherosCampana + "',blobOrFile, nameFile, done,'" + WebConfigParams.IdentificadorRutaFicherosCampana + "');
//}


function updateProgress(evt) 
{
    if (evt.lengthComputable) 
    {
        var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
        if (percentLoaded < 100) {
            document.querySelector('.percent').style.width = percentLoaded + '%'; 
            document.querySelector('.percent').textContent = percentLoaded + '%';
        }
    } 
}


///***************************************************************************************
/// NUEVO PROCESO DE CARGA
/// Se ha seleccionado un nuevo proceso de carga y el fichero ya se ha subido a la ruta
///---------------------------------------------------------------------------------------
function NuevoProcesoDeCarga(fichero) 
{ 
    var extension = 'XLSX'; 
    if (fichero.toUpperCase().endsWith('.XLSX'))
    {   extension = 'XLSX'; }
    else if (fichero.toUpperCase().endsWith('.XLS')) { extension = 'XLS'; }
    else if (fichero.toUpperCase().endsWith('.CSV')) extension = 'CSV';
    // Guardo la extensión del fichero para luego poder buscarlo
    $('#extensionficherocarga').val(extension);
    $('#LabelTipoDichero').val('Fichero: ' + extension.toUpperCase());

    $('#IdNombreProceso').val('');
    /// Muestro el panel que controla si es tabla por defecto o propia
    $('#DivChecksTablasPropias').css('display', 'block');
//    $('#idlbltabladefecto').css('visibility', 'visible');
//    $('#idlbltablapropia').css('visibility', 'visible');

    $('#idlbltablapropia').attr('disabled', false);
    $('#rdTablaDefecto').attr('diabled', false);
    $('#rdTablaPropia').attr('disabled', false);
    
    $('#rdTablaDefecto').attr('checked', true);
    $('#rdTablaPropia').attr('checked', false);

    // Marco como visibles todas las opciones del selector
    var options = $('#slBasesDeDatos option');
    //Obtengo un array con todos los valores 
    var values = $.map(options, function (option) {
        return option.value;
    });
    // reviso el array y marco como visible los que no son la base de datos seleccionada
    values.forEach(function (item, index) {
        $('#slBasesDeDatos option[value=\"' + item + '\"]').css('display', 'block');
        if (item === 'slInicio')
            $('#slBasesDeDatos option[value=\"slInicio\"]').prop('selected', 'selected');
    });

    $('#slTablas').html('');

    $('#slBasesDeDatos').attr('disabled', false);
    $('#slBasesDeDatos').css('visibility', 'hidden');

    $('#slTablas').append($('<option>', {
        value: '',
        text: '< Seleccione una tabla de trabajo >',
        selected: 'selected',
        disabled: 'disabled'
    }));

    $('#slTablas').attr('disabled', true);
    $('#slTablas').css('visibility', 'hidden');

    /// Asignamos valores por defecto a la parte de filtros
    $('#ChkIncompleto').attr('checked', false);
    $('#ChkDuplicado').attr('checked', false);
    $('#ChkDuplicado').attr('checked', false);
    $('#TfnoErrMinValue').val('');
    $('#TfnoErrMaxValues').val('');
    $('#ChkTfnoCaracterInvalido').attr('checked', false);
    $('#ChkTfnoRecuperar').attr('checked', false);
    $('#TfnoErrPrefijo').val('');

    $('#ChkSoloNuevos').attr('checked', true);


    var params = {'ficheroCarga': fichero, 'extension': extension}; 
    $.ajax({
        type: "POST",
        url: getAbsolutePath() + "/CargaFicherosCampana.aspx/CamposFicheroCarga",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8", 
        success: function(data) 
        {
            if (data === null) { 
                alert('Se ha producido un error al recuperar datos del fichero de carga '); 
                return; 
            } 
            else if (data.d === '')  {
                alert('No se ha podido leer los campos del fichero' ); 
                return; 
            }
            $('#TablaCampos > tr').empty(); 
            CreaRelacionesNuevoProceso(data);
        },   error: function(e) { console.log(e);  }
    });
} 



///******************************************************************************************************
/// Se ha creado un nuevo proceso de carga y se han leido los campos que forman el fichero de carga.
/// Se rellenan los array con las relaciones de campos que se establecen entre tabla trabajo y el fichero
///******************************************************************************************************
function CreaRelacionesNuevoProceso(resp)
{   
    arrCampos = []
    arrCamposFichero = []
    var arr = $.parseJSON(resp.d);
    var posicion = 1;
    $.each(arr, function(index, campo) { 
        arrCampos.push(new CamposTablaTrabajo(campo)); 
        arrCamposFichero.push(new CamposFichero(campo, true, posicion, campo)); 
        CreaFilaTabla(campo);
        posicion += 1;
    }); 

    ///// Relleno los combos con los campos de las tablas de trabajo
    arrCampos.forEach(function(cmptrabajo, index) 
    {
        var linea = ''; 
        arrCamposFichero.forEach(function(cmpfichero, index2) 
        {
            if (cmpfichero.campo !== cmptrabajo.campo && !cmpfichero.seleccionado) 
            {  
                $('#sltr'+cmpfichero.campo).append($('<option>', { 
                    value: 'cmp_' + cmptrabajo.campo,  
                    text: cmptrabajo.campo   
                })); 
                cmpfichero.seleccionado = false;  
                cmpfichero.campotrabajo = ''; 
            }
            else if (cmpfichero.campo === cmptrabajo.campo) 
            { 
                cmpfichero.seleccionado = true; 
                cmpfichero.campotrabajo = cmptrabajo.campo;
                $('#sltr'+cmpfichero.campo).append($('<option>', { 
                    value: 'cmp_' + cmptrabajo.campo,  
                    text: cmptrabajo.campo, selected: 'selected'  
                })); 
            } 
        }); 
    });
}  



function CreaFilaTabla(campo) 
{
    var row = '    <tr>'; 
    row +=    '       <td style=\"padding-left:10px;display:table-cell;\">' + campo + '</td>'; 
    row +=    '       <td style=\"display:table-cell;\">';
    row +=    '           <select class=\"form-control input-sm\" style=\"padding-left:10px;\" id=\"sltr' + campo + '\" onChange=\"ModificaCampoTablaTrabajo(this.value, this.id);\" >';
    row +=    '               <option campo=\"cmp_sinasignar\">&#60; Sin asignar &#62;</option> '
    row +=    '           </select>'; 
    row +=    '       </td>'; 
    row +=    '       <td style=\"display:table-cell;\"><div style=\"text-align:center\"><label><input type=\"radio\" name=\"opcCampos\" id=\"rd' + campo + '\"  onchange=\"ControlaTrlefono(this.id);\" /></label></div></td>';
    row +=    '       <td style=\"display:table-cell;\"><div style=\"text-align:center\"><label><input type=\"checkbox\" name=\"chk' + campo + '\" id=\"chk' + campo + '\" onchange=\"ControlaPK(this.id);\" /></label></div></td>'; 
    row +=    '       <td style=\"display:table-cell;\"><select class=\"form-control input-sm\" id=\"slcl' + campo + '\" name=\"sl' + campo + '\" onchange=\"ModificaCampoCliente(this.value, this.id)\"> '; 
    row +=    '                <option value=\"0\" > </option> ';
    row +=    '                <option value=\"1\" >Nombre</option> ';
    row +=    '                <option value=\"2\" >Dirección</option> ';
    row +=    '                <option value=\"3\" >Localidad</option> ';
    row +=    '                <option value=\"4\" >Provincia</option> ';
    row +=    '                <option value=\"5\" >Código postal</option> ';
    row +=    '                <option value=\"6\" >País</option> ';
    row +=    '                <option value=\"7\" >Valor 1</option> ';
    row +=    '                <option value=\"8\" >Valor 2</option> ';
    row +=    '                <option value=\"9\" >Literal 1</option> ';
    row +=    '                <option value=\"10\" >Literal 2</option> ';
    row +=    '           </select></td>'; 
    row +=    '    </tr>'; 
    $('#TablaCampos').append(row);
}



function CamposTfnoErroneo() {  
    if ($('#ChkTfnoErroneo').prop('checked') === true) {
        $('#TfnoErrMinValue').prop('disabled',false);
        $('#TfnoErrMaxValues').prop('disabled',false);
        $('#TfnoErrPrefijo').prop('disabled',false);
    } 
    else {
        $('#TfnoErrMinValue').prop('disabled',true);
        $('#TfnoErrMaxValues').prop('disabled',true);
        $('#TfnoErrPrefijo').prop('disabled',true);
    }
}


function RecuperaTelefonoClick() { 
    if ($('#ChkTfnoCaracterInvalido').prop('checked') === true) {
        $('#ChkTfnoRecuperar').prop('disabled', false);
    } 
    else {
        $('#ChkTfnoRecuperar').prop('disabled',true);
    }
}


function MostrarCampoBasesDatos() 
{
    $('#slBasesDeDatos').css('visibility', 'visible');
    $('#slTablas').css('visibility', 'visible');
}

function OcultaCampoBaseDatos()
{ 
    $('#slBasesDeDatos').css('visibility', 'hidden');
    $('#slBasesDeDatos').val('slInicio'); 
    $('#slTablas').css('visibility', 'hidden'); 
    $('#slTablas').find('option').remove();
    $('#slTablas').append('<option value="" disabled selected hidden > &#60; Seleccione una tabla &#62; </option>'); 
    ObtenerDatosProceso('-1');     // Iniciamos la carga con la tabla temporal
}

	
///****************************************************************
//  LLamada ajax que obtiene las tablas que hay en la base de datos
//  que se pasa como parámetro.
//  Con los datos devueltos se rellena el combo de tablas
///****************************************************************
function ObtenerTablasBBDD(val)
{
    var params = {'baseDatos': val};
    $.ajax({
        type: "POST",
        url: getAbsolutePath() + "/CargaFicherosCampana.aspx/GetTablasDeBBDD",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        success: function(data) 
        {
            $('#slTablas').prop('disabled',false);
            $('#slTablas').find('option').remove();
            $('#slTablas').append('<option value=\"\" disabled selected hidden > &#60; Seleccione una tabla &#62; </option>'); 
            RellenaComboTablas(data);
        },   error: function(e) { console.log(e);  }
    });
}; 
                     

function RellenaComboTablas(data) 
{
    var tablas = $.parseJSON(data.d);
    $.each(tablas, function (index, tabla) {
        $('#slTablas').append('<option value=' + tabla + ' >' + tabla + '</option>');
    });
}
                     

///***********************************************************************
// Mediante una llamada ajax se obtiene todos los campos de una tabla de
// base de datos.
// Con los datos que devuelve la función se rellena la tabla de campos
///***********************************************************************
function ObtenerCampos(tabla) 
{ 
    var baseDatos = $('#slBasesDeDatos option:selected').text(); 
    var params = {'baseDatos': baseDatos, 'tablaName': tabla}; 
    $.ajax({
        type: "POST",
        url: getAbsolutePath() + "/CargaFicherosCampana.aspx/GetCamposDeTablasBBDD",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8", 
        success: function(data) 
        { 
            $('#TablaCampos > tr').remove(); 
            $.each(data, function(index, obj) 
            { 
                RellenaTablaCampos(obj); 
            }); 
        }
    }); 
}


/// Relena la tabla de campos con la estructura devuelta
/// obj es una lista de clases tipo JSCamposTablaBBDD
function RellenaTablaCampos(obj) 
{ 
    /// Leo el array de ficheros y relleno la tabla 
    arrCamposFichero.forEach(function(dato, index)
    {  
        CreaFilaTabla(dato.campo); 
    });

    arrCampos = []
    var camposTabla = $.parseJSON(obj);
    $.each(camposTabla, function(index, data) { 
        arrCampos.push(new CamposTablaTrabajo(data.campo)); 
    });

    ///// Relleno los combos con los campos de las tablas de trabajo
    arrCamposFichero.forEach(function (cmpfichero, index) {
        var linea = '';
        $('#sltr' + cmpfichero.campo).find('option').remove();                 // vacíamos el combo
        $('#sltr' + cmpfichero.campo).append($('<option>', {                   // le añadimos la opción sin asignar
            value: 'cmp_sinasignar',
            text: '< Sin asignar >'
        }));
        cmpfichero.seleccionado = false;
        cmpfichero.campotrabajo = '';
        cmpfichero.pk = false;
        cmpfichero.telefono = false;
        cmpfichero.campotablacliente = "0";
    });


    arrCamposFichero.forEach(function (cmpfichero, indexf) {
        arrCampos.forEach(function(cmptrabajo, indext) 
        {
             if (cmptrabajo.campo === cmpfichero.campo) 
             { 
                 cmpfichero.seleccionado = true;
                 cmptrabajo.seleccionado = true;
                 cmpfichero.campotrabajo = cmptrabajo.campo;
                 $('#sltr'+cmpfichero.campo).append($('<option>', { 
                     value: 'cmp_' + cmptrabajo.campo,  
                     text: cmptrabajo.campo, selected: 'selected'  
                 })); 
             }
        });
    });

    arrCamposFichero.forEach(function (cmpfichero, indexf) {
        arrCampos.forEach(function(cmptrabajo, indext) 
        {
            // Buscamos coincidencia de nombres para hacer la asignación
            if (cmptrabajo.campo !== cmpfichero.campo && !cmptrabajo.seleccionado)
            { 
                $('#sltr'+cmpfichero.campo).append($('<option>', { 
                    value: 'cmp_' + cmptrabajo.campo,  
                    text: cmptrabajo.campo  
                }));

                cmpfichero.seleccionado = false;
            }
        });
    });
}


	

///********************************************************************************************
/// Se ha modificado la seleccion del combo con los campos de la tabla de trabajo
/// Como parámetros llega el valor nuevo que es cmp_+nombrecampotabla y el id del selector que 
/// es sltr+nombrecampofichero. A partir de esto marcamos la relación del campo de fichero con 
/// el de trabajo y se modifican todos los combos, eliminando de ellos el seleccionado y poniendo
/// el que se cambió
///********************************************************************************************
function ModificaCampoTablaTrabajo(campoAsignado, id) 
{  
    var campoModif = '';  
    arrCamposFichero.forEach(function(item, index2) {                  // Busco en el array el campo que tenía asignado y lo cambio
        if ('sltr' + item.campo === id)                                // Es el select que se ha modificado
        {                                                              
            campoModif = item.campotrabajo;                            // Tomo el valor del campo que había antes seleccionado
            if (campoAsignado === '< Sin asignar >') {
                $('#chk' + item.campo).prop('checked', false);              // Si está marcado como ID lo desmarco
                item.pk = false;
                $('#rd' + item.campo).prop('checked', false);               // Si está marcado como teléfono lo desmarco 
                item.telefono = false;
                // Si hay seleccionado algún campo de la tabla cliente lo desasigno
                $('#slcl' + item.campo + ' option[value=\"0\"]').attr("selected", "selected");
                item.campotablacliente = 0;
                item.seleccionado = false;                                 // En el array lo marco como no seleecionado
                item.campotrabajo = '';                                    // Ya no tiene un campo fichero asignado
            }
            else {
                item.seleccionado = true;                                 // En el array lo marco como seleecionado
                item.campotrabajo = campoAsignado.substring(4);           // Ya tiene un campo fichero asignado
            }

        }
    }); 
                  
    var campofichero = id.substring(4);                           // Es el select que se ha modificado (elimino el campo sltr del nombre del fichero
    /// ahora añadimos el que se ha modificado en todos los combos y elimino del combo el que se ha asignado
    arrCamposFichero.forEach(function(item, index) 
    {
        if (campoAsignado !== '< Sin asignar >' && ('sltr' + item.campo !== id)) {
            $('#sltr' + item.campo + ' option[value = ' + campoAsignado + ']').remove();
        }
  
        if (item.campotrabajo !== campoModif && campoModif !== '') 
        { 
            $('#sltr'+item.campo).append($('<option>', 
            { 
                 value: 'cmp_' + campoModif,  
                 text: campoModif  
            })); 
        } 
    });  
}



///***********************************************************************************************
///  Se ha cambiado la seleccion del campo cliente
///  Se pasan como parámetros el identificador del combo y el nuevo valor asignado
///***********************************************************************************************
 function ModificaCampoCliente(campoAsignado, id)  
{
     campo = id.substring(4);
     // PRimero compruebo que hay un campo asignado sino no tiene sentido y no permito la selección
     if ($('#sltr' + campo).val() === '< Sin asignar >')
     {
         alert("Debe seleccionar un campo de la tabla de trabajo");
         $('#slcl' + campo + ' option[value=\"0\"]').attr("selected", "selected");
         return;
     }

     var campoModif = "0";
     var nombreModif = '';
     arrCamposFichero.forEach(function (item, index2)                      // Busco en el array el campo que tenía asignado y lo cambio
     {
         if ('slcl' + item.campo === id)                                   // Es el select que se ha modificado
         {  
             campoModif = item.campotablacliente;                          // Tomo el valor del campo que había antes seleccionado
             item.campotablacliente = 0;
             if (campoModif !== "0") {
                 for (a = 0; a < arrCliente.length - 1; a++) {
                     var clcampo = arrCliente[a].campo;
                     if (clcampo === campoModif) {
                         var clnombre = arrCliente[a].nombre;
                         nombreModif = clnombre;
                         break;
                     }
                 }
             }
         }
     }); 
             
     /// ahora añadimos el que se ha modificado en todos los combos y elimino del combo el que se ha asignado
     arrCamposFichero.forEach(function (item, index)
     {
         if (campo === item.campo)                     // Es el select que se ha modificado (elimino el campo sltr del nombre del fichero
         {
             item.campotablacliente = campoAsignado;
         }

         if (campoAsignado !== "0" && ('slcl' + item.campo !== id))
             $('#slcl' + item.campo + ' option[value = ' + campoAsignado + ']').remove();
         if ('slcl' + item.campo !== id && nombreModif !== '')
         {
             item.tmkCliente = campoAsignado;
             $('#slcl' + item.campo).append($('<option>', {
                 value: campoModif,
                 text: nombreModif
             }));
         }
     }); 
 }


///******************************************************************************************
// Función para controlar que cuando se marca un campo como Primary Key, ese campo
// no puede estar marcado como que es de teléfono. Este campo debe ser el cliente_id
// En caso de que cuando se seleccione esté no puede estar el de PK y sino da un mensaje de 
// error y vuelve a ponerlo desmarcado
//*******************************************************************************************
 function ControlaTrlefono(id)
 {
     var campo = id.substring(2);      // Elimino el prefijo del identificador y me queda el campo del fichero al que pertenece

     if ($('#chk' + campo).is(':checked'))
     {
         alert("No se puede marcar este campo como ID si también está marcado como campo de teléfono");
         $('#rd' + campo).prop('checked', false);
     }
     else if ($('#sltr' + campo).val() === '< Sin asignar >') {
         alert("Debe haber un campo de la tabla de trabajo seleccionado ");
         $('#rd' + campo).prop('checked', false);
     }
     else
     {
         if ($('#rd' + campo).is(':checked')) 
         {
             for (i = 0; i < arrCamposFichero.length; i++) {
                 if (arrCamposFichero[i].campo === campo)
                 {
                     arrCamposFichero[i].pk = true;
                     break;
                 }
             }
         }
         else
         {
             for (i = 0; i < arrCamposFichero.length; i++) {

                 if (arrCamposFichero[i].campo === campo) {
                     arrCamposFichero[i].pk = false;
                     break;
                 }
             }
         }
     }
 }



///*********************************************************************************************************
/// Control cuando se marca un campo como ID. 
/// Se controla que si se pulsa el radio de Id tiene que haber un campo de la tabla de trabajo seleccionado
/// y no puede estar marcado el check de teléfono de esa fila.
///*********************************************************************************************************
 function ControlaPK(id)
 {
     var campo = id.substring(3);              // Elimino el prefijo del identificador y me queda el campo del fichero al que pertenece

     if ($('#rd' + campo).is(':checked')) {
         alert("No se puede marcar un campo como teléfono si está marcado como ID");
         $('#chk' + campo).prop('checked', false);      
     }
     else if ($('#sltr' + campo).val() === '< Sin asignar >' )  {
         alert("Debe haber un campo de la tabla de trabajo seleccionado ");
         $('#chk' + campo).prop('checked', false);
     }
     else
     {
         arrCamposFichero.forEach(function (item, index) {
             if (item.campo === campo)
                 item.telefono = true;
             else if (!$('#chk' + item.campo).is(':checked'))
                      item.telefono = false;
         });
     }
 }


///************************************************************
// Se ha pulsado el botón de cargar. Valida los datos y actualiza
// unos campos antes de hacer el submit
//*************************************************************
 function HacerSubmitCargar()
 {
     if (ValidaDatosDeCarga())
     {
         $('#botonAceptarF').val('true');
         $('#salir').val('false');
         $('#BbotonAceptarF').attr('disabled', true);
         $('#BbotonAceptarYSalir').attr('disabled', true);
         // Guardo en un json la relacion de campos y luego lo paso a un campo oculto para que viaje en el submit
         var myJsonString = JSON.stringify(arrCamposFichero);
         $('#relaciondecampos').val(myJsonString);
         $('#formASP').submit();
     }
 }


///***********************************************************************
/// Se ha pulsado el botón de cargar y salir. Valida los datos y actualiza
/// unos campos antes de hacer el submit
///***********************************************************************
 function HacerSubmitCargarYSalir()
 {
     if (ValidaDatosDeCarga()) {
         $('#botonAceptarYSalir').val('true');
         $('#salir').val('true');
         $('#BbotonAceptarF').attr('disabled', true);
         $('#BbotonAceptarYSalir').attr('disabled', true);
         // Guardo en un json la relacion de campos y luego lo paso a un campo oculto para que viaje en el submit
         var myJsonString = JSON.stringify(arrCamposFichero);
         $('#relaciondecampos').val(myJsonString);

         $('#formASP').submit();
     }
 }


 function ValidaDatosDeCarga()
 {
     // El proceso debe tener un nombre
     if ($('#idProceso').val() === '')
     {
         alert("Debe seleccionar un proceso de carga");
         $('#idProceso').focus();
         return false;
     }

     if ($('#IdNombreProceso').val() === '')
     {
         alert("El proceso de carg debe tener un nombre que lo identifique");
         $('#dNombreProceso').focus();
         return false;
     }

     var minvalue = $('#TfnoErrMinValue').val();
     var maxvalue = $('#TfnoErrMaxValues').val();
     if (minvalue !== null && maxvalue !== null) {
         if (minvalue > maxvalue) {
             alert("La mínima longitud del teléfono no puede ser mayor que la máxima");
             return false;
         }
     }

     //Debe haber una PK y al menos un campo marcado como teléfono
     var encontrado = false;
     for (i = 0; i < arrCamposFichero.length; i++)
     {
         if (arrCamposFichero[i].pk === true)
         {
             encontrado = true;
             break;
         }
     }

    
     if (encontrado === false)
     {
         alert('Debe seleccionar un campo como clave principal');
         return false;
     }

     for (i = 0; i < arrCamposFichero.length; i++) {
         if (arrCamposFichero[i].telefono === true) {
             encontrado = true;
             break;
         }
     }

     if (encontrado === false) {
         alert('Debe seleccionar al menos un campo de teléfonos');
         return false;
     }

     return true;
 }