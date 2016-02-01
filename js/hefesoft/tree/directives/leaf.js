/*global angular, _, Parse, numeral*/
angular.module("odontologiaApp")
.directive("leaf", function(){
    
    var directiva = {};
    
    directiva.restrict = "E";
    directiva.templateUrl = "js/hefesoft/tree/template/leaf.html";
    directiva.scope = {
        
        urlImagen : "=",
        texto : "=",
        activo: "=",
        callback: '&'
    }
    
    return directiva;
})