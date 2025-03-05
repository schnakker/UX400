sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
   ],
    function (Controller, MessageBox) {
      "use strict";
      return Controller.extend("sap.training.exc.controller.App", {
/*        onSayHello1: function () {
          MessageBox.information("Hello World1");
        }, */
/*        onSayHello2: function () {
            MessageBox.information("Hello World2");
          } */

            onInit: function () {
//                this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
//Die Zeile kann zerlegt werden in einzelne Komponeten.
              var oOwner = this.getOwnerComponent();
              var sClass = oOwner.getContentDensityClass();
              var oView = this.getView();
              oView.addStyleClass(sClass);

               }

      });
    });