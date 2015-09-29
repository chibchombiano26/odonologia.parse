angular.module('Historia')
.controller('realizarOdontogramaCtrl', 
	['$scope', 'dataTableStorageFactory', 'tratamientoServices', 'odontogramaJsonServices', '$rootScope', '$state', 'piezasDentalesServices', '$timeout', '$q', 'messageService','$stateParams', 'diagnosticosService', '$interval', 'odontogramService',
	function ($scope, dataTableStorageFactory, tratamientoServices, odontogramaJsonServices, $rootScope, $state, piezasDentalesServices, $timeout, $q, messageService, $stateParams, diagnosticosService, $interval, odontogramService) {
	
	var Hefesoft  = window.Hefesot;
	
	$scope.Diagnosticos = [];
	$scope.diagnosticoSeleccionado = {};
	$scope.tratamientoSeleccionado = {};
	$rootScope.modo = "evolucion";


	$scope.PiezaSeleccionada;
	$scope.listadoTratamientosPorPiezaDental = [];
	$scope.listadoProcedimientosPorPiezaDental = [];
	$scope.listadoDiagnosticos = [];
	$scope.numeroPiezaModificada = {};
	$scope.contextoOdontograma = {};
	
	var Odontograma;
	var idPaciente = 0;
	
	if($stateParams.pacienteId.length > 0){
		idPaciente = $stateParams.pacienteId;
		inicializarDatos();
	}

	
	function inicializarDatos(){
	  	
	  diagnosticosService.cargarDiagnosticos(Parse.User.current().get("email")).then(function(result){
	  	 for (var i = 0; i < result.length; i++) {
		    $scope.Diagnosticos.push(result[i].toJSON());
		  }
	  })
	 
	
	  odontogramService.cargarOdontograma("Kb1CqPZmlr").then(function(data){
	  	
	  	Odontograma = data.toJSON();
	  	
	  	if(Odontograma.listado.length >0){
	  		Odontograma.listado = _.sortBy(Odontograma.listado, function(item){
	  		 return parseFloat(item.id);
  		  })
	  		
  		var promise = $interval(function(){
  			
  			if(angular.isFunction($scope.contextoOdontograma)){
  		
  				var item = $scope.contextoOdontograma();
  				if(angular.isFunction(item.piezasDentalesScope)){
			 		var piezaDental = item.piezasDentalesScope();
			 		piezaDental.listado = Odontograma.listado;
			 		piezasDentalesServices.fijarPiezasDentales(piezaDental.listado);
	  				$interval.cancel(promise);
  				}
  			}
  			
  		}, 1000);
	  		
	  		
	  	}
	  	else{
	  		
	  		var promise = $timeout(function(){
	  			
	  			//se ponen aca xq aca ya tienen valor
	 			var item = $scope.contextoOdontograma();
		 		var piezaDental = item.piezasDentalesScope();
	 			piezaDental.leerOdontogramaBase();
	 			$timeout.cancel(promise);
	  			
	  		}, 8000);
	  	}
	  	
	  })
	 }
	  

	 
	$scope.dxSeleccionado = function(item){
		$rootScope.diagnosticoSeleccionado = item;
	}

	$scope.odontogramaBaseCargado = function(item){
		var listadoGuardar = item;
		var itemOdontograma = $scope.contextoOdontograma();
 		var piezaDental = itemOdontograma.piezasDentalesScope(); 		
 		piezasDentalesServices.fijarPiezasDentales(piezaDental.listado);
 		guardar(listadoGuardar, piezaDental.listado);
	}

	$scope.planTratamiento = function(){
		$state.go("pages.planTratamiento", { pacienteId : idPaciente});
	}

	$scope.procedimientoEliminado = function(item){
		console.log(item);
	}

	$scope.tratamientoEliminado = function(item){
		var nombrePropiedad = item.superficie + '_arrayHefesoft';		
		Hefesoft.eliminar(item, $scope.listadoTratamientosPorPiezaDental);
		Hefesoft.eliminar(item, $scope.PiezaSeleccionada[nombrePropiedad]);
		console.log(item);
	}

	//click sobre el drill down de diagnosticos
	$scope.clickMenu = function(i, item){
		fijarDiagnosticoSeleccionado(item);
		fijarTratamientoSeleccionado(item)
 	}

 	//Ocurre cuando se hace click sobre  una pieza dental
 	$scope.piezaDentalSeleccionada = function(item){
 		
 		$scope.PiezaSeleccionada = item;
 		$scope.listadoDiagnosticos = tratamientoServices.extraerDiagnosticos(item);
 		var listadoTratamientos = tratamientoServices.extraerTratamientosDeDiagnosticos($scope.listadoDiagnosticos);
 		$scope.listadoTratamientosPorPiezaDental = listadoTratamientos;

 		//Limpia el listado de los procedimientos
 		$scope.listadoProcedimientosPorPiezaDental = [];
 		piezasDentalesServices.setModified(item.codigo);
 	}

 	$scope.eliminar = function(item, index){
 		$scope.numeroPiezaModificada = item;
 	}

 	//Se dispara cuando un tratamiento se selecciona
 	$scope.tratamientoSeleccionada = function(e){
 		$scope.listadoProcedimientosPorPiezaDental = e;
 	}

 	//Ocurre cuando se hace algo dentro del modal de la pieza dental
 	$scope.piezaModificada = function(item){
 		$scope.piezaDentalSeleccionada(item); 		
 	}

 	$scope.guardarCommand = function(){
 		var deferred = $q.defer();
 		var item = $scope.contextoOdontograma();
 		var piezaDental = item.piezasDentalesScope();
 		
 		var listadoGuardar = piezasDentalesServices.getModifiedPiezas(true); 		
 		guardar(listadoGuardar, piezaDental.listado, deferred);

 		return deferred.promise;
 	}

 	function guardar(listadoGuardar, source, deferred){
 		//se ponen aca xq aca ya tienen valor
      	var item = $scope.contextoOdontograma();
 		var piezaDental = item.piezasDentalesScope();
 		
 		
 		odontogramService.saveOdontograma(listadoGuardar, idPaciente).then(function(result){
 			
 		});
 	}
 	
 	

 	function fijarDiagnosticoSeleccionado(item){
 		//Se define que se esta seleccionado si un diagnostico o un procedimiento
		if(!angular.isUndefined(item.objectId)){
			$scope.diagnosticoSeleccionado = item;
		}
 	}

 	function fijarTratamientoSeleccionado(item){
 		//Fijar el procedimiento seleccionado
		if(angular.isUndefined(item.objectId)){
			$scope.tratamientoSeleccionado = item;
		}
 	}
 	
}])