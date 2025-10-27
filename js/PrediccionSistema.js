

function BuscaGruposSinAsociarEnLista(dato) {
    var input, filter, ul, li, a, i, txtValue;

    tab = "_cm";
    if (dato == 1)
        tab = "_ls";

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


function BuscaGruposAsociadosEnLista(dato) {
    var input, filter, ul, li, a, i, txtValue;
    tab = "_cm";
    if (dato == 1)
        tab = "_ls";

    input = document.getElementById("myInputGroupNo" + tab);

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


/// Asignar los grupos asignados al grupo prediccion editado
function AsignaSeleccionados(dato) {
    tab = "_cm";
    if (dato == 1)
        tab = "_ls";

    var idprediccion = $('#hidd_idprediccion').val();
    if (idprediccion === null || idprediccion === "") {
        alert("No se ha encontrado ningún identificador de predicción al que asignar los datos ");
        return;
    }

    var idsGrupos = "";
    var nombresIdsSeleccionados = "";

    var listCheckItems = $("#ul_noasociados" + tab + " input[type=checkbox]:checked");

    if (listCheckItems === null || listCheckItems.length === 0) {
        alert("No se ha seleccionado ningún grupo al que asignar la predicción");
        return;
    }

    $(listCheckItems).each(function () {
        if (this.checked) {
            var id = $(this).attr("id");
            // Elimino los primeros caracteres para quedarme 
            id = id.substr(7);

            if (idsGrupos === "") {
                idsGrupos = id;
            }
            else {
                idsGrupos += ',' + id;
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

    // Obtengo el identificador de prediccion al que se van a asociar
    var idprediccion = $('#hidd_idprediccion').val();
    // Parámetros quee envía a la función
    var params = { 'idschedule': idprediccion, 'idgroups': idsGrupos, 'tipo': tab };

    $.when(
        $.ajax({
            type: "POST",
            url: getAbsolutePath() + "/PrediccionSistema.aspx/SaveGroupSchedulePrediction",
            data: JSON.stringify(params),
            contentType: "application/json; charset=utf-8",
            async: false,
            cache: false,
            timeout: 5000,
            success: function (data) {
                if (data === null) {
                    alert('Se ha producido un error al salvar los datos ');
                }
                var result = $.parseJSON(data.d);
                if (result === 'OK') {
                    AsociaGrupoAPrediccion(idsGrupos, nombresIdsSeleccionados, tab);
                }
                else
                    alert(result);
            }, error: function (e) { console.log(e); }
        })
    ).done();

}


/// Mueve los registros del grupo de no asignados al de asignados.
function AsociaGrupoAPrediccion(ids, nombresIds, tab) {
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
}




function DesasignaSeleccionados(dato) {
    tab = "_cm";
    if (dato == 1)
        tab = "_ls";
    var idprediccion = $('#hidd_idprediccion').val();
    if (idprediccion === null || idprediccion === "") {
        alert("No se ha encontrado ningún identificador de prediccion al que desasignar los grupos ");
        return;
    }

    var idsGrupos = "";
    var nombresIdsSeleccionados = "";

    var listCheckItems = $("#ul_siasociados" + tab + " input[type=checkbox]:checked");

    if (listCheckItems === null || listCheckItems.length === 0) {
        alert("No se ha seleccionado ningún grupo al que desasignar la prediccion");
        return;
    }

    $(listCheckItems).each(function () {
        if (this.checked) {
            var id = $(this).attr("id");
            // Elimino los primeros caracteres para quedarme 
            id = id.substr(7);

            if (idsGrupos === "") {
                idsGrupos = id;
            }
            else {
                idsGrupos += ',' + id;
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
    var idprediccion = $('#hidd_idprediccion').val();
    // Parámetros quee envía a la función
    var params = { 'idgroups': idsGrupos, 'tipo': tab };
    
    $.when(
        $.ajax({
            type: "POST",
            url: getAbsolutePath() + "/PrediccionSistema.aspx/SaveGroupDefaultPredicition",
            data: JSON.stringify(params),
            contentType: "application/json; charset=utf-8",
            async: false,
            cache: false,
            timeout: 5000,
            success: function (data) {
                if (data === null) {
                    alert('Se ha producido un error al salvar los datos ');
                }
                var result = $.parseJSON(data.d);
                if (result === 'OK') {
                    DesAsociaGrupoAPrediccion(idsGrupos, nombresIdsSeleccionados, tab);
                }
                else
                    alert(result);
            }, error: function (e) { console.log(e); }
        })
    ).done();
}




/// Mueve los registros del grupo de no asignados al de asignados.
function DesAsociaGrupoAPrediccion(ids, nombresIds, tab) {
    /// Paso la cadena de Ids a un array
    var arrayIds = ids.split(',');
    /// Paso los nombres a array
    var arrayNombres = nombresIds.split(',');

    var NombrePrediccionSubsistema = $('#hidd_nombreidsubsistema').val();

    // Leo el array y creo los registros
    $.each(arrayIds, function (index, value) {
        var newreg = "<li id='li" + tab + "_" + value + "' class='list-group-item'> " +
            "    <input type='checkbox' id='chk" + tab + "_" + value + "' name='chk" + tab + "_" + value + "' /> " +
            "    &nbsp;&nbsp;<span id='spn" + tab + "_" + value + "'><b>  " + arrayNombres[index] + "</b><span> &nbsp;&nbsp;(" + NombrePrediccionSubsistema + ")</span></li> ";

        // Elimino el registro
        $('#li' + tab + '_' + value).remove();

        // Ahora lo asocio al nuevo UL
        $('#ul_noasociados' + tab).append(newreg);
    });
}