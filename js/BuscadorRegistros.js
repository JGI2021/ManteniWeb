



/// Exporta la búsqueda de registros a fichero CSV
function ExportarAExcel() {
    let valorIdRegistro = $('#IdRegistro').val();
    let valorComboEstado = $('#ComboEstado').val();
    let valorNombre = encodeURIComponent($('#Nombre').val());
    let valorPrefijoTabla = $('#PrefijoTablaTmkt').val();
    let valorResultado = $('#ComboResultados').val();
    let valorComboCampana = $('#ComboCampana').val();
    let valorNumeroTelefono = encodeURIComponent($('#NumeroTelefono').val());
    let valorMostrarTelefonos = $('#MostrarTelefonos').prop('checked');
    let valorListaSeleccionada = $('#ListasCampanas').val();

    let params = 'idSolicitud=EXPORTAR_BUSCADOR_REGISTROS&IdCampana=' + valorComboCampana + '&nombreTabla=' + valorPrefijoTabla + '&IdRegistro=' + valorIdRegistro + '&Nombre=' + valorNombre +
                 '&IdEstado=' + valorComboEstado + '&IdOpPreferente=' + valorResultado + '&numeroTelefono=' + valorNumeroTelefono + '&MostrarTelefonos=' + valorMostrarTelefonos +
                 '&ListaSeleccionada=' + valorListaSeleccionada;


    $.ajax({
        type: 'POST',
        url: getPathSolicitudesBBDD(),
        data: params,
        success: function (datos) {

            let respuesta = JSON.parse(datos);
            let correcto = respuesta.Resultado;
            let mensaje = JSON.parse(respuesta.Mensaje);
            mensaje = utf8_decode(mensaje);

            if (correcto === '1') {
                var fecha = new Date();
                var mes = fecha.getMonth() + 1;
                if (mes > 9) mes = '0' + mes;
                var shoras = '_' + fecha.getFullYear() + '' + fecha.getMonth() + '' + fecha.getDate() + '_' + fecha.getHours() + '' + fecha.getMinutes() + '' + fecha.getSeconds();
                var filename = 'ExportRegistros' + shoras + '.csv';
                if (true && window.navigator.msSaveBlob) {
                    var blob = new Blob([decodeURIComponent(mensaje)], {
                        type: 'application/vnd.ms-excel;charset=UTF-8'
                    });
                    window.navigator.msSaveBlob(blob, filename);
                }
                else if (window.Blob && window.URL) {
                    var csvFile;
                    var downloadLink;
                    //csvFile = new Blob([mensaje], { type: 'application/vnd.ms-excel;charset=UTF-8' });
                    csvFile = new Blob(["\ufeff", mensaje]); 
                    downloadLink = document.createElement('a');
                    downloadLink.download = filename;
                    downloadLink.href = window.URL.createObjectURL(csvFile);
                    downloadLink.style.display = 'none';
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                }
            }
        }
    });
}


/// ------------------------------------------------------
/// Exporta la búsqueda de histórico a fichero CSV
function ExportarAExcelDatosHistorico() {

    let valorComboCampana = $('#ComboCampana').val();
    let valorListaSeleccionada = $('#ListasCampanas').val();
    var valorIdRegistro = $('#IdRegistro').val();
    let valorComboEstado = $('#ComboEstado').val();
    let valorResultado = $('#ComboResultados').val();
    let valorNumeroTelefono = encodeURIComponent($('#NumeroTelefono').val());
    let valorPrefijoTabla = $('#PrefijoTablaTmkt').val();
    let valorFechaDesde = $('#FechaDesde').val();
    let valorFechaHasta = $('#FechaHasta').val();

    let params = {
        "idLista": valorListaSeleccionada, "nombreTabla": valorPrefijoTabla, "idRegistro": valorIdRegistro, 'idEstado': valorComboEstado,
        "idsResultados": valorResultado, "numeroTelefono": valorNumeroTelefono, "fechaDesde": valorFechaDesde,
        "fechaHasta": valorFechaHasta
    };


    $.ajax({
        type: "POST",
        url: getAbsolutePath() + "/BuscadorRegistros.aspx/ExportarHistoricoRegistros",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: false,
        cache: false,
        timeout: 5000,
        success: function (datos) {
            let respuesta = JSON.parse(datos.d);
            let correcto = respuesta.Resultado;
            let mensaje = JSON.parse(respuesta.Mensaje);
            //mensaje = reemplazarCaracteresEspeciales(mensaje);
            mensaje = utf8_decode(mensaje);

            if (correcto === '1') {
                var fecha = new Date();
                var mes = fecha.getMonth() + 1;
                if (mes > 9) mes = '0' + mes;
                var shoras = '_' + fecha.getFullYear() + '' + fecha.getMonth() + '' + fecha.getDate() + '_' + fecha.getHours() + '' + fecha.getMinutes() + '' + fecha.getSeconds();
                var filename = 'HistoricoRegistros' + shoras + '.csv';
                if (true && window.navigator.msSaveBlob) {
                    var blob = new Blob([decodeURIComponent(mensaje)], {
                        type: 'application/vnd.ms-excel;charset=UTF-8'
                    });
                    window.navigator.msSaveBlob(blob, filename);
                }
                else if (window.Blob && window.URL) {
                    var csvFile;
                    var downloadLink;
                    //csvFile = new Blob([mensaje], { type: 'application/vnd.ms-excel;charset=UTF-8' });
                    csvFile = new Blob(["\ufeff", mensaje]);  // "\ufeff" hace que cuando se abre en el excel los acentos se vean bien, que se grabe como utf-8 con bom
                    downloadLink = document.createElement('a');
                    downloadLink.download = filename;
                    downloadLink.href = window.URL.createObjectURL(csvFile);
                    downloadLink.style.display = 'none';
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                }
            }
        }
    });
}


///
/// Busca registros con los filtros que se hayan seleccionado en la ventana
/// Busca registros con los filtros que se hayan seleccionado en la ventana
///
function Refrescar(posicion) {
    if (posicion === 0) {
        $('#NumPaginaActual').val('0');
    }
    else if (posicion === 1) {
        let numPaginaAct = $('#NumPaginaActual').val();
        let numPaginaAnt = parseInt(numPaginaAct);
        numPaginaAnt = numPaginaAnt - 1;
        if (numPaginaAnt < 0)
            $('#NumPaginaActual').val('0');
        $('#NumPaginaActual').val(numPaginaAnt);
    }
    else if (posicion === 2) {
        let numPaginaAct = $('#NumPaginaActual').val();
        let numPaginaSig = parseInt(numPaginaAct);
        numPaginaSig = numPaginaSig + 1;
        $('#NumPaginaActual').val(numPaginaSig);
    } 

    let numPaginaAMostrar = $('#NumPaginaActual').val();
    let numRegistrosPagina = $('#NumRegistrosPorPagina').val();
    let valorIdRegistro = $('#IdRegistro').val();
    let valorComboEstado = $('#ComboEstado').val();
    let valorNombre = encodeURIComponent($('#Nombre').val());
    let valorPrefijoTabla = $('#PrefijoTablaTmkt').val();

    let resultadosNegocio = $('#ComboResultados').val();
    let valorResultados = '';
    if (resultadosNegocio != null && resultadosNegocio.length >= 0) {
        for (i = 0; i < resultadosNegocio.length; i++) {
            if (i == 0)
                valorResultados = resultadosNegocio[i];
            else
                valorResultados += ',' + resultadosNegocio[i];
        }
    }

    let valorComboCampana = $('#ComboCampana').val();
    let valorNumeroTelefono = encodeURIComponent($('#NumeroTelefono').val());
    let valorMostrarTelefonos = $('#MostrarTelefonos').prop('checked');
    let valorListaSeleccionada = $('#ListasCampanas').val();
    let param = 'idSolicitud=REFRESCAR_BUSCADOR_REGISTROS&IdCampana=' + valorComboCampana + '&nombreTabla=' + valorPrefijoTabla + '&IdRegistro=' + valorIdRegistro + '&Nombre=' + valorNombre +
                 '&IdEstado=' + valorComboEstado + '&IdsResultados=' + valorResultados + '&numPagina=' + numPaginaAMostrar + '&numRegistrosPagina=' + numRegistrosPagina +
                '&numeroTelefono=' + valorNumeroTelefono + '&MostrarTelefonos=' + valorMostrarTelefonos + '&ListaSeleccionada=' + valorListaSeleccionada;
    window.parent.MostrarModalEspera();
    
    $.ajax({
        type: 'POST',
        url: getPathSolicitudesBBDD(),
        data: param,
        success: function (datos) {
            let respuesta = JSON.parse(datos);
            let correcto = respuesta.Resultado;
            let mensaje = respuesta.Mensaje;
            let mensajeDecodificadoCaracteresEspeciales = '';
            try {
                mensajeDecodificado = utf8_decode(mensaje);
            }
            catch (err) {
                mensajeDecodificado = mensaje;
            }
            try {
                mensajeDecodificadoCaracteresEspeciales = reemplazarCaracteresEspeciales(mensaje);
            }
            catch (err) {
                mensajeDecodificadoCaracteresEspeciales = mensaje;
            }
            

            if (correcto === '1') {
                EscribeRegistrosObtenidos(mensaje, valorMostrarTelefonos, valorComboCampana);
                
            }
            else {
                $('#Cuerpo_ModalMensajeErrorPagina').html(mensajeDecodificadoCaracteresEspeciales);
                $('#ModalMensajeErrorPagina').modal({ backdrop: 'static' });
                $('#ModalMensajeErrorPagina').modal('show');
            }
            window.parent.OcultarModalEspera();
        },
        error: {
            function(e) {
                console.log(e);
                window.parent.OcultarModalEspera();
            }
        }
    });
}


///
/// Se crea la tabla con los registros obtenidos de la búsqueda
function EscribeRegistrosObtenidos(mensaje, valorMostrarTelefonos, idCampana)
{
    // cambio el tamaño de visualización de la pantalla si se muestran los teléfonos o no
    if (valorMostrarTelefonos != null && valorMostrarTelefonos) {
        $('#DivAcordeon').css({ width: '130%' });
    }
    else {
        $('#DivAcordeon').css({ width: '100%' });
    }

    let JSONRespuesta = JSON.parse(mensaje);
    let HTMLCabecera = '';
    HTMLCabecera += "<th data-sortable='false'><input type='checkbox' id='Check_Todos' onclick='CheckTodos();'/></th>";
    HTMLCabecera += "<th id='thIdRegistro'> Identificador</th>";
    HTMLCabecera += "<th id='thEstado' > Estado</th>";
    HTMLCabecera += "<th id='thNombre' > Nombre</th>";
    HTMLCabecera += "<th id='thDireccion' > Dirección</th>";
    HTMLCabecera += "<th id='thCiudad' > Ciudad</th>";
    HTMLCabecera += "<th id='thProvincia' > Provincia</th>";
    HTMLCabecera += "<th id='thCodPostal' > Cod. postal</th>";
    HTMLCabecera += "<th id='thvalor1' > Valor1</th>";
    HTMLCabecera += "<th id='thvalor2' > Valor2</th>";
    HTMLCabecera += "<th id='thliteral1' > Literal1</th>";
    HTMLCabecera += "<th id='thliteral2' > Literal2</th>";
    HTMLCabecera += "<th id='thPrioridad' > Prioridad</th>";
    HTMLCabecera += "<th id='thPeso' > Peso</th>";
    HTMLCabecera += "<th id='thResultado'> Resultado</th>";
    HTMLCabecera += "<th id='thOpPreferido' > Op. preferido</th>";

    if (valorMostrarTelefonos != null && valorMostrarTelefonos) {
        HTMLCabecera += "<th id='thTelefono' > Teléfono</th>";
        HTMLCabecera += "<th id='thEstadoTfno' > Estado tfn</th>";
        HTMLCabecera += "<th id='thFechInicio'> Inicio</th>";
        HTMLCabecera += "<th id='thFechaFin' > Fin</th>";
        HTMLCabecera += "<th id='thProxLlamada' > Sig. llamada</th>";
        HTMLCabecera += "<th id='thUltLlamada'> Ult. llamada</th>";
        HTMLCabecera += "<th id='thPesoTfno' > Peso tfno</th>";
        HTMLCabecera += "<th id='thPrioridadTfno'> Prioridad tfno</th>";
    }
    
    var listaInfoDatos = JSONRespuesta.InfoListaDatos;
    var numRegistrosTotal = JSONRespuesta.InfoAdicional; 
    var HTMLInputsOcultos = "";


    var HTMLTabla = "<table id='TBL11'  class='footable table-striped table-condensed' data-sorting='true' data-expand-first='true' style='border-collapse: collapse;' >  ";
    HTMLTabla += "<thead style='position: sticky; top: 0; z-index: 1;'>";
    HTMLTabla += "<tr id='CabeceraTBL11'>";
    HTMLTabla += HTMLCabecera;
    HTMLTabla += "</tr>";
    HTMLTabla += "</thead>";
    HTMLTabla += "<tbody id='CuerpoTBL11'>";
    for (var i = 0; i < listaInfoDatos.length; i++) {
        let JSONInfoListaDatos = listaInfoDatos[i];
        let InfoListaDatos = JSON.parse(JSONInfoListaDatos);
        let Key = InfoListaDatos.Key.trim();
        let idRegistro = InfoListaDatos.IdRegistro;
        let nombre = utf8_decode(InfoListaDatos.Nombre);
        let idEstado = InfoListaDatos.IdEstado;
        let nombreEstado = utf8_decode(InfoListaDatos.NombreEstado);

        let direccion = utf8_decode(InfoListaDatos.Direccion);
        let ciudad = utf8_decode(InfoListaDatos.Ciudad);
        let provincia = utf8_decode(InfoListaDatos.Provincia);
        let codPostal = utf8_decode(InfoListaDatos.CodigoPostal);

        let valor1 = utf8_decode(InfoListaDatos.Valor1);
        let literal1 = utf8_decode(InfoListaDatos.Literal1);
        let valor2 = utf8_decode(InfoListaDatos.Valor2);
        let literal2 = utf8_decode(InfoListaDatos.Literal2);

        let prioridad = utf8_decode(InfoListaDatos.Prioridad);
        let peso = utf8_decode(InfoListaDatos.Peso);
        let descresultado = utf8_decode(InfoListaDatos.DescResultado);

        let idOperadorPreferente = utf8_decode(InfoListaDatos.IdOperadorPreferente);
        let nombreOperadorPreferente = utf8_decode(InfoListaDatos.NombreOperadorPreferente);
        
        let telefono = utf8_decode(InfoListaDatos.Telefono);
        let estadoTfno = utf8_decode(InfoListaDatos.EstadoTfno);
        let fhinicio = utf8_decode(InfoListaDatos.FechahoraInicio);
        let fhfin = utf8_decode(InfoListaDatos.FechahoraFin);
        let fhproxllamada = utf8_decode(InfoListaDatos.FechahoraSigLlamada);

        let ultllamda = utf8_decode(InfoListaDatos.FechahoraUltLlamada);
        let pesoTfno = utf8_decode(InfoListaDatos.PesoTelefono);
        let prioridadTfno = utf8_decode(InfoListaDatos.PrioridadTelefono);
        
        
        //        var HTMLFila = "<tr id='BEditarRegistro_" + Key + "'  onClick='FEscucharMensaje(" + idCampana + ",this.id)' >";
        var HTMLFila = "<tr id='BEditarRegistro@" + Key + "'  >";
        HTMLFila += "<td ><input type='checkbox' id='Check_" + Key + "' /></td>";
        
        HTMLFila += "<td id='Registro@" + Key + "'>" + idRegistro + "</td>";
        HTMLFila += "<td id='Estado@" + Key + "'>" + nombreEstado + "</td>";
        HTMLFila += "<td id='Nombre@" + Key + "'>" + nombre + "</td> ";

        HTMLFila += "<td id='Direccion@" + Key + "'>" + direccion + "</td> ";
        HTMLFila += "<td id='Ciudad@" + Key + "'>" + ciudad + "</td> ";
        HTMLFila += "<td id='Provincia@" + Key + "'>" + provincia + "</td> ";
        HTMLFila += "<td id='CodPostal@" + Key + "'>" + codPostal + "</td> ";
        HTMLFila += "<td id='Valor1@" + Key + "'>" + valor1 + "</td>";
        HTMLFila += "<td id='valor2@" + Key + "'>" + valor2 + "</td>";
        HTMLFila += "<td id='Literal1@" + Key + "'>" + literal1 + "</td>";
        HTMLFila += "<td id='literal2@" + Key + "'>" + literal2 + "</td>";

        HTMLFila += "<td id='Prioridad@" + Key + "'>" + prioridad + "</td>";
        HTMLFila += "<td id='Peso@" + Key + "'>" + peso + "</td>";
        HTMLFila += "<td id='Descresultado@" + Key + "'>" + descresultado + "</td>";

        HTMLFila += "<td id='OpPreferido@" + Key + "'>" + nombreOperadorPreferente + "</td>";


        if (valorMostrarTelefonos != null && valorMostrarTelefonos) {
            if (telefono === null) {
                telefono = 'Sin teléfono';
                estadoTfno = ' --- ';
                fhinicio = ' --- ';
                fhfin = ' --- ';
                fhproxllamada = ' --- ';
                ultllamda = ' --- ';
                pesoTfno = ' --- ';
                estadoTfno = ' --- ';
            }            
            HTMLFila += "<td id='telefono@" + Key + "'>" + telefono + "</td>";
            HTMLFila += "<td id='estadoTfno@" + Key + "'>" + estadoTfno + "</td>";
            HTMLFila += "<td id='fhinicio@" + Key + "'>" + fhinicio + "</td>";
            HTMLFila += "<td id='fhfin@" + Key + "'>" + fhfin + "</td>";
            HTMLFila += "<td id='fhproxllamada@" + Key + "'>" + fhproxllamada + "</td>";
            HTMLFila += "<td id='fhUltllamada@" + Key + "'>" + ultllamda + "</td>";
            HTMLFila += "<td id='PesoTfno@" + Key + "'>" + pesoTfno + "</td>";
            HTMLFila += "<td id='PrioridadTfno@" + Key + "'>" + prioridadTfno + "</td>";
        }
        
        HTMLFila += "</tr>";
        HTMLInputsOcultos += "<input type='hidden' id='IdOperadorPreferente@" + Key + "' value='" + idOperadorPreferente + "'>";
        HTMLInputsOcultos += "<input type='hidden' id='IdEstado@" + Key + "' value='" + idEstado + "'>";
        HTMLTabla += HTMLFila;
    }
    HTMLTabla += "</tbody>";
    HTMLTabla += "</table>";
    window.parent.OcultarModalEspera();
    $('#DivAcordeon').html(HTMLTabla);
    $('#BotonBuscarAnterior').css('visibility', 'visible');
    $('#BotonBuscarAnterior').prop('disabled', false);
    $('#LabelNumRegistrosMostrados').css('visibility', 'visible');
    $('#BotonExportarAEcel').css('display', 'inline-block');
    $('#BtnAcciones').css('display', 'inline-block');
    $('#BotonBuscarSiguiente').css('visibility', 'visible');
    $('#BotonBuscarSiguiente').prop('disabled', false);
    var numRegistrosPorPagina = NumRegistrosPorPagina();
    var numPaginaActual = parseInt($('#NumPaginaActual').val());
    var numRegistrosTotalInt = parseInt(numRegistrosTotal);
    var idPrimerRegistro = numRegistrosPorPagina * numPaginaActual;
    var idUltimoRegistro = idPrimerRegistro + numRegistrosPorPagina - 1;
    var idMostrarPrimerRegistro = idPrimerRegistro + 1;
    var idMostrarUltimoRegistro = idPrimerRegistro + numRegistrosPorPagina;
    if (idMostrarUltimoRegistro > numRegistrosTotalInt)
        idMostrarUltimoRegistro = numRegistrosTotalInt;
    $('#LabelNumRegistrosMostrados').text(idMostrarPrimerRegistro + '-' + idMostrarUltimoRegistro + ' de ' + numRegistrosTotalInt);
    $('#LabelNumRegistrosMostrados').css('color', 'black');
    if (numPaginaActual === 0)
        $('#BotonBuscarAnterior').prop('disabled', true);
    if (idMostrarUltimoRegistro == numRegistrosTotal)
        $('#BotonBuscarSiguiente').prop('disabled', true);
    $('#CeldaAcordeon_iframeGlobal').append(HTMLInputsOcultos);
    $('.footable').footable({ 'empty': '' + i18next.t("Comun.sinRegistros") + ''});
    $('tr').hover(
        function () {
             $(this).find('.FilaOpciones').css('visibility', 'visible');
        },
        function () {
             $(this).find('.FilaOpciones').css('visibility', 'hidden');
        }
    );
    $('td').hover(function () {
        $(this).find('.FilaOpciones').css('visibility', 'visible');
        },
      function () {
          $(this).find('.FilaOpciones').css('visibility', 'hidden');
      });
    $('.DivNoExistente').hover(function () {
        $(this).find('.FilaOpciones').css('visibility', 'visible');
       },
      function () {
          $(this).find('.FilaOpciones').css('visibility', 'hidden');
    });

    $('a').hover(function () {
        $(this).find('.FilaOpciones').css('visibility', 'visible');
       },
      function () {
          $(this).find('.FilaOpciones').css('visibility', 'hidden');
      }
    );

    $('#TBL11 tr td:not(:first-child)').click(function () { 
        //        FEscucharMensaje(idCampana, this.id);
        var id = this.id;
        var arrayId = id.split('@');
        CargaDialogo(arrayId[1]);
    });
    return;
}


/// Se ha seleccionado una nueva campana en el combo de campañas (Evento onchange)
function CambiaCampana()
{
    ///Borramos el contenido de la tabla ya que los datos no pertenecerán a la campaña seleccionada
    $('#TBL11 tbody').empty();
    
    // obtenemos el prefijo de la tabla de telemarketer de la campaña
    ObtenerPrefijoTablaTelemarketer();
    
    // Pongo a cero el contador de registos
    $('#NumPaginaActual').val('0');
    $('#LabelNumRegistrosMostrados').text('------');
    $('#BotonBuscarAnterior').prop('disabled', true);
    $('#BotonBuscarSiguiente').prop('disabled', true);


    // Recargo la página de búsqueda
    // Refrescar(0);

    // Recargamos el combo de listas
    var idcampana = $('#ComboCampana').val();
    // Guardo el identificador de campana
    $('#idCampana').val(idcampana);
    var params = { 'idcampana': idcampana };

    // Llamada para recargar el combo de Listas
    RecargaComboListas(params);
    
    
}


function RecargaComboListas(params) {
    var myUrl = getAbsolutePath() + "/BuscadorRegistros.aspx/GetCampaignLists";

    $.ajax({
        type: "POST",
        url: myUrl,
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data === null) {
                alert('Se ha producido un error al recuperar las listas de la campaña ');
            }

            var datoslista = JSON.parse(data.d);
            $('#ListasCampanas').empty();

            for (var i = 0; i < datoslista.length; i++) {
                var lista = datoslista[i];
                // En Value2 viene si la lista está activa o no
                if (lista.Value2 != "S")
                    $('#ListasCampanas').append("<option class='ListaInactiva' value='" + lista.Key + "' >" + lista.Value + "</option>");
                else
                    $('#ListasCampanas').append("<option value='" + lista.Key + "' >" + lista.Value + "</option>");
                $("#ListasCampanas").selectpicker("refresh");
            }

        }, error: function (e) { console.log(e); }
    });
    // Recarga el combo de resultados
    RecargaComboResultados();
}


function RecargaComboResultados() {
    var prefijoTablaTmkt = $('#PrefijoTablaTmkt').val();
    var params = { 'prefijoTabla': prefijoTablaTmkt }
    $.ajax({
        type: "POST",
        url: getAbsolutePath() + "/BuscadorRegistros.aspx/GetCampaignBussinessResults",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data === null) {
                alert('Se ha producido un error al recuperar las listas de la campaña ');
            }

            var datos = $.parseJSON(data.d);
            $('#ComboResultados').empty();
//            $('#ComboResultados').append("<option value='-1' > Todos </option>");
            $('#ComboResultados').prop('disabled', false);
            for (var i = 0; i < datos.length; i++) {
                var lista = datos[i];
                $('#ComboResultados').append("<option value='" + lista.Codigo + "' >" + lista.Descripcion + "</option>");
                $("#ComboResultados").selectpicker("refresh");
            }
        }, error: function (e) { console.log(e); }
    });
}

/// Hacemos una llamada ajax al servidor para obtener el prefijo de la tabla de telemarketer
/// de la campaña que se ha seleccionado
function ObtenerPrefijoTablaTelemarketer()
{
    var idcampana = $('#ComboCampana').val();
    // Guardo el identificador de campana
    $('#idCampana').val(idcampana);
    var params = { 'idcampana': idcampana };

    $.ajax({
        type: "POST",
        url: getAbsolutePath() + "/BuscadorRegistros.aspx/GetTelemarketerPrefixTable",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: false,
        cache: false,
        timeout: 5000,
        success: function (data) {
            if (data === null) {
                alert('Se ha producido un error al recuperar el nombre del prefijo de la tabla de telemarketer ');
            }

            var prefijoTablaTmkt = $.parseJSON(data.d);
            $('#PrefijoTablaTmkt').val(prefijoTablaTmkt);

        }, error: function (e) { console.log(e); }
    });
}



///Se busca desde el inicio con las condiciones que se han pasado
function CreacionFuncionBuscar() {

    $('#BotonBuscar').click(function () {
        var eshistorico = $('#EsHistorico').val();
        if (eshistorico == 'false') {
            // Solo si hay una campaña seleccionada
            var idcampana = $('#ComboCampana').val();
            if (idcampana === null || idcampana === 'undefined' || idcampana === -1 || idcampana === '')
                alert("Primero debe seleccionar una campaña");
            else
                Refrescar(0);
        }
        else {
            BuscadorDatosHistorico();
        }
  });
}


/// SE buscan los x registros anteriores según los parámetros anteriores
/// Se pone un evento click sobre el botón <<
function CreacionFuncionBuscarAnterior() {

    $('#BotonBuscarAnterior').click(function () {
        var eshistorico = $('#EsHistorico').val();
        if (eshistorico == 'false') {
            Refrescar(1);
        }
        else {
            BuscarHistorico(1);
        }
    });
}


/// Se buscan los x siguientes registros.
/// Se pone un evento click sobre el botón >>
function CreacionFuncionBuscarSiguiente() {    
    $('#BotonBuscarSiguiente').click(function () {
        var eshistorico = $('#EsHistorico').val();
        if (eshistorico == 'false') {
            Refrescar(2);
        }
        else {
            BuscarHistorico(2);
        }
    });
}   


function NumRegistrosPorPagina() {
    var numRegistros = $('#NumRegistrosPorPagina').val();
    if (numRegistros == '') {
        return parseInt('10');
    }
    else {
        return parseInt(numRegistros);
    }
}


function MostrarOcultarOpcionesBusqueda()
{
  if($('#DivOpcionesBusqueda').is(':visible'))
  {
    $('#DivOpcionesBusqueda').css('visibility','hidden');
    $('#DivOpcionesBusqueda').css('display','none');
    $('#BotonMostrarOcultarOpcionesB').text("");
    $('#BotonMostrarOcultarOpcionesB').attr("title","Mostrar opciones de búsqueda");
    $('#BotonMostrarOcultarOpcionesB').append("<span class='fa fa-angle-double-down' style='color:black;'/>");
    $('#DivAcordeon').css('height','550px','important');
  }
  else
  {
    $('#DivOpcionesBusqueda').css('visibility','visible');
    $('#DivOpcionesBusqueda').css('display','');
    $('#BotonMostrarOcultarOpcionesB').text("");
    $('#BotonMostrarOcultarOpcionesB').attr("title","Ocultar opciones de búsqueda");
    $('#BotonMostrarOcultarOpcionesB').append("<span class='fa fa-angle-double-up' style='color:black;'/>");
    $('#DivAcordeon').css('height','550px','important');
  }
}



function FEscucharMensaje(idcampana, idregistro){
    var arrayId = idregistro.split('@');
    var idRegistro = arrayId[1];
    AvanzarPagina('BuscadorRegistros.aspx?idCampana=' + idcampana ,'EdicionRegistrosCampana.aspx?idCampana=' + idcampana + '&idBusqueda='+idRegistro);
}




//// Función que busca todos los checkbox que ha dentro de la tabla que se estén marcados
//// creo un registro y luego se llama a una nueva página para modificarlos
function ModificarRegistros()
{
    var selected = [];
    var registros = '';
    // Obtengo el valor de la campaña seleccionada
    idcampana = $('#idCampana').val();

    $('table#TBL11 input[type=checkbox]').each(function () {
        if ($(this).is(":checked")) {
            var id = $(this).attr('id');
            // Si ya existe en el array no lo vuelvo a poner
            if (jQuery.inArray(id, selected) === -1)
                selected.push(id);
        }
    });

    if (selected.length == 1) {
        var id = selected[0];
        // Elimino el prefijo check_ que viene por delante
        id = id.substr(6);
        //AvanzarPagina('BuscadorRegistros.aspx?idCampana=' + idcampana, 'EdicionRegistrosCampana.aspx?idCampana=' + idcampana + '&idBusqueda=' + id);
        CargaDialogo(id);
    }
    else
        if (selected.length > 1)
        {
            registros = "";
            for (var i = 0; i <= selected.length - 1; i++) {
                var id = selected[i];
                // El primer check no se debe pasar
                if (id.toUpperCase() == "CHECK_TODOS") {
                    continue;
                }
                // Elimino el prefijo check_ que viene por delante
                id = id.substr(6);
                if (registros == "")
                    registros = id;
                else
                    registros += ',' + id;
            }

            // Si los registros que se envían son menos de 200 los envío como siempre, si son más los envío por el especial para que se pasen a base de datos, sino casca
            if (selected.length <= 40) {
                AvanzarPagina('BuscadorRegistros.aspx?idCampana=' + idcampana, 'EdicionRegistrosCampanaVarios.aspx?idCampana=' + idcampana + '&idRegistros=' + registros);
            }
            else {
                // Llamamos a la página de edición de los registros
                AvanzarPaginaAjaxEspecial('BuscadorRegistros.aspx?idCampana=' + idcampana, 'EdicionRegistrosCampanaVarios.aspx?idCampana=' + idcampana + '&idRegistros=' + registros, "EDICIONMULTIPLESREGISTROS");
            }
        }
    else
    {
        alert("Debe seleccionar al menos un registro");
        return;
    }

}



function AvanzarPaginaAjaxEspecial(URLCaminoParam, URLNextParam, Identificador) {
    var URLCaminoEncode = encodeURIComponent(URLCaminoParam);
    var URLNextEncode = encodeURIComponent(URLNextParam);
    var buscar = '';

    if ($('#buscar').length) {
        buscar = $('#buscar').text();
    }

    var params =  "identificador=" + Identificador + "&idSolicitud=AVANZAR_PAGINA&URLCamino=" + URLCaminoEncode + "&URLNext=" + URLNextEncode + "&buscar=" + buscar;
    $.ajax({
        type: 'POST',
        url: getPathNavegacion(),
        data: params,
        success: function (dato) {
            var respuesta = window.JSON.parse(dato);
            var correcto = respuesta.Resultado;
            if (correcto === '1') {
                var URL = respuesta.Mensaje;
                if (URL === '' || URL.toUpperCase() === 'PRINCIPAL.ASPX') {
                    parent.location.href = 'Principal.aspx';
                }
                else {
                    window.location = URL;
                }
            }
        }
    });
}

function CargaDialogo(id) {
    // Primero vacío el ifframe
    var iframe = document.getElementById("IdIframe");
    var html = "";

    iframe.contentWindow.document.open();
    iframe.contentWindow.async = true;
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();

    $('#spinner').css('display', 'block');

    idcampana = $('#idCampana').val();
    url = "EdicionRegistrosCampana2Col.aspx?idCampana=" + idcampana + "&idBusqueda=" + id;
  //  url = getRutaAbsoluta() + "/BuscadorRegistros/EdicionDatosRegistro?idCampana=" + idcampana + "&idRegistro=" + id;

    title = "Edición del registro  " + id;
    $('#myModalTitle').text(title);

    const $iframe = $('#IdIframe');
    if ($iframe.length) {
        $iframe.attr('src', url);
    }
    
    $('#modalEdicionRegistro').modal('show');
}

function CheckTodos()
{
    // Si el check está marcado, marcamos todos los check
    if ($('#Check_Todos').is(':checked'))
    {
        $('table#TBL11 input[type=checkbox]').each(function () {
            if (!$(this).is(":checked")) {
                $(this).prop('checked', true);
            }
        });
    }
    else
    {
        // Desmarcamos todos los registros que estén marcados
        $('table#TBL11 input[type=checkbox]').each(function () {
            if ($(this).is(":checked")) {
                $(this).prop('checked', false);
            }
        });
    }
}



////////////////////////////////////////////////////////////////////////////////
///////
///////           BUSCADOR REGISTROS HISTORICO
///////
////////////////////////////////////////////////////////////////////////////////
function BuscadorDatosHistorico() {
    // Solo si hay una campaña seleccionada
    var idcampana = $('#ComboCampana').val();
    if (idcampana === null || idcampana === 'undefined' || idcampana === -1 || idcampana === '')
        alert("Debe seleccionar una campaña");
    else {
        BuscarHistorico(0);
    }
}


///////////////////////////////////////
//// BuscarHistorico
//// Busca los datos en las tablas de rtegistro y registro detalle
///////////////////////////////////////
function BuscarHistorico(posicion) {

    if (posicion === 0) {
        $('#NumPaginaActual').val('0');
    }
    else if (posicion === 1) {
        let numPaginaAct = $('#NumPaginaActual').val();
        let numPaginaAnt = parseInt(numPaginaAct);
        numPaginaAnt = numPaginaAnt - 1;
        if (numPaginaAnt < 0)
            $('#NumPaginaActual').val('0');
        $('#NumPaginaActual').val(numPaginaAnt);
    }
    else if (posicion === 2) {
        let numPaginaAct = $('#NumPaginaActual').val();
        let numPaginaSig = parseInt(numPaginaAct);
        numPaginaSig = numPaginaSig + 1;
        $('#NumPaginaActual').val(numPaginaSig);
    }

    let numPaginaAMostrar = $('#NumPaginaActual').val();
    let numRegistrosPagina = $('#NumRegistrosPorPagina').val();

    /// Identificador de cliente
    let valorIdRegistro = $('#IdRegistro').val();
    /// Estado de los registros
    let valorComboEstado = $('#ComboEstado').val();

    /// fecha desde
    let fechaDesde = $('#FechaDesde').val();
    /// fecha hasta
    let fechaHasta = $('#FechaHasta').val();
    /// Prefijo Tabla de campaña de telemarketer para saber en que tabla hay que buscar
    let valorPrefijoTabla = $('#PrefijoTablaTmkt').val();
    /// Resultados de negocio seleccionados
    let resultadosNegocio = $('#ComboResultados').val();
    let valorResultados = '';
    if (resultadosNegocio != null && resultadosNegocio.length >= 0) {
        for (i = 0; i < resultadosNegocio.length; i++) {
            if (i == 0)
                valorResultados = resultadosNegocio[i];
            else
                valorResultados += ',' + resultadosNegocio[i];
        }
    }

    // Identificador de la lista seleccionada
    let valorListaSeleccionada = $('#ListasCampanas').val();
    /// Número de teléfono introducido para buscar
    let valorNumeroTelefono = encodeURIComponent($('#NumeroTelefono').val());

    let param = { 'nombreTabla' : valorPrefijoTabla, 'listaSeleccionada' : valorListaSeleccionada, 'numeroTelefono' : valorNumeroTelefono,
                  'fechaDesde' : fechaDesde, 'idRegistro' : valorIdRegistro, 'idEstado' : valorComboEstado, 'idsResultados' : valorResultados, 'fechaHasta' : fechaHasta,
                  'numPagina': numPaginaAMostrar, 'numRegistrosPagina': numRegistrosPagina  };

    window.parent.MostrarModalEspera();

    // Activo spinner
    $("#spinBusqueda").css('display', 'block');

    $.ajax({
        type: "POST",
        url: getAbsolutePath() + "/BuscadorRegistros.aspx/GetRegistrosHistorico",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        async: false,
        cache: false,
        success: function (data) {
            // Paro spin de búsqueda
            $("#spinBusqueda").css('display', 'none');
            let estruct = JSON.parse(data.d);
            RegistrosHistoricoATabla(estruct);
            window.parent.OcultarModalEspera();
        }, error: function (e) {
            console.log(e); // Paro spin de búsqueda
            $("#spinBusqueda").css('display', 'none');
            window.parent.OcultarModalEspera();
        }
    });
}


///
/// Se crea la tabla con los registros obtenidos de la búsqueda
function RegistrosHistoricoATabla(estruct) {

    let listaInfoDatos = estruct.ListaRegistros;
    let numRegistrosTotal = estruct.TotalRegistros;

    let cabecera = '';
    cabecera += "<th data-type='date' data-format-string='" + WebConfigParams.FormatDateTime+"' > Fecha hora</th>";
    cabecera += "<th > Id cliente</th>";
    cabecera += "<th > Teléfono</th>";
    cabecera += "<th > Operador</th>";
    cabecera += "<th > Lista</th>";
    cabecera += "<th > Rs. Llamada</th>";
    cabecera += "<th > Rs. Estado</th>";
    cabecera += "<th > Rs. Negocio</th>";
    cabecera += "<th > Duración</th>";


    let HTMLTabla = "<table id='TBL11'  class='footable table-striped table-condensed tableHeaderFixed toggle-arrow-tiny' data-sorting='true' data-show-toggle='true' data-expand-first='true' >  ";
    HTMLTabla += "<thead>";
    HTMLTabla += "<tr id='CabeceraTBL11'>";
    HTMLTabla += cabecera;
    HTMLTabla += "</tr>";
    HTMLTabla += "</thead>";
    HTMLTabla += "<tbody id='CuerpoTBL11'>";
    for (let i = 0; i < listaInfoDatos.length; i++) {
        const reg = listaInfoDatos[i];        
        const Key = reg.IdRegistro.trim();
        const idcliente = reg.Idcliente;
        const fechaInicio = reg.FechaHoraServido;
        const numeroTelefono = reg.NumeroTelefono;
        const operador = reg.Operador;
        const Lista = reg.Lista;
        const resultadoLlamada = reg.ResultadoLlamada;
        const estadoRegistro = reg.EstadoRegistro;
        const resultadoNegocio = reg.ResultadoNegocio;
        const duracion = reg.DuracionLlamada;

        let HTMLFila = "<tr>";
        HTMLFila += "<td >" + fechaInicio + "</td>";
        HTMLFila += "<td >" + idcliente + "</td>";
        HTMLFila += "<td >" + numeroTelefono + "</td>";
        HTMLFila += "<td >" + operador + "</td>";
        HTMLFila += "<td >" + Lista + "</td>";
        HTMLFila += "<td >" + resultadoLlamada + "</td>";
        HTMLFila += "<td >" + estadoRegistro + "</td>";
        HTMLFila += "<td >" + resultadoNegocio + "</td>";

        HTMLFila += "<td >" + duracion + "</td>";
        HTMLTabla += HTMLFila;
    }
    HTMLTabla += "</tbody>";
    HTMLTabla += "</table>";

    window.parent.OcultarModalEspera();
    // ñado los datos de la tabla
    $('#DivAcordeon').html(HTMLTabla);
    // Activo los botones de buscar siguiente y anterior
    $('#BotonBuscarAnterior').css('visibility', 'visible');
    $('#BotonBuscarAnterior').prop('disabled', false);
    $('#LabelNumRegistrosMostrados').css('visibility', 'visible');
    //$('#BotonExportarAEcel').css('display', 'none');
    $('#BotonExportarAEcel').css('display', 'inline-block');
    $('#BtnAcciones').css('display', 'none');
    $('#BotonBuscarSiguiente').css('visibility', 'visible');
    $('#BotonBuscarSiguiente').prop('disabled', false);
    // Pongo el número de registros
    let numRegistrosPorPagina = NumRegistrosPorPagina();
    let numPaginaActual = parseInt($('#NumPaginaActual').val());
    let numRegistrosTotalInt = parseInt(numRegistrosTotal);
    let idPrimerRegistro = numRegistrosPorPagina * numPaginaActual;
    let idUltimoRegistro = idPrimerRegistro + numRegistrosPorPagina - 1;
    let idMostrarPrimerRegistro = idPrimerRegistro + 1;
    let idMostrarUltimoRegistro = idPrimerRegistro + numRegistrosPorPagina;
    if (idMostrarUltimoRegistro > numRegistrosTotalInt)
        idMostrarUltimoRegistro = numRegistrosTotalInt;
    $('#LabelNumRegistrosMostrados').text(idMostrarPrimerRegistro + '-' + idMostrarUltimoRegistro + ' de ' + numRegistrosTotalInt);
    $('#LabelNumRegistrosMostrados').css('color', 'black');
    if (numPaginaActual === 0)
        $('#BotonBuscarAnterior').prop('disabled', true);
    if (idMostrarUltimoRegistro == numRegistrosTotal)
        $('#BotonBuscarSiguiente').prop('disabled', true);
    
    $('.footable').footable({ 'empty': '' + i18next.t("Comun.sinRegistros") + '' });
    $('tr').hover(
        function () {
            $(this).find('.FilaOpciones').css('visibility', 'visible');
        },
        function () {
            $(this).find('.FilaOpciones').css('visibility', 'hidden');
        }
    );
    $('td').hover(function () {
        $(this).find('.FilaOpciones').css('visibility', 'visible');
    },
        function () {
            $(this).find('.FilaOpciones').css('visibility', 'hidden');
        });
    $('.DivNoExistente').hover(function () {
        $(this).find('.FilaOpciones').css('visibility', 'visible');
    },
        function () {
            $(this).find('.FilaOpciones').css('visibility', 'hidden');
        });

    $('a').hover(function () {
        $(this).find('.FilaOpciones').css('visibility', 'visible');
    },
        function () {
            $(this).find('.FilaOpciones').css('visibility', 'hidden');
        }
    );
    return;
}


function HistoricoRegistros() {
    $('#EsHistorico').val('true'); 
    $('#Div_MostrarTfno').css('display','none'); 
    $('#IdFechaDesde').css('display', 'block'); 
    $('#Div_Nombre').css('display', 'none'); 
    $('#IdFechaHasta').css('display', 'block'); 
    $('#DivAcordeon').html(''); 
    $('#BtnHistorico').css('background-color','#0275d8'); 
    $('#BtnHistorico').css('color','#ffffff'); 
    $('#BtnRegistros').css('background-color','#f5f5f5'); 
    $('#BtnRegistros').css('color','#000000'); 
    // Vaciamos el combo de estados
    $('#ComboEstado').empty();    
    // Ponemos las opciones de histórico de campañas
    $("#ComboEstado").append('<option value="NULL" >Todos</option> '); 
    $("#ComboEstado").append('<option value=\"D\" >Devuelto </option> '); 
    $("#ComboEstado").append('<option value=\"Z\" >Rechazado</option> '); 
    $("#ComboEstado").append('<option value=\"R\" >Reprogramado</option> '); 
    $("#ComboEstado").append('<option value=\"F\" >Finalizado</option> '); 
    // refrescamos selectpicker
    $('#ComboEstado').selectpicker('refresh'); 
} 


function RegistrosCampanas() {
    $('#EsHistorico').val('false'); 
    $('#Div_MostrarTfno').css('display', 'block'); 
    $('#IdFechaDesde').css('display', 'none'); 
    $('#Div_Nombre').css('display', 'block'); 
    $('#IdFechaHasta').css('display', 'none'); 
    $('#DivAcordeon').html(''); 
    $('#BtnRegistros').css('background-color', '#0275d8'); 
    $('#BtnRegistros').css('color', '#ffffff'); 
    $('#BtnHistorico').css('background-color', '#f5f5f5'); 
    $('#BtnHistorico').css('color', '#000000'); 
    // Vaciamos el combo de estados
    $('#ComboEstado').empty();    
    // Ponemos las opciones de registro de campañas
    $("#ComboEstado").append('<option value="NULL"  >Todos</option>');
    $("#ComboEstado").append('<option value="A" > Anulado</option>');
    $("#ComboEstado").append('<option value="C" > Cancelado</option>');
    $("#ComboEstado").append('<option value="N" > No tocado</option>');
    $("#ComboEstado").append('<option value="R" > Reprogramado</option>');
    $("#ComboEstado").append('<option value="X" > Reprogramado y no tocado</option>');
    $("#ComboEstado").append('<option value="Y" > Reprogramados por operador</option>');
    $("#ComboEstado").append('<option value="Z" > Reprogramados por marcador</option>');
    $("#ComboEstado").append('<option value="S" > Para supervisión</option>');
    $("#ComboEstado").append('<option value="F" > Finalizado</option>');
    // refrescamos selectpicker
    $('#ComboEstado').selectpicker('refresh'); 
} 