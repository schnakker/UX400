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
                this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
               }

      });
    });