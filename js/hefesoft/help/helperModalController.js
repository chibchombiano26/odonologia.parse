/*global angular, Parse*/
angular.module("odontologiaApp")
.controller("helpCtrl", function($modal, $scope){
    
    function modalInstances(animation, size, backdrop, keyboard, template) {
        var modalInstance = $modal.open({
            animation: animation,
            templateUrl: template,
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