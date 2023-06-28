sap.ui.define([
    "sap/m/MessageBox"
], function (MessageBox) {
    "use strict";

    var MessageBoxServico = {};

    MessageBoxServico.mostrarMessageBox = function (mensagem, callback, title, actions) {
        MessageBox.confirm(mensagem, {
            title: title || "Confirmação",
            actions: actions || [MessageBox.Action.YES, MessageBox.Action.NO],
            onClose: function (decisao) {
                if (decisao === MessageBox.Action.YES) {
                    callback(true);
                } else {
                    callback(false);
                }
            }
        });
    };
    MessageBoxServico.mostrarMensagemDeSucesso = function (mensagem, title) {
        MessageBox.success(mensagem, {
            title: title || "Sucesso"
        });
    };
    MessageBoxServico.mostrarMensagemDeErro = function (mensagem, title) {
        MessageBox.error(mensagem, {
            title: title || "Erro"
        });
    };

    return MessageBoxServico;
});