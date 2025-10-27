var objSubirFicheros;
function SubirFicherosEnVariable(serviceName)
{
    
    var subidoTodo = false;
    var Ficheros = objSubirFicheros.Ficheros;
    var encontrado = false;
    var i=0;
    while (!encontrado)
    {
        if (i >= objSubirFicheros.Ficheros.length)
            break;
        var Fichero = Ficheros[i];
        if (Fichero.Subido === false) 
        {
            if (Fichero.Accion === 'Anadir')
            {
                encontrado = true;
                if (Fichero.Tipo === 'Imagen' || Fichero.Tipo === 'Fichero64')
                {
                    uploadFicheroFormato64B("Temp_" + objSubirFicheros.NombreCarpeta, Fichero.Nombre, Fichero.Contenido, objSubirFicheros.WSSubirFichero, serviceName);
                }
                else if (Fichero.Tipo === 'Texto')
                {
                    var contenidoDec = decodeURIComponent(Fichero.Contenido);
                    uploadTextEncoded("Temp_" + objSubirFicheros.NombreCarpeta, Fichero.Nombre, contenidoDec, objSubirFicheros.WSSubirFichero, serviceName);
                }
                else 
                {
                    MostrarErrorSubidaDeFicheros();
                        
                }
            }
            else if (Fichero.Accion === 'Mantener') {
                encontrado = true;
                CopiarFichero(objSubirFicheros.NombreCarpeta, "Temp_" + objSubirFicheros.NombreCarpeta, Fichero.Nombre, objSubirFicheros.WSCopiarFichero, serviceName);
            }
            else {
                Fichero.Subido = true;
                objSubirFicheros.Ficheros[i] = Fichero;
            }
        }
        i++;
    }
    if(!encontrado)
        RenombrarCarpetaYBorrarCarpetaAnterior('Temp_' + objSubirFicheros.NombreCarpeta, objSubirFicheros.NombreCarpeta, objSubirFicheros.WSRenombrarCarpeta, serviceName);
}

function uploadTextEncoded(nombreSubCarpeta, nombreFichero, contenido, pathDestino, serviceName) {
    var pathDestinoCompleto = pathDestino + nombreFichero;
    var contenidoDecoded = decodeURIComponent(contenido);
    contenidoDecoded = contenidoDecoded.replace(/\+/g, ' ')
    console.log(contenidoDecoded);
    var oMyBlob = new Blob([contenidoDecoded], { type: 'text/html' });
    uploadBlobOrFile(nombreSubCarpeta, contenidoDecoded, pathDestino, nombreFichero, serviceName);
}


function uploadFicheroFormato64B(nombreSubCarpeta, nombreFichero, contenido, pathDestino, serviceName) {
    var nombreFicheroSplit = nombreFichero.split(".");
    var tipo = "";
    var extension = "";

    if (nombreFicheroSplit.length > 1)
        extension = nombreFicheroSplit[nombreFicheroSplit.length - 1];
    if (extension.toUpperCase() === "PNG")
        tipo = "image/png";
    else if (extension.toUpperCase() === "JPG" || extension.toUpperCase() === "JPEG")
        tipo = "image/jpeg"
    else if (extension.toUpperCase() === "GIG")
        tipo = "image/gif";
    else if (extension.toUpperCase() === "TXT")
        tipo = "plain/text";
    else if (extension.toUpperCase() === "HTML")
        tipo = "plain/text";
    else {
        console.log("uploadFicheroFormato64B. Fichero: " + nombreFichero + ".Extensión incorrecta. No se sube el fichero.");
        return;
    }
    var pathDestinoCompleto = pathDestino + nombreFichero;
    var blob = b64toBlob(contenido);
    blob.type = tipo;
    uploadBlobOrFile(nombreSubCarpeta, blob, pathDestino, nombreFichero, serviceName);
}


function MarcarFicheroComoSubido(fileName) {
    var encontrado = false;
    var i = 0;
    var Ficheros = objSubirFicheros.Ficheros;
    while (!encontrado) {
        if (i >= objSubirFicheros.Ficheros.length)
            return false;
        var Fichero = Ficheros[i];
        if (Fichero.Nombre === fileName) {
            Fichero.Subido = true;
            Ficheros[i] = Fichero;
            return true;
        }
        i++;

    }
    return false;
    
}

function MostrarErrorSubidaDeFicheros(codigoError)
{
    var mensajeError = 'Ha ocurrido un error creando o modificando el mensaje para la respuesta automática. Consulte con un administrador.';
    if (codigoError !== null) {
        if (codigoError === "1")
            mensajeError = 'Ha ocurrido un error creando o modificando el mensaje para la respuesta automática. No se ha encontrado la carpeta temporal dónde se han creado los ficheros temporalmente. No se han actualizado los ficheros, se utilizarán los ficheros que había anteriormente.Consulte con un administrador.';
        else if (codigoError === "2")
            mensajeError = 'Ha ocurrido un error creando o modificando el mensaje para la respuesta automática. Ha ocurrido un error eliminando la carpeta Back. No se han actualizado los ficheros, se utilizarán los ficheros que había anteriormente. Consulte con un administrador.';
        else if (codigoError === "3")
            mensajeError = 'Ha ocurrido un error creando o modificando el mensaje para la respuesta automática. Ha ocurrido un error moviendo los ficheros guardados anteriormente en la carpeta Back. No se han actualizado los ficheros, se utilizarán los ficheros que había anteriormente.Consulte con un administrador.';
        else if (codigoError === "4")
            mensajeError = 'Ha ocurrido un error creando o modificando el mensaje para la respuesta automática. Ha ocurrido un error moviendo los ficheros guardados en la carpeta temporal en la carpeta del mensaje. No se han actualizado los ficheros y actualmente el mensaje está vacío.Consulte con un administrador.';
        else if (codigoError === "5")
            mensajeError = 'Ha ocurrido un error y los ficheros de la respuesta automática se han creado pero se han quedado en la carpeta temporal. Consulte con un administrador.';
    }
    console.log('Subida de ficheros errónea');
    $('#BbotonAceptarF').attr('disabled',false);
    $('#BbotonAceptarF').attr('disabled',false);
    $('#BbotonAceptarYSalir').attr('disabled',false);
   
    window.parent.OcultarModalEspera();
    $('#Cuerpo_ModalErrorPagina').html(mensajeError);
    $('#ModalErrorPagina').modal({ backdrop: 'static' });
    $('#ModalErrorPagina').modal('show');

}

function AceptadoCorrectamente() {

}

function MostrarSubidaDeFicherosCorrecta() {
    console.log('Subida de ficheros correcta');
    
        $('#BbotonAceptarF').attr('disabled', false);
        $('#BbotonAceptarF').attr('disabled', false);
        $('#BbotonAceptarYSalir').attr('disabled', false);
        window.parent.OcultarModalEspera();
        var valorSalir = $('#salir').val();
        if (valorSalir !== null && valorSalir === "true") {
            $('#ModalMensajeExitoPaginaYVolver').modal({ backdrop: 'static' });
            $('#ModalMensajeExitoPaginaYVolver').modal('show');
            $('#Cuerpo_ModalMensajeExitoPaginaYVolver').html('Se han guardado los cambios correctamente.');

        }
        else {
            $('#ModalMensajeErrorPaginaYRecargar').modal({ backdrop: 'static' });
            $('#ModalMensajeErrorPaginaYRecargar').modal('show');
            $('#Cuerpo_ModalMensajeErrorPaginaYRecargar').html('Se han guardado los cambios correctamente.');
        }
            
        
        
    

}

function SubirFicheros(URLActual, serviceName) {
    var carpetaTemp = "Temp_"+ objSubirFicheros.NombreCarpeta;
    var PathCarpetaAEliminar = objSubirFicheros.WSEliminarCarpeta;
    if (objSubirFicheros.NombreCarpeta === '') {
        if (objSubirFicheros.NombreFicheroRelacion !== '') {
            uploadBlobOrFileUnFichero('', '', objSubirFicheros.WSSubirFichero, objSubirFicheros.NombreFicheroRelacion, serviceName);
        }
    }
    else
        EliminarCarpeta(carpetaTemp, PathCarpetaAEliminar, serviceName);
}

function SubirFicherosDeLocalAServidor(PathWSSubirFicheros, PathRutaLocal, serviceName) {
    var carpetaActual = objSubirFicheros.NombreCarpeta;
    var carpetaBack = 'Back_' + objSubirFicheros.NombreCarpeta;
    
    RenombrarCarpetaActualABackEnServidor(carpetaActual, carpetaBack, PathWSSubirFicheros, serviceName);
}

function CopiarDirectorioDeLocalAServidor() {

}

function RenombrarCarpetaActualABackEnServidor(carpetaOriginal, carpetaDestino, PathWSSubirFicheros, serviceName) {
    var xhr = new XMLHttpRequest();
    var URLCompleta = PathWSSubirFicheros + 'RenombrarCarpeta' + '?SubfolderTemp=' + carpetaOriginal + '&Subfolder=' + carpetaDestino + '&ServiceName=' + serviceName;
    xhr.open('POST', URLCompleta, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.timeout = 4000;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var respuesta = xhr.responseText;
            console.log(respuesta);
            console.log("RenombrarCarpetaYBorrarCarpetaAnterior.Respuesta:" + respuesta);
            if (respuesta === "0") {
                CopiarDirectorioDeLocalAServidor();
            }
            else {
                MostrarErrorSubidaDeFicheros(respuesta);
            }
        }
        else if (xhr.status === 408) {
            console.log("RenombrarCarpetaYBorrarCarpetaAnterior.Timeout");
            MostrarErrorSubidaDeFicheros();
        }
        else if (xhr.status === 0) {
            console.log("RenombrarCarpetaYBorrarCarpetaAnterior.Error al hacer el Request");
            MostrarErrorSubidaDeFicheros();
        }
    };
    console.log("RenombrarCarpetaYBorrarCarpetaAnterior.CarpetaOriginal:" + carpetaOriginal + ".CarpetaDestino:" + carpetaDestino);
    xhr.send("");
}

function uploadBlobOrFile(nombreSubCarpeta, blobOrFile, pathDestino, fileName,serviceName) {
    var xhr = new XMLHttpRequest();
    var URLCompleta = pathDestino + '?Subfolder=' + nombreSubCarpeta +'&ServiceName=' + serviceName;
    xhr.open('POST', URLCompleta, true);
    xhr.setRequestHeader('filename', fileName);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.timeout = 4000;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var respuesta = xhr.responseText;
            console.log("uploadBlobOrFile.Respuesta:" + respuesta);
            if (respuesta === "") {
                MostrarErrorSubidaDeFicheros();
            }
            else {
                if (MarcarFicheroComoSubido(fileName))
                    SubirFicherosEnVariable(serviceName);
                else
                    MostrarErrorSubidaDeFicheros();
            }
        }
        else if (xhr.status === 408) {
            console.log("uploadBlobOrFile.Timeout");
            MostrarErrorSubidaDeFicheros();
        }
        else if (xhr.status === 0) {
            console.log("uploadBlobOrFile.Error al hacer el Request");
            MostrarErrorSubidaDeFicheros();
        }

    }
    console.log("uploadBlobOrFile.nombreSubCarpeta:" + nombreSubCarpeta+ ".fileName:"+fileName);
    xhr.send(blobOrFile);
}



function EliminarCarpeta(carpetaTemp, pathDestino, serviceName) {
    var xhr = new XMLHttpRequest();
    var URLCompleta = pathDestino + '?Subfolder=' + carpetaTemp + '&ServiceName=' + serviceName;
    xhr.open('POST', URLCompleta, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.timeout = 4000;
    xhr.onreadystatechange = function () {


        if (xhr.readyState === 4 && xhr.status === 200) {
            var respuesta = xhr.responseText;
            console.log("EliminarCarpeta.Respuesta:" + respuesta);
            if (respuesta === "false") {
                MostrarErrorSubidaDeFicheros();
            }
            else {
                SubirFicherosEnVariable(serviceName);
            }
            return;
        }
        else if (xhr.status === 408) {
            console.log("EliminarCarpeta.Timeout");
            MostrarErrorSubidaDeFicheros();
        }
        else if (xhr.status === 0) {
            console.log("EliminarCarpeta.Error al hacer el Request");
            MostrarErrorSubidaDeFicheros();
        }
    };


    console.log("EliminarCarpeta.carpetaTemp:" + carpetaTemp);
    xhr.send("");
}

function CopiarFichero(carpetaOriginal, carpetaDestino, fileName, pathDestino,serviceName) {
    var xhr = new XMLHttpRequest();
    var URLCompleta = pathDestino + '?SubfolderOrigen=' + carpetaOriginal+'&SubfolderDestino='+carpetaDestino +'&ServiceName=' + serviceName;
    xhr.open('POST', URLCompleta, true);
    xhr.setRequestHeader('filename', fileName);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.timeout = 4000;
    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4 && xhr.status === 200) {
            var respuesta = xhr.responseText;
            console.log("CopiarFichero.Respuesta:" + respuesta);
            if (respuesta === "false") {
                MostrarErrorSubidaDeFicheros();
            }
            else {
                if (MarcarFicheroComoSubido(fileName))
                    SubirFicherosEnVariable(serviceName);
                else
                    MostrarErrorSubidaDeFicheros();
            }
            return;
        }
        else if (xhr.status === 408) {
            console.log("CopiarFichero.Timeout");
            MostrarErrorSubidaDeFicheros();
        }
        else if (xhr.status === 0) {
            console.log("CopiarFichero.Error al hacer el Request");
            MostrarErrorSubidaDeFicheros();
        }
    };
    console.log("CopiarFichero.Filename:" + fileName);
    xhr.send("");
}

function RenombrarCarpetaYBorrarCarpetaAnterior(carpetaOriginal,carpetaDestino,pathDestino,serviceName) {
    var xhr = new XMLHttpRequest();
    var URLCompleta = pathDestino + '?SubfolderTemp=' + carpetaOriginal + '&Subfolder=' + carpetaDestino + '&ServiceName=' + serviceName;
    xhr.open('POST', URLCompleta, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.timeout = 4000;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var respuesta = xhr.responseText;
            console.log(respuesta);
            console.log("RenombrarCarpetaYBorrarCarpetaAnterior.Respuesta:" + respuesta);
            if (respuesta === "0") {
                
                if (objSubirFicheros.NombreFicheroRelacion === '') {
                    MostrarSubidaDeFicherosCorrecta();
                }
                else {
                    console.log("Subida de ficheros corrrecta. Va a subir la información de la relación del fichero con la plantilla");
                    uploadBlobOrFileUnFichero('','',objSubirFicheros.WSSubirFichero,objSubirFicheros.NombreFicheroRelacion,serviceName);
                }
                
            }
            else {
                MostrarErrorSubidaDeFicheros(respuesta);
            }
        }
        else if (xhr.status === 408) {
            console.log("RenombrarCarpetaYBorrarCarpetaAnterior.Timeout");
            MostrarErrorSubidaDeFicheros();
        }
        else if (xhr.status === 0) {
            console.log("RenombrarCarpetaYBorrarCarpetaAnterior.Error al hacer el Request");
            MostrarErrorSubidaDeFicheros();
        }
    };
    console.log("RenombrarCarpetaYBorrarCarpetaAnterior.CarpetaOriginal:" + carpetaOriginal + ".CarpetaDestino:" + carpetaDestino);
    xhr.send("");
}

function SelectedFile(nombreCampoForm) {
    var nombreCampoFicheroSubir = "Fichero_" + nombreCampoForm;
    var archivoSeleccionado = document.getElementById(nombreCampoFicheroSubir);
    var file = archivoSeleccionado.files[0];
    if (file)
    {
        var fileSize = 0;
        if (file.size > 1048576)
            fileSize = (Math.round(file.size * 100 / 1048576) / 100).toString() + ' MB';
        else
            fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + ' Kb';

        $('#fileSize_' + nombreCampoForm).html('Tamaño: ' + fileSize);
        $('#fileType_' + nombreCampoForm).html('Tipo: ' + file.type);
        $('#fileName_' + nombreCampoForm).html('Nombre: ' + file.name);
    }
}

function SelectedFileWav(nombreCampoForm, nombreDivError,nombreBotonSubirFichero) {
    var nombreCampoFicheroSubir = "Fichero_" + nombreCampoForm;
    var archivoSeleccionado = document.getElementById(nombreCampoFicheroSubir);
    var file = archivoSeleccionado.files[0];
    if (file.type !== 'audio/wav') {
        $('#' + nombreCampoFicheroSubir).parent().html($('#' + nombreCampoFicheroSubir).parent().html());
        $('#' + nombreDivError).html('El fichero seleccionado debe ser de tipo audio/wav');
        $('#' + nombreDivError).removeClass('alert-success');
        $('#' + nombreDivError).addClass('alert-danger');
        $('#' + nombreDivError).css('visibility','visible');
        $('#' + nombreDivError).css('display','');
        return;
    }
    if (file) {
        var fileSize = 0;
        if (file.size > 1048576)
            fileSize = (Math.round(file.size * 100 / 1048576) / 100).toString() + ' MB';
        else
            fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + ' Kb';

        $('#fileSize_' + nombreCampoForm).html('Tamaño: ' + fileSize);
        $('#fileType_' + nombreCampoForm).html('Tipo: ' + file.type);
        $('#fileName_' + nombreCampoForm).val(file.name);
        $('#fileName_' + nombreCampoForm).html('Nombre: '+file.name);
        $('#' + nombreDivError).html('');
        $('#' + nombreDivError).addClass('alert-success');
        $('#' + nombreDivError).removeClass('alert-danger');
        $('#' + nombreDivError).css('visibility', 'hidden');
        $('#' + nombreDivError).css('display', 'none');
        $('#' + nombreBotonSubirFichero).css('visibility', 'visible');
        $('#' + nombreBotonSubirFichero).css('display', '');
    }
}

function uploadBlobOrFileUnFicheroDone(pathWs,blobOrFile, nameFile, done,serviceName) {
    var xhr = new XMLHttpRequest();
    var pathWsSubir = pathWs + 'Subir';
    var URLCompleta = pathWsSubir + '?ServiceName=' + serviceName;
    xhr.open('POST', URLCompleta, false);
    xhr.setRequestHeader('filename', nameFile);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = function (e) {
        document.querySelector('.percent').value = 0;
    };
    xhr.upload.onprogress = updateProgress;
    xhr.onerror = function (err) {
        console.log('Error:' + err.message);
    };
    xhr.onreadystatechange = function () {
        console.log('State changed:' + xhr.readyState + ' Status: ' + xhr.status);
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (done) {
                done(JSON.parse(xhr.responseText));
            } else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.send(blobOrFile);
}

function uploadBlobOrFileUnFichero(nombreSubCarpeta, blobOrFile, pathDestino, fileName,serviceName) {

    try {
        var xhr = new XMLHttpRequest();
        var URLCompleta = pathDestino + '?Subfolder=' + nombreSubCarpeta + '&ServiceName=' + serviceName;
        xhr.open('POST', URLCompleta, true);
        xhr.setRequestHeader('filename', fileName);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.timeout = 4000;
        xhr.onreadystatechange = function () {


            if (xhr.readyState === 4 && xhr.status === 200) {
                var respuesta = xhr.responseText;
                console.log("uploadBlobOrFileUnFichero.Respuesta:" + respuesta);
                if (respuesta === "") {
                    ContinueSubirFicheroIncorrecto();
                }
                else {
                    ContinueSubirFicheroCorrecto();
                }
            }
            else if (xhr.status === 408) {
                console.log("uploadBlobOrFileUnFichero.Timeout");
                ContinueSubirFicheroIncorrecto();
                return false;
            }
            else if (xhr.status === 0) {
                console.log("uploadBlobOrFileUnFichero.Error al hacer el Request");
                ContinueSubirFicheroIncorrecto();
                return false;
            }

        }
        console.log("uploadBlobOrFileUnFichero.nombreSubCarpeta:" + nombreSubCarpeta + ".fileName:" + fileName);
        xhr.send(blobOrFile);
        return true;
    }
     catch(err)
    {
         return false;
    }
}



function UploadFile(urlUpload, nombreCampo, nombreSubCarpeta, serviceName,NombreDivError) {
    try {
        var url = urlUpload;
        var archivoSeleccionado = document.getElementById(nombreCampo);
        var file = archivoSeleccionado.files[0];
        if (file === undefined) {
            if (NombreDivError !== undefined && NombreDivError !== '') {
                $('#' + NombreDivError).html('No se ha seleccionado ningún fichero.');
            }
            window.parent.OcultarModalEspera();
            return false;
        }
        var fileName = file.name;
        if (!uploadBlobOrFileUnFichero(nombreSubCarpeta, file, urlUpload, fileName, serviceName)) throw false;

    }
        catch(err)
        {
            if (NombreDivError !== undefined && NombreDivError !== '')
            {
                $('#' + NombreDivError).html('Ha ocurrido un error subiendo el fichero. Consulte con un administrador.');
            }
            window.parent.OcultarModalEspera();
            return false;
        }
    
}
