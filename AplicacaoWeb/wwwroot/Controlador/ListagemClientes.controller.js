sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
       "sap/ui/model/Filter",
       "sap/ui/model/FilterOperator"
    ],
    function (Controller, JSONModel, Filter, FilterOperator) {
        "use strict";
        return Controller.extend("sap.ui.InterfaceUsuario.ListagemClientes", {
            onInit: function () {
                this.dadosClientesApi();
            },
            dadosClientesApi: function () {
                var modeloDeClientes = new JSONModel();
                fetch("api/clientes")
                    .then(resposta => resposta.json())
                    .then(dados => {
                        modeloDeClientes.setData(dados);
                    })
                    .catch(erro => {
                        console.error("Ocorreu algum erro ao obter os clientes cadastrados!", erro);
                    });
                this.getView().setModel(modeloDeClientes);
            },
            buscarCliente: function (oEvent) {
                var arrayFiltro = [];
                var valorDigitadoUsuario = oEvent.getParameter("query");
                if (valorDigitadoUsuario) {
                    arrayFiltro.push(
                        new Filter("nome", FilterOperator.Contains, valorDigitadoUsuario)
                    );
                }
                var obterIdTabela = this.byId("idTabelaCliente");
                var bindngClienteTabela = obterIdTabela.getBinding("items");
                bindngClienteTabela.filter(arrayFiltro);
            },

        });
    }
);
