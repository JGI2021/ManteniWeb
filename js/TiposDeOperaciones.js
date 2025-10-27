




document.addEventListener('DOMContentLoaded', function () {
    const valor1 = $("#DLL_NAME option:selected").val();
    AplicarTipoDeEjecucion(valor1);

    $("#DLL_NAME").on("change", function () {
        const valor = $("#DLL_NAME option:selected").val();
        AplicarTipoDeEjecucion(valor);
    });
}, false);

function AplicarTipoDeEjecucion(tipoEjecucion) {
    if (tipoEjecucion === "INTEGRACION_TIPHONE") {
        $("#ColumnaCampo_F_NAME").css("display", "none");
        $("#Tab_PANELURL").css("display", "none");
        $("#F_NAME").val("");
    }
    else {
        $("#ColumnaCampo_F_NAME").css("display", "block");
        $("#Tab_PANELURL").css("display", "block");
    }
};