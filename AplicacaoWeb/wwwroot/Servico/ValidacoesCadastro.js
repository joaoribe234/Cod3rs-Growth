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
            const mensagemCampoVazio = "CampoVazio";
            const mensagemValidacaoNome = "ValidacaoDoNome";
            const mensagemTamanhoMinimoNome = "ValidarTamanhoMinimo";

            if (!nome) {
                this.mostrarMensagemDeErro(valorInserido, i18n.getText(mensagemCampoVazio));
                return false;
            }
            if (!this.validarNomeCaracteres(nome)) {
                this.mostrarMensagemDeErro(valorInserido, i18n.getText(mensagemValidacaoNome));
                return false;
            }
            if (!this.validarTamanhoMinimoNome(nome)) {
                this.mostrarMensagemDeErro(valorInserido, i18n.getText(mensagemTamanhoMinimoNome));
                return false;
            }
            this.removerMensagemDeErro(valorInserido);
            return true;
        },
        validarDataDeNascimento: function (campoDeData) {
            const valorData = campoDeData.getValue();
            const quantidadeDeCaracteres = 10;
            const quaintidadeVazia = 0;
            const idadeMaxima = 150;
            const mensagemCampoVazio = "CampoVazio";
            const mensagemIdadeMaximaExcedida = "IdadeMaximaExcedida";
            const mensagemDataFuturaInvalida = "DataFuturaInvalida";
            const mensagemFormatoInvalido = "FormatoDataInvalido";

            let dataInserida = new Date(valorData);
            let dataDeHoje = new Date(Date.now());

            if (valorData.length == quaintidadeVazia) {
                this.mostrarMensagemDeErro(campoDeData, i18n.getText(mensagemCampoVazio));
                return false;
            }
            if (dataDeHoje.getFullYear() - dataInserida.getFullYear() > idadeMaxima) {
                this.mostrarMensagemDeErro(campoDeData, i18n.getText(mensagemIdadeMaximaExcedida));
                return false;
            }
            if (dataInserida > dataDeHoje) {
                this.mostrarMensagemDeErro(campoDeData, i18n.getText(mensagemDataFuturaInvalida));
                return false;
            }
            if (valorData.length <= quantidadeDeCaracteres) {
                this.mostrarMensagemDeErro(campoDeData, i18n.getText(mensagemFormatoInvalido));
                return false;
            }
            if (isNaN(dataInserida.getTime())) {
                this.mostrarMensagemDeErro(campoDeData, i18n.getText(mensagemFormatoInvalido));
                return false;
            }
            this.removerMensagemDeErro(campoDeData);
            return true;
        },
        validarTelefone: function (valorInserido) {
            const telefone = valorInserido.getValue();
            const mensagemCampoVazio = "CampoVazio";
            const mensagemmTamanhoMinimoTelefone = "TamanhoMininoTelefone";

            if (!telefone) {
                this.mostrarMensagemDeErro(valorInserido, i18n.getText(mensagemCampoVazio));
                return false;
            }
            if (!this.validarTamanhoMinimoTelefone(telefone)) {
                this.mostrarMensagemDeErro(valorInserido, i18n.getText(mensagemmTamanhoMinimoTelefone));
                return false;
            }
            this.removerMensagemDeErro(valorInserido);
            return true;
        },
        validarSexo: function (valorInserido) {
            const sexo = valorInserido.getValue();
            const mensagemCampoVazio = "CampoVazio";
            const mensagemSexoEscolhido = "SexoEscolhido";
            const sexoMasculino = "Masculino";
            const sexoFeminino = "Feminino";

            if (!sexo) {
                this.mostrarMensagemDeErro(valorInserido, i18n.getText(mensagemCampoVazio));
                return false;
            }
            if (sexo !== sexoMasculino && sexo !== sexoFeminino) {
                this.mostrarMensagemDeErro(valorInserido, i18n.getText(mensagemSexoEscolhido));
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
            const tamanhoMinimoNome = 2;

            return tamanhoNome.length >= tamanhoMinimoNome;
        },
        validarTamanhoMinimoTelefone: function (tamanhoTelefone) {
            const tamanhoMininoTelefone = 14;

            return tamanhoTelefone.length > tamanhoMininoTelefone;
        },
        validarFormatoData: function (valorData) {
            const regex = /^\d{2}\/\d{2}\/\d{4}$/;

            return regex.test(valorData);
        },

        mostrarMensagemDeErro: function (campo, mensagem) {
            campo.setValueStateText(mensagem);
            campo.setValueState(sap.ui.core.ValueState.Error);
        },
        removerMensagemDeErro: function (campo) {
            campo.setValueState(sap.ui.core.ValueState.None);
        },
        validarCamposFormulario: function (campoNome, campoData, campoTelefone, campoSexo) {

            if (!this.validarNome(campoNome)) {
                return false;
            }
            if (!this.validarDataDeNascimento(campoData)) {
                return false;
            }
            if (!this.validarTelefone(campoTelefone)) {
                return false;
            }
            if (!this.validarSexo(campoSexo)) {
                return false;
            }
            return true;
        }
    };
});