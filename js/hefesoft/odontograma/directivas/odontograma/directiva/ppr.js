/*global angular*/
angular.module('directivas').
directive('ppr', function(){
    
    var directive ={};
    directive.restrict = 'E';
    directive.controller = 'pprCtrl';
    directive.templateUrl = 'js/hefesoft/odontograma/vistas/ppr.html';
    
    directive.link = function(scope, element, attrs){
        
    }
    
    
    return directive;
    
})

.controller('pprCtrl', function($scope){
    
})