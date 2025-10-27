
let fechaIniDatePicker = null;

function FilaGrupoNoExiste(IdGrupo, NombreGrupo) { 
    let html = '';

    let fontW = "style='font-weight:400'";

    if (NombreGrupo === 'Total')
        fontW = "style='font-weight:600'";


    html += "<tr id='FilaGrupo_" + IdGrupo + "' style='cursor:pointer;'> ";

    html += "<td class='visible-xs visible-sm visible-md'>";
    html += "</td>";

    html += "<td style='display:table-cell'>";
    html += "  <label id='Grupo_" + IdGrupo + "' " + fontW + " >";
    html += "  " + NombreGrupo;
    html += "  </label>";
    html += "</td>";

    html += "<td style='display:table-cell'>";
    html += "  <label id='Total_" + IdGrupo + "' " + fontW + " >";
    html += "  </label>";
    html += "  <a href='#' role='button' data-toggle='tooltip' data-placement='bottom' class='BotonFila' title='Ver mensajes' style='float:right;visibility:hidden;' onclick=\"AvanzaPaginaOperadorGrupo('', '" + IdGrupo + "','T')\"><span class='fa fa-search ratonEncima' aria-hidden='true'></span></a>";
    html += "</td>";

    html += "<td style='display:table-cell'>";
    html += "  <label id='NoAsignados_" + IdGrupo + "' " + fontW + " class='noAsignado'> ";
    html += "  </label>";
    html += "  <a href='#' role='button' data-toggle='tooltip' data-placement='bottom' class='BotonFila' title='Ver mensajes' style='float:right;visibility:hidden;'  onclick =\"AvanzaPaginaOperadorGrupo('0', '" + IdGrupo + "','N')\"><span class='fa fa-search ratonEncima' aria-hidden='true'></span></a>";
    html += "</td>";

    html += "<td style='display:table-cell'>";
    html += "  <label id='Asignados_" + IdGrupo + "' " + fontW + "  class='atendido'> ";
    html += "  </label>";
    html += "  <a href='#' role='button' data-toggle='tooltip' data-placement='bottom' class='BotonFila' title='Ver mensajes' style='float:right;visibility:hidden;'  onclick =\"AvanzaPaginaOperadorGrupo('ASIGN', '" + IdGrupo + "','A')\"><span class='fa fa-search ratonEncima' aria-hidden='true'></span></a>";
    html += "</td>";    
     
    html += "<td style='display:table-cell'>";
    html += "  <label id='Aparcados_" + IdGrupo + "' " + fontW + "  class='aparcado'>";
    html += "  </label>";
    html += "  <a href='#' role='button' data-toggle='tooltip' data-placement='bottom' class='BotonFila' title='Ver mensajes' style='float:right;visibility:hidden;'  onclick =\"AvanzaPaginaOperadorGrupo('', '" + IdGrupo + "', 'P')\"><span class='fa fa-search ratonEncima' aria-hidden='true'></span></a>";
    html += "</td>";

    html += "<td style='display:table-cell'>";
    html += "  <label id='Finalizados_" + IdGrupo + "' " + fontW + " class='finalizado'>";
    html += "  </label>";
    html += "  <a href='#' role='button' data-toggle='tooltip' data-placement='bottom' class='BotonFila' title='Ver mensajes' style='float:right;visibility:hidden;'  onclick =\"AvanzaPaginaOperadorGrupo('', '" + IdGrupo + "', 'F')\"><span class='fa fa-search ratonEncima' aria-hidden='true'></span></a>";
    html += "</td>";
    
    html += "</tr>";
    
    return html;
}


function Refrescar(esCambioCanal) {
    const idOperadorCombo = $('#ComboOperadores option:selected').val();
    const idGrupoCombo = $('#ComboGrupos option:selected').val();
    const canal = 2; // $('#ComboCanal option:selected').val();
    const fechaInicio = ObtenerFechaInicio();

    var params = 'idSolicitud=REFRESCAR_RESUMEN_GESTIONESOFFLINE&idOperador=' + idOperadorCombo + '&idGrupo=' + idGrupoCombo + '&canal=' + canal + '&fechaInicio=' + fechaInicio;
    $.ajax({
        type: 'POST',
        url: getPathSolicitudesBBDD(),
        data: params,
        success: function (dato) {
            var respuesta = JSON.parse(dato);
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
            if (correcto == '1') {
                var JSONRespuesta = JSON.parse(mensaje);
                var listaInfoGrupos = JSONRespuesta.InfoListaDatos;
                let filas = '';
                let opcionesSelect = '';
                //$('#tablaBuscador tbody').find('tr').remove();
                $("#tablaBuscador tbody tr").remove();

                if (esCambioCanal === 1) {
                    opcionesSelect = '<option value="-1" selected>TODOS</option> ';
                }
                for (var i = 0; i < listaInfoGrupos.length; i++) {
                    var JSONInfoGrupo = listaInfoGrupos[i];
                    var InfoGrupo = JSON.parse(JSONInfoGrupo);
                    var idGrupo = InfoGrupo.IdGrupo;
                    var nombreGrupo = InfoGrupo.Grupo;
                    var NumMensajesTotal = InfoGrupo.NumMensajesTotal;
                    var NumMensajesAsignados = InfoGrupo.NumMensajesAsignados;
                    var NumMensajesNoAsignados = InfoGrupo.NumMensajesNoAsignados;
                    var NumMensajesFinalizados = InfoGrupo.NumMensajesFinalizados;
                    var NumMensajesAparcados = InfoGrupo.NumMensajesAparcados;
                    if ($('#FilaGrupo_' + idGrupo).length == 0) {
                        filas = FilaGrupoNoExiste(idGrupo, nombreGrupo);
                        $('#tablaBuscador tbody').append(filas);
                    }
                    if (esCambioCanal === 1 && nombreGrupo !== 'Total') {
                        opcionesSelect += '<option value="' + idGrupo + '" >' + nombreGrupo + '</option> ';
                    }
                    $('#Total_' + idGrupo).text(NumMensajesTotal);
                    $('#Asignados_' + idGrupo).text(NumMensajesAsignados);
                    $('#NoAsignados_' + idGrupo).text(NumMensajesNoAsignados);
                    $('#Finalizados_' + idGrupo).text(NumMensajesFinalizados);
                    $('#Aparcados_' + idGrupo).text(NumMensajesAparcados);
                    $('#FilaGrupo_' + idGrupo).css('display', '');
                }
                if (esCambioCanal === 1) {
                    $('#ComboGrupos').html(opcionesSelect);
                }
                return;
            }
            else {
                $('#Cuerpo_').html(mensajeDecodificadoCaracteresEspeciales);
                $('#').modal({ backdrop: 'static' });
                $('.modal-backdrop').css('z-index', 10);
                $('#').modal('show');
            }
        }
    });
}
//function AvanzarPaginaConOperador(idGrupoIn) {
//    const idOperadorSel = $('#ComboOperadores').find('option:selected').val();
//    const idGrupoSelCombo = $('#ComboGrupos').find('option:selected').val();
//    const canalSel = 2; // $('#ComboCanal').find('option:selected').val();
//    let fechaInicio = ObtenerFechaInicio();

//    AvanzarPagina('ResumenGestionesOffLineMail.aspx?idGrupo=' + idGrupoSelCombo + '&idOperador=' + idOperadorSel + '&canal=' + canalSel + '&fechaInicio=' + fechaInicio,
//        'BuscadorGestionesOffLineMail.aspx?idGrupo=' + idGrupoIn + '&idOperador=' + idOperadorSel + '&canal=' + canalSel + '&fechaInicio=' + fechaInicio)
//}
//function AvanzarPaginaConOperadorYGrupoCombo() {
//    const idOperadorSel = $('#ComboOperadores').find('option:selected').val();
//    const idGrupoSel = $('#ComboGrupos').find('option:selected').val();
//    const canalSel = 2; // $('#ComboCanal').find('option:selected').val();
//    let fechaInicio = ObtenerFechaInicio();

//    AvanzarPagina('ResumenGestionesOffLineMail.aspx?idGrupo=' + idGrupoSel + '&idOperador=' + idOperadorSel + '&canal=' + canalSel + '&fechaInicio=' + fechaInicio,
//                  'BuscadorGestionesOffLineMail.aspx?idGrupo=' + idGrupoSel + '&idOperador=' + idOperadorSel + '&canal=' + canalSel + '&fechaInicio=' + fechaInicio)
//}
function IrABuscadorGestionesMail() {
    let idOperadorSel = $('#ComboOperadores').find('option:selected').val();
    let idGrupoSel = $('#ComboGrupos').find('option:selected').val();
    let fechaInicio = ObtenerFechaInicio();

    AvanzarPagina('ResumenGestionesOffLineMail.aspx?idGrupo=' + idGrupoSel + '&idOperador=' + idOperadorSel + '&fechaInicio=' + fechaInicio + '&canal=2',
        'BuscadorGestionesOffLineMail.aspx?idGrupo=' + idGrupoSel + '&idOperador=' + idOperadorSel + '&fechaInicio=' + fechaInicio + '&canal=2');
}

function AvanzaPaginaOperadorGrupo(idoperador, idgrupo, fin = '') {
    const canalSel = 2; // $('#ComboCanal').find('option:selected').val();
    const idOperadorSel = $('#ComboOperadores').find('option:selected').val();
    let idGrupoSelCombo = "T";
    if (idgrupo === "T")
        idGrupoSelCombo = "T";
    else
        idGrupoSelCombo = $('#ComboGrupos').find('option:selected').val();

    let fechaInicio = ObtenerFechaInicio();

    AvanzarPagina('ResumenGestionesOffLineMail.aspx?idGrupo=' + idGrupoSelCombo + '&idOperador=' + idOperadorSel + '&canal=' + canalSel + '&fechaInicio=' + fechaInicio,
                  'BuscadorGestionesOffLineMail.aspx?idGrupo=' + idgrupo + '&idOperador=' + idOperadorSel + '&canal=' + canalSel + '&fechaInicio=' + fechaInicio + '&fin=' + fin);
}



function ObtenerFechaInicio() {
    let fechaInicio = $("#FechaInicio").val();
    if (fechaInicio === undefined || fechaInicio === null || fechaInicio === '') {
        const today = new Date();
        //fechaInicio = today.getFullYear().toString() +            String(today.getMonth() + 1).padStart(2, '0') +            String(today.getDate()).padStart(2, '0');
        fechaInicio = '';
    }
    else {
        const dt = $("#sandbox-container .input-group.date").datepicker("getDate");
        const date = String(dt.getDate()).padStart(2,'0');
        const month = String(dt.getMonth() + 1).padStart(2,'0');
        const year = dt.getFullYear().toString();
        fechaInicio = year + month + date;
    }

    return fechaInicio;
}