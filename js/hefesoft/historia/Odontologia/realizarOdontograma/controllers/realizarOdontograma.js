angular.module('Historia')
.controller('realizarOdontogramaCtrl', 
	['$scope', 'dataTableStorageFactory', 'tratamientoServices', 'odontogramaJsonServices', '$rootScope', '$state', 'piezasDentalesServices', '$timeout', '$q', 'messageService',
	function ($scope, dataTableStorageFactory, tratamientoServices, odontogramaJsonServices, $rootScope, $state, piezasDentalesServices, $timeout, $q, messageService) {
	var Hefesoft  = window.Hefesot;

	$scope.Diagnosticos = [];
	$scope.diagnosticoSeleccionado = {};
	$scope.tratamientoSeleccionado = {};
	

	$scope.PiezaSeleccionada;
	$scope.listadoTratamientosPorPiezaDental = [];
	$scope.listadoProcedimientosPorPiezaDental = [];
	$scope.listadoDiagnosticos = [];
	$scope.numeroPiezaModificada = {};
	$scope.contextoOdontograma = {};

	var idOdontograma = "usuario" + $rootScope.currentUser.id + "paciente" + $rootScope.currentPacient.RowKey + "diagnosticoPaciente" + $rootScope.currentDiagnostico;

	
	function inicializarDatos(){
	  //Carga de diagnosticos
	  dataTableStorageFactory.getTableByPartition('TmDiagnosticos', $rootScope.currentUser.id)
      .success(function(data){          
      	$scope.Diagnosticos = data;
   	  }).error(function(error){
      	console.log(error);          
      })

      //Carga de Odontograma
      dataTableStorageFactory.getTableByPartition('TmOdontograma', idOdontograma)
      .success(function(data){

      	if(angular.isDefined(data) && data.length > 0){
	      	//Ordenarlos deacuerdo al codigo como en la nube se guardan en string no los ordena bien
	        data = _.sortBy(data, function(item) {
	           return parseFloat(item.id);
	        });

	        tratamientoServices.extraerTodosTratamientos(data);
	      	
	      	//se ponen aca xq aca ya tienen valor
	      	var item = $scope.contextoOdontograma();
	 		var piezaDental = item.piezasDentalesScope();
	 		piezaDental.listado = data;
	 		piezasDentalesServices.fijarPiezasDentales(piezaDental.listado);
 		}
 		else{
 			//se ponen aca xq aca ya tienen valor
 			var item = $scope.contextoOdontograma();
	 		var piezaDental = item.piezasDentalesScope();
 			piezaDental.leerOdontogramaBase();
 		}

   	  }).error(function(error){
      	console.log(error);          
      })
	}

	$scope.odontogramaBaseCargado = function(item){
		var listadoGuardar = item;
		var itemOdontograma = $scope.contextoOdontograma();
 		var piezaDental = itemOdontograma.piezasDentalesScope(); 		
 		piezasDentalesServices.fijarPiezasDentales(piezaDental.listado);
 		guardar(listadoGuardar, piezaDental.listado);
	}

	$scope.planTratamiento = function(){
		var listadoGuardar = piezasDentalesServices.getModifiedPiezas(); 

		if(listadoGuardar.length == 0){
			$state.go("app.planTratamiento");
		}
		else{
			messageService.notify('Hay elementos sin guardar', 'danger');
		}
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
 		
 		if(listadoGuardar.length >0)
 		{
	 		//Datos, Nombre tabla, partition key, y campo que servira como row key
	        dataTableStorageFactory.postTableArray(listadoGuardar, 'TmOdontograma',  idOdontograma, 'codigo')
	        .success(function (data) {           
				piezaDental.actualizarPiezas(data);
				deferred.resolve(data); 
	        })
	        .error(function (error) {           
	            console.log(error);
	            deferred.reject(data); 
	        });
    	}
    	else{
    		$timeout(function(){ deferred.resolve("Nada que salvar"); }, 3000);
    	}
 	}

 	function fijarDiagnosticoSeleccionado(item){
 		//Fijar el diagnostio seleccionado
		if(!angular.isUndefined(item.nombreTabla) && item.nombreTabla == "TmDiagnosticos"){
			$scope.diagnosticoSeleccionado = item;
		}
 	}

 	function fijarTratamientoSeleccionado(item){
 		//Fijar el procedimiento seleccionado
		if(angular.isUndefined(item.nombreTabla)){
			$scope.tratamientoSeleccionado = item;
		}
 	}

	inicializarDatos();
	
}])