/*global angular, _, Parse, numeral*/
angular.module("odontologiaApp")
.controller('buscarPacienteModalCtrl', function($scope, callback){
  
  $scope.seleccionado = function(item){
    callback(item);
  }
    
})