sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../Servico/MessageBoxServico",
    "sap/ui/core/BusyIndicator"
], function (Controller, MessageBoxServico, BusyIndicator) {
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
                 BusyIndicator.show();
                var promise = action();
                if (promise && typeof promise[tipoDaPromise] === tipoBuscado) {
                    promise.catch(error => MessageBoxServico.mostrarMensagem(error.message));
                }
                BusyIndicator.hide();
            } catch (error) {
                MessageBoxServico.mostrarMensagem(error.message);
            }
        },
        aoNavegar: function (nomeDaRota, id) {
            var rota = this.getOwnerComponent().getRouter();
            if (id) {
                rota.navTo(nomeDaRota, {id});
            }
            rota.navTo(nomeDaRota);
        },
    });
});