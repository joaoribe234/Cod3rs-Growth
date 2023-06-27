sap.ui.define([
    "sap/m/MessageBox"
], function (MessageBox) {
    "use strict";

    var MessageBoxService = {};

    MessageBoxService.mostrarMessageBoxSalvar = function (mensagem, callback) {
        MessageBox.confirm(mensagem, {
            title: "Confirmação",
            actions: [MessageBox.Action.YES, MessageBox.Action.NO],
            onClose: function (decisao) {
                if (decisao === MessageBox.Action.YES) {
                    callback(true);
                } else {
                    callback(false);
                }
            }
        });
    };

    MessageBoxService.mostrarMessageBoxCancelar = function (mensagem, callback) {
        MessageBox.confirm(mensagem, {
            title: "Confirmação",
            actions: [MessageBox.Action.YES, MessageBox.Action.NO],
            onClose: function (decisao) {
                if (decisao === MessageBox.Action.YES) {
                    callback(true);
                } else {
                    callback(false);
                }
            }
        });
    };

    return MessageBoxService;
});