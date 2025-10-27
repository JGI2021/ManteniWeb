
function CargaTabActivo() {
    // Obtenemos el tab activo 
    var tabActivo = $('.tab-pane.active');
    var nombre = '';

    $('#btnspin').css('display', 'inline-block');
       
    if (tabActivo != null && tabActivo != 'undefined')
         nombre = tabActivo[0].id;

    $('#TabPaneActivo').val(nombre);

    if (nombre === 'PANELINFORMESEMANAL') {
        CargaPanelInformeSemanal();
    }
    else if (nombre === 'PANELINFORMEDIARIO') {
        CargaPanelInformeDiario();
    }
    else if (nombre === 'PANELINFORMEHORARIO') {
        CargaPanelInformeHorario();
    }
    else if (nombre === 'PANELDISTRIBUCIONPORESTADO') {
        CargaPanelDistribucionEstado();
    }
    else if (nombre === 'PANELDISTRIBUCIONPORRESULTADO') {
        CargaPanelDistribucionResultado();
    }
    else if (nombre === 'PANELRESULTADOSREGISTRO') {
        CargaPanelResultadosRegistro();
    }
    else if (nombre === 'PANELRESULTADOSNEGOCIO') {
        CargaPanelResultadosNegocio();
    }
    else if (nombre === 'PANELRESULTADOSLLAMADA') {
        CargaPanleResultadoLlamadas();
    }
    else if (nombre === 'PANELDISTESTADOAGENTES') {
        CargaPanlEstadoAgentes();
    }
// Complejo ya que usa varios arrays para generar los datos, de entrada no lo hago   else if (nombre === 'PANELDISTRESULTADOAGENTES') {
//        CargaPanleResultadoAgentes();
//     }
    else {
        ActualizarInforme();
    }
}

// 1
function CargaPanelInformeSemanal() {

    var fecha = $('#selFechaDistSemanal').val();
    var idlista = $('#selIdLista').val();
    var idfiltro = $('#selIdFiltro').val();

    var params = { 'fecha': fecha, 'idlista': idlista, 'idfiltro': idfiltro };

    $.ajax({
        type: "POST",
        url: getAbsolutePath() + "/SupervisionCampana.aspx/GetDatosInformeSemanal",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: true,
        cache: false,
        success: function (data) {
            if (data === null) {
                alert('Se ha producido un error al recuperar los datos del informe semanal ');
            }

            var datosChart = $.parseJSON(data.d);

            var Combined = new Array();
            Combined[0] = ['Día', 'No Tocados', 'Reprogramados'];
            for (var i = 0; i < datosChart.length; i++) {
                Combined[i + 1] = [datosChart[i].Dia, datosChart[i].NoTocados, datosChart[i].Reprogramados];
            }

            drawChartCampanaDistSemanal(Combined);
            $('#btnspin').css('display','none');

        }, error: function (e) {
            $('#btnspin').css('display', 'none');
            alert(e);
        }
    });
}


// 2
function CargaPanelInformeDiario() {
    var fecha = $('#selFechaDistDiaria').val();
    var idlista = $('#selIdLista').val();
    var idfiltro = $('#selIdFiltro').val();

    var params = { 'fecha': fecha, 'idlista': idlista, 'idfiltro': idfiltro };

    $.ajax({
        type: "POST",
        url: getAbsolutePath() + "/SupervisionCampana.aspx/GetDatosInformeDiario",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: true,
        cache: false,
        success: function (data) {
            if (data === null) {
                alert('Se ha producido un error al recuperar los datos del informe diario ');
            }

            var datosChart = $.parseJSON(data.d);
            var Combined = new Array();
            Combined[0] = ['Hora', 'No Tocados', 'Reprogramados'];
            for (var i = 0; i < datosChart.length; i++) {
                Combined[i + 1] = [datosChart[i].Dia, datosChart[i].NoTocados, datosChart[i].Reprogramados];
            }
            
            drawChartCampanaDistDiaria(Combined);
            $('#btnspin').css('display', 'none');
        }, error: function (e) {
            $('#btnspin').css('display', 'none');
            alert(e);
        }
    });

}


// 3
function CargaPanelInformeHorario() {
    var fecha = $('#selFechaDistHoraria').val();
    var hora = $('#selHoraDistHoraria').val();
    var idlista = $('#selIdLista').val();
    var idfiltro = $('#selIdFiltro').val();

    var params = { 'fecha': fecha, 'hora': hora, 'idlista': idlista, 'idfiltro': idfiltro };

    $.ajax({
        type: "POST",
        url: getAbsolutePath() + "/SupervisionCampana.aspx/GetDatosInformeHorario",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: true,
        cache: false,
        success: function (data) {
            if (data === null) {
                alert('Se ha producido un error al recuperar los datos del informe por hora ');
            }

            var datosChart = $.parseJSON(data.d);
            var Combined = new Array();
            Combined[0] = ['Minuto', 'No Tocados', 'Reprogramados'];
            for (var i = 0; i < datosChart.length; i++) {
                Combined[i + 1] = [datosChart[i].Dia, datosChart[i].NoTocados, datosChart[i].Reprogramados];
            }

            drawChartCampanaDistHoraria(Combined);
            $('#btnspin').css('display', 'none');
        }, error: function (e) {
            $('#btnspin').css('display', 'none');
            alert(e);
        }
    });
}


// 4
function CargaPanelDistribucionEstado() {
    var idlista = $('#selIdLista').val();
    var idfiltro = $('#selIdFiltro').val();
    var params = { 'idlista': idlista, 'idfiltro': idfiltro };

    $.ajax({
        type: "POST",
        url: getAbsolutePath() + "/SupervisionCampana.aspx/GetDatosDistribucionEstado",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: true,
        cache: false,
        success: function (data) {
            if (data === null) {
                alert('Se ha producido un error al recuperar los datos del informe distribución de estados ');
            }

            var datosChart = $.parseJSON(data.d);
            var Combined = new Array();
            Combined[0] = ['Estado', 'Registros'];
            for (var i = 0; i < datosChart.length; i++) {
                Combined[i + 1] = [datosChart[i].Dato1, datosChart[i].Dato2];
            }

            drawChartCampanaDistEstado(Combined);
            $('#btnspin').css('display', 'none');
        }, error: function (e) {
            $('#btnspin').css('display', 'none');
            alert(e);
        }
    });
}


// 5
function CargaPanelDistribucionResultado() {
    var idlista = $('#selIdLista').val();
    var idfiltro = $('#selIdFiltro').val();
    var params = { 'idlista': idlista, 'idfiltro': idfiltro };

    $.ajax({
        type: "POST",
        url: getAbsolutePath() + "/SupervisionCampana.aspx/GetDatosDistribucionResultado",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: true,
        cache: false,
        success: function (data) {
            if (data === null) {
                alert('Se ha producido un error al recuperar los datos del informe distribución de resultados ');
            }

            var datosChart = $.parseJSON(data.d);
            var Combined = new Array();
            Combined[0] = ['Res.Negocio', 'Registros'];
            for (var i = 0; i < datosChart.length; i++) {
                Combined[i + 1] = [datosChart[i].Dato1, datosChart[i].Dato2];
            }

            drawChartCampanaDistResultado(Combined);
            $('#btnspin').css('display', 'none');
        }, error: function (e) {
            $('#btnspin').css('display', 'none');
            alert(e);
        }
    });
}


///
/// 6
function CargaPanelResultadosRegistro() {
    var fechadesde = $('#selFechaDesdeResRegistro').val();
    var fechahasta = $('#selFechaHastaResRegistro').val();
    var operadores = $('#selOperadoresResRegistro').val();
    var idlista = $('#selIdLista').val();
    var params = { 'fechadesde': fechadesde, 'fechahasta': fechahasta, 'operadores': operadores, 'idlista': idlista };

    $.ajax({
        type: "POST",
        url: getAbsolutePath() + "/SupervisionCampana.aspx/GetDatosResultadosRegistro",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: true,
        cache: false,
        success: function (data) {
            if (data === null) {
                alert('Se ha producido un error al recuperar los datos del informe por hora ');
            }

            var datosChart = $.parseJSON(data.d);
            var Combined = new Array();
            Combined[0] = ['Resultado', 'Registros'];
            for (var i = 0; i < datosChart.length; i++)
            {
                Combined[i + 1] = [datosChart[i].Dato1, datosChart[i].Dato2];
            }

            drawChartCampanaResRegistro(Combined);
            $('#btnspin').css('display', 'none');
        }, error: function (e) {
            $('#btnspin').css('display', 'none');
            alert(e);
        }
    });
}


///
/// 7
function CargaPanelResultadosNegocio() {
    var fechadesde = $('#selFechaDesdeResNegocio').val();
    var fechahasta = $('#selFechaHastaResNegocio').val();
    var operadores = $('#selIdOperadorResNegocio').val();
    var idlista = $('#selIdLista').val();
    var params = { 'fechadesde': fechadesde, 'fechahasta': fechahasta, 'operadores': operadores, 'idlista': idlista };

    $.ajax({
        type: "POST",
        url: getAbsolutePath() + "/SupervisionCampana.aspx/GetDatosResultadosNegocio",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: true,
        cache: false,
        success: function (data) {
            if (data === null) {
                alert('Se ha producido un error al recuperar los datos del informe por hora ');
            }

            var datosChart = $.parseJSON(data.d);
            var Combined = new Array();
            Combined[0] = ['Resultado', 'Registros'];
            for (var i = 0; i < datosChart.length; i++) {
                Combined[i + 1] = [datosChart[i].Dato1, datosChart[i].Dato2];
            }

            drawChartCampanaResNegocio(Combined);
            $('#btnspin').css('display', 'none');
        }, error: function (e) {
            $('#btnspin').css('display', 'none');
            alert(e);
        }
    });
}


/// 8
function CargaPanleResultadoLlamadas() {


    var fechadesde = $('#selFechaDesdeResLlamada').val();
    var fechahasta = $('#selFechaHastaResLlamada').val();
    var operadores = $('#selOperadoresResLlamada').val();
    var idlista = $('#selIdLista').val();
    var params = { 'fechadesde': fechadesde, 'fechahasta': fechahasta, 'operadores': operadores, 'idlista': idlista };

    $.ajax({
        type: "POST",
        url: getAbsolutePath() + "/SupervisionCampana.aspx/GetDatosResultadosLlamada",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: true,
        cache: false,
        success: function (data) {
            if (data === null) {
                alert('Se ha producido un error al recuperar los datos del informe por hora ');
            }

            var datosChart = $.parseJSON(data.d);
            var Combined = new Array();
            Combined[0] = ['Resultado', 'Registros'];
            for (var i = 0; i < datosChart.length; i++) {
                Combined[i + 1] = [datosChart[i].Dato1, datosChart[i].Dato2];
            }

            drawChartCampanaResTelefonico(Combined);
            $('#btnspin').css('display', 'none');
        }, error: function (e) {
            $('#btnspin').css('display', 'none');
            alert(e);
        }
    });

}


function CargaPanlEstadoAgentes() {
    /// 9

    var fechadesde = $('#selFechaDesdeDistEstadoAgente').val();
    var fechahasta = $('#selFechaHastaDistEstadoAgente').val();
    var idlista = $('#selIdLista').val();
    var params = { 'fechadesde': fechadesde, 'fechahasta': fechahasta, 'idlista': idlista };

    $.ajax({
        type: "POST",
        url: getAbsolutePath() + "/SupervisionCampana.aspx/GetDatosEstadoAgentes",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: true,
        cache: false,
        success: function (data) {
            if (data === null) {
                alert('Se ha producido un error al recuperar los datos del informe por hora ');
            }

            var datosChart = $.parseJSON(data.d);
            var Combined = new Array();

            for (var i = 0; i < datosChart.length; i++) {
                Combined[i] = [datosChart[i].Operador, datosChart[i].Registros, datosChart[i].Finalizados, datosChart[i].Reprogramados, datosChart[i].ParaSupervision, datosChart[i].Rechazados];
            }

            drawChartCampanaDistEstadoAgente(Combined);
            $('#btnspin').css('display', 'none');
        }, error: function (e) {
            $('#btnspin').css('display', 'none');
            alert(e);
        }
    });
}


// 10
function CargaPanleResultadoAgentes() {
    // 10
    var fechadesde = $('#selFechaDesdeDistResultAgente').val();
    var fechahasta = $('#selFechaHastaDistResultAgente').val();
    var idlista = $('#selIdLista').val();
    var params = { 'fechadesde': fechadesde, 'fechahasta': fechahasta, 'idlista': idlista };

    $.ajax({
        type: "POST",
        url: getAbsolutePath() + "/SupervisionCampana.aspx/GetDatosResultadoNegAgentes",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: true,
        cache: false,
        success: function (data) {
            if (data === null) {
                alert('Se ha producido un error al recuperar los datos del informe por hora ');
            }

            var datosChart = $.parseJSON(data.d);
            var Combined = new Array();

            for (var i = 0; i < datosChart.length; i++) {
                Combined[i] = [datosChart[i].Operador, datosChart[i].Registros, datosChart[i].Finalizados, datosChart[i].Reprogramados, datosChart[i].ParaSupervision, datosChart[i].Rechazados];
            }

            drawChartCampanaDistEstadoAgente(Combined);
            $('#btnspin').css('display', 'none');
        }, error: function (e) {
            $('#btnspin').css('display', 'none');
            alert(e);
        }
    });


}