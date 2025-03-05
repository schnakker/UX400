sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/syncStyleClass",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, syncStyleClass, JSONModel) {
        "use strict";

        return Controller.extend("sap.training.exc.controller.Overview", {
              
          onInit: function () {
//neue Variable/Object als JSONModel            
            var oModel = new JSONModel();
//Die Struktur des Modells wird zur Laufzeit vergeben und gefüllt. Man kann es auch vorher mit Daten versorgen:
//oModel.setData({
//  "CustomerName": "Anna Muster",
//  "Street": "Anna Lyse"
//})
            this.getView().setModel(oModel, "customer"); //JSON Object wird dem Programm zu gewiesen. Das Modell bekommt Programmintern den Namen "customer".
           },
          
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
