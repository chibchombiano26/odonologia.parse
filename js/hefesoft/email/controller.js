/*global angular, Parse, hefesoft*/
angular.module("odontologiaApp")
.controller("appScriptEmailCtrl", function(appScriptEmailServices, $state, $stateParams, $scope, growlService){
    
    $scope.recipient = $stateParams.recipient;
    
    if($scope.recipient.length == 0){
        growlService.growl('El paciente no tiene un correo parametrizado', 'inverse');
    }
    
    $scope.enviar = function(){
        if(hefesoft.detectPopUp()){
            appScriptEmailServices.sendEmailWindow($scope.recipient, $scope.subject, $scope.body)
        }
        else{
            growlService.growl("Por favor habilite loas ventanas emergentes para ese sitio para disfrutar de esta funcionalidad (En la parte superior derecha versa una opcion para habilitar esta funcionalidad)", 'warning'); 
        }
    }
    
})