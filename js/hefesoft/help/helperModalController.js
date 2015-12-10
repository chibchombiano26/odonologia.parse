/*global angular, Parse*/
angular.module("odontologiaApp")
.controller("helpCtrl", function($modal, $rootScope, $scope){
    
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
    
    $rootScope.$on('openPopUp', function(event, payload) {
        modalInstances(true, payload.size, true, true, payload.template);
    })
    
    $scope.open = function (size, template) {
        modalInstances(true, size, true, true, template)
    }
    
})

.controller("helpModalCtrl", function($rootScope, $scope, $modalInstance){
    
    $scope.close = function(){
        $modalInstance.dismiss();
    }
    
    $rootScope.$on('closePopUp', function(event, payload) {
        $modalInstance.dismiss();
    })
    
})