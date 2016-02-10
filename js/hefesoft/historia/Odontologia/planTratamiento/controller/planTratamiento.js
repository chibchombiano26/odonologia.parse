/*global angular, Parse, _, Hefesot, hefesoft, numeral*/
angular.module('Historia').
controller('planTratamientoCtrl', 
	['$scope', 'tratamientoServices', '$rootScope', 'dataTableStorageFactory', 'piezasDentalesServices', '$q', '$state', '$location', '$timeout', 'messageService', 'odontogramService','$stateParams', 'appScriptTemplateServices', 'growlService', 'modalService',
	function ($scope, tratamientoServices, $rootScope, dataTableStorageFactory, piezasDentalesServices, $q, $state, $location, $timeout, messageService, odontogramService, $stateParams, appScriptTemplateServices, growlService, modalService) {


	var idOdontograma;
	var diagnosticoPacienteId;
	var piezaDentalSeleccionada;
	var odontograma;

	$scope.Listado = [];
	$scope.Source = [];
	$scope.contextoProcedimientos = {};
	$scope.pacienteId = $rootScope.currentPacient.objectId; 
	
	
	if($stateParams.diagnosticoPacienteId.length > 0){
		diagnosticoPacienteId = $stateParams.diagnosticoPacienteId;
		inicializarDatos();
	}
	
	function inicializarDatos(){
		
		odontograma = hefesoft.util.obtenerTipoOdontograma();
	  	var result = odontograma.get("listado");
	  	
	  	idOdontograma = odontograma.get("objectId");
	  	
	  	$scope.Source = result;
      	piezasDentalesServices.fijarPiezasDentales($scope.Source);

      	if(angular.isDefined(result) && result.length > 0){	
	        $scope.Listado = tratamientoServices.extraerTodosProcedimientos($scope.Source);
 		}
 		
 		if (!hefesoft.getStorageObject("tutorialPlanTratamiento")) {
 			hefesoft.tutorial.inicializar(3);
 			hefesoft.saveStorageObject("tutorialPlanTratamiento", {
 				mostrarTutorial: true
 			});
 		}
 	}

	//Como los elementos se estan pasando por referencia se puede guardar el mismo objeto que se cargo inicialmente
	$scope.guardarCommand = function(){
		
		hefesoft.util.loadingBar.start();
		odontograma.save().then(function(){
			$state.go("pages.tree");
		});
		hefesoft.util.loadingBar.complete();	
	}	
	

	//Se toma el procedimiento que se ha indicado como realizado
	//Luego se busca dentro de las piezas dentales
	$scope.procedimientoRealizado = function(item){
		
   		var diagnostico = buscarDiagnostico(item);

   		//Si se encuentra el diagostico se prosigue a buscar el tratamiento a que corresponde el procedimiento
   		if(diagnostico){

   			var realizado = obtenerTratamiento(diagnostico, item);

   			//Si el tratamiento se ha realizado hay que validar si todos estan realizados para cambiar el diagnostico a evolucion
	   		if(realizado){			   
			   var resultTratamientos = validarTratamientosRealizados(diagnostico);
			   if(resultTratamientos){
			   	  diagnostico.tratado = "evolucion";
			   }
			   else{
			   	  diagnostico.tratado = "diagnostico";
			   }
   	   		}
   		}	   
	}


	//Dado el procedimiento se saca la pieza dental a la que corresponde
	function buscarDiagnostico(procedimiento){
	   
	   var diagnostico;	   

	   var index = _.findIndex($scope.Source, function(chr) {
		  return chr.numeroPiezaDental == procedimiento.numeroPiezaDental;
	   });

	   if(index >= 0){
	   		piezaDentalSeleccionada = $scope.Source[index];	   		
	   		var listadoDiagnosticos = piezaDentalSeleccionada[procedimiento.superficie + "Diagnosticos_arrayHefesoft"];
	   		listadoDiagnosticos = Hefesot.aListado(listadoDiagnosticos);

	   		var indexDiagnostico = _.findIndex(listadoDiagnosticos, function(chr) {
			  return chr.uuid == procedimiento.uuid;
		    });

		    if(indexDiagnostico >= 0){
				diagnostico = listadoDiagnosticos[indexDiagnostico];
		    }
	   }

	   return diagnostico;
	}

	function validarTratamientosRealizados(diagnostico){
		var todosRealizados = true;
		for (var i = diagnostico.arrayHefesoftTratamientos.length - 1; i >= 0; i--) {			
			var tratamiento = diagnostico.arrayHefesoftTratamientos[i];
			var realizado = tratamiento.realizado;
			if(!realizado){
				todosRealizados = false;
				break;
			}
		};

		return todosRealizados;
	}

	//Dado un diagnostico y un procedimiento se valida cuantos procdimientos faltan para terminar el tratamiento
	//Si no falta ninguno se indica que el tratamiento se ha realizado
	function obtenerTratamiento(data, item){

		var todosRealizados;
		var index = _.findIndex(data.arrayHefesoftTratamientos, function(chr) {
		  return chr.uuid == item.uuid;
	   });

	   if(index >= 0){
	   		var Tratamiento = data.arrayHefesoftTratamientos[index];
	   		todosRealizados = validarProcedimientosRealizados(Tratamiento);
	   		
	   		if(todosRealizados){
	   			Tratamiento["realizado"] = true;
	   		}
	   		else{
	   			Tratamiento["realizado"] = false;	
	   		}
	   }

	   return todosRealizados;
	}

	//Valida cuantos procedimientos han sido realizados
	//Y cuantos de ellos ya han sido realizados
	//Si todos han sido realizados devuelve un true
	function validarProcedimientosRealizados(tratamiento){

		var todosRealizados = true;
		for (var i = tratamiento.arrayHefesoftProcedimientos.length - 1; i >= 0; i--) {			
			var procedimiento = tratamiento.arrayHefesoftProcedimientos[i];
			var realizado = procedimiento.Realizado;
			if(!realizado){
				todosRealizados = false;
				break;
			}
		};

		return todosRealizados;
	}
}])