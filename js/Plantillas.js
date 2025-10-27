
/////////
///////// FUNCIONES DE GetPlantillas.cshtml
/////////


function EliminaFilasTabla() {
    let idsSeleccionados = $("#idsSeleccionados").val();
    let arrIds = idsSeleccionados.split(",");

    for (let i = 0; i < arrIds.length; i++) {
        let id = arrIds[i];
        $("#tr_" + id).remove();
    }
}


function NuevoRegistro() {
    AvanzarPagina('Plantillas/GetPlantillas', 'Plantillas/CrearPlantilla');
}

function EditarRegistro() {
    let idSeleccionado = $("#idsSeleccionados").val();
    AvanzarPagina('Plantillas/GetPlantillas', 'Plantillas/EditarPlantilla?identificador=' + idSeleccionado);
}



/////////
/////// FUNCIONES DE EditarPlantill.cshtml
///////

function CloseAlert() {
    $('#alerta').css('display', 'none');
}


function GuardarDatos(salir) {

    if (!ValidaDatos()) {
        return;
    }

    let param = { "datosPlantilla": g_datosPlantilla };

    $.ajax({
        url: getRutaAbsolutaMVC() + "/Plantillas/GuardarPlantilla", // + ?dataForm,
        type: "POST",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        async: false,
        cache: false,
        timeout: 5000,
        success: function (resp) {
            if (resp === null) {
                alert("Response with null value");
            }
            let respuesta = JSON.parse(resp);

            MostrarMensajeRespuesta(respuesta);

            if (salir)
                RetrocederPaginaMVC();

            g_datosPlantilla.ModificadoGruposAsociados = false;
        }
    });
}



function MostrarMensajeRespuesta(respuesta) {
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



function AltaGruposACD() {
    $('#ModalAsignaGrupos').modal('show');
}


function CheckTodosCaja(idCheck, idCaja) {
    var check = document.getElementById(idCheck);
    var ul = document.getElementById(idCaja);

    var inputs = ul.getElementsByTagName('input');
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "checkbox") {
            inputs[i].checked = check.checked;
        }
    }
}


function BuscaGruposEnLista(idDatos, inputGroup) {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById(inputGroup);
    filter = input.value.toUpperCase();
    ul = document.getElementById(idDatos);
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


function AsignaGrupo(grupoId, nombreGrupo) {

    let intGrupoId = parseInt(grupoId, 10);

    let grupo = g_gruposACD.find(gr => gr.Id === intGrupoId);
    if (grupo) {
        grupo.Pertenece = true;

        g_datosPlantilla.GruposACD = [...g_datosPlantilla.GruposACD, grupo];

        // Elimino del otro lado. Debo eliminarlo ates de volverlo a incluir en el otro lado
        $("#lia_" + grupoId).remove();

        let liCommand = "<li id='liu_" + grupo.Id + "' class='list-group-item' ondblclick='DesasignaGrupo(" + grupo.Id + ",\"" + nombreGrupo + "\")'> " +
                        "  <input type='checkbox' id='chk_" + grupo.Id + "' name='chk_" + grupo.Id + "' onclick='CheckLiAsociado(this.id);' /> " +
                        "    &nbsp;&nbsp;<span id='spn_" + grupo.Id + "'><b>  " + nombreGrupo + "</b></span> " +
                        "</li>";
        // Añado el comando
        $("#ul_siasociados").append(liCommand);
    }
}

function DesasignaGrupo(grupoId, nombreGrupo) {

    let intGrupoId = parseInt(grupoId, 10);

    let grupo = g_gruposACD.find(gr => gr.Id === intGrupoId);
    if (grupo) {
        grupo.Pertenece = false;

        // Elimino el que tenga el intGrupoId
        g_datosPlantilla.GruposACD = $.grep(g_datosPlantilla.GruposACD, function (e) {
            return e.id != intGrupoId;
        });

        for (let x = 0; x < g_datosPlantilla.GruposACD.length; x++) {
            const grPlantilla = g_datosPlantilla.GruposACD[x];
            if (grPlantilla.Id === grupo.Id) {
                g_datosPlantilla.GruposACD.splice(x, 1);
                // Elimino del otro lado
                $("#liu_" + grupoId).remove();

                let liCommand = "<li id='lia_" + grupo.Id + "' class='list-group-item' ondblclick='AsignaGrupo(" + grupo.Id + ",\"" + nombreGrupo + "\")'> " +
                    "  <input type='checkbox' id='chk_" + grupo.Id + "' name='chk_" + grupo.Id + "' onclick='CheckLiAsociado(this.id);' /> " +
                    "    &nbsp;&nbsp;<span id='spn_" + grupo.Id + "'><b>  " + nombreGrupo + "</b></span> " +
                    "</li>";
                // Añado el comando
                $("#ul_noasociados").append(liCommand);

                break;
            }
        }
    }
}


function AsignaSeleccionados() {
    // obtenemos los checkboxes seleccionados para asegurarnos que hay alguno marcado, sino no se hace nada
    let listCheckItems = $("#ul_noasociados input[type=checkbox]:checked");

    if (listCheckItems === null || listCheckItems.length === 0) {
        alert("@ConfigResources.grupoNoSeleccionado");
        return;
    }

    // Desmarco el check de todos si está marcado
    let checkTodos = document.getElementById('IdCheckNoAsignados');
    checkTodos.checked = false;

    listCheckItems.each(function () {
        let id = $(this).attr("id");
        id = id.substr(4);
        let nombreGrupo = $('#spn_' + id).text();
        AsignaGrupo(id, nombreGrupo);
    });
}

function DesasignaSeleccionados() {
    // obtenemos los checkboxes seleccionados para asegurarnos que hay alguno marcado, sino no se hace nada
    let listCheckItems = $("#ul_siasociados input[type=checkbox]:checked");

    if (listCheckItems === null || listCheckItems.length === 0) {
        alert("@ConfigResources.grupoNoSeleccionado");
        return;
    }

    // Desmarco el check de todos si está marcado
    let checkTodos = document.getElementById('IdCheckSiAsignados');
    checkTodos.checked = false;

    listCheckItems.each(function () {
        let id = $(this).attr("id");
        id = id.substr(4);
        let nombreGrupo = $('#spn_' + id).text();
        DesasignaGrupo(id, nombreGrupo);
    });
}

function ModalAceptar() {
    $('#ModalAsignaGrupos').modal('hide');
    const idPlantilla = $("#identificadorPlantilla").val();

    let htmlgrupos = "";
    g_datosPlantilla.GruposACD = [];

    for (let i = 0; i < g_gruposACD.length; i++) {
        let item = g_gruposACD[i];

        if (item.Pertenece) {
            htmlgrupos += '<li id="gr_' + item.Id + '" class="liGrupo"> ' +
                '    <a onclick="AvanzaPagina("Plantillas/EditarPlantilla?identificador=' + idPlantilla + '","GrupoAtencion.aspx?id=' + item.Id + '" );" class="hipervinculoAzul" style = "margin-right: 20px;cursor: pointer;" > ' + item.Nombre + '</a > ' +
                '    <button type="button" style="padding: 4px 5px;border: none; background-color: inherit;cursor: pointer;" onclick="EliminaGrupoACD(' + item.Id + ')"> ' +
                '        <span class="fa fa-trash-o" style="color:darkred;" ></span> ' +
                '    </button > ' +
                '</li>';

            if (g_datosPlantilla.GruposACD.find(gr => gr.Id === item.Id) !== null)
                g_datosPlantilla.GruposACD.push({ "Id": item.Id, "Nombre": item.Nombre });
        }
    }

    g_datosPlantilla.ModificadoGruposAsociados = true; 

    $("#listaGruposACD").html(htmlgrupos);
    $("#botonera").css('display', 'block');
}




function CheckLiAsociado(id) {
    let checkTodosAsignados = document.getElementById('IdCheckSiAsignados');
    let checkLi = document.getElementById(id);
    if (checkTodosAsignados.checked && !checkLi.checked) {
        checkTodosAsignados.checked = false;
    }
    else {
        if (checkLi.checked) {
            // Miro si todos los check están marcados en ese caso pongo el de todos también
            var todosmarcados = true;
            ul = document.getElementById("ul_siasociados");
            var inputs = ul.getElementsByTagName('input');
            for (i = 0; i < inputs.length; i++) {
                if (inputs[i].type == "checkbox" && !inputs[i].checked) {
                    todosmarcados = false;
                }
            }

            if (todosmarcados) {
                checkTodos.checked = true;
            }
        }
    }
}

function CheckLiNoAsociado(id) {
    var checkTodos = document.getElementById('IdCheckNoAsignados');
    var checkLi = document.getElementById(id);
    if (checkTodos.checked && !checkLi.checked) {
        checkTodos.checked = false;
    }
    else {
        if (checkLi.checked) {
            // Miro si todos los check están marcados en ese caso pongo el de todos también
            var todosmarcados = true;
            ul = document.getElementById("ul_noasociados");
            var inputs = ul.getElementsByTagName('input');
            for (i = 0; i < inputs.length; i++) {
                if (inputs[i].type == "checkbox" && !inputs[i].checked) {
                    todosmarcados = false;
                }
            }

            if (todosmarcados) {
                checkTodos.checked = true;
            }
        }
    }
}


function MostrarOcultarGruposServicio() {
    const idServicioSeleccionado = $("#servicioExterno").val();

    // obtengo todos los componentes de los no seleccionados
    const liNoSelecc = document.querySelectorAll(".noSeleccionados");
    if (liNoSelecc !== null && liNoSelecc !== undefined) {
        for (let i = 0; i < liNoSelecc.length; i++) {
            const idLi = liNoSelecc[i].id;
            const idGrupo = idLi.substring(4);
            const idServicioGrupo = $("#servicio_" + idGrupo).val();
            if (idServicioGrupo !== idServicioSeleccionado) 
                liNoSelecc[i].style.display = "none";
            else
                liNoSelecc[i].style.display = "block";
        }
    }
}


function AddParameter() {
    const text = "{{varParam" + (++g_datosPlantilla.CantParametros) + "}} ";

    let textarea = document.getElementById('mensajePlantilla');
    const position = textarea.selectionStart;

    // Get the text before and after the cursor position
    const before = textarea.value.substring(0, position);
    const after = textarea.value.substring(position, textarea.value.length);

    // Insert the new text at the cursor position
    textarea.value = before + text + after;

    // Set the cursor position to after the newly inserted text
    textarea.selectionStart = textarea.selectionEnd = position + text.length;
}