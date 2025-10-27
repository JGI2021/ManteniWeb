
function AltaEstadoAlarma() {

    $('#titulomodal').html('<h3>Alta tiempo de estado alerta</h3>');
    $('#titulomodal').addClass('alta');
    $('#titulomodal').removeClass('actualiza');
    $('#titulomodal').removeClass('elimina');

    // Activamos el estado y el grupo, no se pueden cambiar
    $('#estadosalerta').attr("disabled", false);
    $('#estadosalerta').val('');
    $('#estadosalerta').css('background-color', 'white');

    $('#gruposacd').attr("disabled", true);
    // marcamos la opción de Todos como la seleccionada
    $('#gruposacd').val('0');
    $('#gruposacd').css('background-color', '#d2d2d2');

    $('#tiempoalerta').val('');
    $('#tiempoalerta').attr("disabled", false);
    $('#tiempoalerta').css('background-color', 'white');

    $('#MensajeAlerta').val('');
    $('#MensajeAlerta').attr("disabled", false);
    $('#MensajeAlerta').css('background-color', 'white');
    // Marcamos la acción como Alta
    $("#Accion").val("ALTA");
    $('#BotonAccionModal').text('Guardar');

    $('#ModalAlertas').modal('show');
}



/// --------------------------------------------------------------------------------------
/// Actualiza los tiempos de la alerta seleccionada
/// --------------------------------------------------------------------------------------
function ActualizaAlerta(estado, grupo, tiempo, texto) {
    $('#titulomodal').html('<h3>Actualiza tiempo de estado alerta</h3>');
    $('#titulomodal').addClass('actualiza');
    $('#titulomodal').removeClass('alta');
    $('#titulomodal').removeClass('elimina');

    // Marcamos la acción como Alta
    $("#Accion").val("ACTUALIZA");
    // Desactivamos el estado y el grupo, no se pueden cambiar
    $('#estadosalerta').attr("disabled", true);
    $('#estadosalerta').val(estado);
    $('#estadosalerta').css('background-color', '#d2d2d2');

    $('#gruposacd').attr("disabled", true);
    $('#gruposacd').css('background-color', '#d2d2d2');
    $('#gruposacd').val(grupo);

    // Pongo el tiempo y el texto
    $('#tiempoalerta').val(tiempo);
    $('#tiempoalerta').attr("disabled", false);
    $('#tiempoalerta').css('background-color', 'white');

    $('#MensajeAlerta').val(texto);
    $('#MensajeAlerta').attr("disabled", false);
    $('#MensajeAlerta').css('background-color', 'white');

    $('#BotonAccionModal').text('Guardar');

    $('#ModalAlertas').modal('show');
}


/// -------------------------------------------------------
/// Prepara los datos de la ventana modal para eliminar la alerta de tiempo
/// -------------------------------------------------------
function EliminaAlerta(estado, grupo, tiempo, texto) {
    $('#titulomodal').html('<h3>Elimina tiempo de estado alerta</h3>');
    $('#titulomodal').addClass('elimina');
    $('#titulomodal').removeClass('actualiza');
    $('#titulomodal').removeClass('alta');

    // Marcamos la acción como Alta
    $("#Accion").val("ELIMINAR");
    // Desactivamos el estado y el grupo, no se pueden cambiar
    $('#estadosalerta').attr("disabled", true);
    $('#estadosalerta').val(estado);
    $('#estadosalerta').css('background-color', '#d2d2d2');

    $('#gruposacd').attr("disabled", true);
    $('#gruposacd').val(grupo);
    $('#gruposacd').css('background-color', '#d2d2d2');
    // Pongo el tiempo y el texto
    $('#tiempoalerta').val(tiempo);
    $('#tiempoalerta').attr("disabled", true);
    $('#tiempoalerta').css('background-color', '#d2d2d2');

    $('#MensajeAlerta').val(texto);
    $('#MensajeAlerta').attr("disabled", true);
    $('#MensajeAlerta').css('background-color', '#d2d2d2');

    // Cambio el texto del botón del modal para que ponga eliminar
    $('#BotonAccionModal').text('Eliminar');

    $('#ModalAlertas').modal('show');
}


/// ----------------------------------------------------------------------------
/// 
function MostrarGruposAcd() {
    var selected = $("#estadosalerta option:selected").val();

    if (selected == "0" || selected == "1" || selected == "3") {
        // PAra estos estados no se puede seleccionar un grupo ACD
        $('#gruposacd').attr("disabled", true);
        // marcamos la opción de Todos como la seleccionada
        $('#gruposacd').val('0');
        $('#gruposacd').css('background-color', '#d2d2d2');
    }
    else {
        $('#gruposacd').attr('disabled', false  );
        $('#gruposacd').css('background-color', 'white');
    }
}

/// ------------------------------------------------------------
/// Damos de alta el nuevo tiempo, testo y grupo para el estado
// -------------------------------------------------------------
function GuardaAlerta() {

    if ($('#tiempoalerta').val() == "") {
        alert("Debe poner un tiempo de alerta");
        return;
    }

    var estado = $("#estadosalerta option:selected").val();
    if (estado == '') {
        alert('Deb seleccionar un estado');
        return;
    }

    var grupoacd = $("#gruposacd option:selected").val();
    if (grupoacd == '') {
        alert("Debe seleccionar un grupo ACD");
        return;
    }

    var tiempo = $("#tiempoalerta").val();
    var mensaje = $('textarea#MensajeAlerta').val();
    var accion = $('#Accion').val();

    var url;
    var params
    if (accion == "ELIMINAR") {
        url = getRutaAbsoluta() + "/AlertasMonitor.aspx/EliminaAlertas";
        params = { "estado": estado, "grupoacd": grupoacd }
    }
    else {
        url = getRutaAbsoluta() + "/AlertasMonitor.aspx/GrabaAlertas";
        params = { "estado": estado, "grupoacd": grupoacd, "tiempo": tiempo, "mensaje": mensaje }
    }    

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            if (data === null) {
                alert('Se ha producido un error guardar los datos ');
            }
            var response = JSON.parse(data.d);

            if (response == null || response.substring(0,2) != "OK") {
                alert(response);
            }
            else {
                $('#ModalAlertas').modal('hide');
                RemoveFila(estado, grupoacd);

                if (accion != "ELIMINAR") {
                    // Añadimos la nueva fila en la tabla
                    AddNuevaFila();
                }
                else if (accion == "ELIMINAR" && response == "OK-0") {
                    $("#gruposacd").val('');
                    AddNuevaFila();
                }
            }
        }
    });
}



/// -------------------------------------------------------------------
/// Añade una nueva fila a la table de tiempos de los estados de alerta
// a partir de los datos que tienen los campos del formulario
/// -------------------------------------------------------------------
function AddNuevaFila() {
    var estado = $("#estadosalerta option:selected").val();
    var grupoacd = $("#gruposacd option:selected").val();
    var tiempo = $("#tiempoalerta").val();
    var mensaje = $('textarea#MensajeAlerta').val();
    var textoestado = $("#ModalAlertas option:selected").text();
    var textogrupo = $("#gruposacd option:selected").text();

    var row = "";

    if (grupoacd == "") {
        row += "<tr id='tr_" + estado + "_0' style='cursor: pointer;'> " +
            "   <td style='display: table-cell;'>" + estado + "</td> " +
            "   <td style='display: table-cell;'>" + textoestado + "</td> " +
            "   <td style='display: table-cell;'>1</td>" +
            "   <td style='display: table-cell;'> --- </td> " +
            "   <td style='display: table-cell;'> --- </td> " +
            "   <td style='display: table-cell;'> --- </td> " +
            "   <td class='alinea-botones-accion footable-last-visible' style='display: table-cell;'>" +
          //  "         <span class='fa fa-pencil' style='color:darkgreen' onclick='ActualizaAlerta(\"" + estado + "\", \"\", \"\", \"\") '>" +
           // "         </span>&nbsp;&nbsp;" +
            //"         <span class='fa fa-trash' style='color:red' onclick='EliminaAlerta(\"" + estado + "\", \"" + grupoacd + "\", \"" + tiempo + "\", \"" + mensaje + "\")'></span>" +
            "       </td> " +
            "</tr>";
    }
    else {
        row += "<tr id='tr_" + estado + "_" + grupoacd + "' style='cursor: pointer;'> " +
               "   <td style='display: table-cell;'>" + estado + "</td> " +
               "   <td style='display: table-cell;'>" + textoestado + "</td> " +
               "   <td style='display: table-cell;'>1</td>" +
               "   <td style='display: table-cell;'>" + textogrupo + "</td> " +
               "   <td style='display: table-cell;'>" + tiempo + "</td> " +
               "   <td style='display: table-cell;'>" + mensaje + "</td> " +
               "   <td class='alinea-botones-accion footable-last-visible' style='display: table-cell;'>" +
               "         <span class='fa fa-pencil' style='color:darkgreen' onclick='ActualizaAlerta(\"" + estado + "\", \"" + grupoacd + "\", \"" + tiempo + "\", \"" + mensaje + "\") '>" +
               "         </span>&nbsp;&nbsp;" +
               "         <span class='fa fa-trash' style='color:red' onclick='EliminaAlerta(\"" + estado + "\", \"" + grupoacd + "\", \"" + tiempo + "\", \"" + mensaje + "\")'></span>" +
               "       </td> " +
               "</tr>";
    }

    $("#tablaalertas  tbody").append(row); 
}


/// --------------------------------------------------------------------
/// Elimina una fila de latabla de los tiempos de los estados de alerta
///---------------------------------------------------------------------
function RemoveFila(estado, grupo) {
    var idfila = "tr_" + estado + "_" + grupo;
    var fila = $('#' + idfila);

    if (fila != null) {
        $('#' + idfila).remove();
    }
}
