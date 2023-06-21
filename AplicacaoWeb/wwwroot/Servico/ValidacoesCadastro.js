sap.ui.define([
    "sap/ui/model/resource/ResourceModel"
], function (ResourceModel) {
    "use strict";

    var i18nModel = new ResourceModel({
        bundleName: "sap.ui.InterfaceUsuario.i18n.i18n",
        bundleUrl: "../i18n/i18n.properties"
    });
    const i18n = i18nModel.getResourceBundle();

    return {
        validarNome: function (valorInserido) {
            const nome = valorInserido.getValue();
            if (!nome) {
                this.mostrarMensagemDeErro(valorInserido, i18n.getText("CampoVazio"));
                return false;
            }
            if (!this.validarNomeCaracteres(nome)) {
                this.mostrarMensagemDeErro(valorInserido, i18n.getText("ValidacaoDoNome"));
                return false;
            }
            if (!this.validarTamanhoMinimoNome(nome)) {
                this.mostrarMensagemDeErro(valorInserido, i18n.getText("ValidarTamanhoMinimo"));
                return false;
            }
            this.removerMensagemDeErro(valorInserido);
            return true;
        },
        validarDataDeNascimento: function (campoDeData) {
            const valorData = campoDeData.getValue();
            if (!valorData) {
                this.mostrarMensagemDeErro(campoDeData, i18n.getText("CampoVazio"));
                return false;
            }
            if (!this.validarDataDeNascimento(valorData)) {
                this.mostrarMensagemDeErro(valorInserido, i18n.getText("TamanhoMinimoDataNascimento"));
                return false;
            }
            this.removerMensagemDeErro(campoDeData);
            return true;
        },

        validarTelefone: function (valorInserido) {
            const telefone = valorInserido.getValue();
            if (!telefone) {
                this.mostrarMensagemDeErro(valorInserido, i18n.getText("CampoVazio"));
                return false;
            }
            if (!this.validarTamanhoMinimoTelefone(telefone)) {
                this.mostrarMensagemDeErro(valorInserido, i18n.getText("TamanhoMininoTelefone"));
                return false;
            }
            this.removerMensagemDeErro(valorInserido);
            return true;
},
        validarSexo: function (valorInserido) {
            const sexo = valorInserido.getValue();
            if (!sexo) {
                this.mostrarMensagemDeErro(valorInserido, i18n.getText("CampoVazio"));
                return false;
            }
            if (sexo !== "Masculino" && sexo !== "Feminino") {
                this.mostrarMensagemDeErro(valorInserido, i18n.getText("SexoEscolhido"));
                return false;
            }
            this.removerMensagemDeErro(valorInserido);
            return true;
},

        validarNomeCaracteres: function (nome) {
            const regex = /^[a-zA-Z\s]+$/;
            return regex.test(nome);
        },

        validarTamanhoMinimoNome: function (tamanhoNome) {
            return tamanhoNome.length >= 2;
        },
        validarTamanhoMinimoTelefone: function (tamanhotelefone) {
            return tamanhotelefone.length > 14;
        },
        validarTamanhoMinimoDataDeNascimento: function (tamanhoDataDeNascimento) {
            return tamanhoDataDeNascimento.length > 9;
        },

        mostrarMensagemDeErro: function (campo, mensagem) {
            campo.setValueState(sap.ui.core.ValueState.Error);
            campo.setValueStateText(mensagem);
        },

        removerMensagemDeErro: function (campo) {
            campo.setValueState(sap.ui.core.ValueState.None);
        }

    };
});