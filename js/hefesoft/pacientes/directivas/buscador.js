/*global angular*/
angular.module('odontologiaApp')
    .directive('buscadorPacientes', function() {

        var directive = {};

        directive.restrict = "E";
        directive.templateUrl = "js/hefesoft/pacientes/template/buscador.html";
        directive.controller = "buscadorPacienteCtrl";
        directive.scope = {
            callback: '&'
        }

        return directive;

    })

.controller('buscadorPacienteCtrl', function($scope, pacienteService) {

    $scope.datos = [];
    $scope.seleccionado;
    $scope.showPrestador = false;
    
    $scope.click = function(){
        $scope.seleccionado = "";
        $scope.show = false;
    }

    $scope.fnSeleccionado = function(result) {

        $scope.seleccionado = result;
        $scope.show = true;

    }

    $scope.pacientes = function(textoBuscar) {
        return pacienteService.buscarPaciente(textoBuscar);
    };
    
    $scope.fnSeleccionarPaciente = function(){
        if ($scope.callback) {
            $scope.callback({
                item: $scope.seleccionado
            });
        }
    }

});