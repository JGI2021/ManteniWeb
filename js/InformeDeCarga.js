
function GuardaCampanaSeleccionada(id)
{
    $('#idcampanasselected').val(id );
}


function GuardaridProceso(id)
{
    $('#idprocesoselected').val(id);
}


function GuardarEstadoSeleccionado(id)
{
    $('#estadoseleccionado').val(id);
}


function GuardarEstadoSeleccionadoHist(id) {
    $('#estadoseleccionadoHist').val(id);
}


function MarcaRadioSeleccionado(id)
{
    $('#checkseleccionado').val(id);
}



function InformeNegocio()
{
    if ($('#tipodeinforme').val() !== "1")
        $('#DivTablaNegocio').html('');

    $('#tipodeinforme').val('1');
    $('#divfiltros').css('display', 'inline-block');
    $('#filaFechas').css('display', 'none');
    $('#FilaEstados2').css('display', 'none');
    $('#divproceso').css('visibility', 'visible');
    $('#BbotonAceptarF').css('display', 'inline-block');
    $('#BbotonAceptarF').css('visibility', 'visible');
    $('#BbotonAceptarF').css('disabled', '');
//    $('#divbutons').removeClass('mytext-left');
//    $('#divbutons').addClass('mytext-right');
    $('#OptionButtonVP_1').css({ 'border': '1px solid #908a8a' });
    $('#OptionButtonVP_2').css({ border: 'none' });
    $('#OptionButtonVP_1').css('background-color', '#eee');
    $('#OptionButtonVP_2').css('background-color', 'transparent');
    $('#OptionButtonVP_3').css({ 'border': 'none' });
    $('#OptionButtonVP_3').css('background-color', 'transparent');
    $('#FilaEstados').css('display', 'block');
}

function InformeRegistros()
{
    $('#tipodeinforme').val('2');
    $('#divfiltros').css('display', 'none');
    $('#filaFechas').css('display', 'none');
    $('#FilaEstados').css('display', 'block');
    $('#FilaEstados2').css('display', 'none');
    $('#divproceso').css('visibility', 'hidden');
    $('#BbotonAceptarF').css('display', 'none');
//    $('#divbutons').removeClass('mytext-right');
//    $('#divbutons').addClass('mytext-left');
    
    $('#OptionButtonVP_2').css({ 'border': '1px solid #908a8a' });
    $('#OptionButtonVP_1').css({ border: 'none' });
    $('#OptionButtonVP_2').css('background-color', '#eee');
    $('#OptionButtonVP_1').css('background-color', 'transparent');
    $('#OptionButtonVP_3').css({ 'border': 'none' });
    $('#OptionButtonVP_3').css('background-color', 'transparent');

    $('#DivTablaNegocio').css('visibility', 'hidden');
    $('#DivTablaNegocio').html('');
    $('#filaFechas').css('visibility', 'none');
}

function InformeHistorico() {
    if ($('#tipodeinforme').val() !== "3")
        $('#DivTablaNegocio').html('');

    $('#tipodeinforme').val('3');
    $('#divfiltros').css('display', 'inline-block');
    $('#filaFechas').css('display', 'block');
    $('#FilaEstados').css('display', 'none');
    $('#FilaEstados2').css('display', 'block');
    $('#divproceso').css('visibility', 'visible');
    $('#BbotonAceptarF').css('display', 'inline-block');
    $('#BbotonAceptarF').css('visibility', 'visible');
    $('#BbotonAceptarF').css('disabled', '');
//    $('#divbutons').removeClass('mytext-left');
//    $('#divbutons').addClass('mytext-right');
    $('#OptionButtonVP_1').css({ 'border': 'none' });
    $('#OptionButtonVP_2').css({ 'border': 'none' });
    $('#OptionButtonVP_1').css('background-color', 'transparent');
    $('#OptionButtonVP_2').css('background-color', 'transparent');
    $('#OptionButtonVP_3').css({ 'border': '1px solid #908a8a' });
    $('#OptionButtonVP_3').css('background-color', '#eee');
    $('#filaFechas').css('visibility', 'visible');
}


function VolverAtras() {
    $('#OptionButtonVP_1').css({ 'border': 'none' });
    $('#OptionButtonVP_2').css({ 'border': 'none' });
    $('#OptionButtonVP_1').css('background-color', 'transparent');
    $('#OptionButtonVP_2').css('background-color', 'transparent');
    $('#OptionButtonVP_3').css({ 'border': 'none' });
    $('#OptionButtonVP_3').css('background-color', '#transparent');

    RetrocederPagina();
}



///************************************************************
// Se ha pulsado el botón de cargar. Valida los datos y actualiza
// unos campos antes de hacer el submit
//*************************************************************
function HacerSubmitCargar() {

    if (!ValidaDatosInformeCarga()) {        
        return;
    }

    $('#botonAceptarF').val('true');
    $('#salir').val('false');
    $('#exportar').val('false');
    $('#formASP').submit();

}


function HacerSubmitExportar()
{
    if (!ValidaDatosInformeCarga()) {
        return;
    }

    if ($('#idProceso').val() === '') {
        alert('Se debe seleccionar un proceso de carga');
        return;
    }
    $('#botonAceptarF').val('true');
    $('#exportar').val('true');
    $('#salir').val('false');
    $('#formASP').submit();

}


function ValidaDatosInformeCarga()
{
    var tipoinforme =  $('#tipodeinforme').val();

    if ($('#idcampanasselected').val() === '' || $('#idcampanasselected').val() === null)
    {
        alert("Debe seleccionar una campaña");
        return false;
    }

    if (tipoinforme === 1) 
    {
        if ($('#idprocesoselected').val() === null || $('#idprocesoselected').val() === '' )
        {
            alert('Debe seleccionar un proceso de carga');
            return false;
        }
    }

    if (tipoinforme === 3)
    {
        if ($('#idprocesoselected').val() === null || $('#idprocesoselected').val() === '') {
            alert('Debe seleccionar un proceso de carga');
            return false;
        }

        if ($('#FechaDesde').val() > $('#FechaHasta').val() )
        {
            alert('La fecha de inicio no puede ser superior a la fecha fin');
            return false;
        }

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var stoday = yyyy + '/' + mm + '/' + dd;
        
        if ($('#FechaDesde').val() > stoday) {
            alert('La fecha de inicio es mayor que la fecha actual');
            return false;
        }
    }

    return true;
}
