sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "../Servico/ValidacoesCadastro",
        "../Servico/Repositorio",
        "sap/ui/model/resource/ResourceModel",
        "../Servico/MessageBoxServico"
    ],
    function (Controller, JSONModel, ValidacoesCadastro,  Repositorio, ResourceModel, MessageBoxServico) {
        "use strict";

        var i18nModel = new ResourceModel({
            bundleName: "sap.ui.InterfaceUsuario.i18n.i18n",
            bundleUrl: "../i18n/i18n.properties"
        });
        const i18n = i18nModel.getResourceBundle();

        return Controller.extend("sap.ui.InterfaceUsuario.Cadastro", {
            onInit: function () {
                const rotaCadastro = "cadastro";
                this.getOwnerComponent().getRouter().getRoute(rotaCadastro).attachMatched(this.rotaCorrespondida, this);
            },
            rotaCorrespondida: function (oEvent) {
                const dados = "dados";
                const idCliente = oEvent.getParameter("arguments").id;
                var objetoDeDadosCliente;
                if (idCliente) {
                    objetoDeDadosCliente = new JSONModel({});
                    this.carregarDadosCliente(idCliente, objetoDeDadosCliente);
                } else {
                    objetoDeDadosCliente = new JSONModel();
                }
                this.getView().setModel(objetoDeDadosCliente, "dados");
            },
            aoClicarEmVoltar: function () {
                const paginaDeListagem = "listagemClientes";
                this.getOwnerComponent().getRouter().navTo(paginaDeListagem, {}, true);  
            },
            aoClicarEmSalvar: async function () {
                const mensagemErroCadastro = "mensagemDeErro";
                const mensagemSucessoCadastro = "mensagemSucessoCadastro";
                const mensagemSucessoAtualizacao = "mensagemSucessoAtualizacao";
                const mensagemConfirmacao = "mensagemConfirmacao";
                const mensagemDeErro = i18n.getText(mensagemErroCadastro);
                const dados = "dados";
                var modeloDeClientes = this.getView().getModel("dados").getData();
                const idDoCliente = this.getView().getModel(dados).getProperty("/id");
                if (!ValidacoesCadastro.validarCamposFormulario(this.getView())) {
                    return;
                }
                const confirmado = await this.mostrarConfirmacao(i18n.getText(mensagemConfirmacao));
                if (!confirmado) {
                    return;
                }
                try {
                    if (idDoCliente) {
                        await Repositorio.atualizarCliente(idDoCliente, modeloDeClientes);
                        this.navegarPaginaDetalhes(idDoCliente);
                        MessageBoxServico.mostrarMensagemDeSucessoo(i18n.getText(mensagemSucessoAtualizacao), 500)
                    } else {
                        const dados = await Repositorio.criarCliente(modeloDeClientes);
                        this.navegarPaginaDetalhes(dados.id);
                        MessageBoxServico.mostrarMensagemDeSucessoo(i18n.getText(mensagemSucessoCadastro), 500);
                    }
                } catch (erro) {
                    console.error(mensagemDeErro, erro);
                    MessageBoxServico.mostrarMensagemDeErro(mensagemDeErro);
                }
            },
            aoClicarEmCancelar: function () {
                const mensagemDeCancelar = "mensagemAoCancelar";
                const mensagemAoCancelar = i18n.getText(mensagemDeCancelar);
                const paginaDeListagem = "listagemClientes";
                MessageBoxServico.mostrarMessageBox(mensagemAoCancelar, function (confirmado) {
                    if (confirmado) {
                        this.getOwnerComponent().getRouter().navTo(paginaDeListagem, {}, true);
                    }
                }.bind(this));
            },
            navegarPaginaDetalhes: function (novoId) {
                const mensagemDoIdInvalido = "mensagemIdInvalido";
                const mensagemIdInvalido = i18n.getText(mensagemDoIdInvalido);
                const paginaDeDetalhes = "detalhes";
                if (novoId === 0) {
                    console.error(mensagemIdInvalido);
                    return;
                }
                this.getOwnerComponent().getRouter().navTo(paginaDeDetalhes, { id: novoId });
            },
            mostrarConfirmacao: function (mensagem) {
                return new Promise(function (resolve) {
                    MessageBoxServico.mostrarMessageBox(mensagem, function (res) {
                        resolve(res);
                    });
                });
            },
            carregarDadosCliente: function (id, modeloDeClientes) {
                Repositorio.obterClientePorId(id)
                    .then(dados => modeloDeClientes.setData(dados));
            }
        });
    }
);