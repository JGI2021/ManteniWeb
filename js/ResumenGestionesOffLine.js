

function FilaGrupoNoExiste(IdGrupo, NombreGrupo) { 
    let html = '';

    html +="<tr id='FilaGrupo_" + IdGrupo + "' style='cursor:pointer;'> ";

    html += "<td class='visible-xs visible-sm visible-md'>";
    html += "</td>";

    html += "<td style='display:table-cell'>";
    html += "  <label id='Grupo_" + IdGrupo + "' style='font-weight:500'>";
    html += "  " + NombreGrupo;
    html += "  </label>";
    html += "</td>";

    html += "<td style='display:table-cell'>";
    html += "  <label id='Total_" + IdGrupo + "' style='font-weight:500'>";
//    html += "  " + NumMensajesTotal;
    html += "  </label>";
    html += "  <a href='#' role='button' data-toggle='tooltip' data-placement='bottom' class='BotonFila' title='Ver mensajes' style='float:right;visibility:hidden;' onclick=\"AvanzaPaginaOperadorGrupo('', '" + IdGrupo + "')\"><span class='fa fa-search ratonEncima' aria-hidden='true'></span></a>";
    html += "</td>";

    html += "<td style='display:table-cell'>";
    html += "  <label id='Asignados_" + IdGrupo + "' style='font-weight:500'> ";
//    html += "  " + NumMensajesAsignados;
    html += "  </label>";
    html += "  <a href='#' role='button' data-toggle='tooltip' data-placement='bottom' class='BotonFila' title='Ver mensajes' style='float:right;visibility:hidden;'  onclick =\"AvanzaPaginaOperadorGrupo('ASIGN', '" + IdGrupo + "')\"><span class='fa fa-search ratonEncima' aria-hidden='true'></span></a>";
    html += "</td>";
    
    html += "<td style='display:table-cell'>";
    html += "  <label id='NoAsignados_" + IdGrupo + "' style='font-weight:500'> ";
//    html += "  " + NumMensajesNoAsignados;
    html += "  </label>";
    html += "  <a href='#' role='button' data-toggle='tooltip' data-placement='bottom' class='BotonFila' title='Ver mensajes' style='float:right;visibility:hidden;'  onclick =\"AvanzaPaginaOperadorGrupo('0', '" + IdGrupo + "')\"><span class='fa fa-search ratonEncima' aria-hidden='true'></span></a>";
    html += "</td>";
    
    html += "<td style='display:table-cell'>";
    html += "  <label id='Finalizados_" + IdGrupo + "' style='font-weight:500'>";
//    html += "  " + NumMensajesFinalizados;
    html += "  </label>";
    html += "  <a href='#' role='button' data-toggle='tooltip' data-placement='bottom' class='BotonFila' title='Ver mensajes' style='float:right;visibility:hidden;'  onclick =\"AvanzaPaginaOperadorGrupo('', '" + IdGrupo + "', 'FIN')\"><span class='fa fa-search ratonEncima' aria-hidden='true'></span></a>";
    html += "</td>";
    
    html += "<td style='display:table-cell'>";
    html += "  <label id='Descartados_" + IdGrupo + "' style='font-weight:500'>";
//    html += "  " + NumMensajesDescartados;
    html += "  </label>";
    html += "  <a href='#' role='button' data-toggle='tooltip' data-placement='bottom' class='BotonFila' title='Ver mensajes' style='float:right;visibility:hidden;'  onclick =\"AvanzaPaginaOperadorGrupo('', '" + IdGrupo + "', 'DESCART')\"><span class='fa fa-search ratonEncima' aria-hidden='true'></span></a>";
    html += "</td>";
    
    html += "</tr>";

    
    return html;
}