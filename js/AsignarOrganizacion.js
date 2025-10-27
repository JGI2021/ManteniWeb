
/// --------------------------
///   Variabls globales
/// --------------------------
class Operador {
    constructor(codigoOperador, nombreOperador, equipo, actualizar = false) {
        this.codigoOperador = codigoOperador;
        this.nombreOperador = nombreOperador;
        this.equipo = equipo;
        this.actualizar = actualizar;
    }
}


// Array donde se almacenarán las organizaciones seleccionadas (Cuando se marque el check)
// En el se guardan los ids
let arrOrganizaciones = [];  // Organizaciones seleccionadas en el arbol de organizaciones
/// Array donde se almacenarán todos los operadores que estén sin asignar y en el otro los asignados al equipo seleccionado
let garrOperadoresSinAsignar = [];
let garrOperadoresAsignados = [];

// Array de coordinadores
let g_arr_Coordinadores = [];

// Variable que nos indica si administra organización o no. Necesario para saber que botones mostrar
let administraOrganizacion = "";

/// --------------------------------------------------
///  Funciones para eliminar un elemento de un array
function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}
// PAra eliminarlo si está mas de una vez
function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
        if (arr[i] === value) {
            arr.splice(i, 1);
        } else {
            ++i;
        }
    }
    return arr;
}

///
/// Cierra el panel que se muestra después de una operación indicando si todo ha ido bien o no
///
function CierraPanelDeMensaje() {
    window.setTimeout(function () {
        $('.errorpanel').css('display', 'none');
    }, 5000);
    CerrarPanel('panelAccionUpdate');
}

/// -------------------------------
/// FUNCION ON READY

$(document).ready(function () {

    // Mostramos los selectores
    $('.selectpicker').selectpicker('show');

    // Leo si administra organización
    administraOrganizacion = $('#AministraOrganizacion').val();

    // Cuando se pulsa el icono que despliega los nodos hijos del árblo
    $(document).on('click', ".tree li.parent_li > span", function (e) {
        //$('.tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            //                        children.hide('fast');
            children.css('display', 'none');
            $(this).attr('title', 'Expandir').find('i').addClass('glyphicon-menu-up').removeClass('glyphicon-menu-down');
        } else {
            //                        children.show('fast');
            children.css('display', 'block');
            $(this).attr('title', 'Colapsar').find('i').addClass('glyphicon-menu-down').removeClass('glyphicon-menu-up');
        }
        e.stopPropagation();
    });

    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Colapsar');

    // Presiono los checkbox y guarda los nodos seleccionados en un input
    // Se activarán los botones del menú en función a los checks seleccionados
    $(document).on('click', '.tree li  input[type="checkbox"]', function () {
        // Obtengo el nodo de tipo checkbox
        var nodo = $(this).closest('input[type="checkbox"]');

        if (nodo != null && nodo.length > 0) {
            // Busco el checkbox anterior al que hemos marcado, es decir, al padre.
            var nodoant = $('#' + nodo[0].id).closest('ul').closest('li').find('input').first();
            // Miro si se ha encontrado y si el padre está marcado no permito hacer nada, sino se marcan todos los descendentes
            if (nodoant == null || nodoant.length == 0 || (nodoant != null && nodoant.length > 0 && !nodoant[0].checked)) {
                // Marca o desmarca todos los checkbox como marcados (todos los descendentes)
// HACE QUE SE MARQUEN LOS CHECKS HIJOS $(this).closest('li').find('ul input[type="checkbox"]').prop('checked', $(this).is(':checked'));

                $(this).closest('li').find('span').removeClass('ColorSelected');
                $(this).closest('li').find('span').removeClass('ColorNormal');

                if (nodo[0].checked) {
                    $(this).closest('li').find('span').addClass('ColorSelected');
                }
                else {
                    $(this).closest('li').find('span').addClass('ColorNormal');
                }

                if (nodo[0].checked) {
                    //// Guardo el nodo seleccionado
                    //let nodos = $('#NodosSeleccionados').val();
                    //if (nodos === '') {
                    //    $('#NodosSeleccionados').val(nodo[0].id);
                    //}
                    //else {
                    //    nodos += ',' + nodo[0].id;
                    //    $('#NodosSeleccionados').val(nodos);
                    //}
                    // Guardo en el array el nodo seleccionado
                    arrOrganizaciones.push(nodo[0].id)
                    // Si es un nodo padre y tenía algún hijo seleccionado tengo que eliminarlo el array
                    let nodoshijos = $(this).closest('li').find('ul input[type="checkbox"]');
                    if (nodoshijos != null && nodo.length > 0) {
                        for (j = 0; j < nodoshijos.length; j++) {
                            EliminaNodoSeleccionado(nodoshijos[j].id);
                        }
                    }
                }
                else {
                    // Quita el nodo de la lista de seleccionados
                    EliminaNodoSeleccionado(nodo[0].id);                    
                }
                // Muestra u oculta los botones del menú según lo seleccionado
                MuestraOcultaBotonesMenu(nodo[0].id);
            }
            else {
                nodo[0].checked = true;
            }
        }


    });


    /// Checks de los coordinadores
    $("#tbody-table").on("click", "input[type=checkbox]", function () {

        let inputs = document.querySelectorAll("table input[type=checkbox]:checked");

        if (inputs === undefined || inputs.length === 0) {
            DesmarcoChecksArbol();
            $('.tree input[type=checkbox]').css('display', 'none');
        }
        else if (inputs.length === 1) {
            $('.tree  input[type=checkbox]').css('display', 'inline-block');
            // Obtengo el id y le quito el prefijo chkcoord_ para obtener el id del coordinador
            let idcheck = inputs[0].id;
            let idcoord = idcheck.substr(9);
            // Con el idcoor obtengo las organizaciones asoaciadas
            let organizIds = $('#orgs_coord_' + idcoord).val();
            if (organizIds) {

                // Los paso a array
                const arrOrgs = organizIds.split(',');
                for (i = 0; i < arrOrgs.length; i++) {
                    const idorg = arrOrgs[i];
                    $("#" + idorg).trigger("click");
                }
            }
        }
        else {
            DesmarcoChecksArbol();
        }

        // Los que hayan sido seleccionados los guardo en un input oculto
        if (inputs) {
            let ids = '';
            for (j = 0; j < inputs.length; j++) {
                // elimino el prefijo chkcoord_
                if (j === 0) {
                    ids += inputs[j].id.substr(9);
                }
                else {
                    ids += ',' + inputs[j].id.substr(9);
                }
            }
            // Guardo los marcados
            $('#CoordinadoresSeleccionados').val(ids);
        }
    });

});




/// ---------------------------------------------------------------
/// ACTIVA Y DESACTIVA Botones del menú según el número
/// de checks del arbol
/// Se el número de chacks pulsados por el tamaño del array de 
/// organizaciones, ya que en el se almacena lo marcado
///---------------------------------------------------------------
function MuestraOcultaBotonesMenu(id) {
    //  Primero oculto todos y luego abro según lo seleccionado
    $('#btnActualizar').css('display', 'none');
    $('#btneliminar').css('display', 'none');
    $('#btnCoordinadores').css('display', 'block');
    $('#btnAsesores').css('display', 'none');

    // Si se ha pulsado solo un check ()
    if (arrOrganizaciones.length === 1) {
        let esquipo = document.getElementById(id).getAttribute('data-equipo');
        $('#btnActualizar').css('display', 'block');
        $('#btneliminar').css('display', 'block');
        $('#btnCoordinadores').css('display', 'none');
        if (esquipo === 'S') {
            $('#btnAsesores').css('display', 'block');
        }
    }
    else if (arrOrganizaciones.length > 1) {
        $('#btneliminar').css('display', 'block');
        $('#btnCoordinadores').css('display', 'none');
        // Si la ventan de operadores o coordinadores estuviese abierta se debería cerrar
    }

}



function EliminaNodoSeleccionado(id) {
    //let nodos = $('#NodosSeleccionados').val();
    //let arrNodos = nodos.split(',');
    //// Lo elimino del array
    //const indx = arrNodos.findIndex(elem => elem === id);
    //arrNodos.splice(indx, 1);
    //// Guardo los datos del array como texto separado por comas
    //nodos = arrNodos.join();
    ////// Guardo de nuevo el valor
    ////$('#NodosSeleccionados').val(nodos);

    // Elimino del array los nodos seleccionados
    removeItemOnce(arrOrganizaciones, id);
}


function OcultaBotoneraMenu() {
    //  Primero oculto todos y luego abro según lo seleccionado
    $('#btnActualizar').css('display', 'none');
    $('#btneliminar').css('display', 'none');
    $('#btnCoordinadores').css('display', 'none ');
    $('#btnAsesores').css('display', 'none');
}


/// -----------------------------------------------------------------------
/// Mostrar el panel de formulario de coordindores que muestra una tabla 
/// con todos los coordinadores de ese nivel
/// -----------------------------------------------------------------------
function MuestraPanelCoordinadores(id) {
    // Obtengo los datos del campo oculto de ese nivel
    const coords = $('#org_' + id).val();
    // los paso a un array para separarlos. Vienen separados por @
    const arrCoords = coords.split('@');
    // Creo la lista que se va a mostrar
    let html = "";
    for (i = 0; i < arrCoords.length; i++) {
        html += '<li>' + arrCoords[i] + '</li>';
    }
    // Inserto el html
    $('#listadoCoordinadores').html(html);
    // Muestro el panel
    $('.panelFijo').css('display', 'block');
}



/// --------------------------------------------------------
///   CREAR NODOS ORGANIZACION
/// --------------------------------------------------------

// ---------------------------------------------------------
// Muestra la ventana de asignaciones y altas.
// ---------------------------------------------------------
function MuestraVentana(accion) {
    $('.tree input[type=checkbox]').css('display', 'none');
    // Priemro oculto el panel de altas o el de actualizaciones
    MuestraOcultaPaneles('panelAcciones');
    /// Desmarco los posible checks del arbol y oculto los checkbosex
    DesmarcoChecksArbol();

    // guardo la acción que se va a realizar
    document.getElementById('accion').value = accion === 'S' ? 'A' : accion;

    document.getElementById('panelNombreOrganizacion').style.visibility = 'visible';

    //document.getElementById('panelNodoHijo').style.display = "none";
    let titulo = document.getElementById("panel-title");
    titulo.innerHTML = "Crear Organización ";
    document.getElementById("btn-guardar").style.background = '#0275d8';
    document.getElementById("panelcabecera").style.background = '#0275d8';
    document.querySelector("#btn-guardar").innerText = 'Añadir';


    document.getElementById('panelNombreOrganizacion').value = "";
    $('#selectNodosHijos').empty();


    document.getElementById('panelAcciones').style.display = 'block';
}


function CerrarPanel(panel) {
    document.getElementById(panel).style.display = 'none';
    let element = document.getElementById(panel);
    element.classList.remove("aparece-panel");

    if (panel === 'panelDeCoordinadores') {
        $('#tbody-table').html('');

    }

    if (panel === 'panelOperadores') {
        $('#myInputGroupNoAsociados').val('');
        $('#myInputGroupSi').val('');
    }

    // Desmarco el arbol y vacío arrays
    DesmarcoChecksArbol();
    // Muestro los check box del árbol 
    $('.tree input[type=checkbox]').css('display', 'inline-block');
    //// Los activo ya que los asesosres y el update los inhabilitan
    //$('.tree input[type=checkbox]').css('disabled', 'false');
    // vacía array generales
    arrOrganizaciones = [];
    garrOperadoresAsignados = [];
    garrOperadoresSinAsignar = [];
    MuestraOcultaBotonesMenu(0);

    let checkTodosAsignados = document.getElementById("IdCheckAsignados");
    if (checkTodosAsignados)
        checkTodosAsignados.checked = false;

    let checkTodosDesasignados = document.getElementById("IdCheckNoAsignados");
    if (checkTodosDesasignados)
        checkTodosDesasignados.checked = false;
}


// ---------------------------------------------------------
// Carga los nodos padres a los que se va a asociar el nodo
// ---------------------------------------------------------
function CargaNodosPadre() {
    const select = document.getElementById("select-nivel");

    //vACIA SELEC NODO PADRE
    $("#select-padre").empty();
    const selectnodo = document.getElementById("select-padre");
    // Si es el nodo padre no lo activamos
    if (select.value == '1') {
        let option = document.createElement("option");
        option.innerHTML = " RAIZ ";
        option.value = "0";
        selectnodo.appendChild(option);
        $("#select-padre").selectpicker('refresh');
    }
    else {
        const accion = document.getElementById("accion").value;
        // buscamos todos los registros de ese nivel
        const jsonData = { "id": select.value, "tipo": "P", "accion": accion }

        let url = getRutaAbsoluta();
        $.post(url + "/Organizacion/ObtenerNodos", jsonData, function (resultado) {
            const datos = JSON.parse(resultado);
            for (i = 0; i < datos.length; i++) {
                const dato = datos[i];
                let option = document.createElement("option");
                option.innerHTML = dato.AliasOrganizacion;
                option.value = dato.IdOrganizacion;
                if (i === 0) {
                    option.selected = true;
                }
                selectnodo.appendChild(option);
            }
            $("#select-padre").selectpicker('refresh');            
        })  /// Una vez acabado que busque los nodos del seleccionado
        .done(function () {
            BuscarNodosHijos();
        });

    }
}

// ---------------------------------------------------------------------
// Hace una llamada a servidor para obtener todos los nodos del
// nivel seleccionado y que tengan como padre al nodo seleccionado
// Cargará un select multiple con los datos para poder seleccionar los
// que querramos eliminar
// ---------------------------------------------------------------------
function BuscarNodosHijos() {

    //    const selectnodo = document.getElementById("selectNodosHijos");
    // obtenemos el nivel a eliminar
    let idOrganiz = document.getElementById("select-padre").value;
    const accion = document.getElementById("accion").value;

    let tipo = "N";

    // Si el nodo padre es cero no busque hijos
    if (accion === 'A' && (idOrganiz == "" || idOrganiz == "0")) {
        return;
    }
    // vacío el select del que va a ser el nodo padre
    $('#selectNodosHijos').empty();

    const jsondata = { "id": idOrganiz, "tipo": tipo, "accion": accion }
    let url = getRutaAbsoluta();
    $.post(url + "/Organizacion/ObtenerNodos", jsondata, function (resultado) {
        const datos = JSON.parse(resultado);
        CargaNodosHijos(tipo, datos, accion);
    });
}



function CargaNodosHijos(tipo, datos, accion) {
    let $select = $('#selectNodosHijos');
    // Carga nodos normale
    if (tipo === "N") {
        for (i = 0; i < datos.length; i++) {
            const dato = datos[i];
            $('<option value="' + dato.IdOrganizacion + '" />').html(dato.AliasOrganizacion).appendTo($select);
        }
    }

    $('#selectNodosHijos').selectpicker('refresh');
}


// -------------------------------------------------------------
// Se llama una función del servidor para que de de alta el
// nuevo nodo. Si hay algún error se muestra
// -------------------------------------------------------------
function GuardarCambios() {
    // valido que haya un nombre
    let accion = document.getElementById("accion").value;
    const selectnivel = document.getElementById("select-nivel").value;

    const nombreOrganizacion = document.getElementById("nombreOrganizacion").value;
    const nodoPadre = document.getElementById("select-padre").value;

    let jsonData = "";
    let url = getRutaAbsoluta();

    //if (accion === 'A' && !esAsesor) {
    jsonData = { "accion": accion, "selectnivel": selectnivel, "nombreOrganizacion": nombreOrganizacion, "nodoPadre": nodoPadre };
    $.post(url + "/Organizacion/ModeloOrganizacionAlta", jsonData, function (resultado) {
        $("#MostrarModelo").html(resultado);
        // no es necesario            MuestraVentana(accion);
        document.getElementById("nombreOrganizacion").value = "";
        CierraPanelDeMensaje();
    });
}


function VaciaSelect(id) {
    // Nodo padre del que va a corlgar el nuevo nodo
    const selectnodo = document.getElementById(id);
    // vacío el select del que va a ser el nodo padre
    for (let i = 0; i < selectnodo.length; i++) {
        selectnodo.remove(i);
    }
    return selectnodo;
}


//// *************************************************************************
//// *******          FUNCIONES PANEL DE COORDINADORES                 *******
//// *************************************************************************




/// ------------------------------------------------------
/// Asignación de coordinadores
/// ------------------------------------------------------
function AsignarCoordinadores() {
    // Priemro oculto el panel de altas o el de actualizaciones
    MuestraOcultaPaneles('panelDeCoordinadores');
    /// Desmarco los posible checks del arbol y oculto los checkbosex
    DesmarcoChecksArbol();
    // Oculta los check boxex del árbol
    $('.tree input[type=checkbox]').css('display', 'none');
    // También oculto la botonera
    OcultaBotoneraMenu();
    // Carga tabla de coordinadores
    CargaTablaCoordinadores();

    $('#panelDeCoordinadores').css('display', 'block');
}


function CargaTablaCoordinadores() {
    let url = getRutaAbsoluta();
    $.get(url + "/Organizacion/ObtenerCoordinadores", '', function (resultado) {
        if (resultado.substring(0, 3) == "403") {
            setTimeout(function () {
                alert(resultado);
                $('#panelDeCoordinadores').css('display', 'none');
            }, 500);
            return;
        }

        const datos = JSON.parse(resultado);
        // Paso los datos del coordinador al array global
        g_arr_Coordinadores = [];
        g_arr_Coordinadores = [...datos];

        let html = '';
        let idsOrgs = '';
        
        for (i = 0; i < datos.length; i++) {
            idsOrgs = '';

            let deshabilitar = "";
            html += "<tr id='tr_" + datos[i].IdCoordinador + "'> ";

            // Si es administrador no se puede modificar
            if (datos[i].EsAdministrador === 1) {
                deshabilitar = " disabled ";
            }
           

            html += "<td><input type='checkbox' id='chkcoord_" + datos[i].IdCoordinador + "'  " + deshabilitar + " /></td > ";
            html += "<td>" + datos[i].NombreCoordinador + "</td>";


            if (datos[i].NombreNivelJerarquico !== "") {
                html += "<td><a href='#div_" + datos[i].IdOrganizacionNivel + "' > " + datos[i].NombreNivelJerarquico + "</td>";
            }
            else {
                html += "<td>Sin asignar</td>";
            }

            let niveles = datos[i].NivelesEquipos;
            html += "<td><ul style='list-style: none;padding-left:20px;'> ";

            
            if (datos[i].EsAdministrador === 1) {
                html += "<li> " +
                    "<a href='#div_" + datos[i].IdOrganizacionNivel + "' > <span title='Administrador' >Administrador</span> </a> " +
                    " </li>";
            }
            else {
                let nombrenivelaux = "";
                for (j = 0; j < niveles.length; j++) {
                    if (niveles[j].Idorganizacion === "0") {
                        html += "<li> </li> ";
                    }
                    else {
                        if (nombrenivelaux !== niveles[j].Nombrenivel) {
                            if (j !== 0) {
                                html += " </li> ";
                            }
                            html += "<li> " +
                                "<a href='#div_" + niveles[j].Idorganizacion + "' > <span title='" + niveles[j].Nombrenivel + "' >" + niveles[j].Nombre + "</span> </a> ";
                            nombrenivelaux = niveles[j].Nombrenivel
                        }
                        else {
                            html += " <span class='margin-l-r-5'> -  </span> " +
                                "<a href='#div_" + niveles[j].Idorganizacion + "' ><span title='" + niveles[j].Nombrenivel + "' >" + niveles[j].Nombre + "</span> </a> ";
                        }

                        if (j === 0)
                            idsOrgs = niveles[j].Idorganizacion;
                        else
                            idsOrgs += ',' + niveles[j].Idorganizacion;
                    }

                }
                html += "</li>";
            }
            
            html += "</ul></td>";
            html += "<input type='hidden' id='orgs_coord_" + datos[i].IdCoordinador + "' value='" + idsOrgs + "' /> ";
            html += "</tr>";
        }

        $('#tbody-table').html(html);
        // Si hay algún coordinador seleccionado lo marco en el árbol
        MarcaCoordinadoresSeleccionados();

    })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert(textStatus);
        });
}


function MarcaCoordinadoresSeleccionados() {
    let coordSeleccionados = $('#CoordinadoresSeleccionados').val();
    let arrCoords = coordSeleccionados.split(',');
    for (let i = 0; i < arrCoords.length; i++) {
        $('#chkcoord_' + arrCoords[i]).trigger('click');
    }
}

/// Cierra la ventana de coordinadores
function OcultaPanelCoordinadores() {
    $('#listadoCoordinadores').html('');
    // Muestro el panel
    $('.panelFijo').css('display', 'none');
}



/// ------------------------------------------------------------------------------
/// Asigna a los coordinadores seleccionados los nos que se les hayan asignado
/// Se guarda en base de datos y también se asignan los operadores
/// ------------------------------------------------------------------------------
function GuardarCoordinadoresAsignados() {
    // Obtengo los nodos que se han marcado     
    let nodosSeleccionados = arrOrganizaciones;
    let coordSeleccionados = $('#CoordinadoresSeleccionados').val();

    if (nodosSeleccionados === null || nodosSeleccionados.length === 0) {
        nodosSeleccionados = [];
    }

    datos = { "nodos": nodosSeleccionados, "operadores": coordSeleccionados };
    var url = getRutaAbsoluta();
    $.post(url + "/Organizacion/AsignaNodosCoordinadores", datos, function (data) {
        //            if (data.substring(0, 2) == "OK") {
        $("#MostrarModelo").html(data);
        DesmarcoChecksArbol();
//         DesmarcoChecksCoordinadores();
        CargaTablaCoordinadores();
        $('.tree input[type=checkbox]').css('display', 'none');

        CierraPanelDeMensaje();
    });
}



function DesmarcoChecksArbol() {
    const nodos = document.querySelectorAll('.tree li  input[type="checkbox"]');
    // Obtengo el nodo de tipo checkbox
    const nodo = $(nodos).closest('input[type="checkbox"]');
    // Por alguna razón el check 1 del árbol se queda marcado. Lo desmarco
    $("#1").prop('checked', false);
    if (nodo != null && nodo.length > 0) {
        // Busco el checkbox anterior al que hemos marcado, es decir, al padre.
        var nodoant = $('#' + nodo[0].id).closest('ul').closest('li').find('input').first();
        // Miro si se ha encontrado y si el padre está marcado no permito hacer nada, sino se marcan todos los descendentes
        if (nodoant == null || nodoant.length == 0 || (nodoant != null && nodoant.length > 0 && !nodoant[0].checked)) {
            // Marca o desmarca todos los checkbox como marcados (todos los descendentes)
            $(nodos).closest('li').find('ul input[type="checkbox"]').prop('checked', false);
            $(nodos).closest('li').find('span').removeClass('ColorSelected');
            $(nodos).closest('li').find('span').addClass('ColorNormal');

            // Quita el nodo de la lista de seleccionados
/*            $('#NodosSeleccionados').val('');*/
            arrOrganizaciones = [];
        }
    }
}


function DesmarcoChecksCoordinadores() {
    let inputs = document.querySelectorAll("table input[type=checkbox]:checked");
    // Obtengo el nodo de tipo checkbox
    const nodos = $(inputs).closest('input[type="checkbox"]');

    if (nodos != null && nodos.length > 0) {
        // Marca o desmarca todos los checkbox como marcados (todos los descendentes)
        $(nodos).closest('td').find('input[type="checkbox"]').prop('checked', false);

        // Quita el nodo de la lista de seleccionados
        $('#CoordinadoresSeleccionados').val('');
    }
}


function SearchCoordinadores() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("entradaCoordinadores");
    filter = input.value.toUpperCase();
    table = document.getElementById("tabla-coordinadores");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];   /// Solo estoy buscando en el campo de los nombres de coordinadores
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

////////  ****************************************************************************
///////   *******                      FUNCIONES PANEL DE UPDATE               *******
///////   ****************************************************************************

function AbrirPanelUpdate() {
    if (arrOrganizaciones.length === 0) {
        alert('Debe seleccionar previamente el nodo que quiere actualizar');
        return;
    }

    MuestraOcultaPaneles('panelAccionUpdate');
    const idOrganizacion = arrOrganizaciones[0];
    // Pongo el nombre del nodo seleccionado
    var equipo = document.getElementById(idOrganizacion).getAttribute('data-equipo-name');
    // Lo paso al campo que se muetra para poder cambiarlo
    $('#nombreOrgUpdate').val(equipo);
    //// Desactivo los checks para que no se puedan modificar miestras está la ventana de update abierta
    //$('.tree input[type=checkbox]').css('disabled', 'true');
    // Muestra ventana de update
    $('#panelAccionUpdate').css('display', 'block');
}


/// -------------------------------------------------------------------------
/// Envía al servidor la petición de actualizar cambios en la organización 
/// -------------------------------------------------------------------------
function ActualizarDatosOrganizacion() {

    const nuevoNombe = $("#nombreOrgUpdate").val();
    // Solo puede haber uno seleccionado para el update
    const idOrganizacion = arrOrganizaciones[0];
    jsonData = { "accion": 'M', "selectnivel": idOrganizacion, "nombreOrganizacion": nuevoNombe, "nodoPadre": '0' };
    let url = getRutaAbsoluta();
    $.post(url + "/Organizacion/ModeloOrganizacionAlta", jsonData, function (resultado) {
        $("#MostrarModelo").html(resultado);
        // no es necesario            MuestraVentana(accion);
        $("#nombreOrgUpdate").val('');
        // Cierro el panel que muestra si ha habido error o todo ha ido bien
        CierraPanelDeMensaje();

        CerrarPanel('panelAccionUpdate');
    });
}




// ---------------------------------------------------------
// Carga los nodos padres a los que se va a asociar el nodo
// ---------------------------------------------------------
function CargaNodosUpdate() {
    const select = document.getElementById("select-nivel-update");

    //vACIA SELEC NODO PADRE
    $("#select-padre-update").empty();
    const selectnodo = document.getElementById("select-padre-update");

    // buscamos todos los registros de ese nivel
    const jsonData = { "id": select.value, "tipo": "P", "accion": "M" }

    let url = getRutaAbsoluta();
    $.post(url + "/Organizacion/ObtenerNodos", jsonData, function (resultado) {
        const datos = JSON.parse(resultado);
        for (i = 0; i < datos.length; i++) {
            const dato = datos[i];
            let option = document.createElement("option");
            option.innerHTML = dato.AliasOrganizacion;
            option.value = dato.IdOrganizacion;
            if (i === 0) {
                option.selected = true;
            }
            selectnodo.appendChild(option);
        }
        $("#select-padre-update").selectpicker('refresh');
    })  /// Una vez acabado que busque los nodos del seleccionado
        .done(function () { });
}




function MuestraOcultaPaneles(panel) {
    $('#panelAcciones').css('display', 'none');
    $('#panelAccionUpdate').css('display', 'none');
    $('#panelDeCoordinadores').css('display', 'none');
    $('#panelOperadores').css('display', 'none');

    let element;
    if (panel === 'panelAcciones') {
        element = document.getElementById("panelAcciones");
    } else if (panel === 'panelAccionUpdate') {
        element = document.getElementById("panelAccionUpdate");
    } else if (panel === 'panelDeCoordinadores') {
        element = document.getElementById("panelDeCoordinadores");
    } else if (panel === 'panelOperadores') {
        element = document.getElementById("panelOperadores");
    }

    element.classList.remove("aparece-panel");
    element.classList.add("aparece-panel");
}


/// ----------------------------------------------------------
///   PANEL DE Eliminar
/// ----------------------------------------------------------

function EliminarSeleccionado() {

    if (arrOrganizaciones.length === 0) {
        alert('Debe seleccionar previamente los elementos que desea eliminar');
        return;
    }

    let jsonData = { "seleccionado": arrOrganizaciones, "esAsesor": false };
    let url = getRutaAbsoluta();

    $.post(url + "/Organizacion/ModeloOrganizacionBaja", jsonData, function (resultado) {

        Swal.fire({
            title: 'Eliminar nodo',
            text: "Se eliminará el nodo y todas sus relaciones. No se puede recuperar. ¿Desear continuar? !",
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
                $("#MostrarModelo").html(resultado);
                // Lo vacio, porque se han eliminado
                arrOrganizaciones = [];
                // Cierro el panel que muestra si ha habido error o todo ha ido bien
                CierraPanelDeMensaje();
            }
        });


    });
 }



/// ----------------------------------------------------------
///   PANEL DE ASESORES
/// ----------------------------------------------------------


/// ------------------------------------------------------
/// Abrir panel y cargar Operadores
/// ------------------------------------------------------
function MuestraPanelAsesores() {
    // Priemro oulto el panel de altas o el de actualizaciones
    MuestraOcultaPaneles('panelOperadores');
    // Oculta los check boxex del árbol
    $('.tree input[type=checkbox]').css('display', 'none');

    // Para los asesores solo puede haber un valor en el array de lo seleccionado
    if (arrOrganizaciones[0].length === 0) {
        alert('Se debe seleccionar un equipo');
        return
    }

    const idOrganiz = arrOrganizaciones[0];
    $("#ComboAsignarOrganizacion select").val(idOrganiz);
    const busca = "ComboAsignarOrganizacion option[value=" + idOrganiz + "] ";
    nombreOrganiz = $("#" + busca).text();
    // Obtengo el texto seleccionado y lo muestro
    $('#EtiquetaNivelJerarquicoEquipo').text(nombreOrganiz);

    const jsondata = { "idequipo": idOrganiz };
    let url = getRutaAbsoluta();
    $.get(url + "/Organizacion/ObtenerNodosAsesores", jsondata, function (resultado) {
        const datos = JSON.parse(resultado);

        CargaAsesores(idOrganiz, datos);
        // Asigno el nivel al select
    });

    // Muestra ventana de Asesores
    $('#panelOperadores').css('display', 'block');
}


/// --------------------------------------------------
///
/// --------------------------------------------------
function CargaAsesores(idOrganiz, datos) {

    let htmlsinAsignar = "";
    let htmlAsignados = "";
    // vacío los array de asignaciones primero
    garrOperadoresSinAsignar = [];
    garrOperadoresAsignados = [];

    // Obtengo el nombre del equipo
    var equipo = document.getElementById(idOrganiz).getAttribute('data-equipo-name');
    /// Asignados al equipo
    const arrConEquipo = datos.filter(dato => (dato.Equipo === equipo));
    if (arrConEquipo) {
        arrConEquipo.forEach(dato => {
            garrOperadoresAsignados.push(new Operador(dato.CodigoOperador, dato.NombreOperador, dato.Equipo));
            htmlAsignados += "<li id='li_" + dato.CodigoOperador + "' class='list-group-item' ondblclick='MoverADesasignados(this.id)' style='cursor: pointer;' > " +
                "    <input type='checkbox' id='ch_" + dato.CodigoOperador + "' name='chk_" + dato.CodigoOperador + "' /> ";
            if (dato.EsOperador) {
                htmlAsignados += "         &nbsp;&nbsp;<span id='spn" + dato.CodigoOperador + "' ><b>  " + dato.NombreOperador + "</b> </span></li> ";
            }
            else {
                htmlAsignados += "         &nbsp;&nbsp;<span id='spn" + dato.CodigoOperador + "' style='color:green;' ><b>  " + dato.NombreOperador + "</b> </span></li> ";
            }

        });
    }

    const arrSinAsignar = datos.filter(dato => dato.Equipo === "");
    if (arrSinAsignar) {
        arrSinAsignar.forEach(dato => {
            garrOperadoresSinAsignar.push(new Operador(dato.CodigoOperador, dato.NombreOperador, dato.Equipo));
            htmlsinAsignar += "<li id='li_" + dato.CodigoOperador + "' class='list-group-item' ondblclick='MoverAAsignados(this.id)' style='cursor: pointer;' > " +
                "    <input type='checkbox' id='ch_" + dato.CodigoOperador + "' name='chk_" + dato.CodigoOperador + "'  /> ";
            if (dato.EsOperador) {
                htmlsinAsignar += "         &nbsp;&nbsp;<span id='spn" + dato.CodigoOperador + "' ><b>  " + dato.NombreOperador + "</b> </span></li> ";
            }
            else {
                htmlsinAsignar += "         &nbsp;&nbsp;<span id='spn" + dato.CodigoOperador + "' style='color:green;' ><b>  " + dato.NombreOperador + "</b> </span></li> ";
            }
        });
    }

    let arrSinEquipo = datos.filter(dato => (dato.Equipo !== "" && dato.Equipo !== equipo));
    if (arrSinEquipo) {
        arrSinEquipo.forEach(dato => {
            garrOperadoresSinAsignar.push(new Operador(dato.CodigoOperador, dato.NombreOperador, dato.Equipo));
            htmlsinAsignar += "<li id='li_" + dato.CodigoOperador + "' class='list-group-item' ondblclick='MoverAAsignados(this.id)' style='cursor: pointer;' > " +
                "    <input type='checkbox' id='ch_" + dato.CodigoOperador + "' name='chk_" + dato.CodigoOperador + "'  /> ";
            if (dato.EsOperador) {
                htmlsinAsignar += "         &nbsp;&nbsp;<span id='spn" + dato.CodigoOperador + "' ><b>  " + dato.NombreOperador + "</b> (" + dato.Equipo + ") </span></li> ";
            }
            else {
                htmlsinAsignar += "         &nbsp;&nbsp;<span id='spn" + dato.CodigoOperador + "' style='color:green;'><b>  " + dato.NombreOperador + "</b> (" + dato.Equipo + ") </span></li> ";
            }
        });

        // Los añado a sus respectivos lugares
        $('#ul_noasociados').html(htmlsinAsignar);
        $('#ul_siasociados').html(htmlAsignados);

    }
}


/// ---------------------------------------------------------------------
///
/// ---------------------------------------------------------------------
function MoverADesasignados(idElemento) {
    let htmlsinAsignar = "";
    // Activo el boton de guardar cambios
    if ($("#BbotonAceptarF").hasClass('disabled')) {
        $("#BbotonAceptarF").removeClass('disabled');
    }

    // obtengo el id del operador (elimino los 3 caracteres primeros)
    const idoperador = idElemento.substr(3);
    // Busco el operador en asignados
    const operador = garrOperadoresAsignados.find(o => o.codigoOperador === idoperador);
    // Si lo encontró lo paso a desasignados
    if (operador) {
        htmlsinAsignar += "<li id='li_" + operador.codigoOperador + "' class='list-group-item' ondblclick='MoverAAsignados(this.id)' style='cursor: pointer;' > " +
            "    <input type='checkbox' id='ch_" + operador.codigoOperador + "' name='chk_" + operador.codigoOperador + "'  /> " +
            "         &nbsp;&nbsp;<span id='spn" + operador.codigoOperador + "' ><b>  " + operador.nombreOperador + "</b> </span></li> ";
        // Lo elimino de los asignados
        $('#' + idElemento).remove();
        // Lo paso a desasignados
        $('#ul_noasociados').append(htmlsinAsignar);
        // Elimino del array de asignados
        removeItemOnce(garrOperadoresAsignados, operador);
        // Lo añado en los desasignados
        garrOperadoresSinAsignar.push(new Operador(operador.codigoOperador, operador.nombreOperador, operador.equipo, true));
    }
}


/// ---------------------------------------------------------------------
///
/// ---------------------------------------------------------------------
function MoverAAsignados(idElemento) {
    let htmlAsignados = "";
    // Activo el boton de guardar cambios
    if ($("#BbotonAceptarF").hasClass('disabled')) {
        $("#BbotonAceptarF").removeClass('disabled');
    }

    // obtengo el id del operador (elimino los 3 caracteres primeros)
    const idoperador = idElemento.substr(3);
    // Busco el operador en desasignados
    const operador = garrOperadoresSinAsignar.find(o => o.codigoOperador === idoperador);
    // Si lo encontró lo paso a asignados
    if (operador) {
        htmlAsignados += "<li id='li_" + operador.codigoOperador + "' class='list-group-item' ondblclick='MoverADesasignados(this.id)' style='cursor: pointer;' > " +
            "    <input type='checkbox' id='ch_" + operador.codigoOperador + "' name='chk_" + operador.codigoOperador + "'  /> " +
            "         &nbsp;&nbsp;<span id='spn" + operador.codigoOperador + "' ><b>  " + operador.nombreOperador + "</b> </span></li> ";
        // Lo elimino de los deasignados
        $('#' + idElemento).remove();
        // Lo paso a sasignados
        $('#ul_siasociados').append(htmlAsignados);
        // Elimino del array de desasignados
        removeItemOnce(garrOperadoresSinAsignar, operador);
        // Lo añado en los asignados
        garrOperadoresAsignados.push(new Operador(operador.codigoOperador, operador.nombreOperador, operador.equipo, true));
    }
}

//// --------------------------------------------------------
////      Buscar los operadores en su caja por nombre
//// --------------------------------------------------------
function BuscaSeleccionadoEnGrupo(idInput, grupo) {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById(idInput);
    filter = input.value.toUpperCase();
    ul = document.getElementById(grupo);
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("span")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        }
        else {
            li[i].style.display = "none";
        }
    }
}


//// Marcar o desmarcar todos los check de una caja
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


/// ------------------------------------------------------------------
/// Pasamos los registros del grupo de no asignados al de asignados.
/// Solo aquellos que tengan el check marcado 
/// ------------------------------------------------------------------
function AsignarRegistros() {

    // Activo el boton de guardar cambios
    if ($("#BbotonAceptarF").hasClass('disabled')) {
        $("#BbotonAceptarF").removeClass('disabled');
    }

    const arrSeleccionados = [];
    var ul = document.getElementById('ul_noasociados');

    var inputs = ul.getElementsByTagName('input');
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].type === "checkbox") {
            // Si el check está marcado lo muevo
            if (inputs[i].checked) {
                // Obtengo el id del check
                let id = inputs[i].id;
                // elimino el prefijo ch_
                id = id.substr(3);
                // ahora le añado li_ de prefijo que es el elemento que contiene al checkbox y es el que hay que desplazar
                id = 'li_' + id;
                // Lo añado al array
                arrSeleccionados.push(id);
            }
        }
    }

    // Ahora muevo todos los seleccionados
    arrSeleccionados.forEach(id => { MoverAAsignados(id); });

    let checkTodos = document.getElementById("IdCheckNoAsignados");
    if (inputs.length === 0) {        
        if (checkTodos)
            checkTodos.checked = false;
    }
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].type === "checkbox" && inputs[i].checked) {
            return;
        }
    }
    checkTodos.checked = false;
}


/// ------------------------------------------------------------------
/// Pasamos los registros del grupo de asignados al de no asignados.
/// Solo aquellos que tengan el check marcado 

/// ------------------------------------------------------------------
function DesAsignarRegistros() {
    // Activo el boton de guardar cambios
    if ($("#BbotonAceptarF").hasClass('disabled')) {
        $("#BbotonAceptarF").removeClass('disabled');
    }

    const arrSeleccionados = [];
    // Obtengo el ul del grupo de asociados
    var ul = document.getElementById('ul_siasociados');
    // obtengo todos los check
    var inputs = ul.getElementsByTagName('input');
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "checkbox") {
            // Si el check está marcado lo muevo
            if (inputs[i].checked) {
                // Obtengo el id del check
                let id = inputs[i].id;
                // elimino el prefijo ch_
                id = id.substr(3);
                // ahora le añado li_ de prefijo que es el elemento que contiene al checkbox y es el que hay que desplazar
                id = 'li_' + id;
                // Lo añado al array
                arrSeleccionados.push(id);
            }
        }
    }
    // Ahora muevo todos los seleccionados
    arrSeleccionados.forEach(id => { MoverADesasignados(id); })

    if (inputs.length === 0) {
        let checkTodos = document.getElementById("IdCheckAsignados");
        if (checkTodos)
            checkTodos.checked = false;
    }


}


function GuardarOperadores() {

    // Al ser Asesores solo puede haber uno seleccionado
    const nodoPadre = arrOrganizaciones[0];

    const idsAsignados = ObtenerIdsDeOperadorParActualizar(garrOperadoresAsignados);
    const idsDesasignados = ObtenerIdsDeOperadorParActualizar(garrOperadoresSinAsignar);

    // Si no se ha cambiado nada no envío
    if (idsAsignados === '' && idsDesasignados === '') {
        alert('Debe asignar o desasignar algún operador previamente.')
        return;
    }

    jsonData = { "asignados": idsAsignados, "desasignados": idsDesasignados, "nodoPadre": nodoPadre };
    let url = getRutaAbsoluta();

    $.post(url + "/Organizacion/ModeloAltaAsesores", jsonData, function (resultado) {
        $("#MostrarModelo").html(resultado);
        // Desmarco lo que se haya actualizado
        DesmarcaActualizar();
        window.setTimeout(function () {
            // Oculta los check boxex del árbol
            $('.tree input[type=checkbox]').css('display', 'none');
        }, 3000);
        // Activo el boton de guardar cambios
        if (!$("#BbotonAceptarF").hasClass('disabled')) {
            $("#BbotonAceptarF").addClass('disabled');
        }

        CerrarPanel('panelAccionUpdate');
        
        // Cierro el panel que muestra si ha habido error o todo ha ido bien
        CierraPanelDeMensaje();
    });

}



function ObtenerIdsDeOperadorParActualizar(arr) {
    let idsAsignados = "";
    arr.forEach(operador => {

        if (operador.actualizar) {
            if (idsAsignados === "") {
                idsAsignados = operador.codigoOperador;
            }
            else {
                idsAsignados += "," + operador.codigoOperador;
            }
        }
    });

    return idsAsignados;
}


function DesmarcaActualizar() {
    garrOperadoresAsignados.forEach(operador => {

        if (operador.actualizar) {
            operador.actualizar = false;
        }
    });

    garrOperadoresSinAsignar.forEach(operador => {

        if (operador.actualizar) {
            operador.actualizar = false;
        }
    });

}