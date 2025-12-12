sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], (Controller, JSONModel, MessageToast) => {
    "use strict";

    return Controller.extend("northwinddemo.controller.Overview", {
        onInit: function () {
            var oModel = new JSONModel();
            this.getView().setModel(oModel, "input");
        },

        onSave: function () {
            var oModelData = this.getView().getModel("input").getData();
            var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

            //if (oModelData.Discount === undefined) { oModelData.Discount = 0; }

            this.byId("productTable").getBinding("items").create({
                "ID": oModelData.ID,
                "Name": oModelData.Name,
                "Description": oModelData.Description,
                "ReleaseDate": oModelData.ReleaseDate,
                "DiscontinuedDate": oModelData.DiscontinuedDate,
                "Rating": oModelData.Rating,
                "Price": oModelData.Price
            }).created().then(function () {
                MessageToast.show(oResourceBundle.getText("productCreatedMessage"));
            });

        }
    });
});