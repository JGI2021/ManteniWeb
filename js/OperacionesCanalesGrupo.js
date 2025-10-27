class DatosOperacionCanal {
    constructor(canalId) {
        this.CanalId = canalId,            
        this.EsperaProgramaId = '',
        this.ColaTransferProgramaId = '',
        this.RingBackProgramaId = '',
        this.HoldProgramaId = '',
        this.ColaSalienteProgramaId = '',
        this.DistribucionProgramaId = '',
        this.IdentificarClienteOperacion = '',
        this.FinalGestionOperacion = '',
        this.LlamadaSalienteOperacion = ''
    }
}



/// --------------------------------------------------------------
/// 
function AsociaOperacionACanal(idElem) {
    // en el id se identifica el tipo y el canal
    const tipo = idElem.substring(3, 11);
    // Ahora obtengo el canal
    const canal = idElem.substr(12);
    let iCanal = 0;

    if (canal && canal !== '') {
        iCanal = parseInt(canal);
    }

    // Cambio la etiqueta de color para indicar que se ha cambiado
    let labelid = 'lb' + idElem.slice(2);
    $('#' + labelid).css('color', '#0275d8');

    // Miro si existe ese canal y tipo en el array
    let dato = g_arrDatosCanal.find(c => c.CanalId === iCanal);
    if (!dato) {
        g_arrDatosCanal.push(new DatosOperacionCanal(canal));
        dato = g_arrDatosCanal.find(c => c.CanalId === iCanal);
        // Obtengo todos los ids que hay para ese canal
        dato.IdentificarClienteOperacionId = $('#sl-opInicio-' + canal).val();
        dato.FinalGestionOperacionId = $('#sl-opFinalz-' + canal).val();
        dato.LlamadaSalienteOperacionId = $('#sl_opSalien-' + canal).val();
    }

    // Obtenemos el id del programa a modificar
    const idProgramaId = $("#" + idElem).val();

    // Si existe 
    if (dato) {
        dato.HayDatosParaGrabar = true;

        switch (tipo) {
            case 'opInicio':
                dato.IdentificarClienteOperacionId = idProgramaId;
                break;

            case 'opFinalz':
                dato.FinalGestionOperacionId = idProgramaId;
                break;
            case 'opSalien':
                dato.LlamadaSalienteOperacionId = idProgramaId;

            default:
        }
    } 
}


function AsociaProgramaACanal(idElem) {
    // en el id se identifica el tipo y el canal
    const tipo = idElem.substring(3, 11);
    // Ahora obtengo el canal
    const canal = idElem.substr(12);
    let iCanal = 0;

    if (canal && canal !== '') {
        iCanal = parseInt(canal);
    }
    // Cambio laetiqueta de color paraindicar que se ha cambiado
    let labelid = 'lb' + idElem.slice(2);
    $('#' + labelid).css('color', '#0275d8');

    // Miro si existe ese canal y tipo en el array
    let dato = g_arrDatosCanal.find(c => c.CanalId === iCanal);
    if (!dato) {
        g_arrDatosCanal.push(new DatosOperacionCanal(iCanal));
        dato = g_arrDatosCanal.find(c => c.CanalId === iCanal);
        // Obtengo todos los ids que hay para ese canal
        dato.EsperaProgramaId = $('#sl-prEspera-' + canal).val();
        dato.ColaTransferProgramaId = $('#sl-prClTraf-' + canal).val();
        dato.HoldProgramaId = $('#sl-prLlHold-' + canal).val();
        dato.RingBackProgramaId = $('#sl-prRinbak-' + canal).val();
        dato.ColaSalienteProgramaId = $('#sl-prSalien-' + canal).val();
        dato.DistribucionProgramaId = $('#sl-prDistri-' + canal).val();
    }

    // Obtenemos el id del programa a modificar
    const idProgramaId = $("#" + idElem).val();

    // Si existe 
    if (dato) {
        dato.HayDatosParaGrabar = true;

        switch (tipo) {
            case 'prEspera':
                dato.EsperaProgramaId = idProgramaId;
                break;

            case 'prClTraf':
                dato.ColaTransferProgramaId = idProgramaId;
                break;

            case 'prLlHold':
                dato.HoldProgramaId = idProgramaId;
                break;

            case 'prRinbak':
                dato.RingBackProgramaId = idProgramaId;
                break;

            case 'prSalien':
                dato.ColaSalienteProgramaId = idProgramaId;
                break;

            case 'prDistri':
                dato.DistribucionProgramaId = idProgramaId;
                break;
            default:
                break;
        }
    }
}



/// -------------------------------------------------------------
/// Guardar los cambios de programa sobre los canales del grupo
/// -------------------------------------------------------------
function GuardarDatosCanalesGrupos(opcion, tipo) {

    let params = { "grupoId": g_datosGrupoACD.Codigo, 'canalOperacion': g_arrDatosCanal };
    console.log("Params: " + params);

    let grupoUrl = '';
    if (tipo !== 'operacion') {
        console.log("Post guardaGrupoProgramacion");
        grupoUrl = getRutaAbsolutaMVC() + "/Grupos/GuardaGrupoProgramaCanal";
    }
    else {
        console.log("Post GuardaGrupoOperacionCanal");
        grupoUrl = getRutaAbsolutaMVC() + "/Grupos/GuardaGrupoOperacionCanal"
    }

    $.ajax({
        type: "POST",
        url: grupoUrl,
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: false,
        cache: false,
        timeout: 5000,
        success: function (data) {
            console.log("success Post guardaGrupoProgramacion");

            if (data === null) {
                alert('Se ha producido guardar los cambios ');
                return;
            }
            //g_arrDatosCanal = [];
            if (opcion === 1) {
                RetrocederPaginaMVC();
            }
            $('#PanelOperaciones').html(data);

//            MostrarMensajeRespuesta(data);
            // Obtengo todos los registros que han cambiado y les vuelvo a poner el color normal
//            InicializaColorEtiquetas();
           
        }, error: function (e) { console.log(e); g_tablaTmkt = ""; }
    });

    
    
}


/// ---------------------------------------------------------------------
/// Muestra el mensaje de alerta y el mensaje de respuesta del servidor
/// ---------------------------------------------------------------------
//function MostrarMensajeRespuesta(data) {
//    const respuesta = JSON.parse(data);
//    if (respuesta) {
//        if (respuesta.Error === "S") {
//            $('#alerta').removeClass('alert-success');
//            $('#alerta').addClass('alert-danger');
//            $('#alert-mensaje').html(respuesta.Mensaje);
//        }
//        else {
//            /// Mostramos mensaje de que todo se ha actualizado perfectamente
//            $('#alert-mensaje').html(respuesta.Mensaje);
//            $('#alerta').removeClass('alert-danger');
//            $('#alerta').addClass('alert-success');
//        }
//    }
//    else {
//        console.log("No se puede hacer un parse de la respuesta, llega vacío.")
//    }

//    // Se muestra el panel que indica si ha ido bien o si ha fallado
//    $('#alerta').css('display', 'block');
//    // Se mantien por 6 segundos, luego se quita
//    setTimeout(function () {
//        $('#alerta').css('display', 'none');
//        // Si se ha pulsado guardar y salir        
//    }, 4000);
//}

/// -------------------------------------------------------------------------------------------
/// Cambia todas las etiquetas de los combos modificados y los vuelve a poner de color normal
/// para indicar que los cambios se han salvado
/// -------------------------------------------------------------------------------------------
//function InicializaColorEtiquetas() {
//    // Obtengo todos los registros que han cambiado y les vuelvo a poner el color normal
//    let labels = document.getElementsByClassName("lbProgramas");
//    if (labels && labels.length > 0) {
//        for (let i = 0; i < labels.length; i++) {
//            let label = labels[i];
//            label.style.color = "#000000";
//        }
//    }
//}