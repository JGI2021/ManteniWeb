

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





function RemoveDataFromArray(array, data) {
    var index = array.indexOf(data);
    if (index > -1) {
        array.splice(index, 1);
    }
}


/// ----------------------------------------------------------------------
/// Se asignarán  los calendarios seleccionados al día especial, tanto a 
/// nivel visual en las listas como a nivel de base de datos
/// ----------------------------------------------------------------------
function AsignaSeleccionados(tab) {
    var idsCalendarios = "";
    var nombresIdsSeleccionados = "";

    var listCheckItems = $("#ul_noasociados" + tab + " input[type=checkbox]:checked");

    if (listCheckItems === null || listCheckItems.length === 0) {
        alert("No se ha seleccionado ningún calendario");
        return;
    }

    // Obtengo los calendarios no seleccionados
    var arrCalendariosDesasignados = $('#CalendariosDesasignados').val().split(',');
    
    $(listCheckItems).each(function () {
        if (this.checked) {
            var id = $(this).attr("id");
            // Elimino los primeros caracteres para quedarme 
            id = id.substr(7);

            if (idsCalendarios === "") {
                idsCalendarios = id;
            }
            else {
                idsCalendarios += ',' + id;
            }
            // Obtengo el nombre del grupo
            liid = $(this).attr("id");
            // Le quito el prefijo chk y le añado el de li para encontrar el registro que busco
            liid = 'spn' + liid.substr(3);

            if (nombresIdsSeleccionados == '')
                nombresIdsSeleccionados += $('#' + liid).text().trim();
            else 
                nombresIdsSeleccionados += ',' + $('#' + liid).text().trim();
            // Elimino el dato del array
            RemoveDataFromArray(arrCalendariosDesasignados, id);
        }
    });

    AsignaCalendariosEnBBDD(idsCalendarios);

    AniadCalendariosASeleccionados(idsCalendarios, nombresIdsSeleccionados, tab);
    var desasignados = "";
    // vuelvo a pasar el array de no seleccionados a cadena y lo guardo
    for (var i = 0; i < arrCalendariosDesasignados.length; i++) {
        if (i == 0)
            desasignados = arrCalendariosDesasignados[i];
        else
            desasignados += ',' + arrCalendariosDesasignados[i];
    }
    $('#CalendariosDesasignados').val(desasignados);
}


/// -------------------------------------------------------
/// Realiza una llamada ajax para asignar los calendarios 
/// seleccionados al día especial
/// -------------------------------------------------------
function AsignaCalendariosEnBBDD(idsCalendarios) {
    
    var idDiaEspecial = $('#IdDiaSeleccionado').val();

    var params = { 'idDiaEspecial': idDiaEspecial, 'idscalendarios': idsCalendarios }
    $.when(
        $.ajax({
            type: "POST",
            url: getAbsolutePath() + "/DiaEspecialCalendario.aspx/AsociaDiaEspecialACalendario",
            data: JSON.stringify(params),
            contentType: "application/json; charset=utf-8",
            async: false,
            cache: false,
            timeout: 5000,
            success: function (data) {
                if (data === null) {
                    alert('Se ha producido un error al asociar calendarios al día especial. ');
                }
                var result = $.parseJSON(data.d);
                if (result === 'OK') {
                    $('#alertsuccess').css('opacity', '1');
                    $('#alertsuccess').css('display', 'block');
                    $('#MensajeAlertSuccess').text("Atencion!  El registro se ha actualizado correctamente");
                    window.setTimeout(function () {
                        $('#alertsuccess').fadeTo(500, 0).slideUp(500, function () {

                            $('#alertsuccess').css('display', 'none');
                        });
                    }, 3000);
                }
                else
                    alert(result);
            }, error: function (e) { console.log(e); }
        })
    ).done();
}



/// Mueve los registros del grupo de no asignados al de asignados.
function AniadCalendariosASeleccionados(ids, nombresIds, tab) {
    /// Paso la cadena de Ids a un array
    var arrayIds = ids.split(',');
    /// Paso los nombres a array
    var arrayNombres = nombresIds.split(',');
    // Leo el array y creo los registros
    $.each(arrayIds, function (index, value) {
        var newreg = "<li id='li" + tab + "_" + value + "' class='list-group-item'> " +
                     "   <input type='checkbox' id='chk" + tab + "_" + value + "' name='chk" + tab + "_" + value + "' /> " +
                     "   &nbsp;&nbsp;<span><b>  " + arrayNombres[index] + "</b></span> " + 
                     "</li> "; 

        // Elimino el registro
        $('#li' + tab + '_' + value).remove();

        // Ahora lo asocio al nuevo UL
        $('#ul_siasociados' + tab).append(newreg);
    });

    // Lo añadimos al input oculto de seleccionados
    var seleccionados = $('#CalendariosSeleccionados').val();
    if (seleccionados == '') {
        $('#CalendariosSeleccionados').val(ids);
    }
    else {
        $('#CalendariosSeleccionados').val(seleccionados + ',' + ids);
    }
}







/// ---------------------------------------------------------------
/// Se han desasignado uno o varios calendarios del día especial
/// Se pasarán los datos de la lista de asignados a desasignados y 
/// se desasignan en base e datos
/// ---------------------------------------------------------------
function DesasignaSeleccionados(tab) {
    var idsCalendarios = "";
    var nombresIdsSeleccionados = "";

    var listCheckItems = $("#ul_siasociados" + tab + " input[type=checkbox]:checked");

    if (listCheckItems === null || listCheckItems.length === 0) {
        alert("No se ha seleccionado ningún calendario para desasignar ");
        return;
    }

    var arrCalendariosSeleccionados = $('#CalendariosSeleccionados').val().split(',');

    $(listCheckItems).each(function () {
        if (this.checked) {
            var id = $(this).attr("id");
            // Elimino los primeros caracteres para quedarme 
            id = id.substr(7);

            if (idsCalendarios === "") {
                idsCalendarios = id;
            }
            else {
                idsCalendarios += ',' + id;
            }
            // Obtengo el nombre del grupo
            liid = $(this).attr("id");
            // Le quito el prefijo chk y le añado el de li para encontrar el registro que busco
            liid = 'li' + liid.substr(3);

            if (nombresIdsSeleccionados == '')
                nombresIdsSeleccionados += $('#' + liid).text().trim();
            else
                nombresIdsSeleccionados += ',' + $('#' + liid).text().trim();

            RemoveDataFromArray(arrCalendariosSeleccionados, id);
        }
    });

    /// Desasigno en base de datos los calendarios
    DesasignaCalendariosEnBBDD(idsCalendarios);

    // añade en la lista de no seleccionados los que se han marcado
    AniadCalendariosANOSeleccionados(idsCalendarios, nombresIdsSeleccionados, tab);

    var seleccionados = "";
    // vuelvo a pasar el array de seleccionados a cadena y lo guardo
    for (var i = 0; i < arrCalendariosSeleccionados.length; i++) {
        if (i == 0)
            seleccionados = arrCalendariosSeleccionados[i];
        else
            seleccionados += ',' + arrCalendariosSeleccionados[i];
    }
    $('#CalendariosSeleccionados').val(seleccionados);
}

/// -------------------------------------------------------
/// Realiza una llamada ajax para desasignar los calendarios 
/// que estaban asocidos al día especial
/// -------------------------------------------------------
function DesasignaCalendariosEnBBDD(idsCalendarios) {

    var idDiaEspecial = $('#IdDiaSeleccionado').val();

    var params = { 'idDiaEspecial': idDiaEspecial, 'idscalendarios': idsCalendarios }
    $.when(
        $.ajax({
            type: "POST",
            url: getAbsolutePath() + "/DiaEspecialCalendario.aspx/DesasociaDiaEspecialACalendario",
            data: JSON.stringify(params),
            contentType: "application/json; charset=utf-8",
            async: false,
            cache: false,
            timeout: 5000,
            success: function (data) {
                if (data === null) {
                    alert('Se ha producido un error al asociar calendarios al día especial. ');
                }
                var result = $.parseJSON(data.d);
                if (result === 'OK') {
                    $('#alertsuccess').css('opacity', '1');
                    $('#alertsuccess').css('display', 'block');
                    $('#MensajeAlertSuccess').text("Atencion!  El registro se ha actualizado correctamente");
                    window.setTimeout(function () {
                        $('#alertsuccess').fadeTo(500, 0).slideUp(500, function () {

                            $('#alertsuccess').css('display', 'none');
                        });
                    }, 3000);
                }
                else
                    alert(result);
            }, error: function (e) { console.log(e); }
        })
    ).done();
}




/// Mueve los registros del grupo de no asignados al de asignados.
function AniadCalendariosANOSeleccionados(ids, nombresIds, tab) {
    /// Paso la cadena de Ids a un array
    var arrayIds = ids.split(',');
    /// Paso los nombres a array
    var arrayNombres = nombresIds.split(',');

    // Leo el array y creo los registros
    $.each(arrayIds, function (index, value) {
        var newreg = "<li id='li" + tab + "_" + value + "' class='list-group-item'> " +
            "    <input type='checkbox' id='chk" + tab + "_" + value + "' name='chk" + tab + "_" + value + "' /> " +
            "    &nbsp;&nbsp;<span id='spn" + tab + "_" + value + "'><b>  " + arrayNombres[index] + "</b></li> ";

        // Elimino el registro
        $('#li' + tab + '_' + value).remove();

        // Ahora lo asocio al nuevo UL
        $('#ul_noasociados' + tab).append(newreg);
    });

    // Lo añadimos al input oculto de los no seleccionados
    var desasignados = $('#CalendariosDesasignados').val();
    if (desasignados == '') {
        $('#CalendariosDesasignados').val(ids);
    }
    else {
        $('#CalendariosDesasignados').val(desasignados + ',' + ids);
    }
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
//function SalirGuardando() {
//    var msg = '¿Desea guardar datos y salir del formulario?';
//    $('#MensajeModal').text(msg);
//    $("#MyModalBtnSi").attr("onclick", "GuardaDatosDia('2'); ");
//    $("#MyModalBtnNo").attr("onclick", "$('#myModal').close();");
//    $('#myModal').show();
//    $("#myModal").modal();
//}



/// *************************************************************
/// Se va a cerrar el formulario de día especial
/// *************************************************************
function CerrarFormualarioDiaEspecial(cerrarform) {
    $('#myModal').hide();
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
function GuardaDatosDia(salir) {
    var errormsg = "";
    errormsg = ValidaDatos();

    if (errormsg != "") {
        alert(errormsg);
        return false;
    }

    var esAlta = $('#hidd_EsAlta').val();


    if (esAlta.toUpperCase() == 'TRUE') {
        AltaDiaEspecial(salir);
    }
    else {
        ModificarDiaEspecial(salir);
    }


}


/// ********************************************************************************************************
/// funcion: ALTADIAESPECIAL
/// *** Se da de alta llos datos del formulario en el servidor mediante una llamada ajax
/// *********************************************************************************************************
function AltaDiaEspecial(salir) {
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

    var idscalendario = $('#CalendariosSeleccionados').val();

    var params = { 'fecha': fecha, 'tipo': tipo, 'descripcion': descripcion, 'mensaje': mensaje, 'horario': horario }
    $.when(
        $.ajax({
            type: "POST",
            url: getAbsolutePath() + "/DiaEspecialCalendario.aspx/InsertSpecialDay",
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
                if (result === 'OK') {
                    // Sin poner esto no muestra el alert aunque ponga el display
                    $('#alertsuccess').css('opacity', '1');
                    $('#alertsuccess').css('display', 'block');
                    $('#MensajeAlertSuccess').text("Atencion!  El registro se ha grabado correctamente");
                    window.setTimeout(function () { 
                        $('#alertsuccess').fadeTo(500, 0).slideUp(500, function () { 
                            $('#alertsuccess').css('display', 'none');
                       }); 
                    }, 3000);

                    // Ya no es un alta
                    $('#hidd_EsAlta').val('false');
                    $('#CalendariosDesasignados').val('');   
                    if (salir == '2') {
                        RetrocederPagina();
                    }
                }
                else
                    alert(result);
                
            }, error: function (e) { console.log(e); }
        })
    ).done();
}


/// *********************************************************************************************************
/// funcion: MODIFICADIAESPECIAL
/// *** Se modifican los datos del formulario en el servidor mediante una llamada ajax
/// *********************************************************************************************************
function ModificarDiaEspecial(salir) {
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

    var idscalendario = $('#CalendariosSeleccionados').val();
    var idDiaEspecial = $('#IdDiaSeleccionado').val();

    var params = { 'idDiaEspecial': idDiaEspecial, 'idscalendarios': idscalendario, 'fecha': fecha, 'tipo': tipo, 'descripcion': descripcion, 'mensaje': mensaje, 'horario': horario }
    $.when(
        $.ajax({
            type: "POST",
            url: getAbsolutePath() + "/DiaEspecialCalendario.aspx/UpdateSpecialDay",
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
                if (result === 'OK') {
                    $('#alertsuccess').css('opacity', '1');
                    $('#alertsuccess').css('display', 'block');
                    $('#MensajeAlertSuccess').text("Atencion!  El registro se ha actualizado correctamente");
                    window.setTimeout(function () {
                        $('#alertsuccess').fadeTo(500, 0).slideUp(500, function () {

                            // Ya no es un alta
                            $('#hidd_EsAlta').val('false');
                            $('#CalendariosDesasignados').val('');
                            $('#alertsuccess').css('display', 'none');
                            if (salir === '2') {
                                RetrocederPagina();
                            }

                        });
                    }, 4000);

                    
                }
                else
                    alert(result);
            }, error: function (e) { console.log(e); }
        })
    ).done();

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