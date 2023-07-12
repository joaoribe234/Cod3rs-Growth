sap.ui.define(
    [
        "./BaseController.controller",
        "sap/ui/model/json/JSONModel",
        "../Servico/Repositorio",
        "../Servico/MessageBoxServico",
        "sap/ui/model/resource/ResourceModel"
    ],
    function (BaseController, JSONModel, Repositorio, MessageBoxServico, ResourceModel) {
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
            rotaCorrespondida: function (oEvent) {
                this._processarEvento(() => {
                    var parametro = oEvent.getParameters();
                    var idCliente = parametro.arguments.id;
                    this.carregarDadosCliente(idCliente);
                })
            },
            carregarDadosCliente: function (id) {
                var modeloDeClientes = new JSONModel();
                Repositorio.obterClientePorId(id)
                    .then(dados => modeloDeClientes.setData({ cliente: dados }))
                    .catch(erro => MessageBoxServico.mostrarMensagem(erro.message))
                this.getView().setModel(modeloDeClientes);
            },
            aoClicarEmVoltar: function () {
                this._processarEvento(() => {
                    this.getOwnerComponent().getRouter().navTo(paginaDe.listagem, {}, true);
                })
            },
            aoClicarNoBotaoDeEditar: function (oEvent) {
                this._processarEvento(() => {
                    var idObtido = oEvent.getSource().getBindingContext().getProperty("id");
                    this.getOwnerComponent().getRouter().navTo(paginaDe.edicao, { id: idObtido });
                })
            },
            aoClicarNoBotaoDeRemocao: function (evento) {
                this._processarEvento(() => {
                    const acessoAoId = "id";
                    const idCliente = evento.getSource().getBindingContext().getProperty(acessoAoId);
                    MessageBoxServico.confirmar(i18n.getText(mensagens.confirmacaoAoRemover), this.removerCliente.bind(this), [idCliente])
                })
            },
            removerCliente: function (idCliente) {
                Repositorio.removerCliente(idCliente)
                    .then((dadosDoCliente) => {
                        MessageBoxServico.mostrarMensagemDeSucessoo(i18n.getText(mensagens.aoRemoverCliente), 500);
                        this.getOwnerComponent().getRouter().navTo(paginaDe.listagem, {}, true);
                    })
                    .catch((erro) => MessageBoxServico.mostrarMensagem(erro.message))
            }
        });
    }
)