/*global angular, moment, hefesoft*/
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
                var item = result[i].toJSON();
                item['nombreMostrar'] = item.tipo + " " + item.observaciones + " " + moment(item.createdAt).format("dddd, MMMM Do YYYY");
                $scope.listado.push(item);
            }
            
            if(!hefesoft.isEmpty($scope.listado)){
                $scope.selectedItem = $scope.listado[0];         
            }
        })
    }
    
    $scope.adicionarHistorico = function(item){
        item['nombreMostrar'] = item.tipo + " " + item.observaciones + " " + moment(item.createdAt).format("dddd, MMMM Do YYYY");
        $scope.listado.push(item);
        $scope.selectedItem = item;
    }
   
    
    $scope.seleccionado = function(){
        var id = $scope.selectedItem.odontogramaId;
        $scope.callback({id: id });
    }
    
    inicializar();
    
})