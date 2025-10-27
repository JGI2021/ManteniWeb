

var semana = null;    // Contendrá el horario semanal
/*var mensajes = null;  // Contendrá todos los mensajes de fuera de horario*/

class Dia {
    constructor(dia, horario) {
        this.dia = dia;           // Dia de la semana L, M, X, J, V, S , D
        this.horario = horario;   // EL horario de ese día por medis horas
    }
}


// Contendrá los días sobre los que se realizarán los cambios ,Lunes = 1 hasta Domingo = 7. ej [2,3] están seleccionados el Martes y el Miércoles
let diasSeleccionados = [];
// Guarda la seleccion de horario que se ha reaizado y que luego se aplicará a los días seleccionados
let horarioGeneralSeleccionado = [];
// solo almcenará un horario en particular. Se usa para mostrar los horarios cuando se seleccionan varios días sin que se fusionen en uno
let horarioParticular = [];

class TramoHorario {
    constructor(desde, hasta) {
        this.desde = parseInt(desde, 10);
        this.hasta = parseInt(hasta, 10);
    }
}



function MarcarDesmarcarTodosChecks() {
    let checkTodos = document.getElementById("H_T");

    let inputs = document.getElementsByClassName('DiaCheck');
    for (let index = 0; index < inputs.length; index++) {
        // Si está marcado, marco todos los checks
        if (checkTodos.checked) {
            inputs[index].checked = true;
        }
        else {

            inputs[index].checked = false;
        }
    }
    MostrarHorario();
}


/// ------------------------------------------------------------------------------------------
/// Muestrael panel de selección de horas.
/// Si solo hay un día seleccionado muestra el horario de ese día
/// si hay más de un día se muestra en blanco y los cambios se aplicarán a lo seleccionado
/// ------------------------------------------------------------------------------------------
function MostrarHorario() {
    let totalDiasSeleccionados = HayDiasSeleccionados();

    if (totalDiasSeleccionados > 0) {
        $("#PanelHoras").css("display", "block");
        PreparaPanelHorario();
    }
    else {
        $("#PanelHoras").css("display", "none");
    }
}

/// ------------------------------------------------------------
/// Devuelve el número de días que se han marcado con el check
/// ------------------------------------------------------------
function HayDiasSeleccionados() {
    let index;
    let total = 0;
    // Obtengo todos los inputs
    let inputs = document.getElementsByClassName('DiaCheck');
    for (index = 0; index < inputs.length; index++) {
        // añado el id del que está marcado
        if (inputs[index].checked && inputs[index].id !== "H_T") {
            total++;
        }
    }
    return total;
}



/// --------------------------------------------------------------------------
///
/// --------------------------------------------------------------------------
function PreparaPanelHorario() {
    // vacio el horario seleccionado
    VaciaHorarioSeleccionado();

     MostrarDiasSeleccionados()
}


function MostrarDiasSeleccionados() {
    let idsDiasSeleccionados = [];
    idsDiasSeleccionados = DamediasSeleccionados();

    for (let i = 0; i < idsDiasSeleccionados.length; i++) {
        let idDia = idsDiasSeleccionados[i];

        // Obtengo el horario del día para saber si es de campaña, sin servicio o un horario
        let dia = semana.Horariodias.find(d => d.IdDiaSemana === idDia);
        if (dia.SinServicio) {
            SinServicio();
        }
        else {
            PasarHorarioAParticularYSeleccionado(idDia);
            // Pngo el panel de horas
            LimpiarYMostrarPanelHoras();
            GeneraListadoHorarioParticular();
            hayHorarioPropio = true;
        }
    }
}

function LimpiarYMostrarPanelHoras() {
    // Vacío lo que hubiese de horario seleccionado
    $("#ListHorarioSeleccionado").html("");

    $("#SeleccionHorario").css("display", "block");
    $("#HorarioSeleccionado").css("display", "block");
    var checkHoras = document.getElementById("chkFechas");
    // Hacemos que aparezca marcado el check de horas
    if (!checkHoras.checked)
        checkHoras.checked = true;
    // Inicializo los combos desde hasta al primer valor de su combo
    $("#HoraDesde").prop("selectedIndex", 0);
    $("#HoraHasta").prop("selectedIndex", 0);
}


/// --------------------------------------------------------------------------
/// Obtenemos los días que han sido seleccionados, es decir, los que están 
/// marcados con un check. Se guardan en un array de datos
/// --------------------------------------------------------------------------
function DamediasSeleccionados() {
    let index;
    let diasSeleccionados = [];
    // Obtengo todos los inputs
    let inputs = document.getElementsByClassName('DiaCheck');
    for (index = 0; index < inputs.length; ++index) {
        // añado el id del que está marcado
        if (inputs[index].checked && inputs[index].id !== "H_T") {
            let idDia = parseFloat(inputs[index].id.substr(2));
            diasSeleccionados.push(idDia);
        }
    }
    return diasSeleccionados;
}


/// ---------------------------------------------------------------------------------------------
/// Toma las fechas seleccionadas del combo y las valida. Luego las añade en el array de datos
/// seleccionados y lo mete dentro de un tramo horario que se visualiza debajo
/// ---------------------------------------------------------------------------------------------
function AddHorario() {
    let horadesde = parseInt($("#HoraDesde option:selected").val());
    let horahasta = parseInt($("#HoraHasta option:selected").val());

    if (horadesde >= horahasta) {
        alert("La hora hasta tiene que ser mayor que la hora desde");
        return;
    }
    // Relleno el horario que se haya seleccionado en el filtro
    RellenaHorarioSeleccionado(horadesde, horahasta, 1);
    // Genera Listado de los horarios definidos
    GeneraListadoHorario();
}


// -------------------------------------------------------------------------------------------
// Genera el horario que se va a mostrar a partir de la tabla horarioGeneralSeleccionado
// esto hace que si dos doharios tienen horas en común se genere un tramo solo en vez de dos
// por ejemplo:  00:00 a 06:00 y 02:00 a 08:00 generaría un solo tramo de 00:0 a 08:00
// -------------------------------------------------------------------------------------------
function GeneraListadoHorario() {
    $("#ListHorarioSeleccionado").html("");

    // Obtengo los tramos horarios
    let tramosHorarios = [];
    tramosHorarios = ObtenerTramosHorariosGeneral();

    if (tramosHorarios.length > 0) {
        let li = " <li class='list-group-item list-group-item-info'><b>Horario(s) seleccionado(s)</b></li> ";

        // Para cada tramo horario genero un grupo de visualización en la lista
        for (let i = 0; i < tramosHorarios.length; i++) {
            let tramo = tramosHorarios[i];

            li += "<li class='list-group-item reg-horario' id='Ho_" + i + "'> " + TextoTramoHorario(tramo.desde, tramo.hasta) +
                "   <span class='glyphicon glyphicon-trash floatRight' style='color:darkred; cursor:pointer;' " +
                "          onclick = 'EliminaTramoHorario(" + tramo.desde + "," + tramo.hasta + ", \"Ho_" + i + "\")' ></span > " +
                "   <input type='hidden' class='lihorario' id='li_" + i + "' value='" + tramo.desde + "," + tramo.hasta+"' />";
                "</li > ";
        }
        // Añadimos los tramos creados
        $("#ListHorarioSeleccionado").html(li);
    }
}


// -----------------------------------------------------------------------------------
// Genera el horario de los tramos particulares que se generan cuando se seleccionan
// varios días con un horario
// ------------------------------------------------------------------------------------
function GeneraListadoHorarioParticular() {
    $("#ListHorarioSeleccionado").html("");

    // Obtengo los tramos horarios
    let tramosHorarios = [];
    tramosHorarios = ObtenerTramosHorariosParticular();

    if (tramosHorarios.length > 0) {
        let li = " <li class='list-group-item list-group-item-info'><b>Horario(s) seleccionado(s)</b></li> ";

        // Para cada tramo horario genero un grupo de visualización en la lista
        for (let i = 0; i < tramosHorarios.length; i++) {
            let tramo = tramosHorarios[i];

            li += "<li class='list-group-item reg-horario' id='Ho_" + i + "'> " + TextoTramoHorario(tramo.desde, tramo.hasta) +
                "   <span class='glyphicon glyphicon-trash floatRight' style='color:darkred; cursor:pointer;' " +
                "          onclick = 'EliminaTramoHorario(" + tramo.desde + "," + tramo.hasta + ", \"Ho_" + i + "\")' ></span > " +
                "   <input type='hidden' class='lihorario' id='li_" + i + "' value='" + tramo.desde + "," + tramo.hasta + "' />";
                "</li > ";
        }
        // Añadimos los tramos creados
        $("#ListHorarioSeleccionado").html(li);
    }
}

/// ----------------------------------------------------------------------------------
/// Devuelve los diferentes tramos horarios activos que hay en el array de horario
/// seleccionado
/// ----------------------------------------------------------------------------------
function ObtenerTramosHorariosGeneral() {
    let hIni = 0;
    let hFin = 0;
    let bTramo = false;
    let tramosHorarios = [];

    // Obtengo los diferentes tramos de actividad horaria
    for (let i = 0; i < 48; i++) {

        if (horarioGeneralSeleccionado[i] === 1 && !bTramo) {
            bTramo = true;
            hIni = i;
            hFin = i + 1;
        }
        else if (horarioGeneralSeleccionado[i] === 1 && bTramo) {
            hFin = i + 1;
        }
        else if (horarioGeneralSeleccionado[i] === 0 && bTramo) {
            bTramo = false;
            tramosHorarios.push(new TramoHorario(hIni, hFin));
        }
    }

    // Sigue el tramo abierto y ya ha finalizao, eso indica que el tramo acaba al final del día
    if (bTramo) {
        tramosHorarios.push(new TramoHorario(hIni, 48));
    }

    return tramosHorarios;
}



/// ----------------------------------------------------------------------------------
/// Devuelve los diferentes tramos horarios activos que hay en el array de horario
/// seleccionado
/// ----------------------------------------------------------------------------------
function ObtenerTramosHorariosParticular() {

    let tramosHorarios = [];

    // Obtengo los diferentes tramos de actividad horaria
    for (let j = 0; j < horarioParticular.length; j++) {
        let hIni = 0;
        let hFin = 0;
        let bTramo = false;

        let horario = horarioParticular[j];
        for (let i = 0; i < 48; i++) {
            if (horario[i] === 1 && !bTramo) {
                bTramo = true;
                hIni = i;
                hFin = i + 1;
            }
            else if (horario[i] === 1 && bTramo) {
                hFin = i + 1;
            }
            else if (horario[i] === 0 && bTramo) {
                bTramo = false;

                if (!ExisteTramoParticular(hIni, hFin, tramosHorarios)) {
                    tramosHorarios.push(new TramoHorario(hIni, hFin));
                }
            }           
        }
        // Sigue el tramo abierto y ya ha finalizao, eso indica que el tramo acaba al final del día
        if (bTramo && !ExisteTramoParticular(hIni, hFin, tramosHorarios)) {
            tramosHorarios.push(new TramoHorario(hIni, 48));
        }
    }

    return tramosHorarios;
}

// -------------------------------------------------------------------
// Comprueba si ya existe un tramo horario de particular que ya tenga ese tramo
// horario. So lo tiene devuelve true sino false 
// -------------------------------------------------------------------
function ExisteTramoParticular(ini, fin, tramos) {

    if (tramos) {

        let tramo = tramos.find(tr => tr.desde === ini && tr.hasta === fin);

        if (tramo)
            return true;
        else
            return false;
    }
    return false;

}


/// -------------------------------------------------------------------------
/// Devuelve en texto el tramo horario desde un valor hasta otro
/// -------------------------------------------------------------------------
function TextoTramoHorario(desde, hasta) {
    let resultado = "";
    let auxminvalue = Math.trunc(desde / 2);
    let auxmaxvalue = Math.trunc(hasta / 2);

    resultado = " " + auxminvalue;
    if (desde % 2 === 0) {
        resultado += ":00";
    }
    else {
        resultado += ":30";
    }

    if (hasta % 2 !== 0) {
        resultado += " a " + auxmaxvalue + ":30 ";
    }
    else {
        resultado += " a " + auxmaxvalue + ":00";
    }

    return resultado;
}




/// ----------------------------------------------------------------------
/// Se marca el día sin servicio. No se trabaja. Se limpian
/// el array de horario seleccionado y se oculta la selección de horario
/// ----------------------------------------------------------------------
function SinServicio() {
    // Si está marcado oculto paneles y sino los muestro
    let checkbox = document.getElementById("ChkSinServicio");
    if (checkbox.checked) {
        // Oculto los otros paneles salvo el botón de aplicar ya que no hay nada más que añadir
        $("#SeleccionHorario").css("display", "none");
        $("#HorarioSeleccionado").css("display", "none");
        // Elimina los horarios que huviese seleccionados
        VaciaHorarioSeleccionado();
        // Vacío el listado de periodos
        $("#ListHorarioSeleccionado").html("");
    }
    else {
        $("#SeleccionHorario").css("display", "block");
        $("#HorarioSeleccionado").css("display", "block");
    }
}

function ActivaDesactivaSeleccionFechas() {
    $("#SeleccionHorario").css("display", "block");
    $("#HorarioSeleccionado").css("display", "block");
}


function HorarioSubsistema() {
    let checkbox = document.getElementById("ChkHorarioSubsistema");
    if (checkbox.checked) {
        // Oculto los otros paneles salvo el botón de aplicar ya que no hay nada más que añadir
        $("#SeleccionHorario").css("display", "none");
        $("#HorarioSeleccionado").css("display", "none");
        // Elimina los horarios que huviese seleccionados
        VaciaHorarioSeleccionado();
        // Vacío el listado de periodos
        $("#ListHorarioSeleccionado").html("");
    }
    else {
        $("#SeleccionHorario").css("display", "block");
        $("#HorarioSeleccionado").css("display", "block");
    }
}



/// -----------------------------------------------------------------------------
/// Cierra el formulario de selección de horario y desmarca todos los checks
/// -----------------------------------------------------------------------------
function CerrarFormulario() {
    // oculta panel
    $("#PanelHoras").css("display", "none");
    // Vacio lo seleccionado
    VaciaHorarioSeleccionado();
    // desmarca checks
    let inputs = document.getElementsByTagName('input');
    for (index = 0; index < inputs.length; ++index) {
        // añado el id del que está marcado
        if (inputs[index].checked) {
            inputs[index].checked = false;
        }
    }
}


/// ------------------------------------------------------------
/// Se elimina el tramo horario seleccionado. Se refleja en el
/// array de horarioseleccionado y luego se elimina del listado
/// de grupos de horarios
/// ------------------------------------------------------------
function EliminaTramoHorario(desde, hasta, id) {
    // Elimino los datos de ese tramo
    RellenaHorarioSeleccionado(desde, hasta, 0);

    $('#' + id).remove();

    let totregs = document.getElementsByClassName('reg-horario');
    if (totregs === null || totregs === 'undefined' || totregs.length === 0) {
        $("#ListHorarioSeleccionado").html("");
    }
    // Regenero los tramos que se muestran
    ////    GeneraListadoHorario();
}


/// ------------------------------------------------------
/// Pone el array del horario seleccionado todo a 0
/// ------------------------------------------------------
function VaciaHorarioSeleccionado() {
    horarioGeneralSeleccionado = [];

    for (let i = 0; i <= 47; i++) {
        horarioGeneralSeleccionado.push(0);
    }

    horarioParticular = [];
}

/// ------------------------------------------------------------------------
/// Marca el horario seleccinado desde una tramo hasta otro y lo pone
/// activo o no en funcíón del valor que venga en el parámetro resultado
/// ------------------------------------------------------------------------
function RellenaHorarioSeleccionado(desde, hasta, resultado) {
    let idx;

    for (idx = desde; idx < hasta; idx++) {
        horarioGeneralSeleccionado[idx] = resultado;
    }
}

/// -----------------------------------------------------------------------
/// Se ha pulsado aplicar horario. Se salva el horario en el array semanal, 
/// sobre los días que se ha seleccionado y se cierra el formulario
/// -----------------------------------------------------------------------
function AplicarHorario() {
    // Miro si hay periodos, en ese caso tomo lo que hay en horarioGeneralSeleccionado, sino se aplica a horario seleccionado
    // tampoco puede estar marcado como sin servicio
    let chkSinServicio = document.getElementById("ChkSinServicio");
    let chkHorarioSubsistema = document.getElementById("ChkHorarioSubsistema");

    // Horario que se va a enviar
    let horario = [];

    // Busco los li para saber si se ha añadido periodos
    var lis = document.getElementById("ListHorarioSeleccionado").getElementsByTagName("li");

    if (!chkSinServicio.checked) {
        if (lis.length === 0) {
            AddHorario();
        }
        PreparaHorariosSeleccionado();
        horario = horarioGeneralSeleccionado.slice();
    }
    else if (chkSinServicio.checked) {
        // relleno todo a cero
        RellenaHorarioSeleccionado(0, 48, 0)
        horario = horarioGeneralSeleccionado.slice();
    }

    // Modificamos el horario de la semana, para ello primero necesitamos saber que días hay que modificar
    let diasSeleccionados = [];
    diasSeleccionados = DamediasSeleccionados();

    // Url
    let url = getRutaAbsoluta();

    let modificacion = {
        "DiasSeleccionados": diasSeleccionados,
        "HorarioSeleccionado": horario,
        "Semanal": semana
    };

    //Parámetros
    let params = { "modificacion": modificacion };

    $.ajax({
        type: "POST",
        url: url + "/Horario/ActualizarHorarioRepositorio",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: false,
        cache: false,
        timeout: 5000,
        success: function (resultado) {
            semana = JSON.parse(resultado);
            // Cambio el horario en los días seleccionados
            for (let i = 0; i < diasSeleccionados.length; i++) {
                let idDia = diasSeleccionados[i];
                let horarioDia = semana.Horariodias.find(d => d.IdDiaSemana == idDia);
                if (horarioDia != null) {
                    $("#lbl_" + idDia).text(horarioDia.TextoHorario);
                    if (horarioDia.TextoHorario.toUpperCase().includes("SIN SERVICIO")) {
                        $("#lbl_" + idDia).css('color', 'red');
                    }
                    else {
                        $("#lbl_" + idDia).css('color', '#0c482a');
                    }
                }
            }
        }
    });

    CerrarFormulario();
}




/// ----------------------------------------------------------
/// Copia los datos del del día al array de diaseleccionado,
// Solo se copian los días activos
/// ----------------------------------------------------------
function PasarHorarioAParticularYSeleccionado(idDia) {
    // obtengo el dia de la semana
    let dia = semana.Horariodias.find(d => d.IdDiaSemana == idDia);

    // si existe, copio los datos
    if (dia != null) {

        let horario = [];

        // El particular primero lo vacío
        for (let i = 0; i < 48; i++) {
            horario[i] = 0;
        }

        for (let j = 0; j < 48; j++) {
            if (dia.Mh[j] === "1") {
                // Relleno el seleccionado para tener el horario global
                horarioGeneralSeleccionado[j] = parseInt(dia.Mh[j]);
                // Relleno el particular
                horario[j] = parseInt(dia.Mh[j]);
            }
        }

        horarioParticular.push(horario);
    }
}



/// -------------------------------------------------------------------
/// Guarda los datos en la base de datos.
/// Se realiza un post con los datos modificados de la semana
/// -------------------------------------------------------------------
function GuardarDatos(salir) {
    let url = getRutaAbsoluta();

    let params = { "horariosemanal": semana };

    $.ajax({
        type: "POST",
        url: url + "/Horario/GuardaHorarioRepositorio",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: false,
        cache: false,
        timeout: 5000,
        success: function (resultado) {
            const respuesta = JSON.parse(resultado);
            if (respuesta.error === "S") {
                $('#alerta').removeClass('myAlertSuccess');
                $('#alerta').addClass('alert-danger');
                $('#alert-mensaje').html("<b><span class='fa fa-exclamation-triangle' style='font-size:26px;' >Error</span> </b><span class='mr-15'></span>" + respuesta.mensaje);
            }
            else {
                /// Mostramos mensaje de que todo se ha actualizado perfectamente
                $('#alert-mensaje').html("<b><span class='fa fa-check-square-o fondoAlert' > </span> </b><span class='mr-15'></span> El horario semanal se ha actualizado correctamente");
                $('#alerta').removeClass('alert-danger');
                $('#alerta').addClass('myAlertSuccess');
                // Como todo ha ido bien pongo a false los días actualizados
                for (let i = 0; i < 7; i++) {
                    let dia = semana.Horariodias.find(d => d.IdDiaSemana == i);
                    if (dia !== null && dia !== undefined) {
                        dia.Actualizar = false;
                    }
                }
            }
            // Se muestra el panel que indica si ha ido bien o si ha fallado
            $('#alerta').css('display', 'block');
            // Se mantien por 6 segundos, luego se quita
            setTimeout(function () { $('#alerta').css('display', 'none'); }, 4000);
        }
    });

    if (salir == 1) {
        RetrocederPaginaMVC();
    }

}


function CloseAlert() {
    $('#alerta').css('display', 'none');

}


function PreparaHorariosSeleccionado() {
    // Tomo todos los inputs de horario para obtener el valor desde y hasta de sus fechas para pasarlo al horario seleccionado;
    let inps = document.getElementsByClassName("lihorario");
    if (inps && inps.length > 0) {
        // Pongo el horario seleccionado a cero porque se lo voy a pasar
        RellenaHorarioSeleccionado(0, 48, 0);

        for (let i = 0; i < inps.length; i++) {
            let valor = inps[i].value;
            let arrValor = valor.split(',');
            let desde = parseInt(arrValor[0]);
            let hasta = parseInt(arrValor[1]);
            RellenaHorarioSeleccionado(desde, hasta, 1);
        }
    }

}


function GuardaDescripcion() {
    // Obtengo el valor del campo descripción de horario
    let descripcion = $('#NombreHorario').val();
    // Ahora lo guardo en la clase
    semana.Descripcion = descripcion;
}
