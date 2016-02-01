/*global angular, _, Parse, numeral*/
angular.module("odontologiaApp")
    .directive("tree", function() {

        var directiva = {};

        directiva.restrict = "E";
        directiva.templateUrl = "js/hefesoft/tree/template/tree.html";
        directiva.controller = "treeDirectiveCtrl";

        directiva.scope = {
            paciente: "=",
            callback: '&',
            elementosHabilitados: "="
        }

        return directiva;
    })

.controller("treeDirectiveCtrl", function($scope) {

    $scope.leafClick = function(tipo, activo) {
        if ($scope.callback && activo) {
            $scope.callback({
                tipo: tipo,
                paciente: $scope.paciente
            });
        }
    }

})