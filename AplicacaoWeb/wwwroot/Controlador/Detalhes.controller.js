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
            rotaCorrespondida: function (evento) {
                this._processarEvento(() => {
                    var parametro = evento.getParameters();
                    var idCliente = parametro.arguments.id;
                    this.carregarDadosCliente(idCliente);
                })
            },
            carregarDadosCliente: function (id) {
                var modeloDeClientes = new JSONModel();
                Repositorio.obterClientePorId(id)
                    .then(dados => modeloDeClientes.setData({ cliente: dados }))
                this.getView().setModel(modeloDeClientes);
            },
            aoClicarEmVoltar: function () {
                this._processarEvento(() => {
                    this.getOwnerComponent().getRouter().navTo(paginaDe.listagem, {}, true);
                });
            },
            aoClicarNoBotaoDeEditar: function (evento) {
                this._processarEvento(() => {
                    const acessoAoId = "id";
                    var idObtido = evento.getSource().getBindingContext().getProperty(acessoAoId);
                    this.getOwnerComponent().getRouter().navTo(paginaDe.edicao, { id: idObtido });
                });
            },
            aoClicarNoBotaoDeRemocao: function (evento) {
                this._processarEvento(() => {
                    const acessoAoId = "id";
                    const idCliente = evento.getSource().getBindingContext().getProperty(acessoAoId);
                    MessageBoxServico.confirmar(i18n.getText(mensagens.confirmacaoAoRemover), this.removerCliente.bind(this), [idCliente])
                })
            },
            removerCliente: async function (idCliente) {
                const delay = 500;
                this._processarEvento(async () => {
                    await Repositorio.removerCliente(idCliente)
                    MessageBoxServico.mostrarMensagemDeSucessoo(i18n.getText(mensagens.aoRemoverCliente), delay);
                    this.getOwnerComponent().getRouter().navTo(paginaDe.listagem, {}, true);
                });
            }
        });
    }
)