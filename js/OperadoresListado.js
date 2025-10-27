


//    //// PULSAMOS EL CHECK DE SELECCION DE LA FILA DENTRO DE LA TABLA
//    $("#OpTable").on("click", "input", function () {
//        let id = $(this).attr('id');
//        // Obtengo el input
//        const element = document.getElementById(id);



//        let seleccionado = $('#idsSeleccionados').val();
//        id = id.slice(4); // elimino la parte chk_ que precede al id
//        let arrSeleccionados = [];


//        if (element.checked) {
//            if (seleccionado === '') {
//                seleccionado = id;
//                $('.EdicionSimple').css('display', 'block');
//                $('.EdicionMultiple').css('display', 'block');
//            }
//            else {
//                seleccionado += ',' + id;
//                $('.EdicionSimple').css('display', 'none');
//            }
//            $('#idsSeleccionados').val(seleccionado);
//        }
//        else { // desmarcamos check 
//            // los paso a un array
//            arrSeleccionados = seleccionado.split(',');
//            // lo elimino del array
//            const index = arrSeleccionados.indexOf(id);
//            if (index > -1) {
//                arrSeleccionados.splice(index, 1);
//            }
//            // lo paso todo a cadena
//            seleccionado = arrSeleccionados.join();
//            // lo guardo
//            $('#idsSeleccionados').val(seleccionado);
//            if (arrSeleccionados === 0 || seleccionado === '') {
//                $('.EdicionMultiple').css('display', 'none');
//                $('.EdicionSimple').css('display', 'none');
//            }
//            else if (arrSeleccionados.length === 1) {
//                $('.EdicionSimple').css('display', 'block');
//            }
//        }
//    });

//});


function OptionsChecked() {
    tableop.draw();
}



function GetUrlActual() {
    return 'Operadores/listado';
}

function ObtenerSeleccionados() {
    return $('#idsSeleccionados').val();
}

function VaciarIdsSeleccionados() {
    $('#idsSeleccionados').val('');
    $('.EdicionMultiple').css('display', 'none');
    $('.EdicionSimple').css('display', 'none');
}

//// Funciones del menú   ///////

//// ---- Nuevo operador
function Nuevo() {
    let URLNext = '';
    let usarOperadorEstendido = $("#usarOperadorExtendido").val();
    URLNext = 'Operadores/Operador/0';

    AvanzarPagina(GetUrlActual(), URLNext);
    AvanzarPagina('Operadores/listado', URLNext);
}


//// ---- Editar operador
function EditarFilas() {
    const idsSeleccionados = ObtenerSeleccionados();
    const elementTr = document.getElementById('tr_' + idsSeleccionados);
    let urlnext = '';

    let usarOperadorEstendido = $("#usarOperadorExtendido").val();

    AvanzarPagina('Operadores/listado', 'Operadores/Operador/' + idsSeleccionados);
}


//// --- Formulario de permios
function Permisos() {
    var filasMarcadas = ObtenerSeleccionados();
    var urlnext = 'PermisosDelOperador.aspx?operadorid=' + filasMarcadas;
    AvanzarPagina(GetUrlActual(), urlnext);
}


/// --- Formulario de equipos de operadores
function EquiposOperadores() {
    var URLNext = 'EquiposOperadores/';
    AvanzarPagina(GetUrlActual(), URLNext);
}

//// --- Formulario para asociar nivel a coordinadores
function Organizacion() {
    var filasmarcadas = ObtenerSeleccionados();
    var URLNext = 'Organizacion/ArbolOperadores?operadores=' + filasmarcadas;
    AvanzarPagina(GetUrlActual(), URLNext);
}


function ConjuntoDeOperadores() {
    var URLNext = 'ConjuntosDeOperadores.aspx';
    AvanzarPagina(GetUrlActual(), URLNext);
}

/// ---- Asginación de grupos a operadores
function Grupos() {
    var filasMarcadas = ObtenerSeleccionados();
    var URLNext = 'GruposDelOperador.aspx?operadorid=' + filasMarcadas;
    AvanzarPagina(GetUrlActual(), URLNext);
}


/// --- Asigncion de listas a operadores
function Listas() {
    var filasMarcadas = ObtenerSeleccionados();
    var URLNext = 'ListasDelOperador.aspx?operadorid=' + filasMarcadas;
    AvanzarPagina(GetUrlActual(), URLNext);
}


/// --- Resetear contraseña
function ResetearPassword() {
    const seleccionados = ObtenerSeleccionados();

    var params = 'idSolicitud=RESETEAR_PWD_OPERADOR&idSubsistema=1&idOperador=' + seleccionados + '&nuevaCont=NewPwdUser@1';
    $.ajax({
        type: 'POST',
        url: getRutaAbsolutaMVC() + '/SolicitudesBBDD.aspx',
        data: params,
        success: function (datos) {
            var respuesta = JSON.parse(datos);
            var correcto = respuesta.Resultado;
            var mensaje = respuesta.Mensaje;
            var mensajeDecodificadoCaracteresEspeciales = '';
            try {
                mensajeDecodificadoCaracteresEspeciales = reemplazarCaracteresEspeciales(mensaje);
            }
            catch (err) {
                mensajeDecodificadoCaracteresEspeciales = mensaje;
            }

            mensajeDecodificadoCaracteresEspeciales += '\n' + i18next.t("Operadores.resteContrasenaOk") +' ';
            MuestraMensajeDivPanel(correcto, mensajeDecodificadoCaracteresEspeciales);         
        },
        error: function () {
            alert(i18next.t("Operadores.errResetContrasena"));
        }
    });
}



function CloseAlert() {
    $('#alerta').css('display', 'none');
    if ($('#alerta').hasClass('alert-success')) {
        $('#alerta').removeClass('alert-success');
    }
    if ($('#alerta').hasClass('alert-danger')) {
        $('#alerta').removeClass('alert-danger');
    }
}


function ElimiminacionFilas(accion) {
    $('#accionBorrado').val(accion);
    let contenido = '';
    let titulo = ''


    if (accion == 'D') {
        contenido = '<p>' + i18next.t("Operadores.msgDesactivaAgentes")+'<p>';
        titulo = 'Desactivar operador';
    }
    else if (accion == 'E') {
        contenido = '<p>' + i18next.t('Operadores.msgEliminarAgentes') + '<p> ';
        titulo = 'Eliminar operador';
    }
    else if (accion == 'A') {
        contenido = '<p>' + i18next.t('Operadores.msgActivarAgentes') + ' <p>';
        titulo = 'Activar operador';
    }

    $('#miModalTitle').text(titulo);
    $('#miModalHeader').removeClass('modal-header-danger');
    $('#miModalHeader').addClass('modal-header-info');
    $('#miModalBody').html(contenido);
    $('#miModal').modal('show');
}



function MiModalAceptar() {
    $('#miModal').modal('toggle');
    const accion = $('#accionBorrado').val();
    var filasMarcadas = ObtenerSeleccionados();

    var params = 'idSolicitud=ELIMINAR_ACTIVAR_OPERADORES&idOperadores=' + filasMarcadas + '&accion=' + accion;

    $.ajax({
        type: 'POST',
        url: getRutaAbsolutaMVC() + '/SolicitudesBBDD.aspx',
        data: params,
        success: function (datos) {
            var respuesta = JSON.parse(datos);
            var correcto = respuesta.Resultado;
            var mensaje = respuesta.Mensaje;
            var mensajeDecodificadoCaracteresEspeciales = '';
            try {
                mensajeDecodificadoCaracteresEspeciales = reemplazarCaracteresEspeciales(mensaje);
            }
            catch (err) {
                mensajeDecodificadoCaracteresEspeciales = mensaje;
            }

            MuestraMensajeDivPanel(correcto, mensajeDecodificadoCaracteresEspeciales);
            if (correcto === '1') {
                if (accion === 'E') {
                    EliminaFilasMarcadas(filasMarcadas);
                }
                else if (accion === 'D' || accion === 'A') {
                    ActivaDesactivaFilas(accion, filasMarcadas);
                }
            }
            
        },
        error: function () {
            alert(i18next.t('Operadores.msgErrorConexionRest'));
        }
    });
}


/// ----------------------------------------------------------
/// Muestra el panel de alera con el mensaje
/// ----------------------------------------------------------
function MuestraMensajeDivPanel(correcto, mensaje) {
    $('#alert-mensaje').html(mensaje);
    if (correcto === '1') {
        $('#alerta').addClass('alert-success');

        // Muestro el panel de alert como existo
        $('#alerta').css('display', 'block');

    }
    else {
        if (correcto == '0' || correcto == '2') {
            $('#alerta').addClass('alert-danger');

            // Muestro el panel de alert como existo
            $('#alerta').css('display', 'block');
        }
    }

    setTimeout(function () { $('#alerta').css('display', 'none'); }, 6000);
}


/// ------------------------------------------------------
/// Elimina de la tabla de operadores todas las filas que 
/// hayan sido marcadas
/// ------------------------------------------------------
function EliminaFilasMarcadas(filas) {
    // paso los datos a array
    var arrFilas = filas.split(',');
    // leo el array y voy eliminando
    for (i = 0; i < arrFilas.length; i++) {
        let id = arrFilas[i];
        // le añado el prefijo de la fila tr_
        id = 'tr_' + id;
        // La elimino
        tableop.rows('#' + id).remove().draw();
    }

    VaciarIdsSeleccionados();
}


function ActivaDesactivaFilas(accion, filasMarcadas)
{
    // paso los datos a array
    var arrFilas = filasMarcadas.split(',');
    // leo el array y voy eliminando
    for (i = 0; i < arrFilas.length; i++) {
        let id = arrFilas[i];

        if (accion === 'A') {
            $('#SPAN_' + id).text(' A ');
            $('#SPAN_' + id).removeClass('caja-estado-inactivo');
            $('#SPAN_' + id).addClass('caja-estado-activo');
            // le añado el prefijo de la fila tr_
            $('#tr_' + id).removeClass('opInactivo');
            $('#tr_' + id).addClass('opActivo');

        }
        else if (accion === 'D') {
            $('#SPAN_' + id).text(' I ');
            $('#SPAN_' + id).removeClass('caja-estado-activo');
            $('#SPAN_' + id).addClass('caja-estado-inactivo');
            // le añado el prefijo de la fila tr_
            $('#tr_' + id).removeClass('opActivo');
            $('#tr_' + id).addClass('opInactivo');
        }

        // Desmarco los checks
        const element = document.getElementById('chk_' + id);
        if (element) {
            if (element.checked) {
                element.checked = false;
            }
        }
    }

    VaciarIdsSeleccionados();

    tableop.draw();
}