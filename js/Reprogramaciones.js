
function ResultadoSelected()
{
    var validselected = $('#idResultadoLlamada').val();
    $('#ResultadoSeleccionado').val(validselected);
    var texto = $('#idResultadoLlamada option:selected').text();
    $('#TextoResultadoSeleccionado').val(texto);
}


function  IncluirResultado()
{
    // Obtenemos el valor del resultado de negocio seleccionado
    var validselected = $('#ResultadoSeleccionado').val();
    // también obtenemos la descripción del resultado seleccionado
    var txtidselected = $('#TextoResultadoSeleccionado').val();
    // Elimino ahora el valor del combo
    $("#idResultadoLlamada option[value='" + validselected + "']").remove();
//    $("#idResultadoLlamada option:selected").remove()
    // paso el valor y el texto a la tabla de resultados asociados
    var rowtable = '<tr id="row_' + validselected +'"> \n' +
                   '  <td class="footable-first-visible" style="display: table-cell;">' + validselected + '</td> \n' +
                   '  <td style="display: table-cell;">' + txtidselected + '</td> \n' +
                   '  <td class="footable-last-visible" style="display: table-cell;"> ' +
                   '     <button type="button" class="btn btn-default" title="Asociar resultado" style="margin-bottom:0px;padding-top: 3px;padding-bottom: 1px;" onclick="CambiarResultado(\'' + validselected + '\',\'' + txtidselected + '\');"><span class="fa fa-circle-o-notch" /></button> ' +
                   '     <button type="button" class="btn btn-default" title="Elimina resultado telefónico" style="margin-bottom:0px;padding-top: 3px;padding-bottom: 1px;" onclick="EliminaResultado(\'' + validselected + '\',\'' + txtidselected + '\');"> <span class="fa fa-trash-o" /> </button> \n ' +
                   '  </td> \n' +
                   '</tr>\n';
    $("#tablaresultados").append(rowtable);
    // Eliminar el valor del campo 'ResultadosNoAsociados'
    EliminaRegistroDeCampo('ResultadosNoAsociados', validselected);
    var resasociados = '';
    // Añade el nuevo valor al campo de los asociados
    if ($('#ResultadosAsociados').val() !== '')
        resasociados = $('#ResultadosAsociados').val() + ',' + validselected;
    else
        resasociados = validselected;
    $('#ResultadosAsociados').val(resasociados);
    //Seleccionar en el combo la opción de <seleccionar resultado> para que aparezca al principio y vaciar los campos de seleccionado
    $('#idResultadoLlamada option[value="-1"]');
    $('#ResultadoSeleccionado').val('');
    $('#TextoResultadoSeleccionado').val('');
}


function EliminaRegistroDeCampo(nombreCampo, valor) {
    var cadena = $('#' + nombreCampo).val() + '';
    var array = cadena.split(',');
    // Busco el registro en el array
    var index = array.indexOf(valor);
    // Si lo encuentra lo elimino
    if (index > -1) {
        array.splice(index, 1);
    }
    // Ahora vuelvo a rellenar el campo sin el valor eliminado
    var campo = '';
    for (i = 0; i < array.length; i++)
    {
        if (i === 0)
            campo = array[i];
        else
            campo += ',' + array[i];
    }

    if (campo !== '')
        $('#' + nombreCampo).val(campo);
}


/// Elimina el resultado de llamada de la tabla y se desasocia del gruo
function EliminaResultado(id, texto)
{
    if (confirm('¿Desea sacar este resultado del grupo?')) {
        // Pasa el valor al combo de resultados
        $('#idResultadoLlamada').append($('<option>', {
            value: id,
            text: texto
        }));

        //Elimina la fila de la tabla
        $('#row_' + id).remove();
        // Elimina el resultado del campo de asociados
        EliminaRegistroDeCampo('ResultadosAsociados', id);
        var noasociados = '';
        // Añade el resultado al campo de no asociados
        if ($('#ResultadosNoAsociados').val() !== '')
            noasociados = $('#ResultadosNoAsociados').val() + ',' + id;
        else
            noasociados = id;
        $('#ResultadosNoAsociados').val(noasociados);
    }
}


/// Muestra la ventana modal para asociar el resultado a otro grupo de resultados
function CambiarResultado(id, texto)
{
    $('#GroupsModalView').modal('show');
    // Paso a este campo el valor del resultado que se ha seleccionado en la tabla
    $('#ResultadoSeleccionado').val(id);
    // Paso también el nombre del resultado 
    $('#TextoResultadoSeleccionado').val(texto);
}



function AsociarAGrupo()
{
    // Tomo el valor seleccionado
    var id = $('#ResultadoSeleccionado').val();
    // También el texto
    var texto = $('#TextoResultadoSeleccionado').val();
    // Grupo seleccionado
    var grupo = $('#SelGruposResultados').val();
    // Texto del grupo seleccionado
    var txtGrupo = $('#SelGruposResultados :selected').text();

    var params = { 'idresultado':id, 'idgrupo':grupo }
    $.ajax({
        type: 'POST',
        url: getAbsolutePath() + "/DatosReprogramacion.aspx/AsociaResultadoGrupo",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            // Una vez asociado el resultado a grupo elimino la fila de la tabla
            var resultado = $.parseJSON(data.d);
            if (resultado === 'ok')
            {
                //Elimina la fila de la tabla
                $('#row_' + id).remove();
                // Elimina el resultado del campo de asociados
                EliminaRegistroDeCampo('ResultadosAsociados', id);
                var noasociados = '';
                // Añade el resultado al campo de no asociados
                if ($('#ResultadosNoAsociados').val() !== '')
                    noasociados = $('#ResultadosNoAsociados').val() + ',' + id;
                else
                    noasociados = id;
                $('#ResultadosNoAsociados').val(noasociados);

                $('#idResultadoLlamada').append($('<option>', {
                    value: id,
                    text: texto + '    <' + txtGrupo + '> '
                }));
            }
        }        
    });

    $('#GroupsModalView').modal('hide');
    window.parent.OcultarModalEspera();
}