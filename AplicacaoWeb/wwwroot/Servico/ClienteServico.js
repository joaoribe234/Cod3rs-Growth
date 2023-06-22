//sap.ui.define([
//    "sap/ui/model/json/JSONModel"
//], function (JSONModel) {
//    "use strict";

//    return {
//        obterClientes: function () {
//            const mensagemDeErro = "Ocorreu algum erro ao obter os clientes cadastrados!";
//            var modeloDeClientes = new JSONModel();

//            return fetch("https://localhost:7258/api/clientes")
//                .then(dados => dados.json())
//                .then(dados => {
//                    modeloDeClientes.setData({ clientes: dados });
//                    return modeloDeClientes;
//                })
//                .catch(erro => {
//                    console.error(mensagemDeErro, erro);
//                    throw new Error(mensagemDeErro);
//                });
//        },
//        obterClientePorId: function (id) {
//            var modeloDeClientes = new JSONModel();
//            return fetch(`https://localhost:7258/api/clientes/${id}`)
//                .then(dados => dados.json())
//                .then(dados => {
//                    modeloDeClientes.setData({ cliente: dados });
//                    return modeloDeClientes;
//                })
//                .catch(erro => {
//                    console.error(mensagemDeErro, erro);
//                    throw new Error(mensagemDeErro);
//                });
//        },
//        criarCliente: function (novoCliente) {
//            const mensagemDeErro = "Erro ao cadastrar cliente";
//            return fetch("https://localhost:7258/api/clientes", {
//                method: "POST",
//                headers: {
//                    'Content-Type': 'application/json',
//                },
//                body: JSON.stringify(novoCliente),
//            })
//                .then(resposta => {
//                    if (!resposta.ok) {
//                        throw new Error(mensagemDeErro);
//                    }
//                    return resposta.json();
//                })
//                .catch(erro => {
//                    console.error(mensagemDeErro, erro);
//                    throw new Error(mensagemDeErro);
//                });
//        }
//    };
//});

