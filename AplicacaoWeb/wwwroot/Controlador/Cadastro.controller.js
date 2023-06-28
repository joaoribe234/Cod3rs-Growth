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
            rotaCorrespondida: function () {
                const dados = "dados";
                var objetoDeDadosCliente = new JSONModel({});
                this.getView().setModel(objetoDeDadosCliente, dados);
            },
            aoClicarEmVoltar: function () {
                const paginaDeListagem = "listagemClientes";
                this.getOwnerComponent().getRouter().navTo(paginaDeListagem, {}, true);  
            },
            aoClicarEmSalvar: function () {
                const mensagemErroCadastro = "mensagemDeErro";
                const mensagemDeErro = i18n.getText(mensagemErroCadastro);
                const dados = "dados";
                var modeloDeClientes = this.getView().getModel(dados).getData();
                if (!ValidacoesCadastro.validarCamposFormulario(this.getView())) {
                    return;
                }
                MessageBoxServico.mostrarMessageBox(i18n.getText("mensagemConfirmacao"), function (confirmado) {
                    if (confirmado) {
                        Repositorio.criarCliente(modeloDeClientes)
                            .then(function (dados) {
                                this.navegarPaginaDetalhes(dados.id);
                                setTimeout(function () {
                                    MessageBoxServico.mostrarMensagemDeSucesso(i18n.getText("mensagemSucessoCadastro"));
                                }, 500);
                            }.bind(this))
                            .catch(function (erro) {
                                console.error(mensagemDeErro, erro);
                                MessageBoxServico.mostrarMensagemDeErro(mensagemDeErro);
                            });
                    }
                }.bind(this));
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
            }
        });
    }
);