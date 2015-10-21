/*global angular, Parse*/
angular.module("odontologiaApp")
.controller("appScriptEmailCtrl", function(appScriptEmailServices, $state, $stateParams, $scope, growlService){
    
    $scope.recipient = $stateParams.recipient;
    
    if($scope.recipient.length == 0){
        growlService.growl('El paciente no tiene un correo parametrizado', 'inverse');
    }
    
    $scope.enviar = function(){
        appScriptEmailServices.sendEmailWindow($scope.recipient, $scope.subject, $scope.body)
    }
    
})