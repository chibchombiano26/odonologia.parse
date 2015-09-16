angular.module('directivas').
directive('hrefb', function() {
 return {
    compile: function(element) {
      var elems = (element.prop("tagName") === 'A') ? element : element.find('a');
      elems.attr("target", "_blank");
    }
  };
})

.directive('foo', function($document, $rootScope, $http, $resource) {
 return {
    restrict: 'A',
    scope: true,
    link: function(scope, elem, attrs){
        elem[0].setAttribute("data-src", attrs.foo);
    }
  };
})

