
///
/// Muestra la ventana modal donde están los servicios acd.
/// Como parámetro viene el identificador que tiene el formato svc_IDSERVICIO_chnl_IDCHANNEL del que obtengo el idservicio
/// para que en el combo aparezca ese seleccionado
function ShowModalSrvc(srvcid) {
    if (srvcid === null || srvcid.length <= 4)
        return;
    /// Busco el inicio del identificador del canal que será el final del id del id de servicio
    var n = srvcid.indexOf('_chnl_');
    // ahora me quedo con svc_IDSERVICIO (ej svc_1 )
    var s = srvcid.substr(0, n);
    // Leo a partir del 4 caracter, teniendo en cuenta que empieza desde 0
    var id = s.substr(4);
    // Obtengo el identificador de canal
    var idchnl = srvcid.substr(n+6);
    // Cambio el combo para que muestre con el value del servicio
    $("#SrvcChnl").val(id).change();
    // Guardo el canal en el campo oculto
    $('#hiddenDialogChannel').val(idchnl);
    // muestro la ventana modal
    $("#Dialog-Srvcs").modal('show');
}



/// 
/// Se ha seleccionado un canal del selector de canales. 
/// Hay que añadirlo en la tabla y además marcarlo como no seleccionable en el combo de canales
function AddChannel()
{
    // Obtengo el identificador del canal
    var idchnlselected = $('#slCanales').val();
    // 
    if (idchnlselected === null) {
        alert("No se ha podido añadir el canal");
        return;
    }
    // Por si pulsa añadir canal cuando esta la opción de 'Seleccionar canal' en el combo
    if (idchnlselected === '-1')
    {
        alert('Debe seleccionar un canal');
        return;
    }

    // Obtengo el nombre del canal
    // Obtengo el identificador del canal
    var chnlnameselected = $('#slCanales option:selected').text();

    var soloChat = ' --- ';
    if (idchnlselected === "1")
        soloChat = 'Solo chat';
    // Creamos la nueva fila con el nuevo canal que se va a incluir en la tabla
    var rowTable = "<tr id='tr_" + idchnlselected + "'> " +
                   "<td id=Name_" + idchnlselected + "'>" + chnlnameselected + "</td>" +
                   "<td id='Serv_" + idchnlselected + "'>Sin asignar servicio " +
                   "  <button type='button' id='svc_0_chnl_" + idchnlselected + "' onclick='ShowModalSrvc(this.id);'  data-toggle='modal' style='float:right;'> " +
                   "    <span class='fa fa-cog' title='Añadir/modificar servicio'>" +
                   "  </button> " + 
                   "</td>" +
                   "<td>" + soloChat + "</td>" +
                   "<td><button type='button'  id='btn_" + idchnlselected + "' onclick='RemoveChannel(this.id)'><span class='fa fa-trash' title='Eliminar canal' ></span></td> " +
                   "</tr>";
    // Añadimos la fila en la tabla
    $('#TablaCanales tr:last').after(rowTable);
    // Desactivo el canal que se ha seleccionado para que no se vuelva a seleccionar
    $("#slCanales option:selected").attr('disabled', 'disabled').removeClass('textoActivo');

}



/// Elimina un canal, es decir, quita la relación entre el canal y la página
/// La eliminación la hará fisicamente, es decir, lo borra de la bas ed edatos y lo elimina de la tabla
function RemoveChannel(idchannel)
{
    // viene con el formato btn_XX. Elimino el prefijo btn_ y me quedo con el identificador del canal
    idchannel = idchannel.substr(4);
    var params = { "idcanal": idchannel };
    $.ajax({
        type: "POST",
        url: getAbsolutePath() + "/PaginaChat_2.aspx/EliminaRelacionCanalPagina",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8", 
        success: function (data) {
            var resp = $.parseJSON(data.d);
            if (resp === 'ok') {
                // pasa el canal al combo y añade el canal al select y la clase textoActivo
                var nombrecanal = $('#Name_' + idchannel).text();
//                var option = "<option class='textoActivo' value='" + idchannel + "' >" + nombrecanal + "</option>";
//                $('#slCanales').append(option)
                $('#slCanales option[value=' + idchannel + ']').addClass('textoActivo');
                $('#slCanales option[value=' + idchannel + ']').removeAttr('disabled');
                // elimina la relación de la tabla
                $('#tr_' + idchannel).remove();

                alert('La relación entre el canal y la pagina se ha eliminado correctamente');
            }
            else
                alert('No se ha podido eliminar la relación entre el canal y la página ' + resp);
        }, 
        error: function(e) {
            alert('No se ha podido eliminar la relación entre el canal y la página ' + data.d);
        }
    });
}


///
/// Modifica la relación canla pagina servicio asociado
function ModificaServicioCanal() {
    // Obtengo el identificador de servicio seleccionado del Selector del dialogo modal
    var idservc = $("#SrvcChnl option:selected").val();
    var servicioname = $("#SrvcChnl option:selected").text();
    // Obtengo el idcanal modificado del campo oculto
    var idchnl = $('#hiddenDialogChannel').val();

    if ($('#svc_' + idservc + '_chnl_' + idchnl).length > 0)
    {
        alert('Este servicio ya está asociado a este canal');
        return;
    }

    $("#Dialog-Srvcs").modal('hide');
    var params = { "idcanal": idchnl, "idservicio": idservc };
    /// Llamada ajax para dar modificar la relación
    $.ajax({
        type: "POST",
        url: getAbsolutePath() + "/PaginaChat_2.aspx/ModificaRelacionCanalPagina",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8", 
        success: function (data) {
            var resp = $.parseJSON(data.d);
            if (resp === 'ok') {
                
                // Si no existe cambiamos el nombre en la tabla
                var td = servicioname + "  <button type='button' id='svc_0_chnl_" + idchnl + "' onclick='ShowModalSrvc(this.id);'  data-toggle='modal' style='float:right;'> " +
                   "    <span class='fa fa-cog' title='Añadir/modificar servicio'>" +
                   "  </button> ";
                $('#Serv_' + idchnl).html(td);
                // Se cambia el nombre del id del botón
                var button = $('#tr_' + idchnl).find('button').first();
                var newid = 'svc_' + idservc + '_chnl_' + idchnl;
                $('#' + button.id).attr('id', newid);
   
                alert('La relación entre el canal y la pagina se ha modificado correctamente');
            }
            else
                alert('No se ha podido modificar el registro ' + resp);
        }, 
        error: function(e)  {
            alert('No se ha podido modificar el registro ' + data.d);
        }
    });

}
