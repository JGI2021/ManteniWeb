
//$('#bCambiarPwd').val('false');

//$('#abrirFicha').click(function () {
//    var URLActual = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
//    AvanzarPagina(URLActual, 'Operador.aspx?id=3');
//});
function ResetearPwdUser() {
    $('BotonResetearPwd').modal({ backdrop: 'static' });
    $('BotonResetearPwd').modal('show');
}

function CambiarPwd() {
    $('#ErrorContrasena').removeClass('alert-success');
    $('#ErrorContrasena').addClass('alert-danger');
    $('#ErrorContrasena').css('display', 'none');
    $('#ErrorContrasena').css('visibility', 'hide');
    $('#ErrorContrasena').text('');
    $('#ContrasenaAnterior').val('');
    $('#NuevaContrasenaX').val('');
    $('#ConfirmarContrasenaX').val('');
    $('#BotonCambiarPwd').modal({ backdrop: 'static' });
    $('#BotonCambiarPwd').modal('show');
}

function ActualizarDatosUsuario() {
    var params = 'idSolicitud=ACTUALIZAR_DATOS_SESION_USUARIO';
    $.ajax({
        type: "POST",
        url: getPathSolicitudesBBDD(),
        data: JSON.stringify(params),
        contentType: "'application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
            var respuesta = JSON.parse(data.responseText);
            var correcto = respuesta.Resultado;
            var mensaje = respuesta.Mensaje;
            var mensajeDecodificado = '';
            var mensajeDecodificadoCaracteresEspeciales = '';
            try {
                mensajeDecodificado = utf8_decode(mensaje);
            }
            catch (err) {
                mensajeDecodificado = mensaje;
            }
            try {
                mensajeDecodificadoCaracteresEspeciales = reemplazarCaracteresEspeciales(mensaje);
            }
            catch (err) {
                mensajeDecodificadoCaracteresEspeciales = mensaje;
            }
            if (correcto === '1') {
                return;
            }
            
        }
    });
}

function ActualizarDatosUsuario() {
    var peticion = new XMLHttpRequest();
    var sendStr = 'idSolicitud=ACTUALIZAR_DATOS_SESION_USUARIO';
    var url = getPathSolicitudesBBDD();
    peticion.open('POST', url, true);
    peticion.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    peticion.CharSet = 'UTF-8';
    peticion.onreadystatechange = function () {
        if (peticion.readyState === 4 && peticion.status === 200) {
            var respuesta = JSON.parse(peticion.responseText);
            var correcto = respuesta.Resultado;
            var mensaje = respuesta.Mensaje;
            var mensajeDecodificado = '';
            var mensajeDecodificadoCaracteresEspeciales = '';
            try {
                mensajeDecodificado = utf8_decode(mensaje);
            }
            catch (err) {
                mensajeDecodificado = mensaje;
            }
            try {
                mensajeDecodificadoCaracteresEspeciales = reemplazarCaracteresEspeciales(mensaje);
            }
            catch (err) {
                mensajeDecodificadoCaracteresEspeciales = mensaje;
            }
            if (correcto === '1') {
                return;
            }
        }
    }
    peticion.send(sendStr);
}
function AceptaCambiarPwd() {
    var fallo = 'false';
    var anterior = $('#ContrasenaAnterior').val();
    var nueva = $('#NuevaContrasenaX').val();
    var confirmada = $('ConfirmarContrasenaX').val();
    if (fallo === 'false' && nueva === '') {
        $('#ErrorContrasena').text('Tiene que indicar la nueva contraseña');
        $('#ErrorContrasena').css('display', 'block');
        $('#ErrorContrasena').css('visibility', 'visible');
        $('#ErrorContrasena').removeClass('alert-success');
        $('#ErrorContrasena').addClass('alert-danger');
        fallo = 'true';
    }
    if (fallo === 'false' && confirmada === '') {
        $('#ErrorContrasena').text('Tiene que indicar la confirmación de la nueva contraeña');
        $('#ErrorContrasena').css('visibility', 'visible');
        $('#ErrorContrasena').css('display', 'block');
        $('#ErrorContrasena').removeClass('alert-success');
        $('#ErrorContrasena').addClass('alert-danger');
        fallo = 'true';
    }
    if (fallo === 'false' && nueva !== confirmada) {
        $('#ErrorContrasena').text('La contraseña nueva y la confirmación no coinciden');
        $('#ErrorContrasena').css('visibility', 'visible');
        $('#ErrorContrasena').css('display', 'block');
        $('#ErrorContrasena').removeClass('alert-success');
        $('#ErrorContrasena').addClass('alert-danger');
        fallo = 'true';
    }
    if (fallo === 'false') {
        var peticion = new XMLHttpRequest();
        var sendStr = 'idSolicitud=CAMBIO_PASSWORD_USUARIO&PwdAnterior=' + anterior + '&PwdNuevo=' + nueva;
        var url = getPathSolicitudesBBDD();
        peticion.open('POST', url, true);
        peticion.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        peticion.CharSet = 'UTF-8';
        peticion.onreadystatechange = function () {
            if (peticion.readyState === 4 && peticion.status === 200) {
                var respuesta = JSON.parse(peticion.responseText);
                var correcto = respuesta.Resultado;
                var mensaje = respuesta.Mensaje;
                var mensajeDecodificado = '';
                var mensajeDecodificadoCaracteresEspeciales = '';
                try {
                    mensajeDecodificado = utf8_decode(mensaje);
                }
                catch (err) {
                    mensajeDecodificado = mensaje;
                }
                try {
                    mensajeDecodificadoCaracteresEspeciales = reemplazarCaracteresEspeciales(mensaje);
                }
                catch (err) {
                    mensajeDecodificadoCaracteresEspeciales = mensaje;
                }
                if (correcto === '1') {
                    $('#ErrorContrasena').removeClass('alert-danger');
                    $('#ErrorContrasena').addClass('alert-success');
                    $('#ErrorContrasena').css('visibility', 'visible');
                    $('#ErrorContrasena').css('display', 'block');
                    $('#ErrorContrasena').text(mensajeDecodificadoCaracteresEspeciales);
                    return;
                }
                else {
                    $('#ErrorContrasena').removeClass('alert-success');
                    $('#ErrorContrasena').addClass('alert-danger');
                    $('#ErrorContrasena').css('visibility', 'visible');
                    $('#ErrorContrasena').css('display', 'block');
                    $('#ErrorContrasena').text(mensajeDecodificadoCaracteresEspeciales);
                }
            }
        }
        peticion.send(sendStr);
    }
}

function aceptadoManterse() {
    $('#ModalSalirSinGuardar').modal('hide');
}



function Descartar() {

    RetrocederPagina();
    
    //var tieneCambiosx = ComprobarCambios();
    //if (tieneCambiosx === 'true') {
        //$('#ModalSalirSinGuardar').modal({ backdrop: 'static' });
        //$('#ModalSalirSinGuardar').modal('show');
    //}
    //else {
        //var peticion = new XMLHttpRequest();
        //var sendStr = 'idSolicitud=RETROCEDER_PAGINA';
        //var url = getPathNavegacion();
        //peticion.open('POST', url, true);
        //peticion.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //peticion.onreadystatechange = function () {
            //if (peticion.readyState === 4 && peticion.status === 200) {
                //var responseText = decodeURIComponent(peticion.responseText);
                //var respuesta = JSON.parse(responseText);
                //var correcto = respuesta.Resultado;
                //if (correcto === '1') {
                    //var URL = respuesta.Mensaje;
                    //if (URL === '' || URL.toUpperCase() === 'PRINCIPAL.ASPX') {
                        //window.location = 'CAMPANA.ASPX?ID=5';
                    //}
                    //else
                        //window.location = URL;
                //}
            //}
        //}
        //peticion.send(sendStr);
    //}

}

function ComprobarCambios() {
    var ValorCampoxForm = '';
    var listaDeCampos = ';';

    if ($('#tieneCambios').length)
        $('#tieneCambios').val('false');

    if ($('#listaCampos').length)
        listaDeCampos = $('#listaCampos').val();

    var arrayCampos = listaDeCampos.split(';').filter(function (el) { return el.length !== 0 });
    for (x = 0; x <= arrayCampos.length; x++) {
        var arrayCampo = arrayCampos[x].split(':');
        var Tipo = 'Normal';
        var NombreCampox = arrayCampo[0];
        var arrayCampoTipo = NombreCampox.split('&');
        if (arrayCampoTipo.length > 1) {
            Tipo = arrayCampoTipo[0];
            NombreCampox = arrayCampoTipo[1];
        }
        var ValorCampox = arrayCampo[1];
        if (NombreCampox === 'FORMEDITABLE') {
            if (ValorCampox === 'FALSE') {
                $('#tieneCambios').val('false');
                break;
            }
            continue;
        }

        var CampoXForm = document.getElementById(NombreCampox);
        if (NombreCampox.indexOf('ListaAnyadidos_') > -1) {
            if (CampoXForm === null) {
                if (ValorCampox === 'TRUE') {
                    $('#tieneCambios').val('true');
                }
            }
            else {
                ValorCampoxForm = document.getElementById(NombreCampox).value;
                if (ValorCampoxForm !== '') {
                    $('#tieneCambios').val('true');
                }
                else if (ValorCampox === 'TRUE') {
                    $('#tieneCambios').val('true');
                }
            }
            continue;
        }
        else if (CampoXForm === null) {
            $('#tieneCambios').val('true');
            continue;
        }
        else {
            ValorCampoxForm = $('#' + NombreCampox).val();
            if (Tipo === 'EditorHTML') {
                continue;
            }
            if (ValorCampox !== ValorCampoxForm) {
                if (ValorCampoxForm === '' && (ValorCampox === 'NULL')) {
                    continue;
                }
                else if (CampoXForm.style.visibility === 'hidden') {
                    continue;
                }
                else if (Tipo === 'horario_especial') {
                    var ValoresSplitCampoxForm = ValorCampoxForm.split(':');
                    var valorCampo = ValoresSplitCampoxForm[0] + ValoresSplitCampoxForm[1];
                    if (valorCampo !== ValorCampox)
                        $('#tieneCambios').val('true');
                    continue;
                }
                else if (Tipo === 'chck') {
                    var checkeado = document.getElementById(NombreCampox).checked;
                    var ValorCampoxtrue = (ValorCampox === 'true' || ValorCampox === '1');
                    if ((ValorCampoxtrue && !checkeado) || (!ValorCampoxtrue && checkeado)) {
                        $('#tieneCambios').val('true');
                    }
                    continue;
                }
                else if (Tipo === 'dttime') {
                    if (ValorCampox === '1' && (ValorCampoxForm === 'on')) {
                    }
                    else if (ValorCampox === '0' && (ValorCampoxForm === 'off' || ValorCampoxForm === '')) {
                    }
                    else {
                        $('#tieneCambios').val('true');
                    }
                    continue;
                }
                else if (Tipo === 'dttime2Dias') {
                    if (ValorCampox === '1' && (ValorCampoxForm === 'on')) {
                    }
                    else if (ValorCampox === '0' && (ValorCampoxForm === 'off' || ValorCampoxForm === '')) {
                    }
                    else {
                        $('#tieneCambios').val('true');
                    }
                    continue;
                }
                else if (Tipo === 'rgb') {
                    var ValorCampoxForm2 = ValorCampoxForm.replace(/\s+/g, '');
                    if (ValorCampox !== ValorCampoxForm2) {
                        $('#tieneCambios').val('true');
                    }
                    continue;
                }
                else {
                    ValorCampoxForm = ValorCampoxForm.replace(/'/g, " ");
                    ValorCampoxForm = ValorCampoxForm.replace(/:/g, " ");
                    ValorCampoxForm = ValorCampoxForm.replace(/;/g, " ");
                    if (ValorCampox !== ValorCampoxForm)
                        $('#tieneCambios').val('true');
                    continue;
                }
            }
        }
    }
    return $('#tieneCambios').val();
}



function mantenerPagina(URLActual) {
    window.location =  URLActual;
}




function AvanzarPagina(URLCaminoParam, URLNextParam) {
    AvanzarPaginaAjax(URLCaminoParam, URLNextParam);
}


function getRutaAbsoluta() {
    var loc = window.location;
    var href = loc.href.trim();
    if (href[href.length - 1] === '#')
        href = href.substring(0, href.length - 1);
    var pathName = loc.pathname;
    pathName = pathName.substring(1, pathName.length - 1);

    pathName = pathName.substring(0, pathName.indexOf("/"));
    href = window.location.protocol + "//" + window.location.host + "/" + pathName;
    return href;
}

function AvanzarPaginaAjax(URLCaminoParam, URLNextParam)
{
    var URLCaminoEncode = encodeURIComponent(URLCaminoParam);
    var URLNextEncode = encodeURIComponent(URLNextParam);
    var buscar = '';

    if ($('#buscar').length) {
        buscar = $('#buscar').text();
    }

    console.log(getRutaAbsoluta());
    var params = 'idSolicitud=AVANZAR_PAGINA&URLCamino=' + URLCaminoEncode + '&URLNext=' + URLNextEncode + '&buscar=' + buscar;
    $.ajax({
        type: 'POST',
        url: getRutaAbsoluta() + '/Navegacion.aspx',
        data: params,
        success: function (dato) {
            var respuesta = window.JSON.parse(dato);
            var correcto = respuesta.Resultado;
            if (correcto === '1') {
                var URL = respuesta.Mensaje;
                if (URL === '' || URL.toUpperCase() === 'PRINCIPAL.ASPX') {
                    parent.location.href = getRutaAbsoluta() + '/Principal.aspx';
                }
                else {                    
                    window.location = getRutaAbsoluta() + '/' + URL; 
                }
            }
        }
    });
}



function RetrocederPagina() {
    var params = 'idSolicitud=RETROCEDER_PAGINA';
    $.ajax({
        type: 'POST',
        url: getPathNavegacion(),
        data: params,
        success: function (datos) {
            var respuesta = JSON.parse(datos);
            var correcto = respuesta.Resultado;
            if (correcto === '1') {
                var URL = respuesta.Mensaje;
                if (URL === '' || URL.toUpperCase() === 'PRINCIPAL.ASPX') {
                    parent.location.href = 'Principal.aspx';
                }
                else
                    window.location = URL;
            }
        }
    });


}


function aceptaFavorito() {
    var valor = $('#favorito').val();
    if (valor === '') {
        $('#MensajeErrorNuevoFavorito').css('visibility', 'visible');
        $('#MensajeErrorNuevoFavorito').css('display', 'block');
        $('#MensajeErrorNuevoFavorito').text('Tiene que indicar un nombre');
    }
    else {
        $('#fvtoAnadir').val('true');
        document.forms[0].submit()
    }
}



function HacerSubmitAceptar() {
        $('#botonAceptarF').val('true');
        $('#salir').val('false');
        $('#BbotonAceptarF').attr('disabled', true);
        $('#BbotonAceptarYSalir').attr('disabled', true);
        $('#formASP').submit();
 }

function HacerSubmitAceptarYSalir() {
    $('#botonAceptarYSalir').val('true');
    $('#salir').val('true');
    $('#BbotonAceptarF').attr('disabled', true);
    $('#BbotonAceptarYSalir').attr('disabled', true);
    $('#formASP').submit();
}


$(document).ready(function () {

    //$('#Boton_Cerrar_ModalMensajePagina').click(function () {
    //    $('#ModalMensajePagina').modal('hide');
    //});

    $('#Boton_Cerrar_ModalMensajeExitoPagina').click(function () {
        $('#ModalMensajeExitoPagina').modal('hide');
    });

    //$('#Boton_Cerrar_ModalMensajeInfoPagina').click(function () {
    //    $('#ModalMensajeInfoPagina').modal('hide');
    //});

    $('#Boton_Cerrar_ModalMensajeErrorPaginaYVolver').click(function () {
        RetrocederPagina();
    });

    $('#Boton_Cerrar_ModalMensajeExitoPaginaYVolver').click(function () {
        RetrocederPagina();
    });


    $('#Boton_Cerrar_ModalMensajeErrorPaginaYRecargar').click(function () {
        mantenerPagina('CargaFicheroCampana.aspx?idcampanas=5');
    });


    //$('#Boton_Cerrar_ModalResultadoMensajeConFuncionCerrar').click(function () {
    //    FCerrar_ModalResultadoMensajeConFuncionCerrar();
    //});


    //$('#Boton_Cerrar_ModalMensajeExitoPaginaYRecargar').click(function () {
    //    mantenerPagina('CargaFicheroCampana.aspx?idcampanas=5');
    //});

    $('#Boton_Cerrar_ModalAccionMensaje').click(function () {
        FCerrar_ModalAccionMensaje();
    });
    $('#Boton_Aceptar_ModalAccionMensaje').click(function () {
        FAceptar_ModalAccionMensaje();
    });

    $('#Boton_Cerrar_ModalAccionMensajeSinFuncionCerrar').click(function () {
        $('#ModalAccionMensajeSinFuncionCerrar').modal('hide');
    });
    $('#Boton_Aceptar_ModalAccionMensajeSinFuncionCerrar').click(function () {
        FAceptar_ModalAccionMensajeSinFuncionCerrar();
    });

//    $('[data-toggle="tooltip"]').tooltip();
    //$(parent.window.document).contents().find('#bolita').hide();
    //$(parent.window.document).contents().find('#bolita').removeClass("menu-active");
    //$(parent.window.document).contents().find('.cbp-spmenu').removeClass("menu-open");
    //$('#clickMenu').click(function () {
    //    $(parent.window.document).contents().find('#bolita').click();
    //});
    //$('#clickMenu2').click(function () {
    //    if (window.location.pathname != '/MenuPrincipal.aspx')
    //        $(parent.window.document).contents().find('#bolita').click();
    //});
    //$('#ToPrincipalWindow').click(function () {
    //    window.location = 'Principal.aspx';
    //});

    $('#favOff').click(function () {
        $('#miModalFav').modal({ backdrop: 'static' });
        $('#miModalFav').modal('show');
        $('#MensajeErrorNuevoFavorito').css('visibility', 'hidden');
        $('#MensajeErrorNuevoFavorito').css('display', 'none');
        $('#MensajeErrorNuevoFavorito').text('Tiene que indicar un nombre');
    });


    var warn_on_unloadReal = '';
    $('input:text,input:checkbox,input:radio,textarea,select').one('change', function () {
        $('#tieneCambios').val('true');
    });

    $('#Boton_bCerrarCambioPwd').click(function () {
        $('#BotonCambiarPwd').modal('hide');
    });
    $('#Boton_bCambiarPwd').click(function () {
        AceptaCambiarPwd();
    });

    if ($('#listaAcciones').length) {
        var listItems = $('#listaAcciones').children();
        if (listItems.length === 0) {
            $('#ContenidoListaAcciones').css({ 'visibility': 'hidden' });
            $('#ContenidoListaAcciones').remove();
        }
    }

});
