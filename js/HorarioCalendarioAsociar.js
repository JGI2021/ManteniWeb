

function BuscaGruposSinAsociarEnLista(tab) {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInputGroupNo" + tab);
    filter = input.value.toUpperCase();
    ul = document.getElementById("ul_noasociados" + tab);
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


function BuscaGruposAsociadosEnLista(tab) {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInputGroupSi" + tab);
    filter = input.value.toUpperCase();
    ul = document.getElementById("ul_siasociados" + tab);
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


function CheckLiAsociado(id, tab) {
    var checkTodos = document.getElementById('IdCheckAsignados' + tab);
    var checkLi = document.getElementById(id);
    if (checkTodos.checked && !checkLi.checked) {
        checkTodos.checked = false;
    }
    else {
        if (checkLi.checked) {
            // Miro si todos los check están marcados en ese caso pongo el de todos también
            var todosmarcados = true;
            ul = document.getElementById("ul_siasociados" + tab);
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

/// Asignar los grupos asignados al grupo horario editado
function AsignaSeleccionados(tab) {
    var idhorario = $('#hidd_idhorario').val();
    if (idhorario === null || idhorario === "") {
        alert("No se ha encontrado ningún identificador de horario al que asignar los grupos ");
        return;
    }

    var idsDatos = "";
    var nombresIdsSeleccionados = "";

    var listCheckItems = $("#ul_noasociados" + tab + " input[type=checkbox]:checked");

    if (listCheckItems === null || listCheckItems.length === 0) {
        alert("No se ha seleccionado ningún grupo al que asignar el horario");
        return;
    }

    // Desmarco el check de todos si está marcado
    var checkTodos = document.getElementById('IdCheckNoAsignados' + tab);
    checkTodos.checked = false;

    $(listCheckItems).each(function () {
        if (this.checked) {
            var id = $(this).attr("id");
            // Elimino los primeros caracteres para quedarme 
            id = id.substr(7);

            if (idsDatos === "") {
                idsDatos = id;
            }
            else {
                idsDatos += ',' + id;
            }
            // Obtengo el nombre del grupo
            liid = $(this).attr("id");
            // Le quito el prefijo chk y le añado el de li para encontrar el registro que busco
            liid = 'spn' + liid.substr(3);

            if (nombresIdsSeleccionados == '')
                nombresIdsSeleccionados += $('#' + liid).text().trim();
            else 
                nombresIdsSeleccionados += ',' + $('#' + liid).text().trim();
        }
    });

    // Obtengo el identificador de horario al que se van a asociar
    var idhorario = $('#hidd_idhorario').val();
    // Parámetros quee envía a la función
    var params;

    let url = "";


    url = getRutaAbsolutaMVC() + "/Horario/SaveCalendariosHorario";
     params = { 'idschedule': idhorario, 'idsdatos': idsDatos };

    $.when(
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(params),
            contentType: "application/json; charset=utf-8",
            async: false,
            cache: false,
            timeout: 5000,
            success: function (data) {
                const respuesta = JSON.parse(data);
                if (respuesta.error === "S") {
                    $('#alerta').removeClass('myAlertSuccess');
                    $('#alerta').addClass('alert-danger');
                    $('#alert-mensaje').html("<b><span class='fa fa-exclamation-triangle' style='font-size:26px;' >Error</span> </b><span class='mr-15'></span>" + respuesta.mensaje);
                }
                else {
                    /// Mostramos mensaje de que todo se ha actualizado perfectamente
                    $('#alert-mensaje').html("<b><span class='fa fa-check-square-o fondoAlert' > </span> </b><span class='mr-15'></span> El horario semanal se ha actualizado correctamente");
                    $('#alerta').removeClass('alert-danger');
                    $('#alerta').addClass('myAlertSuccess');
                    AsociaGrupoAHorario(idsDatos, nombresIdsSeleccionados, tab);
                }
                
                // Se muestra el panel que indica si ha ido bien o si ha fallado
                $('#alerta').css('display', 'block');
                // Se mantien por 6 segundos, luego se quita
                setTimeout(function () { $('#alerta').css('display', 'none'); }, 4000);
            }, error: function (e) { console.log(e); }
        })
    ).done();

}


/// Mueve los registros del grupo de no asignados al de asignados.
function AsociaGrupoAHorario(ids, nombresIds, tab) {
    /// Paso la cadena de Ids a un array
    var arrayIds = ids.split(',');
    /// Paso los nombres a array
    var arrayNombres = nombresIds.split(',');
    // Leo el array y creo los registros
    $.each(arrayIds, function (index, value) {
        var newreg = "<li id='li" + tab + "_" + value + "' class='list-group-item'> " +
            "   <input type='checkbox' id='chk" + tab + "_" + value + "' name='chk" + tab + "_" + value + "' onclick='CheckLiAsociado(this.id, \"" + tab + "\");' /> " +
                     "   &nbsp;&nbsp;<span><b>  " + arrayNombres[index] + "</b></span> " + 
                     "</li> "; 

        // Elimino el registro
        $('#li' + tab + '_' + value).remove();

        // Ahora lo asocio al nuevo UL
        $('#ul_siasociados' + tab).append(newreg);
    });
}




function DesasignaSeleccionados(tab) {
    var idhorario = $('#hidd_idhorario').val();
    if (idhorario === null || idhorario === "") {
        alert("No se ha encontrado ningún identificador de horario al que desasignar los grupos ");
        return;
    }

    var idsDatos = "";
    var nombresIdsSeleccionados = "";

    var listCheckItems = $("#ul_siasociados" + tab + " input[type=checkbox]:checked");

    if (listCheckItems === null || listCheckItems.length === 0) {
        alert("No se ha seleccionado ningún grupo al que desasignar el horario");
        return;
    }

    // Desmarco el check de todos si está marcado
    var checkTodos = document.getElementById('IdCheckAsignados' + tab);
    checkTodos.checked = false;

    // Obtenemos grupos y nombres seleccionados
    $(listCheckItems).each(function () {
        if (this.checked) {
            var id = $(this).attr("id");
            // Elimino los primeros caracteres para quedarme 
            id = id.substr(7);

            if (idsDatos === "") {
                idsDatos = id;
            }
            else {
                idsDatos += ',' + id;
            }
            // Obtengo el nombre del grupo
            liid = $(this).attr("id");
            // Le quito el prefijo chk y le añado el de li para encontrar el registro que busco
            liid = 'li' + liid.substr(3);

            if (nombresIdsSeleccionados == '')
                nombresIdsSeleccionados += $('#' + liid).text().trim();
            else
                nombresIdsSeleccionados += ',' + $('#' + liid).text().trim();
        }
    });

    // al desasignarlo le ponemos el de por defecto que en base de datos debe ser null
    var idhorario = $('#hidd_idhorario').val();
    // Parámetros quee envía a la función
    var params = { 'idsCalendarios': idsDatos };

    let url = getRutaAbsolutaMVC() + "/Horario/SaveHorarioPorDefectoEnCalendario";
   

    $.when(
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(params),
            contentType: "application/json; charset=utf-8",
            async: false,
            cache: false,
            timeout: 5000,
            success: function (data) {
                const respuesta = JSON.parse(data);
                if (respuesta.error === "S") {
                    $('#alerta').removeClass('myAlertSuccess');
                    $('#alerta').addClass('alert-danger');
                    $('#alert-mensaje').html("<b><span class='fa fa-exclamation-triangle' style='font-size:26px;' >Error</span> </b><span class='mr-15'></span>" + respuesta.mensaje);
                }
                else {
                    /// Mostramos mensaje de que todo se ha actualizado perfectamente
                    $('#alert-mensaje').html("<b><span class='fa fa-check-square-o fondoAlert' > </span> </b><span class='mr-15'></span> El horario semanal se ha actualizado correctamente");
                    $('#alerta').removeClass('alert-danger');
                    $('#alerta').addClass('myAlertSuccess');
                    DesAsociaGrupoAHorario(idsDatos, nombresIdsSeleccionados, tab);
                }

                // Se muestra el panel que indica si ha ido bien o si ha fallado
                $('#alerta').css('display', 'block');
                // Se mantien por 6 segundos, luego se quita
                setTimeout(function () { $('#alerta').css('display', 'none'); }, 4000);
                if (data === null) {
                    alert('Se ha producido un error al recuperar los datos de actualización ');
                }
            }, error: function (e) { console.log(e); }
        })
    ).done();
}




/// Mueve los registros del grupo de no asignados al de asignados.
function DesAsociaGrupoAHorario(ids, nombresIds, tab) {
    /// Paso la cadena de Ids a un array
    var arrayIds = ids.split(',');
    /// Paso los nombres a array
    var arrayNombres = nombresIds.split(',');

    var NombreHorarioSubsistema = $('#hidd_nombreidsubsistema').val();

    // Leo el array y creo los registros
    $.each(arrayIds, function (index, value) {
        var newreg = "<li id='li" + tab + "_" + value + "' class='list-group-item'> " +
            "    <input type='checkbox' id='chk" + tab + "_" + value + "' name='chk" + tab + "_" + value + "' onclick='CheckLiNoAsociado(this.id, \"" + tab + "\");' /> " +
            "    &nbsp;&nbsp;<span id='spn" + tab + "_" + value + "'><b>  " + arrayNombres[index] + "</b><span> &nbsp;&nbsp;(" + NombreHorarioSubsistema + ")</span></li> ";

        // Elimino el registro
        $('#li' + tab + '_' + value).remove();

        // Ahora lo asocio al nuevo UL
        $('#ul_noasociados' + tab).append(newreg);
    });
}



