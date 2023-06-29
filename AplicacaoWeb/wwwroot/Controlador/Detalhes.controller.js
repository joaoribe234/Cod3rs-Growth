sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "../Servico/Repositorio"
    ],
    function (Controller,  JSONModel, Repositorio) {
        "use strict";
        return Controller.extend("sap.ui.InterfaceUsuario.Detalhes", {
            onInit: function () {
                const rotaDetalhes = "detalhes";
                this.getOwnerComponent().getRouter().getRoute(rotaDetalhes).attachMatched(this.rotaCorrespondida, this);
            },
            rotaCorrespondida: function (oEvent) {
                var parametro = oEvent.getParameters();
                var idCliente = parametro.arguments.id;
                this.carregarDadosCliente(idCliente);
            },
            carregarDadosCliente: function (id) {
            var modeloDeClientes = new JSONModel();
                Repositorio.obterClientePorId(id)
                .then(dados => modeloDeClientes.setData({ cliente: dados }));
            this.getView().setModel(modeloDeClientes);
        },
            aoClicarEmVoltar: function () {
                const paginaDeListagem = "listagemClientes";
                this.getOwnerComponent().getRouter().navTo(paginaDeListagem, {}, true);
            },
            aoClicarNoBotaoDeEditar: function (oEvent) {
                var idObtido = oEvent.getSource().getBindingContext().getProperty("id");
                this.getOwnerComponent().getRouter().navTo("edicao", { id: idObtido });
            },
        });
    }
)
