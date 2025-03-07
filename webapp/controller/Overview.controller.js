sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/syncStyleClass",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, syncStyleClass, JSONModel, Filter, FilterOperator, MessageToast) {
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
//Binding der eingegebenen Daten in der App.
                var oModelData = this.getView().getModel("customer").getData();
//Binding der Übersetzungen.
                var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

                if (oModelData.Discount === undefined) { oModelData.Discount = 0; }
//Übergeben der eingegebenen Daten an die Schnittstelle zum Speichern.
                this.byId("customerTable").getBinding("items").create({
                  "Form": oModelData.Form,
                  "CustomerName": oModelData.CustomerName,
                  "Discount": oModelData.Discount + "",
                  "Street": oModelData.Street,
                  "PostCode": oModelData.PostCode,
                  "City": oModelData.City,
                  "Country": oModelData.Country,
                  "Email": oModelData.Email,
                  "Telephone": oModelData.Telephone
                }).created().then(function () {
                  MessageToast.show(oResourceBundle.getText("customerCreatedMessage"));
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
