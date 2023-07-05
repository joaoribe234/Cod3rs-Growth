﻿sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    "use strict";

    var Repositorio = {};

    Repositorio.obterClientes = function () {
        const url = "https://localhost:7258/api/clientes";
        return fetch(url)
            .then(response => response.json());
    };

    Repositorio.obterClientePorId = function (id) {
        const url = `https://localhost:7258/api/clientes/${id}`;
        return fetch(url)
            .then(response => response.json());
    };

    Repositorio.criarCliente = function (modeloDeClientes) {
        var novoCliente = {
            nome: modeloDeClientes.nome,
            dataDeNascimento: modeloDeClientes.dataDeNascimento,
            sexo: modeloDeClientes.sexo,
            telefone: modeloDeClientes.telefone,
        };
        const url = "https://localhost:7258/api/clientes";
        return fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoCliente),
        })
            .then(response => response.json());
    };
    Repositorio.atualizarCliente = function (id, modeloDeClientes) {
        var clienteAtualizado = {
            id: modeloDeClientes.id,
            nome: modeloDeClientes.nome,
            dataDeNascimento: modeloDeClientes.dataDeNascimento,
            sexo: modeloDeClientes.sexo,
            telefone: modeloDeClientes.telefone,
        };
        const url = `https://localhost:7258/api/clientes/${modeloDeClientes.id}`;
        return fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clienteAtualizado),
        })
            .then(response => response.json());
    };
    Repositorio.removerCliente = function (id) {
        const url = `https://localhost:7258/api/clientes/${id}`;
        return fetch(url, {
            method: "DELETE"
        });
    };
    return Repositorio;
});