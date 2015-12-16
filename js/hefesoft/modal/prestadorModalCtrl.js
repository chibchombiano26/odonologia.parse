/*global angular*/
angular.module("odontologiaApp")
.controller("prestadorModelCtrl", function($scope, callback){
    
    $scope.prestadorSeleccionado = function(item){
        callback({item : item});
    }
    
})