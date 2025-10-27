


class Filtro {
    constructor(id, idCampo, operador, valor) {
        this.id = id;
        this.idCampo = idCampo;
        this.operador = operador;
        this.valor = valor;
    }
}


let g_idRegsSeleccionados = [];


/// --------------------------------------------------------------------------------
/// Check para mostrar solo campañas activas o inactivas.
/// Si el check está marcado solo se muestran las campañas activas sino también
/// se muestran las inactivas
/// --------------------------------------------------------------------------------
function MuestraOcultaDatosCampana() {
    const chkSoloActivo = document.getElementById("SoloActivos");

    if (chkSoloActivo.checked) {
        $('.CampanaInactiva').css('display', 'none');
    }
    else {
        $('.CampanaInactiva').css('display', 'block');
    }

    $("#ComboCampana").selectpicker("refresh");
    $('#ComboCampana').selectpicker('show');
}


/// -------------------------------------------------------------------------------
/// Marca la variable gloabal g_soloactivo, que se usa para la búsqueda, si solo
/// mostrar los datos del cliente o si mostrar también los teléfonos
/// -------------------------------------------------------------------------------
function CheckSoloCliente() {
    const chkSoloActivo = document.getElementById("CheckSoloCliente");

    g_solocliente = chkSoloActivo.checked;
}

/// ----------------------------------------------------------------------------
/// En Panel lateral de filtro de campos
/// Marcamos o desmarcamos un campo para que sea un filtro de la búsqueda
/// Si se marca se muestra el campo por el que se va a filtrar y sino se oculta
/// ----------------------------------------------------------------------------
function AddFiltro() {

    if ($('#rowFiltros').hasClass('no-display')) {
        $('#rowFiltros').removeClass('no-display')
        $('#rowFiltros').css('border-top', '1px dotted #c2c2c2');
        $('#rowFiltros').css('margin-right', '5px');
        $('#rowFiltros').css('margin-left', '1px');
        $('#MuestraOcultaFiltros').css('display', 'block');
        $('#MuestraOcultaFiltros').html('<span class="fa fa-angle-double-down"></span>');
        $('#panelfiltroUpDown').val('1');
    }
    // Es el identifiador único dentro del array de filtros creados
    const id = (idFiltro++).toString();

    let col = "<div class='col-lg-6 col-md-6' id='pnl_" + id + "' style='display:inline-flex; margin-bottom: 15px;' > ";
    // Creo el filtro y lo añado al array
    g_arrFiltros.push(new Filtro(id, '', '=', ''));

    // Campos por los que se va a poder filtrar
    col += CrearComboCamposAFiltrar(id);
    // Combo con los diferentes operadores lógicos (= , >=,<=, > ...)
    col += CrearComboOperadores(id);
    // Campo valor
    col += CrearCampoValor(id);
    col += "<button type='button' class='btn btn-default' style='margin-left:3px;' id='rm_" + id + "' onClick = 'EliminarFiltro(\"" + id + "\")' > " +
        "  <span class='fa fa-trash-o' style='color:red;'></span> " +
        "</buton>";
    col += "</div > ";
    $('#rowFiltros').append(col);
    // Carga Select Picker
    $('.selectpicker').selectpicker('show');

}


function MuestraOcultaPanelFiltros() {
    if ($('#panelfiltroUpDown').val() === '1') {
        $('#panelfiltroUpDown').val('0');
        $('#MuestraOcultaFiltros').html('<span class="fa fa-angle-double-up"></span>');
        if (!$('#rowFiltros').hasClass('no-display')) {
            $('#rowFiltros').addClass('no-display');
        }
    }
    else {
        $('#panelfiltroUpDown').val('1');
        $('#MuestraOcultaFiltros').html('<span class="fa fa-angle-double-down"></span>');
        if ($('#rowFiltros').hasClass('no-display')) {
            $('#rowFiltros').removeClass('no-display');
        }
    }
}

/// -----------------------------------------------------------------------------------
/// Creamos el combo con todos los posibles campos por los que se va a poder filtrar
/// -----------------------------------------------------------------------------------
function CrearComboCamposAFiltrar(id) {
    let combo = "<div class='margin-right-0' style='min-width:200px; max-width: 300px;'>" +
        "<select class='form-control selectpicker' id='ca_" + id + "' data-actions-box='true' data-val='true' " +
        "        onchange='CambiaValorCampo(this.id)' title='" + i18next.t('Buscador.SeleccCampo') + "' > ";
    for (let i = 0; i < camposBusqueda.length; i++) {
        combo += "<option value='" + camposBusqueda[i].Id + "' >" + camposBusqueda[i].NombreCampo + "</option> ";
    }
    combo += "</select> </div>";

    return combo;
}


function CrearCampoValor(idFiltro) {
    let field = "<div id='PanelCampoAFiltrar_" + idFiltro + "' class='ancho-valor-filtrar'> ";
    field += CrearCampoValorAFiltrar(idFiltro, '', 'txt');
    field += "</div> ";

    return field;
}



/// --------------------------------------------------------------------------------------------

function CrearComboOperadores(id) {
    let combo = "<div class='margin-right-0' style='min-width:150px;max-width:200px'> " +
        "  <select class='form-control selectpicker ' id='op_" + id + "' data-actions-box='true' data-val='true' " +
        "          name='op_" + id + "' onchange='CambiaValorCampo(this.id)' > ";
    for (let i = 0; i < g_operadoresLogicos.length; i++) {
        if (i === 0)
            combo += "<option value='" + g_operadoresLogicos[i].Operador + "' selected >" + g_operadoresLogicos[i].Nombre + "</option> ";
        else
            combo += "<option value='" + g_operadoresLogicos[i].Operador + "' >" + g_operadoresLogicos[i].Nombre + "</option> ";
    }
    combo += "</select> </div>";

    return combo;
}

/// ----------------------------------------------------------------------
/// En función del campo seleccionado como filtro en el panel lateral
/// se creará el campo en el formulario de búsqueda según el tipo de
/// campo que se haya seleccionado (texto, numero, fecha, estados ...)
/// ----------------------------------------------------------------------
function CrearCampoValorAFiltrar(idFiltro, idElem, tipoCampoElem) {
    let cadena = "";
    let inputType = 'text';

    if (idElem === 'EstadoTelefono') {
        cadena += CrearComboEstadoTelefonos(idFiltro);
    }
    else if (idElem === 'ResultadoNegocio') {
        cadena += CrearComboDeResultadosNegocio(idFiltro);
    }
    else if (idElem == 'Estado' || idElem == 'EstadoRegistro') {
        cadena += CrearComboEstadoRegistro(idFiltro);
    }
    else {
        if (tipoCampoElem === 'DateTime') {
            inputType = 'date';
        }
        else if (tipoCampoElem === 'Int') {
            inputType = 'text';
        }

        cadena += "  <input type = '" + inputType + "' id = 'vl_" + idFiltro + "' class='form-control' onchange='CambiaValorCampo(this.id)' /> ";
    }
    return cadena;
}




/// ---------------------------------------------------------------------------------------
/// Si se selecciona buscar por estados se crea el campo del combo con los posibles
/// resultados que puede tener este campo.
/// ---------------------------------------------------------------------------------------
function CrearComboEstadoRegistro(idElem) {
    let comboEstado = "   <select id='vl_" + idElem + "' class='form-control selectpicker' multiple data-actions-box='true' data-val='true' " +
        "           title='Seleccionar estado' name='vl_" + idElem + "' onchange='CambiaValorCampo(this.id)' > " +
        "      <option value = 'N' > " + i18next.t('Buscador.NoTocados') + " </option > " +
        "      <option value = 'R' > " + i18next.t('Buscador.Reprogramado') + " </option > " +
        "      <option value = 'F' > " + i18next.t('Buscador.Finalizados') + " </option > " +
        "      <option value = 'C' > " + i18next.t('Buscador.Cancelados') + " </option > " +
        "      <option value = 'A' > " + i18next.t('Buscador.Anulados') + " </option > " +
        "      <option value = 'S' > " + i18next.t('Buscador.Supervision') + " </option > " +
        "      <option value = 'I' > " + i18next.t('Buscador.Inconsistente') + " </option > " +
        "   </select>";
    return comboEstado;
}

/// ------------------------------------------------------------------------------------------------
/// Se ha selecciondo los resultados de negocio para buscar. Se va a crear el combo de resultados
/// Los resultados están en una variable global si la campaña ya ha sido seleccinada, sino estará
/// vacío. Se pasa esta variable global para rellenar el combo
/// ------------------------------------------------------------------------------------------------
function CrearComboDeResultadosNegocio(idElem) {
    let combo = "   <select id='vl_" + idElem + "' class='form-control selectpicker cmbTxtResultados' multiple data-actions-box='true' data-val='true' " +
        "           title='Seleccionar resultado' name='vl_" + idElem + "' onchange='CambiaValorCampo(this.id)' > " +
        g_resultadosNegocio +
        "   </select> ";

    return combo;
}


function CrearComboEstadoTelefonos(idElem) {
    let combo = "   <select id='vl_" + idElem + "' name='vl_" + idElem + "' class='form-control selectpicker' multiple data-actions-box='true' data-val='true' " +
        "           title='Estado teléfono' onchange='CambiaValorCampo(this.id)' > " +
        "     <option value = 'A' > " + i18next.t('Buscador.Activo') + " </option > " +
        "     <option value = 'E' > " + i18next.t('Buscador.Eliminado') + " </option > " +
        "     <option value = 'C' > " + i18next.t('Buscador.Cancelado') + " </option > " +
        "   </select> ";
    return combo;
}


/// -----------------------------------------------------------------------------------------
/// Se ha pulsado el botón de eliminar filtro. Se elimina el filtro en el formulario y se
/// elimina del array de filtros
/// -----------------------------------------------------------------------------------------
function EliminarFiltro(id) {
    // busco el filtro y lo elimino
    const indexOfObject = g_arrFiltros.findIndex(object => {
        return object.id === id
    });

    if (indexOfObject >= 0) {
        g_arrFiltros.splice(indexOfObject, 1);
        // Elimina el panel del filtro
        $('#pnl_' + id).remove();

        // elimino el panel de filtros si no queda ninguna
        if (g_arrFiltros.length === 0) {
            if (!$('#rowFiltros').hasClass('no-display')) {
                $('#rowFiltros').addClass('no-display');
                $('#MuestraOcultaFiltros').html('<span class="fa fa-angle-double-up"></span>');
                $('#MuestraOcultaFiltros').css('display', 'none');
                $('#panelfiltroUpDown').val('0');
            }
        }
    }
}



/// ----------------------------------------------------------------------------------------
/// Se ha pulsado el botón de buscar
/// Realiza la búsqueda de registros según los filtros seleccionados. Hace un llamada al 
/// servidor para obtener los regitros en función a los parámetros que se pasan.
/// Con los datos devueltos de recarga la tabla-
/// ----------------------------------------------------------------------------------------
function BuscarRegistros() {

    g_SeHaPuldadoBuscar = 'true';

    if (g_campanaId === 0) {
        alert("Debe seleccionar una campaña");
        return;
    }

    if ($("#CopiarRegistros").hasClass("hidden")) {
        $("#CopiarRegistros").removeClass("hidden");
        $("#CopiarRegistros").css("visibility", "visible");
    }

    if ($("#RegistorsACSV").hasClass("hidden")) {
        $("#RegistorsACSV").removeClass("hidden");
        $("#RegistorsACSV").css("visibility", "visible");
    }

    if ($("#divExportarTodo").hasClass("hidden")) {
        $("#divExportarTodo").removeClass("hidden");
        $("#divExportarTodo").css("visibility", "visible");
    }

    g_listaSeleccionada = "";
    // Parámetros que se pasan para la búsqueda
    let listaSeleccionada = $("#ListasCampanas").val();
    if (listaSeleccionada !== null && listaSeleccionada !== "") {
        if (listaSeleccionada.length > 0) {
            g_listaSeleccionada = listaSeleccionada;
        }
    }

    g_totalRegistros = $('#TotalRegistros').val();

    if (g_listaSeleccionada == undefined || g_listaSeleccionada == 'null') {
        g_listaSeleccionada = '';
    }
    // Recarga la tabla con los nuevo parámetros
    tablaReg.ajax.reload();
    if ($('#Check_Todos').is(':checked')) {
        $('#Check_Todos').prop('checked', false);
    }
}



/// ---------------------------------------------------------------------------------------
/// Lanzado por el evento OnChage del combo de campañas
/// Cuando se seleccina una nueva campaa en el combo se buscan sus listas y los resultados
/// de negocio asociados a esa campaña
/// ---------------------------------------------------------------------------------------
function CambiaCampana() {
    g_SeHaPuldadoBuscar = 'false';
    ///Borramos el contenido de la tabla ya que los datos no pertenecerán a la campaña seleccionada
    tablaReg.clear().draw();
    tablaReg.state.clear();

    // obtenemos el prefijo de la tabla de telemarketer de la campaña. Campo necesario para la búsqueda
    ObtenerPrefijoTablaTelemarketer();

    // Obtenemos el identificador de la campaña seleccionada
    g_campanaId = $('#ComboCampana').val();
    var params = { 'idcampana': g_campanaId };

    if (g_campanaId && g_campanaId !== "") {
        // Llamada para recargar el combo de Listas
        RecargaComboListas(params);
        // Recarga el combo de resultados
        RecargaComboResultados();
    }
    else {
        $('#ListasCampanas').empty();
    }
}

/// --------------------------------------------------------------------------------------------
/// Hacemos una llamada ajax al servidor para obtener el prefijo de la tabla de telemarketer
/// de la campaña que se ha seleccionado
/// --------------------------------------------------------------------------------------------
function ObtenerPrefijoTablaTelemarketer() {
    g_campanaId = $('#ComboCampana').val();

    let params = { 'idcampana': g_campanaId };

    $.ajax({
        type: "POST",
        url: getRutaAbsolutaMVC() + "/BuscadorRegistros/GetTelemarketerPrefixTable",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: false,
        cache: false,
        timeout: 5000,
        success: function (data) {
            if (data === null) {
                let msg = i18next.t("Buscador.ErrObtenerPrefijo");
                alert(msg);
            }
            g_tablaTmkt = window.JSON.parse(data); // $.parseJSON(data); deprecado
        }, error: function (e) { console.log(e); g_tablaTmkt = ""; }
    });
}

/// --------------------------------------------------------------------------
/// Rellena el combo de listas.
/// Se llama al servidor para buscar todas las listas asociadas a la campaña
/// seleccionada. Con los datos devueltos se carga el combo
/// Los datos que se devuelven son cadenas html '<option value='codlista'>Lista nombre </option>'
/// --------------------------------------------------------------------------
function RecargaComboListas(params) {
    // Llamada para buscar las listas de la campaña
    $.ajax({
        type: "POST",
        url: getRutaAbsolutaMVC() + "/BuscadorRegistros/GetCampaignLists",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data === null) {
                alert(i18i18next.t('ErrComboListas'));
            }

            let datoslista = window.JSON.parse(data); //$.parseJSON(data);
            $('#ListasCampanas').empty();

            if (datoslista.length > 1) {
                $('#ListasCampanas').append("<option value='0' > -- " + i18next.t("Buscador.Todos") + " -- </option>");
            }

            for (let i = 0; i < datoslista.length; i++) {
                let lista = datoslista[i];
                // En Value2 viene si la lista está activa o no
                if (lista.Value2 != "S") {
                    $('#ListasCampanas').append("<option class='ListaInactiva' value='" + lista.Key + "' >" + lista.Value + "</option>");
                }
                else {
                    $('#ListasCampanas').append("<option value='" + lista.Key + "' >" + lista.Value + "</option>");
                }
                $("select[name=ListasCampanas]").val('0');
                $("#ListasCampanas").selectpicker("refresh");
            }
        }, error: function (e) { console.log(e); }
    });

}


/// -----------------------------------------------------------------------
/// Rellena el combo de resultados de negocio. Son todas las resultados
///  de la campaña seleccionada.
/// -----------------------------------------------------------------------
function RecargaComboResultados() {
    var params = { 'prefijoTabla': g_tablaTmkt }
    $.ajax({
        type: "POST",
        url: getRutaAbsolutaMVC() + "/BuscadorRegistros/GetCampaignBussinessResults",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data === null) {
                alert(i18next.t("Buscador.ErrResultados"));
            }

            let datos = window.JSON.parse(data); //$.parseJSON(data);
            // vacío lo que hubiese de antes
            g_resultadosNegocio = "";
            // Cargo los resultados en la variable global
            for (var i = 0; i < datos.length; i++) {
                let resultado = datos[i];
                g_resultadosNegocio += "<option value='" + resultado.Codigo + "' >" + resultado.Descripcion + "</option>";
            }
            // Compruebo si el combo de resultados está activo para la búsqueda. Si es así lo cargo sino
            // no se hace nada, ya se cargará cuando se active
            let combosResultados = document.getElementsByClassName('cmbTxtResultados');
            if (combosResultados && combosResultados.length > 0) {
                for (let i = 0; i <= combosResultados.length - 1; i++) {
                    let idcombo = combosResultados[i].id;
                    if (idcombo !== '') {
                        // Vacío el interior del combo antes de poner lo nuevo
                        $('#' + idcombo).empty();
                        // Añado lo nuevo
                        $('#' + idcombo).html(g_resultadosNegocio);
                    }
                }
                $('.cmbTxtResultados').selectpicker("refresh");
            }
        }, error: function (e) { console.log(e); }
    });
}

/// --------------------------------------------------------------------------------
/// Se llama a esta función cuando se cambia el valor de un campo. Evento onchange
/// Dentro de la estructura de filtro de capos se le pasa el nuevo valor 
/// --------------------------------------------------------------------------------
function CambiaValorCampo(idElem) {

    let idFiltro = idElem.substr(3);
    let prefijoIdComponente = idElem.substring(0, 2);
    // Obtengo el nombre del campo
    const idElemento = $('#ca_' + idFiltro).val();
    const operador = $('#op_' + idFiltro).val();

    let campobusqueda = camposBusqueda.find(f => f.Id === idElemento);

    if (campobusqueda) {
        tipoCampo = campobusqueda.TipoCampo;
    }
    else {
        tipoCampo = "String";
    }

    // Si es un cambio en el combo de campos
    if (prefijoIdComponente === 'ca') {
        $('#vl_' + idFiltro).remove();
        const componente = CrearCampoValorAFiltrar(idFiltro, idElemento, tipoCampo);
        $('#PanelCampoAFiltrar_' + idFiltro).html(componente);
        $('.selectpicker').selectpicker('show');
    }

    // Si se ha cambiado el operador lógico y es de tipo sd (sin datos) o cd (con datos) no se muestra el campo del valor
    let value;
    if (operador === 'sd' || operador === 'cd') {
        value = '';
        $('#PanelCampoAFiltrar_' + idFiltro).css('display', 'none');
    }
    else { // Si se muestra el campo vaor
        $('#PanelCampoAFiltrar_' + idFiltro).css('display', 'block');
        value = $('#vl_' + idFiltro).val();
    }

    let campoFiltro = g_arrFiltros.find(f => f.id === idFiltro);

    // Si lo ha encontrado le aplico el valor de este campo
    if (campoFiltro) {
        if ((idElemento === 'Estado' || idElemento === 'EstadoRegistro' || idElemento === 'ResultadoNegocio' || idElemento === 'EstadoTelefono') &&
            (operador != 'sd' && operador != 'cd')) {
            campoFiltro.valor = value.toString();
            campoFiltro.operador = 'in';
            const idop = "op_" + idFiltro;
            $("select[name=" + idop + "]").val('in');
            $('.selectpicker').selectpicker('refresh')
        }
        else {
            campoFiltro.valor = value;
            campoFiltro.operador = operador;
        }

        campoFiltro.idCampo = idElemento;
    }
    else {
        g_arrFiltros.push(new Filtro(idFiltro, idCampo, operador, value));
        g_arrFiltros.push(new Filtro(idFiltro, idCampo, operador, value));
    }
}





/// --------------------------------------------------------------------------------------
/// Abre el formularios para poder cambiar los datos sobre los registros seleccionados
/// --------------------------------------------------------------------------------------
function CargaDialogoDatosRegistro(id, idcampana) {
    // Primero vacío el ifframe
    var iframe = document.getElementById("IdIframe");
    var html = "";

    iframe.contentWindow.document.open();
    iframe.contentWindow.async = true;
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();

    $('#spinner').css('display', 'block');

    // Si hay registros seleccionados se muestran los seleccionados no el que se ha pulsado
    if (g_idRegsSeleccionados.length > 0) {
        id = g_idRegsSeleccionados.toString();
    }

    if (g_idRegsSeleccionados.length <= 1) {
        url = getRutaAbsoluta() + "/EdicionRegistrosCampana2Col.aspx?idCampana=" + idcampana + "&idBusqueda=" + id;
//        url = getRutaAbsoluta() + "/BuscadorRegistros/EdicionDatosRegistro?idCampana=" + idcampana + "&idRegistro=" + id;
        title = i18next.t("Buscador.EdicionRegistro") + "  " + id;
    }
    else {
        if (g_idRegsSeleccionados.length <= 40) {
            // url = getRutaAbsoluta() + "/EdicionRegistrosCampanaVarios.aspx?idCampana=" + idcampana + "&idRegistros=" + id;
            url = getRutaAbsolutaMVC() + "/BuscadorRegistros/EdicionMultiplesRegistros?idCampana=" + idcampana + "&idRegistros=" + id + "&fiheroRegistros=";
            title = i18next.t("Buscador.EdicionMultiple");
        }
        else {
            MultiplesRegistrosSeleccionados(idcampana, id);
            // vacío array de seleccionados
            g_idRegsSeleccionados = [];
            return;
        }
    }

    AbrirFrameRegistros(title, url);
    // vacío array de seleccionados
    g_idRegsSeleccionados = [];
}



function MultiplesRegistrosSeleccionados(idCampana, idsRegistros) {
    let params = { "idCampana": idCampana, "idRegistros": idsRegistros }

    $.ajax({
        type: "POST",
        url: getRutaAbsolutaMVC() + "/BuscadorRegistros/GuardaRegistrosSeleccionados", //?idCampana=" + idCampana + "&idRegistros=" + idsRegistros,
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data !== 'KO') {
                const title = 'Edición multiple';
                //const url = getRutaAbsoluta() + '/EdicionRegistrosCampanaVarios.aspx?idCampana=' + idCampana + '&idRegistros=EDICIONMULTIPLESREGISTROS&ficheroRegistros=' + data.d;
                const url = getRutaAbsolutaMVC() + "/BuscadorRegistros/EdicionMultiplesRegistros?idCampana=" + idCampana + "&idRegistros=EDICIONMULTIPLESREGISTROS&fiheroRegistros=" + data;
                AbrirFrameRegistros(title, url);
            }
            else {
                alert(i18next.t("Buscador.ErrFomMultipleEdit"));
            }
        }, error: function (e) { alert(e); }
    });

}

function AbrirFrameRegistros(title, url) {
    $('#myModalTitle').text(title);

    const $iframe = $('#IdIframe');
    if ($iframe.length) {
        $iframe.attr('src', url);
    }

    $('#modalEdicionRegistro').modal('show');

    $('#modalEdicionRegistro').modal({
        keyboard: false,
        show: false
    });
}


/// ------------------------------------------------------------
/// Exporta los registros a fichero CSV, o Copiar a Clipboard
/// ------------------------------------------------------------
function ExportarAFichero(tipo, tipoControler) {
    let order = tablaReg.order();
    let orderDir = order[0][1];
    let column = tablaReg.column(order[0][0]).header();
    let orderColumn = $(column).html();

    $("#SpinnerBuscar").css('display', 'inline-block');

    let params;
    let urlsrvc = "";

    // Miro si es una exportación de datos de campaña o de histórico
    if (tipoControler === "C") {
        urlsrvc = getRutaAbsolutaMVC() + "/BuscadorRegistros/ExportarRegistros";
        params = {
            'tablaTmkt': g_tablaTmkt, 'campanaid': g_campanaId, 'listaid': g_listaSeleccionada, 'totalRegistros': g_totalRegistros,
            'orderColumn': orderColumn, 'orderDir': orderDir, 'jsfiltros': JSON.stringify(g_arrFiltros), 'tipo': tipo, 'solocliente': g_solocliente,
            'exportarTodos': g_exportarTodos
        }
    }
    else {
        // Parámetros para histórico
        urlsrvc = getRutaAbsolutaMVC() + "/BuscadorRegistros/ExportarRegistrosHistorico"
        params = {
            'tablaTmkt': g_tablaTmkt, 'campanaid': g_campanaId, 'listaid': g_listaSeleccionada, 'totalRegistros': g_totalRegistros,
            'orderColumn': orderColumn, 'orderDir': orderDir, 'jsfiltros': JSON.stringify(g_arrFiltros), 'tipo': tipo, 'exportarTodos': g_exportarTodos
        }
    }


    $.ajax({
        type: 'POST',
        url: urlsrvc,
        data: params,
        success: function (datos) {
            let respuesta = JSON.parse(datos);

            if (tipo === 'CSV') {
                DescargaDatosACSV(respuesta);
            }
            else if (tipo === 'CPY') {
                copyTextToClipboard(respuesta)
            }
            else if (tipo === 'XLS') {
                exportToExcel(respuesta);
            }
            $("#SpinnerBuscar").css('display', 'none');
            $("#SpinnerBuscar").css('display', 'none');
        }
    }).fail(function () {
        $("#SpinnerBuscar").css('display', 'none');
        alert("Could not access the server");
    });
}



function DescargaDatosACSV(texto) {
    let fecha = new Date();
    let mes = fecha.getMonth() + 1;

    if (mes > 9) {
        mes = '0' + mes;
    }
    let shoras = fecha.getFullYear() + '' + fecha.getMonth() + '' + fecha.getDate() + '_' + fecha.getHours() + '' + fecha.getMinutes() + '' + fecha.getSeconds();
    const filename = 'Registros_' + shoras + '.csv';
    if (true && window.navigator.msSaveBlob) {
        var blob = new Blob([decodeURIComponent(texto)], {
            type: 'application/vnd.ms-excel;charset=UTF-8'
        });
        window.navigator.msSaveBlob(blob, filename);
    }
    else if (window.Blob && window.URL) {
        var csvFile;
        var downloadLink;
        //csvFile = new Blob([mensaje], { type: 'application/vnd.ms-excel;charset=UTF-8' });
        csvFile = new Blob(["\ufeff", texto]);
        downloadLink = document.createElement('a');
        downloadLink.download = filename;
        downloadLink.href = window.URL.createObjectURL(csvFile);
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
}


function fallbackCopyTextToClipboard(text) {
    let textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        let successful = document.execCommand('copy');  // está obsoleto, posible solución, pero no igual navigator.clipboard.writeText(text);
        let msg = successful ? i18next.t('Buscador.DatosSalvadosOk') : i18next.t('Buscador.DatosSalvadosKO');
        alert(msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}


function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        alert(i18next.t('Buscador.CopiaPortapapelesOK'));
    }, function (err) {
        alert(i18next.t('Buscador.CopiaPortapapelesKO'), err);
    });
}



function exportToExcel(text) {
    let htmls = "";
    let uri = 'data:application/vnd.ms-excel;base64,';
    let template = '\ufeff<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
    let base64 = function (s) {
        return window.btoa(unescape(encodeURIComponent(s)))
    };

    let format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
        })
    };

    htmls = getTableFromText(text);

    let ctx = {
        worksheet: 'Worksheet',
        table: htmls
    }

    let fecha = new Date();
    let mes = fecha.getMonth() + 1;

    if (mes > 9) mes = '0' + mes;
    let shoras = fecha.getFullYear() + '' + fecha.getMonth() + '' + fecha.getDate() + '_' + fecha.getHours() + '' + fecha.getMinutes() + '' + fecha.getSeconds();

    var link = document.createElement("a");
    link.download = "Registros_" + shoras + ".xls";
    link.href = uri + base64(format(template, ctx));
    link.click();
}


function getTableFromText(text) {

    const arrdatos = text.split("\r\n");

    let tab_text = "<tr bgcolor='#87AFC6'>";
    let j = 0;
    let i = 0;
    //tab = document.getElementById('headerTable'); // id of table
    let arrlinea = [];

    for (j = 0; j < arrdatos.length - 1; j++) {
        tab_text += "<tr>";
        arrlinea = arrdatos[j].split(",");

        for (i = 0; i < arrlinea.length - 1; i++) {
            if (j === 0) {
                tab_text += "<th>" + arrlinea[i] + "</th>";
            }
            else {
                tab_text += "<td>" + arrlinea[i] + "</td>";
            }
        }
        tab_text += "</tr>";
    }

    return (tab_text);
}




function CheckTodos() {
    // Si el check está marcado, marcamos todos los check
    if ($('#Check_Todos').is(':checked')) {
        $('table#TablaRegistros input[type=checkbox]').each(function () {
            if (!$(this).is(":checked")) {
                $(this).prop('checked', true);
            }


            if (this.id && this.id !== '') {
                // Si ya existe no hace falta guardarlo
                if (g_idRegsSeleccionados.find(e => e.id === this.id.slice(3))) {
                    return;
                }
                // viene con formato chk_id, por eso quito los tres primeros caracteres
                g_idRegsSeleccionados.push(this.id.slice(3));
            }
        });


    }
    else {
        // Desmarcamos todos los registros que estén marcados
        $('table#TablaRegistros input[type=checkbox]').each(function () {
            if ($(this).is(":checked")) {
                $(this).prop('checked', false);
            }
        });
        g_idRegsSeleccionados = [];
    }
}


function SeleccionaRegistro(id) {
    /// viene con el formato rg_id, me quedo solo con el identificador del registro
    let idreg = id.substr(3);

    const check = document.getElementById(id);
    if (check) {
        if (check.checked) {
            g_idRegsSeleccionados.push(idreg);
            // Busco los que hay marcados con check
            let valoresCheckMarcado = 0;

            $("table#TablaRegistros input[type=checkbox]:checked").each(function () {
                if (this.id && this.id !== '') {
                    valoresCheckMarcado++;
                }
            });
            // Ahorabusco los que hay en total
            let totalChcks = $('table#TablaRegistros input[type=checkbox]').length;
            // le resto uno porque también me cuenta el de seleccionar todos
            totalChcks--;
            // Si están todos marcados marcados marco el de todos
            if (totalChcks === valoresCheckMarcado) {
                $('#Check_Todos').prop('checked', true);
            }
        }
        else {
            const indexOfObject = g_idRegsSeleccionados.indexOf(idreg);

            if (indexOfObject >= 0) {
                g_idRegsSeleccionados.splice(indexOfObject, 1);
                $('#Check_Todos').prop('checked', false);
            }
        }
    }
}



function ExportarTodoCheck() {
    let check = document.getElementById("exportarTodo");
    if (check !== undefined && check !== null) {
        if (check.checked)
            g_exportarTodos = true;
        else
            g_exportarTodos = false;
    }

}


