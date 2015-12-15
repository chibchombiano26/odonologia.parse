/*global angular, Parse*/
angular.module("odontologiaApp")
.factory('modalService', function($modal, $rootScope){
    
    var dataFactory = {};
    
    var modalInstance;
    
    function modalInstances(animation, size, backdrop, keyboard, template, context, windowClass) {
            var options = {
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
            
            }
            
            if(windowClass){
                options.windowClass = windowClass;
            }
            
            
            modalInstance = $modal.open(options);
    }
    
    dataFactory.open = function (size, template, context, windowClass) {
        modalInstances(true, size, true, true, template, context, windowClass)
    }
    
    dataFactory.close = function(){
        modalInstance.dismiss();
    }
    
    return dataFactory;
    
})