sap.ui.define(
    [
        "./BaseController.controller",
        "sap/ui/model/json/JSONModel",
        "../Servico/Repositorio",
        "../Servico/MessageBoxServico",
        "sap/ui/model/resource/ResourceModel",
        "sap/ui/core/BusyIndicator"
    ],
    function (BaseController, JSONModel, Repositorio, MessageBoxServico, ResourceModel, BusyIndicator) {
        "use strict";

        var i18nModel = new ResourceModel({
            bundleName: "sap.ui.InterfaceUsuario.i18n.i18n",
            bundleUrl: "../i18n/i18n.properties"
        });
        const paginaDe = {
            listagem: "listagemClientes",
            detalhes: "detalhes",
            cadastro: "cadastro",
            edicao: "edicao"
        };
        const mensagens = {
            aoRemoverCliente: "aoRemoverCliente",
            confirmacaoAoRemover: "confirmacaoAoRemover"
        };
        const i18n = i18nModel.getResourceBundle();
        const caminhoControladorDeDetalhes = "sap.ui.InterfaceUsuario.Detalhes";
        return BaseController.extend(caminhoControladorDeDetalhes, {
            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute(paginaDe.detalhes).attachMatched(this.rotaCorrespondida, this);
            },
            rotaCorrespondida: function (evento) {
                this._processarEvento(() => {
                    var parametro = evento.getParameters();
                    var idCliente = parametro.arguments.id;
                    this.carregarDadosCliente(idCliente);
                })
            },
            carregarDadosCliente: function (id) {
                var modeloDeClientes = new JSONModel();
                BusyIndicator.show();
                Repositorio.obterClientePorId(id)
                    .then(dados => modeloDeClientes.setData({ cliente: dados }))
                this.getView().setModel(modeloDeClientes);
                BusyIndicator.hide();
            },
            aoClicarEmVoltar: function () {
                BusyIndicator.show();
                this._processarEvento(() => {
                    this.getOwnerComponent().getRouter().navTo(paginaDe.listagem, {}, true);
                });
                BusyIndicator.hide();
            },
            aoClicarNoBotaoDeEditar: function (evento) {
                BusyIndicator.show();
                this._processarEvento(() => {
                    const acessoAoId = "id";
                    var idObtido = evento.getSource().getBindingContext().getProperty(acessoAoId);
                    this.getOwnerComponent().getRouter().navTo(paginaDe.edicao, { id: idObtido });
                });
                BusyIndicator.hide();
            },
            aoClicarNoBotaoDeRemocao: function (evento) {
                this._processarEvento(() => {
                    const acessoAoId = "id";
                    const idCliente = evento.getSource().getBindingContext().getProperty(acessoAoId);
                    MessageBoxServico.confirmar(i18n.getText(mensagens.confirmacaoAoRemover), this.removerCliente.bind(this), [idCliente])
                })
            },
            removerCliente: function (idCliente) {
                const delay = 500;
                BusyIndicator.show();
                Repositorio.removerCliente(idCliente)
                    .then(() => {
                        MessageBoxServico.mostrarMensagemDeSucessoo(i18n.getText(mensagens.aoRemoverCliente), delay);
                        this.getOwnerComponent().getRouter().navTo(paginaDe.listagem, {}, true);
                        BusyIndicator.hide();
                    });
            }
        });
    }
)