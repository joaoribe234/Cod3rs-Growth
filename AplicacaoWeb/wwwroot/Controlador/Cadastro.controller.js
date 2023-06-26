sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History",
        "sap/ui/model/json/JSONModel",
        "../Servico/ValidacoesCadastro",
        "sap/m/MessageBox",
        "../Servico/Repositorio",
        "sap/ui/model/resource/ResourceModel"
    ],
    function (Controller, History, JSONModel, ValidacoesCadastro, MessageBox, Repositorio, ResourceModel) {
        "use strict";
        return Controller.extend("sap.ui.InterfaceUsuario.Cadastro", {
            onInit: function () {
                const rotaCadastro = "cadastro";

                this.instanciaRota = this.getOwnerComponent().getRouter();
                this.instanciaRota.getRoute(rotaCadastro).attachMatched(this.rotaCorrespondida, this);
            },
            rotaCorrespondida: function () {
                const dados = "dados";

                var objetoDeDadosCliente = new JSONModel({});
                this.getView().setModel(objetoDeDadosCliente, dados);
            },
            aoClicarEmVoltar: function () {
                const paginaDeListagem = "listagemClientes";
                var historicoNavegacao = History.getInstance();
                var obterHashAnterior = historicoNavegacao.getPreviousHash();
                if (obterHashAnterior !== undefined) {
                    window.history.go(-1);
                } else {
                    var instanciaRota = this.getOwnerComponent().getRouter();
                    instanciaRota.navTo(paginaDeListagem, {}, true);
                }
            },
            aoClicarEmSalvar: function () {
                const mensagemDeErro = "Erro ao cadastrar cliente";
                const dados = "dados";

                var modeloDeClientes = this.getView().getModel(dados).getData();
                var novoCliente = {
                    nome: modeloDeClientes.nome,
                    dataDeNascimento: modeloDeClientes.dataDeNascimento,
                    sexo: modeloDeClientes.sexo,
                    telefone: modeloDeClientes.telefone,
                };

                if (!ValidacoesCadastro.validarCamposFormulario(this.getView())) {
                    return;
                }
                this.confirmacaoCriacaoCliente(novoCliente, mensagemDeErro)
                    .then((dados) => {
                        this.navegarPaginaDetalhes(dados.id);
                    })
                    .catch((erro) => {
                        console.error(mensagemDeErro, erro);
                        console.log(erro.message);
                    });
            },

            confirmacaoCriacaoCliente: function (novoCliente) {
                const mensagemConfirmacao = "Deseja realmente criar esse novo cliente?";
                const tituloMessageBox = "Confirmação";

                return new Promise((resolve, reject) => {
                    MessageBox.confirm(mensagemConfirmacao, {
                        title: tituloMessageBox,
                        actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                        onClose: function (decisaoCriarCliente) {
                            if (decisaoCriarCliente === MessageBox.Action.YES) {
                                console.log(novoCliente);
                                Repositorio.criarCliente(novoCliente)
                                    .then(resolve)
                                    .catch(reject);
                            }
                        }.bind(this)
                    });
                });
            },
            aoClicarEmCancelar: function () {
                const paginaDeListagem = "listagemClientes";

                var instanciaRota = this.getOwnerComponent().getRouter();
                instanciaRota.navTo(paginaDeListagem, {}, true);
            },
            navegarPaginaDetalhes: function (novoId) {
                const mensagemErro = "ID do cliente inválido, está recebendo undefined";
                const paginaDeDetalhes = "detalhes";

                if (novoId === 0) {
                    console.error(mensagemErro);
                    return;
                }
                this.instanciaRota = this.getOwnerComponent().getRouter();
                this.instanciaRota.navTo(paginaDeDetalhes, { id: novoId });
            }
        });
    }
);