sap.ui.define(
    [
        "./BaseController.controller",
        "sap/ui/model/json/JSONModel",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "../Servico/Repositorio",
        "sap/ui/core/BusyIndicator"
    ],
    function (BaseController, JSONModel, Filter, FilterOperator, Repositorio, BusyIndicator) {
        "use strict";
        const caminhoControladorDeListagem = "sap.ui.InterfaceUsuario.ListagemClientes";
        return BaseController.extend(caminhoControladorDeListagem, {
            onInit: function () {
                const paginaListagem = "listagemClientes";
                this.getOwnerComponent().getRouter().getRoute(paginaListagem).attachMatched(this.aoCoincidirRota, this);
            },
            aoCoincidirRota: function () {
                this._processarEvento(() => {
                    this.carregarDadosClientesApi();
                });
            },
            carregarDadosClientesApi: function () {
                var modeloDeClientes = new JSONModel();
                BusyIndicator.show();
                Repositorio.obterClientes()
                    .then(dados => modeloDeClientes.setData({ clientes: dados }))
                this.getView().setModel(modeloDeClientes);
                BusyIndicator.hide();
            },
            filtrarCliente: function (evento) {
                this._processarEvento(() => {
                    const idTabelaCliente = "idTabelaCliente";
                    const consulta = "query";
                    const items = "items";
                    const nomeCliente = "nome";

                    var arrayFiltro = [];
                    var valorDigitadoUsuario = evento.getParameter(consulta);
                    if (valorDigitadoUsuario) {
                        arrayFiltro.push(new Filter(nomeCliente, FilterOperator.Contains, valorDigitadoUsuario));
                    }
                    var obterIdTabela = this.byId(idTabelaCliente);
                    var bindingClienteTabela = obterIdTabela.getBinding(items);
                    bindingClienteTabela.filter(arrayFiltro);
                })
            },
            navegarParaPaginaDeCadastro: function () {
                BusyIndicator.show();
                this._processarEvento(() => {
                    const paginaDeCadastro = "cadastro";
                    this.aoNavegar(paginaDeCadastro);
                });
                BusyIndicator.hide();
            },
            aoClicarNoCliente: function (evento) {
                BusyIndicator.show();
                this._processarEvento(() => {
                    const paginaDedetalhes = "detalhes";
                    const idCLiente = "id";
                    var idObtido = evento.getSource().getBindingContext().getProperty(idCLiente);
                    this.getOwnerComponent().getRouter().navTo(paginaDedetalhes, { id: idObtido });
                });
                BusyIndicator.hide();
            }
        });
    }
);