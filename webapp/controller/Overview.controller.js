sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("northwinddemo.controller.Overview", {
        onInit: function () {
            var oModel = new JSONModel();
            this.getView().setModel(oModel, "input");
        }
    });
});