/*global angular, Parse*/
angular.module("odontologiaApp")
.factory('modalService', function($modal, $rootScope){
    
    var dataFactory = {};
    
    var modalInstance;
    
    function modalInstances(animation, size, backdrop, keyboard, template, controller, windowClass, callbackFunction) {
            
            var options = {
                animation: animation,
                templateUrl: template,
                controller: 'helpModalCtrl',
                size: size,
                backdrop: backdrop,
                keyboard: keyboard,
                resolve: {
                    callback: function () {
                        return callbackFunction;
                    }
                }
            
            }
            
            if(controller){
                options.controller = controller;
            }
            
            if(windowClass){
                options.windowClass = windowClass;
            }
            
            
            modalInstance = $modal.open(options);
    }
    
    dataFactory.open = function (size, template, context, windowClass, callbackFunction) {
        modalInstances(true, size, true, true, template, context, windowClass, callbackFunction)
    }
    
    dataFactory.close = function(){
        modalInstance.dismiss();
    }
    
    return dataFactory;
    
})