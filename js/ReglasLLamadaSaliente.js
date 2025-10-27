
class MarcacionesGrupoANI {
    constructor(aniGroupId) {
        this.ANIs = new Array();
        this.aniGroupId = aniGroupId;
        this.descripcion = "";
        this.esNuevo = true;
        this.maxDiasTrabajo = 0;
    }
}
    



function GuardarRegla(salir) {

    if (!validaDatosRegla()) {
        return;
    }

    let param = { "datosRegla": datosRegla };
    let urlGuardar = getRutaAbsoluta() + "/LlamadaSaliente/GuardaRegla";

    $.post(urlGuardar, param, function (resultado) {
        if (resultado == null) {
            alert("No se ha podido guardar los datos. Error al recibir la respuesta");
        }

        const respuesta = JSON.parse(resultado);
        MostrarMensajeRespuesta(respuesta);
        if (salir === 1) {
            RetrocederPaginaMVC();
        }

    });
}


function validaDatosRegla() {
    let nombre = $('#nombreRegla').val();
    if (nombre.trim() === '') {
        alert("El nombre de la fecha es obligatorio");
        return false;
    }

    nombre = $('#sufijoDNIS').val();
    if (nombre.trim() === '') {
        alert("El campo Sufijo DNIS es obligatorio");
        return false;
    }

    if (datosRegla.GrupoANis.length === 0) {
        alert("Se debe incluir a menos un grupo de teléfonos");
        return false;
    }

    return true;
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

function CambiaGrupoANIs() {

    let idgrupoANIs =  $('#selectGruposANI').val() ;

    if (idgrupoANIs === "N") {
        NuevoGrupoANIs();
    }
    else {
        CambiaGruposANIs(idgrupoANIs);
    }
}


function NuevoGrupoANIs() {
    url = getRutaAbsolutaMVC() + "/LlamadaSaliente/NuevoIdAniGroup";
    $.get(url, function (resp) {
        const grupoAinId = datosRegla.regla + "_AGIGR_" + resp;
        datosRegla.GrupoANis = new MarcacionesGrupoANI(grupoAinId);
        $("#nombreGrupoANI").text("Nuevo grupo de teléfonos");
        $("#bodyTablaANIs").html("");
        let ANIsGrupo = datosRegla.GrupoANis.ANIs;

        for (let i = ANIsGrupo.length - 1; i > 0; i--) {
            ANIsGrupo.splice(i, 1);
            break
        }
        EditaDescripcionNombreANI();
    });
    
}


function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


function CambiaGruposANIs(strgrupoANIs) {

    let idgrupoANIs = { "idgrupoANIs": strgrupoANIs };
    let url = getRutaAbsoluta();

    $.post(url + "/LlamadaSaliente/ObtenerGrupoANIs", idgrupoANIs, function (resultado) {

        $("#bodyTablaANIs").html("");

        let groupANIs = JSON.parse(resultado);

        if (groupANIs !== null || groupANIs !== undefined) {
            let html = "";
            let nombreGrupoANI = groupANIs.descripcion === "" ? groupANIs.aniGroupId : groupANIs.descripcion;

            $("#nombreGrupoANI").html(nombreGrupoANI);

            let l_gruposANIs = datosRegla.GrupoANis;
            l_gruposANIs.ANIs = new Array();
            l_gruposANIs.descripcion = groupANIs.descripcion;

            for (let i = 0; i < groupANIs.ANIs.length; i++) {
                let ani = groupANIs.ANIs[i];
                l_gruposANIs.ANIs.push(ani);
                html += htmlAltaANIEnTabla(ani);
            }
            $("#bodyTablaANIs").html(html);
        }
    });
}

function EliminaANI(ANI) {
    Swal.fire({
        title: 'Eliminar ANI ' + ANI,
        text: "Se eliminará el registro seleccionado. ¿Desear continuar? !",
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
            // Elimino registro en datosRegla
            let ANIsGrupo = datosRegla.GrupoANis.ANIs;

            for (let i = 0; i < ANIsGrupo.length; i++) {
                if (ANIsGrupo[i] === ANI) {
                    ANIsGrupo.splice(i, 1);
                    break;
                }
            }
        }
    });
}


function EliminarGrupo(aniGroupId) {
    Swal.fire({
        title: 'Eliminar grupo ',
        text: "Se eliminará el grupo seleccionado. ¿Desear continuar?",
        icon: 'warning',
        heightAuto: false,
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Eliminado'
            );

            let grupo = datosRegla.GrupoANis.find(gr => gr.aniGroupId === aniGroupId);
            if (grupo) {
                if (grupo.esNuevo) {
                    // Si es nuevo lo elimino de la estructura
                    let pos = datosRegla.GrupoANis.find(gr => gr.aniGroupId === aniGroupId);
                    if (pos > -1)
                        datosRegla.GrupoANis.splice(pos, 1);
                }
                else {
                    // Si no es nuevo lo marco para eliminar
                    grupo.esBaja = true;
                }
                // Lo elimino del panel de grupos
                $('#panel_' + aniGroupId).remove();
                // Miro si se ha eliminado el activo                
                if ($("#GruposANI").val() == aniGroupId) {
                    // Si hay mas de uno cojo el primero disponible
                    if (datosRegla.GrupoANis.length > 1) {
                        let cambiadoGrupo = false;
                        datosRegla.GrupoANis.forEach((item) => {
                            if (!item.esBaja && !cambiadoGrupo) {
                                $("#GruposANI").val(item.aniGroupId);
                                datosRegla.currentAniGroupId = item.aniGroupId;
                                cambiadoGrupo = true;
                            }
                        });

                        if (!cambiadoGrupo)
                            $("#GruposANI").val("");
                    }
                }

                // ordeno los grupos
                let orden = 1;
                let k = 0;
                for (k = 0; k < datosRegla.GrupoANis.length; k++) {
                    let grupo = datosRegla.GrupoANis[k];
                    if (!grupo.esBaja) {
                        grupo.orden = orden;
                        grupo.hayCambio = true;
                        $('#orden_' + grupo.aniGroupId).text(orden);
                        orden++;
                    }
                };

                // Si nos hemos quedado con 1 solo grupo lo ponemos como el actual
                if ((orden -1) === 1) {
                    let gr = datosRegla.GrupoANis.find(gr => gr.esBaja === false);
                    if (gr) {
                        $('#GruposANI').val(gr.descripcion);
                        datosRegla.currentAniGroupId = gr.aniGroupId;
                    }
                }
            }
        }
    });    
}


function AltaANI() {
    $("#miModalHeader").text("Alta de teléfonos");

    let htmlBody = "<div class='row'>" +
                   "  <div class='col-lg-12'> " +
                   "     <label for='txtANIs'>Introduzca los teléfonos separados por comas si son más de uno</label>" +
                   "     <textarea class='form-control' id='txtANIs' onkeyup='teclaPulsada(event)' onchange='validaTexto()' ></textarea> " +
                   "     <label><small>Caracteres permitidos del 0 al 9  y + </small></label>" +
                   "  </div> " +
                   "</div> ";

    $("#miModalBody").html(htmlBody);
    $("#miTipoModal").val("altaANIs");
    $('#miModal').modal('show');
}



function GuardarANIs() {

    let strANIs = $("#txtANIs").val();
    console.log("GuardarANIs() " + strANIs);

    if (strANIs) {
        let arrANIs = strANIs.split(',');

        let groupANIs = datosRegla.GrupoANis.ANIs;
        let html = "";

        for (let i = 0; i < arrANIs.length; i++) {
            let ANI = arrANIs[i];
            if (!groupANIs.includes(ANI)) {
                datosRegla.GrupoANis.ANIs.push(ANI);
                html += htmlAltaANIEnTabla(ANI);
            }
        }
        if (html !== "") {
            $("#bodyTablaANIs").append(html);
        }

        $('#miModal').modal('hide');
    }
}


function GuardarGrupoANIs() {

    const arrIdGrupoANI = $("#selectGruposANI").val();
    console.log("GuardarGrupoANIs() ");

    if (arrIdGrupoANI.length > 0) {

        for (let i = 0; i < arrIdGrupoANI.length; i++) {
            // Busco ese ani
            const strIdGrupoANI = arrIdGrupoANI[i];
            let grupoAni = g_gruposDeANI.find(g => g.aniGroupId === strIdGrupoANI);
            if (grupoAni) {
                // Miro que no exista 
                var existe = datosRegla.GrupoANis.find(g => g.aniGroupId === grupoAni.aniGroupId);

                if (existe && !existe.esBaja) {
                    continue;
                }
                else {
                    grupoAni.orden = datosRegla.GrupoANis.length + 1;
                    grupoAni.esNuevo = true;
                    datosRegla.GrupoANis.push(grupoAni);
                    // Si es el primer grupo asociado lo marco en la regla como el grupo activo
                    if (datosRegla.GrupoANis.length === 1) {
                        $('#GruposANI').val(grupoAni.descripcion);
                        datosRegla.currentAniGroupId = grupoAni.aniGroupId;
                    }
                }
            }

            let htmlAltaGrupo = htmlAltaDeGrupo(grupoAni);
            if (htmlAltaGrupo !== "") {
                $("#panelGruposAni").append(htmlAltaGrupo);
            }
        }
    }
    $('#miModal').modal('hide');
}




function MiModalAceptar() {
    let tipo = $("#miTipoModal").val();
    if (tipo) {
        if (tipo === 'altaANIs') {
            GuardarGrupoANIs()
        }
    }
}


function htmlAltaDeGrupo(grupoAni) {

    let html = '<div class="panel-group panelDraggable" id="panel_' + grupoAni.aniGroupId +'" draggable="true"> ' +
        '<div class="panel panel-default" > ' +
        '    <div class="panel-heading"> ' +
        '        <h4 class="panel-title" style="padding: 20px 25px;"> ' +
        '            <input type="radio" id="' + grupoAni.aniGroupId +'" name="radioActivo"  onclick="CambiaGrupoActivo(this.id)" /> ' +
        '            <a data-toggle="collapse" href="#collapse_' + grupoAni.aniGroupId + '"> ' +
        '                <span style="margin-right: 25px;"><b><span id="orden_' + grupoAni.aniGroupId + '">' + grupoAni.orden+'</span></b> - ' + grupoAni.descripcion + '</span> ' +
        '                <span>días: ' + grupoAni.maxDiasTrabajo + '</span> ' +
        '            </a> ' +
        '            <button type="button" class="btn delete-btn-phone-grp"> ' +
        '                <span class="fa fa-trash-o" style = "color:darkred; padding: 3px;float:right;" onclick="EliminarGrupo("' + grupoAni.aniGroupId + '")" ></span > ' +
        '            </button > ' +
        '        </h4> ' +
        '    </div> ' +
        '    <div id="collapse_' + grupoAni.aniGroupId + '" class="panel-collapse collapse"> ' +
        '        <label style="padding: 15px 10px 10px 35px;">Teléfonos:</label> ' +
        '        <label style="padding: 15px 15px 10px 5px; font-weight: 300;"> ' + grupoAni.StrANIs + '</label> ' +
        '    </div> ' +
        '</div> ' +
        '</div>';

    return html;
}

function htmlAltaANIEnTabla(ani) {
    let html = "<tr id='tr_" + ani + "'> " +
        "  <td><input type='checkbox' id='chk_" + ani + "' value='' /></td> " +
        "  <td>" + ani + "</td> " +
        "  <td> " +
        "      <button type='button' class='btn btn-default' onclick='EliminaANI(\"" + ani + "\")'> " +
        "          <span class='fa fa-trash' style='color:darkred;'></span> " +
        "      </button> " +
        "  </td> " +
        "</tr> ";
    return html;
}

function teclaPulsada(key) {

    if (key.ctrlKey && key.key == 'v')
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
    if (texto.length > 0) {
        for (let i = texto.length - 1; i >= 0; i--) {
            if (!validatexto(texto[i])) {
                //      texto = texto.substring(0, i - 1) + texto.substring(i + 1)
                alert("El texto introducido tiene caracteres no válidos");
                return;
            }
        }
        texto = texto.replaceAll(';', ',');
        // Elimino comas duplicadas
        texto = texto.replaceAll(',,', ',');
        texto = texto.replaceAll('++', '+');
        texto = texto.replaceAll(' ', '');
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


function EditaDescripcionNombreANI() {
    $("#nombreGrupoANI").css('display', 'none');
    $("#editNombreGrupoANI").css('display', 'inline-block');
    $("#editNombreGrupoANI").val($("#nombreGrupoANI").text());
    $("#idIconoEdicion").css('display', 'none');
    $("#idIconoGuardar").css('display', 'block');
    $("#idIconoCancelar").css('display', 'block');
}

function GuardaDescripcionNombreANI() {
    $("#idIconoEdicion").css('display', 'block');
    $("#idIconoGuardar").css('display', 'none');
    $("#nombreGrupoANI").css('display', 'inline-block');
    $("#editNombreGrupoANI").css('display', 'none');
    $("#nombreGrupoANI").text($("#editNombreGrupoANI").val());
    datosRegla.GrupoANis.descripcion = $("#editNombreGrupoANI").val();
    datosRegla.GrupoANis.hayCambio = true;
    // Si es nuevo se añade, sino se modifica la descripción
    if ($("#selectGruposANI option:selected").val() == 'N') {
        $("#selectGruposANI").append("<option value='" + datosRegla.GrupoANis.aniGroupId + "' > " + datosRegla.GrupoANis.descripcion + "</option> ");
        $("#selectGruposANI").val(datosRegla.GrupoANis.aniGroupId);
    }
    else
        $("#selectGruposANI option:selected").text($("#editNombreGrupoANI").val());

}

function CancelaDescripcionNombreANI(aniGruopId) {
    $("#idIconoEdicion").css('display', 'block');
    $("#idIconoGuardar").css('display', 'none');
    $("#nombreGrupoANI").css('display', 'inline-block');
    $("#editNombreGrupoANI").css('display', 'none');
    $("#nombreGrupoANI").text($("#editNombreGrupoANI").val());
}




$(document).ready(function () {
    $("input").on('change', function () {
        let id = this.id;

        if (id === "nombreRegla") {
            datosRegla.nombreRegla = $("#" + this.id).val();
        }
        else if (id === "descripcionRegla") {
            datosRegla.descripcionRegla = $("#" + this.id).val();
        }
        else if (id === "capability") {
            datosRegla.capability = parseInt($("#" + this.id).val());
        }
        else if (id === "digitosAQuitar") {
            datosRegla.digitosAQuitar = parseInt($("#" + this.id).val());
        }
        else if (id === "prefijoOP") {
            datosRegla.prefijoOP = $("#" + this.id).val();
        }
        else if (id === "prefijoPBX") {
            datosRegla.prefijoPBX = $("#" + this.id).val();
        }
        else if (id === "sufijoANI") {
            datosRegla.sufijoANI = $("#" + this.id).val();
        }
        else if (id === "sufijoDNIS") {
            datosRegla.sufijoDNIS = $("#" + this.id).val();
        }
    });

    $("select").on('change', function () {
        let id = this.id;
        if (id === "selectGruposANI") {
            datosRegla.currentAniGroupId = $("#" + this.id).val();
            CambiaGrupoANIs();
        }
    });

    $(document).on('keyup keydown keypress', function (event) {
        console.log(event);
        if (event.keyCode == 52 && event.shiftKey) {
            alert('foo');
        }
    });
});


function AltaGrupoANIs() {
    $("#miModalHeader").text("Alta de grupos de teléfonos");

    let htmlBody = "<div class='row'>" +
        "  <div class='col-lg-12'> " +
        "     <label for='selectGruposANI'>Añadir Grupo</label>" +
        "     <select class='form-control' id='selectGruposANI' name='selectGruposANI' multiple style='height: 250px; '> " +
        "       <option value='' selected hidden readonly style='padding: 5px 15px; font-size: 15px; font-weight: 600;'> Seleccione un grupo de Teléfonos</option > ";

    for (let j = 0; j < g_gruposDeANI.length; j++) {
        let grupo = g_gruposDeANI[j];
        htmlBody += "<option value='" + grupo.aniGroupId + "' style='padding: 5px 15px; font-size: 16px; font-weight: 600;'>" + grupo.descripcion + "</option>";
    }

    htmlBody += "    </select> " +
        "  </div> " +
        "</div> ";
    $("#miModalBody").html(htmlBody);
    $("#miTipoModal").val("altaANIs");
    $('#miModal').modal('show');
}

document.addEventListener('DOMContentLoaded', (event) => {
    function handleDragStart(e) {
        this.style.opacity = '0.4';

        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragEnd(e) {
        this.style.opacity = '1';

        items.forEach(function (item) {
            item.classList.remove('over');
        });
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }

        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');
    }

    function handleDrop(e) {
        e.stopPropagation();

        if (dragSrcEl !== this) {
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');

            ActualizaDatosEnArrMarcaciones(dragSrcEl, this);
        }

        return false;
    }

    let items = document.querySelectorAll('.panelDraggable');
    items.forEach(function (item) {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('dragenter', handleDragEnter);
        item.addEventListener('dragleave', handleDragLeave);
        item.addEventListener('dragend', handleDragEnd);
        item.addEventListener('drop', handleDrop);
    });
});


function ActualizaDatosEnArrMarcaciones(datoOrigen, datoDestino) {
    let idDestino = datoDestino.id.substring(6);
    let idOrigen = datoOrigen.id.substring(6);
    let marcacionOrigen = datosRegla.GrupoANis.find(gr => gr.aniGroupId == idOrigen);
    let marcacionDestino = datosRegla.GrupoANis.find(gr => gr.aniGroupId == idDestino);

    let valoraux = marcacionDestino.orden;
    marcacionDestino.orden = marcacionOrigen.orden;
    marcacionOrigen.orden = valoraux;

    marcacionOrigen.hayCambio = true;
    marcacionDestino.hayCambio = true;

    $("#orden_" + idDestino).text(marcacionDestino.orden.toString());
    $("#orden_" + idOrigen).text(marcacionOrigen.orden.toString());

    valoraux = datoDestino.id;
    datoDestino.id = datoOrigen.id;
    datoOrigen.id = valoraux;
}