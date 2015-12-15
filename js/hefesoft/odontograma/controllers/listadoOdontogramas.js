/*global angular*/
angular.module('odontologiaApp')
.directive('historicoOdontograma', function(){
    
    
    var directiva = {};
	directiva.restrict = 'E';
	directiva.controller = 'listadoOdontogramas';
	directiva.templateUrl = 'js/hefesoft/odontograma/vistas/listadoOdontogramas.html';
	
	
	directiva.link = function (scope, iElement, attrs) {
	    
	};
	
	directiva.scope = {
	    callback: '&'
	}
	
	return directiva;
})

.controller('listadoOdontogramas', function($rootScope, $scope, odontogramService, $state){
    
    $scope.listado = [];
    $scope.mostrarListado = true;
    $scope.mostrarWizard = false;
    
    function inicializar(){
        var id = $rootScope.currentPacient.objectId;
        odontogramService.getHistorico(id).then(function(result){
            $scope.listado = [];
            for (var i = 0; i < result.length; i++) {
                $scope.listado.push(result[i].toJSON());
            }
        })
    }
    
    $scope.irOdontograma = function(){
        $scope.mostrarListado = false;
        $scope.mostrarWizard = true;
        
        //$state.go("pages.odontograma", {"diagnosticoPacienteId": item.objectId});
    }
    
    $scope.seleccionado = function(){
        var id = $scope.selectedItem.odontogramaId;
        $scope.callback({id: id });
    }
    
    inicializar();
    
})