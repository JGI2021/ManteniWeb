
let ReposReprogramacion = null;


class Resultado {
    constructor(codigo, nombre) {
        this.codigo = codigo;
        this.nombre = nombre;
    }
}
// Array con los resultados seleccionados. Son de tipclase Resultado
let arrResultados = [];


function GuardaYMuestraSeleccionado(rsid) {
    // obtengo el id del resultado. El id que me viene es rs_id
    let id = rsid.substr(3);
    // Ahora obtengo el nombre
    let nombre = $("#nombre_" + id).text();
    // Lo almaceno
    arrResultados.push(new Resultado(id, nombre));
    // Ahora lo genero en el formulario del cambio de grupo
    let licmd = "<li id='li_" + id + "' class='myli-item'> " +
                "    <div class='ancho-40'>" + id + "</div>" +
                "    " + nombre +
                "    <span class='fa fa-trash-o ml-15 dark-red-text posiciona-trash-o' onclick='DesmarcaResSeleccionado(\"li_" + id + "\")'></span>" +
                "</li>";
    $("#UlResultadosMarcados").append(licmd);
}


function DesmarcaResSeleccionado(rsid) {
    // obtengo el id del resultado. El id que me viene es rs_id
    let id = rsid.substr(3);
    // Busco en que posición está este resultado dentro del array
    let pos = arrResultados.findIndex(rs => rs.codigo === id);
    if (pos > -1) {
        arrResultados.splice(pos, 1);
    }
    // Elimino el registro en la ventana de seleccionados
    $("#li_" + id).remove();
    // Desmarco también el check
    let chck = document.getElementById("rs_" + id);
    if (chck) {
        chck.checked = false;
    }
    // Si ya se ha borrado todo lo seleccionado cerramos la ventana
    if (arrResultados.length === 0) {
        CerrarPanelCambioResultados();
    }
}


function CambiaDatosFranja() {
    // Obtengo el valor de la franja seleccionada
    let idfranja = $("#SelectFranjaHoraria_F").val();

    let urlFranja = getRutaAbsolutaMVC() + "/FranjaHoraria/ObtenerFranja/" + idfranja;

    $.ajax({
        type: "GET",
        url: urlFranja,
        contentType: "application/json; charset=utf-8",
        success: function (datos) {
            $("#PanelFranjasHorarias").html(datos);
        }, error: function (e) { console.log(e); }
    });
}

function MostrarOcultarResultados(idfila) {
    // Si está marcado como no mostrar, entonces muestro la fila. Si es al revés la oculto
    if ($("#" + idfila).hasClass("no-display")) {
        $("#" + idfila).removeClass("no-display")
    }
    else {
        $("#" + idfila).addClass("no-display")
    }
}


function CheckResultadoMarcado(id) {
    let total = 0;
    // Obtengo todos los inputs
    let check = document.getElementById(id);
    if (check && check.checked) {
        total = 1;
    }

    return total;
}

function CerrarPanelCambioResultados() {
    $("#PanelCambioDeGrupo").css('display', 'none');
    $("#UlResultadosMarcados").html('');
    arrResultados = [];
    // Si queda algún check marcado lo desmarco
    let checks = document.getElementsByClassName("resultcheck");
    if (checks && checks.length > 0) {
        for (let i = 0; i < checks.length; i++) {
            let check = checks[i];
            if (check && check.checked) {
                check.checked = false;
            }
        }
    }
}


/// ------------------------------------------------------------------------------
/// Todos los resultados seleccionados se cambiarán al nuevo grupo seleccionado
/// ------------------------------------------------------------------------------
function AplicarCambioResultdado(id) {
    // Obtenfo el resultado al que se quieren mover los seleccionados
    let resultadoGrupo = parseInt($("#SeleccionarGrupoRes").val());
    // Paso el resultado del repositorio a entero
    let idFranja = parseInt(id);

    let params = { "idFranja": idFranja, "resultadoGrupo": resultadoGrupo, "arrResultados": arrResultados };

    let url = getRutaAbsolutaMVC() + "/Reprogramaciones/CambiarResultadosGrupo"

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        success: function (datos) {
            let datosVista = JSON.parse(datos);

            MostrarMensajeRespuesta(datosVista);
            $("#VistaResultadosTelefonicos").html(datosVista.partialview);
            CerrarPanelCambioResultados();
        }, error: function (e) { console.log(e); }
    });

}

/// --------------------------------------------------------------------------------
/// Guarda todos los cambios realizados sobre la reprogramación
/// --------------------------------------------------------------------------------
function GuardarDatos(salir) {
    // Activo el spinne
    MuestraOcultaBotonesCarga(0);

    let url = getRutaAbsolutaMVC() + "/Reprogramaciones/GuardarReprogramacion";

    let reprogramacionesTmp = { ...ReposReprogramacion };
    // Le quito los resultado telefónicos
    reprogramacionesTmp.LsRsTelefonicos = [];

    // Solo paso los grupos de resultados que son los que se cambian
    reprogramacionesTmp.LsRsTelefonicos = ReposReprogramacion.LsRsTelefonicos.filter(rs => rs.Id_grupo_resultado === null || rs.Id_grupo_resultado === "");

    let params = { "reprogramacion": reprogramacionesTmp };

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        success: function (datos) {
            MuestraOcultaBotonesCarga(1);
            let repuesta = JSON.parse(datos);
            // Desmarco lo que se ha cambiado
            DesmarcarCamposCambiados();
            // Muestra mensaje en campo alerta
            MostrarMensajeRespuesta(repuesta)
            if (salir === 1) {
                RetrocederPaginaMVC();
            }
        }, error: function (e) { console.log(e); }
    });
}


function MuestraOcultaBotonesCarga(muestra) {
    if (muestra === 0) {
        $("#LoadSpinner").css('display', 'inline-block');
        $("#BbotonAceptarF").css('display', 'none');
        $("#BbotonAceptarGS").css('display', 'none');

    }
    else {
        $("#LoadSpinner").css('display', 'none');
        $("#BbotonAceptarF").css('display', 'inline-block');
        $("#BbotonAceptarGS").css('display', 'inline-block');
    }
    // Oculto los botones de guardar
    if (!$("#botoneraGuardar").hasClass("no-display")) {
        $("#botoneraGuardar").addClass("no-display");
    }
}

// Les quito el color azul que indica que se ha cambiado y pongo a false el campo
// HayCambio en el array
function DesmarcarCamposCambiados() {
    let marcados = document.getElementsByClassName("blue-text");
    if (marcados) {
        for (let i = 0; i < marcados.length; i++) {
            let elemento = marcados[i];
            $("#" + elemento.id).removeClass("blue-text");
        }
    }

    for (let j = 0; j < ReposReprogramacion.LsRsTelefonicos.length; j++) {
        if (ReposReprogramacion.LsRsTelefonicos[j].HayCambio) {
            ReposReprogramacion.LsRsTelefonicos[j].HayCambio = false;
        }
    }
}


/// ------------------------------------------------------------------------------------
/// Muestra un mensaje si todo ha ido bien o si ha fallado
/// ------------------------------------------------------------------------------------
function MostrarMensajeRespuesta(datosVista) {
    //muestro el mensaje de error o de que todo ha ido bien
    if (datosVista.MostrarMensaje) {
        if (datosVista.Error == "S") {
            $("#panelResultado").removeClass("myAlertSuccess");
            $("#panelResultado").addClass("panel-danger");
            $("#panelmensajeResultado").html("<b><span class='fa fa-exclamation-triangle' style='font-size:26px;'> Error</span> </b><span class='mr-15'></span>" + datosVista.Mensaje);
        }
        else {
            $("#panelResultado").addClass("myAlertSuccess");
            $("#panelResultado").removeClass("panel-danger");
            $("#panelmensajeResultado").html("<b> <span class='fa fa-check-square-o fondoAlert' > </span> </b><span class='mr-15'></span>" + datosVista.Mensaje);

        }

        $('#alertaResultado').css('display', 'block');
        window.setTimeout(function () {
            $('#alertaResultado').css('display', 'none');
        }, 4000);
    }
}


function CerrarPanelFranjas() {
    if ($("#panelFranjas").hasClass("in")) {
        $("#panelFranjas").removeClass("in");
    }
}



function GuardaDatoReprogramacionModificado(id) {
    // Miro que tipo de campo se ha modificado
    let pos = id.indexOf("_");
    let campo = id.substring(0, pos);
    // Obtengo el id del resultado
    let idresult = id.substr(pos + 1);

    let valor = $("#" + id).val();
    // Si el identificador son los campos generales como el nombre, la franja global o el número de intentos
    if (idresult === 'F') {
        if (campo === 'ReprogNombre') {
            ReposReprogramacion.Nombre = valor;
        }
        else if (campo === 'TotResNegativo') {
            ReposReprogramacion.MaxLlamadasResultadoNegativo = valor;
        }
        else if (campo === 'SelectFranjaHoraria') {
            ReposReprogramacion.IdRepoFranjaHoraria = valor;
        }
    }
    else {
        // obtengo los datos del resultado que se va a modificar
        let registro = ReposReprogramacion.LsRsTelefonicos.find(rs => rs.Id_resultado_telefonico === idresult)
        if (registro) {
            if (campo === 'peso') {
                registro.Nuevo_peso_telefono = valor;
            }
            else if (campo === 'llamadas') {
                registro.Max_llamadas = valor;
            }
            else if (campo === 'prioridad') {
                registro.Nueva_prioridad_contacto = valor;
            }
            else if (campo === 'idfranja') {
                registro.IdRepoFranjaHoraria = parseInt(valor);
            }
            else if (campo === 'dias' || campo === 'horas') {
                // Obtengo los días
                let dias = $("#dias_" + idresult).val();

                registro.Dias = parseInt(dias);
                // Obtengo horas , minutos y segundos
                let tiempo = $("#horas_" + idresult).val();
                registro.Horas = parseInt(tiempo.substr(0, 2));
                registro.Minutos = parseInt(tiempo.substr(3, 2));
                registro.Segundos = parseInt(tiempo.substr(6, 2));
            }
            registro.HayCambio = true;
        }
    }
}

function MostrarOcultarElementosAsociados() {
    if ($("#PanelAsociados").hasClass("no-display")) {
        $("#PanelAsociados").removeClass("no-display");
    }
    else {
        $("#PanelAsociados").addClass("no-display");
    }
}