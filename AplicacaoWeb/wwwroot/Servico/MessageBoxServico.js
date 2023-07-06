sap.ui.define([
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (MessageBox, MessageToast) {
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
        confirmar: function (mensagem, funcaoCallback, id) {
            return MessageBox.confirm(mensagem, {
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: (acao) => {
                    if (acao === MessageBox.Action.YES) {
                        return funcaoCallback.apply(this, id)
                    }
                    return
                }
            })
        },
        mostrarMensagemDeErro: function (mensagem) {
            return MessageBox.error(mensagem);
        },
        mostrarMensagemDeSucesso: function (mensagem) {
            return MessageBox.success(mensagem);
        },

    };
    MessageBoxServico.mostrarMensagemDeSucessoo = function (mensagem, delay) {
        setTimeout(function () {
            MessageBoxServico.mostrarMensagemDeSucesso(mensagem);
        }, delay);
    };

    return MessageBoxServico;
});