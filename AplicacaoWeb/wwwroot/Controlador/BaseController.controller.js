sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../Servico/MessageBoxServico"
], function (Controller, MessageBoxServico) {
    "use strict";
    const caminhoBaseController = "sap.ui.InterfaceUsuario.BaseController"

    return Controller.extend(caminhoBaseController, {

        aoClicarEmVoltar: function (nomeDaRota, id = null) {
            this._processarEvento(() => {
                this.aoNavegar(nomeDaRota, id);
            })
        },
        _processarEvento: function (action) {
            const tipoDaPromise = "catch";
            const tipoBuscado = "function";
            try {
                var promise = action();
                if (promise && typeof promise[tipoDaPromise] === tipoBuscado) {
                    promise.catch(error => MessageBoxServico.mostrarMensagemDeErro(error.message));
                }
            } catch (error) {
                MessageBoxServico.mostrarMensagemDeErro(error.message);
            }
        },
        aoNavegar: function (nomeDaRota, id) {
            var rota = this.getOwnerComponent().getRouter();
            if (id) {
                rota.navTo(nomeDaRota, { id });
            }
            rota.navTo(nomeDaRota);
        },
    });
});