sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/syncStyleClass",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, syncStyleClass, JSONModel, Filter, FilterOperator) {
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
               },
//Event bei Auswahl eines Kunden.
               onCustomerChange: function (oEvent) {
                var oBindingContext = 
              oEvent.getParameter("listItem").getBindingContext();
                this.byId("bookingTable").setBindingContext(oBindingContext);
               },
//Event bei Filterm.
               onFilterCustomers: function (oEvent) {
                var aFilter = []; //array zur Aufnahme des Filters erstellen.
                var sQuery = oEvent.getParameter("query"); //Wert zum Filtern übernehmen.
//1. Prüfung: ist sQuery instanziiert?
//2. Prüfung: hat sQuery einen Inhalt bzw. müsste hier der eigentliche Inhalt geprüft werden.                
                if (sQuery && sQuery.length > 0) {
                  aFilter.push(new Filter("CustomerName", FilterOperator.Contains, sQuery));
                }
                var oTable = this.byId("customerTable");
                var oBinding = oTable.getBinding("items");
                oBinding.filter(aFilter);
               }               

        });
    });
