
function reemplazarCaracteresEspeciales(cadena) {
    return cadena.replace(/&#39;/g, '\'').replace(/&#191;/g, '¿').replace(/&#225;/g, 'á').replace(/&#233;/g, 'é')
        .replace(/&#237;/g, 'í').replace(/&#243;/g, 'ó').replace(/&#250;/g, 'ú').replace(/&#193;/g, 'Á')
        .replace(/&#201;/g, 'É').replace(/&#205;/g, 'Í').replace(/&#211;/g, 'Ó').replace(/&#218;/g, 'Ú').replace(/&#209;/g, 'Ñ')
        .replace(/&#241;/g, 'ñ').replace(/&#160;/g, ' ').replace(/&#39;/g, '\'').replace(/&#44;/g, ',').replace(/&#40;/g, '(').replace(/&#41;/g, ')')
        .replace(/&#45;/g, '-').replace(/&#47;/g, '/').replace(/&#34;/g, '"').replace(/\n/g, '<br>');
}

function getAbsolutePath() {
    var loc = window.location;
    var href = loc.href.trim();
    if (href[href.length - 1] === '#')
        href = href.substring(0, href.length - 1);
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return href.substring(0, href.length - ((loc.pathname.trim() + loc.search.trim() + loc.hash.trim()).length - pathName.trim().length));
}

function getPathNavegacion() {
    return getAbsolutePath() + 'Navegacion.aspx';
}

function getPathNavegacionMVC() {
    return getRutaAbsolutaMVC() + '/Navegacion.aspx';
}

function getPathSolicitudesBBDD() {
    return getAbsolutePath() + 'SolicitudesBBDD.aspx';
}


function getPathSolicitudesAspx(aspxfile) {
    return getAbsolutePath() + aspxfile;
}


function getRutaAbsolutaMVC() {
    var loc = window.location;
    var href = loc.href.trim();
    if (href[href.length - 1] === '#')
        href = href.substring(0, href.length - 1);
    var pathName = loc.pathname;
    pathName = pathName.substring(1, pathName.length - 1);

    pathName = pathName.substring(0, pathName.indexOf("/"));

    href = window.location.protocol + "//" + window.location.host + "/" + pathName;
    return href;
}


function RetrocederPaginaMVC() {
    var params = 'idSolicitud=RETROCEDER_PAGINA';
    $.ajax({ 
        type: 'POST',   
        url: getRutaAbsolutaMVC() + '/Navegacion.aspx',
        data: params, 
        success: function(dato) { 
            var responseText = decodeURIComponent(dato);
            var respuesta = JSON.parse(responseText);
            var correcto = respuesta.Resultado;
    
            if(correcto === '1')
            {
                var URL = respuesta.Mensaje;
                if(URL === '' || URL.toUpperCase() === 'PRINCIPAL.ASPX')
                {
                    parent.location.href = getRutaAbsolutaMVC() +  '/Principal.aspx';
                }
                else
                    window.location = getRutaAbsolutaMVC() +  '/' + URL;
            }
        }
    }); 
}

function DevolverNombreFichero(FicheroConExtension) {

    var FicheroSinExtension = '';
    var SplitNombreFichero = FicheroConExtension.split('.');
    var numSplit = SplitNombreFichero.length;
    if (numSplit < 2)
        return FicheroConExtension;
    for (var i = 0; i < numSplit - 1; i++) { FicheroSinExtension = FicheroSinExtension + SplitNombreFichero[i]; }
    return FicheroSinExtension;
}

function esIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        //return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        return true;
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        //return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        return true;
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        //return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        return true;
    }

    // other browser
    return false;
}

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}



function utf8_decode(str_data) {
    
    var tmp_arr = [],
      i = 0,
      ac = 0,
      c1 = 0,
      c2 = 0,
      c3 = 0,
      c4 = 0;

    str_data += '';

    while (i < str_data.length) {
        c1 = str_data.charCodeAt(i);
        if (c1 <= 191) {
            tmp_arr[ac++] = String.fromCharCode(c1);
            i++;
        } else if (c1 <= 223) {
            c2 = str_data.charCodeAt(i + 1);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
        } else if (c1 <= 239) {
            // http://en.wikipedia.org/wiki/UTF-8#Codepage_layout
            c2 = str_data.charCodeAt(i + 1);
            c3 = str_data.charCodeAt(i + 2);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        } else {
            c2 = str_data.charCodeAt(i + 1);
            c3 = str_data.charCodeAt(i + 2);
            c4 = str_data.charCodeAt(i + 3);
            c1 = ((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);
            c1 -= 0x10000;
            tmp_arr[ac++] = String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF));
            tmp_arr[ac++] = String.fromCharCode(0xDC00 | (c1 & 0x3FF));
            i += 4;
        }
    }

    return tmp_arr.join('');
}

function saveTextAsFile(fileNameToSaveAs, textToWrite) {
    /* Saves a text string as a blob file*/
    var ie = navigator.userAgent.match(/MSIE\s([\d.]+)/),
        ie11 = navigator.userAgent.match(/Trident\/7.0/) && navigator.userAgent.match(/rv:11/),
        ieEDGE = navigator.userAgent.match(/Edge/g),
        ieVer = (ie ? ie[1] : (ie11 ? 11 : (ieEDGE ? 12 : -1)));

    if (ie && ieVer < 10) {
        console.log("No blobs on IE ver<10");
        return;
    }

    var textFileAsBlob = new Blob([textToWrite], {
        type: 'audio/wav'
    });

    if (ieVer > -1) {
        window.navigator.msSaveBlob(textFileAsBlob, fileNameToSaveAs);

    } else {
        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = function (e) { document.body.removeChild(e.target); };
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }

    function AlmacenarValorEnLocalStorage(nombreVariable,valor)
    {
        localStorage[nombreVariable] = valor;
    }

    function RecuperarValorDeLocalStorage(nombreVariable)
    {
        return localStorage[nombreVariable];
    }
}


function marcarElementosSoloLectura() {
    // Obtengo todos los elementos que hay dentro de div.panelPrincipalCentro
    let panelCentro = document.getElementById('DivPanelDatos');

    // Obtengo todos los elementos de tipo input
    let elementos = panelCentro.getElementsByTagName('input');
    if (elementos && elementos.length > 0) {
        for (let i = 0; i < elementos.length; i++) {
            let elemento = elementos[i];
            elemento.disabled = true;
        }
    }

    //Ahora marco los select
    elementos = panelCentro.getElementsByTagName('select');
    if (elementos && elementos.length > 0) {
        for (let i = 0; i < elementos.length; i++) {
            let elemento = elementos[i];
            elemento.disabled = true;
        }
    }

    // Lo mismo con los botones
    elementos = panelCentro.getElementsByTagName('button');
    if (elementos && elementos.length > 0) {
        for (let i = 0; i < elementos.length; i++) {
            let elemento = elementos[i];
            elemento.disabled = true;
        }
    }

}