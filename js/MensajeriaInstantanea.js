

function MostrarOcultarCamposSegunPlataforma(idPlataforma, formulario) {
    if (idPlataforma === '1') {
        $('#TIPO_OP_RESTO').prop('disabled', false);
        $('#Fila_FLAG_DETECTAR_CONTESTADOR').css('display', 'block');
        $('#Fila_FLAG_CONTESTADOR_CONTACTO').css('display', 'block');
        $('#ColumnaCampo_RECORDING_PATH').css('display', 'block');
        $('#ColumnaCampo_ID_CERTIFICADO').css('display', 'block');
        $('#Fila_PRESENTAR_TEL_PERSONAL').css('display', 'block');
        $('#Cabecera_PANELTIEMPOS').css('display', 'block');
        $('#Cabecera_PANELMENSAJES').css('display', 'none');
        $('#ColumnaCampo_ID_SERVICIO_EXTERNO').css('display', 'none');
        
        if (formulario === 'lista') {
            $('#ColumnaCampo_CONDICION_ID').css('display', 'block');
            $('#Tab_PANELPOSTLLAMADA').css('display', 'block');
            $('#TIPO_MARCACION').prop('disabled', false).change();
            $('#ColumnaCampo_TIEMPO_PREVIEW').css('display', 'block');
//            $('#OptionButtonVP_1').css('display', 'block');            
            let tiempopreview = $('TIEMPO_PREVIEW').val();
            if (tiempopreview === undefined || tiempopreview === '') {
                $('#TIEMPO_PREVIEW').val('0');
            }
        }
        else {
            $('#ColumnaCampo_TMP_TIEMPO_MAXIMO_POSTLLAMADA').css('display', 'block');
            $('#ColumnaCampo_TMP_RESULTADO_NEGOCIO').css('display', 'block');
            $('#TYPE').prop('disabled', false).change();
            $('#ColumnaCampo_PREVIEW_TIME').css('display', 'block');
        }

        $('#ColumnaCampo_TIPO_OPERADOR_PREF').css('display', 'block');
        $('#ColumnaCampo_TIPO_ASIGN_OPER_PREF').css('display', 'block');
        $('#ColumnaCampo_FLAG_MANTENER_OPERADOR').css('display', 'block');
        $('#TIPO_OP_RESTO').prop('disabled', false).change();
        $('#ColumnaCampo_ID_REP_RESULTADO_TELEFONICO').css('display', 'block');
        $('#ColumnaCampo_ID_PREDICCION').css('display', 'block');
        $('#ColumnaCampo_TIPIFICAR_EN_PREVIEW').css('display', 'block');        
    }
    else {
        $('#ColumnaCampo_TIPIFICAR_EN_PREVIEW').css('display', 'block');
        $('#Fila_FLAG_DETECTAR_CONTESTADOR').css('display', 'none');
        $('#Fila_FLAG_CONTESTADOR_CONTACTO').css('display', 'none');
        $('#ColumnaCampo_SCRIPT_IVR_ID').css('display', 'block');
        $('#ColumnaCampo_RECORDING_PATH').css('display', 'none');
        $('#ColumnaCampo_ID_CERTIFICADO').css('display', 'none');
        $('#Fila_PRESENTAR_TEL_PERSONAL').css('display', 'none');
        $('#Cabecera_PANELTIEMPOS').css('display', 'none');
        $('#Cabecera_PANELMENSAJES').css('display', 'block');
        $('#ColumnaCampo_ID_SERVICIO_EXTERNO').css('display', 'block');
        $('#ColumnaCampo_ID_PREDICCION').css('display', 'none');
        $('#ColumnaCampo_TIPO_OPERADOR_PREF').css('display', 'none');
        $('#ColumnaCampo_TIPO_ASIGN_OPER_PREF').css('display', 'none');
        $('#ColumnaCampo_FLAG_MANTENER_OPERADOR').css('display', 'none');


        if (formulario === 'lista') {
            $('#ColumnaCampo_CONDICION_ID').css('display', 'none');
            $('#Tab_PANELPOSTLLAMADA').css('display', 'none');
            $('#TIPO_MARCACION').val('P');
            $('#TIPO_MARCACION').prop('disabled', true).change();
            $('#ColumnaCampo_TIEMPO_PREVIEW').css('display', 'none');
//            $('#OptionButtonVP_1').css('display', 'none');
            let tiempopreview = $('TIEMPO_PREVIEW').val();
            if (tiempopreview === undefined || tiempopreview === '') {
                $('#TIEMPO_PREVIEW').val('0');
            }
        }
        else {
            $('#ColumnaCampo_TMP_TIEMPO_MAXIMO_POSTLLAMADA').css('display', 'none');
            $('#ColumnaCampo_TMP_RESULTADO_NEGOCIO').css('display', 'none');
            $('#TYPE').val('P');
            $('#TYPE').prop('disabled', true).change();
            $('#ColumnaCampo_PREVIEW_TIME').css('display', 'none');
        }
        $('#TIPO_OP_RESTO').prop('disabled', true).change();
        $('#TIPO_OP_RESTO').val('1').change();        

        $('#ColumnaCampo_TIPIFICAR_EN_PREVIEW').css('display', 'none');
        $('#ColumnaCampo_ID_REP_RESULTADO_TELEFONICO').css('display', 'none');
        $('#ColumnaCampo_PREVIEW_WITHOUT_CALL').css('display', 'none');         

        RellenaTabMensajes(idPlataforma, formulario);
    }
    ActualizaGruposACD(idPlataforma);    
}

// Si es una lista nueva y la campaña es de WhatsApp o de SMS no dej crear una lista telefónica
// Si es telefónica la campaña si dejo crear cualquier tipo de lista. La razón principal es que una campaña teléfonica tiene
// reprogramaciones definidas y una de WhatApp no, por eso no puedo dejar crear una lista telefonica sobre una campaña de whatsApp
function AltaNuevaListaPlataforma(idPlataformaCampana) {
    if (idPlataformaCampana === '3' || idPlataformaCampana === '5') {
        $('#ID_PLATAFORMA option[value="1"]').attr("disabled", true);
        $('#ID_PLATAFORMA]').val(idPlataformaCampana);
    }
}


function RellenaTabMensajes(idPlataforma, formulario) {

    let html = "";

    if (idPlataforma !== '1') {

        if (idPlataforma === '3') {
            html = HtmlPlataformaWhatsApp(formulario);
        }
        else if (idPlataforma === '5') {
            html = HtmlPlataformaSMS(formulario);
        }

        $("#PANELMENSAJES").html(html);
    }
}


function ActualizaGruposACD(idPlataforma) {
    let param = { "idPlataforma": idPlataforma };
    let url = getRutaAbsoluta() + "/Campana.aspx/ObtenerGruposACD";

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        success: function (resultado) {
            if (resultado === null) {
                alert("No se han obtenido los grupos ACD asociados a la plataforma");
                return;
            }
            const grupos = JSON.parse(resultado.d);

            //let arrGrupos = new Array();
            //let selected = "-1";
            var options = document.getElementById("GRUPO_ACD_ID").options;
            
            if (options) {
                for (let j = 0; j < options.length; j++) {                    
                    if (options[j].value === '' || options[j].value === '-1' || options[j].value === '-2') {
                        options[j].hidden = false;
                    }
                    else {
                        let idgrupo = grupos.find(gr => gr.Codigo === options[j].value);
                        if (idgrupo === null || idgrupo === undefined) {
                            options[j].hidden = true;
                        }
                        else {
                            options[j].hidden = false;
                        }
                    }
                }
            }   
            ActualizaServicioExternoGrupoACD(idPlataforma);
        }
    });
}

function ActualizaServicioExternoGrupoACD(idPlataforma) {
    // Si es teléfonica no hay nada que buscar
    if (idPlataforma === "1")
        return;

    /// Obtengo el grupo acd seleccionado en el combo
    let idGrupoACD = $("#GRUPO_ACD_ID").val();

    let param = { "idPlataforma": idPlataforma, "idGrupoACD": idGrupoACD };
    let url = getRutaAbsoluta() + "/Campana.aspx/ObtenerServiciosExternos";

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        success: function (resultado) {
            if (resultado === null) {
                alert("No se han obtenido los servicios asociados a la plataforma");
                return;
            }

            const servicios = JSON.parse(resultado.d);           

            if (servicios === null)
                return;

            let optionsServicios = document.getElementById("ID_SERVICIO_EXTERNO").options;
            let selected = false;

            if (optionsServicios) {
                for (let j = 0; j < optionsServicios.length; j++) {
                    if (optionsServicios[j].value === '' || optionsServicios[j].value === '-1' || optionsServicios[j].value === '-2') {
                        optionsServicios[j].hidden = false;
                    }
                    else {
                        let idservicio = servicios.find(sv => sv.Codigo === optionsServicios[j].value);
                        if (idservicio === null || idservicio === undefined) {
                            optionsServicios[j].hidden = true;
                        }
                        else {
                            optionsServicios[j].hidden = false;
                            if (!selected) {
                                selected = true;
                                optionsServicios[j].selected = selected;
                            }
                        }
                    }
                }
            }
        }
    });
}

function CambiaComboPlantillas(idPlataforma, idGrupoAcd, idioma) {
    // Si es teléfonica no hay nada que buscar
    if (idPlataforma === "1")
        return;

    let param = { "idGrupoAcd": idGrupoAcd, "idPlataforma": idPlataforma, "idioma": idioma };
    let url = getRutaAbsoluta() + "/Campana.aspx/CambiaComboPlantillas";

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        success: function (resultado) {
            if (resultado === null) {
                alert("No se han obtenido los servicios asociados a la plataforma");
                return;
            }

            const plantillas = JSON.parse(resultado.d);

            if (plantillas === null)
                return;

            let options = "";

            if (idPlataforma === "3") {
                $("#PLANTILLAS").html();
                options = "<option value='-1' selected readonly disabled >Seleccione una plantilla </option> ";
            }
            else if (idPlataforma === "5") {   //SMS
                $("#SMSRECURRENTE").html();
                options = "<option value='-1' selected readonly disabled >Seleccione un mensaje </option> ";
            }

            for (let j = 0; j < plantillas.length; j++) {
                options += "<option value='" + plantillas[j].Codigo + "' >" + plantillas[j].Nombre + "</option> ";
            }

            if (idPlataforma === "3")
                $("#PLANTILLAS").html(options);
            else if (idPlataforma === "5")
                $("#SMSRECURRENTE").html(options);

        }
    });
}

function HtmlPlataformaWhatsApp(formulario) {
    let stPlantillas = $('#PlantillasWhatsApp').val();
    let plantillas;
    if (stPlantillas) {
        plantillas = JSON.parse(stPlantillas);
    }
    let idPlantilla = $('#idPlantilla').val();
    let seleccionado = false;

    let html = "<div class='row rowSeparacion25'> ";
    html += "  <div id='ColumnaCampo_PLANTILLAS' class='col-md-6 col-sm-6 col-xs-12' style='visibility:visible;text-align:left;'> " +
        "     <label for='PLANTILLAS' id='labelPLANTILLAS' name='labelPLANTILLAS' style='visibility:visible;'>Plantillas WhatsApp</label> " +
        "     <label id='estrella_PLANTILLAS' style='visibility:visible;color:red;'> *</label> " +
        "     <select class='form-control input-sm' id='PLANTILLAS' name='PLANTILLAS' style='visibility:visible;' onchange='CambiaPlantillaWhatsApp()'> ";
    if (plantillas != null) {
        for (let i = 0; i < plantillas.length; i++) {
            let plantilla = plantillas[i];
            if (plantilla.Identificador === idPlantilla) {
                html += "<option value='" + plantilla.Identificador + "' selected>" + plantilla.Alias + "</option>"
                seleccionado = true;
            }
            else {
                html += "<option value='" + plantilla.Identificador + "' >" + plantilla.Alias + "</option>"
            }
        }
    }

    if (!seleccionado) {
        if (formulario === 'campana') {
            html += "<option value='-1' selected readonly disabled >Seleccione una plantilla </option>";
        }
        else if (formulario === 'lista') {
            let idplantillaCampana = $('#idPlantillaCampana').val();            
            if (idplantillaCampana) {                
                let plantillaCampana = plantillas.find(p => p.Identificador === idplantillaCampana);
                if (plantillaCampana) {
                    html += "<option value='-2' selected >Según campaña: " + plantillaCampana.Alias + "</option>";
                    $('#textoPlantilla').val(plantillaCampana.Mensaje);
                }
                else {
                    html += "<option value='-1' selected readonly disabled >Seleccione una plantilla </option>";
                }
            }
            else {
                html += "<option value='-1' selected readonly disabled >Seleccione una plantilla </option>";
            }
        }
    }

    html += "      </select> " +
        "   </div> " +
        " </div> ";

    html += CrearTextArea("");

    return html;
}


function HtmlPlataformaSMS(formulario) {

    let tipoSMS = $('#tipoSMS').val();
    let idPlantilla = $('#idPlantilla').val();


    let html = "<div class='row rowSeparacion25'> ";
    html += "  <div id='ColumnaCampo_PLANTILLAS' class='col-md-6 col-sm-6 col-xs-12' style='visibility:visible;text-align:left;'> " +
        "     <div> " +
        "     <label> ";
    if (tipoSMS === "0") {
        html += "        <input type='radio' id='txtRecurrente' name='checkTipoSMS' value='0' name='smsTexto' checked onclick='MuestraOcultaSelector(0)' /> Mensaje recurrente ";
    }
    else {
        html += "        <input type='radio' id='txtRecurrente' name='checkTipoSMS' value='0' name='smsTexto'  onclick='MuestraOcultaSelector(0)' /> Mensaje recurrente ";
    }

    html +=
        "     </label> " +

        "     <label> ";
    if (tipoSMS === "2" || tipoSMS === "") {
        html += "        <input type='radio' id='txtLibre' name='checkTipoSMS' value='2' name='smsTexto' checked onclick='MuestraOcultaSelector(2)' style='margin-left: 25px;' /> Texto libre ";
    }
    else {
        html += "        <input type='radio' id='txtLibre' name='checkTipoSMS' value='2' name='smsTexto' onclick='MuestraOcultaSelector(2)' style='margin-left: 25px;' /> Texto libre ";
    }

    html +=
        "     </label> " +
        "     </div> " +
        "   </div> " +
        " </div> ";


    html += CrearComboMensajesRecurrentes(formulario, tipoSMS, idPlantilla);

    html += CrearTextArea(tipoSMS);


    return html;
}

function CrearComboMensajesRecurrentes(formulario, tipoSMS, idMensaje) {
    let stPlantillasRecurrentes = $('#PlantillasSMS').val();
    let mensajes;
    let seleccionado = false;


    if (stPlantillasRecurrentes) {
        mensajes = JSON.parse(stPlantillasRecurrentes);
    }

    let visibleCombo = "style='display:none;'";
    if (tipoSMS === "0") {
        visibleCombo = "style='display:block;'";
    }

    let html = "<div class='row rowSeparacion25' id='Fila_SMSRECURRENTE' " + visibleCombo + " > ";
    html += "  <div id='ColumnaCampo_SMSRECURRENTE' class='col-md-6 col-sm-6 col-xs-12' style='visibility:visible;text-align:left;'> " +
            "     <label for='SMSRECURRENTE' id='labelSMSRECURRENTE' name='labelSMSRECURRENTE' style='visibility:visible;'>Mensajes recurrentes</label> " +
            "     <label id='estrella_SMSRECURRENTE' style='visibility:visible;color:red;'> *</label> " +
            "     <select class='form-control input-sm' id='SMSRECURRENTE' name='SMSRECURRENTE' style='visibility:visible;' onchange='CambiaPlantillaMgRecurrente(\"smsR\")'> ";    

    if (mensajes) {
        for (let i = 0; i < mensajes.length; i++) {
            let mensaje = mensajes[i];
            if (mensaje.Identificador === idMensaje) {
                html += "<option value='" + mensaje.Identificador + "' selected>" + mensaje.Alias + "</option>"
                seleccionado = true;
            }
            else {
                html += "<option value='" + mensaje.Identificador + "' >" + mensaje.Alias + "</option>"
            }
        }

        if (!seleccionado) {
            if (formulario === 'campana')
                html += "  <option value='-1' selected readonly disabled >Seleccione una plantilla </option> ";
            if (formulario === 'lista') {
                let idplantillaCampana = $('#idPlantillaCampana').val();
                if (idplantillaCampana) {
                    let plantillaCampana = mensajes.find(p => p.Identificador === idplantillaCampana);
                    if (plantillaCampana) {
                        html += "<option value='-2' selected >Según campaña: " + plantillaCampana.Alias + "</option>";
                        $('#textoPlantilla').val(plantillaCampana.Mensaje);
                    }
                    else {
                        html += "<option value='-1' selected readonly disabled >Seleccione una plantilla </option>";
                    }
                }
            }
        }
    }

    html +=
        "      </select> " +
        "   </div> " +
        " </div> ";

    return html;
}


//function CrearComboPlantillasSMS(tipoSMS, idPlantilla) {
//    let stPlantillas = $('#PlantillasWhatsApp').val();    
//    let plantillas;
//    let seleccionado = false;

//    if (stPlantillas) {
//        plantillas = JSON.parse(stPlantillas);
//    }

//    let visibleCombo = "style='display:none;'";
//    if (tipoSMS === "1") {
//        visibleCombo = "style='display:block;'";
//    }

//    let html = "<div class='row rowSeparacion25' id='Fila_SMSPLANTILLA' " + visibleCombo + " > ";
//    html += "  <div id='ColumnaCampo_SMSPLANTILLA' class='col-md-6 col-sm-6 col-xs-12' style='visibility:visible;text-align:left;'> " +
//        "     <label for='SMSPLANTILLA' id='labelSMSPLANTILLA' name='labelSMSPLANTILLA' style='visibility:visible;'>Mensajes plantilla</label> " +
//        "     <label id='estrella_SMSPLANTILLA' style='visibility:visible;color:red;'> *</label> " +
//        "     <select class='form-control input-sm' id='SMSPLANTILLA' name='SMSPLANTILLA' style='visibility:visible;' onchange='CambiaPlantillaMgRecurrente(\"smsP\")'> ";
//    for (let i = 0; i < plantillas.length; i++) {
//        let plantilla = plantillas[i];
//        if (plantilla.Identificador === idPlantilla) {
//            html += "<option value='" + plantilla.Identificador + "' selected>" + plantilla.Alias + "</option>"
//            seleccionado = true;
//        }
//        else {
//            html += "<option value='" + plantilla.Identificador + "' >" + plantilla.Alias + "</option>"
//        }
//    }

//    if (!seleccionado) {
//        html += "<option value='-1' selected readonly disabled >Seleccione una plantilla </option>";
//    }


//    html +=
//        "      </select> " +
//        "   </div> " +
//        " </div> ";

//    return html;
//}


function CrearTextArea(tipoSMS) {
    let textoPlantilla = $('#textoPlantilla').val();

    let escritura = "";
    if (tipoSMS !== "2") {
        escritura = "readonly style='background-color: white !important;'";
    }


    let html =
        "<div class='row rowSeparacion25'> " +
        "   <div id='ColumnaCampo_TEXTOPLANTILLAS' class='col-md-10 col-sm-10 col-xs-12' style='visibility:visible;text-align:left;'> " +
        "      <label for='TEXTOPLANTILLAS' style='visibility:visible;'>Mensaje</label> " +
        "      <label  style='visibility:visible;color:red;'> *</label> " +
        "      <textarea id='TEXTOPLANTILLAS' name='TEXTOPLANTILLAS' class='form-control' maxlength='1000' rows='12' " + escritura + " >" + textoPlantilla + "</textarea> " +
        "   </div>" +
        "</div>";

    return html;
}

function CambiaPlantillaWhatsApp() {
    let idPlantilla = $('#PLANTILLAS').val();
    CambioPlantilla(idPlantilla, "3");
}


function CambiaPlantillaMgRecurrente(tipo) {

    let idPlantilla = "";
    if (tipo === 'smsR') {
        idPlantilla = $('#SMSRECURRENTE').val();
    }
    else if (tipo === 'smsP') {
        idPlantilla = $('#SMSPLANTILLA').val();
    }
 
    CambioPlantilla(idPlantilla, "5");
}

function CambioPlantilla(idPlantilla, idPlataforma) {
    let param = { "idPlantilla": idPlantilla, "idPlataforma": idPlataforma };
    let url = getRutaAbsoluta() + "/Campana.aspx/ObtenerTextoPlantilla";

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        success: function (resultado) {
            if (resultado === null) {
                alert("No se ha obtenido el contenido del mensaje");
                return;
            }
            $('#TEXTOPLANTILLAS').val(resultado.d);
        }
    });
}


function MuestraOcultaSelector(idSelector) {
    if (idSelector === 0) {
        $('#Fila_SMSRECURRENTE').css('display', 'block');
//        $('#Fila_SMSPLANTILLA').css('display', 'none');
        $('#TEXTOPLANTILLAS').attr('readonly', true);
        $('#TEXTOPLANTILLAS').css('background-color', 'white');
    }
    else if (idSelector === 1) {
        $('#Fila_SMSRECURRENTE').css('display', 'none');
//        $('#Fila_SMSPLANTILLA').css('display', 'block');
        $('#TEXTOPLANTILLAS').attr('readonly', true);
        $('#TEXTOPLANTILLAS').css('background-color', 'white');
    }
    else {
        $('#Fila_SMSRECURRENTE').css('display', 'none');
//        $('#Fila_SMSPLANTILLA').css('display', 'none');
        $('#TEXTOPLANTILLAS').attr('readonly', false);
    }
}