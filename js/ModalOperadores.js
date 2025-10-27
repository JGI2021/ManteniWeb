
/// constantes 
const AUX_tipoAsesor = 'tablatipoAsesor';
const AUX_motivoContrato = 'tablamotivoContrato';
const AUX_objetoContrato = 'tablaobjetoContrato';

const cte_days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const cte_months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

var g_pulsadoAltaVacaciones = false;


function ElimiminacionFilas() {

    let contenido = '';
    let titulo = ''

    if ($('#estadoOp').text() === 'INACTIVO') {
        accion = 'A'
    }
    else if ($('#estadoOp').text() === 'ACTIVO') {
        accion = 'D';
    }

    $('#accionBorrado').val(accion);
    //
    $('#tipoModal').val('desactivarOp');

    if (accion == 'D') {
        contenido = '<p>' + i18next.t("Operadores.msgDesactivaAgentes") + ' <p>';
        titulo = 'Desactivar operador';
    }
    else if (accion == 'E') {
        contenido = '<p>' + i18next.t("Operadores.msgEliminarAgentes") + '<p> ';
        titulo = 'Eliminar operador';
    }
    else if (accion == 'A') {
        contenido = '<p>' + i18next.t("Operadores.msgActivarOperador") + ' <p>';
        titulo = 'Activar operador';
    }

    $('#miModalTitle').text(titulo);
    $('#miModalHeader').removeClass('modal-header-danger');
    $('#miModalHeader').addClass('modal-header-info');
    $('#contenido-body').html(contenido);
    $('#miModal').modal('show');
}


function ResetearContrasena() {
    let contenido = '';
    let titulo = 'Resetear contraseña'
    $('#tipoModal').val('resetearContrasena');

    contenido = "<div class='row margen-izquierdo-15'> " +
        "  <div class='col-lg-10 col-md-10'> " +
        "    <label for='nuevaContrasena'>Nueva contraseña</label> " +
        "    <input type='password' class='form-control' id='nuevaContrasena' value='' />" +
        "    <i class='fa fa-eye-slash verPsswd' id='imgContrasena' onclick=\"MostrarOcultarPassword(this.id, 'nuevaContrasena')\"></i>" +
        "  </div> " +
        "</div> " +
        "<div class='row margen-izquierdo-15 rowSeparacion25'> " +
        "  <div class='col-lg-10 col-md-10'> " +
        "    <label for='confirmarContrasena'>Confirmar contraseña</label> " +
        "    <input type='password' class='form-control' id='confirmarContrasena' value='' />" +
        "    <i class='fa fa-eye-slash verPsswd' id='imgConfirmContrasena' onclick=\"MostrarOcultarPassword(this.id, 'confirmarContrasena')\"></i>" +
        "  </div>" +
        "</div> ";

    $('#miModalTitle').text(titulo);
    $('#miModalHeader').removeClass('modal-header-danger');
    $('#miModalHeader').addClass('modal-header-info');
    $('#contenido-body').html(contenido);
    $('#miModal').modal('show');
}


// Carga de mantenimiento de tablas auxiliares. Se leen los datos de las variables globales del sistema y los cambios deben actuaiarse sobre 
// el combo que corresponda
function EditartTablasAuxiliares(tablaAuxiliar) {
    let titulo = "";
    let arrDatos;
    $('#tipoModal').val(tablaAuxiliar);

    if (tablaAuxiliar === AUX_tipoAsesor) {
        titulo = i18next.t("Operadores.tipoDeAsesor");
        arrDatos = g_tiposAsesorEmpresas;
    }
    else if (tablaAuxiliar === AUX_motivoContrato) {
        titulo = "Motivo contrato";
        arrDatos = g_motivosContrato;
    }
    else if (tablaAuxiliar === AUX_objetoContrato) {
        titulo = "Objeto del contrato";
        arrDatos = g_objetosContratos;
    }

    let html =
        "<div style='display: flex;padding-left: 25px; padding-right: 25px;' > " +
        "  <input type = 'text' maxlength = '50' id='registroAuxiliar' class='form-control' /> " +
        "  <button type='button' id='alta-registro-btn' class='btn btn-default primary-text' onclick='AltaRegistroCampoAuxiliar()'> " +
        "      <span class='fa fa-plus'></span> " +
        "  </button> " +
        "  <button type='button' id='modifica-registro-btn' class='btn btn-default ' onclick='ModifRegisBtnPress()' style='display:none;'> " +
        "      <span class='fa fa-edit darkgreen-text'></span> " +
        "  </button> " +
        "  <button type='button' id='escape-btn' class='btn btn-default ' onclick='BtnEscapePulsado()' style='display:none;'> " +
        "      <span class='fa fa-close'></span> " +
        "  </button> " +

        "</div> ";
    html +=
        "<div class='rowSeparacion15' style='padding: 5px 25px;'> " +
        "<table id = '" + tablaAuxiliar + "' class='table table-striped table-hover' > " +
        "<thead><tr><th class='th'>Id</th><th class='th'>Nombre</th><th class='th' width='20%'>Acciones</th></tr></thead>";

    for (let i = 0; i < arrDatos.length; i++) {
        let dato = arrDatos[i];
        html +=
            "<tr id='tr-" + dato.id + "'>" +
            "  <td>" + dato.id + "</td>" +
            "  <td id='td-" + dato.id +"'>" + dato.nombre + "</td>" +
            "  <td> " +
            "     <span class='fa fa-edit  darkgreen-text' onclick='EditarRegistro(\"" + dato.id + "\",\"" + tablaAuxiliar + "\")'></span>" +
            "     <span class='fa fa-trash  red-text' onclick='EliminaRegistro(\"" + dato.id + "\",\"" + tablaAuxiliar + "\")'></span>" +
            "  </td > " +
            "</tr>";
    }
    html += "</table> </div>";

    $('#miModalTitle').text(titulo);
    $('#miModalHeader').removeClass('modal-header-danger');
    $('#miModalHeader').addClass('modal-header-info');
    $('#contenido-body').html(html);
    $('#miModal').modal('show');
}


//////
/// SE PULSA EL BOTON ACEPTAR DEL MODAL
/////
function MiModalAceptar() {
    const tipo = $('#tipoModal').val();

    if (tipo === 'desactivarOp') {
        ModalDesactivaActivar();
    }
    else if (tipo === 'resetearContrasena') {
        ModalResetearContrasena();
    }
    else if (tipo === AUX_tipoAsesor) {
        ModalActualizaDatosAuxiliares();
    }
    else if (tipo === AUX_motivoContrato) {
        ModalActualizaDatosAuxiliares();
    }
    else if (tipo === AUX_objetoContrato) {
        ModalActualizaDatosAuxiliares();
    }
    else if (tipo === 'altaVacaciones') {
        if (!g_pulsadoAltaVacaciones) {
            AltaVacacionesEnModal();
            g_pulsadoAltaVacaciones = false;
            $('#miModal').modal('hide');
            ModalActualizaVacacionesOperador();
        }
        else {
            $('#miModal').modal('toggle');
            ModalActualizaVacacionesOperador();
        }
    }
}

/////

function ModalDesactivaActivar() {
    $('#miModal').modal('toggle');
    let operadorid = $("#CodigoOperador").val();
    const accion = $('#accionBorrado').val();

    var params = 'idSolicitud=ELIMINAR_ACTIVAR_OPERADORES&idOperadores=' + operadorid + '&accion=' + accion;

    $.ajax({
        type: 'POST',
        url: getRutaAbsolutaMVC() + '/SolicitudesBBDD.aspx',
        data: params,
        success: function (datos) {
            let resp = {
                Error: "",
                Mensaje: ""
            };
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

            if (correcto === '1') {
                resp.Error = "N";
                if (accion === 'D' || accion === 'A') {
                    ActivaDesactivaTextOperador(accion);
                }
            }

            resp.Mensaje = mensajeDecodificadoCaracteresEspeciales;
            MostrarMensajeRespuesta(resp);
        },
        error: function () {
            alert(i18next.t("Operadores.msgErrorComunicacion"));
        }
    });
}


function ModalResetearContrasena() {

    let operadorid = $("#CodigoOperador").val();
    const nuevaContrasena = $('#nuevaContrasena').val();
    const confirmarContrasena = $('#confirmarContrasena').val();

    if (!ValidaContrasenaReseteo(nuevaContrasena, confirmarContrasena))
        return;

    var params = 'idSolicitud=RESETEAR_PWD_OPERADOR&idOperadores=' + operadorid + '&idSubsistema=1&idOperador=' + operadorid + '&nuevaCont=' + nuevaContrasena;

    $.ajax({
        type: 'POST',
        url: getRutaAbsolutaMVC() + '/SolicitudesBBDD.aspx',
        data: params,
        success: function (datos) {
            let resp = {
                Error: "N",
                Mensaje: ""
            };
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

            if (correcto === '0') {
                resp.Error = "S";
            }
            $('#miModal').modal('hide');
            resp.Mensaje = mensajeDecodificadoCaracteresEspeciales;
            MostrarMensajeRespuesta(resp);
        },
        error: function () {
            alert(i18next.t("Operadores.msgErrorComunicacion"));
        }
    });

}


function ModalActualizaDatosAuxiliares() {
    const tipoRegistro = $('#tipoModal').val();
    let arrDatos = GetArrayDeDatos(tipoRegistro);

    let params = "tipoRegistro=" + tipoRegistro + "&arrayDatos=" + JSON.stringify(arrDatos);

    $.ajax({
        type: "POST",
        url: getRutaAbsolutaMVC() + "/operadores/ActualizaRegistrosAuxiliares",
        data: params,
        success: function (data) {
            var resp = JSON.parse(data);

            /// HAY QUE MODIFICAR EL COMBO QUE CORRESPONDA con los valores y en el array vaciar el campo accion
            ActualizaSelectorAuxiliar(tipoRegistro);
            $('#miModal').modal('hide');
            MostrarMensajeRespuesta(resp);
        }
    });
}


function ModalActualizaVacacionesOperador() {    
    let operadorid = $("#CodigoOperador").val();
    const accion = $('#accionBorrado').val();

    var params = {
        'idOperador': operadorid, 'datosvacaciones': JSON.stringify(g_vacaciones)
    };

    $.ajax({
        type: 'POST',
        url: getRutaAbsolutaMVC() + '/Operadores/GuardaVacacionesOperador',
        data: params,
        success: function (datos) {
            let respuesta = JSON.parse(datos);
            $('#tipoModal').val('');

            if (respuesta.Error === "N")
                RellenaTablaVacaciones();
            else {
                const index = g_vacaciones.findIndex(v => v.EstadoRegistro === 'alta');
                if (index >= 0) {
                    g_vacaciones.splice(index, 1);
                }
            }

            // limpia g_vacaciones
            for (let i = 0; i < g_vacaciones.length; i++) {
                let vacacion = g_vacaciones[i];
                vacacion.EditarRegistro = 'none';
            }

            MostrarMensajeRespuesta(respuesta);

        },
        error: function () {
            alert(i18next.t("Operadores.msgErrorComunicacion"));
        }
    });
}



//// funciones auxiliares
function ActualizaSelectorAuxiliar(tipoRegistro) {
    let arrDatos = GetArrayDeDatos(tipoRegistro);

    let selector;
    if (tipoRegistro === AUX_tipoAsesor) {
        selector = 'tipoAsesorEmpresa';
    }
    else if (tipoRegistro === AUX_motivoContrato) {
        selector = 'motivoContrato'
    }
    else if (tipoRegistro === AUX_objetoContrato) {
        selector = 'objetoContrato';
    }

    let html = "";
    // recorro el array 
    let i = 0;
    while ( i < arrDatos.length) {
        let dato = arrDatos[i];
        if (dato.accion === 'A') {
            html = "<option value='" + dato.id + "'>" + dato.nombre + "</oprion>";
            $("#" + selector).append(html);
            arrDatos.accion = '';
        }
        else if (dato.accion === 'B') {
            $("#" + selector + " option[value='" + dato.id + "']").remove();
            // Elimino el registro del array
            arrDatos.splice(i, 1);
        }
        else if (dato.accion === 'M') {
            let nombreOld = $("#" + selector + " option[value='" + dato.id + "']").text();
            $("#" + selector + " option:contains('" + nombreOld + "')").text(dato.nombre);
            arrDatos.accion = '';
        }
        if (dato.accion !== 'B') {
            i++;
        }

    }
}

function AltaRegistroCampoAuxiliar() {
    const tipo = $('#tipoModal').val();
    const registro = $('#registroAuxiliar').val();

    if (registro.trim() === '') {
        return;
    }

    let arrDatos = GetArrayDeDatos(tipo);
    const maxId = GenerarIdMasAlto(tipo);

    let html = "<tr id='tr-" + maxId + "'>" +
        "  <td>" + maxId + "</td>" +
        "  <td id='td-" + maxId +"'>" + registro + "</td>" +
        "  <td>" +
        "     <span class='fa fa-edit  darkgreen-text' onclick='EditarRegistro(\"" + maxId + "\",\"" + tipo + "\")'></span>" +
        "     <span class='fa fa-trash  red-text' onclick='EliminaRegistro(\"" + maxId + "\",\"" + tipo + "\")'></span>" +
        "  </td> " + 
        "</tr>";

    $('#' + tipo).append(html);

    arrDatos.push(new DatoComunSelect(maxId, registro,'A'));  
    // vacio la entrada de datos
    $('#registroAuxiliar').val('');
}


function EliminaRegistro(idregistro, tipo) {    
    Swal.fire({
        title: 'Eliminar registro',
        text: "Se eliminará el registro seleccionado. ¿Desear continuar? !",
        icon: 'warning',
        heightAuto: false,
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Eliminado'
            );
            let arrDatos = GetArrayDeDatos(tipo);
            let idInt = parseInt(idregistro);
            let dato = arrDatos.find(rg => rg.id === idInt);
            if (dato) {
                dato.accion = 'B';
            }
            $('#tr-' + idregistro).remove();            
        }
    });

}

function EditarRegistro(idregistro, tipoRegistro) {
    localStorage.setItem("idRegistro", idregistro);
    localStorage.setItem("tipoArray", tipoRegistro);
    $("#alta-registro-btn").css("display", "none");
    $("#modifica-registro-btn").css("display", "block");
    $("#escape-btn").css("display", "block");

    let intId = parseInt(idregistro);
    let arrDatos = GetArrayDeDatos(tipoRegistro);
    let dato = arrDatos.find(rg => rg.id === intId);
    let nombre = "";
    if (dato) {
        nombre = dato.nombre; 
    }
    $("#registroAuxiliar").val(nombre);
}


function ModifRegisBtnPress() {
    let idregistro = localStorage.getItem("idRegistro");
    let tipoArray = localStorage.getItem("tipoArray");
    let nombre = $("#registroAuxiliar").val();
    $("#td-" + idregistro).html('');
    $("#td-" + idregistro).html(nombre);

    let intId = parseInt(idregistro);
    let arrDatos = GetArrayDeDatos(tipoArray);
    let dato = arrDatos.find(rg => rg.id === intId);
    if (dato) {
        dato.nombre = nombre
        dato.accion = "M";
    }

    $('#registroAuxiliar').val('');
    localStorage.removeItem("idRegistro");
    localStorage.removeItem("tipoArray");
    $("#alta-registro-btn").css("display", "block");
    $("#modifica-registro-btn").css("display", "none");
    $("#escape-btn").css("display", "none");
}


function BtnEscapePulsado() {
    $("#alta-registro-btn").css("display", "block");
    $("#modifica-registro-btn").css("display", "none");
    $("#escape-btn").css("display", "none");
    $("#registroAuxiliar").val('');
}


function GenerarIdMasAlto(tipo) {
    let arrDatos = GetArrayDeDatos(tipo);

    var maxValor = 0;
    for (let i = 0; i < arrDatos.length; i++) {
        const dato = arrDatos[i];
        if (dato.id > maxValor) {
            maxValor = dato.id;
        }
    }

    return maxValor + 1;
}


function GetArrayDeDatos(tipo) {
    let arrDatos;
    if (tipo === AUX_tipoAsesor) {
        arrDatos = g_tiposAsesorEmpresas;
    }
    else if (tipo === AUX_motivoContrato) {
        arrDatos = g_motivosContrato;
    }
    else if (tipo === AUX_objetoContrato) {
        arrDatos = g_objetosContratos;
    }

    return arrDatos;
}


//// Periodos de vacaciones
function AltaPeriodoVacaciones() {
    let titulo = "Alta periodo de vacaciones";
    $('#tipoModal').val('altaVacaciones');

    let html =
        "<div class='row' style='padding-left: 25px; padding-right: 25px;' > " +
        "   <div class='col-lg-5 col-md-5'> " +
        "     <label for='vac-fecha-desde'>Fecha desde</label> " +
        "     <input type='date' id='vac-fecha-desde' class='form-control' /> " +
        "   </div> " +
        "   <div class='col-lg-5 col-md-5'> " +
        "     <label for=' id='vac-fecha-hasta'>Fecha hasta</label> " +
        "     <input type='date'  id='vac-fecha-hasta' class='form-control' /> " +
        "   </div> " +
        "   <div class='col-lg-2 col-md-2'> " +
        "     <button type='button' id='alta-vacaciones-btn' class='btn btn-primary btn-top-25' onclick='AltaVacacionesEnModal()'> " +
        "      <span class='fa fa-plus'></span> " +
        "     </button> " +
        "   </div> " +
        "</div> " +
        "<div class='row rowSeparacion15' style='padding-left: 25px; padding-right: 25px;' > " +
        "   <div class='col-lg-10 col-md-10'> " +
        "     <label for=' id='vac-observaciones'>Observaciones</label> " +
        "     <input type='text'  id='vac-observaciones' class='form-control' maxlength='150'/> " +
        "   </div> " +
        "</div> " +
        "<div class='row rowSeparacion10' style='padding-left: 40px; padding-right: 25px;font-size:12px;'> " +
        "      <input type='checkbox' id='chkSinServicio' /> " +
        "      <label for='chkSinServicio'>Incluir días sin servicio</label> " +
        "</div> " +
        "<div class='row rowSeparacion15 panel-dias-especiales'  > " +
        "   <div class='col-lg-10 col-md-10' id='contenidoVacaciones'> " +
        "   </div> " +
        "</div> ";
        
    $('#miModalTitle').text(titulo);
    $('#miModalHeader').removeClass('modal-header-danger');
    $('#miModalHeader').addClass('modal-header-info');
    $('#contenido-body').html(html);
    $('#miModal').modal('show');
}


function AltaVacacionesEnModal() {

    g_pulsadoAltaVacaciones = true;
    let fechadesde = $('#vac-fecha-desde').val();
    let fechahasta = $('#vac-fecha-hasta').val();
    if (fechadesde && fechahasta) {
        if (fechadesde > fechahasta) {
            alert(i18next.t("Operadores.fechaMayorQue"));
            return;
        }
    }
    else {
        alert(i18next.t("Operadores.seleccionarPeriodoFecha"));
        return;
    }

    let html = "";
    let dtDesde = new Date(fechadesde);
    let dtHasta = new Date(fechahasta);
    let contador = 0;
    const observ = $('#vac-observaciones').val();
    let vacacion = {
        'IdVacacion': 0, 'Observaciones': observ,
        'Desde': null, 'Hasta': null, 'Dias': new Array(),
        'EstadoRegistro': 'alta'
    };

    
    $('#contenidoVacaciones').html('');

    while (dtDesde <= dtHasta) {
        const iDia = dtDesde.getDay();
        html = "<div class='panel my-panel-default' id='pnl-" + contador + "'> " +
            "   <div class='my-panel-body'> " + cte_days[iDia] + " " + convertDate(dtDesde) +
            "     <span class='fa fa-trash red-text pointer_cursor dia-vacaciones-trash' onclick='EliminaDiaVacaciones(" + contador + ")'></span>"
            "    </div> " +
            "</div>";

        const chkSinServicio = document.getElementById("chkSinServicio");
        let esDiaSinServicio = g_DiasSinServicio.includes(iDia);
        if (chkSinServicio.checked === true) {
            esDiaSinServicio = false;
        }

        if (!esDiaSinServicio) {
            const fecha = new Date(dtDesde);
            vacacion.Dias.push(fecha);
            if (vacacion.Desde === null) {
                vacacion.Desde = convertDate(fecha);
            }
            vacacion.Hasta = convertDate(fecha);
            $('#contenidoVacaciones').append(html);
        }
        dtDesde.setDate(dtDesde.getDate() + 1);
        contador++;
    }
    // Doy de alta el nuevo registro
    g_vacaciones.push(vacacion);  
}


function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), cte_months[d.getMonth()], d.getFullYear()].join('-')
}

function EliminaPeriodoVacaciones(id) {

    Swal.fire({
        title: 'Eliminar Vacaciones',
        text: "Se eliminará el periodo de vacaciones seleccionado. ¿Desear continuar? !",
        icon: 'warning',
        heightAuto: false,
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            //Swal.fire(
            //    'Eliminado'
            //);
            let vac = g_vacaciones.find(v => v.IdVacacion === id);
            if (vac) {
                vac.EstadoRegistro = 'baja';
                $('#vc-' + id).remove();
                ModalActualizaVacacionesOperador();
                const index = g_vacaciones.findIndex(v => v.IdVacacion === id);
                if (index >= 0) {
                    g_vacaciones.splice(index, 1);
                }
            }
        }
    });
}

function EditaPeriodoVacaciones(id) {
    alert("Vacatios Id " + id);
}

function EliminaDiaVacaciones(id) {
    const vc = g_vacaciones.find(v => v.IdVacacion === 0);
    if (vc) {
        vc.Dias.splice(id, 1);
        $('#pnl-' + id).remove();
    }
}
