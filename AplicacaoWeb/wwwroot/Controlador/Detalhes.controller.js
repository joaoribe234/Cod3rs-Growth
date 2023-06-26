﻿sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History",
        "sap/ui/model/json/JSONModel",
        "../Servico/Repositorio"
    ],
    function (Controller, History, JSONModel, Repositorio) {
        "use strict";
        return Controller.extend("sap.ui.InterfaceUsuario.Detalhes", {
            onInit: function () {
                const rotaDetalhes = "detalhes";
                var instanciaRota = this.getOwnerComponent().getRouter();
                instanciaRota.getRoute(rotaDetalhes).attachMatched(this.rotaCorrespondida, this);
            },
            rotaCorrespondida: function (oEvent) {
                var parametro = oEvent.getParameters();
                var idCliente = parametro.arguments.id;
                this.dadosClientesApi(idCliente);
            },
            dadosClientesApi: function (id) {
            var modeloDeClientes = new JSONModel();

                Repositorio.obterClientePorId(id)
                .then(dados => modeloDeClientes.setData({ cliente: dados }));
            this.getView().setModel(modeloDeClientes);
        },
            aoClicarEmVoltar: function () {
                const paginaDeListagem = "listagemClientes";
                var historicoNavegacao = History.getInstance();
                var obterHashAnterior = historicoNavegacao.getPreviousHash();

                if (obterHashAnterior !== undefined) {
                    window.history.go(-1);
                } else {
                    var instanciaRota = this.getOwnerComponent().getRouter();
                    instanciaRota.navTo(paginaDeListagem, {}, true);
                }
            }
        });
    }
)
