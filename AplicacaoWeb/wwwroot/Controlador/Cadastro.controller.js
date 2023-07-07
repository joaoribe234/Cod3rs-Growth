﻿sap.ui.define(
    [
        "./BaseController.controller",
        "sap/ui/model/json/JSONModel",
        "../Servico/ValidacoesCadastro",
        "../Servico/Repositorio",
        "sap/ui/model/resource/ResourceModel",
        "../Servico/MessageBoxServico"
    ],
    function (BaseController, JSONModel, ValidacoesCadastro,  Repositorio, ResourceModel, MessageBoxServico) {
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
            aoCancelar: "mensagemAoCancelar",
            mensagemOperacaoCancelada: "mensagemOperacaoCancelada"
        };
        const paginaDe = {
            listagem: "listagemClientes",
            detalhes: "detalhes",
            cadastro: "cadastro",
            edicao: "edicao"
        };
        const caminhoControladorCadastro = "sap.ui.InterfaceUsuario.Cadastro";
        return BaseController.extend(caminhoControladorCadastro, {
            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute(paginaDe.cadastro).attachMatched(this.rotaCorrespondida, this);
                this.getOwnerComponent().getRouter().getRoute(paginaDe.edicao).attachMatched(this.rotaCorrespondida, this);
            },
            rotaCorrespondida: function (oEvent) {
                this._processarEvento(() => {
                    const argumentos = "arguments";
                    var objetoDeDadosCliente = new JSONModel({});
                    this.getView().setModel(objetoDeDadosCliente, dados);
                    var parametro = oEvent.getParameter(argumentos);
                    if (parametro && parametro.id) {
                        Repositorio.obterClientePorId(parametro.id)
                            .then(dadosCliente => objetoDeDadosCliente.setData(dadosCliente))
                            .catch(error => console.error(error));
                    }
                })        
            },
            aoClicarEmVoltar: function () {
                this.navegarPaginaDeListagem();
            },
            aoClicarEmSalvar: function () {
                var modeloDeClientes = this.getView().getModel(dados).getData();
                if (!ValidacoesCadastro.validarCamposFormulario(this.getView())) {
                    return;
                }
                this._processarEvento(() => {
                    if (modeloDeClientes.id) {
                        this.atualizarCliente(modeloDeClientes);
                    } else {
                        this.criarCliente(modeloDeClientes);
                    }
                });
            },
            aoClicarEmCancelar: function () {
                this.navegarPaginaDeListagem();
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
            criarCliente: function (modeloDeClientes) {
                this.mostrarConfirmacao(i18n.getText(mensagens.confirmacaoAoCriar))
                    .then(confirmacaoCriar => {
                    if (!confirmacaoCriar) {
                        return;
                    }
                    return Repositorio.criarCliente(modeloDeClientes);
                    })
                    .then(dados => {
                        this.navegarPaginaDetalhes(dados.id);
                        MessageBoxServico.mostrarMensagemDeSucessoo(i18n.getText(mensagens.sucessoCadastro), 500);
                    })
            },
            atualizarCliente: function (modeloDeClientes) {
                     this.mostrarConfirmacao(i18n.getText(mensagens.confirmacaoAoAtualizar))
                    .then(confirmacaoAtualizar => {
                        if (confirmacaoAtualizar) {
                            return Repositorio.atualizarCliente(modeloDeClientes.id, modeloDeClientes);
                        } else {
                            throw i18n.getText(mensagens.mensagemOperacaoCancelada);
                        }
                    })
                    .then(() => {
                        this.navegarPaginaDetalhes(modeloDeClientes.id);
                        MessageBoxServico.mostrarMensagemDeSucessoo(i18n.getText(mensagens.sucessoAtualizacao), 500);
                    });
            },
            navegarPaginaDeListagem: function () {
                this._processarEvento(() => {
                    MessageBoxServico.mostrarMessageBox(i18n.getText(mensagens.aoCancelar), function (confirmacaoCancelar) {
                        if (confirmacaoCancelar) {
                            this.getOwnerComponent().getRouter().navTo(paginaDe.listagem, {}, true);
                        }
                    }.bind(this));
                });
            }
        });
    }
);

