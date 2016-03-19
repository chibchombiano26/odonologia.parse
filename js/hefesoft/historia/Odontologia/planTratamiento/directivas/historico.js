/*global angular, Parse*/
angular.module('odontologiaApp')
    .directive('planTratamientoHistorico', ['$parse', function($parse) {

        var directiva = {};

        directiva.restrict = "E";
        directiva.require = ['ngModel'];
        directiva.templateUrl = "js/hefesoft/historia/Odontologia/planTratamiento/directivas/historicoTemplate.html";
        directiva.controller = "historicoPlanTratamientoCtrl";

         directiva.link = function(scope, element, attrs, ngModelCtrl) {
              ngModelCtrl[0].$render = function() {
                 
                 if (!ngModelCtrl[0].$isEmpty(ngModelCtrl[0].$viewValue)) {
                    var valor = ngModelCtrl[0].$viewValue;
                    scope.listado = valor;
                 }
              }
           };   

        return directiva;
    }])

.controller('historicoPlanTratamientoCtrl', function($scope) {

    $scope.eliminar = function(item, $index){
        $scope.listado.splice($index, 1);
    }

});