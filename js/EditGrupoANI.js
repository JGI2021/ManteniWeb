



function EliminaANIDeGrupo(ANI) {
    Swal.fire({
        title: 'Eliminar teléfono ' + ANI,
        text: "Se elimina el teléfono de la lista. Los cambios no serán definitivos hasta que no se pulse Guardar",
        icon: 'warning',
        heightAuto: false,
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            
            // Elimino registro en tabla
            $("#tr_" + ANI).remove();
            
            let ANIsGrupo = datosGrupoANI.ANIs;
            datosGrupoANI.hayCambio = true;

            for (let i = 0; i < ANIsGrupo.length; i++) {
                if (ANIsGrupo[i] === ANI) {
                    ANIsGrupo.splice(i, 1);
                    break;
                }
            }
        }
    });
}

function AltaANIs() {
    $("#miModalHeader").text("Alta de teléfonos");

    let htmlBody = "<div class='row'>" +
        "  <div class='col-lg-12'> " +
        "     <label for='txtANIs'>Introduzca los teléfonos separados por comas si son más de uno</label>" +
        "     <textarea class='form-control' id='txtANIs' onkeyup='teclaPulsada(event)' onchange='validaTexto()' style='width:500px;' ></textarea> " +
        "     <label><small>Caracteres permitidos del 0 al 9  y + </small></label>" +
        "  </div> " +
        "</div> ";

    $("#miModalBody").html(htmlBody);
    $("#miTipoModal").val("altaANIs");
    $('#miModal').modal('show');
}


function MiModalAceptar() {
    let tipo = $("#miTipoModal").val();
    if (tipo) {
        if (tipo === 'altaANIs') {
            GuardarANIs()
        }
    }
}

function GuardarANIs() {

    let strANIs = $("#txtANIs").val();
    console.log("GuardarANIs() " + strANIs);

    if (strANIs) {
        let arrANIs = strANIs.split(',');

        let groupANIs = datosGrupoANI.ANIs;
        let html = "";

        for (let i = 0; i < arrANIs.length; i++) {
            let ANI = arrANIs[i];
            if (!groupANIs.includes(ANI)) {
                datosGrupoANI.ANIs.push(ANI);
                html += htmlAltaANIEnTabla(ANI);
                datosGrupoANI.hayCambio = true;
            }
        }
        if (html !== "") {
            $("#bodyTablaANIs").append(html);
        }

        $('#miModal').modal('hide');
    }
}



function htmlAltaANIEnTabla(ani) {
    let html = "<tr id='tr_" + ani + "'> " +
        "  <td><input type='checkbox' id='chk_" + ani + "' value='' /></td> " +
        "  <td>" + ani + "</td> " +
        "  <td> " +
        "      <button type='button' class='btn btn-default action-button' onclick='EliminaANIDeGrupo(\"" + ani + "\")'> " +
        "          <span class='fa fa-trash' style='color:darkred;'></span> " +
        "      </button> " +
        "  </td> " +
        "</tr> ";
    return html;
}

function teclaPulsada(key) {

    if (key.ctrlKey && (key.key == 'v' || key.key == 'V'))
        return false;

    var presskeys = (key.which) ? key.which : key.presskeys;
    // flechas de arrib, abajo, ida y drcha
    if (presskeys <= 57 && presskeys !== 32)  //32 espacio en blanco
        return false;


    if (key.key === ',' || key.key === '+') {
        // Tanto la coma como
        return false;
    }

    if ((presskeys >= 65 && presskeys <= 90) || (presskeys >= 162 && presskeys <= 222) || presskeys === 32) {
        let texto = $("#txtANIs").val();
        const position = key.target.selectionStart;
        texto = texto.substring(0, position - 1) + texto.substring(position + 1)
        $("#txtANIs").val(texto);
    }

    return false;
}

function validaTexto() {
    let texto = $("#txtANIs").val();

    texto = texto.replaceAll("\n", ',');
    texto = texto.replaceAll("\r", '');
    texto = texto.replaceAll(',,', ',');
    texto = texto.replaceAll('++', '+');
    texto = texto.replaceAll(' ', '');
    texto = texto.replaceAll(';', ',');
    texto = texto.replace(/[^0-9+, ]+/g, '');

    if (texto.length > 0) {
        for (let i = texto.length - 1; i >= 0; i--) {
            if (!validatexto(texto[i])) {
                //      texto = texto.substring(0, i - 1) + texto.substring(i + 1)
                alert("El texto introducido tiene caracteres no válidos");
                return;
            }
        }
        // Elimino comas duplicadas
        $("#txtANIs").val(texto);
    }
}


function validatexto(key) {
    switch (key) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "+":
        case ",":
        case " ":
            return true;
        default:
            return false;
    }
}



/// ---------------------------------------------------------------------
/// Muestra el mensaje de alerta y el mensaje de respuesta del servidor
/// ---------------------------------------------------------------------
function MostrarMensajeRespuesta(respuesta) {
    
    console.log("Respuesta guardar datos: " + respuesta.Mensaje);
    let pnlMessage = "";

    if (respuesta) {
        if (respuesta.Error === "S") {
            $('#MensajeAlertError').html(respuesta.Mensaje);
            pnlMessage = "alerterror";
        }
        else if (respuesta.Error === "N") {
            /// Mostramos mensaje de que todo se ha actualizado perfectamente
            $('#MensajeAlertSuccess').html(respuesta.Mensaje);
            pnlMessage = "alertsuccess";
        }
    }
    else {
        console.log("No se puede hacer un parse de la respuesta de errores al actualizar los datos, llega vacío.")
    }


    $('#' + pnlMessage).css('display', 'block');
    // Se mantien por 6 segundos, luego se quita
    setTimeout(function () {
        $('#' + pnlMessage).css('display', 'none');
        // Si se ha pulsado guardar y salir
    }, 4000);
}


function GuardarGrupoTelefonos(salir) {
    let param = { "grupoANI": datosGrupoANI };
    let urlGuardar = getRutaAbsoluta() + "/LlamadaSaliente/GuardarGrupoANI";

    if ($("#descripcion").val() === "") {
        alert("El campo descripción debe tener un valor");
        return;
    }
    if (datosGrupoANI.ANIs.length === 0) {
        alert("Debe introducir al menos un teléfono");
        return;
    }

    $.post(urlGuardar, param, function (resultado) {
        if (resultado == null) {
            alert("No se ha podido guardar los datos. Error al recibir la respuesta");
        }

        const respuesta = JSON.parse(resultado);
        MostrarMensajeRespuesta(respuesta);
        if (respuesta.Error === "N") {
            $("#aniGroupId").attr("disabled", "disabled");
            datosGrupoANI.esNuevo = false;
            datosGrupoANI.hayCambio = false;
        }

        if (salir === 1)
            RetrocederPaginaMVC();
        else
            $('#formASP').submit();

    });
}


function CambiaDatoGrupo(dato) {
    if (dato === 'maxDiasTrabajo') {
        datosGrupoANI.maxDiasTrabajo = parseInt($("#maxDiasTrabajo").val());
        datosGrupoANI.hayCambio = true;
    }
    else if (dato === 'descripcion') {
        datosGrupoANI.descripcion = $("#descripcion").val();
        datosGrupoANI.hayCambio = true;
    }
    else if (dato === 'aniGroupId') {
        datosGrupoANI.aniGroupId = $("#aniGroupId").val();
        datosGrupoANI.hayCambio = true;
    }
}


