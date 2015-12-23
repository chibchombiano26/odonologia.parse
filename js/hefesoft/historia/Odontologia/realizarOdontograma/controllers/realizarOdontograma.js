/*global angular, Parse, _,hefesoft, html2canvas*/

angular.module('Historia')
.controller('realizarOdontogramaCtrl', 
	['$scope', 'dataTableStorageFactory', 'tratamientoServices', 'odontogramaJsonServices', '$rootScope', '$state', 'piezasDentalesServices', '$timeout', '$q', 'messageService','$stateParams', 'diagnosticosService', '$interval', 'odontogramService', 'cfpLoadingBar', 'driveApiUpload', 'modalService',
	function ($scope, dataTableStorageFactory, tratamientoServices, odontogramaJsonServices, $rootScope, $state, piezasDentalesServices, $timeout, $q, messageService, $stateParams, diagnosticosService, $interval, odontogramService, cfpLoadingBar, driveApiUpload, modalService) {
	
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
	$scope.numeroPiezasDentales = 0;
	$scope.indiceCie = 0;
	$scope.indiceCup = 0;
	$scope.pacienteId = $rootScope.currentPacient.objectId; 
	
	var Odontograma;
	var OdontogramaCargadoId;
	var diagnosticoPacienteId = 0;
	
	
	if($stateParams.diagnosticoPacienteId && $stateParams.diagnosticoPacienteId.length > 0){
		diagnosticoPacienteId = $stateParams.diagnosticoPacienteId;
		inicializarDatos();
	}

	
	function inicializarDatos(){
	  	
	  diagnosticosService.cargarDiagnosticos(Parse.User.current().get("email")).then(function(result){
	  	 for (var i = 0; i < result.length; i++) {
		    $scope.Diagnosticos.push(result[i].toJSON());
		  }
	  })
	  
	  odontogramService.cargarOdontograma($scope.pacienteId).then(function(data){
	  	inicializarOdontograma(data).then(function(data){
	  		
	  	})
	  })
	 }
	  
	function inicializarOdontograma(data){
		var deferred = $q.defer();
		
		
	  	//Cargar el guardado
	  	if	(!hefesoft.isEmpty(data)){
	  		
	  		Odontograma = data.toJSON();
	  		
	  		$scope.numeroPiezasDentales = Odontograma.numeroPiezasDentales;
	  		$scope.indiceCie = Odontograma.indiceCie;
	  		$scope.indiceCup = Odontograma.indiceCup;
	  		
	  		fijarPrestador();
	  		
	  		OdontogramaCargadoId = Odontograma.objectId;
	  		
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
		  				deferred.resolve("ok");
	  				}
	  			}
  			
  			}, 1000);
	  		
	  	}
	  	
	  	//Crear uno nuevo
	  	else{
	  		var promise = $interval(function(){
	  			if(angular.isFunction($scope.contextoOdontograma)){
		  			//se ponen aca xq aca ya tienen valor
		 			var item = $scope.contextoOdontograma();
		 			if(angular.isFunction(item.piezasDentalesScope)){
				 		var piezaDental = item.piezasDentalesScope();
			 			piezaDental.leerOdontogramaBase();
			 			$interval.cancel(promise);
			 			deferred.resolve("ok");
		 			}
	  			}
	  		}, 500);
	  	}
	  	
	  	return deferred.promise;
	}
	
	function fijarPrestador(){
		if(Odontograma.prestador){
			var promise = $interval(function(){
				if(angular.isFunction($scope.fijarPrestador)){
	  		 		$scope.fijarPrestador(Odontograma.prestador);
	  		 		$interval.cancel(promise);
				}
			}, 500);
  		}
	}
	
	$scope.cambiarHistorico = function(id){
		hefesoft.util.loadingBar.start();
		odontogramService.getOdontogramaByid(id).then(function(data){
	  	inicializarOdontograma(data).then(function(data){
	  		hefesoft.util.loadingBar.complete();
	  	})
	  })
	}
	
	$scope.prestadorSeleccionado = function(item){
		$rootScope.prestadorSeleccionado = item;
	}
	 
	$scope.dxSeleccionado = function(item){
		$rootScope.diagnosticoSeleccionado = item;
	}

	$scope.odontogramaBaseCargado = function(item){
		var listadoGuardar = item;
		var itemOdontograma = $scope.contextoOdontograma();
 		var piezaDental = itemOdontograma.piezasDentalesScope(); 		
 		piezasDentalesServices.fijarPiezasDentales(piezaDental.listado);
 		guardar(listadoGuardar, piezaDental.listado, false);
	}
	
	$scope.borrarTodo = function(){
		//Crea un odontograma nuevo
		inicializarOdontograma({});
	}

	$scope.planTratamiento = function(){
		$state.go("pages.planTratamiento", { diagnosticoPacienteId : diagnosticoPacienteId});
	}
	
	$scope.cotizacion = function(){
		$rootScope['generarCotizacion'] = true;
		$state.go("pages.planTratamiento", { diagnosticoPacienteId : diagnosticoPacienteId});
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
 		 modalService.open('lg', 'js/hefesoft/odontograma/vistas/guardarModal.html', 'guardarOdontogramaModal', undefined, function(e){
 		 	modalService.close();
 		 	$scope.tipo = e.tipoSeleccionado;
 		 	$scope.observaciones = e.observaciones;
 		 	
 		 	snap().then(function(url){
	 			$scope.snap = url;
		 		var item = $scope.contextoOdontograma();
		 		var piezaDental = item.piezasDentalesScope();
		 		
		 		var listadoGuardar = piezasDentalesServices.getModifiedPiezas(true); 		
		 		guardar(listadoGuardar, piezaDental.listado, deferred, true);
	 		})
 		 })
 		return deferred.promise;
 	}
 	
 	function snap(){
 		hefesoft.util.loadingBar.start();
 		var deferred = $q.defer();
 		$('#odontogramaPiezas').width('80%');
 		
 		html2canvas($("#odontograma"), {
		    onrendered: function(canvas) {
		    	$('#odontogramaPiezas').width('100%');
		        var img = canvas.toDataURL('image/png');
		        
    			driveApiUpload.insertFile(img,"snap", true, undefined, "imagenes cotizacion").then(function(link){
    				deferred.resolve(link.id);
    				hefesoft.util.loadingBar.complete();
    			})
		    }
		});
		
		return deferred.promise;
 	}

 	function guardar(listadoGuardar, source, deferred, historico){
 		//se ponen aca xq aca ya tienen valor
      	var item = $scope.contextoOdontograma();
 		var piezaDental = item.piezasDentalesScope();
 		
 		if($rootScope.prestadorSeleccionado){
 			$scope['prestador'] = $rootScope.prestadorSeleccionado;
 		}
 		
 		//El tercer parametro va como undefined para generar un odontograma cada vez
 		odontogramService.saveOdontograma(listadoGuardar, diagnosticoPacienteId, undefined, $scope, historico).then(function(result){
 			var item = result.toJSON();
 			OdontogramaCargadoId = item.objectId;
 			
 			//Lo agrega al combo de historicos
 			if(historico){
 				var elementoHistorico = angular.element($('#historicoOdontograma select')).scope();
 				item["odontogramaId"] = item.objectId;
 				elementoHistorico.adicionarHistorico(item);
 			}
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