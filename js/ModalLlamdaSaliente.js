
const cte_AltaNuevaRegla = 'altaNuevaRegla';

function CrearNuevaRegla() {
    let titulo = "Alta periodo de vacaciones";
    $('#tipoModal').val(cte_AltaNuevaRegla);

    html = " Hola, nueva regla";

    $('#miModalTitle').text(titulo);
    $('#miModalHeader').removeClass('modal-header-danger');
    $('#miModalHeader').addClass('modal-header-info');
    $('#contenido-body').html(html);
    $('#miModal').modal('show');
}


function MiModalAceptar() {
    const tipo = $('#tipoModal').val();

    if (tipo === cte_AltaNuevaRegla) {
        EnviarCrearNuevaRegla();
    }
    
}


function EnviarCrearNuevaRegla() {
    alert("Se va a crear la nueva regla");
}