sap.ui.define(
    [
        "./BaseController.controller",
        "sap/ui/model/json/JSONModel",
        "../Servico/ValidacoesCadastro",
        "../Servico/Repositorio",
        "sap/ui/model/resource/ResourceModel",
        "../Servico/MessageBoxServico"
    ],
    function (BaseController, JSONModel, ValidacoesCadastro, Repositorio, ResourceModel, MessageBoxServico) {
        "use strict";

        var i18nModel = new ResourceModel({
            bundleName: "sap.ui.InterfaceUsuario.i18n.i18n",
            bundleUrl: "../i18n/i18n.properties"
        });
        const dados = "dados";
        const delay = 500;
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
        const campo = {
            nome: "campoNome",
            data: "campoData",
            telefone: "campoTelefone",
            sexo: "campoSexo"
        };
        const caminhoControladorCadastro = "sap.ui.InterfaceUsuario.Cadastro";
        return BaseController.extend(caminhoControladorCadastro, {
            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute(paginaDe.cadastro).attachMatched(this.rotaCorrespondida, this);
                this.getOwnerComponent().getRouter().getRoute(paginaDe.edicao).attachMatched(this.rotaCorrespondida, this);
            },
            rotaCorrespondida: function (evento) {
                this._processarEvento(() => {
                    const argumentos = "arguments";
                    var objetoDeDadosCliente = new JSONModel({});
                    this.getView().setModel(objetoDeDadosCliente, dados);
                    var parametro = evento.getParameter(argumentos);
                    if (parametro && parametro.id) {
                        Repositorio.obterClientePorId(parametro.id)
                            .then(dadosCliente => objetoDeDadosCliente.setData(dadosCliente));
                    }
                })
            },
            aoClicarEmVoltar: function () {
                this._processarEvento(() => {
                    this.navegarPaginaDeListagem();
                });
            },
            aoClicarEmSalvar: function () {
                var modeloDeClientes = this.getView().getModel(dados).getData();
                var campoNome = this.getView().byId(campo.nome);
                var campoData = this.getView().byId(campo.data);
                var campoTelefone = this.getView().byId(campo.telefone);
                var campoSexo = this.getView().byId(campo.sexo);
                if (!ValidacoesCadastro.validarCamposFormulario(campoNome, campoData, campoTelefone, campoSexo)) {
                    return;
                }
                    if (modeloDeClientes.id) {
                        return this.atualizarCliente(modeloDeClientes);
                    } else {
                        return this.criarCliente(modeloDeClientes);
                    }
            },
            aoClicarEmCancelar: function () {
                this._processarEvento(() => {
                    this.navegarPaginaDeListagem();
                });
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
                this._processarEvento(async () => {
                    const dados = await Repositorio.criarCliente(modeloDeClientes);
                    this.navegarPaginaDetalhes(dados.id);
                    MessageBoxServico.mostrarMensagemDeSucessoo(i18n.getText(mensagens.sucessoCadastro), delay);
                });
             },
            atualizarCliente: async function (modeloDeClientes) {
             const confirmacaoAtualizar = await this.mostrarConfirmacao(i18n.getText(mensagens.confirmacaoAoAtualizar));
              if (!confirmacaoAtualizar) {
                throw new Error(i18n.getText(mensagens.mensagemOperacaoCancelada));
                }
                this._processarEvento(async () => {
                    await Repositorio.atualizarCliente(modeloDeClientes.id, modeloDeClientes);
                    this.navegarPaginaDetalhes(modeloDeClientes.id);
                    MessageBoxServico.mostrarMensagemDeSucessoo(i18n.getText(mensagens.sucessoAtualizacao), delay);
                });
             },
            navegarPaginaDeListagem: function () {
                return new Promise(resolve => {
                    MessageBoxServico.mostrarMessageBox(i18n.getText(mensagens.aoCancelar), function (confirmacaoCancelar) {
                        if (confirmacaoCancelar) {
                            this.getOwnerComponent().getRouter().navTo(paginaDe.listagem, {}, true);
                        }
                        resolve();
                    }.bind(this));
                });
            }
        });
    }
);