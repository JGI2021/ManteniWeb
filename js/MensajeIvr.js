
function BuscarFicheroMensaje() {
    console.log('pulsado buscar fichero mensaje ');
    var element = $("#filePicker");
    element.click();
    $("#alerta").css('display', 'none');    
}


function RellenEstructuraMensaje() {
    let nombrefichero = $("#InputMessageFile").val();
    g_datosMensajeIvr.IdMensajAnterior = g_datosMensajeIvr.Description;

    if (nombrefichero !== g_datosMensajeIvr.NombreFichero) {
        g_datosMensajeIvr.NombreFichero = nombrefichero;
    }

    g_datosMensajeIvr.Description = $("#Description").val();
    g_datosMensajeIvr.TextoMensaje = $("#TextoMensaje").val();
}

function GuardarDatos(tipo) {
    console.log("Grabar datos mensaje IVR");

    RellenEstructuraMensaje();

    /// Creamos un form donde almacenaremos los datos que se van  enviar
    var data = new FormData();
    //ASPForm.submit();
    let files = $("#filePicker").get(0).files;
    if (files.length > 0) {
        data.append("FicheroMensaje",files[0]);
    }

    data.append("TextoMensajeIVR", JSON.stringify(g_datosMensajeIvr));

    //let params = { "datosMensajIvr": g_datosMensajeIvr };   

    $.ajax({
        type: "POST",
        url: getRutaAbsolutaMVC() + "/OperadorIvr/ActualizarDatosMensaje",
        contentType: false,
        processData: false,
        data: data,
        success: function (data) {
            console.log("success Post ActualizarDatosMensaje");

            if (data === null) {
                alert('Se ha producido un error al guardar los cambios ');
                return;
            }
            MostrarMensajeRespuesta(data);
            if (tipo === 1) {
                RetrocederPaginaMVC();
            }
        }, error: function (e) { console.log(e); g_tablaTmkt = ""; }
    });

}


/// ---------------------------------------------------------------------
/// Muestra el mensaje de alerta y el mensaje de respuesta del servidor
/// ---------------------------------------------------------------------
function MostrarMensajeRespuesta(data) {
    const respuesta = JSON.parse(data);
    console.log("Respuesta guardar datos: " + respuesta.Mensaje);
    if (respuesta) {
        if (respuesta.Error === "S") {
            $('#alerta').removeClass('alert-success');
            $('#alerta').addClass('alert-danger');
            $('#alert-mensaje').html(respuesta.Mensaje);
        }
        else if (respuesta.Error === "N") {
            /// Mostramos mensaje de que todo se ha actualizado perfectamente
            $('#alert-mensaje').html(respuesta.Mensaje);
            $('#alerta').removeClass('alert-danger');
            $('#alerta').addClass('alert-success');
        }
    }
    else {
        console.log("No se puede hacer un parse de la respuesta de errores al actualizar los datos, llega vacío.")
    }

    // Se muestra el panel que indica si ha ido bien o si ha fallado
    $('#alerta').css('display', 'block');
    // Se mantien por 6 segundos, luego se quita
    setTimeout(function () {
        $('#alerta').css('display', 'none');
        // Si se ha pulsado guardar y salir        
    }, 4000);
}


function ValidateFile(id) {
    let arrInputs = $('#' + id);
    for (let i = 0; i < arrInputs.length; i++) {
        const oInput = arrInputs[i];
        if (oInput.type == "file") {
            const sFileName = oInput.value;

            if (id == 'filePicker') {
                // aqui se guarda toda la ruta del fichero
                //   $('#hiddCertificateName').val(sFileName);
                console.log(sFileName);
                let fichero = sFileName.split('\\\\').pop();
                fichero = fichero.replace(/C:\\fakepath\\/i, '');
                $('#InputMessageFile').val(fichero);
                g_datosMensajeIvr.CopiarFichero = true;
            }
            else {
                console.log('El campo id no viene con el valor correcto ');
            }
        }
    }

    return true;
}
