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
            this.oEditableTemplate = new ColumnListItem({ cells: [  new Input({ value: "{ID}" }),
                                                                    new Input({ value: "{Name}" }), 
                                                                    new Input({ value: "{Description}" }), 
                                                                    new Input({ value: "{ReleaseDate}" }) 
                                                                ]
                                                        });
        },

        rebindTable: function(oTemplate, sKeyboardMode) {
			this.oTable.bindItems({
				path: "/Products",
				template: oTemplate,
				templateShareable: true,
				key: "ID"
			});
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

            // this.byId("saveButton").setVisible(false);
			// this.byId("cancelButton").setVisible(false);
			// this.byId("editButton").setVisible(true);
			// this.rebindTable(this.oReadOnlyTemplate, "Navigation");

        },

        editProducts: function() {
			this.aProductCollection = deepExtend([], this.getView().getModel().getProperty("/Products"));
			this.byId("editProducts").setVisible(false);
			this.byId("saveButton").setVisible(true);
			this.byId("cancelButton").setVisible(true);
			this.rebindTable(this.oEditableTemplate, "Edit Products");
		},

		onCancel: function() {
			this.byId("cancelButton").setVisible(false);
			this.byId("saveButton").setVisible(false);
			this.byId("editProducts").setVisible(true);
			this.getView().getModel().setProperty("/Products", this.aProductCollection);
			this.rebindTable(this.oReadOnlyTemplate, "Navigation");
		},
    });
});