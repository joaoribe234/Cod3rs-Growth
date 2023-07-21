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

        _processarEvento: async function (action) {
            const tipoDaPromessa = "catch";
            const tipoBuscado = "function";
            try {
                BusyIndicator.show();
                var promessa = action();
                if (promessa && typeof promessa[tipoDaPromessa] === tipoBuscado) {
                    await promessa.catch(error => MessageBoxServico.mostrarMensagem(error.message));
                }
            } catch (error) {
                MessageBoxServico.mostrarMensagem(error.message);
            } finally {
                BusyIndicator.hide();
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