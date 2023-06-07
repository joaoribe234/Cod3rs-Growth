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
                const mensagemDeErro = "Ocorreu algum erro ao obter os clientes cadastrados!";
                var modeloDeClientes = new JSONModel();

                fetch("https://localhost:7258/api/clientes")
                    .then(dados => dados.json())
                    .then(dados => modeloDeClientes.setData({ clientes: dados }))
                    .catch(erro => console.error(mensagemDeErro, erro));
                this.getView().setModel(modeloDeClientes);
            },
         
            buscarCliente: function (oEvent) {
                const idTabelaCliente = "idTabelaCliente";
                const consulta = "query";
                const items = "items";
                const nomeCliente = "nome";

                var arrayFiltro = [];
                var valorDigitadoUsuario = oEvent.getParameter(consulta);
                if (valorDigitadoUsuario) {
                    arrayFiltro.push(new Filter(nomeCliente, FilterOperator.Contains, valorDigitadoUsuario));
                }
                var obterIdTabela = this.byId(idTabelaCliente);
                var bindingClienteTabela = obterIdTabela.getBinding(items);
                bindingClienteTabela.filter(arrayFiltro);
            },
            cliqueAdicionarCliente: function () {
                var oRota = this.getOwnerComponent().getRouter();
                oRota.navTo("cadastro");
            },
            aoclicarCliente: function (oEvent) {
                const detalhes = "detalhes";
                var idObtido = oEvent.getSource().getBindingContext().getProperty("id");
                var instanciaRota = this.getOwnerComponent().getRouter();
                instanciaRota.navTo(detalhes, { id: idObtido });
            },
        });
    }
);
