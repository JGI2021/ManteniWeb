
class PrefijosReglas {
    constructor(ordenReal, activo, prefijo, regla,id, idReg) {
        this.activo = activo;
        this.datosPrefijo = prefijo;
        this.datosRegla = regla;
        this.hayCambios = true;
        this.cambioEstado = 1;
        this.ordenReal = ordenReal;
        this.id = id;
        this.idReg = idReg;
    }
}

class MarcacionesAni {
    contructor(id, ani) {
        this.marcacionANIId = id;
        this.ANI = ani;
    }
}


class DatosPrefijo {
    constructor() {
        this.prefijo = "";
        this.descripcionPrefijo = "";
    }
}

class DatosRegla {
    constructor() {
        this.regla = "";
        this.descripcionRegla = "";
        this.nombreRegla = "";
        this.capability = 0;
        this.digitosAQuitar = 0;
        this.prefijoOP = "";  // Preguntar si es unn prefijo como el de Marcacion Prefijos
        this.prefijoPBX = "";
        this.sufijoANI = "";
        this.sufijoDNIS;
        this.currentAnigrouStatDate = new Date();
        this.lsAnisRegla = new Array();
    }
}



var arrMarcacionesGrupo = new Array();
var arrDatosPrefijos = new Array();
var arrDatosReglas = new Array();



document.addEventListener('DOMContentLoaded', (event) => {
    function handleDragStart(e) {
        this.style.opacity = '0.4';

        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragEnd(e) {
        this.style.opacity = '1';

        items.forEach(function (item) {
            item.classList.remove('over');
        });
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }

        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');
    }

    function handleDrop(e) {
        e.stopPropagation();

        if (dragSrcEl !== this) {
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
            
            ActualizaDatosEnArrMarcaciones(dragSrcEl, this);          
        }

        return false;
    }

    let items = document.querySelectorAll('.row .cajaRegla');
    items.forEach(function (item) {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('dragenter', handleDragEnter);
        item.addEventListener('dragleave', handleDragLeave);
        item.addEventListener('dragend', handleDragEnd);
        item.addEventListener('drop', handleDrop);
    });
    
    CargaArraysDeReglasYPrefijos();

});


function GuardarCambiosMarcaciones() {
    let datos = JSON.stringify(arrMarcacionesGrupo);
    $("#hidlsMarcaciones").val(datos);
}

/* -----------------------------------------------
   Se cargan en memoria todos los datos de reglas, prefijos y marcaciones para su uso en funciones de cambio
   ----------------------------------------------- */
function CargaArraysDeReglasYPrefijos() {
    let strDatosprefijos = $("#hiddatosPrefijos").val();
    if (strDatosprefijos) {
        strDatosprefijos = strDatosprefijos.replaceAll("@&", "\"").replaceAll("@#", "'");
        arrDatosPrefijos = JSON.parse(strDatosprefijos);
    }

    let strDatosReglas = $("#hiddatosReglas").val();
    if (strDatosReglas) {
        strDatosReglas = strDatosReglas.replaceAll("@&", "\"").replaceAll("@#","'");
        arrDatosReglas = JSON.parse(strDatosReglas);
    }

    let strMarcacionesGrupo = $("#hidlsMarcaciones").val();
    if (strMarcacionesGrupo) {
        strMarcacionesGrupo = strMarcacionesGrupo.replaceAll("@&", "\"").replaceAll("@#", "'");
        arrMarcacionesGrupo = JSON.parse(strMarcacionesGrupo);
    }
}


function ActualizaDatosEnArrMarcaciones(datoOrigen, datoDestino) {
    let idDestino = datoDestino.id.substring(9);
    let idOrigen = datoOrigen.id.substring(9);
    let marcacionOrigen = null;
    let marcacionDestino = null;
    for (let i = 0; i < arrMarcacionesGrupo.length; i++) {
        let marcacion = arrMarcacionesGrupo[i];
        if (marcacion.idReg === idOrigen) {
            marcacionOrigen = marcacion;
        }
        else if (marcacion.idReg === idDestino) {
            marcacionDestino = marcacion;
        }
    }

    if (marcacionDestino !== null && marcacionOrigen !== null) {
        let valorAux = marcacionDestino.ordenReal;        
        marcacionDestino.ordenReal = marcacionOrigen.ordenReal;
        $("#orden_" + idDestino).text(marcacionOrigen.ordenReal.toString());
        marcacionOrigen.ordenReal = valorAux;
        $("#orden_" + idOrigen).text(valorAux.toString());

        marcacionDestino.hayCambios = true;        
        marcacionOrigen.hayCambios = true;
        marcacionDestino.cambioEstado = 2;
        marcacionOrigen.cambioEstado = 2;

        GuardarCambiosMarcaciones();
    }
}



function DameRegistro(idReg) {
    for (let i = 0; i < arrMarcacionesGrupo.length; i++) {
        let item = arrMarcacionesGrupo[i];
        if (item.idReg === idReg) {
            return item;
        }
    }

    return null;
}

function AniadeRegistro() {

    let ordenReal = 1;
    let idReg = "N" + arrMarcacionesGrupo.length;

    arrMarcacionesGrupo.forEach(prfRg => {
        if (prfRg.cambioEstado !== 3) {
            ordenReal += 1;
        }
    });

    // Nuevo registro en el array de marcaciones
    arrMarcacionesGrupo.push(new PrefijosReglas(ordenReal, 1, new DatosPrefijo(), new DatosRegla(),0, idReg));

    let html = "<li class='list-group-myitem' id='li_" + idReg + "'>";
    html += "  <div class='row cajaRegla' id='divRegla_" + idReg + "' draggable = 'true' style='color:blue;font-weigth:600;' > ";
    html += "    <div id='orden_" + idReg + "' class='col-lg-1 cls-orden'>" + ordenReal + "</div>" +
            "    <div class='col-lg-2' style='display:inline-flex;'>" + ComboPrefijos(idReg) +"</div>" +
            "    <div class='col-lg-3' style='display:inline-flex;'>" + ComboReglas(idReg) + " " +
            "    " + CrearBotonRegla(idReg) + " "  +
            "    </div>  ";
    html += "    <div class='col-lg-2'>" + ComboActivo(idReg) + "</div>  ";
    html += "    <div class='col-lg-4 top-7' id='trunkANIs_" + idReg + "'> ";
            //"    </div> ";
    //    html += "    <div class='col-lg-2 top-7' id='anisRegla_" + idReg +"'></div>";
    //html += "    <div class='col-lg-1'>" +
    html += "       <button type='button' class='btn btn-default ' onclick='EliminaRegistro(\"btnDeleteReg_" + idReg +"\")' style='float: right;position:relative; top: -6px;'>" +
            "          <span class='fa fa-trash' style='color:darkred;cursor: pointer;'></span>" +
            "       </button>" +
            "    </div>";
    html += "  </div> ";
    html += "</li> ";

    $('#grupoMarcaciones').append(html);
}


function ComboPrefijos(idReg) {
    let html = "";

    html += "<select class='form-control' id='selectFiltros_" + idReg + "' name='selectFiltros_" + idReg + "' onchange='CambioDePrefijo(this.id)' >";
    html += "<option value='0' selected hidden>Seleccionar prefijo ...</option>"; 
    for (let i = 0; i < arrDatosPrefijos.length; i++) {
        let prefijo = arrDatosPrefijos[i];
        html += "<option value='" + prefijo.prefijo + "'>" + prefijo.prefijo +"</option>";
    }
    html += "</select>";

    return html;
}


function ComboReglas(idReg) {
    let html = "";

    html += "<select class='form-control' id='selectReglas_" + idReg + "' name='selectReglas_" + idReg + "' onchange='return CambioDeRegla(this.id)' >";
    html += "<option value='0' selected hidden>Seleccionar regla ...</option>"; 

    for (let i = 0; i < arrDatosReglas.length; i++) {
        let regla = arrDatosReglas[i];
        html += "<option value='" + regla.regla + "'>" + regla.descripcionRegla + "</option>";
    }
    html += "</select>";

    return html;
}

function ComboActivo(idReg) {

    let html = "<select class='form-control' id='activoReglas_{" + idReg + "}' name='activoReglas_{this.id}' onchange='CambioEstadoGrupo(this.id)' >" +
               "   <option value='1' selected='selected'>Activo</option> " +
               "   <option value='0' >Inactivo</option> " +
               "</select>";
    return html;
}

function CrearBotonRegla(idReg) {
    let html = "";

    html += "<div class='dropdown'> ";
    html += "   <button class='btn btn-default dropdown-toggle' type='button' data-toggle='dropdown'>";
    html += "     <span class='caret'></span> " +
        "   </button> ";
    html += "   <ul class='dropdown-menu'> ";
    html += "      <li><a id='buttonRegla_" + idReg + "' onclick='EditarReglaGrupo(this.id)'><span class='fa fa-edit'> Editar regla </span></a></li> ";
    html += "      <li><a  onclick='EditarNuevaRegla()'><span class='fa fa-plus'> Nueva regla </span> </a ></li> ";
    html += "   </ul> " +
        "</div> ";

    return html;
}

function EliminaRegistro(id) {

    Swal.fire({
        title: 'Eliminar registro',
        text: "Se va a eliminar el registro seleccionado. ¿Desear continuar? !",
        icon: 'warning',
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

            let idReg = id.substring(13);

            $('#li_' + idReg).remove();

            let item = DameRegistro(idReg);

            let cont = 1;
            arrMarcacionesGrupo.forEach(prfRg => {

                if (idReg !== prfRg.idReg) {
                    $("#orden_" + prfRg.idReg).text(cont);
                    prfRg.ordenReal = cont;
                    cont++;
                }
                else {
                    prfRg.ordenReal = 0;
                }
            });

            if (idReg !== null && !idReg.includes('N')) {
                item.hayCambios = true;
                item.cambioEstado = 3;
                GuardarCambiosMarcaciones();
            }
        }
    });
}


function EditarReglaGrupo(id) {
    let idGrupoAcd = $('#grupoAcd').val();
    let idReg = id.substring(12);
    let idRegla = $("#selectReglas_" + idReg).val();
    AvanzarPagina("GrupoAtencion.aspx?id=" + idGrupoAcd, "LlamadaSaliente/EditaRegla?idRegla=" + idRegla);
}

function EditarNuevaRegla() {
    let idGrupoAcd = $('#grupoAcd').val();
    AvanzarPagina("GrupoAtencion.aspx?id=" + idGrupoAcd, "LlamadaSaliente/EditaRegla?idRegla=0");
}

function GuardarRegla(salir) {
    ASPform.submit;

    if (salir === 1)
        RetrocederPagina();
}


function CambioDeRegla(id) {
    const idRegla = $("#" + id).val();
    //El id es selectReglas_XXX, el identificador del registro es XXX
    const idReg = id.substring(13);
    let hayCambios = false;

    if (idRegla && (idRegla !== "0" || idRegla === "")) {

        arrDatosReglas.forEach(regla => {
            if (regla.regla === idRegla) {
                $("#trunkANIs_" + idReg).html(regla.sufijoDNIS + " - " + DameGruposANIs(regla.GrupoANis));
                arrMarcacionesGrupo.forEach(prf => {
                    if (prf.idReg === idReg) {
                        prf.hayCambios = true;
                        hayCambios = true;
                        if (prf.cambioEstado !== 1 && prf.cambioEstado !== 3)
                            prf.cambioEstado = 2;
                        let regla = arrDatosReglas.find(rg => rg.regla === idRegla);
                        prf.datosRegla = regla;
                    }
                });
            }
        });
    }
    if (hayCambios) {
        GuardarCambiosMarcaciones();
    }
    
}


function CambioEstadoGrupo(id) {
    const estado = $("#" + id).val();
    const idReg = id.substring(13);
    let hayCambios = false;

    arrMarcacionesGrupo.forEach(prf => {
        if (prf.idReg === idReg) {
            prf.hayCambios = true;
            if (prf.cambioEstado !== 1 && prf.cambioEstado !== 3)
                prf.cambioEstado = 2;
            hayCambios = true;
            prf.activo = parseInt(estado);
        }
    });

    if (estado === "0") {
        $("#divRegla_" + idReg).css('color', 'red');
        $("#activoReglas_" + idReg).css('color', 'red');
    }
    else {
        $("#divRegla_" + idReg).css('color', 'black');
        $("#activoReglas_" + idReg).css('color', 'black');
    }

    if (hayCambios) {
        GuardarCambiosMarcaciones();
    }
}

function CambioDePrefijo(id) {
    const idprefijo = $("#" + id).val();
    //El id es selectFiltros_XXX  , el identificador del registro es XXX
    const idReg = id.substring(14);
    let hayCambios = false;

    if (idprefijo && (idprefijo !== "0" || idprefijo === "")) {

        /// antes de los cambios miro que no exista ya esa regla
        let marcacion = arrMarcacionesGrupo.find(r => r.datosPrefijo.prefijo == idprefijo)
        if (marcacion !== null && marcacion !== undefined) {
            alert("Este prefijo ya está siendo usado en el registro con orden " + marcacion.ordenReal);
            let option = "<option value='0' selected hidden>Seleccionar prefijo ...</option>";
            $("#" + id).append(option);
            return false;
        }

        arrDatosPrefijos.forEach( prefijo => {
            if (prefijo.prefijo === idprefijo) {                
                arrMarcacionesGrupo.forEach( prf => {
                    if (prf.idReg === idReg) {
                        prf.hayCambios = true;
                        hayCambios = true;
                        if (prf.cambioEstado !== 1 && prf.cambioEstado !== 3)
                            prf.cambioEstado = 2;

                        prf.datosPrefijo = prefijo;

                    }
                });
            }
        });
    }
    if (hayCambios) {
        GuardarCambiosMarcaciones();
    }

}


function DameGruposANIs(grupoAnis)
{
    let strGrupos = "";

    grupoAnis.forEach(grupo => {    
        if (strGrupos === "")
            strGrupos = grupo.descripcion;
        else
            strGrupos += ", " + grupo.descripcion;
    });

    return strGrupos;
}