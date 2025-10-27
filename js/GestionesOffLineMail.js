let tablaRegistros = null;

function MostrarOcultarOpcionesBusqueda() {
    if ($('#DivOpcionesBusqueda').is(':visible')) {
        $('#DivOpcionesBusqueda').css('visibility', 'hidden');
        $('#DivOpcionesBusqueda').css('display', 'none');
        $('#BotonMostrarOcultarOpcionesB').text("");
        $('#BotonMostrarOcultarOpcionesB').attr("title", "Mostrar opciones de búsqueda");
        $('#BotonMostrarOcultarOpcionesB').append("<span class='fa fa-angle-double-down' style='color:black;'/>");
    }
  else
  {
    $('#DivOpcionesBusqueda').css('visibility','visible');
    $('#DivOpcionesBusqueda').css('display','');
    $('#BotonMostrarOcultarOpcionesB').text("");
    $('#BotonMostrarOcultarOpcionesB').attr("title","Ocultar opciones de búsqueda");
    $('#BotonMostrarOcultarOpcionesB').append("<span class='fa fa-angle-double-up' style='color:black;'/>");
  }
}


function Refrescar(posicion) {

    let idGrupoCombo = $('#ComboGrupos').val();
    let idOperadorCombo = $('#ComboOperadores').val();
    let idMuestraFin = $('#ComboEstadosRegistros').val();
    let CheckMuestraDescartados = $('#CheckDescartados').val();
    let fechaInicioGestion1 = $('#F_INICIO_GESTION_1').val();
    let fechaInicioGestion2 = $('#F_INICIO_GESTION_2').val();
    let asunto = $('#Asunto').val();
    let canal = "2"; // $('#ComboCanal').val();

    let telOrigen = $('#Origen').val();

    let telDestino = $('#Destino').val();
    let param = 'idSolicitud=BUSCADOR_GESTIONES_OFFLINE&idOperador=' + idOperadorCombo + '&idGrupo=' + idGrupoCombo + '&idMostrarFinalizados=' + idMuestraFin +
        '&MostrarDescartados=' + CheckMuestraDescartados + '&asunto=' + asunto;
    param += '&fInicioGestion1=' + fechaInicioGestion1 + '&fInicioGestion2=' + fechaInicioGestion2;
    param += '&TOrigen=' + telOrigen + '&TDestino=' + telDestino + '&canal=' + canal;

    $.ajax({
        type: 'POST',
        url: getPathSolicitudesBBDD(),
        data: param,
        success: function (dato) {
            let respuesta = JSON.parse(dato);
            let correcto = respuesta.Resultado;
            let mensaje = respuesta.Mensaje;


            var JSONRespuesta = JSON.parse(mensaje);

            $('#CuerpoTablaBuscador').find('td').remove();
            var htmlCabecera = "";
            htmlCabecera += "<th id='thSeleccionar'  data-sortable='false'> " +
                "  <input type='checkbox' class='chkTodos' onchange='ComprobarCheckSeleccionarTodo()' style='margin-left:5px;'> </th>";

            htmlCabecera += "<th id='thId' > Id</th>";
            htmlCabecera += "<th id='thFInicial' data-type='date' > Creación</th>";
            htmlCabecera += "<th id='thGrupo' > Grupo</th>";
            htmlCabecera += "<th id='thAsunto' data-name='asunto' data-group='true'> Asunto</th>";
            htmlCabecera += "<th id='thOrigen' data-hide='phone,tablet'> Origen</th>";
            htmlCabecera += "<th id='thPrioridad' data-type='number'> Prioridad</th>";
            htmlCabecera += "<th id='thEstado' > Estado</th>";
            htmlCabecera += "<th id='thTipficacion'> Tipificación </th>";
            htmlCabecera += "<th id='thTipficacion'> Subtipificación  </th>";
            htmlCabecera += "<th id='thOpAsignado' > Operador asignado</th>";
            htmlCabecera += "<th id='thFFinal' data-type='numeric'> Fecha final</th>";
            htmlCabecera += "<th id='thDestino' data-hide='phone,tablet'> Correos</th>";

            //                htmlCabecera += "<th id='thOpciones' data-sortable='false'>Opciones</th>";

            var listaInfoDatos = JSONRespuesta.InfoListaDatos;
            var numRegistrosTotal = JSONRespuesta.InfoAdicional;
            var HTMLInputsOcultos = "";

            var htmlTabla = "";
            htmlTabla += "<div class='col-lg-7 col-md-7' >";

            htmlTabla += "<div id='pagination1' class='col-lg-5 col-md-5 pagination hide-if-no-paging' style='margin: 0px !important'></div>";
            htmlTabla += "<div id='filter-form-container' > </div> ";
            htmlTabla += "</div > ";
            htmlTabla += "<div class='tamanoTabla' style='padding-bottom: 20px;'> ";
            htmlTabla += "<table id='tablaBuscador' data-page-navigation='#pagination1' class='footable header_fijo' data-sorting='true'> ";
            htmlTabla += "<thead>";
            htmlTabla += "<tr id='CabeceraTablaBuscador'>";
            htmlTabla += htmlCabecera;
            htmlTabla += "</tr>";
            htmlTabla += "</thead>";
            htmlTabla += "<tbody id='CuerpoTablaBuscador'>";

            const totalGestiones = listaInfoDatos.length;
            let totalCorreos = 0;

            for (var i = 0; i < listaInfoDatos.length; i++) {
                let JSONInfoListaDatos = listaInfoDatos[i];
                let InfoListaDatos = JSON.parse(JSONInfoListaDatos);
                let Key = InfoListaDatos.Key;
                let idGrupo = InfoListaDatos.IdGrupo;
                let nombreGrupo = base64ToUtf8(InfoListaDatos.Grupo);
                let nombreOperador = base64ToUtf8(InfoListaDatos.Operador);
                let idOperador = InfoListaDatos.IdOperador;
                let idEstado = InfoListaDatos.IdEstado;
                let nombreEstado = base64ToUtf8(InfoListaDatos.NombreEstado);
                let Origen = base64ToUtf8(InfoListaDatos.Origen);
                let Destino = InfoListaDatos.Destino;
                let FInicial = InfoListaDatos.FInicial;
                let FFinal = InfoListaDatos.FFinal;
                let FInicialValue = 0;
                let FFinalValue = 0;
                let FPrioridad = InfoListaDatos.Prioridad;
                let Filename = InfoListaDatos.Filename;
                let canal = InfoListaDatos.Canal;
                let tipificacion = base64ToUtf8(InfoListaDatos.Tipifiacion);
                let subtipificacion = base64ToUtf8(InfoListaDatos.SubTipifiacion);
                let numeroCorreos = InfoListaDatos.NumeroCorreos;
                let asunto = base64ToUtf8(InfoListaDatos.Asunto);
                let tituloGrupo = "Cambiar grupo";
                let tituloOperador = "Cambiar operador asignado";
                if (idGrupo == '0') {
                    tituloGrupo = "Asignar grupo";
                }
                if (idOperador == '0') {
                    tituloOperador = "Asignar operador";
                }

                var htmlFila = "<tr id='" + Key + "'>";

                if (Destino.includes(';'))
                    Destino = Destino.replaceAll(';', '; ');

                htmlFila += "<td id='Seleccionar_" + Key + "' style='text-align:center;vertical-align:middle;'>";
                htmlFila += "   <input id='checkbox_" + Key + "' class='cbSeleccionar' type='checkbox' value='' onChange='ComprobarChecks()'> ";
                htmlFila += "</td>";
                htmlFila += "<td id='Key_" + Key + "'>" + Key;
                htmlFila += "</td>";
                htmlFila += "<td  id='FInicial_" + Key + "' class='fecha'>" + FInicial + "</td>";
                htmlFila += "<td id='Grupo_" + Key + "'>" + nombreGrupo + "</td>";
                htmlFila += "<td id='Asunto_" + Key + "' class='asunto'>" + asunto + "</td>";
                htmlFila += "<td id='Origen_" + Key + "'  style='overflow:hidden;white-space:nowrap;text-overflow: clip' tite='" + Origen + " ' >" + Origen + "</td>";
                htmlFila += "<td id='Prioridad_" + Key + "' style='text-align:center;'>" + FPrioridad + "</td>"
                htmlFila += "<td id='Estado_" + Key + "' class='" + ColorEstado(nombreEstado) + "'>" + nombreEstado + "</td>";
                htmlFila += "<td id='Tipificacion_" + Key + "'>" + tipificacion + "</td>"
                htmlFila += "<td id='SubTipificacion_" + Key + "'>" + subtipificacion + "</td>"
                htmlFila += "<td id='Operador_" + Key + "'>" + nombreOperador + "</td>";
                htmlFila += "<td id='FFinal_" + Key + "' class='fecha'>" + FFinal + "</td>";
                htmlFila += "<td id='Destino_" + Key + "'>";
                htmlFila += `   <a href='#' class='nav-link nav-icon iconClass' style='margin-left:5px;'> 
                                      <i class='fa fa-2x fa-envelope-o ${ColorEstado(nombreEstado)}' ></i> 
                                       <span class='badge ${ColorEstadoBackground(nombreEstado)}'>${numeroCorreos}</span>
                                    </a> `;
                htmlFila += "</td>";

                htmlFila += "</tr>";
                HTMLInputsOcultos += "<input type='hidden' id='IdOperador_" + Key + "' value='" + idOperador + "'>";
                HTMLInputsOcultos += "<input type='hidden' id='IdGrupo_" + Key + "' value='" + idGrupo + "'>";
                HTMLInputsOcultos += "<input type='hidden' id='NombreMensaje_" + Key + "' value='" + Filename + "'>";
                htmlTabla += htmlFila;

                totalCorreos += parseInt(numeroCorreos);
            }

            htmlTabla += "</tbody>";
            htmlTabla += "</table>";
            htmlTabla += "</div>";

            htmlTabla += `<div class='total-registros'><b>Total gestiones:</b> ${totalGestiones}  <span style='float: right;'><b> Total correos: </b>${totalCorreos} </span></div>`;

            $('#DivAcordeon').html(htmlTabla + HTMLInputsOcultos);

            OrdenaPorFecha();

            //$('#CeldaAcordeon_iframeGlobal').append(HTMLInputsOcultos);
            tablaRegistros = $('#tablaBuscador').footable({
                'empty': 'Sin registros',
                'paging': {
                    'enabled': true,
                    'size': $('#NumRegistrosPorPagina').val(),
                    "container": "#pagination1"
                },
                "filtering": {
                    "enabled": true,
                    "container": "#filter-form-container",
                    "dropdownTitle": "Search in:"
                },
                'group': true
            });

            return;
        }
    });
}


$('#NumRegistrosPorPagina').on('change', function(e) { 
    e.preventDefault(); 
    const pageSize = $('#NumRegistrosPorPagina').val(); 
    FooTable.get("#tablaBuscador").pageSize(pageSize);
 }); 
    

function CreacionFuncionBuscar() {
  $('#BotonBuscar').click(function () {
    Refrescar(0);
  });
}

function base64ToUtf8(base64) {
    return decodeURIComponent(escape(atob(base64)));
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
    var valorRegFinaliz = $('#ComboEstadosRegistros').val();
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

        if (ArrayElementos.length === 1) {
            $(".BEdicionSimple").css('display', 'block');
            $(".BEdicionMultiple").css('display', 'block');
        }
        else if (ArrayElementos.length > 1)
            $(".BEdicionSimple").css('display', 'none');

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
                    let JSONInfoOpciones = JSON.parse(mensaje);
                    let habilitaEscuchaMensaje = JSONInfoOpciones.BhabilitarEscucharVerMensaje;
                    let habilitaCambioOperador = JSONInfoOpciones.BhabilitarCambiarOperador;
                    let habilitaCambioGrupo = JSONInfoOpciones.BhabilitarCambiarGrupo;
                    let habilitaDescartarRegistros = JSONInfoOpciones.BhabilitarDescartarRegistros;
                    let habilitaFinalizarRegistros = JSONInfoOpciones.BhabilitarFinalizarRegistros;
                    let habilitaReactivarRegistros = JSONInfoOpciones.BhabilitarReactivarRegistros;
                    let habilitaCambioPrioridad = JSONInfoOpciones.BhabilitarCambioPrioridad;
                    let habilitaEliminarSkill = JSONInfoOpciones.BhabilitarEliminaSkilset;
                    let habilitaCambiarEstado = JSONInfoOpciones.BhabilitarCambiarEstado;

                    HabilitaDeshabilitaMenu("CambiarOperador", habilitaCambioOperador);
                    HabilitaDeshabilitaMenu("CambiarGrupo", habilitaCambioGrupo);
                    HabilitaDeshabilitaMenu("CambiarPrioridad", habilitaCambioPrioridad);
                    HabilitaDeshabilitaMenu("EscucharMensaje", habilitaEscuchaMensaje);

                    HabilitaDeshabilitaMenu("ReactivarRegistros", habilitaReactivarRegistros);
                    HabilitaDeshabilitaMenu("CambiarEstado", habilitaCambiarEstado);
                    HabilitaDeshabilitaMenu("HabilitarSkillSet", habilitaEliminarSkill);
                }
                else {
                    $('#Cuerpo_ModalRespuesta').html(mensajeDecodificadoCaracteresEspeciales);
                    $('#ModalRespuesta').modal('show');
                }
            }
        });
    }
    else {
        $(".BEdicionSimple").css('display', 'none');
        $(".BEdicionMultiple").css('display', 'none');
    }
}


function HabilitaDeshabilitaOpcion(opcion, habilitar) {
    if (habilitar === true) {
        $('#' + opcion).css('color', '#337ab7');
        $('#' + opcion).css('cursor', 'pointer');
    }
    else {
        $('#' + opcion).css('color', 'rgb(128, 128, 128)');
        $('#' + opcion).css('cursor', 'default');
    }

}

function HabilitaDeshabilitaMenu(opcion, habilitar) {
    if (habilitar) {
        $('#' + opcion).css('display', 'block');        
    }
    else {
        $('#' + opcion).css ('display', 'none');        
    }
}


function ComprobarCheckSeleccionarTodo() {
    if ($('.chkTodos:checked').length === 0) {
        $('.cbSeleccionar').prop('checked', false);
        $(".BEdicionSimple").css('display', 'none');
        $(".BEdicionMultiple").css('display', 'none');
    }
    else {
        $('.cbSeleccionar').prop('checked', true);
        if ($('.cbSeleccionar:checked').length > 0) {
            var ArrayElementos = [];
            var listaSeleccionados = new Array();
            var cbs = $('.cbSeleccionar:checked');
            for (var i = 0; i < cbs.length; i++) {
                var cb = cbs[i];
                var idCb = cb.id;
                var SplitIdCb = idCb.split('_');
                var IdVoiceMail = SplitIdCb[1];
                ArrayElementos.push(IdVoiceMail);
            }
            var JSONlistaElementos = { "InfoListaDatos": ArrayElementos };
            var listaElementos = JSON.stringify(JSONlistaElementos);

            if (ArrayElementos.length > 1) {
                $(".BEdicionSimple").css('display', 'none');
                $(".BEdicionMultiple").css('display', 'block');
            }
            else if (ArrayElementos.length === 1) {
                $(".BEdicionSimple").css('display', 'block');
                $(".BEdicionMultiple").css('display', 'none');
            }

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
                        let habilitaEscuchaMensaje = JSONInfoOpciones.BhabilitarEscucharVerMensaje;
                        let habilitaCambioOperador = JSONInfoOpciones.BhabilitarCambiarOperador;
                        let habilitaCambioGrupo = JSONInfoOpciones.BhabilitarCambiarGrupo;
                        let habilitaDescartarRegistros = JSONInfoOpciones.BhabilitarDescartarRegistros;
                        let habilitaFinalizarRegistros = JSONInfoOpciones.BhabilitarFinalizarRegistros;
                        let habilitaReactivarRegistros = JSONInfoOpciones.BhabilitarReactivarRegistros;
                        let habilitaCambioPrioridad = JSONInfoOpciones.BhabilitarCambioPrioridad;
                        let habilitaEliminarSkill = JSONInfoOpciones.BhabilitarEliminaSkilset;
                        let habilitaCambiarEstado = JSONInfoOpciones.BhabilitarCambiarEstado;

                        HabilitaDeshabilitaMenu("CambiarOperador", habilitaCambioOperador);
                        HabilitaDeshabilitaMenu("CambiarGrupo", habilitaCambioGrupo);
                        HabilitaDeshabilitaMenu("CambiarPrioridad", habilitaCambioPrioridad);
                        HabilitaDeshabilitaMenu("EscucharMensaje", habilitaEscuchaMensaje);
                        HabilitaDeshabilitaMenu("ReactivarRegistros", habilitaReactivarRegistros);
                        HabilitaDeshabilitaMenu("CambiarEstado", habilitaCambiarEstado);
                        HabilitaDeshabilitaMenu("HabilitarSkillSet", habilitaEliminarSkill);
                    }
                    else {
                        $('#Cuerpo_ModalRespuesta').html(mensajeDecodificadoCaracteresEspeciales);
                        $('#ModalRespuesta').modal('show');
                    }
                }
            });
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

function RespuestaCorrectoReactivaRegistro(mensaje) {
    let FSeleccionada = $('#FilaSeleccionada').val();
    let JSONInfoRegistros = JSON.parse(mensaje);
    let InfoRegistros = JSONInfoRegistros.InfoListaDatos;
    for(var i= 0;i<InfoRegistros.length;i++)
    {
      var InfoRegistro = InfoRegistros[i];
      var JSONInfoRegistro = JSON.parse(InfoRegistro);
      var Key = JSONInfoRegistro.Key;
      var nombreOperador = reemplazarCaracteresEspeciales(JSONInfoRegistro.Operador);
      var idOperador = JSONInfoRegistro.IdOperador;
      var idEstado = JSONInfoRegistro.IdEstado;
      var nombreEstado = reemplazarCaracteresEspeciales(JSONInfoRegistro.NombreEstado);
      var FFinal = JSONInfoRegistro.FFinal;
      var FFinalValue = JSONInfoRegistro.FFinalValue;

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
    return fechaBBD;
}    



function BotonModificarPrioridad() {
    let ArrayElementos = ObtenerRegistrosSeleccionados();
    let prioridad = $("#CambiarPrioridadForm").val();
    if (prioridad === NaN || prioridad === null)
        prioridad = 0;
    let JSONlistaElementos = { "InfoListaDatos": ArrayElementos };
    let listaElementos = JSON.stringify(JSONlistaElementos);
    let params = 'idSolicitud=CAMBIAR_PRIORIDAD_GESTIONOFFLINE&JSONIds=' + listaElementos + '&prioridad=' + prioridad;
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
                let FSeleccionada = $('#FilaSeleccionada').val();
                let JSONInfoRegistros = JSON.parse(mensaje);
                let InfoRegistros = JSONInfoRegistros.InfoListaDatos;
                ComprobarChecks();
                $('#BModificarPrioridad').css('display', 'none');
                $('#Error_CambiarPrioridad').css('visibility', 'visible');
                $('#Error_CambiarPrioridad').css('display', 'block');
                $('#Error_CambiarPrioridad').removeClass('alert-danger');
                $('#Error_CambiarPrioridad').addClass('alert-success');
                $('#Error_CambiarPrioridad').html('Los cambios se han realizado correctamnte');
                Refrescar();
            }
            else {
                $('#Error_CambiarPrioridad').html(mensajeDecodificado);
                $('#Error_CambiarPrioridad').removeClass('alert-success');
                $('#Error_CambiarPrioridad').addClass('alert-danger');
                $('#Error_CambiarPrioridad').css('visibility', 'visible');
                $('#Error_CambiarPrioridad').css('display', 'block');
            }
            $(".BEdicionSimple").css('display', 'none');
            $(".BEdicionMultiple").css('display', 'none');
            $('.cbSeleccionar').prop('checked', false);
        }
    });

}

function BotonModificarOperador() {
    let ArrayElementos = ObtenerRegistrosSeleccionados();
    let JSONlistaElementos = { "InfoListaDatos": ArrayElementos };
    let idOperadorSel = $('#ComboCambiarOperador option:selected').val();
    let listaElementos = JSON.stringify(JSONlistaElementos);
    let params = 'idSolicitud=CAMBIAR_OPERADOR_GESTIONOFFLINE&JSONIds=' + listaElementos + '&idOperador=' + idOperadorSel;
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
                let FSeleccionada = $('#FilaSeleccionada').val();
                let JSONInfoRegistros = JSON.parse(mensaje);
                let InfoRegistros = JSONInfoRegistros.InfoListaDatos;
                ComprobarChecks();
                $('#LComboCambiarOperador').css('display', 'none');
                $('#ComboCambiarOperador').css('display', 'none');
                $('#BModificarOperador').css('display', 'none');
                $('#Error_CambioDeOperador').css('display', 'block');
                $('#Error_CambioDeOperador').removeClass('alert-danger');
                $('#Error_CambioDeOperador').addClass('alert-success');
                $('#Error_CambioDeOperador').html('Se ha asignado el registro seleccionado al operador');
                Refrescar();
            }
            else {
                $('#Error_CambioDeOperador').html(mensajeDecodificado);
                $('#Error_CambioDeOperador').removeClass('alert-success');
                $('#Error_CambioDeOperador').addClass('alert-danger');
                $('#Error_CambioDeOperador').css('display', 'block');
            }
            $(".BEdicionSimple").css('display', 'none');
            $(".BEdicionMultiple").css('display', 'none');
            $('.cbSeleccionar').prop('checked', false);
        }
    });
}

function ObtenerRegistrosSeleccionados() {
    let array = [];
    const seleccionada = $('#FilaSeleccionada').val();
    if (seleccionada == 'General') {
        var cbs = $('.cbSeleccionar:checked');
        for (var i = 0; i < cbs.length; i++) {
            var cb = cbs[i];
            var idCb = cb.id;
            var SplitIdCb = idCb.split('_');
            var IdVoiceMail = SplitIdCb[1];
            array.push(IdVoiceMail);
        }
    }
    else {
        array = seleccionada.split(',');
    }

    return array;
}

function BotonModificarEstado() {
    let ArrayElementos = ObtenerRegistrosSeleccionados(); 
    let nuevoEstado = $("#ComboCambiaEstado option:selected").val();

    let tipificacionPrimaria = $("#SelTipificaciones option:selected").val();
    if (tipificacionPrimaria === null || tipificacionPrimaria === undefined)
        tipificacionPrimaria = '';

    let tipificacionSecundaria = $("#SelTipificacionesSec option:selected").val();
    if (tipificacionSecundaria === null || tipificacionSecundaria === undefined)
        tipificacionSecundaria = '';

    if (tipificacionPrimaria === '' && tipificacionSecundaria === '' && nuevoEstado === "4") {
        alert("Debe poner una tipificación");
        return;
    }

    let operador = $("#selOperadoresEstado option:selected").val();
    if (operador === undefined || operador === '')
        operador = '-1';

    if (operador === '0' && nuevoEstado !== "0" ) {
        alert("Un estado distinto de NO ASIGNADO debe tener un operador asociado");
        return;
    }

    let JSONlistaElementos = { "InfoListaDatos": ArrayElementos };
    let listaElementos = JSON.stringify(JSONlistaElementos);
    let params = 'idSolicitud=CAMBIAR_ESTADO_GESTIONOFFLINE&JSONIds=' + listaElementos + '&idEstado=' + nuevoEstado + '&operador=' + operador +
                 '&tipificacionPrimaria=' + tipificacionPrimaria + '&tipificacionSecundaria=' + tipificacionSecundaria;
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
                let FSeleccionada = $('#FilaSeleccionada').val();
                let JSONInfoRegistros = JSON.parse(mensaje);
                let InfoRegistros = JSONInfoRegistros.InfoListaDatos;
                ComprobarChecks();
                $('#LComboCambiaEstado').css('display', 'none');
                $('#ComboCambiaEstado').css('display', 'none');
                $('#Error_CambioDeEstado').css('display', 'block');
                $('#Error_CambioDeEstado').removeClass('alert-danger');
                $('#Error_CambioDeEstado').addClass('alert-success');
                $('#Error_CambioDeEstado').html('Se ha cambiado el estado correctamente');
                $("#BModificarEstado").css('display', 'none');
                Refrescar();                                
            }
            else {
                $('#Error_CambioDeEstado').html(mensajeDecodificado);
                $('#Error_CambioDeEstado').removeClass('alert-success');
                $('#Error_CambioDeEstado').addClass('alert-danger');
                $('#Error_CambioDeEstado').css('display', 'block');
                $("#BModificarEstado").css('display', 'none');
            }

            if (!esVisible("sidePanel"))
               $('.cbSeleccionar').prop('checked', false);

            $("#TipificacionPrimaria").css('display', 'none');
            $("#TipificacionSecundaria").css('display', 'none');
            $("#pnlOperadoresEstado").css('display', 'none');
            $(".BEdicionSimple").css('display', 'none');
            $(".BEdicionMultiple").css('display', 'none');
            
            
        }
    });
}

function AceptarDescartarRegistro() {
    $('#ModalDescartarRegistro').modal('hide');
    $('#ModalDescartarOFinalizarRegistro').modal('hide');
    let ArrayElementos = ObtenerRegistrosSeleccionados();

    let JSONlistaElementos = { "InfoListaDatos": ArrayElementos };
    let listaElementos = JSON.stringify(JSONlistaElementos);
    var params = 'idSolicitud=DESCARTAR_REGISTRO_GESTIONESOFFLINE&JSONIds=' + listaElementos + '&idOperador=20017';
    $.ajax({
        type: 'POST',
        url: getPathSolicitudesBBDD(),
        data: params,
        success: function (dato) {
            var respuesta = JSON.parse(dato);
            var correcto = respuesta.Resultado;
            var mensaje = respuesta.Mensaje;
            var mensajeDecodificado = '';
            var mensajeDecodificadoCaracteresEspeciales = '';
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
                let FSeleccionada = $('#FilaSeleccionada').val();
                let JSONInfoRegistros = JSON.parse(mensaje);
                let InfoRegistros = JSONInfoRegistros.InfoListaDatos;
                ComprobarChecks();
                $('#Cuerpo_ModalRespuesta').text('El registro se ha descartado.');
                $('#ModalRespuesta').modal({ backdrop: 'static' });
                $('.modal-backdrop').css('z-index', 10);
                $('#ModalRespuesta').modal('show');
                Refrescar();
            }
            else {
                $('#Cuerpo_ModalRespuesta').html(mensajeDecodificadoCaracteresEspeciales);
                $('#').modal({ backdrop: 'static' });
                $('.modal-backdrop').css('z-index', 10);
                $('#').modal('show');
            }
            $(".BEdicionSimple").css('display', 'none');
            $(".BEdicionMultiple").css('display', 'none');
            $('.cbSeleccionar').prop('checked', false);
        }
    });
}

function AceptarFinalizarRegistro() {
    $('#ModalFinalizarRegistro').modal('hide');
    $('#ModalDescartarOFinalizarRegistro').modal('hide');
    $('#ModalEliminaSkillset').modal('hide');
    let ArrayElementos = ObtenerRegistrosSeleccionados();

    let JSONlistaElementos = { "InfoListaDatos": ArrayElementos };
    let listaElementos = JSON.stringify(JSONlistaElementos);
    var params = 'idSolicitud=FINALIZAR_REGISTRO_GESTIONESOFFLINE&JSONIds=' + listaElementos;
    $.ajax({
        type: 'POST',
        url: getPathSolicitudesBBDD(),
        data: params,
        success: function (dato) {
            var respuesta = JSON.parse(dato);
            var correcto = respuesta.Resultado;
            var mensaje = respuesta.Mensaje;
            var mensajeDecodificado = '';
            var mensajeDecodificadoCaracteresEspeciales = '';
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
                let FSeleccionada = $('#FilaSeleccionada').val();
                let JSONInfoRegistros = JSON.parse(mensaje);
                let InfoRegistros = JSONInfoRegistros.InfoListaDatos;
                ComprobarChecks();
                $('#Error_CambioDeOperador2').removeClass('alert-danger');
                $('#Error_CambioDeOperador2').addClass('alert-success');
                $('#Cuerpo_ModalRespuesta').text('El registro se ha finalizado.');
                $('#ModalRespuesta').modal({ backdrop: 'static' });
                $('.modal-backdrop').css('z-index', 10);
                $('#ModalRespuesta').modal('show');
                Refrescar();
            }
            else {
                $('#Cuerpo_ModalRespuesta').html(mensajeDecodificadoCaracteresEspeciales);
                $('#').modal({ backdrop: 'static' });
                $('.modal-backdrop').css('z-index', 10);
                $('#').modal('show');
            }
            $(".BEdicionSimple").css('display', 'none');
            $(".BEdicionMultiple").css('display', 'none');
            $('.cbSeleccionar').prop('checked', false);
        }
    });
}

//function AceptarEliminarSkillSet() {
//    $('#ModalFinalizarRegistro').modal('hide');
//    $('#ModalDescartarOFinalizarRegistro').modal('hide');
//    $('#ModalEliminaSkillset').modal('hide');
//    let ArrayElementos = ObtenerRegistrosSeleccionados();

//    let JSONlistaElementos = { "InfoListaDatos": ArrayElementos };
//    let listaElementos = JSON.stringify(JSONlistaElementos);
//    var params = 'idSolicitud=ELIMINAR_SKILLSET_GESTIONESOFFLINE&JSONIds=' + listaElementos;
//    $.ajax({
//        type: 'POST',
//        url: getPathSolicitudesBBDD(),
//        data: params,
//        success: function (dato) {
//            let respuesta = JSON.parse(dato);
//            let correcto = respuesta.Resultado;
//            let mensaje = respuesta.Mensaje;
//            let mensajeDecodificado = '';
//            let mensajeDecodificadoCaracteresEspeciales = '';
//            try {
//                mensajeDecodificado = utf8_decode(mensaje);
//            }
//            catch (err) {
//                mensajeDecodificado = mensaje;
//            }
//            try {
//                mensajeDecodificadoCaracteresEspeciales = reemplazarCaracteresEspeciales(mensaje);
//            }
//            catch (err) {
//                mensajeDecodificadoCaracteresEspeciales = mensaje;
//            }
//            if (correcto == '1') {
//                let FSeleccionada = $('#FilaSeleccionada').val();
//                let JSONInfoRegistros = JSON.parse(mensaje);
//                let InfoRegistros = JSONInfoRegistros.InfoListaDatos;
//                ComprobarChecks();
//                $('#Cuerpo_ModalRespuesta').text('El skilset se ha eliminado.');
//                $('#ModalRespuesta').modal({ backdrop: 'static' });
//                $('.modal-backdrop').css('z-index', 10);
//                $('#ModalRespuesta').modal('show');
//                Refrescar();
//            }
//            else {
//                $('#Cuerpo_ModalRespuesta').html(mensajeDecodificadoCaracteresEspeciales);
//                $('#').modal({ backdrop: 'static' });
//                $('.modal-backdrop').css('z-index', 10);
//                $('#').modal('show');
//            }
//            $(".BEdicionSimple").css('display', 'none');
//            $(".BEdicionMultiple").css('display', 'none');
//            $('.cbSeleccionar').prop('checked', false);
//            simularDobleClick(ArrayElementos);
//        }
//    });
//}


function AceptaReactivarRegistro() {
    let ArrayElementos = ObtenerRegistrosSeleccionados();
    var idOperadorSel = $('#ComboCambiarOperador2 option:selected').val();

    let JSONlistaElementos = { "InfoListaDatos": ArrayElementos };
    let listaElementos = JSON.stringify(JSONlistaElementos);
    var params = 'idSolicitud=REACTIVAR_REGISTRO_GESTIONESOFFLINE&JSONIds=' + listaElementos + '&idOperador=' + idOperadorSel;
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
                let FSeleccionada = $('#FilaSeleccionada').val();
                let JSONInfoRegistros = JSON.parse(mensaje);
                let InfoRegistros = JSONInfoRegistros.InfoListaDatos;
                ComprobarChecks();
                $('#Error_CambioDeOperador2').removeClass('alert-danger');
                $('#Error_CambioDeOperador2').addClass('alert-success');
                $('#Error_CambioDeOperador2').text('Se ha reactivado el registro seleccionado.');
                $('#Error_CambioDeOperador2').css('visibility', 'visible');
                $('#Error_CambioDeOperador2').css('display', 'block');
                $('#BReactivarRegistro').css('visibility', 'none');
                
                Refrescar();
            }
            else {
                $('#Error_CambioDeOperador2').html(mensajeDecodificado);
                $('#Error_CambioDeOperador2').removeClass('alert-success');
                $('#Error_CambioDeOperador2').addClass('alert-danger');
                $('#Error_CambioDeOperador2').css('visibility', 'visible');
                $('#Error_CambioDeOperador2').css('display', 'block');
                $('#BReactivarRegistro').css('visibility', 'none');
            }
            $(".BEdicionSimple").css('display', 'none');
            $(".BEdicionMultiple").css('display', 'none');
            $('.cbSeleccionar').prop('checked', false);
        }
    });
}





function EliminarSkillSet(id) {
    var arrayId = id.split('_');
    var idMensajeBuzon = arrayId[1];
    if (idMensajeBuzon == 'General') {
        if ($('#BSkillSet_General').css('cursor') == 'default') return;
        $('#Cuerpo_ModalEliminaSkillset').text('Se van a eliminar el skilset de los registros seleccionados. ¿Desea continuar?');
    }
    else {
        $('#Cuerpo_ModalEliminaSkillset').text('Se va a eliminar el skilset del registro seleccionado. ¿Desea continuar?');
    }
    $('#FilaSeleccionada').val(idMensajeBuzon);
    $('#ModalEliminaSkillset').modal({ backdrop: 'static' });
    $('.modal-backdrop').css('z-index', 10);
    $('#ModalEliminaSkillset').modal('show');
}

function FDescartarOFinalizar(id) {
    let arrayId = id.split('_');
    let idMensajeBuzon = arrayId[1];
    $('#FilaSeleccionada').val(idMensajeBuzon);
    $('#ModalDescartarOFinalizarRegistro').modal({ backdrop: 'static' });
    $('.modal-backdrop').css('z-index', 10);
    $('#ModalDescartarOFinalizarRegistro').modal('show');
}

//function FEscucharMensaje(id) {
//    let arrayId = id.split('_');
//    let idMensajeBuzon = arrayId[1];
//    let nombreGrabacion = $('#NombreMensaje_' + idMensajeBuzon).val();
//    $.ajax({
//        type: 'POST',
//        dataType: 'json',
//        contentType: 'application/json; charset=utf-8',
//        url: 'https://vpcopenbank.adlantia.com/tiphonerecords/QueryVoiceRecord.aspx?type=VoiceMail&ref=' + nombreGrabacion,
//        success: function (data, textStatus) {
//            if (textStatus == 'success') {
//                console.log('Exito');
//                var ref = data.ref;
//                var url = data.url;
//                var rc = data.rc;
//                if (rc == 'OK') {
//                    console.log('Hay grabación');
//                    $('#audioUp').attr('src', url);
//                    $('#ModalEscuchaMensaje').modal({ backdrop: 'static' });
//                    $('.modal-backdrop').css('z-index', 10);
//                    $('#ModalEscuchaMensaje').modal('show');
//                }
//                else if (rc.toUpperCase() == 'NOT FOUND') {
//                    $('#Cuerpo_ModalRespuesta').text('No se ha encontrado en el servidor la grabación (' + nombreGrabacion + ') solicitada ');
//                    $('#ModalRespuesta').modal({ backdrop: 'static' });
//                    $('.modal-backdrop').css('z-index', 10);
//                    $('#ModalRespuesta').modal('show');
//                }
//                else {
//                    $('#Cuerpo_ModalRespuesta').text('Ha ocurrido un error al buscar la grabación. Consulte con un administrador.');
//                    $('#ModalRespuesta').modal({ backdrop: 'static' });
//                    $('.modal-backdrop').css('z-index', 10);
//                    $('#ModalRespuesta').modal('show');
//                }
//            }
//        },
//        error: function (data, status, error) {
//            $('#Cuerpo_ModalRespuesta').text('Ha ocurido un error. Consulte con un administrador.');
//            $('#ModalRespuesta').modal({ backdrop: 'static' });
//            $('.modal-backdrop').css('z-index', 10);
//            $('#ModalRespuesta').modal('show');
//        }
//    });
//}


function stringToDateTime(_date, _format, _delimiter) {
    //   var formatLowerCase = _format.toLowerCase();
    if (_date === null || _date === '')
        return null;

    let posSeparadorFecha = _format.indexOf(" "); // Busco el separador entre la fecha y la hora
    let formatoFecha = _format.substr(0, posSeparadorFecha);
    let valorFecha = _date.substr(0, posSeparadorFecha);
    let formatoTiempo = _format.substr(posSeparadorFecha + 1);
    let valorTiempo = _date.substr(posSeparadorFecha + 1);

    let formatItems = formatoFecha.split(_delimiter);
    let dateItems = valorFecha.split(_delimiter);    
    let monthIndex = formatItems.indexOf("MM");
    let dayIndex = formatItems.indexOf("dd");
    let yearIndex = formatItems.indexOf("yyyy");

    formatItems = formatoTiempo.split(":");
    let tiempoItems = valorTiempo.split(":");
    let hourIndex = formatItems.indexOf("HH");
    let minutesIndex = formatItems.indexOf("mm");
    let secondsIndex = formatItems.indexOf("ss");
    let month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex], tiempoItems[hourIndex], tiempoItems[minutesIndex], tiempoItems[secondsIndex]);
    return formatedDate;
}


function ObtenerListaDeIdentificadores() {
    let cbs = $('.cbSeleccionar:checked');
    let strIds = '';
    if (cbs) {
        for (var i = 0; i < cbs.length; i++) {
            let cb = cbs[i];
            let idCb = cb.id;
            let splitIdCb = idCb.split('_');
            if (strIds === '')
                strIds = splitIdCb[1];
            else
                strIds += ',' + splitIdCb[1];
        }
    }

    return strIds;
}



function FCambiarOperador2() {
    let idOperador = '0';
    let strIds = ObtenerListaDeIdentificadores();   

    if (!strIds.includes(','))
        idOperador = $('#IdOperador_' + strIds).val();
    else
        idOperador = 0;
    
    $('#FilaSeleccionada').val(strIds);
    $('[name=ComboCambiarOperador]').val(idOperador);
    $('#LComboCambiarOperador').css('display', 'block');
    $('#Error_CambioDeOperador').css('display', 'none');
    $('#ComboCambiarOperador').css('display', 'block');
    $('#BModificarOperador').css('display', 'inline');
    $('#ModalCambiarOperador').modal({ backdrop: 'static' });
    $('.modal-backdrop').css('z-index', 10);
    $('#ModalCambiarOperador').modal('show');
    return false;
}


function CambiarPrioridad2() {
    let prioridadG = '0';
    let idRegistros = ObtenerListaDeIdentificadores();

    if (!idRegistros.includes(','))
        prioridadG = $('#IdPrioridad_' + idRegistros).val();
    else
        prioridadG = 0;

    $('#Error_CambiarPrioridad').css('display', 'none');
    $('#FilaSeleccionada').val(idRegistros);
    $('#CambiarPrioridadForm').val(prioridadG);
    $('#BModificarPrioridad').css('display', 'inline');
    $('#ModalCambiarPrioridad').modal({ backdrop: 'static' });
    $('.modal-backdrop').css('z-index', 10);
    $('#ModalCambiarPrioridad').modal('show');
}


function CambiarEstado2() {
    let idEstado = '';
    let idRegistros = ObtenerListaDeIdentificadores();

    if (!idRegistros.includes(','))
        idEstado = $('#IdEstado_' + idRegistros).val();
    else
        idEstado = 0;

    $('#FilaSeleccionada').val(idRegistros);
    $('[name=ComboCambiaEstado]').val(idEstado);
    $('#LComboCambiaEstado').css('display', 'block');
    $('#Error_CambioDeEstado').css('display', 'none');
    $('#BModificarEstado').css('display', 'inline');
    $('#ComboCambiaEstado').css('display', 'block');
    $("#TipificacionPrimaria").css('display', 'none');
    $("#pnlOperadoresEstado").css('display', 'none');    
    $('#ModalCambiarEstado').modal({ backdrop: 'static' });
    $('.modal-backdrop').css('z-index', 10);
    $('#ModalCambiarEstado').modal('show');
    return false;
}


function VerRegistro() {
    let idEstado = '';
    let idRegistros = ObtenerListaDeIdentificadores();

    if (idRegistros.length >= 0) {
        ObtenerDatosGestion(idRegistros);
    }
}

function FReactivar2() {
    let idOperador = '0';
    let idRegistros = ObtenerListaDeIdentificadores();

    if (!idRegistros.includes(','))
        idOperador = $('#IdOperador_' + idRegistros).val();
    else
        idOperador = 0;

    $('#FilaSeleccionada').val(idRegistros);
    $('[name=ComboCambiarOperador2]').val(idOperador);
    $('#LComboCambiarOperador2').css('visibility', 'visible');
    $('#LComboCambiarOperador2').css('display', 'block');
    $('#ComboCambiarOperador2').css('visibility', 'visible');
    $('#ComboCambiarOperador2').css('display', 'block');
    $('#Error_CambioDeOperador2').css('visibility', 'hidden');
    $('#Error_CambioDeOperador2').css('display', 'none');
    $('#BReactivarRegistro').css('visibility', 'visible');
    $('#ModalReactivarRegistro').modal({ backdrop: 'static' });
    $('.modal-backdrop').css('z-index', 10);
    $('#ModalReactivarRegistro').modal('show');
}

function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function VerConversacion() {
    const hilo = $('#ultimoHilo').val();

    if (ultimoHilo) {
        let ruta = urlVerEmail + '/GetEmailByHiloId?hiloId=' + hilo;
        $.get(ruta, function (data, status) {
            let datos = JSON.parse(data);
            MostrarDatosHilo(hilo, datos);
        });
    }
}

function ObtenerDatosGestion(id) {
    const ultimoId = $('#ultimoRegistro').val();
    if (ultimoId) {
        $('#' + ultimoId).removeClass('tr-elevado');
        let lastCheck = $('#checkbox_' + ultimoId);
        // primero miro que exista porque si es un cambio de estado puede haber desaparecido al refrescar
        if (lastCheck.length !== 0) {            
            lastCheck[0].checked = false;
        }
    }
    // Guardo el grupo y operador seleccionado
    if ($("#Operador_" + id).length !== 0)
        $("#ultimoOperador").val($("#Operador_" + id).text());

    if ($("#Grupo_" + id).length !== 0)
        $("#ultimoGrupo").val($("#Grupo_" + id).text());


    if (!$('#' + id).hasClass('tr-elevado'))
       $('#' + id).addClass('tr-elevado');
    let checkbox = $('#checkbox_' + id);
    if (checkbox.length !== 0) {
        checkbox[0].checked = true;
    }

    // desactivo los checks para que no se pueda cambiar
    let checkboxes = document.querySelectorAll(".cbSeleccionar");
    // Deshabilitamos cada uno
    checkboxes.forEach(checkbox => {
        checkbox.disabled = true;
    });

    // vuelvo a mostrar panel izquierdo
    $(".panelPrincipalIzquierda").css('display', 'none');
    $(".panelPrincipalCentro").css('left', '50px');

    $('#ultimoRegistro').val(id);
    let ruta = urlVerEmail + 'GetEmailByGestion?gestionId=' + id;
    $.get(ruta, function (data, status) {
        let datos = JSON.parse(data);
        MostrarDatosGestion(id, datos);
    });
}


function AbrirPanelLateral() {
    if (!$("#sidePanel").hasClass('open'))
        $("#sidePanel").addClass('open');
    $("#sidePanel").css("display", "block");
    const sidePanel = document.getElementById('sidePanel');
    const mainContent = document.querySelector('.main-content');

    sidePanel.classList.toggle('open');
    mainContent.classList.toggle('shifted');
}

function GenerarPanelesDeCorreo(longitud, comienzo) {
    html = "<div class='panel-group' style='padding: 5px 20px;' id='accordion'>";
    // Creo primero los campos del formulario
    for (let j = 0; j < longitud; j++) {
        html += htmlPanelDatosEmail2(comienzo);
        comienzo++;
    }

    html += "</div>";

    return html;
}

function MostrarDatosGestion(id, lsdatos) {
    AbrirPanelLateral();

    if (lsdatos.emails.length >= 1) {
        let html = '';

        html += panelDatosDeGestion(lsdatos.emails);
        // lo paso al formulario
        $("#datosEmail").html(html);

        const hayHilo = lsdatos.seExpande;
        if (hayHilo === true)
            $("#btnConversacion_" +id).css('display', 'block');
        else
            $("#btnConversacion_" + id).css('display', 'none');

        const datosEmailCero = lsdatos.emails[0];
        let estado =  ObtenerEstado(datosEmailCero.Estado);
        $("#lblEstado_" + id).text(estado);
        $("#lblEstado_" + id).addClass(ColorEstado(estado));      
        $("#lblIdGestion_" + id).text(id);
        $("#lblOperador").text($("#ultimoOperador").val());
        $("#lblGrupo").text($("#ultimoGrupo").val());
        $("#ultimoHilo").val(datosEmailCero.HiloId);

        for (let i = 0; i < lsdatos.emails.length; i++) {
            datos = lsdatos.emails[i];
            
            if (datos.Estado === 4 || datos.Estado === 5) {
                let tipificacion = datos.TipificacionPrimaria;
                if (tipificacion === null)
                    tipificacion = '';

                let tipificacion2 = datos.TipificacionSecundaria;
                if (tipificacion2 === null)
                    tipificacion2 = '';

                if (tipificacion !== '' && tipificacion2 !== '')
                    tipificacion = tipificacion + ' - ' + tipificacion2;
                else
                    tipificacion = tipificacion + tipificacion2;

                $("#lblTipificacion_" + id).text(tipificacion);
            }


            RellenarCamposCorreo(i, datos);
        }
    }
}



function MostrarDatosHilo(hilo, lsdatos) {
    AbrirPanelLateral();

    if (lsdatos.length >= 1) {
        let html = '';

        html += panelDatosDeGestion(lsdatos);
        // lo paso al formulario
        $("#datosEmail").html(html);
        
        let idGestionAux = -1;
        let estado = '';

        for (let i = 0; i < lsdatos.length; i++) {
            datos = lsdatos[i];
            const id = datos.GestionId;
            if (id !== idGestionAux) {
                idGestionAux = id;
                estado = ObtenerEstado(datos.Estado);
                $("#lblEstado_" + id).text(estado);
                $("#lblEstado_" + id).addClass(ColorEstado(estado));
                $("#lblIdGestion_" + id).text(id);

                if (datos.Estado === 4 || datos.Estado === 5) {
                    let tipificacion = datos.TipificacionPrimaria;
                    if (tipificacion === null)
                        tipificacion = '';

                    let tipificacion2 = datos.TipificacionSecundaria;
                    if (tipificacion2 === null)
                        tipificacion2 = '';

                    if (tipificacion !== '' && tipificacion2 !== '')
                    if (tipificacion !== '' && tipificacion2 !== '')
                        tipificacion = tipificacion + ' - ' + tipificacion2;
                    else
                        tipificacion = tipificacion + tipificacion2;

                    $("#lblTipificacion_" + id).text(tipificacion);

                    $("#btnConversacion_" + id).css('display', 'none');
                }
            }


            RellenarCamposCorreo(i, datos);
        }
    }
}

function RellenarCamposCorreo(i, datos) {
    let bodyEmail = b64DecodeUnicode(datos.HtmlBody);
    let para = decodeHtmlEntities(datos.To);
    let from = decodeHtmlEntities(datos.From);
    let cc = decodeHtmlEntities(datos.Cc);
    let asunto = b64DecodeUnicode(datos.Asunto);
    let esSaliente = datos.EsSaliente;
    let leido = datos.Leido;

    if (leido) {
        $("#sobre_" + i).removeClass("fa-envelope");
        $("#sobre_" + i).addClass("fa-envelope-open");
        $("#marcaNoLeido_" + i).css("display", "none");
    }
    else {
        $("#sobre_" + i).addClass("fa-envelope");
        $("#sobre_" + i).removeClass("fa-envelope-open");
        $("#marcaNoLeido_" + i).css("display", "inline-block");
    }

    $("#marcaFinalizado_" + i).css("display", "none");

    let estadoId = datos.Estado;
    if (estadoId === 0 || estadoId === 1) {
        $("#sobre_" + i).removeClass("finalizado");
        $("#sobre_" + i).removeClass("atendido");
        $("#sobre_" + i).removeClass("aparcado");
        $("#sobre_" + i).addClass("noLeido");
    }
    else if (estadoId === 2) {
        $("#sobre_" + i).removeClass("finalizado");
        $("#sobre_" + i).removeClass("atendido");
        $("#sobre_" + i).removeClass("noLeido");
        $("#sobre_" + i).addClass("aparcado");
    }
    else if (estadoId === 3) {
        $("#sobre_" + i).removeClass("finalizado");
        $("#sobre_" + i).removeClass("aparcado");
        $("#sobre_" + i).addClass("atendido");
        $("#sobre_" + i).removeClass("noLeido");
    }
    else {
        $("#sobre_" + i).removeClass("atendido");
        $("#sobre_" + i).removeClass("aparcado");
        $("#sobre_" + i).removeClass("noLeido");
        $("#sobre_" + i).addClass("finalizado");
        $("#marcaFinalizado_" + i).css("display", "inline-block");
        $("#sobre_" + i).removeClass("fa-envelope-open");
        $("#sobre_" + i).addClass("fa-envelope");
        $("#marcaNoLeido_" + i).css("display", "none");  // A ver como corrijo esto ya que si se muestra no leido y finalizado se desplaza
    }

    if (esSaliente) {
        /*$("#esSaliente_" + i).removeClass("fa-long-arrow-up");*/
        $("#esSaliente_" + i).removeClass("fa-share");
        $("#esSaliente_" + i).addClass("fa-reply");
        $("#esSaliente_" + i).css("color", "#4f9fcf");
        $("#esSaliente_" + i).prop('title', 'Correo saliente');
    }
    else {
        /*$("#esSaliente_" + i).removeClass("fa-long-arrow-down");*/
        $("#esSaliente_" + i).removeClass("fa-reply");
        $("#esSaliente_" + i).addClass("fa-share");        
        $("#esSaliente_" + i).css("color", "#d44950");
        $("#esSaliente_" + i).prop('title', 'Correo entrante');
    }

    $("#lblFecha_" + i).text(datos.DateTime);

    $("#lblFrom_" + i).text(from);
    $("#lblTime_" + i).text(datos.DateTime);
    $("#lblPara_" + i).text(para);
    $("#lblCC_" + i).text(cc);
    $("#lblAsunto_" + i).text(asunto);
    $("#bodyEmail_" + i).html(bodyEmail);

    if (datos.Attachments && datos.Attachments.length > 0) {
        $("#clipattachment_" + i).css('display', 'block');

        $("#attachments_" + i).css('display', 'block');
        let menuDropDown = '';
        for (let j = 0; j < datos.Attachments.length; j++) {
            let attach = datos.Attachments[j];
            menuDropDown += "<li><a href='" + attach.Value + "' target='_blank' rel='noopener noreferrer'> " + attach.Name + "</a></li> ";
        }
        $("#dropDownMenu_" + i).html(menuDropDown);
    }
    else
        $("#clipattachment_" + i).css('display', 'none');
}

function ObtenerEstado(idEstado) {
    switch (idEstado) {
        case 0:
            return "NO ASIGNADA";
        case 1:
            return "NO LEIDA";
        case 2:
            return "APARCADA";
        case 3:
            return "ATENDIDA";
        case 4:
            return "FINALIZADA";
        case 5:
            return "DESCARTADA";
        case 6:
            return "EN ESPERA";
        case 7:
            return "PREASIGNADO";
        default:
            return idEstado;
    }
}

function ColorEstado(nombrestado) {
    switch (nombrestado.toUpperCase()) {
        case "NO LEIDA":
        case "NO ASIGNADA":
            return "noLeido";
        case "ATENDIDA":
            return "atendido";
        case "APARCADA":
            return "aparcado";
        case "DESCARTADA":
            return "descartado";
        case "FINALIZADA":
            return "finalizado";
        default:
            return "atendido";
    }
}

function ColorEstadoBackground(estado) {

    switch (estado.toUpperCase()) {
        case "NO LEIDA":
        case "NO ASIGNADA":
            return "backg-noLeido";
        case "ATENDIDA":
            return "backg-atendido";
        case "APARCADA":
            return "backg-aparcado";
        case "DESCARTADA":
            return "backg-descartado";
        case "FINALIZADA":
            return "backg-finalizado";
        default:
            return "backg-atendido";
    }
}


function htmlPanelDatosEmail2(opcion) {
    let html = `<div class="panel panel-default panel-correo_${opcion}">
                    <div id='panelid_${opcion}' class="panel-heading" data-toggle="collapse" data-target="#panel${opcion}" onclick='MostrarOcultarCorreo(this.id);'
                         style='padding: 5px 10px 5px 5px;background-color:white;'>
                       <table class="header-table">
                          <tr>
                              <td class="icon-cell">
                                 <span id='esSaliente_${opcion}' class="fa " style='font-size:14px;''  ></span>
                                 <span id='sobre_${opcion}' class="fa " >
                                      <span id='marcaNoLeido_${opcion}' class='punto' style='display: none;'></span> 
                                      <span id='marcaFinalizado_${opcion}' class='fa fa-check punto-con-check' style='display: none;' ></span> 
                                 </span>                                                                  
                              </td>
                              <td class="from-cell color-from"><b>De</b> <span id='lblFrom_${opcion}' > </span></td>
                              <td class="asunto-cell">
                                  <span id='lblAsunto_${opcion}'> </span>
                                  <span id='clipattachment_${opcion}' class='fa fa-paperclip' style='display:none; float: left; margin-right: 7px;'> </span>
                              </td>
                              <td id='lblFecha_${opcion}'></td>
                          </tr>
                       </table>
                    </div>

                    <div id="panel${opcion}" class="panel-collapse collapse">
                           <div class="panel-body" style='color: #5c4457;'>                         
                          <div class='col-lg-12 col-md-12'>
                            <p ><b>Para: </b> <span id='lblPara_${opcion}'> </span> </p> 
                            <p ><b>Cc: </b> <span id='lblCC_${opcion}'> </span> </p> 
                          </div>
                          <div class="dropdown col-lg-12 col-md-12" id='attachments_${opcion}' style='display:none;'>
                               <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                     Adjuntos
                                     <span class="caret"></span>
                               </button>
                               <ul id="dropDownMenu_${opcion}" class="dropdown-menu" >
                          </div>
                          <div class='row' style='padding-top:15px;padding-bottom: 15px;'> 
                             <div id='bodyEmail_${opcion}' class='col-lg-12 col-md-12 body-email'> </div>
                          </div> 
                      </div>
                    </div>
                </div>` ;

    return html;
}

function panelDatosDeGestion(datosGestion) {
    let html = '';

    let idGestion = -1;

    for (let i = 0; i < datosGestion.length; i++) {
        const datoEmail = datosGestion[i];
        if (idGestion !== datoEmail.GestionId) {
            idGestion = datoEmail.GestionId;

            const totalCorreos = obtenerTotalCorreosGestion(idGestion, datosGestion)

            html += `<div id='panelDatosGestion_${idGestion}' class='panel-datos-gestion'>
                        <div class='col-lg-2 col-md-2'>
                           <b>Gestión</b> <span id='lblIdGestion_${idGestion}'></span>
                        </div> `;
                        
            if (datoEmail.Estado !== 4 && datoEmail.Estado !== 5)
                html += `  <div class='col-lg-7 col-md-7'>
                              <b style='margin-left: 10px;'>Estado <span id='lblEstado_${idGestion}' style='margin-left: 5px;'></span></b>
                            </div>
                            <div class='col-lg-3 col-md-3' id='BotoneraGestion_${idGestion}' >                              
                              <button type='button' class='btn botones-gestion' id='GestCambiarPrioridad' title='Cambiar prioridad' onclick='CambiarPrioridad2()' >
                                 <span  class='fa fa-arrows-v'></span>
                              </button>
                              <button type='button' class='btn botones-gestion' id='GestCambiarOperador' title='Cambiar operador' onclick='FCambiarOperador2()' >
                                 <span  class='fa fa-user'></span>
                              </button>
                              <button type='button' class='btn botones-gestion' id='GestCambiarEstado' title='Cambiar estado' onclick='CambiarEstado2()' >
                                 <span  class='fa fa-adjust'></span>
                              </button>
                              <button type='button' class='btn botones-gestion' id='btnConversacion_${idGestion}' title='Ver conversación' onclick='VerConversacion()' >
                                 <span  class='fa fa-eye'></span>
                              </button>
                            </div>
                       </div>
                ${GenerarPanelesDeCorreo(totalCorreos, i)}
                     `;
            else
                html += `   <div class='col-lg-4 col-md-4'>
                              <b style='margin-left: 10px;'>Estado <span id='lblEstado_${idGestion}' style='margin-left: 10px;'></span></b>
                            </div>
                            <div class='col-lg-4 col-md-4' id='BotoneraGestionFin_${idGestion}'  style='display: inline-flex;'>
                              <b>Tipficación <span id='lblTipificacion_${idGestion}' class='finalizado'></span></b>
                            </div>     
                            <div class='col-lg-2 col-md-2' id='BotoneraGestion_${idGestion}' >                              
                              <button type='button' class='btn botones-gestion' id='btnConversacion_${idGestion}' title='Ver conversación' onclick='VerConversacion()' >
                                 <span  class='fa fa-eye'></span>
                              </button>
                            </div>
                        </div>
                ${GenerarPanelesDeCorreo(totalCorreos, i)}
                     `;        
        }

        
    }
    return html;
}

function obtenerTotalCorreosGestion(idGestion, emails) {
    let total = 0;
    emails.forEach((item) => {
        if (item.GestionId === idGestion)
            total += 1
    });

    return total;
}

function MostrarOcultarCorreo(id) {
        var target = $('#' + id).attr('data-target');
        $(target).collapse('toggle');
}
       

function CierraVentanaEmail() {
    if ($("#sidePanel").hasClass('open'))
        $("#sidePanel").removeClass('open');
    $("#sidePanel").css("display", "none");

    $("#datosEmail").html('');
    const ultimoId = $('#ultimoRegistro').val();
    $('#' + ultimoId).removeClass('tr-elevado');
    $('#ultimoRegistro').val('');
    $('#ultimoHilo').val();    

    // reactivo los checks para que se puedan cambiar
    let checkboxes = document.querySelectorAll(".cbSeleccionar");

    // Deshabilitamos cada uno
    checkboxes.forEach(checkbox => {
        checkbox.disabled = false;
    });
    $('.cbSeleccionar').prop('checked', false);

    // vuelvo a mostrar panel izquierdo
    $(".panelPrincipalIzquierda").css('display', 'block');
    $(".panelPrincipalCentro").css('left', '0px');

}

function simularDobleClick(idsGestion) {
    if (!esVisible("sidePanel"))
        return;

    if (idsGestion && idsGestion.length === 1) {
        ObtenerDatosGestion(idsGestion[0])
        //let fila = document.getElementById();
        //let eventoDobleClick = new MouseEvent("dblclick", {
        //    bubbles: true,
        //    cancelable: true,
        //    view: window
        //});
        //fila.dispatchEvent(eventoDobleClick);
    }
}

function esVisible(elementoId) {
    if (elementoId && document.getElementById(elementoId).style.display !== 'none')
        return true;

    return false;
}


function CierraVentanaModal() {
    ultimoId = [];
    ultimoId.push($('#ultimoRegistro').val());
    simularDobleClick(ultimoId);
}



function decodeHtmlEntities(html) {
    // Crear un elemento temporal
    const tempElement = document.createElement("div");

    // Establecer el contenido HTML al código a decodificar
    tempElement.innerHTML = html;

    // Retornar el texto decodificado
    return tempElement.textContent || tempElement.innerText || "";
}

function OrdenaPorFecha() {
    document.querySelectorAll('.fecha').forEach(td => {
        let fechaOriginal = td.textContent;
        if (fechaOriginal) {
            fechaOriginal = fechaOriginal.trim();
            let partes = fechaOriginal.split(' ');    // Separar fecha y hora\r\ 
            let fecha = partes[0].split('/');      // Separar día, mes, año\r\n  
            let fechaConvertida = `${fecha[0]}/${fecha[1]}/${fecha[2]} ${partes[1]}`;    // Convertir a YYYY-MM-DD\r\n 
            td.setAttribute('data-value', fechaConvertida);    // Agregar data-value para ordenar\r\n           
        }
        else
            td.setAttribute('data-value', '');    // Agregar data-value para ordenar\r\n           
    });
}

function CambiaSelectorEstado() {

    let strIds = ObtenerListaDeIdentificadores();
    const estadoSeleccionado = $("#ComboCambiaEstado option:selected").val();

    if (!strIds.includes(',')) {
        let operador = $("#Operador_" + strIds).text();
        operador = operador.toUpperCase();        

        // Si no tiene asignado un  operador se muestra el panel de selección de operadores
        if ((operador === "SIN ASIGNAR" || operador === "") && estadoSeleccionado !== "0") {
            $("#pnlOperadoresEstado").css("display", "block");
            $("#selOperadoresEstado").html(g_operadoresSistema);
        }
        else {
            $("#pnlOperadoresEstado").css("display", "none");
            $("#selOperadoresEstado").html('');
        }
    }

    if ( estadoSeleccionado === '4') { // Estado finalizado muestro tipificaciones
        let idGrupo = '0';

        if (!strIds.includes(','))
            idGrupo = $('#IdGrupo_' + strIds).val();
        else {
            idGrupo = ObtenerGrupoParaFinalizarRegistro(strIds);
            if (idGrupo && idGrupo === '-1') {
                alert("No se pueden seleccionar registros de diferentes grupos para finalizar");
                return;
            };
        }
            

        let ruta = getAbsolutePath() + '/BuscadorGestionesOffLineMail.aspx/TipificacionesPrimarias';
        var params = { "idGrupoACD": idGrupo };
        $.ajax({
            type: "POST",
            url: ruta,
            data: JSON.stringify(params),
            contentType: "application/json; charset=utf-8",
            async: false,
            cache: false,
            timeout: 5000,
            success: function (data) {
                $("#SelTipificaciones").html(JSON.parse(data.d));
                $("#TipificacionPrimaria").css("display", "block");
            }
        });
    }
    else {
        $("#TipificacionPrimaria").css("display", "none");
        $("#TipificacionSecundaria").css("display", "none");
        $("#SelTipificaciones").html('');

    }
}

function CargaTipificacionesSecundarias() {
    $("#TipificacionSecundaria").css('display', 'block');
    const idPrimaria = $("#SelTipificaciones option:selected").val();
    if (idPrimaria === undefined || idPrimaria === '' || idPrimaria === "0") {
        alert("Debe seleccionar una tipificación primaria");
        return;
    }

    let strIds = ObtenerListaDeIdentificadores();

    if (!strIds.includes(','))
        idGrupo = $('#IdGrupo_' + strIds).val();
    else {
        idGrupo = ObtenerGrupoParaFinalizarRegistro(strIds);
        if (idGrupo && idGrupo === '-1') {
            alert("No se pueden seleccionar registros de diferentes grupos para finalizar");
            return;
        }
    }

    let ruta = getAbsolutePath() + '/BuscadorGestionesOffLineMail.aspx/TipificacionesSecundarias';
    var params = { "idGrupoACD": idGrupo, "idTipificacionPrimaria": idPrimaria };

    $.ajax({
        type: "POST",
        url: ruta,
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: false,
        cache: false,
        timeout: 5000,
        success: function (data) {
            $("#SelTipificacionesSec").html(JSON.parse(data.d));
        }
    });
}


function ObtenerGrupoParaFinalizarRegistro(ids) {
    let arrayIds = ids.split(',');
    let idGrupo = '-1';
    for (let i = 0; i < arrayIds.length; i++) {
        let id = arrayIds[i];
        let grupo = $('#IdGrupo_' + id).val();
        if (i === 0)
            idGrupo = grupo;
        else {
            if (idGrupo !== grupo)
                return '-1';
        }
    }
    return idGrupo;
}




// Lógica para redimensionar el panel
const resizer = document.querySelector('.resizer');
const sidePanel = document.getElementById('sidePanel');

resizer.addEventListener('mousedown', function (e) {
    e.preventDefault(); // Evita comportamientos no deseados

    // Coordenadas iniciales del mouse
    const startX = e.clientX;
    const startWidth = parseInt(document.defaultView.getComputedStyle(sidePanel).width, 10);

    // Función para redimensionar
    function resize(e) {
        const newWidth = startWidth + (startX - e.clientX); // Calcula el nuevo ancho
        sidePanel.style.width = `${newWidth}px`; // Aplica el nuevo ancho
    }

    // Detener la redimensión al soltar el mouse
    function stopResize() {
        window.removeEventListener('mousemove', resize);
        window.removeEventListener('mouseup', stopResize);
    }

    // Escuchar eventos de movimiento y soltar
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResize);
});

