sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/ColumnListItem",
    "sap/m/Input",
    "sap/base/util/deepExtend"
], (Controller, JSONModel, MessageToast, ColumnListItem, Input, deepExtend) => {
    "use strict";

    return Controller.extend("northwinddemo.controller.Overview", {
        onInit: function () {
            var oModel = new JSONModel();
            this.getView().setModel(oModel, "input");

            this.oTable = this.byId("productTable");
            this.oReadOnlyTemplate = this.byId("productTable").removeItem(0);
            this.rebindTable(this.oReadOnlyTemplate, "Navigation");
            this.oEditableTemplate = new ColumnListItem({
                cells: [new Input({ value: "{Name}" }),
                new Input({ value: "{Description}" }),
                new Input({ value: "{ReleaseDate}" }),
                new Input({ value: "{DiscontinuedDate}" }),
                new Input({ value: "{Rating}" }),
                new Input({ value: "{Price}" })
                ]
            });
        },

        rebindTable: function (oTemplate, sKeyboardMode) {
            this.oTable.bindItems({
                path: "/Products",
                template: oTemplate,
                templateShareable: true,
                key: "ID"
            });
        },

        onSave: function () {
            // var oModelData = this.getView().getModel("input").getData();
            // var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

            // //if (oModelData.Discount === undefined) { oModelData.Discount = 0; }

            // this.byId("productTable").getBinding("items").create({
            //     "ID": oModelData.ID,
            //     "Name": oModelData.Name,
            //     "Description": oModelData.Description,
            //     "ReleaseDate": oModelData.ReleaseDate,
            //     "DiscontinuedDate": oModelData.DiscontinuedDate,
            //     "Rating": oModelData.Rating,
            //     "Price": oModelData.Price
            // }).created().then(function () {
            //     MessageToast.show(oResourceBundle.getText("productCreatedMessage"));
            // });

            var oModelCreate = this.getOwnerComponent().getModel();
            oModelCreate.setUseBatch(false);
            
            oModelCreate.create("/Products", {
                ID: 9,
                Name: "Test",
                Description: "Test description",
                ReleaseDate: new Date(),
                Rating: 5,
                Price: "100.00"
            }, {
                success: function (oData) {
                    console.log("Product created", oData);
                },
                error: function (oError) {
                    console.error("Create failed", oError);
                }
            });

        },

        editProducts: function () {
            this.aProductCollection = deepExtend([], this.getView().getModel().getProperty("/Products"));
            this.byId("editProducts").setVisible(false);
            this.byId("saveButton").setVisible(true);
            this.byId("cancelButton").setVisible(true);
            this.rebindTable(this.oEditableTemplate, "Edit Products");
        },

        onCancel: function () {
            this.byId("cancelButton").setVisible(false);
            this.byId("saveButton").setVisible(false);
            this.byId("editProducts").setVisible(true);
            this.getView().getModel().setProperty("/Products", this.aProductCollection);
            this.rebindTable(this.oReadOnlyTemplate, "Navigation");
        },

        onSaveTable: function (oEvent) {

            var oTable = this.byId("productTable");
            var aItems = oTable.getItems();
            var oModel = this.getOwnerComponent().getModel();
            oModel.setUseBatch(false);
            var oId = 0;

            aItems.forEach(function (oItem) {
                var aCells = oItem.getCells();
                var sName = aCells[0].getValue();
                var sDesc = aCells[1].getValue();
                var sRelDate = aCells[2].getValue();
                var sDisconDate = aCells[3].getValue();
                var sRating = aCells[4].getValue();
                var sPrice = aCells[5].getValue();

                oModel.update("/Products(" + oId + ")", {
                    Rating: sRating,
                    Name: sName
                });

                oId = oId + 1;

            });

            oModel.refresh(true);

            this.byId("saveButton").setVisible(false);
            this.byId("cancelButton").setVisible(false);
            this.byId("editProducts").setVisible(true);
            this.rebindTable(this.oReadOnlyTemplate, "Navigation");
        },
    });
});