
function ActualizaGruposACD() {
    let url = getRutaAbsoluta() + "/ComandoChat.aspx/ObtenerGruposACDMensajeria";

    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",
        success: function (resultado) {
            if (resultado === null) {
                alert("No se han obtenido los grupos ACD asociados");
                return;
            }
            grupos = JSON.parse(resultado.d);


            var options = document.getElementById("GRUPO_ACD_ID").options;

            if (options) {
                for (let j = 0; j < options.length; j++) {
                    if (options[j].value === '' || options[j].value === '-1' || options[j].value === '-2') {
                        options[j].hidden = false;
                    }
                    else {
                        let idgrupo = grupos.find(gr => gr.Codigo === options[j].value);
                        if (idgrupo === null || idgrupo === undefined) {
                            options[j].hidden = true;
                        }
                        else {
                            options[j].hidden = false;
                        }
                    }
                }
            }
        }
    });
}