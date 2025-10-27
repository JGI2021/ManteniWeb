
function CambiaCampo(campo) {
    g_datosContacto.Modificado = true;

    switch (campo) {
        case 'prioridad':
            g_datosContacto.Prioridad = $('#' + campo).val();
            break;
        case 'peso':
            g_datosContacto.Peso = $('#' + campo).val();
            break;
        case 'valor1':
            g_datosContacto.Valor1 = $('#' + campo).val();
            break;
        case 'valor2':
            g_datosContacto.Valor2 = $('#' + campo).val();
            break;
        case 'estado':
            const estado = $('#' + campo).val();
            g_datosContacto.EstadoRegistro = estado;
            if (estado === 'R' || estado === 'N')
                $('#fechaHoraSiguiente').css('display', 'block');
            else {
                $('#fechaHoraSiguiente').css('display', 'none');
                g_datosContacto.LlamarAhora = false;
                g_datosContacto.FechaSigLlamada = "";
                g_datosContacto.HoraSigLlamada = "";
            }
            break;
        case 'literal1':
            g_datosContacto.Literal1 = $('#' + campo).val();
            break;
        case 'literal2':
            g_datosContacto.Literal2 = $('#' + campo).val();
            break;
        case 'resultados':
            g_datosContacto.ResultadoNegocio = $('#' + campo).val();
            break;
        case 'operadorPreferido':
            g_datosContacto.IdOperadorPreferido = $('#' + campo).val();
            break;
        case 'nombre':
            g_datosContacto.Nombre = $('#' + campo).val();
            break;
        case 'direccion':
            g_datosContacto.Direccion = $('#' + campo).val();
            break;
        case 'codigopostal':
            g_datosContacto.CodigoPostal = $('#' + campo).val();
            break;
        case 'poblacion':
            g_datosContacto.Ciudad = $('#' + campo).val();
            break;
        case 'provincia':
            g_datosContacto.Provincia = $('#' + campo).val();
            break;
        case 'pais':
            g_datosContacto.Pais = $('#' + campo).val();
            break;
        case 'cancelados':
            g_datosContacto.ReactivarCancelados = $('#' + campo)[0].checked;
            break;
        case 'contadores':
            g_datosContacto.ReiniciarContadores = $('#' + campo)[0].checked;
            break;
        case 'mantenerReprog':
            g_datosContacto.LlamarAhora = false;
            g_datosContacto.FechaSigLlamada = "";
            g_datosContacto.HoraSigLlamada = "";
            break;
        case 'llamarAhora':
            g_datosContacto.LlamarAhora = true;
            g_datosContacto.FechaSigLlamada = "";
            g_datosContacto.HoraSigLlamada = "";
            break;
        case 'llamarMasTarde':
            g_datosContacto.LlamarAhora = false;

            let fechaAhora = formatCurrentDate();
            let tiempoAhora = formatCurrentTime();
            $('#fechaSigLlamada').val(fechaAhora);
            $('#horaSigLlamada').val(tiempoAhora);
            IncorporaFecha(fechaAhora);
            IncorporaHora(tiempoAhora);
            break;
        //case 'soloMarcador':
        //    g_datosContacto.ReprogramadosMarcador = $('#' + campo).val() ? true : false;
        //    break;
        //case 'soloOperador':
        //    g_datosContacto.ReprogramadosOperador = $('#' + campo).val() ? true : false;
        //    break;
        case 'fechaSigLlamada':
            IncorporaFecha($('#' + campo).val());
            break;
        case 'horaSigLlamada':
            IncorporaHora($('#' + campo).val());
            break;
    }
}

function IncorporaFecha(fecha) {
    g_datosContacto.FechaSigLlamada = fecha;
    let check = $('#llamarMasTarde');
    if (!check.checked) {
        check.checked = true;
    }
}

function IncorporaHora(hora) {
    g_datosContacto.HoraSigLlamada = hora;
    let check = $('#llamarMasTarde');
    if (!check.checked) {
        check.checked = true;
    }
}


function GuardarDatos() {
    $('#spinGuardar').css('display', 'inline-flex');
    let params = { 'datosContacto': g_datosContacto };

    $.ajax({
        type: "POST",
        url: getRutaAbsolutaMVC() + "/BuscadorRegistros/GuardaCambiosContactos",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: false,
        cache: false,
        timeout: 5000,
        success: function (data) {
            if (data === null) {
                alert('Se ha producido un error al recuperar el nombre del prefijo de la tabla de telemarketer ');
            }
            let respuesta = JSON.parse(data);
            $('#spinGuardar').css('display', 'none');

            if (respuesta.Error == 'N') {
                $('#MensajeAlertSuccess').text(respuesta.Mensaje);
                $('#alertsuccess').css('display', 'block');

                window.setTimeout(function () {                
                    $('#alertsuccess').fadeTo(500, 0).slideUp(500, function() {
                        $(this).remove(); 
                        $('#alertsuccess').css('display', 'none');
                    }); 
                }, 3500);

            }
            else {
                $('#MensajeAlertError').text(respuesta.Mensaje);
                $('#alerterror').css('display', 'block');
            }
            
        }, error: function (e) { console.log(e); $('#spinGuardar').css('display', 'none'); }
    });
}


function EliminarRegistros() {
    Swal.fire({
        title: 'Eliminar registros',
        text: "Se eliminarán los registros seleccionados. Una vez eliminados no se podrán recuperar. ¿Desear continuar? !",
        icon: 'warning',
        heightAuto: false,
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Eliminados'
            );

            let url = getRutaAbsoluta();
            $.post(url + "/BuscadorRegistros/EliminarRegistros", function (resultado) {
                if (resultado !== null) {
                    let respuesta = JSON.parse(resultado);
                    CierraModal();
                }
            });
        }
    });
}


function formatCurrentDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function formatCurrentTime() {
    var d = new Date(),
        hour = '' + (d.getHours()),
        minute = '' + d.getMinutes()

    if (hour.length < 2)
        hour = '0' + hour;
    if (minute.length < 2)
        minute = '0' + minute;

    return [hour, minute].join(':');
}