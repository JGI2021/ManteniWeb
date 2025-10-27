
function MostrarOcultarOpcionesBusqueda() {
    if ($('#DivOpcionesBusqueda').is(':visible')) {
        $('#DivOpcionesBusqueda').css('visibility', 'hidden');
        $('#DivOpcionesBusqueda').css('display', 'none');
        $('#BotonMostrarOcultarOpcionesB').text("");
        $('#BotonMostrarOcultarOpcionesB').attr("title", "Mostrar opciones de búsqueda");
        $('#BotonMostrarOcultarOpcionesB').append("<span class='fa fa-angle-double-down' style='color:black;'/>");
        $('#DivAcordeon').css('height', '650px', 'important');
    }
  else
  {
    $('#DivOpcionesBusqueda').css('visibility','visible');
    $('#DivOpcionesBusqueda').css('display','');
    $('#BotonMostrarOcultarOpcionesB').text("");
    $('#BotonMostrarOcultarOpcionesB').attr("title","Ocultar opciones de búsqueda");
    $('#BotonMostrarOcultarOpcionesB').append("<span class='fa fa-angle-double-up' style='color:black;'/>");
    $('#DivAcordeon').css('height','470px','important');
  }
}


function Refrescar(posicion) {
    if (posicion == 0) {
        $('#NumPaginaActual').val('0');
    }
    else if (posicion == 1) {
        let numPaginaAct = $('#NumPaginaActual').val();
        let numPaginaAnt = parseInt(numPaginaAct);
        numPaginaAnt = numPaginaAnt - 1;
        if (numPaginaAnt < 0)
            $('#NumPaginaActual').val('0');
        $('#NumPaginaActual').val(numPaginaAnt);
    }
    else if (posicion == 2) {
        let numPaginaAct = $('#NumPaginaActual').val();
        let numPaginaSig = parseInt(numPaginaAct);
        numPaginaSig = numPaginaSig + 1;
        $('#NumPaginaActual').val(numPaginaSig);
    }

    let numPaginaAMostrar = $('#NumPaginaActual').val();
    let numRegistrosPagina = $('#NumRegistrosPorPagina').val();

    let idGrupoCombo = $('#ComboGrupos').val();
    let idOperadorCombo = $('#ComboOperadores').val();
    let idMuestraFin = $('#ComboRegFinalizados').val();
    let CheckMuestraDescartados = $('#CheckDescartados').val();
    let fechaInicioGestion1 = $('#F_INICIO_GESTION_1').val();
    let fechaInicioGestion2 = $('#F_INICIO_GESTION_2').val();
    let canal = $('#ComboCanal').val();

    let telOrigen = $('#Origen').val();

    let telDestino = $('#Destino').val();
    let param = 'idSolicitud=BUSCADOR_GESTIONES_OFFLINE&idOperador=' + idOperadorCombo + '&idGrupo=' + idGrupoCombo + '&idMostrarFinalizados=' + idMuestraFin +
                '&MostrarDescartados=' + CheckMuestraDescartados + '&numPagina=' + numPaginaAMostrar + '&numRegistrosPagina=' + numRegistrosPagina;
    param +=    '&fInicioGestion1=' + fechaInicioGestion1 + '&fInicioGestion2=' + fechaInicioGestion2;
    param +=    '&TOrigen=' + telOrigen + '&TDestino=' + telDestino + '&canal=' + canal;

    $.ajax({
        type: 'POST',
        url: getPathSolicitudesBBDD(),
        data: param,
        success: function (dato) {
            let respuesta = JSON.parse(dato);
            let correcto = respuesta.Resultado;
            let mensaje = respuesta.Mensaje;

            if (correcto == '1') {

                $('#RowAcciones').css('visibility', 'hidden');
                var JSONRespuesta = JSON.parse(mensaje);

                $('#CuerpoTablaBuscador').find('td').remove();
                var htmlCabecera = "<th class='visible-xs visible-sm visible-md' data-sortable='false'></th>";
                htmlCabecera += "<th id='thSeleccionar'  data-sortable='false'> <input id='checkbox_SeleccionarTodo' type='checkbox' value='' onchange='ComprobarCheckSeleccionarTodo()' style='margin-left:5px;'> </th>";
                htmlCabecera += "<th id='thGrupo' data-hide='phone'> Grupo</th>";
                htmlCabecera += "<th id='thOpAsignado' data-hide='phone'> Operador asignado</th>";
                htmlCabecera += "<th id='thEstado' data-hide='phone,tablet'> Estado</th>";
                htmlCabecera += "<th id='thOrigen' data-hide='phone,tablet'> Origen</th>";
                htmlCabecera += "<th id='thDestino' data-hide='phone,tablet'> Destino</th>";
                htmlCabecera += "<th id='thFInicial'> Fecha inicial</th>";
                htmlCabecera += "<th id='thFFinal'> Fecha final</th>";
                htmlCabecera += "<th id='thOpciones' data-sortable='false'>Opciones</th>";

                var listaInfoDatos = JSONRespuesta.InfoListaDatos;
                var numRegistrosTotal = JSONRespuesta.InfoAdicional;
                var HTMLInputsOcultos = "";

                var htmlTabla = "<table id='tablaBuscador' class='footable' data-sorting='true'>";
                htmlTabla += "<thead>";
                htmlTabla += "<tr id='CabeceraTablaBuscador'>";
                htmlTabla += htmlCabecera;
                htmlTabla += "</tr>";
                htmlTabla += "</thead>";
                htmlTabla += "<tbody id='CuerpoTablaBuscador'>";

                for (var i = 0; i < listaInfoDatos.length; i++) {
                    let JSONInfoListaDatos = listaInfoDatos[i];
                    let InfoListaDatos = JSON.parse(JSONInfoListaDatos);
                    let Key = InfoListaDatos.Key;
                    let idGrupo = InfoListaDatos.IdGrupo;
                    let nombreGrupo = utf8_decode(InfoListaDatos.Grupo);
                    let nombreOperador = utf8_decode(InfoListaDatos.Operador);
                    let idOperador = InfoListaDatos.IdOperador;
                    let idEstado = InfoListaDatos.IdEstado;
                    let nombreEstado = utf8_decode(InfoListaDatos.NombreEstado);
                    let Origen = InfoListaDatos.Origen;
                    let Destino = InfoListaDatos.Destino;
                    let FInicial = InfoListaDatos.FInicial;
                    let FFinal = InfoListaDatos.FFinal;
                    let FInicialValue = InfoListaDatos.FInicialValue;
                    let FFinalValue = InfoListaDatos.FFinalValue;
                    let Filename = InfoListaDatos.Filename;
                    let canal = InfoListaDatos.Canal;
                    let tituloGrupo = "Cambiar grupo";
                    let tituloOperador = "Cambiar operador asignado";
                    if (idGrupo == '0') {
                        tituloGrupo = "Asignar grupo";
                    }
                    if (idOperador == '0') {
                        tituloOperador = "Asignar operador";
                    }
                    var styleCambiarGrupo = '';
                    var styleDescartar = '';
                    var styleDescartarOFinalizar = '';
                    var styleFinalizar = '';
                    var styleReactivar = '';
                    var styleOperador = '';
                    if (idEstado != 5 && idEstado != 6 && idEstado != 4) {
                        styleReactivar = 'visibility:hidden;display:none;';
                    }
                    if (idEstado == 5 || idEstado == 6 || idEstado == 4) {
                        styleCambiarGrupo = 'visibility:hidden;display:none;';
                        styleOperador = 'visibility:hidden;display:none;';
                    }
                    if (idEstado == 5 || idEstado == 6 || idEstado == 4) 
                    {
                        styleDescartar = 'visibility:hidden;display:none;';
                        styleFinalizar = 'visibility:hidden;display:none;';
                    }

                    var htmlFila = "<tr id='" + Key + "'>";
                    htmlFila += "<td class='visible-xs visible-sm visible-md'></td>";
                    htmlFila += "<td id='Seleccionar_" + Key + "' style='text-align:center;vertical-align:middle;'>";
                    htmlFila += "<input id='checkbox_" + Key + "' class='cbSeleccionar' type='checkbox' value='' onChange='ComprobarChecks()'>";
                    htmlFila += "</td>";
                    htmlFila += "<td id='Grupo_" + Key + "'>" + nombreGrupo + "</td>";
                    htmlFila += "<td id='Operador_" + Key + "'>" + nombreOperador + "</td>";
                    htmlFila += "<td id='Estado_" + Key + "'>" + nombreEstado + "</td>";
                    htmlFila += "<td id='Origen_" + Key + "'>" + Origen + "</td>";
                    htmlFila += "<td id='Destino_" + Key + "'>" + Destino + "</td>";
                    htmlFila += "<td id='FInicial_" + Key + "' data-value='" + FInicialValue + "'>" + FInicial + "</td>";
                    htmlFila += "<td id='FFinal_" + Key + "' data-value='" + FFinalValue + "'>" + FFinal + "</td>";
                    htmlFila += "<td id='Opciones_" + Key + "'>";
                    htmlFila += "<div  class='FilaOpciones' style='visibility:hidden;'>";
                    if (canal === "1") {
                        htmlFila += "<a href='#' role='button' data-toggle='tooltip' data-placement='bottom' class='BotonFila CEscucharMensaje' id='BEscucharMensaje_" + Key + "' title='Escuchar mensaje' onClick='FEscucharMensaje(this.id)' style='padding-left:10px;'><span class='fa fa-play-circle ratonEncima' aria-hidden='true'></span></a>";
                    }
                    else if (canal === "3") {
                        let rutafichero = $('#urlBuscaFicheroChat').val();
                        rutafichero += Filename;
                        htmlFila += "<a href='#' role='button' data-toggle='tooltip' data-placement='bottom' class='BotonFila CEscucharMensaje' id='ReproduceChat" + Key + "' title='Escuchar mensaje' onClick='ReproduceChat(\"" + rutafichero + "\")' style='padding-left:10px;'><span class='fa fa-play-circle ratonEncima' aria-hidden='true'></span></a>";
                    }

                    htmlFila += "<a href='#' role='button' data-toggle='tooltip' data-placement='bottom' class='BotonFila CCambiarGrupo' id='BCambiarGrupo_" + Key + "' title='" + tituloGrupo + "' onClick='FCambiarGrupo(this.id)' style='padding-left:10px;" + styleCambiarGrupo + "'><span class='fa fa-users ratonEncima' aria-hidden='true'></span></a>";
                    htmlFila += "<a href='#' role='button' data-toggle='tooltip' data-placement='bottom' class='BotonFila CReactivar' id='BReactivar_" + Key + "' title='Reactivar registro' onClick='FReactivar(this.id)' style='padding-left:10px;" + styleReactivar + "'><span class='fa fa-history ratonEncima' aria-hidden='true'></span></a>";
                    htmlFila += "<a href='#' role='button' data-toggle='tooltip' data-placement='bottom' class='BotonFila CCambiarOperador' id='BCambiarOperador_" + Key + "' title='" + tituloOperador + "'  onClick=FCambiarOperador(this.id)      style='padding-left:10px;" + styleOperador + "'><span class='fa fa-user ratonEncima' aria-hidden='true'></span></a>";
                    htmlFila += "<a href='#' role='button' data-toggle='tooltip' data-placement='bottom' class='BotonFila CDescartar'       id='BDescartar_" + Key + "'       title='Descartar registro'    onClick='FDescartarRegistro(this.id)'  style='padding-left:10px;" + styleDescartar + "'><span class='fa fa-circle ratonEncima' aria-hidden='true'></span></a>";
                    htmlFila += "<a href='#' role='button' data-toggle='tooltip' data-placement='bottom' class='BotonFila CDescartarOFinalizarRegistro' id='BDescartarOFinalizar_" + Key + "' title='Finalizar registro' onClick='FFinalizarRegistro(this.id)'  style='padding-left:10px;" + styleFinalizar + "'><span class='fa fa-check-square ratonEncima' aria-hidden='true'></span></a>";

                    htmlFila += "</div>";
                    htmlFila += "</td>";
                    htmlFila += "</tr>";
                    HTMLInputsOcultos += "<input type='hidden' id='IdOperador_" + Key + "' value='" + idOperador + "'>";
                    HTMLInputsOcultos += "<input type='hidden' id='IdGrupo_" + Key + "' value='" + idGrupo + "'>";
                    HTMLInputsOcultos += "<input type='hidden' id='NombreMensaje_" + Key + "' value='" + Filename + "'>";
                    htmlTabla += htmlFila;
                }
            }

            htmlTabla += "</tbody>";
            htmlTabla += "</table>";
            $('#DivAcordeon').html(htmlTabla + HTMLInputsOcultos);

            $('#BotonBuscarAnterior').css('visibility', 'visible');
            $('#BotonBuscarAnterior').prop('disabled', false);
            $('#LabelNumRegistrosMostrados').css('visibility', 'visible');
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

            if (numPaginaActual == 0) {
                $('#BotonBuscarAnterior').prop('disabled', true);
            }

            if (idMostrarUltimoRegistro == numRegistrosTotal) {
                $('#BotonBuscarSiguiente').prop('disabled', true);
            }

            $('#CeldaAcordeon_iframeGlobal').append(HTMLInputsOcultos);
            $('.footable').footable({ 'empty': 'Sin registros', 'paging': { 'enabled': true } });

            $('tr').hover(function () {
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

    });


}
 



function CreacionFuncionBuscar() {
  $('#BotonBuscar').click(function () {
    Refrescar(0);
  });
}

function CreacionFuncionBuscarAnterior() {
  $('#BotonBuscarAnterior').click(function () {
    Refrescar(1);
  });
}

function CreacionFuncionBuscarSiguiente() {
  $('#BotonBuscarSiguiente').click(function () {
    Refrescar(2);
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




function CambioCheckDescartados() {
    if($('#CheckDescartados').is(':checked'))
    { 
       $('#CheckDescartados').val('on'); 
    } 
    else
    { 
       $('#CheckDescartados').val('off'); 
    } 
} 


function ComprobarCheckDescartados() {
    var valorRegFinaliz = $('#ComboRegFinalizados').val();
    if (valorRegFinaliz == 'TODOS' || valorRegFinaliz == 'SINFIN') {
        $('#LCheckDescartados').css('visibility', 'visible');
        $('#LCheckDescartados').css('display', '');
    }
    else {
        $('#LCheckDescartados').css('visibility', 'hidden');
        $('#LCheckDescartados').css('display', 'none');
    }
}



function ComprobarChecks() {
    if ($('.cbSeleccionar:checked').length > 0) {
        $('#RowAcciones').css('visibility', 'visible');
        let ArrayElementos = [];
        let listaSeleccionados = new Array();
        let cbs = $('.cbSeleccionar:checked');
        for (var i = 0; i < cbs.length; i++) {
            let cb = cbs[i];
            let idCb = cb.id;
            let SplitIdCb = idCb.split('_');
            let IdVoiceMail = SplitIdCb[1];
            ArrayElementos.push(IdVoiceMail);
        }
        var JSONlistaElementos = { "InfoListaDatos": ArrayElementos };
        var listaElementos = JSON.stringify(JSONlistaElementos);

        let params = 'idSolicitud=MOSTRAR_OCULTAR_OPCIONES_GESTIONESOFFLINE&JSONIds=' + listaElementos
        $.ajax({
            type: 'POST',
            url: getPathSolicitudesBBDD(),
            data: params,
            success: function (dato) {
                let respuesta = JSON.parse(dato);
                let correcto = respuesta.Resultado;
                let mensaje = respuesta.Mensaje;
                let mensajeDecodificado = '';
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
                if (correcto == '1') {
                    var JSONInfoOpciones = JSON.parse(mensaje);
                    var habilitaEscuchaMensaje = JSONInfoOpciones.BhabilitarEscucharVerMensaje;
                    var habilitaCambioOperador = JSONInfoOpciones.BhabilitarCambiarOperador;
                    var habilitaCambioGrupo = JSONInfoOpciones.BhabilitarCambiarGrupo;
                    var habilitaDescartarRegistros = JSONInfoOpciones.BhabilitarDescartarRegistros;
                    var habilitaFinalizarRegistros = JSONInfoOpciones.BhabilitarFinalizarRegistros;
                    var habilitaReactivarRegistros = JSONInfoOpciones.BhabilitarReactivarRegistros;
                    if (habilitaCambioOperador) {
                        $('#BCambiarOperador_General').css('color', '#337ab7');
                        $('#BCambiarOperador_General').css('cursor', 'pointer');
                    }
                    else {
                        $('#BCambiarOperador_General').css('color', 'rgb(128, 128, 128)');
                        $('#BCambiarOperador_General').css('cursor', 'default');
                    }
                    if (habilitaCambioGrupo) {
                        $('#BCambiarGrupo_General').css('color', '#337ab7');
                        $('#BCambiarGrupo_General').css('cursor', 'pointer');
                    }
                    else {
                        $('#BCambiarGrupo_General').css('color', 'rgb(128, 128, 128)');
                        $('#BCambiarGrupo_General').css('cursor', 'default');
                    }
                    if (habilitaDescartarRegistros) {
                        $('#BDescartar_General').css('color', '#337ab7');
                        $('#BDescartar_Genedral').css('cursor', 'pointer');
                    }
                    else {
                        $('#BDescartar_General').css('color', 'rgb(128, 128, 128)');
                        $('#BDescartar_General').css('cursor', 'default');
                    }
                    if (habilitaFinalizarRegistros) {
                        $('#BFinalizar_General').css('color', '#337ab7');
                        $('#BFinalizar_General').css('cursor', 'pointer');
                    }
                    else {
                        $('#BFinalizar_General').css('color', 'rgb(128, 128, 128)');
                        $('#BFinalizar_General').css('cursor', 'default');
                    }
                    if (habilitaReactivarRegistros) {
                        $('#BReactivar_General').css('color', '#337ab7');
                        $('#BReactivar_General').css('cursor', 'pointer');
                    }
                    else {
                        $('#BReactivar_General').css('color', 'rgb(128, 128, 128)');
                        $('#BReactivar_General').css('cursor', 'default');
                    }


                }
                else {
                    $('#Cuerpo_ModalRespuesta').html(mensajeDecodificadoCaracteresEspeciales);
                    $('#ModalRespuesta').modal('show');
                }
            }
        });
    }
    else {
        
        $('#RowAcciones').css('visibility', 'hidden');
    }
}


function ComprobarCheckSeleccionarTodo() {
  if($('#checkbox_SeleccionarTodo').prop('checked') == false)
  {
    $('.cbSeleccionar').prop('checked', false);
    $('#RowAcciones').css('visibility','hidden');
  }
  else
  {
    $('.cbSeleccionar').prop('checked', true);
    $('#RowAcciones').css('visibility','visible');
    if($('.cbSeleccionar:checked').length > 0)
    {
      $('#RowAcciones').css('visibility','visible');
      var ArrayElementos = [];
      var listaSeleccionados = new Array();
      var cbs = $('.cbSeleccionar:checked');
      for (var i = 0; i < cbs.length; i++)
      {
        var cb = cbs[i];
        var idCb = cb.id;
        var SplitIdCb = idCb.split('_');
        var IdVoiceMail = SplitIdCb[1];
        ArrayElementos.push(IdVoiceMail);
      }
      var JSONlistaElementos = {"InfoListaDatos": ArrayElementos}; 
        var listaElementos = JSON.stringify(JSONlistaElementos);

        let params = 'idSolicitud=MOSTRAR_OCULTAR_OPCIONES_GESTIONESOFFLINE&JSONIds=' + listaElementos;
        $.ajax({
            type: 'POST',
            url: getPathSolicitudesBBDD(),
            data: params,
            success: function (dato) {
                let respuesta = JSON.parse(dato);
                let correcto = respuesta.Resultado;
                let mensaje = respuesta.Mensaje;
                let mensajeDecodificado = '';
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
                if (correcto == '1') {
                    var JSONInfoOpciones = JSON.parse(mensaje);
                    var habilitaEscuchaMensaje = JSONInfoOpciones.BhabilitarEscucharVerMensaje;
                    var habilitaCambioOperador = JSONInfoOpciones.BhabilitarCambiarOperador;
                    var habilitaCambioGrupo = JSONInfoOpciones.BhabilitarCambiarGrupo;
                    var habilitaDescartarRegistros = JSONInfoOpciones.BhabilitarDescartarRegistros;
                    var habilitaFinalizarRegistros = JSONInfoOpciones.BhabilitarFinalizarRegistros;
                    var habilitaReactivarRegistros = JSONInfoOpciones.BhabilitarReactivarRegistros;
                    if (habilitaCambioOperador) {
                        $('#BCambiarOperador_General').css('color', '#337ab7');
                        $('#BCambiarOperador_General').css('cursor', 'pointer');
                    }
                    else {
                        $('#BCambiarOperador_General').css('color', 'rgb(128, 128, 128)');
                        $('#BCambiarOperador_General').css('cursor', 'default');
                    }
                    if (habilitaCambioGrupo) {
                        $('#BCambiarGrupo_General').css('color', '#337ab7');
                        $('#BCambiarGrupo_General').css('cursor', 'pointer');
                    }
                    else {
                        $('#BCambiarGrupo_General').css('color', 'rgb(128, 128, 128)');
                        $('#BCambiarGrupo_General').css('cursor', 'default');
                    }
                    if (habilitaDescartarRegistros) {
                        $('#BDescartar_General').css('color', '#337ab7');
                        $('#BDescartar_Genedral').css('cursor', 'pointer');
                    }
                    else {
                        $('#BDescartar_General').css('color', 'rgb(128, 128, 128)');
                        $('#BDescartar_General').css('cursor', 'default');
                    }
                    if (habilitaFinalizarRegistros) {
                        $('#BFinalizar_General').css('color', '#337ab7');
                        $('#BFinalizar_General').css('cursor', 'pointer');
                    }
                    else {
                        $('#BFinalizar_General').css('color', 'rgb(128, 128, 128)');
                        $('#BFinalizar_General').css('cursor', 'default');
                    }
                    if (habilitaReactivarRegistros) {
                        $('#BReactivar_General').css('color', '#337ab7');
                        $('#BReactivar_General').css('cursor', 'pointer');
                    }
                    else {
                        $('#BReactivar_General').css('color', 'rgb(128, 128, 128)');
                        $('#BReactivar_General').css('cursor', 'default');
                    }


                }
                else {
                    $('#Cuerpo_ModalRespuesta').html(mensajeDecodificadoCaracteresEspeciales);
                    $('#ModalRespuesta').modal('show');
                }
            }
        });
    }
    else
    {
     $('#RowAcciones').css('visibility','hidden');
    }
  }
}



function TraducirFechaPantallaABBDD(fechaIn) {
    var fechaSplit = fechaIn.split(' ');
    var dia = fechaSplit[0];
    var mes = fechaSplit[1];
    var anno = fechaSplit[2];
    if (mes == 'enero') mes = '01';
    if (mes == 'febrero') mes = '02';
    if (mes == 'marzo') mes = '03';
    if (mes == 'abril') mes = '04';
    if (mes == 'mayo') mes = '05';
    if (mes == 'junio') mes = '06';
    if (mes == 'julio') mes = '07';
    if (mes == 'agosto') mes = '08';
    if (mes == 'septiembre') mes = '09';
    if (mes == 'octubre') mes = '10';
    if (mes == 'noviembre') mes = '11';
    if (mes == 'diciembre') mes = '12';
    dia = parseInt(dia);
    anno = parseInt(anno);
    var fechaBBDD = dia + '/' + mes + '/' + anno + ' 0:00:00';
    return fechaBBDD;
}



function MostrarOcultarIconos(nombreVariableFila, NombreIdEstado)
{
    if(nombreVariableFila  == 'General')
    {
       ComprobarChecks();
    }
    else
    {
      $('#BEscucharMensaje_' + nombreVariableFila).css('visibility', '');
      $('#BEscucharMensaje_' + nombreVariableFila).css('display', '');
      if( NombreIdEstado === 5 || NombreIdEstado === 6) 
      { 
        $('#BReactivar_' + nombreVariableFila).css('visibility', '');
        $('#BReactivar_' + nombreVariableFila).css('display', '');

        $('#BDescartar_' + nombreVariableFila).css('visibility', 'hidden');
        $('#BDescartar_' + nombreVariableFila).css('display', 'none');

        $('#BDescartarOFinalizar_' + nombreVariableFila).css('visibility', 'hidden');
        $('#BDescartarOFinalizar_' + nombreVariableFila).css('display', 'none');

        $('#BCambiarOperador_' + nombreVariableFila).css('visibility', 'hidden');
        $('#BCambiarOperador_' + nombreVariableFila).css('display', 'none');

        $('#BCambiarGrupo_' + nombreVariableFila).css('visibility', 'hidden');
        $('#BCambiarGrupo_' + nombreVariableFila).css('display', 'none');

      } 
      else 
      { 
        $('#BReactivar_' + nombreVariableFila).css('visibility', 'hidden');
        $('#BReactivar_' + nombreVariableFila).css('display', 'none');

        if(NombreIdEstado == 1) 
        { 
          $('#BDescartar_' + nombreVariableFila).css('visibility', '');
          $('#BDescartar_' + nombreVariableFila).css('display', '');

          $('#BDescartarOFinalizar_' + nombreVariableFila).css('visibility', 'hidden');
          $('#BDescartarOFinalizar_' + nombreVariableFila).css('display', 'none');
        } 
        else 
        {
          $('#BDescartar_' + nombreVariableFila).css('visibility', 'hidden');
          $('#BDescartar_' + nombreVariableFila).css('display', 'none');

          $('#BDescartarOFinalizar_' + nombreVariableFila).css('visibility', '');
          $('#BDescartarOFinalizar_' + nombreVariableFila).css('display', '');
        } 

        $('#BCambiarOperador_' + nombreVariableFila).css('visibility', '');
        $('#BCambiarOperador_' + nombreVariableFila).css('display', '');

        $('#BCambiarGrupo_' + nombreVariableFila).css('visibility', '');
        $('#BCambiarGrupo_' + nombreVariableFila).css('display', '');
        } 
    }    
}




function MostrarDatosFormularioCambiarOperador()
{    
    $('#LComboCambiarOperador').css('visibility','visible');
    $('#LComboCambiarOperador').css('display','block');
    $('#Error_CambioDeOperador').css('visibility','hidden');
    $('#Error_CambioDeOperador').css('display','none');
    $('#ComboCambiarOperador').css('visibility','visible');
    $('#ComboCambiarOperador').css('display','block');
    $('#BModificarOperador').css('visibility','visible');
}

       
function OcultarDatosFormularioCambiarOperador()
{
    $('#LComboCambiarOperador').css('visibility','hidden');
    $('#LComboCambiarOperador').css('display','none');
    $('#ComboCambiarOperador').css('visibility','hidden');
    $('#ComboCambiarOperador').css('display','none');
    $('#BModificarOperador').css('visibility','hidden');
    $('#Error_CambioDeOperador').css('visibility','visible');
    $('#Error_CambioDeOperador').css('display','block');    
}

        
function MostrarDatosFormularioReactivarOperador()
{
    $('#LComboCambiarOperador2').css('visibility','visible');
    $('#LComboCambiarOperador2').css('display','block');
    $('#ComboCambiarOperador2').css('visibility','visible');
    $('#ComboCambiarOperador2').css('display','block');
    $('#Error_CambioDeOperador2').css('visibility','hidden');
    $('#Error_CambioDeOperador2').css('display','none');
    $('#BReactivarRegistro').css('visibility','visible');    
}

        
function OcultarDatosFormularioReactivarOperador()
{
    $('#LComboCambiarOperador2').css('visibility','hidden');
    $('#LComboCambiarOperador2').css('display','none');
    $('#ComboCambiarOperador2').css('visibility','hidden');
    $('#ComboCambiarOperador2').css('display','none');
    $('#BReactivarRegistro').css('visibility','hidden');
    $('#Error_CambioDeOperador2').css('visibility','visible');
    $('#Error_CambioDeOperador2').css('display','block');    
}




function JSPeticionHttpRequest(parametros, respuestaIncorrecto, muestraModalCorrecto = false, muestraModalIncorrecto = false,
                               NombreModalCorrecto = "", nombreModalIncorrecto = "")
{
      $.ajax({  
         type: 'POST',  
         url: getPathSolicitudesBBDD(), 
          data: parametros, 
         success: function(dato) { 
             var respuesta = JSON.parse(dato);
             var correcto = respuesta.Resultado;
             var mensaje = respuesta.Mensaje;
             var mensajeDecodificado = '';
             var mensajeDecodificadoCaracteresEspeciales = '';
             try 
             { 
                  mensajeDecodificado = utf8_decode(mensaje); 
             } 
             catch(err) 
             { 
                  mensajeDecodificado = mensaje;
             } 
             try 
             { 
                  mensajeDecodificadoCaracteresEspeciales = reemplazarCaracteresEspeciales(mensaje); 
             } 
             catch(err)
             { 
                  mensajeDecodificadoCaracteresEspeciales = mensaje; 
             } 
             if (correcto == '1') {
                 RespuestaCorrectoReactivaRegistro();
                 if (muestraModalCorrecto) {
                     $('#Cuerpo_" + NombreModalCorrecto + "').html(mensajeDecodificadoCaracteresEspeciales);
                     $('#' + NombreModalCorrecto).modal('show');

                 }
                 return;
             }
             else
             {
                 RespuestaIncorrectoReactivaRegistro();
                 if (muestraModalIncorrecto) {

                     $('#Cuerpo_" + NombreModalCorrecto + "').html(mensajeDecodificadoCaracteresEspeciales);
                     $('#' + nombreModalIncorrecto).modal('show');

                 }
             }
         }

      });  
}



function RespuestaCorrectoReactivaRegistro(mensaje) {
//    var FSeleccionada = $('#FilaSeleccionada').val();
    var JSONInfoRegistros = JSON.parse(mensaje);
    var InfoRegistros = JSONInfoRegistros.InfoListaDatos;
    for(var i= 0;i<InfoRegistros.length;i++)
    {
      var InfoRegistro = InfoRegistros[i];
      var JSONInfoRegistro = JSON.parse(InfoRegistro);
      var Key = JSONInfoRegistro.Key;
      //var idGrupo = JSONInfoRegistro.IdGrupo;
      //var nombreGrupo = reemplazarCaracteresEspeciales(JSONInfoRegistro.Grupo);
      var nombreOperador = reemplazarCaracteresEspeciales(JSONInfoRegistro.Operador);
      var idOperador = JSONInfoRegistro.IdOperador;
      var idEstado = JSONInfoRegistro.IdEstado;
      var nombreEstado = reemplazarCaracteresEspeciales(JSONInfoRegistro.NombreEstado);
      //var Origen = JSONInfoRegistro.Origen;
      //var Destino = JSONInfoRegistro.Destino;
      //var FInicial = JSONInfoRegistro.FInicial;
      var FFinal = JSONInfoRegistro.FFinal;
//      var FInicialValue = JSONInfoRegistro.FInicialValue;
      var FFinalValue = JSONInfoRegistro.FFinalValue;
//      var Filename = JSONInfoRegistro.Filename;
       $('#Operador_'+Key).text(nombreOperador);
       $('#IdOperador_'+Key).val(idOperador);
       $('#Estado_'+Key).text(nombreEstado);
       $('#FFinal_'+Key).text(FFinal);
       $('#FFinalValue_'+Key).data('value',FFinalValue);
       MostrarOcultarIconos(Key,idEstado); 
    }
    ComprobarChecks();
     $('#Error_CambioDeOperador2').removeClass('alert-danger');
     $('#Error_CambioDeOperador2').addClass('alert-success');
     OcultarDatosFormularioReactivarOperador(); 
     if(idOperador == '0')
     {
       if(InfoRegistros.length == 1)
           $('#Error_CambioDeOperador2').text('Se ha reactivado el registro seleccionado.');
       else
           $('#Error_CambioDeOperador2').text('Se han reactivado los registros seleccionado.');
     }
     else
     {
       if(InfoRegistros.length == 1)
         $('#Error_CambioDeOperador2').text('Se ha reactivado el registro seleccionado asignándolo a \"' + nombreOperador + '\"');
       else
         $('#Error_CambioDeOperador2').text('Se han reactivado los registros seleccionados asignándolos a \"' + nombreOperador + '\"');
     }
}


function RespuestaIncorrectoReactivaRegistro() {
    let respuesta = "";

    respuesta = "   $('#Error_CambioDeOperador2').html(mensajeDecodificado);\n";
    respuesta += "   $('#Error_CambioDeOperador2').removeClass('alert-success');\n ";
    respuesta += "   $('#Error_CambioDeOperador2').addClass('alert-danger');\n";
    respuesta += "   $('#Error_CambioDeOperador2').css('visibility','visible');\n";
    respuesta += "   $('#Error_CambioDeOperador2').css('display','block');\n";

    $('#Error_CambioDeOperador2').html(respuesta);
    $('#Error_CambioDeOperador2').removeClass('alert-success');
    $('#Error_CambioDeOperador2').addClass('alert-danger');
    $('#Error_CambioDeOperador2').css('visibility','visible');
    $('#Error_CambioDeOperador2').css('display','block');
}


function AceptaReactivarRegistro() {

    var ArrayElementos = [];
    var idOperadorSel = $('#ComboCambiarOperador2 option:selected').val(); 
    var listaSeleccionados = new Array();
    var FSeleccionada = $('#FilaSeleccionada').val();
    if(FSeleccionada == 'General') //if
    {
       var cbs = $('.cbSeleccionar:checked');
       for (var i = 0; i < cbs.length; i++)
       {
         var cb = cbs[i];
         var idCb = cb.id;
         var SplitIdCb = idCb.split('_');
         var IdVoiceMail = SplitIdCb[1];
         ArrayElementos.push(IdVoiceMail);
       }
    }
    else
    {

        ArrayElementos.push(FSeleccionada);
    }
    var JSONlistaElementos = {"InfoListaDatos": ArrayElementos}; 
    var listaElementos = JSON.stringify(JSONlistaElementos);
    JSPeticionHttpRequest('idSolicitud=REACTIVAR_REGISTRO_GESTIONESOFFLINE&JSONIds=' + listaElementos + '&idOperador=' + idOperadorSel);
}




function ReproduceChat(stringurl) {

    $.when(
        $.ajax({
            type: "POST",
            url: stringurl,
            contentType: "application/json; charset=utf-8",
            async: false,
            cache: false,
            timeout: 5000,
            success: function (data) {
                var ref = data.ref;
                var url = data.url;
                var rc = data.rc;
                if (rc != "OK") {
                    alert("No se ha podido acceder al fichero: " + data.rc);
                    return false;
                }
                else {
                    var winurl = getAbsolutePath() + "/VisorChat/Ver?stringurl=" + encodeURIComponent(url);
                    var otherWindow = window.open(winurl, '_blank');
                }
            }

        })
    ).done();
}

