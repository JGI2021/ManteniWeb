
function BuscarCertificado() {
    console.log('pulsado buscar certificado ');
    var element = $("#fileinputcertificado");
    element.click();
}


function BuscarClave() {
    console.log('pulsado buscar clave ');
    var element = $("#fileinputclave");
    element.click();
}


function MostrarOcultarContrasena() {
    if ('password' == $('.Contrasena').attr('type')) {
        $('.Contrasena').prop('type', 'text');
    } else {
        $('.Contrasena').prop('type', 'password');
    }    
}





/// *******************************************************************************************
/// Función para validar que los ficheros que se cargan pertenecen a las extensiones esperadas 
/// para certificados. Sino devuelve un alert indicando el error
/// *******************************************************************************************
var _validFileExtensions = [".cer", ".pfx", ".pem"];

function ValidateExtensions(id) {
    var arrInputs = $('#' + id);
    for (var i = 0; i < arrInputs.length; i++) {
        var oInput = arrInputs[i];
        if (oInput.type == "file") {
            var sFileName = oInput.value;
            if (sFileName.length > 0) {
                var blnValid = false;
                for (var j = 0; j < _validFileExtensions.length; j++) {
                    var sCurExtension = _validFileExtensions[j];
                    if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() === sCurExtension.toLowerCase()) {
                        blnValid = true;
                        break;
                    }
                }

                if (!blnValid) {
                    alert("Atención, " + sFileName.split('\\').pop() + " no es un fichero válido, las extensiones permitidas son: " + _validFileExtensions.join(", "));
                    return false;
                }
            }

            if (id == 'fileinputcertificado') {
                // aqui se guarda toda la ruta del fichero
                $('#hiddCertificateName').val(sFileName);
                console.log(sFileName);
                fichero = sFileName.split('\\\\').pop();
                fichero = fichero.replace(/C:\\fakepath\\/i, '');
                $('#InputCertificateFile').val(fichero);
            }
            else if (id == 'fileinputclave') {
                // aqui se guarda toda la ruta del fichero
                $('#hiddCertificateKey').val(sFileName); 
                console.log(sFileName); 
                fichero = sFileName.split('\\\\').pop();
                fichero = fichero.replace(/C:\\fakepath\\/i, '');
                $('#InputClavePrivada').val(fichero);
            }
            else {
                console.log('El campo id no viene con el valor correcto ');
            }
        }
    }
    
    return true;
}


/// **********************************************************************************
/// *** Sube los datos al servidor y el fichero de certficado y de clave privada
/// **********************************************************************************
function UploadCertificateFiles(salir) {
    /// Creamos un form donde almacenaremos los datos que se van  enviar
    var data = new FormData();
    /// obtengo el fichero del certificado
    var files = $("#fileinputcertificado").get(0).files;

    // Añado el fichero de Certificado a la colección de datos del form creado
    if (files.length > 0) {
        data.append("Certificado", files[0]);
    }

    // Añado el fichero de Clave privada a la colección de datos del form creado
    var files = $("#fileinputclave").get(0).files;

    // Add the uploaded image content to the form data collection
    if (files.length > 0) {
        data.append("ClavePrivada", files[0]);
    }

    // identificador del certificado
    data.append("idCertificado", "0");
    // Alias del certificado
    data.append("AliasCertificado", $('#AliasCertificado').val());
    // Contraseña
    data.append("Contrasena", $('#Contrasena').val());

    if (!salir) {
        data.append("Operacion", "Guardar");
    }
    else {
        data.append("Operacion", "Salir");
    }

    // Guid para volver a cargar la estructura
    data.append('id', "ALTA_CERTIFICADO");

    // Make Ajax request with the contentType = false, and procesDate = false
    var ajaxRequest = $.ajax({
        type: "POST",
        url: getAbsolutePath() + "/UploadFiles.aspx",
        contentType: false,
        processData: false,
        data: data,
        success: function (datos) {
            var respuesta = JSON.parse(datos);
            var correcto = respuesta.Resultado;

            var mensaje = DecodeHtmlCodes(respuesta.Mensaje);
            if (correcto === '1') {
                alert(mensaje);
            }
            else {
                alert(mensaje);
            }
            
        }
        
    });

    ajaxRequest.done(function (xhr, textStatus) {        
    });
}


/// ********************************************************************
/// *** Llamada para guardar los datos del certificado
/// ********************************************************************
function GuardarCertificado(salir) {
    // Comprobamos que los datos de entrada se han rellenado correctamente
    if (!ValidaDatos())
        return;
    /// Manda los datos al servidor
    UploadCertificateFiles(salir);    
}



/// ***********************************************************************************************
/// *** Se validan los datos de entrada para dar de alta el certificado
/// ***********************************************************************************************
function ValidaDatos() {
    // Si no se ha escrito el alias
    if ($('#AliasCertificado').val() == '') {
        $('#AliasCertificado').focus();
        alert('Debe rellenar el campo alias');
        return false;
    }
    /// Revisamos que se ha puesto una contraseña
    if ($('#Contrasena').val() == '') {
        $('#Contrasena').focus();
        alert('Debe rellenar el campo contraseña');
        return false;
    }
    /// Revisamos que las contraseñas sean iguales
    if ($('#Contrasena').val() != $('#RepiteContrasena').val()) {
        $('#Contrasena').focus();
        alert('Los dos campos contraseña no son iguales');
        return false;
    }

    /// Se debe añadir el fichero de la clace privada
    if ($('#ClavePrivada').val() == "") {
        $('#ClavePrivada').focus();
        alert("Debe introducir un fichero de clave privada.");
        return false;
    }

    if ($('#NombreCertificado').val() == "") {
        $('#NombreCertificado').focus();
        alert("Debe introducir un nombre para identificar el certificado");
        return false;
    }

    return true;
}


function DecodeHtmlCodes(cadena) {    

    var parser = new DOMParser();
    var dom = parser.parseFromString(
        '<!doctype html><body>' + cadena + '</body>', 'text/html');
    return dom.body.textContent;
}