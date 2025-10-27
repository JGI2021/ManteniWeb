
class ConjuntoLista {
    constructor(idConjunto, idLista) {
        this.idConjunto = idConjunto;
        this.idLista = idLista;
    }
}



function AsignarConjunto(id) {

    // Viene con nombre xx_idConjunto, tengo que eliminar los tres primeros caracteres
    let idConjunto = id.substring(3);
    AsignarConjuntosDeOperadores(idConjunto);
}

// Los ids de conjuntos vienen separados por comas
function AsignarConjuntosDeOperadores(idsConjuntos) {
    let listas = GetListasSeleccionadas();
    let listasIniciales = $('#listasSeleccionadas').val();

        let params = { "idsConjuntos": idsConjuntos, "idsListas": listas, "idsListasIniciales": listasIniciales };

    $('#txtSpinner').html('Asignando grupos ...');
    // Activo el spinner
    $('#divSpinner').css('display', 'block');

    $.post(getRutaAbsolutaMVC() + "/ConjuntoOperadores/AsignarConjuntos", params, function (resultado) {
        $("#panel-body-conjuntosOperadores").html(resultado);

        CierraPanelDeMensaje();
    });
}

function GetListasSeleccionadas() {
    let listas = "";
    let listasseleccionadas = document.querySelectorAll("td.lista-seleccionada");
    if (listasseleccionadas && listasseleccionadas.length > 0) {
        for (let i = 0; i < listasseleccionadas.length; i++) {
            let nodo = listasseleccionadas[i];
            let id = nodo.id.substring(3);  // el id viene con formato ls_identificadorLista, por eso elimino los 4 primeros caracteres
            if (listas === "")
                listas = id;
            else
                listas += ',' + id;
        }
    }

    if (listas === "")
        listas = $('#listasSeleccionadas').val();  // Si no se ha seleccionado ninguna paso todas

    return listas
}

function DesasignarConjuntoOperadores(idConjunto, idLista) {
    let arrConjuntosListas = new Array();
    let conjLista = new ConjuntoLista(idConjunto, idLista);
    arrConjuntosListas.push(conjLista);

    DesasignarArrayConjuntoOperadores(arrConjuntosListas);
}

function DesasignarArrayConjuntoOperadores(arrConjuntosListas) {
    let idsListas = $('#listasSeleccionadas').val();
    let params = { "conjuntosListas": arrConjuntosListas, "idsListas": idsListas };

    $('#txtSpinner').html('Eliminando grupos ...');
    // Activo el spinner
    $('#divSpinner').css('display', 'block');


    $.post(getRutaAbsolutaMVC() + "/ConjuntoOperadores/DesasignarConjuntos", params, function (resultado) {
        $("#panel-body-conjuntosOperadores").html(resultado);
        CierraPanelDeMensaje();
    });
}

///
/// Cierra el panel que se muestra después de una operación indicando si todo ha ido bien o no
function CierraPanelDeMensaje() {
    window.setTimeout(function () {
        $('.errorpanel').css('display', 'none');
    }, 5000);
}



function AsignarRegistrosMarcados() {
    let marcados = document.getElementsByClassName("conjuntos-sin-asignar");

    if (marcados && marcados.length === 0) {
        alert("Debe seleccionar al menos un conjunto de operadores");
        rturn;
    }

    let idsConjuntos = "";
    for (let i = 0; i < marcados.length; i++) {
        let check = marcados[i];
        if (check.checked) {
            // obtengo el id
            if (idsConjuntos === "") {
                idsConjuntos = check.id.substring(3);
            }
            else {
                idsConjuntos += "," + check.id.substring(3);
            }
        }
    }

    if (idsConjuntos !== "") {
        AsignarConjuntosDeOperadores(idsConjuntos);
    }
}


/* *****
 * Se ha pulsado el botón de desasignar y todos los conjuntos de operadores marcados se desasignarán de la lista
 * *****/
function DesasignarRegistrosMarcados() {
    let marcados = document.getElementsByClassName("marcado-conjunto-desasignar");

    if (!marcados) {
        alert("Debe seleccionar al menos un conjunto de operadores para desasignar");
        return;
    }

    let arrConjuntosListas = new Array();

    for (let i = 0; i < marcados.length; i++) {
        let check = marcados[i];
        if (check.checked === true) {
            let pos = check.id.indexOf("-");
            let idConjunto = check.id.substring(4, pos);
            let idLista = $('#' + check.id).val();
            let conjLista = new ConjuntoLista(idConjunto, idLista);
            arrConjuntosListas.push(conjLista);
        }
    }

    if (arrConjuntosListas.length > 0) {
        DesasignarArrayConjuntoOperadores(arrConjuntosListas);
    }
}

// Marca o desmarca el check de los grupos de operadores seleccionados
function MarcarGrupoComoSeleccionado(idCheck) {
    let check = document.getElementById(idCheck);
    if (check) {
        if (check.checked)
            check.checked = false;
        else
            check.checked = true;
    }
}

// Marca todos los conjuntos de operadores que tenga asignados la lista
function SeleccionaGruposLista(idreg) {
    let nodeList = document.querySelectorAll("input.marcado-conjunto-desasignar");
    let idLista = idreg.substring(3);

    if (nodeList) {
        if (!$('#' + idreg).hasClass("lista-seleccionada")) {
            for (let i = 0; i < nodeList.length; i++) {
                if (idLista === nodeList[i].value) // Sol si pertenece a la lista seleccionada
                    nodeList[i].checked = true;
            }

            $('#' + idreg).addClass("lista-seleccionada");
        }
        else {
            for (let i = 0; i < nodeList.length; i++) {
                if (idLista === nodeList[i].value)
                    nodeList[i].checked = false;
            }

            $('#' + idreg).removeClass("lista-seleccionada");
        }
    }

}

// Desmarca todos los conjuntos de operadores marcados de la lista
function DesmarcaLista(idreg, idLista) {
    let checkNode = document.getElementById(idreg);
    if (checkNode) {
        if (checkNode.checked === false) {
            let idRegLista = 'ls_' + idLista;
            $('#' + idRegLista).removeClass("lista-seleccionada");
        }
    }
}

function CheckTodosGrupos() {
    let nodosGrupos = document.querySelectorAll("input.conjuntos-sin-asignar");
    let checkTodos = document.getElementById("IdCheckNoAsignados");
    let marcar = true;
    if (!checkTodos.checked) {
        marcar = false;
    }

    if (nodosGrupos) {
        for (let i = 0; i < nodosGrupos.length; i++) {
            nodosGrupos[i].checked = marcar;
        }
    }
}
