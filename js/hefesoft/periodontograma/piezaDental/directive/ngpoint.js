angular.module('odontologiaApp')
.directive('ngpoints', function() {
        return function(scope, elem, attrs) {
            attrs.$observe('ngpoints', function(points) {
                elem.attr('points',points);
            });
    };
})