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
                this.getView().setModel(objetoModeloDeClientes);
            },
            cliqueVoltar: function () {
                const viewListagem = "listagemClientes";
                var historicoNavegacao = History.getInstance();
                var obterHashAnterior = historicoNavegacao.getPreviousHash();

                if (obterHashAnterior !== undefined) {
                    window.history.go(-1);
                } else {
                    var instanciaRota = this.getOwnerComponent().getRouter();
                    instanciaRota.navTo(viewListagem, {}, true);
                }
            },
            cliqueSalvarCliente: function () {
                const viewListagem = "listagemClientes";
                const mensagemDeErro = "Erro ao cadastrar cliente";
                const metodoAdicionar = "POST";
                const aplicacaoJson = "application/json";
                var modeloDeCliente = this.getView();
                var dadosDoNovoCliente = modeloDeCliente.getData();

                var novoCliente = {
                    nome: dadosDoNovoCliente.nome,
                    dataDeNascimento: dadosDoNovoCliente.dataDeNascimento,
                    sexo: dadosDoNovoCliente.sexo,
                    telefone: dadosDoNovoCliente.telefone

                };
                console.log(novoCliente);

                fetch("https://localhost:7258/api/clientes", {
                    method: metodoAdicionar,
                    headers: {
                        "Content-Type": aplicacaoJson,
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
                        var instanciaRota = this.getOwnerComponent().getRouter();
                        instanciaRota.navTo(viewListagem, {}, true);
                    })
                    .catch((erro) => console.error(mensagemDeErro, erro));
                this.limparInputsFormulario();
            },
            limparInputsFormulario: function () {
                const idNome = "Nome";
                const idDataDeNascimento = "dataDeNascimento";
                const idSexo = "Sexo";
                const idTelefone = "Telefone";

                var nomeInput = this.byId(idNome);
                nomeInput.setValue("");
                var dataDeNascimentoInput = this.byId(idDataDeNascimento);
                dataDeNascimentoInput.setValue("");
                var sexoInput = this.byId(idSexo);
                sexoInput.setValue("");
                var telefoneInput = this.byId(idTelefone);
                telefoneInput.setValue("");
            },
            cliqueCancelar: function () {
                const viewListagem = "listagemClientes";
                var instanciaRota = this.getOwnerComponent().getRouter();
                instanciaRota.navTo(viewListagem, {}, true);
                this.limparInputsFormulario();
            }
        });
    }
);

