angular.module('Historia')
.controller('diagnosticoPacienteCtrl', ['$scope', '$rootScope', 'dataTableStorageFactory', '$state',
	function ($scope, $rootScope, dataTableStorageFactory, $state) {


	var idPaciente = "usuario" + $rootScope.currentUser.id + "paciente" + $rootScope.currentPacient.RowKey;
	var diagnosticoPaciente = {};
	$scope.listado = [];
	$scope.paciente = $rootScope.currentPacient;

	$scope.adicionar = function(){
		diagnosticoPaciente['nombreTabla'] = 'TmDiagnosticosPacientes';
		diagnosticoPaciente['PartitionKey'] = idPaciente;
		diagnosticoPaciente.generarIdentificador = true;
		diagnosticoPaciente['fecha'] = new Date();

		dataTableStorageFactory.saveStorage(diagnosticoPaciente).
		then(function(result){
			$scope.listado.push(result);
		})
	}

	$scope.navegarPlanTratamiento = function(item){
		$rootScope.currentDiagnostico = item.RowKey;
		$state.go("app.planTratamiento");		
	}

	$scope.navegarOdontograma = function(item){
		$rootScope.currentDiagnostico = item.RowKey;
		$state.go("app.odontograma");
	}

	$scope.navegarPeriododntograma = function(item){
		$rootScope.currentDiagnostico = item.RowKey;		
		$state.go("app.periodontograma", { "pacienteId": item.RowKey});
	}

	$scope.delete = function(data, $index){
		data.Estado_Entidad = "2";		
		dataTableStorageFactory.saveStorage(data);
		$scope.listado.splice($index, 1);
	} 

	function inicializar(){
	 dataTableStorageFactory.getTableByPartition('TmDiagnosticosPacientes', idPaciente)
      .success(function(data){
      	if(angular.isDefined(data) && data.length > 0 ){
      		$scope.listado = data;
      	}
   	  }).error(function(error){
      	console.log(error);          
      })
	}

	inicializar();
	
}])