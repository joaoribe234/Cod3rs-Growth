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
        const dados = "dados";
        const i18n = i18nModel.getResourceBundle();
        const mensagens = {
            erroCadastro: "mensagemDeErro",
            sucessoCadastro: "mensagemSucessoCadastro",
            sucessoAtualizacao: "mensagemSucessoAtualizacao",
            confirmacaoAoCriar: "mensagemConfirmacao",
            confirmacaoAoAtualizar: "mensagemConfirmacaoAtualizacao",
            idInvalido: "mensagemIdInvalido",
            aoCancelar: "mensagemAoCancelar"
        };
        const paginaDe = {
            listagem: "listagemClientes",
            detalhes: "detalhes",
            cadastro: "cadastro",
            edicao: "edicao"
        };
        const caminhoControladorCadastro = "sap.ui.InterfaceUsuario.Cadastro";
        return Controller.extend(caminhoControladorCadastro, {
            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute(paginaDe.cadastro).attachMatched(this.rotaCorrespondida, this);
                this.getOwnerComponent().getRouter().getRoute(paginaDe.edicao).attachMatched(this.rotaCorrespondida, this);
            },
            rotaCorrespondida: function (oEvent) {
                const argumentos = "arguments";
                var objetoDeDadosCliente = new JSONModel({});
                this.getView().setModel(objetoDeDadosCliente, dados);
                var parametro = oEvent.getParameter(argumentos);
                if (parametro && parametro.id) {
                    Repositorio.obterClientePorId(parametro.id)
                        .then(dadosCliente => objetoDeDadosCliente.setData(dadosCliente))
                        .catch(error =>  console.error( error));
                }        
            },

            aoClicarEmVoltar: function () {
                MessageBoxServico.mostrarMessageBox(i18n.getText(mensagens.aoCancelar), function (confirmacaoCancelar) {
                    if (confirmacaoCancelar) {
                        this.getOwnerComponent().getRouter().navTo(paginaDe.listagem, {}, true);
                    }
                }.bind(this));
            },

            aoClicarEmSalvar: async function () {
                var modeloDeClientes = this.getView().getModel(dados).getData();
                if (!ValidacoesCadastro.validarCamposFormulario(this.getView())) {
                    return;
                }
                try {
                    if (modeloDeClientes.id) {
                        await this.atualizarCliente(modeloDeClientes);
                    } else {
                        await this.criarCliente(modeloDeClientes);
                    }
                } catch (erro) {
                    console.error(i18n.getText(mensagens.erroCadastro), erro);
                    MessageBoxServico.mostrarMensagemDeErro(i18n.getText(mensagens.erroCadastro));
                }
            },

            aoClicarEmCancelar: function () {
                MessageBoxServico.mostrarMessageBox(i18n.getText(mensagens.aoCancelar), function (confirmacaoCancelar) {
                    if (confirmacaoCancelar) {
                        this.getOwnerComponent().getRouter().navTo(paginaDe.listagem, {}, true);
                    }
                }.bind(this));
            },

            navegarPaginaDetalhes: function (novoId) {
                if (novoId === 0) {
                    console.error(i18n.getText(mensagens.idInvalido));
                    return;
                }
                this.getOwnerComponent().getRouter().navTo(paginaDe.detalhes, { id: novoId });
            },

            mostrarConfirmacao: function (mensagem) {
                return new Promise(resolve => {
                    MessageBoxServico.mostrarMessageBox(mensagem, res => resolve(res));
                });
            },
            
            criarCliente: async function (modeloDeClientes) {
                const confirmacaoCriar = await this.mostrarConfirmacao(i18n.getText(mensagens.confirmacaoAoCriar));
                if (!confirmacaoCriar) {
                    return;
                }
                const dados = await Repositorio.criarCliente(modeloDeClientes);
                this.navegarPaginaDetalhes(dados.id);
                MessageBoxServico.mostrarMensagemDeSucessoo(i18n.getText(mensagens.sucessoCadastro), 500);
            },

            atualizarCliente: async function (modeloDeClientes) {
                const confirmacaoAtualizar = await this.mostrarConfirmacao(i18n.getText(mensagens.confirmacaoAoAtualizar));
                if (!confirmacaoAtualizar) {
                    return;
                }
                await Repositorio.atualizarCliente(modeloDeClientes.id, modeloDeClientes);
                this.navegarPaginaDetalhes(modeloDeClientes.id);
                MessageBoxServico.mostrarMensagemDeSucessoo(i18n.getText(mensagens.sucessoAtualizacao), 500);
            }
        });
    }
);