/*global angular, Parse, _, Hefesot, hefesoft, numeral*/
angular.module('Historia').
controller('planTratamientoCtrl', 
	['$scope', 'tratamientoServices', '$rootScope', 'dataTableStorageFactory', 'piezasDentalesServices', '$q', '$state', '$location', '$timeout', 'messageService', 'odontogramService','$stateParams', 'appScriptTemplateServices', 'growlService', 'modalService',
	function ($scope, tratamientoServices, $rootScope, dataTableStorageFactory, piezasDentalesServices, $q, $state, $location, $timeout, messageService, odontogramService, $stateParams, appScriptTemplateServices, growlService, modalService) {


	var idOdontograma;
	var diagnosticoPacienteId;
	var piezaDentalSeleccionada;
	var odontogramaData;

	$scope.Listado = [];
	$scope.Source = [];
	$scope.contextoProcedimientos = {};
	$scope.pacienteId = $rootScope.currentPacient.objectId; 
	
	
	if($stateParams.diagnosticoPacienteId.length > 0){
		diagnosticoPacienteId = $stateParams.diagnosticoPacienteId;
		inicializarDatos();
	}

	$scope.odontograma = function(){
		$state.go("pages.odontograma", { diagnosticoPacienteId : diagnosticoPacienteId});
	}
	
	$scope.cambiarHistorico = function(id){
		hefesoft.util.loadingBar.start();
		odontogramService.getOdontogramaByid(id).then(function(data){
	  	  procesarDatos(data);
	  	  hefesoft.util.loadingBar.complete();
	  })
	}

	function inicializarDatos(){
  	  odontogramService.cargarOdontograma($scope.pacienteId).then(function(data){
  	  	procesarDatos(data);
  	  });
	}
	
	function procesarDatos(data){
		var datos = data;
	  	var result = data.toJSON().listado;
	  	
	  	idOdontograma = data.toJSON().objectId;
	  	odontogramaData = data.toJSON(); 
	  	
	  	$scope.Source = result;
      	piezasDentalesServices.fijarPiezasDentales($scope.Source);

      	if(angular.isDefined(result) && result.length > 0){	
	        $scope.Listado = tratamientoServices.extraerTodosProcedimientos($scope.Source);
 		}
 		
 		if($rootScope['generarCotizacion'] === true){
 			$rootScope['generarCotizacion'] = false;
 			$scope.generarCotizacion();		
 		}
	}

	//Como los elementos se estan pasando por referencia se puede guardar el mismo objeto que se cargo inicialmente
	$scope.guardarCommand = function(){
		
		/*Todavia no activar esta opcion hasta preguntar*/
		/*
		modalService.open('lg', 'js/hefesoft/odontograma/vistas/guardarModal.html', 'guardarOdontogramaModal', undefined, function(e){
 		 	modalService.close();
 		 	save({tipo : e.tipoSeleccionado, observaciones:  e.observaciones})
		})
		*/
		
		save({}, false);
	}	
	
	
	function save(item, historico){
		var dataToSave = angular.toJson($scope.Source, true);
		
		//El tercer parametro NO va como undefined para que tome el ultimo odontograma y sobre este modifique
		hefesoft.util.loadingBar.start();
		odontogramService.saveOdontograma(JSON.parse(dataToSave), diagnosticoPacienteId, idOdontograma, item, historico).then(function(data){
			var item = data.toJSON();
			idOdontograma = item.objectId;
			hefesoft.util.loadingBar.complete();	
			$state.go("pages.tree");
		})
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
	   		listadoDiagnosticos = piezaDentalSeleccionada[procedimiento.superficie + "Diagnosticos_arrayHefesoft"];
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