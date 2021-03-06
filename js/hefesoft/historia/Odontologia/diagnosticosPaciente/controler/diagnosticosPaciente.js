/*global Parse, angular, moment, hefesoft*/
angular.module('Historia')
.controller('diagnosticoPacienteCtrl', function ($scope, $rootScope, dataTableStorageFactory, $state, $q, diagnosticoPacienteService, $stateParams, modalService) {

	var idPaciente = "";
	var diagnosticoPaciente = {};
	$scope.listado = [];
	$scope.paciente = $rootScope.currentPacient;
	
	if($stateParams.pacienteId.length > 0){
		idPaciente = $stateParams.pacienteId;
		inicializar();
	}

	function inicializar(){
		diagnosticoPacienteService.load(idPaciente).then(function(result){
			
			if(hefesoft.isEmpty(result)){
				$scope.adicionar();
			}
			else
			{
				for (var i = 0; i < result.length; i++) {
					var item = result[i].toJSON();
					item['fechaFormat'] = moment(item.fecha).format("dddd, MMMM Do YYYY, h:mm:ss a");
					$scope.listado.push(item);
				}
			}
		})
	}

	$scope.adicionar = function(){
		
		var item = {
			idPaciente : idPaciente, 
			paciente: hefesoft.angularObjectToParse($rootScope.currentPacient)
		};
		
		diagnosticoPacienteService.add(item).then(function(data){
			$scope.listado.push(data.toJSON());
		})
	}
	
	$scope.delete = function(data, $index){
		diagnosticoPacienteService.destroy(data.objectId);
		$scope.listado.splice($index, 1);
	} 

	$scope.navegarPlanTratamiento = function(item){
		$state.go("pages.planTratamiento", {"diagnosticoPacienteId": item.objectId});		
	}

	$scope.navegarOdontograma = function(item){
		//modalService.open('lg', 'js/hefesoft/odontograma/vistas/listadoOdontogramas.html', undefined, 'my-dialog');
		$state.go("pages.odontograma", {"diagnosticoPacienteId": item.objectId});
	}

	$scope.navegarPeriododntograma = function(item){
		$state.go("pages.periodontograma", {"diagnosticoPacienteId": item.objectId});
	}
	
	$scope.navegarAdjuntos = function(item){
		$rootScope.currentPacient = item;
		$scope.Paciente = item;
		$state.go("pages.picker", { pacienteId: item.objectId}, {reload: true});		
	}
})