
var tableTelef;


function CierraModal() {
    parent.$('#closeModalEdicion').click();
}


$(document).ready(function () {

    tableTelef = new $('#TablaTelefonos').DataTable({
        order: [[0, "asc"]],
        displayLength: 0,
        searching: false,
        processing: true,
        info: false,
        bPaginate: false,
        bLengthChange: false,
        bFilter: true,
        bInfo: false,
        language: {
            loadingRecords: "&nbsp;",
            processing: "Cargando...",
            lengthMenu: "Registros _MENU_ por página",
            zeroRecords: "Sin registros",
            info: "Página _PAGE_ de _PAGES_",
            infoEmpty: "Sin registros",
            infoFiltered: "",
            search: "Buscar",
        }
    });

    tableTelef.on("click", "td", function () {
        // Si es la primera columna no hago nada
        const idtd = $(this).attr('id')
        if (idtd) {
            return;
        }

        let id = $(this).parent().attr('id');
        id = id.slice(3);
        const idRegistro = $("#idRegistro").val();
        const idCampana = $("#idCampana").val();
        const urlActual = 'BuscadorRegistros/EdicionDatosRegistro?idCampana=' + idCampana + '&idRegistro=' + idRegistro;
        const urlSig = 'EditarDatosTelefono2Col.aspx?idRegistro=' + idRegistro + '&telefono=' + id + '&idCampana=' + idCampana;

        AvanzarPagina(urlActual, urlSig);
        //                EditarDatosTelefono2Col.aspx ? idRegistro = " + _idRegistro + " & telefono=0 & idCampana=" + _idCampana + "
    });


    var tablareg = $('#tablaRegistros').DataTable({
        "processing": true,
        order: [[0, "desc"]],
        "lengthMenu": [[10, 25, 50, 100], [10, 25, 50, 100]],
        displayLength: 10,
        "language": {
            "loadingRecords": "&nbsp;",
            "processing": "Cargando...",
            "lengthMenu": "Registros _MENU_ por página",
            "zeroRecords": "Sin registros",
            "info": "Página _PAGE_ de _PAGES_",
            "infoEmpty": "Sin registros",
            "infoFiltered": "",
            "search": "Buscar",
            "paginate": {
                "first": "Primera",
                "next": "Siguiente",
                "previous": "Previo",
                "last": "Última"
            }
        }
    });


    $('a[data-toggle=\"tab\"]').on('shown.bs.tab', function (e) {
        let target = $(e.target).attr('href');
        if (target == '#historico') {
            $('#btnEliminarRegistro').css('display', 'none');
            $('#btnGuardarDatos').css('display', 'none');
            $('#btnNuevoTelefono').css('display', 'none');
        }
        else if (target == '#telefonos') {
            $('#btnEliminarRegistro').css('display', 'none');
            $('#btnGuardarDatos').css('display', 'none');
            $('#btnNuevoTelefono').css('display', 'block');
        }
        else {
            $('#btnEliminarRegistro').css('display', 'block');
            $('#btnGuardarDatos').css('display', 'block');
            $('#btnNuevoTelefono').css('display', 'none');
        }
    });
});

function NuevoTelefonoRegistros() {
    const idRegistro = $("#idRegistro").val();
    const idCampana = $("#idCampana").val();
    const urlActual = 'BuscadorRegistros/EdicionDatosRegistro?idCampana=' + idCampana + '&idRegistro=' + idRegistro;
    const urlSig = 'EditarDatosTelefono2Col.aspx?idRegistro=' + idRegistro + '&telefono=0&idCampana=' + idCampana;

    AvanzarPagina(urlActual, urlSig);
}


function EliminarRegistro() {
    Swal.fire({
        title: 'Eliminar registro',
        text: "Se eliminará el registro. Una vez eliminado no se podrá recuperar. ¿Desear continuar? !",
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
                'Eliminado'
            );
            let url = getRutaAbsoluta();
            $.post(url + "/BuscadorRegistros/EliminarRegistros", function (resultado) {
                if (resultado !== null) {
                    let respuesta = JSON.parse(resultado);
                    MostrarMensajeRespuesta(respuesta);
                    CierraModal();
                }
            });
        }
    });
}


function GuardarDatos() {
    $('#spinGuardar').css('display', 'inline-flex');

    let params = { 'datosContacto': g_datosContacto };

    $.ajax({
        type: "POST",
        url: getRutaAbsoluta() + "/BuscadorRegistros/ActualizarDatosContacto",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        async: false,
        cache: false,
        timeout: 5000,
        success: function (data) {
            if (data === null) {
                alert('Se ha producido un error al actualizar los datos del contacto ');
            }
            let respuesta = JSON.parse(data);
            $('#spinGuardar').css('display', 'none');

            MostrarMensajeRespuesta(respuesta);

        }, error: function (e) { console.log(e); $('#spinGuardar').css('display', 'none'); }
    });

}


function MostrarMensajeRespuesta(respuesta) {
    if (respuesta.Error == 'N') {
        $('#MensajeAlertSuccess').text(respuesta.Mensaje);
        $('#alertsuccess').css('display', 'block');

        window.setTimeout(function () {
            $('#alertsuccess').fadeTo(500, 0).slideUp(500, function () {
                $(this).remove();
                $('#alertsuccess').css('display', 'none');
            });
        }, 3500);

    }
    else {
        $('#MensajeAlertError').text(respuesta.Mensaje);
        $('#alerterror').css('display', 'block');
    }
}


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
            
            if ((estado === 'R' || estado === 'N') &&
                (g_datosContacto.Estado == 'F' || g_datosContacto.Estado == 'C'))
                g_datosContacto.ReiniciarContador = true;

            g_datosContacto.Estado = estado;
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
            g_datosContacto.OperadorPreferido = $('#' + campo).val();
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
    }
}