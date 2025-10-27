// Donde se van a almacenar los datos del modelo
let DatosFranja = null;


function GuardaDatoModificado(id) {
    // Si empieza por fr es un dato general de la franja
    if (id.includes("fr-")) {
        let nombrecampo = id.substring(3);
        GuardaDatosGeneralFranja(id, nombrecampo);
    }
    else if (id.includes("dt-")) {
        let iddetalle = id.substring(3);
        let endpos = iddetalle.indexOf("-");
        let nombrecampo = iddetalle.substr(endpos + 1);
        iddetalle = iddetalle.substring(0, endpos)
        GuardaDatosDetalleFranja(iddetalle, nombrecampo);
    }
}


function GuardaDatosGeneralFranja(id, nombrecampo) {
    if (DatosFranja === null) return;

    if (nombrecampo === "NombreFranja") {
        DatosFranja.NombreFranja = $("#" + id).val();
    }
    else if (nombrecampo === "NumeroReintentos") {
        DatosFranja.NumeroReintentos = $("#" + id).val();
    }
}

function GuardaDatosDetalleFranja(iddetalle, nombrecampo) {
    if (DatosFranja === null) return;

    let intIdDetalle = parseInt(iddetalle);

    let detalles = DatosFranja.DetalleFranjaHoraria;
    // Busco la franja detalle que hay que modificar
    let detalle = detalles.find(d => d.IdDetalle == intIdDetalle);
    if (detalle !== null && detalle != 'undefined') {

        let id = "dt-" + iddetalle + "-" + nombrecampo;

        if (nombrecampo === "DiaDelaSemana") {
            detalle.Dia = $("#" + id).val();
        }
        else if (nombrecampo === "HoraDesde") {
            detalle.HoraDesde = $("#" + id).val();
        }
        else if (nombrecampo === "HoraHasta") {
            detalle.HoraHasta = $("#" + id).val();
        }
        else if (nombrecampo === "DiaProximaLlamada") {
            detalle.DiaProximaLlamada = $("#" + id).val();
        }
        else if (nombrecampo === "HoraProximaLlamada") {
            detalle.HoraProximaLlamada = $("#" + id).val();
        }
    }
}


function AddDetalleFranja() {
    let urlFranja = getRutaAbsolutaMVC() + "/FranjaHoraria/AddFranjaDetalle";

    let params = ValidaYDevuelveDatos();
    if (params === null)
        return;

    DatosFranja.DetalleFranjaHoraria.push(params)

    $.ajax({
        type: "POST",
        url: urlFranja,
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        success: function (datos) {
            let datosVista = JSON.parse(datos)
            // Relleno los datos de la vista 
            $("#TablaDetallesFranja").html(datosVista.partialview);

            MostrarMensajeRespuesta(datosVista);
            if (!datosVista.hayError)
                MarcaRegistrosComoTocados();
        }, error: function (e) { console.log(e); }
    });
}


function AddFranja() {
    let urlFranja = getRutaAbsolutaMVC() + "/FranjaHoraria/AddFranja";

    let detallefranja = ValidaYDevuelveDatos();
    if (detallefranja !== null) {
        DatosFranja.DetalleFranjaHoraria.push(detallefranja)
    }
    else {
        if (DatosFranja.DetalleFranjaHoraria.length == 0)
            return;
    }

    $.ajax({
        type: "POST",
        url: urlFranja,
        data: JSON.stringify(DatosFranja),
        contentType: "application/json; charset=utf-8",
        success: function (datos) {
            let datosVista = JSON.parse(datos)
            // Relleno los datos de la vista 
            $("#TablaDetallesFranja").html(datosVista.partialview);
            // Obtengo el nuevo identificador de franja que se ha creado
            $("#IdFranjaHoraria").val(datosVista.aux1);
            DatosFranja.IdRepositorio = parseInt(datosVista.aux1);
            MostrarMensajeRespuesta(datosVista);
            if (!datosVista.hayError) {
                // deshabilita botonera de alta y habilita la de actualizar
                $("#botonAlta").css('display', 'none');
                $("#botonesActualizar").css('display', 'block');
                MarcaRegistrosComoTocados();
            }
        }, error: function (e) { console.log(e); }
    });

}



function ValidaYDevuelveDatos() {
    // Obtenemos los datos nuevos
    let dia = $("#DiaDelaSemana_N").val();
    let horadesde = $("#HoraDesde_N").val();
    let horahasta = $("#HoraHasta_N").val();
    let diasigllamada = $("#DiaProximaLlamada_N").val();
    let horasigllamada = $("#SiguieneHora_N").val();
    let idfranja = $("#IdFranjaHoraria").val();
    let mensaje = "";

    if (dia === null || (dia < 0 || dia > 6)) {
        mensaje = "No se ha seleccionado ningún día en la franja horaria";
    }
    else if (diasigllamada === null || (diasigllamada < 0 || diasigllamada > 6)) {
        mensaje = "No se ha selecciondo el día de siguiene llamada en lafranja";
    }
    else if (horadesde === "") {
        mensaje = "Debe poner la hora desde";
    }
    else if (horahasta === "") {
        mensaje = "Debe poner la hora hasta";
    }
    else if (horadesde >= horahasta) {
        mensaje = "La hora desde debe ser mayor que la hora hasta";
    }
    else if (dia === diasigllamada && horasigllamada !== null && horahasta > horasigllamada) {
        mensaje = "Si la siguiente llamada es el mismo día la hora debe ser mayor que la hora hasta";
    }

    if (mensaje !== "") {
        alert(mensaje);
        return null;
    }
    return {
        "IdRepositorio": idfranja, "Dia": dia, "HoraDesde": horadesde,
        "HoraHasta": horahasta, "DiaProximaLlamada": diasigllamada,
        "HoraProximaLlamada": horasigllamada, "NuevoRegistro": true,
        "Modificado": true
    };
}


function DevuelveDatosDetalle() {
    // Obtenemos los datos nuevos
    let dia = $("#DiaDelaSemana_N").val();
    let horadesde = $("#HoraDesde_N").val();
    let horahasta = $("#HoraHasta_N").val();
    let diasigllamada = $("#DiaProximaLlamada_N").val();
    let horasigllamada = $("#SiguieneHora_N").val();
    let idfranja = $("#IdFranjaHoraria").val();

    if (dia === null && diasigllamada === null)
        return null;

    return {
        "IdRepositorio": idfranja, "Dia": dia, "HoraDesde": horadesde,
        "HoraHasta": horahasta, "DiaProximaLlamada": diasigllamada,
        "HoraProximaLlamada": horasigllamada, "NuevoRegistro": true, 
        "Modificado": true
    };
}

function ValidaRegistros() {
    for (let i = 0; i < DatosFranja.DetalleFranjaHoraria.length; i++) {
        const detalle = DatosFranja.DetalleFranjaHoraria[i];

        let mensaje = "";

        if (detalle.Dia === null || (detalle.Dia < 0 || detalle.Dia > 6)) {
            mensaje = "No se ha seleccionado ningún día en la franja horaria";
        }
        else if (detalle.DiaProximaLlamada === null || (detalle.DiaProximaLlamada < 0 || detalle.DiaProximaLlamada > 6)) {
            mensaje = "No se ha selecciondo el día de siguiene llamada en lafranja";
        }
        else if (detalle.HoraDesde === "") {
            mensaje = "Debe poner la hora desde";
        }
        else if (detalle.HoraHasta === "") {
            mensaje = "Debe poner la hora hasta";
        }
        else if (detalle.HoraDesde >= detalle.HoraHasta) {
            mensaje = "La hora desde debe ser mayor que la hora hasta";
        }
        else if (detalle.Dia === detalle.DiaProximaLlamada && detalle.HoraProximaLlamada !== null && detalle.HoraHasta > detalle.HoraProximaLlamada) {
            mensaje = "Si la siguiente llamada es el mismo día la hora debe ser mayor que la hora hasta";
        }

        if (mensaje !== "") {
            const reg = i + 1;
            alert("Atención registro " + reg + ": " + mensaje);
            return false;
        }
    }

    return true;
}


////
function EliminaDetalleFranja(idDetalle) {
    let idfranja = parseInt($("#IdFranjaHoraria").val());
    let id = parseInt(idDetalle);

    let urlFranja = getRutaAbsolutaMVC() + "/FranjaHoraria/RemoveFranjaDetalle";
    let params = { "idfranja": idfranja, "id": id };

    $.ajax({
        type: "POST",
        url: urlFranja,
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        success: function (datos) {
            let datosVista = JSON.parse(datos)
            // Relleno los datos de la vista 
            $("#TablaDetallesFranja").html(datosVista.partialview);

            MostrarMensajeRespuesta(datosVista);
            if (!datosVista.hayError)
                MarcaRegistrosComoTocados();

        }, error: function (e) { console.log(e); }
    });
}

/// Actualiza los datos de la frana en base de datos
function GuardarDatos(salir) {
    
    let detallefranja = DevuelveDatosDetalle();
    if (detallefranja !== null) {
        DatosFranja.DetalleFranjaHoraria.push(detallefranja)
    }

    if (!ValidaRegistros())
        return;

    let urlFranja = getRutaAbsolutaMVC() + "/FranjaHoraria/ActualizarFranjaHoraria";

    $.ajax({
        type: "POST",
        url: urlFranja,
        data: JSON.stringify(DatosFranja),
        contentType: "application/json; charset=utf-8",
        success: function (datos) {
            let datosVista = JSON.parse(datos)
            // Relleno los datos de la vista 
            $("#TablaDetallesFranja").html(datosVista.partialview);            

            MostrarMensajeRespuesta(datosVista);
            if (!datosVista.hayError)
                MarcaRegistrosComoTocados();
            
            if (salir === 1) {
                RetrocederPaginaMVC();
            }

        }, error: function (e) { console.log(e); }
    });

}


function MostrarMensajeRespuesta(datosVista) {
    //muestro el mensaje de error o de que todo ha ido bien
    if (datosVista.mostrarMensaje) {
        if (datosVista.hayError) {
            $("#panelfranja").removeClass("myAlertSuccess");
            $("#panelfranja").addClass("panel-danger");
            $("#panelmensajefranja").html("<b><span class='fa fa-exclamation-triangle' style='font-size:26px;' >Error</span> </b><span class='mr-15'></span>" + datosVista.mensaje);
        }
        else {
            $("#panelfranja").addClass("myAlertSuccess");
            $("#panelfranja").removeClass("panel-danger");
            $("#panelmensajefranja").html("<b><span class='fa fa-check-square-o fondoAlert' > </span> </b><span class='mr-15'></span>" + datosVista.mensaje);
        }

        $('#alertaFranja').css('display', 'block');
        window.setTimeout(function () {
            $('#alertaFranja').css('display', 'none');
        }, 4000);
    }
}


function CambiaDato(idReg, idCampo, campo) {
    // busca registro
    let detalle = DatosFranja.DetalleFranjaHoraria.find(dt => dt.IdDetalle === idReg);
    if (detalle !== null) {
        const valor = $("#" + idCampo).val();

        if (campo === 'dia')
            detalle.Dia = valor;
        else if (campo === 'horaD')
            detalle.HoraDesde = valor;
        else if (campo === 'horaH')
            detalle.HoraHasta = valor;
        else if (campo === 'diaProx')
            detalle.DiaProximaLlamada = valor;
        else if (campo === 'horaProx')
            detalle.HoraProximaLlamada = valor;
        detalle.Modificado = true;
    }
}

function MarcaRegistrosComoTocados() {
    for (let i = 0; i < DatosFranja.DetalleFranjaHoraria.length; i++) {
        let detalle = DatosFranja.DetalleFranjaHoraria[i];
        detalle.Modificado = false;
        detalle.NuevoRegistro = false;
    }
}
