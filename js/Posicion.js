

class Reglas {
    constructor(posicion, extension, tipollamada, grabar) {
        this.posicion = '' + posicion;
        this.extension = extension;
        this.tipollamada = tipollamada;
        this.grabar = grabar;
    }
}


// Variable donde se guardan los valores de los campos de la tabla de trabajo
var arrReglas = [];

function ReglasGrabacionPosSatelite(idpos) {
    var params = 'idposicion=' + idpos;
    var rpos = 0;
    arrReglas = [];

    $.ajax({
        type: "POST", 
        url: getAbsolutePath() + "/Conexiones.asmx/GetReglasGrabacionPosSatelite",
        data: params, 
        success: function (data) {
            $('#REGLASGRABACION').empty();
            var addRegistro = HtmlIntroducirRegistro(idpos);
            var tabla = "<div class='row'>  \n" +
                        "   <div class='col-lg-12 col-md-12 col-sm-12'> \n";
            tabla += "           <table id='tablaReglas' class='footable table-striped' >  \n" +
                        "              <thead> \n" +
                        "                  <th>Posición</th> \n" +
                        "                  <th>Extensión</th> \n " +
                        "                  <th>Llamada</th> \n" +
                        "                  <th>Grabar</th>  \n" +
                        "                  <th>Acción</th> \n" +
                        "              </thead> \n" +
                        "              <tbody> \n ";
            $.each(data, function (index, value) {
                tabla += RellenaTablaConDatos(value, rpos);
                rpos += 1;
            });

            var fintabla =   "               </tbody> \n" +
                       "            </table> \n" +
                       "    </div> \n" +
                       "<div> \n";
            tabla += "<script> $('.footable').footable({ 'empty': 'Sin registros'  });\n </script>";
            $('#REGLASGRABACION').html(addRegistro + tabla + fintabla);
        }            
    });  
}


function ReglasGrabacionPosSateliteParam(idpos, reglaspos) {
    var params = 'idposicion=' + idpos;
    var rpos = 0;
    arrReglas = [];

    $('#REGLASGRABACION').empty();
    var addRegistro = HtmlIntroducirRegistro(idpos);
    var tabla = "<div class='row'>  \n" +
                "   <div class='col-lg-12 col-md-12 col-sm-12'> \n";
    tabla += "           <table id='tablaReglas' class='footable table-striped'>  \n" +
                "              <thead> \n" +
                "                  <th>Posición</th> \n" +
                "                  <th>Extensión</th> \n " +
                "                  <th>Llamada</th> \n" +
                "                  <th>Grabar</th>  \n" +
                "                  <th>Acción</th> \n" +
                "              </thead> \n" +
                "              <tbody> \n ";
    if (reglaspos !== undefined && reglaspos !== null && reglaspos !== '') {
        var myobj = $.parseJSON(reglaspos);
        for (i = 0; i < myobj.length ; i++) {
            var dt = myobj[i];
            if (!ExisteRegla(dt)) {
                tabla += RellenaTablaConDatos(dt, rpos);
            }
            rpos += 1;
        }
    }
 

    tabla += "               </tbody> \n" +
             "            </table> \n" +
             "    </div> \n" +
             "<div> \n";

    var fintabla = "<script> $('.footable').footable( { 'empty': 'Sin registros'  });\n </script>";
    $('#REGLASGRABACION').html(addRegistro + tabla + fintabla);
 
 }


function RellenaTablaConDatos(regla, rpos)
{
    if (regla.posicion === "undefined")
        regla.posicion = "0";

    var posicion = regla.posicion;
    if (posicion    === "0")
        posicion = "GLOBAL";

    var extension = regla.extension;
    if (extension.toUpperCase() === "0")
        extension = "TODAS";

    var llamada = regla.tipollamada;
    if (llamada === "0")
        llamada = "ENTRANTE/SALIENTE";
    else if (llamada === "1")
        llamada = "ENTRANTE";
    else if (llamada === "2")
        llamada = "SALIENTE";

    var grabar = regla.grabar;
    if (grabar === "1")
        grabar = "SÍ";
    else
        grabar = "NO";

    var linea = "      <tr id='row_" + rpos + "'> \n" +
                "         <td>" + posicion + "</td> \n" +
                "         <td>" + extension + "</td> \n" +
                "         <td>" + llamada + "</td> \n" +
                "         <td>" + grabar + "</td> \n";
    if (posicion !== "GLOBAL")
        linea += "         <td>" + AddAccionEliminar(posicion, extension, rpos) + "</td> \n";
    else
        linea += "         <td></td> \n";
        linea += "      </tr> \n";
    // damos de alta la regla
    arrReglas.push(new Reglas(regla.posicion, regla.extension, regla.tipollamada, regla.grabar));
    GuardaReglasEnVariable();
    return linea;
}


function ExisteRegla(rg)
{
    // Si ya existe no genero línea
    for (a = 0; a < arrReglas.length; a++)
    {
        var re = arrReglas[a];
        if (re.posicion === rg.posicion && re.extension === rg.extension && re.tipollamada === rg.tipollamada)
            return true;
    }

    return false;
}





function AddAccionEliminar(idpos, extension, rowpos)
{
    return "<a href='#'  ><span class='fa fa-remove fa-lg' style='color:red;' onclick='return EliminaRegistro(\"" + idpos + "\",\"" + extension + "\",\"" + rowpos + "\");'></span></a>";
}

function HtmlIntroducirRegistro(idpos)
{
    var linea = "\n" +
//                "<input type='hidden' id='idReglasGrabacion' name='idReglasGrabacion' value='' /> \n" +
                "<div class='row' style='margin-left:17px;margin-bottom:10px;'>  \n" +
                "   <div class='col-lg-12 col-md-12 col-sm-12'> \n" +
                "       <div class='row rowSeparacion25' style='padding-boton:0px;'> \n" +
                "          <div class='col-lg-3 form-group' style='padding-left:0px;'> \n" +
                "              <label for='extension' class='control-label'>Extensión </label> &nbsp; \n" + 
                "              <input id='extension' maxlength='10' style='text-align:center; width:150px;padding-right:0px;' type='number' /> \n" +
                "          </div> \n " +
                "          <div class='col-lg-3 form-group' style='padding-left:0px;'> \n" +
                "              <label for='selectTipoLlamada' class='control-label EstiloEtiquetaForm'>Llamada </label> &nbsp; \n " +
                "              <select id='selectTipoLlamada' class='input-sm' name='selectTipoLlamada' > " +
                "                    <option value='0'>ENTRANTE/SALIENTE</option> " +
                "                    <option value='1'>ENTRANTE</option> " +
                "                    <option value='2'>SALIENTE</option> " +
                "              </select> \n" +
                "          </div> \n" +
                "          <div class='col-lg-3 form-group' style='padding-left:0px;'> \n" +
                "              <label for='selectgrabar' class='control-label EstiloEtiquetaForm' >Grabar </label> &nbsp; \n " +
                "              <select id='selectgrabar' class='input-sm' name='selectgrabar' > \n " +
                "                  <option value='0'>NO</option> \n " +
                "                  <option value='1'>SÍ</option> \n" +
                "              </select> \n" +
                "              <input type='hidden' id='idposicion' value='" + idpos + "' />  \n" +
                "              <button type='button' class='btn btn-default botonFicha2' title='Añadir' id='BotonAniadir' style='padding: 5px 14px 3px 14px !important; margin-bottom: 0px; margin-left: 45px !important;' onclick='AniadeRegistro()' > " + 
                "                 <span class='fa fa-plus fa-lg'></span> " + 
                "              </button> \n" +
                "          </div> \n" +
                "       </div> \n" +
                "   </div> \n " +
                "</div> \n";

    return linea;
}



function AniadeRegistro()
{
    var idpos = $('#idposicion').val();
    var extension = $('#extension').val();
    var tipollamada = $('#selectTipoLlamada option:selected').text();
    var grabar = $('#selectgrabar option:selected').text();

    var iTipoLlamada = "0";   // Entrante y saliente
    var igrabar = "0";        // No grabar

    if (tipollamada === 'ENTRANTE')
        iTipoLlamada = "1";
    else if (tipollamada === 'SALIENTE')
        iTipoLlamada = "2";

    if (grabar === 'SÍ')
        igrabar = "1";


    if (extension <= "0" || extension === "")
    {
        alert('La extensión no puede ser negativa ni quedarse en blanco');
        return;
    }

    // Reviso que no exite el nuevo registro
    for (a = 0; a <= arrReglas.length - 1; a++) {
        var regla = arrReglas[a];

        if (regla.posicion === idpos && regla.extension === extension && regla.tipollamada === "0" )
        {
            alert("Ya existe una regla para esa posición y extensión para todas las llamadas");
            return;
        }
        else if (regla.posicion === idpos && regla.extension === extension && regla.tipollamada !== "0" && regla.tipollamada === iTipoLlamada) {
            alert("Ya existe una regla para esa posición , extensión y tipo de llamada");
            return;
        }
        else if (regla.posicion === idpos && regla.extension === extension && regla.tipollamada !== "0" && iTipoLlamada === 0) {
            alert("No se puede poner una regla de entrante/saliente cuando ya exite una regla de tipo entrante o saliente para la posición y extensión");
            return;
        }
    }

    // Añado el dato a la tabla
    var fila = "<tr id='row_" + arrReglas.length + "'> \n" +
                "   <td>" + idpos + "</td> \n" +
                "   <td>" + extension + "</td> \n" +
                "   <td>" + tipollamada + "</td> \n" +
                "   <td>" + grabar + "</td> \n";
    if (idpos !== 0) 
        fila += "   <td>" + AddAccionEliminar(idpos, extension, arrReglas.length) + "</td> \n";
    else            
        fila += "   <td></td> \n";
                "</tr> \n";
    $('#tablaReglas tbody').append(fila);
    // Añado en el array
    arrReglas.push(new Reglas(idpos, extension, iTipoLlamada, igrabar))
    GuardaReglasEnVariable();
    // Limpia 
    Limpia();

}



function EliminaRegistro(idpos, extension, idrow)
{    
    for (a = 0; a <= arrReglas.length - 1; a++) {
        var regla = arrReglas[a];
        if (regla.posicion === idpos && regla.extension === extension) {
            RemoveRowFromTable(idrow);
            Limpia();
            break;
        }
    }
}


function RemoveRowFromTable(idrow)
{
    $('#row_' + idrow).remove();
    arrReglas.splice(idrow, 1);
}

function Limpia()
{
    $('#extension').val();
    $('#selectTipoLlamada option[value="0"]');
    $('#selectgrabar option[value="1"]');
    GuardaReglasEnVariable();
}


function GuardaReglasEnVariable()
{
    var myJsonString = JSON.stringify(arrReglas);
    $('#idReglasGrabacion').val(myJsonString);

}