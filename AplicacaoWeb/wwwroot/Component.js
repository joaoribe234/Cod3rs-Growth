sap.ui.define(
    [
        "sap/ui/core/UIComponent",
        "sap/ui/model/resource/ResourceModel",
    ],
    function (UIComponent, ResourceModel) {
        "use strict";
        return UIComponent.extend("sap.ui.AplicacaoWeb.Component", {
            metadata: {
                interfaces: ["sap.ui.core.IAsyncContentCreation"],
                manifest: "json",
            },
            init: function () {
                UIComponent.prototype.init.apply(this, arguments);
                var i18nModel = new ResourceModel({
                    bundleName: "sap.ui.AplicacaoWeb.i18n.i18n",
                });
                this.setModel(i18nModel, "i18n");
            },
        });
    }
);
