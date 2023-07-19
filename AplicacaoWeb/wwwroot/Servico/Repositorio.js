sap.ui.define([
    "../Servico/MessageBoxServico"

], function ( MessageBoxServico) {
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

    Repositorio.obterClientes = async function () {
        try {
            const resposta = await fetch(this.UrlBase);
            return resposta.json();
        }
         catch(erro) {
           MessageBoxServico.mostrarMessageBox(erro.message);
            };
    };
    Repositorio.obterClientePorId = async function (id) {
        const urlAoObterPorId = `${this.UrlBase}/${id}`;
        try {
            const resposta = await fetch(urlAoObterPorId);
            return resposta.json();
        }
        catch(erro) {
                MessageBoxServico.mostrarMessageBox(erro.message);
            };
    };
    function construirNovoCliente(modeloDeClientes) {
        return {
            nome: modeloDeClientes.nome,
            dataDeNascimento: modeloDeClientes.dataDeNascimento,
            sexo: modeloDeClientes.sexo,
            telefone: modeloDeClientes.telefone,
        };
    }

    Repositorio.criarCliente = async function (modeloDeClientes) {
        var novoCliente = construirNovoCliente(modeloDeClientes);
        try {
            const resposta = await fetch(this.UrlBase, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(novoCliente),
            });
            return resposta.json();
            }
        catch(erro) {
                MessageBoxServico.mostrarMessageBox(erro.message);
            };
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

    Repositorio.atualizarCliente = async function (id, modeloDeClientes) {
        var clienteAtualizado = construirClienteAtualizado(modeloDeClientes);
        const urlAoAtualizar = `${this.UrlBase}/${modeloDeClientes.id}`;
        try {
            const resposta = await fetch(urlAoAtualizar, {
                method: "PUT",
                headers: this.headers,
                body: JSON.stringify(clienteAtualizado),
            });
            return resposta.json();
        }
        catch(erro) {
                MessageBoxServico.mostrarMessageBox(erro.message);
            };
    };

    Repositorio.removerCliente = async function (id) {
        const urlAoRemover = `${this.UrlBase}/${id}`;
        try {
            const resposta = await fetch(urlAoRemover, {
                method: "DELETE"
            });
            return resposta.json();
        }
        catch(erro) {
                MessageBoxServico.mostrarMessageBox(erro.message);
            };
    };

    return Repositorio;
});