/*global angular, moment, hefesoft*/
angular.module("hefesoft.google")
.service("appScriptTemplateServices", function($timeout){
  
  var dataFactory = {};
  
  
  dataFactory.templateWindow = function(parameters){
      parameters = JSON.stringify(parameters);
      var url = "https://script.google.com/macros/s/AKfycby3YAKVm46RibPhE5iv4XNBgqJi9SxxAouZb-EBDMChhUzg_Ek/exec?parameters=" + parameters;
      var win = window.open(url, "_blank");
      hefesoft.detectPopUp.check(win);
      
      /*
      $timeout(function(){
          win.close();
      },8000);
      */
  }
  
 
  return dataFactory;
    
})