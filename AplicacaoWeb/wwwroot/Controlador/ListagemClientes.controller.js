sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "../Servico/Repositorio"
    ],
    function (Controller, JSONModel, Filter, FilterOperator, Repositorio) {
        "use strict";
        const caminhoControladorDeListagem = "sap.ui.InterfaceUsuario.ListagemClientes";
        return Controller.extend(caminhoControladorDeListagem, {
            onInit: function () {
                const paginaListagem = "listagemClientes";
                this.getOwnerComponent().getRouter().getRoute(paginaListagem).attachMatched(this.aoCoincidirRota, this);  
            },

            aoCoincidirRota: function () {
                this.carregarDadosClientesApi();
            },

            carregarDadosClientesApi: function () {
                var modeloDeClientes = new JSONModel();

                Repositorio.obterClientes()
                    .then(dados => modeloDeClientes.setData({ clientes: dados }))
                    .catch(erro => console.error( erro))
                this.getView().setModel(modeloDeClientes);
            },
            filtrarCliente: function (oEvent) {
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

            navegarParaPaginaDeCadastro: function () {
                const paginaDeCadastro = "cadastro";
                this.getOwnerComponent().getRouter().navTo(paginaDeCadastro);
            },
            
            aoClicarNoCliente: function (oEvent) {
                const paginaDedetalhes = "detalhes";
                const idCLiente = "id";
                var idObtido = oEvent.getSource().getBindingContext().getProperty(idCLiente);
                this.getOwnerComponent().getRouter().navTo(paginaDedetalhes, { id: idObtido });
            },
        });
    }
);
