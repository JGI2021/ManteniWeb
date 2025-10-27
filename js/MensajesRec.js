/// ---------------------------------------------------------------------
/// Muestra el mensaje de alerta y el mensaje de respuesta del servidor
/// ---------------------------------------------------------------------
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

function EliminaFilasTabla() {
    let idsSeleccionados = $("#idsSeleccionados").val();
    let arrIds = idsSeleccionados.split(",");

    for (let i = 0; i < arrIds.length; i++) {
        let id = arrIds[i];
        $("#tr_" + id).remove();
    }
}


function NuevoRegistro() {
    AvanzarPagina('Plantillas/GetMensajesRecurrentes', 'Plantillas/GetDatosMensajePorId?identificador=0');
}

function EditarRegistro() {
    let idSeleccionado = $("#idsSeleccionados").val();
    AvanzarPagina('Plantillas/GetMensajesRecurrentes', 'Plantillas/GetDatosMensajePorId?identificador=' + idSeleccionado);
}

function CheckLiAsociado(id) {
    var checkTodos = document.getElementById('IdCheckAsignados');
    var checkLi = document.getElementById(id);
    if (checkTodos.checked && !checkLi.checked) {
        checkTodos.checked = false;
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


function CheckLiNoAsociado(id, tab) {
    var checkTodos = document.getElementById('IdCheckNoAsignados' + tab);
    var checkLi = document.getElementById(id);
    if (checkTodos.checked && !checkLi.checked) {
        checkTodos.checked = false;
    }
    else {
        if (checkLi.checked) {
            // Miro si todos los check están marcados en ese caso pongo el de todos también
            var todosmarcados = true;
            ul = document.getElementById("ul_noasociados" + tab);
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

function CloseAlert() {
    $('#alerta').css('display', 'none');
}

function ModificaCampoComando() {
    if ($('#comando').val() === '') {
        let comando = $('#aliasMensaje').val();
        // le quito los espacios
        comando = comando.replace(/ /g, "");
        $('#comando').val('#' + comando);
    }
}

function GuardarDatos(salir) {

    if (!ValidaDatos()) {
        return;
    }

    let dataForm = $("#formDataMensajeria").serialize();

    let param = { "datosMensaje": g_mensajeRecurrente };
    //            var datosForm = new FormData();

    $.ajax({
        url: getRutaAbsolutaMVC() + "/Plantillas/GuardarMensajeRecurrente", // + ?dataForm,
        type: "POST",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        async: false,
        cache: false,
        timeout: 5000,
        success: function (resp) {
            if (resp === null) {
                alert("Response cames with null value");
            }
            let respuesta = JSON.parse(resp);

            MostrarMensajeRespuesta(respuesta);

            if (salir)
                RetrocederPaginaMVC();
        }
    });
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


function AsignaGrupo(grupoId) {
    // pasa el grupo a entero
    const iIdGrupo = parseInt(grupoId, 10);

    let grupo = g_gruposACD.find(gr => gr.Id === iIdGrupo);
    if (grupo) {
        grupo.Pertenece = true;

        g_mensajeRecurrente.GruposACD = [...g_mensajeRecurrente.GruposACD, grupo];

        // Elimino del otro lado. Debo eliminarlo ates de volverlo a incluir en el otro lado
        $("#li_" + grupoId).remove();

        let liCommand = "<li id='li_" + grupo.Id + "' class='list-group-item' ondblclick='DesasignaGrupo(" + grupo.Id + ",\"" + grupo.Nombre + "\")'> " +
            "  <input type='checkbox' id='chk_" + grupo.Id + "' name='chk_" + grupo.Id + "' onclick='CheckLiAsociado(this.id);' /> " +
            "    &nbsp;&nbsp;<span id='spn_" + grupo.Id + "'><b>  " + grupo.Nombre + "</b></span> " +
            "</li>";
        // Añado el comando
        $("#ul_siasociados").append(liCommand);
    }
}

function DesasignaGrupo(grupoId) {
    // pasa el grupo a entero
    const iIdGrupo = parseInt(grupoId, 10);

    let grupo = g_gruposACD.find(gr => gr.Id === iIdGrupo);
    if (grupo) {
        grupo.Pertenece = false;

        var index = g_mensajeRecurrente.GruposACD.indexOf(grupo);
        if (index > -1) {
            g_mensajeRecurrente.GruposACD.splice(index, 1);
        }

        // Elimino del otro lado
        $("#li_" + grupoId).remove();

        let liCommand = "<li id='li_" + grupo.Id + "' class='list-group-item' ondblclick='AsignaGrupo(" + grupo.Id + ",\"" + grupo.Nombre + "\")'> " +
            "  <input type='checkbox' id='chk_" + grupo.Id + "' name='chk_" + grupo.Id + "' onclick='CheckLiAsociado(this.id);' /> " +
            "    &nbsp;&nbsp;<span id='spn_" + grupo.Id + "'><b>  " + grupo.Nombre + "</b></span> " +
            "</li>";
        // Añado el comando
        $("#ul_noasociados").append(liCommand);

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
        AsignaGrupo(id);
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
        DesasignaGrupo(id);
    });
}

function ModalAceptar() {
    $('#ModalAsignaGrupos').modal('hide');

    let htmlgrupos = "";
    for (let i = 0; i < g_mensajeRecurrente.GruposACD.length; i++) {
        let item = g_mensajeRecurrente.GruposACD[i];

        htmlgrupos += '<li id="gr_' + item.Id + '" class="liGrupo"> ' +
            '    <a onclick="AvanzaPagina();" class="hipervinculoAzul" style="margin-right: 20px;cursor: pointer;">' + item.Nombre + '</a> ' +
            '    <button type="button" style="padding: 4px 5px; border: none; background-color: inherit; cursor: pointer;" onclick="EliminarGrupo(' + item.Id + ')"> ' +
            '        <span class="fa fa-trash-o" style="color:darkred;cursor: pointer;" ></span> ' +
            '    </button > ' +
            '</li>';
    }

    $("#listaGruposACD").html(htmlgrupos);

}

function ElimiarGrupo(id) {
    Swal.fire({
        title: "Eliminar",
        text: "Esto y lo otro",
        icon: "warning",
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
            
            const pos = g_datosPlantilla.GruposACD.findindex(gr => gr.Id === item.Id);
            if (pos > -1) {
                g_datosPlantilla.GruposACD.splice(pos, 1);
                $("#gr_" + id).remove();
            }

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