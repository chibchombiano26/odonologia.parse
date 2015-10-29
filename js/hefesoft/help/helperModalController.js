/*global angular, Parse*/
angular.module("odontologiaApp")
.controller("helpCtrl", function($modal, $scope){
    
    var modalInstance;
    
    function modalInstances(animation, size, backdrop, keyboard, template) {
            modalInstance = $modal.open({
            animation: animation,
            templateUrl: template,
            controller: 'helpModalCtrl',
            size: size,
            backdrop: backdrop,
            keyboard: keyboard,
            resolve: {
                content: function () {
                    return $scope.modalContent;
                }
            }
        
        });
    }
    
    $scope.open = function (size, template) {
        modalInstances(true, size, true, true, template)
    }
    
    
})

.controller("helpModalCtrl", function($scope, $modalInstance){
    
    $scope.close = function(){
        $modalInstance.dismiss();
    }
    
})