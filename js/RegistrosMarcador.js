/// *************************************************************************************
/// *** Se ha pulsado el botón de buscar. Se hace un submit del formulario
/// *************************************************************************************
function BuscarRegistros() {
    if (!ValidaDatosEntrada())
        return;

    // Activo el botón de
    $("form").submit();
}


/// *******************************************************************************************
/// *** Se pulsa el botón de Mostrar Llamadas.
/// *** Se pasa a la página que muestra las llamadas realizadas de las opciones seleccionadas.
/// *******************************************************************************************
function MostrarResultados() {
    var Idcampanaseleccionada = $('#Idcampanaseleccionada').val();
    var url = "/RegistrosMarcador/ResultadosLlamadas"; //
    // Obtenemos el identificador de la campaña seleccionada
    var Idcampanaseleccionada = $('#Idcampanaseleccionada').val();
    var idlistaseleccionada = $('#ListasCampanas').val();
    // Obtenemos las fechas desde y hasta
    var fechadesde = $('#FechaInicio').val();
    var fechahasta = $('#FechaFin').val();
    var fechas = fechadesde + '@' + fechahasta;
    // Obtengo el valor para saber si son grupos de resultados o solo resultados lo que se pasa
    var sonGrupos = true;
    if ($('#MostrarTodosLosResultados').prop('checked')) {
        sonGrupos = false;
    }
    else {
        sonGrupos = true;
    }

    // De momento solo obtengo los datos de cuando están agrupados los días
    var resultados = $('#hidd_19000101').val();
    var data = { "idcampana": Idcampanaseleccionada, "fechas": fechas, "resultados": resultados, "songrupos": sonGrupos, "idlista": idlistaseleccionada }
    //            ul = url.replce()
    var querystring = $.param(data);
    AvanzarPagina("/RegistrosMarcador/Inicio/" + Idcampanaseleccionada, url + "?" + querystring);
}


/// *******************************************************************************************
/// *** Control de la fecha fin. Si está marcado el check fecha fin se mostrará la fecha fin
/// *** sino está marcado se oculta y a la fecha fin se le pone lo que haya la fecha inicio.
/// *******************************************************************************************
function MuestraInputFechaFin(element) {
    if (element.checked) {
        $("#FechaFin").css("display", "block");
        let fecha = i18next.t("RegistrosMarcador.fechaDesde");
        $("#LabelFechaInicio").text(fecha);
        $("#row_agruparDias").css("display", "block");
    }
    else {
        $("#FechaFin").css("display", "none");
        let fecha = i18next.t("RegistrosMarcador.fecha");
        $("#LabelFechaInicio").text("Fecha");
        $("#row_agruparDias").css("display", "none");
        var fechaini = $('#FechaInicio').val();
        $('#FechaFin').val(fechaini);
    }
}


/// **************************************************************************
/// *** Mostrar u ocultar los campos de selección de horas
/// **************************************************************************
function MostrarHoraDesdeHasta(element) {
    if (element.checked) {
        $('#CamposHora').css('display', 'block');
    }
    else {
        $('#CamposHora').css('display', 'none');
    }
}

function SelectListChange() {
    var idlistaseleccionada = $('#ListasCampanas').val();
    $('#IdListaSeleccionada').val(idlistaseleccionada);
    var txt = $("#ListasCampanas option:selected").text();
    $('#ListaName').val(txt);
}

function SelectCampanasChange() {
    if ($('#ListasCampanas').is(':disabled')) {
        $("#ListasCampanas").prop('disabled', false);
    }

    var idSeleccionado = $('#SelectCampanas').val();
    $('#Idcampanaseleccionada').val(idSeleccionado);
    var txt = $("#SelectCampanas option:selected").text();
    $('#Campananame').val(txt);
    $('#spanSelectCampanas').val('');


    RecargaComboListas(idSeleccionado);
}


/// ******************************************************************************
/// *** Cuando se cambia de campaña se recarga el combo de listas con las listas
/// *** de la campaña seleccionada.
/// ******************************************************************************
function RecargaComboListas(idcampana) {
    var url2 = getRutaAbsolutaMVC() + "/RegistrosMarcador/GetListasCampana/";
    var params = { "idcampana": idcampana }

    $.post(url2, params, function (data) {
        if (data === null) {
            alert('Se ha producido un error al recuperar las listas de la campaña ');
        }
        var datoslista = $.parseJSON(data);
        $('#ListasCampanas').empty();

        for (var i = 0; i < datoslista.length; i++) {
            var lista = datoslista[i];

            // En Value2 viene si la lista está activa o no
            if (lista.Value2 != "S")
                $('#ListasCampanas').append("<option class='ListaInactiva' value='" + lista.Key + "'  > " + lista.Value + "</option > ");
            else
                $('#ListasCampanas').append("<option value='" + lista.Key + "' > " + lista.Value + "</option > ");
            $("#ListasCampanas").selectpicker("refresh");
        }
        
    }).done(function () {
        $('#ListasCampanas option:eq(1)').attr('selected', 'selected');
        $("#ListasCampanas").selectpicker("refresh");
        SelectListChange();
  });

    //$('#ListasCampanas option[value=-1]').attr('selected', 'selected');

}


function FechaInicioModificada() {
    var fechaini = $('#FechaInicio').val();
    if (!$('#MostrarFechaFin').prop("checked")) {
        $('#FechaFin').val(fechaini);
    }

    var FechaFin = $('#FechaFin').val();
    if (fechaini > FechaFin) {
        $('#FechaFin').val(fechaini);
    }
}

function FechaFinModificada() {
    var fechaini = $('#FechaInicio').val();
    var FechaFin = $('#FechaFin').val();
    if (fechaini > FechaFin) {
        $('#FechaInicio').val(FechaFin);
    }
}


/// ****************************************************************************************
/// *** Valida los datos antes de realizar el submit del formulario.
/// *** Se comprueba que se ha seleccionado una campaña, que la fecha fin es mayor o igual 
/// *** a la inicial y lo mismo con las horas si se han seleccioando.
/// *** DEVUELVE: True si todo ha ido bien y false si algo no es correcto
/// ****************************************************************************************
function ValidaDatosEntrada() {
    if ($('#SelectCampanas').val() <= 0) {
        // Añado mensaje de error a la ventanan modal
        $('#spanSelectCampanas').text('Debe seleccionar una campaña')
        return false;
    }
    else if ($('#FechaInicio').val() > $('#FechaFin').val()) {
        // Añado mensaje de error a la ventanan modal
        $('#ModalErrorBody').html('<p>La fecha desde no puede ser superior a la fecha hasta</p>')
        // Muestro la ventana de error
        $('#ModalError').modal('show');
        $('#FechaInicio').focus();
        return false;
    }
    else {
        var val1 = parseInt($('#HoranInicio').val());
        var val2 = parseInt($('#HoraFin').val());
        if (val1 > val2) {
            // Añado mensaje de error a la ventanan modal
            $('#ModalErrorBody').html('<p>La horas desde no puede ser superior a la hora hasta</p>')
            // Muestro la ventana de error
            $('#ModalError').modal('show');
            $('#HoranInicio').focus();
            return false;
        }
    }

    if (!$('#AgruparDias').is(':checked')) {
        var date1 = new Date($('#FechaInicio').val());
        var date2 = new Date($('#FechaFin').val());
        var diffTime = Math.abs(date2 - date1);
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 31)
        {
            alert("Sin agrupar los días, la máxima diferencia entre fechas debe ser de 31 días. Se han marcado " + diffDays);
            return false;
        }
    }

    return true;
}




/// ***************************************************************************************************************************************
/// *** Al hacer click sobre el check. Hay que comprobar si se marca ya que entonces hay que mostrar la opción de mostrar resultados y si
/// *** se desmarca se comprueba que si no hay ninguno marcado que la opción de mostrar resultados se desmarque
/// ***************************************************************************************************************************************
function MarcarDesmarcar(id, fecha) {
    arr = new Array();
    var marcados = $('#hidd_' + fecha).val();
    arr = marcados.split(',');

    if (!$('#chk_' + fecha + '_' + id).prop('checked')) {
        if ($('#CheckTodos').prop('checked')) {
            $('#CheckTodos').prop('checked', false);
        }

        if (marcados == null)
            return;

        var haymarcados = false;
        /// Elimino el resultado del campo donde almaceno los resultados marcados.
        var pos = arr.indexOf(id);
        if (pos >= 0)
            arr.splice(pos, 1);
        // Vacio donde almaceno los resultados marcados para volver a rellenarlo con los que quedan
        marcados = '';

        for (i = 0; i <= arr.length - 1; i++) {
            if ($('#chk_' + fecha + '_' + arr[i]).prop('checked')) {
                haymarcados = true;
            }

            if (i === 0)
                marcados = arr[i];
            else
                marcados += ',' + arr[i];

        }

        // si no queda ningún resultado marcado se oculta el botón de mostrar resultados
        if (!haymarcados) {
            $('#BotonesLlamadas').hide();
            $('#hidd_' + fecha).val('');
        }
        else {
            $('#hidd_' + fecha).val(marcados);
        }
    }
    else {
        /// Se ha marcado un check, asi que activo el mostrar el botón de mostrar resultados
        $('#BotonesLlamadas').show();
        // Si no hay almacenado ningún resultado añado el que se ha marcado
        if (marcados === '')
            $('#hidd_' + fecha).val(id);
        else
            $('#hidd_' + fecha).val(marcados + ',' + id);
    }
}


function MarcarDesmarcarTodos(fecha) {
    arr = new Array();
    var marcados = $('#hidd_Resultados').val();
    // paso al array todos los codigos de resultados
    if (marcados != null) {
        arr = marcados.split(',');
        marcados = '';

        if ($('#CheckTodos_' + fecha).prop('checked')) {
            $('#hidd_' + fecha).val('');

            for (i = 0; i <= arr.length - 1; i++) {
                $('#chk_' + fecha + '_' + arr[i]).prop('checked', true);
                if (i === 0)
                    marcados = arr[i];
                else
                    marcados += ',' + arr[i];
            }
            $('#hidd_' + fecha).val(marcados);
        }
        else {
            for (i = 0; i <= arr.length - 1; i++) {
                $('#chk_' + fecha + '_' + arr[i]).prop('checked', false);
            }

            // ningún resultado marcado
            $('#hidd_' + fecha).val('');
        }
    }

    // Marcamos todos los check
    if ($('#CheckTodos_' + fecha).prop('checked')) {
        $('#BotonesLlamadas').show();
    }
    else {
        $('#BotonesLlamadas').hide();
    }

}




function CargaDialogo() {
    // Primero vacío el ifframe
    var iframe = document.getElementById("IdIframe");
    var html = "";

    iframe.contentWindow.document.open();
    iframe.contentWindow.async = true;
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();

    $('#spinner').css('display', 'block');

    var Idcampanaseleccionada = $('#Idcampanaseleccionada').val();
    var url = "/RegistrosMarcador/ResultadosLlamadas"; //
    // Obtenemos el identificador de la campaña seleccionada
    var Idcampanaseleccionada = $('#Idcampanaseleccionada').val();
    var idlistaseleccionada = $('#ListasCampanas').val();
    // Obtenemos las fechas desde y hasta
    var fechadesde = $('#FechaInicio').val();
    var fechahasta = $('#FechaFin').val();
    var fechas = fechadesde + '@' + fechahasta;
    // Obtengo el valor para saber si son grupos de resultados o solo resultados lo que se pasa
    var sonGrupos = true;
    if ($('#MostrarTodosLosResultados').prop('checked')) {
        sonGrupos = false;
    }
    else {
        sonGrupos = true;
    }

    // De momento solo obtengo los datos de cuando están agrupados los días
    var resultados = $('#hidd_19000101').val();
    var data = { "idcampana": Idcampanaseleccionada, "fechas": fechas, "resultados": resultados, "songrupos": sonGrupos, "idlista": idlistaseleccionada }
    var querystring = $.param(data);

    var url = getRutaAbsoluta() + "/RegistrosMarcador/ResultadosLlamadas" + "?" + querystring;

    title = "Resultados de llamadas ";
    $('#myModalTitle').text(title);

    var $iframe = $('#IdIframe');
    if ($iframe.length) {
        $iframe.attr('src', url);
    }

    $('#ModalResultadosLlamadas').modal('show');
}


