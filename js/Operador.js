

function CargaComboIdiomas() {
    $.ajax({
        type: "GET",
        url: getRutaAbsolutaMVC() + "/operadores/ListaDeIdiomas",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            let idiomas = JSON.parse(data);
            for (let i = 0; i < idiomas.length; i++) {
                let element = idiomas[i];
                // Miro si el operador tiene ese idioma seleccionado
                if (g_idiomasOperador && g_idiomasOperador.length > 0 &&
                    g_idiomasOperador.find(id => id.ISOIdioma.toLowerCase() === element.ISOIdioma.toLowerCase())) {
                    $('#comboIdiomas').append("<option value='" + element.ISOIdioma + "' selected >" + element.Idioma + "</option>");
                }
                else {
                    $('#comboIdiomas').append("<option value='" + element.ISOIdioma + "' >" + element.Idioma + "</option>");
                }
                $("#comboIdiomas").selectpicker("refresh");
            };

        }
    });
}


function MostrarOcultarAtenderEnAdministrativo() {
    let check = document.getElementById("llamadasAdminis");
    if (check) {
        if (check.checked) {
            $('#comboSeleccionGrupos').removeClass("ocultar-elem");
            $('#comboSeleccionGrupos').addClass("mostrar-elem-blk");
        }
        else {
            $('#comboSeleccionGrupos').removeClass("mostrar-elem-blk");
            $('#comboSeleccionGrupos').addClass("ocultar-elem");

        }
    }
}


function opentab(tabId, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    $("#" + tabId)[0].addClass = "active";
}


function RellenaDatosCalendarioTablas() {
    const idCalendario = $("#slcalendario").val();
    let calendario = g_calendarios.find(c => c.IdCalendario == idCalendario);
    if (calendario === undefined || calendario === null || calendario === '') {
        calendario = g_calendarios.find(c => c.EsCalendarioSubsistema === true);
    }


    RellenaTablaHorario(calendario);

    RellenaTablaDiasEspeciales(calendario);

    RellenaTablaVacaciones();
}


function RellenaTablaHorario(calendario) {
    g_DiasSinServicio = new Array();
    let horarioDia;
    let idia = 0;
    let html = "";
    for (let i = 0; i <= 6; i++) {
        idia = i + 1;
        if (i != 6) {
            horarioDia = calendario.HorarioCalendario.Horariodias[i + 1];
        }
        else {
            horarioDia = calendario.HorarioCalendario.Horariodias[0];
            idia = 0;
        }
        let horario = DameHorarioStr(horarioDia.Mh);
        html += "<tr>";
        html += "   <td style='width: 35% !important;'>" + DameNombreDia(idia) + "</td>" +
            "   <td>" + horario + "</td>";
        html += "</tr>";

        if (horario === 'Sin servicio') {
            g_DiasSinServicio.push(idia);
        }
    }

    $("#bodyHorarioTable").html(html);
}


function DameNombreDia(idia) {
    switch (idia) {
        case 0:
            return "Domingo";
        case 1:
            return "Lunes";
        case 2:
            return "Martes";
        case 3:
            return "Miércoles";
        case 4:
            return "Jueves";
        case 5:
            return "Viernes";
        case 6:
            return "Sábado";
        default:
            return "";
    }
}

function DameHorarioStr(Mh) {
    let resultado = "Sin servicio";
    let minvalue = 0;
    let maxvalue = 0;
    let horariosAtencion = new Array();
    let hayHorario = false;


    for (let i = 0; i < 48; i++) {
        if (minvalue == 0 && !(Mh[i] === null || Mh[i] === "") && Mh[i] == "1" && !hayHorario) {
            minvalue = i;
            maxvalue = i;
            hayHorario = true;
        }
        else if (!(Mh[i] === null || Mh[i] === "") && Mh[i] == "1") {
            maxvalue = i;
            hayHorario = true;
        }
        else if (hayHorario && (!(Mh[i] === null || Mh[i] === "") || Mh[i] == "0")) {
            horariosAtencion.push(DameFechaDesdeHasta(minvalue, maxvalue));
            hayHorario = false;
            minvalue = 0;
        }

    }

    if (maxvalue == 47) {
        horariosAtencion.push(DameFechaDesdeHasta(minvalue, maxvalue));
    }

    if (minvalue == maxvalue && minvalue == 0) {
        resultado = "Sin servicio";
    }
    else {
        for (let i = 0; i < horariosAtencion.length; i++) {
            let horario = horariosAtencion[i];
            if (i == 0) {
                resultado = horario;
            }
            else {
                resultado += " - " + horario;
            }
        }
    }
    return resultado;
}



function RellenaTablaDiasEspeciales(calendario) {
    //    calendario.HorarioCalendario.Horariodias.OrderBy(o => o.IdDiaSemana); // Ordeno los días
    let html = "";

    let periodico;

    if (calendario.DiasEspeciales !== null) {
        for (let i = 0; i < calendario.DiasEspeciales.length; i++) {
            let diaEspecial = calendario.DiasEspeciales[i];
            if (diaEspecial.EstaFueraDeFecha)
                continue;

            periodico = "No";
            if (diaEspecial.Anio == 0) {
                periodico = "Sí";
            }
            html += "<tr>" +
                "  <td>" + diaEspecial.Dia + " - " + DevuelveNombreAbreviadoMes(diaEspecial.Mes) + "</td>" +
                "  <td>" + periodico + "</td>";
            html += "   <td>" + diaEspecial.Descripcion + "</td>" +
                    "   <td>" + diaEspecial.Horario + "</td>" +
                    "   <td>" + diaEspecial.MensajeFueraHora + "</td>";
            html += "</tr>";
        }
    }

    $("#bodyDiasEspecialesTable").html(html);
}

function DevuelveNombreAbreviadoMes(mes) {
    switch (mes) {
        case 1: return 'Ene';
        case 2: return 'Feb';
        case 3: return 'Mar';
        case 4: return 'Abr';
        case 5: return 'May';
        case 6: return 'Jun';
        case 7: return 'Jul';
        case 8: return 'Ago';
        case 9: return 'Sep';
        case 10: return 'Oct';
        case 11: return 'Nov';
        case 12: return 'Dic';

        default:
    }
}

function RellenaTablaVacaciones() {
    $('#bodyVacacionesTable').html('');

    if (g_vacaciones) {
        let html = '';

        for (let i = 0; i < g_vacaciones.length; i++) {
            let vacacion = g_vacaciones[i];
            let estado = 'Pendientes';
            if (vacacion.Estado === 1) {
                estado = 'En proceso';
            }
            else if (vacacion.Estado === 2){
                estado = 'Disfrutadas';
            }

            html += "<tr id='vc-" + vacacion.IdVacacion + "'>" +
                    "  <td>Del " + vacacion.Desde + " al " + vacacion.Hasta + "</td> " +
                    "  <td> " + vacacion.Observaciones + " </td> " +
                "  <td>" + estado + "</td> " +
                "  <td>" + vacacion.Dias.length + "</td> " +
                "  <td><span class='fa fa-trash red-text' onclick='EliminaPeriodoVacaciones(" + vacacion.IdVacacion + ")'> </span > " +
                "      <span style='display: none;' class='fa fa-edit darkgreen-text' onclick='EditaPeriodoVacaciones(" + vacacion.IdVacacion + ")'> </span> " +
                    "  </td > " +
                    "</tr>";
        }

        $('#bodyVacacionesTable').html(html);
    }
}

function DameFechaDesdeHasta(minvalue, maxvalue) {
    let resultado = "";
    let auxminvalue = Math.trunc(minvalue / 2);
    let auxmaxvalue = Math.trunc(maxvalue / 2);

    resultado = "De " + auxminvalue;
    if (minvalue % 2 == 0) {
        resultado += ":00";
    }
    else {
        resultado += ":30";
    }

    if (maxvalue % 2 == 0) {
        resultado += " a " + auxmaxvalue + ":30 ";
    }
    else {
        resultado += " a " + (auxmaxvalue + 1) + ":00";
    }

    return resultado;
}




function CargaOperadoreSkills() {

    let idoperador = $("#CodigoOperador").val();

    $.ajax({
        type: "GET",
        url: getRutaAbsolutaMVC() + "/operadores/ListaSkillsOp?operadorId=" + idoperador,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            let skills = JSON.parse(data);
            let html = "";
            let htmlselected = "";
            for (let i = 0; i < skills.length; i++) {
                let skill = skills[i];
                if (skill.OpCode === null || skill.OpCode === "" || skill.OpCode === "0") {
                    html += "<li class='sk-noselected' id='sl_" + skill.SkillId + "' " +
                        "data-name='" + skill.NombreSkill + "' onclick='MoverRegistroASeleccionado(this.id)' > " +
                        "  <span>" + skill.NombreSkill + "</span > " +
                        "</li > ";
                }
                else if (skill.OpCode !== "" && skill.OpCode !== "0") {
                    htmlselected += "<li class='sk-selected' data-name='" + skill.NombreSkill + "' id='sl_" + skill.SkillId + "' " +
                        "onclick='MoverRegistroANoSeleccionado(this.id)'> " +
                        "  <span>" + skill.NombreSkill + "</span > " +
                        "</li > ";
                }
            }
            $("#lista-seleccionables").html(html);
            $("#lista-seleccionados").html(htmlselected);

            $('#skillsEliminados').val('');
            $('#skillsAniadidos').val('');
        }
    });
}


function MoverRegistroASeleccionado(id) {
    let nombreskill = $('#' + id).data('name');
    EliminarSkillDelista(id, 'skillsEliminados');
    AniadirSkillALista(id, 'skillsAniadidos', 'lista-seleccionados', nombreskill);
}


function MoverRegistroANoSeleccionado(id) {
    if (id) {
        let nombreskill = $('#' + id).data('name');
        EliminarSkillDelista(id, 'skillsAniadidos');
        AniadirSkillALista(id, 'skillsEliminados', 'lista-seleccionables', nombreskill);
    }
}


function EliminarSkillDelista(idLi, lista) {
    let idskill = idLi.slice(3);
    let strEliminados = $('#' + lista).val();

    if (strEliminados) {
        let arrEliminados = strEliminados.split(',');

        for (let i = 0; i < arrEliminados.length; i++) {
            if (arrEliminados[i] === idskill) {
                arrEliminados.splice(i, 1);
                break;
            }
        }

        strEliminados = arrEliminados.join(',');
        $('#' + lista).val(strEliminados);
    }
    $('#' + idLi).remove();
}


function AniadirSkillALista(idLi, lista, ulLista, nombreSkill) {
    let idskill = idLi.slice(3);
    let strAniadidos = $('#' + lista).val();

    if (strAniadidos) {
        let arrAniadidos = strAniadidos.split(',');

        if (!arrAniadidos.includes(idskill)) {
            strAniadidos += ',' + idskill;
            $('#' + lista).val(strAniadidos);
        }
    }
    else {
        strAniadidos = idskill;
        $('#' + lista).val(strAniadidos);
    }

    let lihtml = "";

    if (lista === 'skillsAniadidos') {
        lihtml = "<li class='sk-selected color-cambio' data-name='" + nombreSkill + "' id='sl_" + idskill + "' onclick='MoverRegistroANoSeleccionado(this.id)'> " +
            "  <span>" + nombreSkill + "</span > " +
            "</li > ";
    }
    else {
        lihtml = "<li class='sk-selected color-cambio' data-name='" + nombreSkill + "' id='sl_" + idskill + "' onclick='MoverRegistroASeleccionado(this.id)'> " +
            "  <span>" + nombreSkill + "</span > " +
            "</li > ";
    }
    $('#' + ulLista).append(lihtml);

}



function BuscarSkills(campo) {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("skills" + campo);
    filter = input.value.toUpperCase();
    ul = document.getElementById("lista-" + campo);
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("span")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}



function FGrupos() {
    let operadorid = $("#CodigoOperador").val();
    var URLNext = 'GruposDelOperador.aspx?operadorid=' + operadorid;
    AvanzarPagina(GetUrlActual(), URLNext);
}

function FListas() {
    let operadorid = $("#CodigoOperador").val();
    var URLNext = 'ListasDelOperador.aspx?operadorid=' + operadorid;
    AvanzarPagina(GetUrlActual(), URLNext);
}


function FPermisos() {
    let operadorid = $("#CodigoOperador").val();
    var urlnext = 'PermisosDelOperador.aspx?operadorid=' + operadorid;
    AvanzarPagina(GetUrlActual(), urlnext);
}

function Nuevo() {
    let URLNext = 'Operadores/Operador?id=0';
    AvanzarPagina(GetUrlActual(), URLNext);
    AvanzarPagina('Operadores/listado', URLNext);
}




function ValidaContrasenaReseteo(nuevaContrasena, confirmarContrasena) {
    if (nuevaContrasena === null || nuevaContrasena === undefined || nuevaContrasena.trim() === '') {
        alert('El campo contraseña va vacío, no se va a cambiar la contraseña');
        return false;
    }
    if (confirmarContrasena === null || nuevaContrasena === undefined || nuevaContrasena.trim() === '') {
        alert('El campo contraseña va vacío, no se va a cambiar la contraseña');
        return false;
    }
    if (nuevaContrasena != confirmarContrasena) {
        alert("Las contraseñas no coinciden");
        return false;
    }

    return true;
}

function ActivaDesactivaTextOperador(accion) {
    if (accion === 'A') {
        $("#estadoOp").text('ACTIVO');
        $("#estadoOp").removeClass('red-text');
        $("#estadoOp").addClass('darkgreen-text');
        $("#MenuActivaDesactiva").removeClass("BotonGreen");
        $("#MenuActivaDesactiva").addClass("BotonRed");
        $('#NombreActivaDesactiva').html('DESACTIVAR');
        $("#MenuEdicion").css('display', 'block');
    }
    else {
        $("#estadoOp").text('INACTIVO');
        $("#estadoOp").removeClass('darkgreen-text');
        $("#estadoOp").addClass('red-text');
        $("#MenuActivaDesactiva").removeClass("BotonRed");
        $("#MenuActivaDesactiva").addClass("BotonGreen");
        $('#NombreActivaDesactiva').html('ACTIVAR');
    }

    if ($('#estadoOp').text() === 'INACTIVO') {
        $('#MenuEdicion').css('display', 'none');
    }
    else if ($('#estadoOp').text() === 'ACTIVO') {
        $('#MenuEdicion').css('display', 'block');
    }
}

function GetUrlActual() {
    let operadorid = $("#CodigoOperador").val();
    return 'Operadores/operador/' + operadorid;
}


function MostrarOcultarPassword(idspan, idinput) {

    if ($('#' + idspan).hasClass('fa-eye-slash')) {
        $('#' + idspan).removeClass('fa-eye-slash');
        $('#' + idspan).addClass('fa-eye');
    }
    else {
        $('#' + idspan).removeClass('fa-eye');
        $('#' + idspan).addClass('fa-eye-slash');
    }

    const password = document.querySelector('#' + idinput);
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
}


function CloseAlert() {
    $('#alerta').css('display', 'none');

}


function ValidaDatos() {

    let resp = {
        Error: false,
        Mensaje: ""
    };

    let valido = true;

    if (!ValidaCampos(resp))
        valido = false;

    if (!ValidaContrasena(resp))
        valido = false;

    if (!valido) {
        MostrarMensajeRespuesta(resp);
    }

    return valido;
}


function ValidaContrasena(resp) {
    let contrasena = $("#contrasena").val();
    let confirContrasena = $("#confirmContrasena").val();

    if (contrasena === "" || confirContrasena === "") {
        resp.Error = "S";
        resp.Mensaje += "Debe rellenar los dos campos de contraseña <br/>";
        return false;
    }
    else if (confirContrasena !== contrasena) {
        resp.Error = "S";
        resp.Mensaje += "Las dos contraseñas no son iguales <br/>";
        return false;
    }

    return true;
}

function ValidaCampos(resp) {
    const alias = $("#aliasOp").val();

    if (alias.trim() === '') {
        resp.Error = "S";
        resp.Mensaje += "El campo alias no puede estar en blanco <br/>"
    }

    const nombre = $("#nombreOp").val();

    if (nombre.trim() === '') {
        resp.Error = "S";
        resp.Mensaje += "El nombre alias no puede estar en blanco <br/>"
    }

    const costeHora = $("CosteHora").val();
    const floatCosteHora = parseFloat(costeHora);
    if (floatCosteHora === NaN) {
        resp.Error = "S";
        resp.Mensaje += "El campo coste hora debe ser numérico</br>";
    }



    return true;
}

function MostrarMensajeRespuesta(data) {
    console.log("Respuesta guardar datos: " + data.mensaje);

    if (data.Error === "S") {
        $('#alerta').removeClass('alert-success');
        $('#alerta').addClass('alert-danger');
        $('#alert-mensaje').html(data.Mensaje);
    }
    else if (data.Error === "N") {
        /// Mostramos mensaje de que todo se ha actualizado perfectamente
        $('#alert-mensaje').html(data.Mensaje);
        $('#alerta').removeClass('alert-danger');
        $('#alerta').addClass('alert-success');
    }

    let waitTime = 4500;
    if (data.Error === "S")
        waitTime = 10000;

    // Se muestra el panel que indica si ha ido bien o si ha fallado
    $('#alerta').css('display', 'block');
    // Se mantien por 6 segundos, luego se quita
    setTimeout(function () {
        $('#alerta').css('display', 'none');
        // Si se ha pulsado guardar y salir
    }, waitTime);
}


function CambiarFoto() {
    let input = document.getElementById("ficheroFoto");
    input.click();
}

function EliminarFoto() {
    document.getElementById("imageFoto").src = "./../../images/person-icon-blue-7560.png";
    document.getElementById('ficheroFoto').value = null;
    //input.parentNode.removeChild(input);
}

    

function GuardarDatos(salir) {

    if (!ValidaDatos()) {
        return;
    }

    let dataForm = $("#formDatosOperador").serialize();

    if (g_operadorExtendido) {
        var datosForm = new FormData();
        let files = $("#ficheroFoto").get(0).files;
        if (files.length > 0) {
            datosForm.append("FicheroMensaje", files[0]);
        }
    }

    $.ajax({
        url: getRutaAbsolutaMVC() + "/operadores/GuardarDatos?" + dataForm,
        type: "POST",
        dataType: 'json',
        processData: false,
        contentType: false,
        data: datosForm,
        success: function (resp) {
            let respuesta = resp;
            $('#skillsEliminados').val('');
            $('#skillsAniadidos').val('');

            MostrarMensajeRespuesta(respuesta);
            // es un alta y me viene el código del alta
            if (resp.Error === "N" && resp.StrAux2 === "esAlta" && resp.StrAux1 !== "") {
                $("#operadorId").val(resp.StrAux1);
                $("#MenuEdicion").css('display', 'block');
                $("#CodigoOperador").val(resp.StrAux1);
            }

            if (salir)
                RetrocederPaginaMVC();
        }
    });
}


function ActivaDesactivaEquiposSegunNivelAgente(esModeloOrganizativo) {
    if (!esModeloOrganizativo)
        return;

    let options = document.querySelectorAll("#organizacionjerarquica option"); 
    let esAgente = $("#tipoOp").val()

    if (options && options.length > 1) {
        for (let i = 1; i < options.length; i++) {
            let option = options[i];
            if (esAgente < 3000 && !option.text.toUpperCase().includes("(EQUIPO")) {
                option.disabled = true;
                option.style.setProperty("color", "#e2e2e2", "important");
            }
            else {
                option.style.setProperty("color", "#333333", "important");
                option.disabled = false;                
            }
        }
    }
}