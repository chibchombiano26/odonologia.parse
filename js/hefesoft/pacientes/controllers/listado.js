
/*global angular, Parse, hefesoft*/

 angular.module('odontologiaApp')
.controller('pacientesController',function($scope, $state, $stateParams, $q, parseService, pacienteService, $rootScope, driveApiUpload, callback, $translate, hefesoft_util_service){
	
	$scope.Paciente = {fecha : new Date()};
	var currentLang = $translate.proposedLanguage() || $translate.use();
	
	if(currentLang === "es"){
		$scope.colombia = true;	
	}
	else{
		$scope.colombia = false;	
	}
	
	var idPaciente = "";
	var modo = "nuevo";
	
	$scope.Paciente['pictureUrl'] = hefesoft_util_service.generoPic($scope.Paciente, "genero");
	
	
	$scope.changeImage = function(file){
        hefesoft.util.loadingBar.start();
        driveApiUpload.insertFile(file,file.name, false, 'binary', "Imagenes pacientes").then(function(link){
			hefesoft.util.loadingBar.complete();
			$scope.Paciente.pictureUrl = "https://docs.google.com/uc?id=" + link.id;
			
			if(modo !== "nuevo")
			{
				pacienteService.save(idPaciente, $scope.Paciente);
			}
		})
	}
	
	$scope.genero = function(){
		$scope.Paciente['pictureUrl'] = hefesoft_util_service.generoPic($scope.Paciente, "genero");
	}
	
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
	
	if(hefesoft.util['pacienteSeleccionado'] !== null){
		modo = "modificar";
		$scope.Paciente = hefesoft.util['pacienteSeleccionado'];
	}
	
	$scope.save = function(){
		pacienteService.save(idPaciente,$scope.Paciente).then(function(paciente){
			idPaciente = paciente.id;
			
			/*
			if(modo === "nuevo"){
				$rootScope.$broadcast('pacienteModificado', {paciente: paciente, modo: "Modificado"});
			}
			
			$state.go("pages.listadopacientes");
			*/
			
			if(callback){
				callback(paciente);
			}
			
		})
	}
})

.controller("listadoPacientesCtrl", function($scope, $state, $q, $rootScope, varsFactoryService, pacienteService, modalService){

	$scope.pacientes =  [];
	$scope.seleccionado = {};
	$scope.seleccionadoShow = false;
	
	$scope.navegarAdjuntos = function(item){
		hefesoft.util.loadingBar.start()
		$rootScope.currentPacient = item;
		$scope.Paciente = item;
		$state.go("pages.picker", { pacienteId: item.objectId}, {reload: true});
	}
	
	$scope.irDiagnosticos = function(item){
		$scope.seleccionado = item;
		$scope.seleccionadoShow = true;
		
		$rootScope.$broadcast('pacienteSeleccionado', {paciente: item });
		$state.go("pages.tree");
		hefesoft.util['pacienteSeleccionado'] = item;
	}
	
	$scope.editar = function(item){
		hefesoft.util['pacienteSeleccionado'] = item;
		
		modalService.open('lg', 'js/hefesoft/pacientes/views/paciente.html', 'pacientesController', 'my-dialog', function(e) {
			modalService.close();
		});
		
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
		hefesoft.util['pacienteSeleccionado'] = null;
		
		modalService.open('lg', 'js/hefesoft/pacientes/views/paciente.html', 'pacientesController', 'my-dialog', function(e) {
			modalService.close();
			listarPacientes();
		});
		
	}
	
	$scope.enviarCorreo = function(item){
		$state.go("pages.email", {recipient: item.email}, {reload: true})
	}
	
	function listarPacientes(){
		hefesoft.util.loadingBar.start();
		pacienteService.listarPacientes().then(function(result){
			$scope.pacientes = [];
			for (var i = 0; i < result.length; i++) {
			  $scope.pacientes.push(result[i].toJSON());
			}
			
			hefesoft.util.loadingBar.complete();
			
		});
	}
	
	listarPacientes();
	
})