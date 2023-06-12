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
                var instanciaRota = this.getOwnerComponent().getRouter();
                instanciaRota.getRoute(rotaCadastro).attachMatched(this.rotaCorrespondida, this);
            },
            rotaCorrespondida: function (oEvent) {
                var objetoDeDadosCliente = {
                    "nome": "",
                    "dataDeNascimento": "",
                    "sexo": "",
                    "telefone": ""
                };
                var objetoModeloDeClientes = new JSONModel(objetoDeDadosCliente);
                this.getView().setModel(objetoModeloDeClientes, "dados");
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
                const paginaDetalhes = "detalhes";
                const mensagemDeErro = "Erro ao cadastrar cliente";
                var modeloDeCliente = this.getView().getModel("dados");
                var dadosDoNovoCliente = modeloDeCliente.getData();
                var novoCliente = {
                    nome: dadosDoNovoCliente.nome,
                    dataDeNascimento: dadosDoNovoCliente.dataDeNascimento,
                    sexo: dadosDoNovoCliente.sexo,
                    telefone: dadosDoNovoCliente.telefone
                };
                console.log(novoCliente);
                fetch("https://localhost:7258/api/clientes", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(novoCliente)
                })
                    .then((resposta) => {
                        if (!resposta.ok) {
                            throw new Error(mensagemDeErro);
                        }
                        return resposta.json();
                        this.limparInputsFormulario();
                    })
                    .then((dados) => {
                        var instanciaRota = this.getOwnerComponent().getRouter();
                        instanciaRota.navTo(paginaDetalhes, { id: dados.id }, true);
                    })
                    .catch((erro) => {
                        console.error(mensagemDeErro, erro);
                        console.log(erro.message); 
                    });
            },
            limparInputsFormulario: function () {
                var dadosInput = this.getView().getModel("dados");
                dadosInput.setProperty("/nome", "");
                dadosInput.setProperty("/dataDeNascimento", "");
                dadosInput.setProperty("/sexo", "");
                dadosInput.setProperty("/telefone", "");
            },
            cliqueCancelar: function () {
                const paginaListagem = "listagemClientes";
                var instanciaRota = this.getOwnerComponent().getRouter();
                instanciaRota.navTo(paginaListagem, {}, true);
                this.limparInputsFormulario();
            }
        });
    }
);