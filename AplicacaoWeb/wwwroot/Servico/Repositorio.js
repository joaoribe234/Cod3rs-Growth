﻿sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    "use strict";

    var Repositorio = {
        UrlBase: "https://localhost:7258/api/clientes",
        headers: {
            'Content-Type': 'application/json',
        },
        fetchOptions: {
            headers: this.headers
        }
    };

    Repositorio.obterClientes = function () {
        return fetch(this.UrlBase)
            .then(resposta => resposta.json());
    };

    Repositorio.obterClientePorId = function (id) {
        const url = `${this.UrlBase}/${id}`;
        return fetch(url)
            .then(resposta => resposta.json());
    };
    function construirNovoCliente(modeloDeClientes) {
        return {
            nome: modeloDeClientes.nome,
            dataDeNascimento: modeloDeClientes.dataDeNascimento,
            sexo: modeloDeClientes.sexo,
            telefone: modeloDeClientes.telefone,
        };
    }

    Repositorio.criarCliente = function (modeloDeClientes) {
        var novoCliente = construirNovoCliente(modeloDeClientes);
        return fetch(this.UrlBase, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(novoCliente),
        })
            .then(resposta => resposta.json());
    };

    function construirClienteAtualizado(modeloDeClientes) {
        return {
            id: modeloDeClientes.id,
            nome: modeloDeClientes.nome,
            dataDeNascimento: modeloDeClientes.dataDeNascimento,
            sexo: modeloDeClientes.sexo,
            telefone: modeloDeClientes.telefone,
        };
    }

    Repositorio.atualizarCliente = function (id, modeloDeClientes) {
        var clienteAtualizado = construirClienteAtualizado(modeloDeClientes);
        const url = `${this.UrlBase}/${modeloDeClientes.id}`;
        return fetch(url, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify(clienteAtualizado),
        })
            .then(resposta => resposta.json());
    };

    Repositorio.removerCliente = function (id) {
        const url = `${this.UrlBase}/${id}`;
        return fetch(url, {
            method: "DELETE"
        });
    };

    return Repositorio;
});
