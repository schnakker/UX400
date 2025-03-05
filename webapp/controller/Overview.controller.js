sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/syncStyleClass"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, syncStyleClass) {
        "use strict";

        return Controller.extend("sap.training.exc.controller.Overview", {
              
               onSave: function () {
//Fragment wird nur instanziert, wenn es noch nicht existiert.                    
                if (!this.pDialog) {
                  this.pDialog = this.loadFragment({
                    name: "sap.training.exc.view.Dialog"
                  }).then(function (oDialog) {

//Übergeben der Conten Density Informationen an den Dialog.                    
              syncStyleClass(this.getOwnerComponent().getContentDensityClass(), 
              this.getView(), oDialog);
                    return oDialog;
                  }.bind(this));
                }
                this.pDialog.then(function (oDialog) {
                  oDialog.open();
                });
               },

//Schließen des Pop-Ups.               
               onCloseDialog: function () {
//byId = Id im Dialog.fragment.xml.
                this.byId("dialog").close();
               }

        });
    });
