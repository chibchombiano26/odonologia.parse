angular.module('Upload')
.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);            
            var fn = $parse(attrs.fileModel);            
            
            element.bind('change', function(){
                scope.$apply(function(){
                    fn(scope, {'myFile' : element[0].files});                    
                });
            });
        }
    };
}]);