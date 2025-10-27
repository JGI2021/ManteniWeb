//////////////////////////////////////////////////////////////////////////////
//// FUNCIONES DE CALENDARIO
/////////////////////////////////////////////////////////////////////////////

/// SELECT con los hrarios. Se cambia la selección del combo
function MostrarHorario() {
    // Obtener la opción seleccionada, y obtengo el identificador de horario
    var s = document.getElementById("SelectHorario");
    var idhorario = s.options[s.selectedIndex].value;
    /// parámetros que se van a invocar para buscar los datos del nuevo horario
    var params = { "idhorario": idhorario };
    /// urlo que se llama
    url = getAbsolutePath() + "/Calendario.aspx/GetDatosHorario";
    /// Busco los datos del nuevo horario seleccionado
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
                if (data === null) {
                    alert('Se ha producido un error al los datos del horario seleccionado ');
                }
                var result = $.parseJSON(data.d);
                if (result !== 'KO') {
                    $('#HtmlFilaHorario').html(result);
                }
                else
                    alert(result);
            }, error: function (e) { console.log(e); }
        })
    ).done();
}






///
/// Mueve los registos de días que no pertenecen al calendario a la caja de días que si pertenecen al calendario
///
function AsociaDiaACalendario(tab) {

    var idsDatos = "";
    var nombresIdsSeleccionados = "";
    var IdsNoSeleccionados = "";

    // Miro si se ha marcado al menos un checkbox, si no es así no hacemos nada
    var listCheckItems = $("#ul_noasociados" + tab + " input[type=checkbox]:checked");

    if (listCheckItems === null || listCheckItems.length === 0) {
        alert("No se ha seleccionado ningún día que asignar al calendario");
        return;
    }

    // Obtengo todos los checkbox, tanto los marcados como los no marcados
    listCheckItems = $("#ul_noasociados" + tab + " input[type=checkbox]");

    // Desmarco el check de todos si está marcado
    var checkTodos = document.getElementById('IdCheckNoAsignados' + tab);
    checkTodos.checked = false;

    $(listCheckItems).each(function () {
        var id = $(this).attr("id");
        // Elimino los primeros caracteres para quedarme 
        id = id.substr(7);

        if (this.checked) {            
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

            if (nombresIdsSeleccionados == '') {
                nombresIdsSeleccionados += $('#' + liid).text().trim();
            }
            else {
                nombresIdsSeleccionados += ',' + $('#' + liid).text().trim();
            }
        }
        else {
            if (IdsNoSeleccionados == '') {
                IdsNoSeleccionados += id;
            }
            else {
                IdsNoSeleccionados += ',' + id;
            }
        }        
    });

    // Paso los seleccionados 
    var seleccionadosHidd = $('#hidd_diasseleccionados').val();
    if (seleccionadosHidd != "") {
        seleccionadosHidd += "," + idsDatos;
    }
    else {
        seleccionadosHidd += idsDatos;
    }

    $('#hidd_diasseleccionados').val(seleccionadosHidd);
    // Relleno los no seleccionados
    $('#hidd_diasnoseleccionados').val(IdsNoSeleccionados);

    /// Paso la cadena de Ids a un array
    var arrayIds = idsDatos.split(',');
    /// Paso los nombres a array
    var arrayNombres = nombresIdsSeleccionados.split(',');
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


///
/// Desasocia uno o varios días del calendario
/// 
function DesasociaDiaDeCalendario(tab) {
    
    var idsDatos = "";
    var nombresIdsSeleccionados = "";
    var IdsNoSeleccionados = "";

    // Miramos si algún checkbox está marcado; si no es así no hacemos nada
    var listCheckItems = $("#ul_siasociados" + tab + " input[type=checkbox]:checked");

    if (listCheckItems === null || listCheckItems.length === 0) {
        alert("No se ha seleccionado ningún día al que desasignar del calendario");
        return;
    }

    // Lista de todos los checkboxes
    var listCheckItems = $("#ul_siasociados" + tab + " input[type=checkbox]");

    // Desmarco el check de todos si está marcado
    var checkTodos = document.getElementById('IdCheckAsignados' + tab);
    checkTodos.checked = false;

    // Obtenemos grupos y nombres seleccionados
    $(listCheckItems).each(function () {
        var id = $(this).attr("id");
        // Elimino los primeros caracteres para quedarme 
        id = id.substr(7);

        if (this.checked) {            

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
        else {
            if (IdsNoSeleccionados == '') {
                IdsNoSeleccionados += id;
            }
            else {
                IdsNoSeleccionados += ',' + id;
            }
        }
    });

    // Paso los seleccionados al campo oculot de no seleccionado
    var noseleccionadosHidd = $('#hidd_diasnoseleccionados').val();
    if (noseleccionadosHidd != "") {
        noseleccionadosHidd += "," + idsDatos;
    }
    else {
        noseleccionadosHidd += idsDatos;
    }
    $('#hidd_diasnoseleccionados').val(noseleccionadosHidd).val();
    // Relleno los seleccionados
    $('#hidd_diasseleccionados').val(IdsNoSeleccionados).val();

    /// Paso la cadena de Ids a un array
    var arrayIds = idsDatos.split(',');
    /// Paso los nombres a array
    var arrayNombres = nombresIdsSeleccionados.split(',');
    
    // Leo el array y creo los registros
    $.each(arrayIds, function (index, value) {
        var newreg = "<li id='li" + tab + "_" + value + "' class='list-group-item'> " +
            "    <input type='checkbox' id='chk" + tab + "_" + value + "' name='chk" + tab + "_" + value + "' onclick='CheckLiNoAsociado(this.id, \"" + tab + "\");' /> " +
            "    &nbsp;&nbsp;<span id='spn" + tab + "_" + value + "'><b>  " + arrayNombres[index] + "</b></li> ";

        // Elimino el registro
        $('#li' + tab + '_' + value).remove();

        // Ahora lo asocio al nuevo UL
        $('#ul_noasociados' + tab).append(newreg);
    });
}

///
/// Guarda los datos del calendario en base de datos
///
function GuardarCalendario(salir) {
   /// obtenemos el identificador del calendario
    var idcalendario = $('#hidd_calendario').val();
    /// obtenemos los datos de los campos del calendario
    var nombrecalendario = $('#NombreCalendario').val();
    /// Obtengo el horario seleccionado
    var idhorario = $('#SelectHorario').val();
    /// Miro si el check del mensaje de fuera de hora está marcado
    var mensaje = "";
    var check = document.getElementById('Cb_ComboConCheckMensaje');

    /// Si está marcado obtengo el mensaje
    if (!check.checked) {
        mensaje = $('#ComboConCheckMensaje').val();
    }

    // Obtengo los días asignados
    var diasasignados = $('#hidd_diasseleccionados').val();


    if (idcalendario == "0" || idcalendario == "") {
        var params = {
            "nombrecalendario": nombrecalendario, "idhorario": idhorario, "mensaje": mensaje, "diasasignados": diasasignados
        };

        AltaDeCalendario(params);
    }
    else {
        var params = {
            "idcalendario": idcalendario, "nombrecalendario": nombrecalendario, "idhorario": idhorario,
            "mensaje": mensaje, "diasasignados": diasasignados
        };

        ModificarCalendario(params);
    }

    if (salir)
        RetrocederPagina();

}


///
/// Da de alta un calendario en base de datos
///
function AltaDeCalendario(params) {

    var url = getAbsolutePath() + "/Calendario.aspx/AltaDeCalendario";

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
                if (data === null) {
                    alert('Se ha producido un error al dar de alta el calendario ');
                }
                var result = $.parseJSON(data.d);
                if (result.substring(0,2) !== 'KO') {
                    // Guardo el identificador que se ha dado al calendario
                    $('#hidd_calendario').val(result);
                    $('.tabs-asignaciones').css('display', 'inline-block');
                    alert('El calendario se ha dado de alta');
                }
                else
                    alert(result);
               
            }, error: function (e) { console.log(e); }
        })
    ).done();
}


///
/// Modificar los datos de un calendario en base de datos
///
function ModificarCalendario(params) {
    var url = getAbsolutePath() + "/Calendario.aspx/ModificaCalendario";

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
                if (data === null) {
                    alert('Se ha producido un error al dar de alta el calendario ');
                }
                var result = $.parseJSON(data.d);
                if (result.substring(0,2) !== 'KO') {
                    // Guardo el identificador que se ha dado al calendario
                    alert('El calendario se ha actualizado');
                }
                else
                    alert(result);
            }, error: function (e) { console.log(e); }
        })
    ).done();

}


///
/// Asignar los grupos, campañas o listas asignados al calendario
///
function AsignaSeleccionadosACalendario(tab) {
    /// obtenemos el identificador del calendario
    let idcalendario = $('#hidd_calendario').val();

    if (idcalendario === null || idcalendario === "") {
        alert("No se ha encontrado ningún identificador de calendario al que asignar los grupos ");
        return;
    }

    let idsDatos = "";
    let nombresIdsSeleccionados = "";

    // obtenemos los checkboxes seleccionados para asegurarnos que hay alguno marcado, sino no se hace nada
    let listCheckItems = $("#ul_noasociados" + tab + " input[type=checkbox]:checked");

    if (listCheckItems === null || listCheckItems.length === 0) {
        alert("No se ha seleccionado ningún grupo al que asignar el calendario");
        return;
    }

    // Desmarco el check de todos si está marcado
    let checkTodos = document.getElementById('IdCheckNoAsignados' + tab);
    checkTodos.checked = false;

    // Busco dentro de los no asignados todos los que se han seleccionado para pasarlos al de seleccionados
    $(listCheckItems).each(function () {
        let id = $(this).attr("id");
        // Elimino los primeros caracteres para quedarme 
        id = id.substr(7);

        if (this.checked) {

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

    
    let url = getAbsolutePath() + "/Calendario.aspx/AsociarCalendario";
    let params = { 'idcalendario': idcalendario, 'idsasociados': idsDatos, 'tipo': tab };
 
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
                if (data === null) {
                    alert('Se ha producido un error actualizar los datos ');
                }
                let result = $.parseJSON(data.d);
                if (result.includes('KO')) {
                    alert(result);
                }
                else {
                    AsociaGrupoAHorario(idsDatos, nombresIdsSeleccionados, tab);
                    ShowAlert("Resgistros asignados correctamente." + result, 3500);
                }
                    
            }, error: function (e) { console.log(e); }
        })
    ).done();

}


/// Mueve los registros del grupo de no asignados al de asignados.
function AsociaGrupoAHorario(ids, nombresIds, tab) {
    // Nombre del calendario actual
    var nombreCalendario = $('#hidd_CalendarioActual').val();
    /// Paso la cadena de Ids a un array
    var arrayIds = ids.split(',');
    /// Paso los nombres a array
    var arrayNombres = nombresIds.split(',');
    // Leo el array y creo los registros
    $.each(arrayIds, function (index, value) {
        var newreg = "<li id='li" + tab + "_" + value + "' class='list-group-item'> " +
            "   <input type='checkbox' id='chk" + tab + "_" + value + "' name='chk" + tab + "_" + value + "' onclick='CheckLiAsociado(this.id, \"" + tab + "\");' /> " +
//            "   &nbsp;&nbsp;<span><b>  " + arrayNombres[index] + "</b></span> " +
            "   &nbsp;&nbsp;<span id='spn" + tab + "_" + value + "'><b>  " + arrayNombres[index] + "</b></span><span> &nbsp;&nbsp;(" + nombreCalendario + ")</span></li> ";
            "</li> ";

        // Elimino el registro
        $('#li' + tab + '_' + value).remove();

        // Ahora lo asocio al nuevo UL
        $('#ul_siasociados' + tab).append(newreg);
    });
}




function DesasignaSeleccionadosACalendario(tab) {

    var idsDatos = "";
    var nombresIdsSeleccionados = "";
    // Comprobamos que haya al menos un checkbox seleccionado
    var listCheckItems = $("#ul_siasociados" + tab + " input[type=checkbox]:checked");

    if (listCheckItems === null || listCheckItems.length === 0) {
        alert("No se ha seleccionado ningún grupo al que desasignar el calendario");
        return;
    }

    // Desmarco el check de todos si está marcado
    var checkTodos = document.getElementById('IdCheckAsignados' + tab);
    checkTodos.checked = false;

    // Obtenemos grupos y nombres seleccionados
    $(listCheckItems).each(function () {
        var id = $(this).attr("id");
        // Elimino los primeros caracteres para quedarme 
        id = id.substr(7);
        if (this.checked) {
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

    // Parámetros quee envía a la función
    var params = { 'idsdesasignados': idsDatos, 'tipo': tab };


    var url = getAbsolutePath() + "/Calendario.aspx/DesasignarCalendario";


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
                if (data === null) {
                    alert('Se ha producido un error al desasignar el calendario de los elementos ');
                }
                var result = $.parseJSON(data.d);
                if (result.includes('KO')) {
                    alert(result);
                }
                else {
                    DesAsociaGrupoAHorario(idsDatos, nombresIdsSeleccionados, tab);
                    ShowAlert("Resgistros desasignados correctamente." + result, 3500);
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
            "    &nbsp;&nbsp;<span id='spn" + tab + "_" + value + "'><b>  " + arrayNombres[index] + "</b></span><span> &nbsp;&nbsp;(" + NombreHorarioSubsistema + ")</span></li> ";

        // Elimino el registro
        $('#li' + tab + '_' + value).remove();

        // Ahora lo asocio al nuevo UL
        $('#ul_noasociados' + tab).append(newreg);
    });
}




function ShowAlert(msg, tiempo) {
    $('#alertsuccess').css('opacity', '1');
    $('#alertsuccess').css('display', 'block');
    $('#MensajeAlertSuccess').text("Atencion! " + msg);
    window.setTimeout(function () {
        $('#alertsuccess').fadeTo(500, 0).slideUp(500, function () {

            $('#alertsuccess').css('display', 'none');
        });
    }, tiempo);
}