angular.module('Historia')
.controller('diagnosticoPacienteCtrl', ['$scope', '$rootScope', 'dataTableStorageFactory', '$state', '$q',
	function ($scope, $rootScope, dataTableStorageFactory, $state, $q) {


	var idPaciente = Parse.User.current().get("email");
	var diagnosticoPaciente = {};
	$scope.listado = [];
	$scope.paciente = $rootScope.currentPacient;

	$scope.adicionar = function(){
		
		var DiagnosticoPacienteDfd = $q.defer();
		var DiagnosticoPaciente = Parse.Object.extend("Diagnostico_Paciente");
		var diagnosticoPaciente = new DiagnosticoPaciente();
		
		
		diagnosticoPaciente.set("paciente", idPaciente);
		diagnosticoPaciente.set("fecha", new Date());
		diagnosticoPaciente.save().then(function(diagnosticoPaciente){
			DiagnosticoPacienteDfd.resolve(diagnosticoPaciente);
		},
		function(diagnosticoPaciente, error){
			DiagnosticoPacienteDfd.reject(error);
		});
		
		DiagnosticoPacienteDfd.promise.then(function(result){
			$scope.listado.push(result);
		}).catch(function(error){
			console.log(error);
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
		debugger
		var DiagnosticoPacienteDfd = $q.defer();
		var DiagnosticoPaciente = Parse.Object.extend("Diagnostico_Paciente");
		var query = new Parse.Query(DiagnosticoPaciente);
		query.equalTo("paciente", idPaciente);
		
		
		
		query.find().then(function(entidad){
			DiagnosticoPacienteDfd.resolve(entidad);
		},
		function(entidad, error){
			DiagnosticoPacienteDfd.reject(error);
		});
		
		DiagnosticoPacienteDfd.promise.then(function(result){
			for (var i = 0; i < result.length; i++) {
				$scope.listado.push(result[i].toJSON());
			}
		})
		.catch(function(error){
			console.log(error);	
		})
	}

	inicializar();
	
}])