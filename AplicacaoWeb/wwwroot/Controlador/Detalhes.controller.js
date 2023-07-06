sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "../Servico/Repositorio",
        "../Servico/MessageBoxServico",
        "sap/ui/model/resource/ResourceModel"
    ],
    function (Controller, JSONModel, Repositorio, MessageBoxServico, ResourceModel) {
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
            aoRemoverCliente: "Cliente Removido com Sucesso",
            confirmacaoAoRemover: "Deseja realmente remover o cliente selecionado"
        };
        const i18n = i18nModel.getResourceBundle();
        const caminhoControladorDeDetalhes = "sap.ui.InterfaceUsuario.Detalhes";
        return Controller.extend(caminhoControladorDeDetalhes, {
            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute(paginaDe.detalhes).attachMatched(this.rotaCorrespondida, this);
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
                this.getOwnerComponent().getRouter().navTo(paginaDe.listagem, {}, true);
            },
            
            aoClicarNoBotaoDeEditar: function (oEvent) {
                var idObtido = oEvent.getSource().getBindingContext().getProperty("id");
                this.getOwnerComponent().getRouter().navTo(paginaDe.edicao, { id: idObtido });
            },
            mostrarConfirmacao: function (mensagem) {
                return new Promise(resolve => {
                    MessageBoxServico.mostrarMessageBox(mensagem, res => resolve(res));
                });
            },
            aoClicarNoBotaoDeRemocao: async function () {
                const acessoAoId = "/cliente/id";
                const idCliente = this.getView().getModel().getProperty(acessoAoId);
                const confirmacaoRemocao = await this.mostrarConfirmacao(i18n.getText(mensagens.confirmacaoAoRemover));
                if (!confirmacaoRemocao) {
                    return;
                }
                await Repositorio.removerCliente(idCliente);
                MessageBoxServico.mostrarMensagemDeSucessoo(i18n.getText(mensagens.aoRemoverCliente), 500);
                this.getOwnerComponent().getRouter().navTo(paginaDe.listagem, {}, true);
            }
        });
    }
)
