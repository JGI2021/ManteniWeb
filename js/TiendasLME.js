
function CargaDDIs(ddis)
{
    var arrddis = new Array();
    // Separo los ddis en un array
    arrdis = ddis.split(',');
    // Gurado los DDIS que tiene el centro en variable oculta
    $('#DDISCENTRO').val(ddis);

    var html = "<br/><br/><br/> ";
    html += "<div class='col' style='margin-left:10px'> ";
    html += "   <b><label for='NombreTip' class='col control-label EstiloEtiquetaForm'> DDIs del centro <span style='color:red;'>*</span> </label></b> ";
    html += "   <div class='col-lg-9 col-md-9 col-sm-9' style='padding-left:0px;padding-right:0px;'> ";
    html += "   <table id='tableDDIS' class='footable'> ";

    if (ddis.trim() !== '')
    {
        for (i = 0; i <= arrdis.length - 1; i++)
        {
            html += "<tr id='row_" + arrdis[i] + "' > ";
            html += "  <td style='display: table-cell;'>" + arrdis[i] + "</td> ";
            html += "  <td style='display: table-cell;'><button type='button' class='btn btn-default' title='Elimina DDI' style='margin-bottom:0px;padding-top: 3px;padding-bottom: 1px;' onclick='EliminaDDI(\"" + arrdis[i] + "\");' > <span class='fa fa-trash-o' /> </button></td> ";
            html += "</tr>";
        }
    }

    html += "   </table>";    
    html += "   </div>";

    html += "   <div class='row rowSeparacion25'>";
    html += "      <div class='col-lg-7 col-md-7 col-sm-7' style='padding-right:10px;' > ";
    html += "         <input type='text' maxlenhth='20' class='form-control focusedInput input-sm' id='inputDDI' value='' />";
    html += "      </div>";
    html += ""
    html += "      <div class='col-lg-2 col-md-2 col-sm-2' style='padding-left:0px'> ";
    html += "         <button type='button' id='BotonAnadirTipSecundaria' name='BotonAnadirTipSecundaria' class='btn fa fa-plus botonAnade2' onClick='AniadirDDI()'> </button>";
    html += "      </div>";
    html += "   </div> ";

    html += "</div> ";
        $('.panelPrincipalDerecha').append(html);
    //$('#DDISCENTROS').html(html);
    //$('#PANELGENERALES').append(html);
}


function AniadirDDI()
{
    /// DDI que se ha metido
    var inputDDI = $('#inputDDI').val();
    inputDDI = inputDDI.replace(/\s+/g, "");
    // Si no hay valor no hago nada
    if (inputDDI === undefined || inputDDI === null || inputDDI === '')
        return;
    // 
    var ddiscentro = $('#DDISCENTRO').val();
    var arrddis = new Array();
    // Separo los ddis en un array
    arrddis = ddiscentro.split(',');
    // Si se ha introducido un valor miro si existe en la lista de DDIs
    if (jQuery.inArray(inputDDI, arrddis) === -1)
    {
        if (ddiscentro === null || ddiscentro === '')
            ddiscentro = inputDDI;
        else
            ddiscentro += "," + inputDDI;

        $('#DDISCENTRO').val(ddiscentro);

        var filaddi = "<tr id='row_" + inputDDI + "' > ";
        filaddi += "  <td style='display: table-cell;'>" + inputDDI + "</td> ";
        filaddi += "  <td style='display: table-cell;'><button type='button' class='btn btn-default' title='Elimina DDI' style='margin-bottom:0px;padding-top: 3px;padding-bottom: 1px;' onclick='EliminaDDI(\"" + inputDDI + "\");' > <span class='fa fa-trash-o' /> </button></td> ";
        filaddi += "</tr>";

        $('#tableDDIS').append(filaddi);
        $('#inputDDI').val('');
    }
    else
    {
        alert("Ya existe ese DDI (" + inputDDI + ") asociado al centro ");
    }
}


function EliminaDDI(ddi)
{
    var ddiscentro = $('#DDISCENTRO').val();
    var arrddis = new Array();
    arrddis = ddiscentro.split(',');

    // Elimino el DDI de de la tabala y del campo DDISCENTRO
    if (jQuery.inArray(ddi, arrddis) !== -1 )
    {
        ddiscentro = '';
        for (i = 0; i <= arrddis.length - 1; i++)
        {
            // si el distinto del que se va a eliminar lo paso a ddiscentro
            if (arrddis[i] !== ddi) {
                if (ddiscentro === '')
                    ddiscentro = arrddis[i];
                else
                    ddiscentro += ',' + arrddis[i];
            }
        }
        // Ahora paso los ddis del centro al campo DDISCENTRO ya sin el eliminado
        $('#DDISCENTRO').val(ddiscentro);
        // ahora lo borro de la tabla
        $('#row_' + ddi).remove();
    }
}