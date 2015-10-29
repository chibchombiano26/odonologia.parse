
/*global angular, Parse, hefesoft*/

 angular.module('odontologiaApp')
.controller('pacientesController',function($scope, $state, $stateParams, $q, parseService, pacienteService, $rootScope){
	
	$scope.Paciente = {fecha : new Date()};
	var idPaciente = "";
	var modo = "nuevo";
	
	$scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();


    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event, opened) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope[opened] = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
	
	if($stateParams.pacienteId.length > 0){
		modo = "modificar";
		idPaciente = $stateParams.pacienteId;
		cargarPaciente(idPaciente);
	}
	
	function cargarPaciente(idPaciente){
		pacienteService.obtenerPaciente(idPaciente).then(function(result){
			$scope.Paciente = result.toJSON();
		})
	}
  
	
	$scope.save = function(){
		pacienteService.save(idPaciente,$scope.Paciente).then(function(paciente){
			idPaciente = paciente.id;
			
			if(modo === "nuevo"){
				$rootScope.$broadcast('pacienteModificado', {paciente: paciente, modo: "Modificado"});
			}
			
			$state.go("pages.listadopacientes");
		})
	}
})

.controller("listadoPacientesCtrl", function($scope, $state, $q, $rootScope, varsFactoryService, pacienteService){

	$scope.pacientes =  [];
	
	$scope.navegarAdjuntos = function(item){
		$rootScope.currentPacient = item;
		$scope.Paciente = item;
		$state.go("pages.picker", { pacienteId: item.objectId}, {reload: true});		
	}
	
	$scope.irDiagnosticos = function(item){
		$rootScope.currentPacient = item;
		$scope.Paciente = item;
		varsFactoryService.fijarPaciente(item.RowKey);
		$state.go("pages.diagnosticoPaciente", { pacienteId: item.objectId});
	}
	
	$scope.editar = function(item){
		$state.go("pages.paciente", { pacienteId: item.objectId});
	}
	
	$scope.eliminar = function(item, index){
		var Paciente = Parse.Object.extend("Paciente");
		var paciente = new Paciente;
		paciente.set("id", item.objectId);
		paciente.destroy();
		$scope.pacientes.splice(index, 1);
	}
	
	$scope.nuevo = function(){
		$scope.Paciente = {};
		$state.go("pages.paciente", { pacienteId: ""});		
	}
	
	$scope.enviarCorreo = function(item){
		$state.go("pages.email", {recipient: item.email})
	}
	
	$rootScope.$on("pacienteModificado", function(event, payload) {
        var paciente = payload.paciente.toJSON();
        $scope.pacientes.push(paciente);
    })
	
	function listarPacientes(){
		pacienteService.listarPacientes().then(function(result){
			for (var i = 0; i < result.length; i++) {
			  $scope.pacientes.push(result[i].toJSON());
			}
		})
	}
	
	listarPacientes();
	
})