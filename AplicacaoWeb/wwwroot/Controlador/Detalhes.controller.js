﻿sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History",
        "sap/ui/model/json/JSONModel"
    ],
    function (Controller, History, JSONModel) {
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
                const mensagemDeErro = "Ocorreu algum erro ao obter o cliente por ID!";
                var modeloDeClientes = new JSONModel();
                fetch(`https://localhost:7258/api/clientes/${id}`)
                    .then(dados => dados.json())
                    .then(dados => modeloDeClientes.setData({ cliente: dados }))
                    .catch(erro => console.error(mensagemDeErro, erro));
                this.getView().setModel(modeloDeClientes);
            },
            cliqueVoltar: function () {
                const viewListagem = "listagemClientes";
                var historicoNavegacao = History.getInstance();
                var obterHashAnterior = historicoNavegacao.getPreviousHash();

                if (obterHashAnterior !== undefined) {
                    window.history.go(-1);
                } else {
                    var instanciaRota = this.getOwnerComponent().getRouter();
                    instanciaRota.navTo(viewListagem, {}, true);
                }
            }
        });
    }
)