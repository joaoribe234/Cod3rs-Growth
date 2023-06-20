sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History",
        "sap/ui/model/json/JSONModel"
    ],
    function (Controller, History, JSONModel) {
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
            cliqueVoltar: function () {
                const paginaListagem = "listagemClientes";
                var historicoNavegacao = History.getInstance();
                var obterHashAnterior = historicoNavegacao.getPreviousHash();
                if (obterHashAnterior !== undefined) {
                    window.history.go(-1);
                } else {
                    var instanciaRota = this.getOwnerComponent().getRouter();
                    instanciaRota.navTo(paginaListagem, {}, true);
                }
            },
            cliqueSalvarCliente: function () {
                const mensagemDeErro = "Erro ao cadastrar cliente";
                const dados = "dados";
                var modeloDeClientes = this.getView().getModel(dados).getData();
                var novoCliente = {
                    nome: modeloDeClientes.nome,
                    dataDeNascimento: modeloDeClientes.dataDeNascimento,
                    sexo: modeloDeClientes.sexo,
                    telefone: modeloDeClientes.telefone,
                };
                console.log(novoCliente);
                fetch("https://localhost:7258/api/clientes", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(novoCliente),
                })
                    .then((resposta) => {
                        if (!resposta.ok) {
                            throw new Error(mensagemDeErro);
                        }
                        return resposta.json();
                    })
                    .then((dados) => {
                        this.navegarPaginaDetalhes(dados.id);
                    })
                    .catch((erro) => {
                        console.error(mensagemDeErro, erro);
                        console.log(erro.message);
                    });
            },
            cliqueCancelar: function () {
                const paginaListagem = "listagemClientes";
                var instanciaRota = this.getOwnerComponent().getRouter();
                instanciaRota.navTo(paginaListagem, {}, true);
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
