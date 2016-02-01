/*global angular, _, Parse, numeral*/
angular.module("odontologiaApp")
.controller('buscarCotizacionModalCtrl', function($scope, callback){
  
  $scope.seleccionado = function(item){
    callback(item);
  }
    
})