/*global angular, Parse*/
angular.module("odontologiaApp")
.factory('modalService', function($modal, $rootScope){
    
    var dataFactory = {};
    
    var modalInstance;
    
    function modalInstances(animation, size, backdrop, keyboard, template, context) {
            modalInstance = $modal.open({
            animation: animation,
            templateUrl: template,
            controller: 'helpModalCtrl',
            size: size,
            backdrop: backdrop,
            keyboard: keyboard,
            resolve: {
                content: function () {
                    return context;
                }
            }
        
        });
    }
    
    dataFactory.open = function (size, template, context) {
        modalInstances(true, size, true, true, template, context)
    }
    
    dataFactory.close = function(){
        modalInstance.dismiss();
    }
    
    return dataFactory;
    
})