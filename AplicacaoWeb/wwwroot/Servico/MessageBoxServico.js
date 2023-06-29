sap.ui.define([
    "sap/m/MessageBox"
], function (MessageBox) {
    "use strict";

    var MessageBoxServico = {
        mostrarMessageBox: function (mensagem, callback, title, actions) {
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
        },
        mostrarMensagemDeSucesso: function (mensagem, title) {
            MessageBox.success(mensagem, {
                title: title || "Sucesso"
            });
        },
        mostrarMensagemDeErro: function (mensagem, title) {
            MessageBox.error(mensagem, {
                title: title || "Erro"
            });
        }
    };
    MessageBoxServico.mostrarMensagemDeSucessoo = function (mensagem, delay) {
        setTimeout(function () {
            MessageBoxServico.mostrarMensagemDeSucesso(mensagem);
        }, delay);
    };

    return MessageBoxServico;
});