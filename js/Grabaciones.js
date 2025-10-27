/// ---------------------------------------------------------------------------------------------------------
///  -----
///  -----       FUNCIONES JAVASCRIPT DEL FORMULARIO DE BÚSQUEDA DE GRABACIONES
///  -----
///  --------------------------------------------------------------------------------------------------------
///  

/// ********************************************
/// En el menú se ha seleccionado la opción de búsqueda avanzada. 
/// Se muestrran todos los campos para la búsqueda avanzada y se ocultan los de l busqueda por Ids
/// ********************************************
function BusquedaAvanzada() {

    $('#TipoDeBusqueda').val('A');
    $('#DivOpcionesBusqueda').css('display', 'block');
    $('#DivBusquedaPorIdGrabacion').css('display', 'none');

    $('#GlobalOpcionesDeBusqueda').css('visibility', 'visible');
    $('#GlobalOpcionesDeBusqueda').css('display', '');
    $('#BotonMostrarOcultarOpcionesB').text("");
    $('#BotonMostrarOcultarOpcionesB').attr("title", "Ocultar opciones de búsqueda");
    $('#BotonMostrarOcultarOpcionesB').append("<span class='fa fa-angle-double-up' style='color:black;'/>");
    $('#DivAcordeon').css('height', '200px', 'important');
}



/// ********************************************
/// En el menú se ha seleccionado la opción de búsqueda por Ids. 
/// Se muestrran todos los campos para la búsqueda por Ids y se ocultan los de l busqueda avanzada
/// ********************************************
function BusquedaPorId() {
    $('#TipoDeBusqueda').val('I');
    $('#DivOpcionesBusqueda').css('display', 'none');
    $('#DivBusquedaPorIdGrabacion').css('display', 'block');
    $('#GlobalOpcionesDeBusqueda').css('visibility', 'visible');
    $('#GlobalOpcionesDeBusqueda').css('display', '');
    $('#BotonMostrarOcultarOpcionesB').text("");
    $('#BotonMostrarOcultarOpcionesB').attr("title", "Ocultar opciones de búsqueda");
    $('#BotonMostrarOcultarOpcionesB').append("<span class='fa fa-angle-double-up' style='color:black;'/>");
    $('#DivAcordeon').css('height', '200px', 'important');
}



/// ********************************************
/// Función abre la ventana modal para la exportación de grabaciones
/// ********************************************
function AbrirModalGrabaciones() {

    const checkboxesMarcados = document.querySelectorAll('.checksGrabaciones:checked');
    if (checkboxesMarcados) {
        if (checkboxesMarcados.length === 1)
            $('#NumeroGrabacionesLabel').text('Se va a exportar la grabación seleccionada. ¿Desea continuar ? ');
        else
            $('#NumeroGrabacionesLabel').text('Se van a exportar las ' + checkboxesMarcados.length + ' grabaciones seleccionadas. ¿Desea continuar ? ');
    }
    else
        $('#NumeroGrabacionesLabel').text('Se van a exportar las grabaciones a fichero. ¿Desea continuar?');

    $('#contrasena').val('');
    $('#ModalGrabaciones').modal({ backdrop: 'static' });
    $('.modal-backdrop').css('z-index', 0);
    $('#ModalGrabaciones').modal('show');
}




/// ********************************************
/// Función que muestra u oculta los combos de grupos o campañas según la opción pulsada
/// en el checkbox de selección
/// ********************************************
function OpcionRadioButton(opcion) {
    /// Muestro grupos oculto campañas
    if (opcion == 1) {
        $('#GruposAcd').css('display', 'block');
        $('#Campanas').css('display', 'none');
        $('#Listas').css('display', 'none');
    }
    else {
        /// oculto grupos muestro campañas
        $('#GruposAcd').css('display', 'none');
        $('#Campanas').css('display', 'block');
    }
}



/// ********************************************
/// Función que rellena el combo de Tipificaciones cuando se ha seleccionado una opción
/// en el combo de grupos que tiene tipificaciones
/// ********************************************
function RellenaComboTipificaciones() {
    // obtengo la opción seleccionada
    let gruposelected = $('#Grupo').val();
    /// Si se selecciona todos los grupos no se mustra el combo de tipificaciones
    if (gruposelected == "T") {
        $('#TipificacioneGrupos').css('display', 'none');
        return;
    }

    var params = { "grupoSeleccionado": gruposelected };

    $.ajax({
        type: "POST",
        url: getAbsolutePath() + "/Grabaciones.aspx/GetOptionsTipificaciones",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: false,
        cache: false,
        timeout: 5000,
        success: function (data) {
            if (data === null) {
                alert('Se ha producido un error al recuperar las tipificaciones del grupo ');
            }

            var opc = $.parseJSON(data.d);
            if (opc === 'NONE') {  //No hay datos, no se muestra el combo
                $('#TipificacioneGrupos').css('display', 'none');
                return;
            }
            else if (opc.substring(0, 2) != 'KO') {
                if (opc === '') {
                    $('#TipificacioneGrupos').css('display', 'none');
                }
                else {
                    $('#SelTipificaciones').html(opc);
                    $('#TipificacioneGrupos').css('display', 'block');
                }
            }
            else
                alert(opc);
        }, error: function (e) { console.log(e); }
    });
}


/// ********************************************
/// Función que rellena el combo de listas cuando se ha seleccionado una opción
/// en el combo de campañas
/// ********************************************
function RellenaComboListas() {
    // obtengo la opción seleccionada
    var campanaselected = $('#SelCampanas').val();
    /// Si se selecciona todas las campañas se quita el combo de listas y no se hace nada más
    if (campanaselected == "T") {
        $('#Listas').css('display', 'none');
        return;
    }

    var params = { "campana": campanaselected };

    $.ajax({
        type: "POST",
        url: getAbsolutePath() + "/Grabaciones.aspx/GetOptionsComboList",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: false,
        cache: false,
        timeout: 5000,
        success: function (data) {
            if (data === null) {
                alert('Se ha producido un error al recuperar las listas de la campaña ');
            }
            let opc = $.parseJSON(data.d);
            if (opc.substring(0, 2) != 'KO') {
                $('#SelListas').html(opc);
                $('#Listas').css('display', 'block');
            }
            else
                alert(opc);
        }, error: function (e) { console.log(e); }
    });
}


function RellenaComboResultadosNegocio() {
    // obtengo la opción seleccionada
    var campanaselected = $('#SelCampanas').val();
    /// Si se selecciona todas las campañas se quita el combo de listas y no se hace nada más
    if (campanaselected == "T") {
        $('#ResultadosNgcio').css('display', 'none'); 
        return;
    }

    var params = { "campana": campanaselected };

    $.ajax({
        type: "POST",
        url: getAbsolutePath() + "/Grabaciones.aspx/GetOptionsComboResultados",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: false,
        cache: false,
        timeout: 5000,
        success: function (data) {
            if (data === null) {
                alert('Se ha producido un error al recuperar las listas de la campaña ');
            }

            var opc = $.parseJSON(data.d);
            if (opc.substring(0, 2) != 'KO') {
                $('#SelResultadosNegocio').html(opc);
                $('#ResultadosNgcio').css('display', 'block');
            }
            else
                alert(opc);
        }, error: function (e) { console.log(e); }
    });
}




function GuardarGrabacion(url, nombre) {
    var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    console.log('is_chrome: ' + is_chrome);
    var isFirefox = typeof InstallTrigger !== 'undefined';
    console.log('isFirefox: ' + isFirefox);
    var isIE = esIE();
    console.log('isIE: ' + isIE);
    if (esIE()) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.onload = function () {
            var respuesta = xhr.response;
            var nombreFichero = $('#GrabacionUp').val();
            var extension = $('#extensionGrabacion').val();
            var nombreConExtension = nombreFichero + '.' + extension;
            navigator.msSaveBlob(respuesta, nombreConExtension);
        }
        xhr.send();
    }
    else {
        var save = document.createElement('a');
        save.href = url
        save.target = '_blank';
        save.download = nombre;
        var evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
        save.dispatchEvent(evt);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }
}


function FBuscar() {
    $('#ExportarGrabaciones').css('display', 'inline');
    $('#btnspin').css('display', 'inline-block');
    // Si las tipificaciones están visibles guaro lo seleccionado siempre que no sea Todos
    if ($('#TipificacioneGrupos').is(":visible")) {

        const tipif1 = $('#SelTipificaciones :selected').parent().attr('label');
        const tipif2 = $('#SelTipificaciones :selected').text();
        if (tipif2 == "T") {
            $('#TipificacionPrimaria').val('');
            $('#TipificacionSecundaria').val('');
        }
        else {
            $('#TipificacionPrimaria').val(tipif1);
            $('#TipificacionSecundaria').val(tipif2);
        }
    }
    else {
        $('#TipificacionPrimaria').val('');
        $('#TipificacionSecundaria').val('');
        $('#SelTipificaciones').val('0');
    }

    formASP.submit();
}



function ReadyFunction() {
    //   FComportamientoPulsaFila();

    $('.tooltipbottom').tooltip({
        placement: "bottom"
    });

    $('.tooltiptop').tooltip({
        placement: "top"
    });

    $('#example').DataTable({
        order: [[0, 'desc']],
        pagingType: 'full_numbers',
        searching: false,
        dom: 'Blfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'colvis'
        ],
        language: {
            "decimal": ",",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ ",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ".",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sortDescending": ": Activar para ordenar la columna de manera descendente"
            },
            "buttons": {
                "copy": "Copiar",
                "colvis": "Visibilidad",
                "collection": "Colección",
                "colvisRestore": "Restaurar visibilidad",
                "copyKeys": "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br \/> <br \/> Para cancelar, haga clic en este mensaje o presione escape.",
                "copySuccess": {
                    "1": "Copiada 1 fila al portapapeles",
                    "_": "Copiadas %ds fila al portapapeles"
                },
                "copyTitle": "Copiar al portapapeles",
                "csv": "CSV",
                "excel": "Excel",
                "pageLength": {
                    "-1": "Mostrar todas las filas",
                    "_": "Mostrar %d filas"
                },
                "pdf": "PDF",
                "print": "Imprimir",
                "renameState": "Cambiar nombre",
                "updateState": "Actualizar",
                "createState": "Crear Estado",
                "removeAllStates": "Remover Estados",
                "removeState": "Remover",
                "savedStates": "Estados Guardados",
                "stateRestore": "Estado %d"
            }
        }
    });


    $('#formASP').removeAttr("style");

    $('#example tr').css('cursor', 'default');

    //$("#example tr").on('mouseenter', function () {
    //    let id = this.id.replace('/','');
    //    if (id !== null && id !== 'undefined') {
    //        let panel = document.getElementById('acc_' + id);
    //        panel.style.display = 'block';
    //    }
    //});

    //$("#example tr").on('mouseleave',  function () {
    //    let id = this.id.replace('/', '');
    //    if (id !== null && id !== 'undefined') {
    //        let panel = document.getElementById('acc_' + id);
    //        panel.style.display = 'none';
    //    }

    //});

    $('#sandbox-container .input-group.date').datepicker({
        format: 'dd/mm/yyyy',
        language: 'es',
        orientation: 'top left',
        autoclose: true,
        todayHighlight: true
    });


    $('#sandbox-container2 .input-group.date').datepicker({
        format: 'dd/mm/yyyy',
        language: 'es',
        orientation: 'top left',
        autoclose: true,
        todayHighlight: true
    });
}


function MostrarOcultarOpcionesBusqueda() {
    if ($('#GlobalOpcionesDeBusqueda').is(':visible')) {
        $('#GlobalOpcionesDeBusqueda').css('visibility', 'hidden');
        $('#GlobalOpcionesDeBusqueda').css('display', 'none');
        $('#DivOpcionesBusqueda').hide();
        $('#BotonMostrarOcultarOpcionesB').text("");
        $('#BotonMostrarOcultarOpcionesB').attr("title", "Mostrar opciones de búsqueda");
        $('#BotonMostrarOcultarOpcionesB').append("<span class='fa fa-angle-double-down' style='color:black;'/>");
        $('#DivAcordeon').css('height', '450px', 'important');
    }
    else {
        $('#GlobalOpcionesDeBusqueda').css('visibility', 'visible');
        $('#GlobalOpcionesDeBusqueda').css('display', '');
        $('#DivOpcionesBusqueda').show();
        $('#BotonMostrarOcultarOpcionesB').text("");
        $('#BotonMostrarOcultarOpcionesB').attr("title", "Ocultar opciones de búsqueda");
        $('#BotonMostrarOcultarOpcionesB').append("<span class='fa fa-angle-double-up' style='color:black;'/>");
        $('#DivAcordeon').css('height', '200px', 'important');
    }
}



function ObtenerChat(stringurl) {

    var winurl = getAbsolutePath() + "/VisorChat/Ver?stringurl=" + encodeURIComponent(stringurl);
    var otherWindow = window.open(winurl, '_blank');
}


function ObtenerGrabacion(stringurl, idgrabacion) {

    let rutabusqueda = stringurl + idgrabacion;
    let rutareproduccion = stringurl.toLowerCase();
    rutareproduccion = rutareproduccion.replace("queryvoicerecord", "searchvoicerecord") + idgrabacion;

    let bearerToken = document.getElementById("BearerToken").value;
    if (bearerToken !== undefined && bearerToken !== null && bearerToken !== "")
        bearerToken = "Bearer " + bearerToken;


    $.when(
        $.ajax({
            type: "POST",
            url: rutabusqueda,
            contentType: "application/json; charset=utf-8",
            async: false,
            cache: false,
            timeout: 5000,
            headers: {
                'Authorization': bearerToken
            },
            success: function (data) {
                var rc = data.rc;
                if (rc.toLowerCase() != "ok") {
                    alert(data.rc);
                    return false;
                }
                else if (rc.toLowerCase() == "recordia") {
                    map = window.open(rc.url, "Recording: " + idgrabacion, "status=0,title=0,height=400,width=350,scrollbars=1");
                }
                else {
                    map = window.open(rutareproduccion, "Recording: " + idgrabacion, "status=0,title=0,height=400,width=350,scrollbars=1");
                }
            },
            error: function (e) {
                alert(e.statusText);
                console.log(e);
            }
        })
          
    ).done();
}


function ObtenerVideo(stringurl) {
    $.when(
        $.ajax({
            type: "POST",
            url: stringurl,
            contentType: "application/json; charset=utf-8",
            async: false,
            cache: false,
            timeout: 5000,
            success: function (data) {
                var ref = data.ref;
                var url = data.url;
                var rc = data.rc;
                if (rc != "OK") {
                    alert("No se ha podido acceder al fichero: " + data.rc);
                    return false;
                }
                else {
                    var otherWindow = window.open(url, '_blank');
                }
            }

        })
    ).done();
}


function MuestraOcultaDatosCampana() {
    const chkSoloActivo = document.getElementById("SoloActivos");
       

    if (chkSoloActivo.checked) {
        $('.CampanaInactiva').css('display', 'none');
    }
    else {
        $('.CampanaInactiva').css('display', 'block');
    }


    //$("#SelCampanas").selectpicker("refresh");
    //$('#SelCampanas').selectpicker('show');
}	



/// FUNCIONES CREADAS PARA MVC
/// ********************************************
/// Función que rellena el combo de listas cuando se ha seleccionado una opción
/// en el combo de campañas
/// ********************************************

function RellenaComboListasMVC() {
    // obtengo la opción seleccionada
    var campanaselected = $('#SelCampanas').val();
    /// Si se selecciona todas las campañas se quita el combo de listas y no se hace nada más
    if (campanaselected == "T") {
        $('#Listas').css('display', 'none');
        return;
    }

    var params = { "idCampana": campanaselected };

    $.ajax({
        type: "POST",
        url: getRutaAbsolutaMVC() + "/Grabaciones/RellenaComboListas",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: false,
        cache: false,
        timeout: 5000,
        success: function (data) {
            if (data === null) {
                alert('Se ha producido un error al recuperar las listas de la campaña ');
            }
            let opc = $.parseJSON(data);
            if (opc.substring(0, 2) != 'KO') {
                $('#SelListas').html(opc);
                $('#Listas').css('display', 'block');
                $('#SelListas').selectpicker('refresh');
            }
            else
                alert(opc);
        }, error: function (e) { console.log(e); }
    });
}


function RellenaComboResultadosNegocioMVC() {
    // obtengo la opción seleccionada
    var campanaselected = $('#SelCampanas').val();
    /// Si se selecciona todas las campañas se quita el combo de listas y no se hace nada más
    if (campanaselected == "T") {
        $('#ResultadosNgcio').css('display', 'none');
        return;
    }

    var params = { "idCampana": campanaselected };

    $.ajax({
        type: "POST",
        url: getRutaAbsolutaMVC() + "/Grabaciones/GetOptionsComboResultados",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: false,
        cache: false,
        timeout: 5000,
        success: function (data) {
            if (data === null) {
                alert('Se ha producido un error al recuperar las listas de la campaña ');
            }

            var opc = $.parseJSON(data);
            if (opc.substring(0, 2) != 'KO') {
                $('#SelResultadosNegocio').html(opc);
                $('#ResultadosNgcio').css('display', 'block');
                $('#SelResultadosNegocio').selectpicker('refresh');
            }
            else
                alert(opc);
        }, error: function (e) { console.log(e); }
    });
}

function BuscarMVC() {
    console.log(" Se ha pulsado buscar grabaciones");
    // Muestro los botones para copiar o esportar los registros
    $('#CopiarRegistros').css('display', 'inline');
    $('#RegistorsACSV').css('display', 'inline');

    if (g_datosForm.TipoDeBusqueda === "A") {
        // Solo muestro el botón de esportar grabaciones a fichero si es el canal de telefonía
        if ($("#Canal").val() !== "1")
            $('#ExportarGrabaciones').css('display', 'none');
        else
            $('#ExportarGrabaciones').css('display', 'inline');

        $('#btnspin').css('display', 'inline-block');
        // Si las tipificaciones están visibles guaro lo seleccionado siempre que no sea Todos
        if ($('#TipificacioneGrupos').is(":visible")) {

            const tipif1 = $('#SelTipificaciones :selected').parent().attr('label');
            const tipif2 = $('#SelTipificaciones :selected').text();
            if (tipif2 == "T") {
                $('#TipificacionPrimaria').val('');
                $('#TipificacionSecundaria').val('');
            }
            else {
                $('#TipificacionPrimaria').val(tipif1);
                $('#TipificacionSecundaria').val(tipif2);
            }
        }
        else {
            $('#TipificacionPrimaria').val('');
            $('#TipificacionSecundaria').val('');
            $('#SelTipificaciones').val('0');
        }
    }
    else {
        g_datosForm.IdsGrabacion = $("#inpIdGrabacion").val();
    }

    g_SeHaPuldadoBuscar = true;
    // Recarga la tabla con los nuevo parámetros
    g_tablaGrabaciones.ajax.reload();

}

function ObtenerChatMVC(stringurl) {
    var winurl = getRutaAbsolutaMVC() + "/VisorChat/Ver?stringurl=" + encodeURIComponent(stringurl);
    var otherWindow = window.open(winurl, '_blank');
}

function CambioDeCanal() {    
    let canal = $("#Canal").val();
    console.log("Cambio de canal " + canal);

    if (canal === "3" || canal === "11" || canal === "12" || canal === "9" || canal === "10") {
        g_tablaGrabaciones.column(5).visible(true);
        g_tablaGrabaciones.column(6).visible(true);
        g_tablaGrabaciones.column(7).visible(true);
        g_tablaGrabaciones.column(8).visible(false);
        g_tablaGrabaciones.column(9).visible(false);
        g_tablaGrabaciones.column(10).visible(false);
        g_tablaGrabaciones.column(11).visible(false);
        g_tablaGrabaciones.column(12).visible(false);
        g_tablaGrabaciones.column(13).visible(false);
    }
    else {
        g_tablaGrabaciones.column(11).visible(true);    // Id grabación
        g_tablaGrabaciones.column(12).visible(true);    // Tipo
        g_tablaGrabaciones.column(13).visible(true);    // Duración

        if (g_datosForm.OpcionBusqueda === 0) { // Está el combo ACD activo
            g_tablaGrabaciones.column(6).visible(true);   // Tipificaciones
            g_tablaGrabaciones.column(7).visible(true);   // Subtipificacion
            g_tablaGrabaciones.column(8).visible(false);   // Campana
            g_tablaGrabaciones.column(9).visible(false);   // Lista
            g_tablaGrabaciones.column(5).visible(true);    // Grupo ACD
        }
        else if (g_datosForm.OpcionBusqueda === 1) {  // Está el combo Campaña activo
            g_tablaGrabaciones.column(5).visible(true);   // Grupo ACD
            g_tablaGrabaciones.column(9).visible(true);    // Lista
            g_tablaGrabaciones.column(6).visible(false);   // Tipificación
            g_tablaGrabaciones.column(7).visible(false);   // SubTipificación
            g_tablaGrabaciones.column(8).visible(true);    // Campaña
        }
        else {                                            // Campañas y grupos
            g_tablaGrabaciones.column(5).visible(true);   // Grupo ACD
            g_tablaGrabaciones.column(8).visible(true);    // Lista
            g_tablaGrabaciones.column(6).visible(true);   // Tipificación
            g_tablaGrabaciones.column(7).visible(true);   // SubTipificación
            g_tablaGrabaciones.column(8).visible(true);    // Campaña
        }
    }
}


function RellenaComboTipificacionesMVC() {
    console.log('Mira si hay tipificaciones');
    // Vacío combo tipificaciones
    $('#SelTipificaciones').html('');
    $('#SelTipificaciones').datepicker('refresh');

    // obtengo la opción seleccionada
    let gruposelected = $('#Grupo').val();
    /// Si se selecciona todos los grupos no se mustra el combo de tipificaciones
    if (gruposelected == "T") {
        $('#TipificacioneGrupos').css('display', 'none');
        g_tablaGrabaciones.column(6).visible(true);   // Tipificación
        g_tablaGrabaciones.column(7).visible(true);   // SubTipificación
        return;
    }

    var params = { "grupoSeleccionado": gruposelected };
    console.log("Se mira si hay tipicaciones para el grupo " + gruposelected);
    console.log('url: ' + getRutaAbsolutaMVC() + "/Grabaciones/RellenaComboTipificaciones");

    $.ajax({
        type: "POST",
        url: getRutaAbsolutaMVC() + "/Grabaciones/RellenaComboTipificaciones",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: false,
        cache: false,
        timeout: 5000,
        success: function (data) {
            if (data === null) {
                alert('Se ha producido un error al recuperar las tipificaciones del grupo ');
            }

            var opc = $.parseJSON(data);
            $('#SelTipificaciones').html('');
            if (opc === 'NONE') {  //No hay datos, no se muestra el combo
                console.log('El grupo no tiene tipificaciones');
                $('#TipificacioneGrupos').css('display', 'none');
                g_tablaGrabaciones.column(6).visible(false);       // Tipificación
                g_tablaGrabaciones.column(7).visible(false);       // SubTipificación
                return;
            }
            else if (opc.substring(0, 2) != 'KO') {
                if (opc === '') {
                    console.log("Error al obtener las tipifiaciones ");
                    $('#TipificacioneGrupos').css('display', 'none');
                    g_tablaGrabaciones.column(6).visible(false);       // Tipificación
                    g_tablaGrabaciones.column(7).visible(false);       // SubTipificación
                    alert(opc);
                }
                else {
                    console.log("El grupo si tiene tipificaciones");
                    $('#TipificacioneGrupos').css('display', 'block');
                    $('#SelTipificaciones').html(opc);
                    $('#SelTipificaciones').selectpicker('refresh');
                    g_tablaGrabaciones.column(6).visible(true);       // Tipificación
                    g_tablaGrabaciones.column(7).visible(true);       // SubTipificación
                }
            }
            else
                alert(opc);
        }, error: function (e) { console.log(e); }
    });
}



function DescargaDatosACSVMVC(respuesta) {
    let fecha = new Date();
    let mes = fecha.getMonth() + 1;

    if (mes > 9) {
        mes = '0' + mes;
    }
    let shoras = fecha.getFullYear() + '' + fecha.getMonth() + '' + fecha.getDate() + '_' + fecha.getHours() + '' + fecha.getMinutes() + '' + fecha.getSeconds();
    const filename = 'Recordings_' + shoras + '.csv';
    if (true && window.navigator.msSaveBlob) {
        var blob = new Blob([decodeURIComponent(respuesta.Mensaje)], {
            type: 'application/vnd.ms-excel;charset=UTF-8'
        });
        window.navigator.msSaveBlob(blob, filename);
    }
    else if (window.Blob && window.URL) {
        var csvFile;
        var downloadLink;
        //csvFile = new Blob([mensaje], { type: 'application/vnd.ms-excel;charset=UTF-8' });
        csvFile = new Blob(["\ufeff", respuesta.Mensaje]);
        downloadLink = document.createElement('a');
        downloadLink.download = filename;
        downloadLink.href = window.URL.createObjectURL(csvFile);
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
}



function copyTextToClipboardMVC(registros) {
    if (!navigator.clipboard) {
        alert("This navigator has not clipboard");
        return;
    }
    navigator.clipboard.writeText(registros.Mensaje).then(function () {
        alert(i18next.t('Grabaciones.CopiaGrabacionesClipboardOK'));
    }, function (err) {
        alert(i18next.t('Grabaciones.CopiaGrabacionesClipboardKO'), err);
    });
}



/// ********************************************
/// En el menú se ha seleccionado la opción de búsqueda avanzada. 
/// Se muestrran todos los campos para la búsqueda avanzada y se ocultan los de l busqueda por Ids
/// ********************************************
function BusquedaAvanzadaMVC() {

    $('#TipoDeBusqueda').val('A');
    $('#GlobalOpcionesDeBusqueda').css('display', 'block');
    $('#OpcionBusquedaPorID').css('display', 'none');
    g_datosForm.TipoDeBusqueda = 'A';
    $("#titlePage").val(i18next.t('Grabaciones.BusquedaAvanzada'));
}



/// ********************************************
/// En el menú se ha seleccionado la opción de búsqueda por Ids. 
/// Se muestrran todos los campos para la búsqueda por Ids y se ocultan los de l busqueda avanzada
/// ********************************************
function BusquedaPorIdMVC() {
    $('#TipoDeBusqueda').val('I');
    $('#GlobalOpcionesDeBusqueda').css('display', 'none');
    $('#OpcionBusquedaPorID').css('display', 'block');
    g_datosForm.TipoDeBusqueda = 'I';
    g_datosForm.OpcionBusqueda = 0;  // Busqueda tipo Grupo ACD
    g_tablaGrabaciones.column(6).visible(true);       // Tipificación
    g_tablaGrabaciones.column(7).visible(true);       // SubTipificación
    g_tablaGrabaciones.column(8).visible(true);       // Campaña
    g_tablaGrabaciones.column(9).visible(true);       // Lista
    g_tablaGrabaciones.column(5).visible(true);        // Grupo ACD
    $("#titlePage").val(i18next.t('Grabaciones.BusquedaPorId'));
}


function CambiaTipoIdGrabacion(tipoIdGrabacion) {
    g_datosForm.TipoIdGrabacion = tipoIdGrabacion;
}