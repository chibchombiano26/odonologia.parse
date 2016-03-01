/*global angular, Parse, hefesoft*/
angular.module("odontologiaApp")
.controller("appScriptEmailCtrl", function(appScriptEmailServices, $state, $stateParams, $scope, growlService, $translate){
    
    $scope.recipient = $stateParams.recipient;
    
    if($scope.recipient.length == 0){
        growlService.growl($translate.instant("EMAIL_PATIENT.MESSAGE_NOT_HAS_EMAIL"), 'inverse');
    }
    
    $scope.enviar = function(){
        appScriptEmailServices.sendEmailWindow($scope.recipient, $scope.subject, $scope.body);
    }
    
})