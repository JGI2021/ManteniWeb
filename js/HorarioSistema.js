

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

    var url = "";

    if (tab == '_cl') {
        url = getAbsolutePath() + "/HorarioSistema.aspx/SaveCalendariosHorario";
        params = { 'idschedule': idhorario, 'idsdatos': idsDatos, 'tipo': tab };
    }
    else {
        url = getAbsolutePath() + "/HorarioSistema.aspx/SaveGroupScheduleAsociation";
        params = { 'idschedule': idhorario, 'idgroups': idsDatos, 'tipo': tab };
    }

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
                    alert('Se ha producido un error al recuperar el nombre del prefijo de la tabla de telemarketer ');
                }
                var result = $.parseJSON(data.d);
                if (result === 'OK') {
                    AsociaGrupoAHorario(idsDatos, nombresIdsSeleccionados, tab);
                }
                else
                    alert(result);
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
    var params = { 'idgroups': idsDatos, 'tipo': tab };

    if (tab == '_cl') {
        url = getAbsolutePath() + "/HorarioSistema.aspx/SaveHorarioPorDefectoEnCalendario";
    }
    else {
        url = getAbsolutePath() + "/HorarioSistema.aspx/SaveGroupDefaultSchedule";
    }
    

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
                    alert('Se ha producido un error al recuperar el nombre del prefijo de la tabla de telemarketer ');
                }
                var result = $.parseJSON(data.d);
                if (result === 'OK') {
                    DesAsociaGrupoAHorario(idsDatos, nombresIdsSeleccionados, tab);
                }
                else
                    alert(result);
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


/////////////////////////////////////////
/// *****
/// ***** JS DE FORMULARIO DIAS FESTIVOS
/// *****
/////////////////////////////////////////
var contadorCtrl = 0;            // Contador de veces que se pulsa raton+ctrl
var idHourDesdeCtrl = '';        // valor del id de la priemra vez que se pulsó raton+ctrl
var contadorAlt = 0;            // Contador de veces que se pulsa raton+Alt
var idHourDesdeAlt = '';        // valor del id de la priemra vez que se pulsó raton+Alt
var teclapulsada = '';


function ActivaDesactivaHora(id) {
    // llega lbl_XXXX. Obtengo los 4 últimos dígitos
    var idcheck = id.substr(4);
    var bchecked = $('#' + idcheck).is(':checked');
    // Marca con color la casilla. Verde activo, rojo inactiva
    ActivarDesactivarRangoHora( bchecked, idcheck);
    /// Muestra el rango de horas en el formulario
    MuestraTextoFechasHorario();
}


function DameHorario(currentid, iscurrentchecked)
{
    var resultado = "Sin servicio";
    var minvalue = 0;
    var maxvalue = 0;

    var horariosAtencion = [];
    var hayHorario = false;
    var j = 0;
 
    for (var i = 0; i < 48; i++)
    {
        var id = DameIdentificador(i);

        var bchecked = false;

        if (id === currentid) {
            if (iscurrentchecked) {
                bchecked = true;
            }
        }
        else {
            bchecked = $('#' + id).is(':checked');
        }
    
        if (minvalue == 0 && bchecked) {
            minvalue = i;
            maxvalue = i;
            hayHorario = true;
        }
        else if (bchecked) {
            maxvalue = i;
            hayHorario = true;
        }
        else if (hayHorario && !bchecked) {
            horariosAtencion[j] = DameFechaDesdeHasta(minvalue, maxvalue);
            j++;
            hayHorario = false;
            minvalue = 0;
        }
        else if (hayHorario && bchecked) {
            maxvalue = i;
            horariosAtencion[j] = DameFechaDesdeHasta(minvalue, maxvalue);
            j++;
            hayHorario = false;
        }
    }

    if (minvalue == maxvalue && minvalue == 0) {
        resultado = "Sin servicio";
    }
    else {
        for (var i = 0; i < horariosAtencion.length; i++)
        {
            var horario = horariosAtencion[i];
            if (i == 0) {
                resultado =  horario;
            }
            else {
                resultado += " - " + horario;
            }
        }
    }
    return resultado;
}


/// ****************************************************************
/// *** A partir del parámetro de entrada (un valor entre 0 y 47) obtengo
/// *** el identificador de la tabla con los datos del rango horario que estamos tratando
/// ****************************************************************
function DameIdentificador(i) {
    var resultado = "";
    if (i % 2 == 0) {
        if (i < 19)
            resultado = "0" + (i / 2);
        else resultado = "" + (i / 2);

        resultado += "30";
    }
    else {
        if (i < 19)
            resultado = "0" + (Math.trunc(i / 2) + 1);
        else resultado = "" + (Math.trunc(i / 2) + 1);

        resultado += "00";
    }

    return resultado;
}


function DameFechaDesdeHasta(minvalue, maxvalue)
{
    var resultado = "";
    var auxminvalue = Math.trunc(minvalue / 2);
    var auxmaxvalue = Math.trunc(maxvalue / 2);

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


/// Cuando se desmarca el check de horario se desmarcan todos las horas del horario
function DesmarcaTodos() {
    for (var i = 0; i < 48; i++) {
        var id = DameIdentificador(i);
        $('#lbl_' + id).removeClass('active');
          //$('#lbl_' + id).click();
        $('#' + id).prop('checked', false);
    
        $('#lbl_' + id).removeClass('button_green');
        if (!$('#lbl_' + id).hasClass('button_red'))
            $('#lbl_' + id).addClass('button_red');
    }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////
/// Se ha pulsado el check de horario. Si se activa se muestra la selección de horas sino se oculta. 
/////////////////////////////////////////////////////////////////////////////////////////////////////
function PulsadoCheckHorario() {
    if ($('#CheckHorario').prop('checked')) {
        $('#HourButtonGroup').removeClass('div_NoVisible');        
    }
    else {
        CierraOpcionHorario();
    }
}


function CierraOpcionHorario() {
    if (!$('#HourButtonGroup').hasClass('div_NoVisible'))
        $('#HourButtonGroup').addClass('div_NoVisible');
    $('#TextoHorario').text("  ( Sin servicio ) ");
    $('#TextoHorario').removeClass('darkgreen_text');
    if (!$('#TextoHorario').hasClass('red_text')) {
        $('#TextoHorario').addClass('red_text');
    }
    DesmarcaTodos();
}


function MensajeFueraDeServicio_Onchange(xx) {
    var comboBox = $('#MensajeFueraDeServicio');
    var editBox = $('#CINFOMENSAJE');
    var editBoxContent = $('#InfoMensaje');
    if (comboBox.val() == '' || comboBox.val() == 'NULL') {
        if (editBox != null) {
            editBox.css('visibility', 'hidden');
            editBox.css('display', 'none');
        }
        comboBox.attr('title', 'Se necesita un valor');
        editBoxContent.html('');
    }
    else {
        var titulo = $('#MensajeFueraDeServicio option:selected').attr('title');
        comboBox.attr('title', titulo);
        if (editBox != null) {
            editBox.css('visibility', 'visible');
            editBox.css('display', '');
        };
        var tituloCB = comboBox.attr('title');
        editBoxContent.html(tituloCB);
    }
}



////********************************************************
/// ***  SE VA A CREAR UN NUEVO DÍA ESPECIAL
////********************************************************
function NuevoDiaEspecial() {
    // Inicializa variables globales
    contadorCtrl = 0;
    idHourDesdeCtrl = "";
    teclapulsada = '';
    contadorAlt = 0;
    idHourDesdeAlt = ''; 
    //var essubsistema = $('#EsCalendarioSubsistema').val();
    ///// Si es de subsistema muestro los radio buton para saber si el cambio afecta solo al calendario actual o se propaga al resto
    //if (essubsistema.toUpperCase() == 'TRUE') {
        //$('#OpcionesCalendarioSistema').css('display', 'block')
    //}
    /// Oculto la tabla de días especiales
    $('#DivTablaDiasEspeciales').css('visibility', 'hidden');

    /// vacío el contenido del formulario de días especiales
    $('#FechaDiaEspecial').val('');
    $('#SelectTipoFecha  select').val('0');
    $('#DescripcionDiaEspecial').val('');
    $('#MensajeFueraDeServicio select').val('');

    $('#TituloDia').text('Nuevo día especial');
    $('#TituloDia').css('display', 'block');
    CierraOpcionHorario();
    // ahora hago visible el formulario de dia festivo
    $('#CabeceraDatosDia').removeClass('div_NoVisible');
    $('#OperacionBtnGuardar').val('INS');

}

//// ******************************************************
//// *** Cuando se pulsa salir sin grabar se abre una ventana modal para preguntar 
//// *** si se desea continuar o no
function SalirSinGrabar() {
    var msg = '¿Desea salir del formulario?';
    $('#MensajeModal').text(msg);
    $("#MyModalBtnSi").attr("onclick", "CerrarFormualarioDiaEspecial(true)");
    $("#MyModalBtnNo").attr("onclick", "CerrarFormualarioDiaEspecial(false)");
//    $('#myModal').modal({ backdrop: 'static' });
//    $('.modal-backdrop').css('z-index',0); 
    $("#myModal").modal('show');
}


/// *************************************************************
/// Se va a cerrar el formulario de día especial
/// *************************************************************
function CerrarFormualarioDiaEspecial(cerrarform) {
    $('#myModal').modal('hide');
//    $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
//    $('.modal-backdrop').remove();//eliminamos
    if (cerrarform) {
        /// Muestro la tabla de días especiales
        $('#DivTablaDiasEspeciales').css('visibility', 'visible');
        /// Oculto el formulario de días especiales
        $('#CabeceraDatosDia').addClass('div_NoVisible');
        // Vació los datos del horario
        CierraOpcionHorario();
    }
}

/// ***********************************************************
/// *** Guardar el día en base de datos
/// ***********************************************************
function GuardarDia() {

    var errormsg = "";
    errormsg = ValidaDatos();

    if (errormsg != "") {
        alert(errormsg);
        return;
    }


    /// Miro si es un Alta o una modificación
    if ($('#OperacionBtnGuardar').val() == 'INS') {
        AltaDeDiaEspecial();
    }
    else if ($('#OperacionBtnGuardar').val() == 'MOD') {
        ModificaDiaEspecial();
    }
    else {
        alert('Operación no disponible: ' + $('#OperacionBtnGuardar').value());
    }

}

/// ************************************************************************************************************
/// *** ALTA del día.  (SE HA PULSADO GRABAR)
/// *** Mediante una llamada ajax pasamos los datos al servidor que dará de alta 
/// *** el nuevo día. Si se produce algún error nos lo devuelve y se muestra en 
/// *** un alert. Si todo va bien se oculta el formulario y se muestra añadido en la tabla de días especiales
/// *************************************************************************************************************
function AltaDeDiaEspecial() {
    var tipo = $('#SelectTipoFecha').val();
    var fecha = $('#FechaDiaEspecial').val();
    var descripcion = $('#DescripcionDiaEspecial').val();
    var mensaje = $('#MensajeFueraDeServicio').val();
    var horario = [];
    for (var i = 0; i < 48; i++) {
        var id = DameIdentificador(i);
        if ($('#' + id).is(':checked')) {
            horario[i] = "1";
        }
        else {
            horario[i] = "0";
        }
    }
    // Con el valor a cero indicamos que no es de subsistema
    //var esDeSubsistema = $('#EsCalendarioSubsistema').val();
    ///// Si es de subsistema muestro los radio buton para saber si el cambio afecta solo al calendario actual o se propaga al resto
    //if (esDeSubsistema.toUpperCase() == 'TRUE') {
        //if ($('#RdTodosCalendarios').prop('checked', true)) {
            //esDeSubsistema = "1";    // El cambio se aplica a todos los calendarios
        //}
        //else {
            //esDeSubsistema = "2";   // El cambio se aplica solo al calendario actual
        //}
    //}
    //else {
        //esDeSubsistema = "0";
    //}

    var idcalendario = $('#hidd_idhorario').val();
    var params = { 'idcalendario': idcalendario, 'fecha': fecha, 'tipo': tipo, 'descripcion': descripcion, 'mensaje': mensaje, 'horario': horario }
    $.when(
        $.ajax({
            type: "POST",
            url: getAbsolutePath() + "/HorarioSistema.aspx/InsertSpecialDay",
            data: JSON.stringify(params),
            contentType: "application/json; charset=utf-8",
            async: false,
            cache: false,
            timeout: 5000,
            success: function (data) {
                if (data === null) {
                    alert('Se ha producido un error al dar de alta el día especial. ');
                }
                var result = $.parseJSON(data.d);
                if (result.Resultado === 'OK') {
                    AniadeFilaTablaDiasEspeciales(result);
                }
                else
                    alert(result.ErrorMsg);
            }, error: function (e) { console.log(e); }
        })
    ).done();
}



/// ************************************************************************************************************
/// *** Modifica del día.   (SE HA PULSADO MODIFICAR)
/// *** Mediante una llamada ajax pasamos los datos al servidor que los moidificará en base de datos
/// *** Si se produce algún error nos lo devuelve y se muestra en 
/// ^** un alert. Si todo va bien se oculta el formulario y se muestra actualizado en la tabla de días especiales
/// *************************************************************************************************************
function ModificaDiaEspecial() {
    contadorCtrl = 0;
    idHourDesdeCtrl = "";
    teclapulsada = '';
    contadorAlt = 0;
    idHourDesdeAlt = ''; 

    // Obtenemos los datos para pasarlos al servidor
    var tipo = $('#SelectTipoFecha').val();
    var fecha = $('#FechaDiaEspecial').val();
    var descripcion = $('#DescripcionDiaEspecial').val();
    var mensaje = $('#MensajeFueraDeServicio').val();
    var diaant = $('#InputDiaAntesModif').val();
    var mesant = $('#InputMesAntesModif').val();

    var horario = [];
    for (var i = 0; i < 48; i++) {
        var id = DameIdentificador(i);
        if ($('#' + id).is(':checked')) {
            horario[i] = "1";
        }
        else {
            horario[i] = "0";
        }
    }

    //// Con el valor a cero indicamos que no es de subsistema
    //var esDeSubsistema = $('#EsCalendarioSubsistema').val();
    ///// Si es de subsistema muestro los radio buton para saber si el cambio afecta solo al calendario actual o se propaga al resto
    //if (esDeSubsistema.toUpperCase() == 'TRUE') {
        //if ($('#RdTodosCalendarios').prop('checked', true)) {
            //esDeSubsistema = "1";    // El cambio se aplica a todos los calendarios
        //}
        //else {
            //esDeSubsistema = "2";   // El cambio se aplica solo al calendario actual
        //}
    //}
    //else {
        //esDeSubsistema = "0";
    //}

    var idcalendario = $('#hidd_idhorario').val();
    var params = { 'idcalendario': idcalendario, 'diaant': diaant, 'mesant': mesant, 'fecha': fecha, 'tipo': tipo, 'descripcion': descripcion, 'mensaje': mensaje, 'horario': horario }
    $.when(
        $.ajax({
            type: "POST",
            url: getAbsolutePath() + "/HorarioSistema.aspx/UpdateSpecialDay",
            data: JSON.stringify(params),
            contentType: "application/json; charset=utf-8",
            async: false,
            cache: false,
            timeout: 5000,
            success: function (data) {
                if (data === null) {
                    alert('Se ha producido un error al modificar el día especial. ');
                }
                var result = $.parseJSON(data.d);
                if (result.Resultado === 'OK') {
                    ModiciaFilaTablaDiasEspeciales(result);
                }
                else
                    alert(result.ErrorMsg);
            }, error: function (e) { console.log(e); }
        })
    ).done();
}



/// *********************************************************************
/// *** Creamos una nueva fila de días especiales con los datos recibidos
/// *** desde la llamada web al servidor
/// **********************************************************************
function AniadeFilaTablaDiasEspeciales(dia) {
  
    // identificador de calendari
    var idcalendario = $('#hidd_idhorario').val();

    // creamos la nueva fila que se va a incluir con los datos modificados
    var idtr = "tr_" + idcalendario + "_" + dia.Dia + "_" + dia.Mes;
    var fila = "<tr id='" + idtr + "' > ";

    fila += "  <td style='display:table-cell;'>" + dia.FechaConFormato + "</td> ";
    fila += "  <td style='display:table-cell;'>" + dia.Descripcion + "</td> ";
    fila += "  <td style='display:table-cell;'>" + dia.Horario + "</td> ";
    fila += "  <td style='display:table-cell;'>" + dia.MensajeFueraHora + "</td> ";
    fila += "  <td style='float:right;display:table-cell'> " +
            "     <button type='button' > <span class='fa fa-pencil-square-o'  onclick='LeerDatosDiaEspecial(\"" + idtr + "\");'></span></button >  " +
            "     <button type='button'><span class='fa fa-trash'  onclick='EliminarDiaMsg(\"" + idtr + "\");' ><span></button> " + 
            "  </td > ";
    fila += " </tr> ";
    // No debería existir esta fila, pero por si acaso o por algún error incontrolado
    $('#' + idtr).remove();
    // Desmarco el check de horario
    $('#CheckHorario').prop('checked', false);
    // Añadios la nueva fila al final de la tabla
    $('#TablaDiasEspeciales > tbody:last-child').append(fila);
    // Si está fuera de fecha la marco en rojo
    if (dia.EstaFueraDeFecha) {
        $('#' + idtr).addClass('red_text');
    }
    else {
        if ($('#' + idtr).hasClass('red_text'))
            $('#' + idtr).removeClass('red_text');
    }
    /// Muestro la tabla de días especiales
    $('#DivTablaDiasEspeciales').css('visibility', 'visible');
    /// Oculto el formulario de días especiales
    if (!$('#CabeceraDatosDia').hasClass('div_NoVisible'))
        $('#CabeceraDatosDia').addClass('div_NoVisible');
    // Vació los datos del horario
    CierraOpcionHorario();
}


/// *********************************************************************
/// *** Modificamos la fila de la tabla de días especiales que contiene 
/// *** el día que se ha modificado.
/// *** Se cierra el formualrio de modificación y se actualiza la tabla 
/// *** de días especiales con los cambios realizados en el formulario.
/// *********************************************************************
function ModiciaFilaTablaDiasEspeciales(dia) {
    // identificador del calendario
    var idcalendario = $('#hidd_idhorario').val();
    // Datos del día y mes antes del cambio
    var diaant = $('#InputDiaAntesModif').val();
    var mesant = $('#InputMesAntesModif').val();
    var idtr_remove = "tr_" + idcalendario + "_" + diaant + "_" + mesant;
    // Eliminamos de la tabla el registro con la fecha. Se creará una nueva con los cambios incluidos
    $('#' + idtr_remove).remove();
    // Preparamos la nueva fila de la tabla con los cambios realizados en el día
    var idtr = "tr_" + idcalendario + "_" + dia.Dia + "_" + dia.Mes;
    var fila = "<tr id='" + idtr + "' > ";

    fila += "  <td style='display:table-cell;' >" + dia.FechaConFormato + "</td> ";
    fila += "  <td style='display:table-cell;'>" + dia.Descripcion + "</td> ";
    fila += "  <td style='display:table-cell;'>" + dia.Horario + "</td> ";
    fila += "  <td style='display:table-cell;'>" + dia.MensajeFueraHora + "</td> ";
    fila += "  <td style='float:right;display:table-cell;'> " +
            "     <button type='button' onclick='LeerDatosDiaEspecial(\"" + idtr + "\");' > " +
            "        <span class='fa fa-pencil-square-o' ></span> " + 
            "     </button > " +
            "     <button type='button'  onclick='EliminarDiaMsg(\"" + idtr + "\");'> " +
            "        <span class='fa fa-trash' ><span> " + 
            "     </button > " +
            "  </td > ";
    fila += " </tr> ";


    // Añadios la nueva fila al final de la tabla
    $('#TablaDiasEspeciales > tbody:last-child').append(fila);
    // Si está fuera de fecha la marco en rojo
    if (dia.EstaFueraDeFecha) {
        $('#' + idtr).addClass('red_text');
    }
    else {
        if ($('#' + idtr).hasClass('red_text'))
            $('#' + idtr).removeClass('red_text');
    }

    /// Muestro la tabla de días especiales
    $('#DivTablaDiasEspeciales').css('visibility', 'visible');
    /// Oculto el formulario de días especiales
    if (!$('#CabeceraDatosDia').hasClass('div_NoVisible'))
        $('#CabeceraDatosDia').addClass('div_NoVisible');
    // Vació los datos del horario
    CierraOpcionHorario();
}

/// ********************************************************************
/// *** 
/// ********************************************************************
function ValidaDatos() {
    var message = "";

    var fecha = $('#FechaDiaEspecial').val();
    if (fecha == null || fecha == "") {
        message = "Debe introducir una fecha \n";
    }

    var descripcion = $('#DescripcionDiaEspecial').val();
    if (descripcion == null || descripcion == "") {
        message = "La descripción no se puede dejar en blanco";
    }

    var mensaje = $('#MensajeFueraDeServicio').val();
    if (mensaje == null || mensaje == "") {
        message = "seleccione un mensaje de fuera de servicio";
    }

    return message;
}



/// ******************************************************************
/// *** Se van a LEER los datos del DÍA ESPECIAL
/// *** como parámetro viene el identificador de la columna que tiene el siguiente formato
/// ***  tr_idcalendario_dia_mes  ej) tr_12_01_10
/// *** Esta función llama al servidor y se trae los datos del día seleccionado desde la tabla
/// *** y los carga en el formulario. Los datos se cargarán en el formulario para poder modificarlos
/// ******************************************************************
function LeerDatosDiaEspecial(idtr) {
    contadorCtrl = 0;
    idHourDesdeCtrl = "";
    teclapulsada = '';
    contadorAlt = 0;
    idHourDesdeAlt = ''; 

    // separa el parámetro de entrada por _ y los paso a una array
    var datos = idtr.split('_');

    if (datos != null) {
        var idcalendario = datos[1];
        var dia = datos[2];
        var mes = datos[3];

        var params = { 'idcalendario': idcalendario, 'dia': dia, 'mes': mes }
        $.when(
            $.ajax({
                type: "POST",
                url: getAbsolutePath() + "/HorarioSistema.aspx/GetDataSpecialDay",
                data: JSON.stringify(params),
                contentType: "application/json; charset=utf-8",
                async: false,
                cache: false,
                timeout: 5000,
                success: function (data) {
                    if (data === null) {
                        alert('Se ha producido un error al modificar el día especial. ');
                    }
                    var result = $.parseJSON(data.d);
                    if (result.Resultado === 'OK') {
                        RellenaFormDiasEspeciales(result);
                    }
                    else
                        alert(result.ErrorMsg);
                }, error: function (e) { console.log(e); }
            })
        ).done();
    }
}


/// ***************************************************************************
/// *** La función recibe como parámetro los DATOS LEIDOS del día especial y 
/// *** con ellos RELLENA los diferentes campos del FORMULARIO del día especial
/// ***************************************************************************
function RellenaFormDiasEspeciales(datos) {
    $('#TituloDia').text('Modificar día especial');
    $('#TituloDia').css('display', 'block');
    // Oculto la tabla de días especiales
    $('#DivTablaDiasEspeciales').css('visibility', 'hidden');
    $('#FechaDiaEspecial').val(datos.Fecha_YYYY_MM_DD);
    /// Guardo el día y el mes por si cambia la fecha
    $('#InputDiaAntesModif').val(datos.Dia);
    $('#InputMesAntesModif').val(datos.Mes);
    $('#SelectTipoFecha  option[value="' + datos.Tipo + '"]').prop('selected', true);
    $('#DescripcionDiaEspecial').val(datos.Descripcion);
//    $('#MensajeFueraDeServicio select').val(datos.Mensaje);
    $('#MensajeFueraDeServicio option[value="' + datos.MensajeFueraHora + '"]').prop('selected', true);

    //var esDeSubsistema = $('#EsCalendarioSubsistema').val();
    ///// Si es de subsistema muestro los radio buton para saber si el cambio afecta solo al calendario actual o se propaga al resto
    //if (esDeSubsistema.toUpperCase() == 'TRUE') {
        //$('#OpcionesCalendarioSistema').css('display', 'block')
    //}
 
    // Que pinte el valor del mensaje seleccionado
    MensajeFueraDeServicio_Onchange();

    $('#OperacionBtnGuardar').val('MOD');

    if (datos.TieneRangoHorario) {
        // marco el checkbox de horario
        $('#CheckHorario').prop('checked', true);
        // hago visible el form de horario
        $('#HourButtonGroup').removeClass('div_NoVisible');
        //marco las casillasdel horario
        for (var i = 0; i < 48; i++) {
            var id = DameIdentificador(i);
            var bchecked = false;
            var hora = datos.Rango[i];
            if (hora == "1") {
                // Realmente se pulsa un botón que es el que hace que cambie el estado del checkbox. Cuando es true el botón debe estar marcado como pulsado 
                if (!$('#lbl_' + id).hasClass('active'))
                    $('#lbl_' + id).addClass('active');
                $('#' + id).prop('checked', true);
            }
            else {
                $('#lbl_' + id).removeClass('active');
                $('#' + id).prop('checked', false);
            }

            bchecked = $('#' + id).is(':checked');

            /// marca como no activo la hora
            ActivarDesactivarRangoHora(bchecked, id);
        }
    }
    else {
        /// Está marcado sin servicio
        $('#CheckHorario').prop('checked', false);
        // Vació los datos del horario
        CierraOpcionHorario();
    }
    /// Calcula los rangos horarios activos y los muestra en el formulario
    MuestraTextoFechasHorario();

    // ahora hago visible el formulario de dia festivo
    $('#CabeceraDatosDia').removeClass('div_NoVisible');
}


/// **********************************************************************************
/// *** Activa o desactiva el check del rango horario que se pasa como parámetro y lo
/// *** pongo en rojo o en verde según si está activo o no
/// **********************************************************************************
function ActivarDesactivarRangoHora(bchecked, idcheck) {
    // si está marcado lo ponemos rojo
    if (bchecked) {
        $('#lbl_' + idcheck).removeClass('button_red');
        if (!$('#lbl_' + idcheck).hasClass('button_green')) {
            $('#lbl_' + idcheck).addClass('button_green');
        }
    }
    else { // si está marcado lo mostramoa verde
        $('#lbl_' + idcheck).removeClass('button_green');
        if (!$('#lbl_' + idcheck).hasClass('button_red')) {
            $('#lbl_' + idcheck).addClass('button_red');
        }
    }
}



/// ******************************************************************************************
/// *** Obtenemos los rangos de horas que hay seleccionados y se muestran en el formulario
/// *******************************************************************************************
function MuestraTextoFechasHorario() {
    var horariosAtencion = [];
    var hayHorario = false;
    var j = 0;
    var minvalue = 0;
    var maxvalue = 0;

    /// Busco todos los rango de horas que hay 
    for (var i = 0; i < 48; i++) {
        var id = DameIdentificador(i);

        bchecked = $('#' + id).is(':checked');

        if (minvalue == 0 && bchecked && !hayHorario) {
            minvalue = i;
            maxvalue = i;
            hayHorario = true;
        }
        else if (bchecked) {
            maxvalue = i;
            hayHorario = true;
        }
        else if (hayHorario && !bchecked) {
            // Después de varios marcados como 1 llegamos a uno marcado con cero, implica el final de un rango horario
            horariosAtencion[j] = DameFechaDesdeHasta(minvalue, maxvalue);
            j++;
            hayHorario = false;
            minvalue = 0;
        }        
    }

    if (maxvalue == 47) {
        // Hemos llegado al final 1 esta marcado por lo tanto es el final de otro rango horario
        horariosAtencion[j] = DameFechaDesdeHasta(minvalue, maxvalue);
        hayHorario = false;
    }

    var resultado = resultado = "Sin servicio";
    /// Si el menor valor con datos y el mayor coincciden y están a cero es que no hay ninguna hora marcada
    if (horariosAtencion.length > 0) {        
        for (var i = 0; i < horariosAtencion.length; i++) {
            var horario = horariosAtencion[i];
            if (i == 0) {
                resultado = horario;
            }
            else {
                resultado += " - " + horario;
            }
        }
    }

    /// Muestro en el formulario los rangos de horas detectados
    if (resultado == 'Sin servicio') {
        $('#TextoHorario').removeClass('darkgreen_text');
        if (!$('#TextoHorario').hasClass('red_text')) {
            $('#TextoHorario').addClass('red_text');
        }
    }
    else {
        $('#TextoHorario').removeClass('red_text');
        if (!$('#TextoHorario').hasClass('darkgreen_text')) {
            $('#TextoHorario').addClass('darkgreen_text');
        }
    }
    $('#TextoHorario').text("  ( " + resultado + " ) ");
}


/// ***************************************************************************
/// *** Se va a eliminar el día especial seleccionado en la tabla. Se elimina
/// *** de base de datos mediante una llamada ajax y luego de la tabla
/// PARAM idRow es el identificador de la fila de la tabla. Viene con el 
/// formato tr_idcalendario_dia_mes. Datos que se pasarán al servidor para eliminar 
/// el día de la base de datos
/// ***************************************************************************
function EliminarDiaMsg(idRow) {

    var msg = 'Se va a eliminar el día. \n¿Desea continuar?';
    $('#MensajeModal').text(msg);
    var funcion = "EliminarDia(true,'" + idRow + "')";
    $("#MyModalBtnSi").attr("onclick", funcion);
    var funcion = "EliminarDia(false,'" + idRow + "')";
    $("#MyModalBtnNo").attr("onclick", funcion);
//    $('#myModal').modal({ backdrop: 'static' });
//    $('.modal-backdrop').css('z-index', 0); 
    $("#myModal").modal('show');
}


function EliminarDia(eliminar, idRow) {
    $('#myModal').modal('hide');
//    $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
//    $('.modal-backdrop').remove();//eliminamos
    /// Si no se quiere elimionar no hacemos nada
    if (!eliminar)
        return;
    // Se va a eliminar
    // separa el parámetro de entrada por _ y los paso a una array. El identificador de la fila
    var datos = idRow.split('_');

    if (datos != null) {
        var idcalendario = datos[1];
        var dia = datos[2];
        var mes = datos[3];

        var params = { 'idcalendario': idcalendario, 'dia': dia, 'mes': mes }
        $.when(
            $.ajax({
                type: "POST",
                url: getAbsolutePath() + "/HorarioSistema.aspx/DeleteSpecialDay",
                data: JSON.stringify(params),
                contentType: "application/json; charset=utf-8",
                async: false,
                cache: false,
                timeout: 5000,
                success: function (data) {
                    if (data === null) {
                        alert('Se ha producido un error al eliminar el día especial. ');
                    }
                    var result = $.parseJSON(data.d);
                    var arrResult = result.split(',');
                    if (arrResult[0] === 'OK') {
                        /// Elimino la fila en la tabla una vez que se ha eliminado de la base de datos
                        $('#' + arrResult[1]).remove();
                    }
                    else
                        alert(result.ErrorMsg);
                }, error: function (e) { console.log(e); }
            })
        ).done();
    }
}


/// ***************************************************************************************************************
/// *** Control para seleccionar un rango de fechas al pulsar la tecla ctrl+mouse entre dos rangos de fecha
/// ***************************************************************************************************************
function SeleccionHoraPorTeclaCtrl(lblidHour) {

    var idHour = lblidHour.substr(4);
    if (idHourDesdeCtrl == idHour)
        return;

    contadorCtrl++;
    contadorAlt = 0;
    idHourDesdeAlt = '';
    if (contadorCtrl == 2) {
        // Si se ha pulsado al revés cambio los intercambio los valores desde y hasta para que funcion de menor a mayor
        if (idHour.localeCompare(idHourDesdeCtrl) < 0) {
            var aux = idHour;
            idHour = idHourDesdeCtrl;
            idHourDesdeCtrl = aux;
        }

        for (var i = 0; i < 48; i++) {
            var idCheck = DameIdentificador(i);

            if (idCheck > idHour)
                break;


            if ((idHourDesdeCtrl != "" && idCheck.localeCompare(idHourDesdeCtrl) >= 0 && idCheck.localeCompare(idHour) <= 0) || (idCheck == idHour)) {
                // Lo pongo como pulsado sino lo está                     
                if (!$('#lbl_' + idCheck).hasClass('active'))
                    $('#lbl_' + idCheck).addClass('active');
                $('#' + idCheck).prop('checked', true);
                /// marca como no activo la hora
                ActivarDesactivarRangoHora(true, idCheck);

            }
        }
        contadorCtrl = 0;
        idHourDesdeCtrl = "";

        MuestraTextoFechasHorario();
    }
    else {
        idHourDesdeCtrl = idHour;
        ActivaDesactivaHora(lblidHour);
    }
}



/// ***************************************************************************************************************
/// *** Control para seleccionar un rango de fechas al pulsar la tecla alt+mouse entre dos rangos de fecha
/// ***************************************************************************************************************

function SeleccionHoraPorTeclaAlt(lblidHour) {
    var idHour = lblidHour.substr(4);
    if (idHourDesdeAlt == idHour)
        return;

    contadorAlt++;
    contadorCtrl = 0;
    idHourDesdeCtrl = '';
    if (contadorAlt == 2) {
        // Si se ha pulsado al revés cambio los intercambio los valores desde y hasta para que funcion de menor a mayor
        if (idHour.localeCompare(idHourDesdeAlt) < 0) {
            var aux = idHour;
            idHour = idHourDesdeAlt;
            idHourDesdeAlt = aux;
        }

        for (var i = 0; i < 48; i++) {
            var idCheck = DameIdentificador(i);

            if (idCheck > idHour) {
                break;
            }

            if ((idHourDesdeAlt != "" && idCheck.localeCompare(idHourDesdeAlt) >= 0 && idCheck.localeCompare(idHour) <= 0) || (idCheck == idHour)) {
                // Lo pongo como no pulsado sino lo está                     
                $('#lbl_' + idCheck).removeClass('active');
                $('#' + idCheck).prop('checked', false);
                /// marca como no activo la hora
                ActivarDesactivarRangoHora(false, idCheck);
            }
        }

        contadorAlt = 0;
        idHourDesdeAlt = "";

        MuestraTextoFechasHorario();        
    }
    else {
        idHourDesdeAlt = idHour;
        ActivaDesactivaHora(lblidHour);
    }
}



/// Buscador da datos en la tabla
function MySearchFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("MySearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("TablaDiasEspeciales");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        var found = false;
        for (j = 0; j < td.length; j++) {
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    found = true;                
                }
            }
        }
        if (found) {
            tr[i].style.display = "";
        }
        else {
            tr[i].style.display = "none";
        }
    }
}


