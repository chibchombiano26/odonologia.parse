angular.module('Historia').
controller('planTratamientoCtrl', 
	['$scope', 'tratamientoServices', '$rootScope', 'dataTableStorageFactory', 'piezasDentalesServices', '$q', '$state', '$location', '$timeout', 'messageService',
	function ($scope, tratamientoServices, $rootScope, dataTableStorageFactory, piezasDentalesServices, $q, $state, $location, $timeout, messageService) {


	var idOdontograma = "usuario" + $rootScope.currentUser.id + "paciente" + $rootScope.currentPacient.RowKey + "diagnosticoPaciente" + $rootScope.currentDiagnostico;
	var piezaDentalSeleccionada;

	$scope.Listado = [];
	$scope.Source = [];
	$scope.contextoProcedimientos = {};

	$scope.odontograma = function(){

		var listadoGuardar = piezasDentalesServices.getModifiedPiezas(); 

		if(listadoGuardar.length == 0){
			$state.go("app.odontograma");
		}
		else{
			messageService.notify('Hay elementos sin guardar', 'danger');
		}
	}

	function inicializarDatos(){
      //Carga de Odontograma
      dataTableStorageFactory.getTableByPartition('TmOdontograma', idOdontograma)
      .success(function(data){

      	$scope.Source = data;
      	piezasDentalesServices.fijarPiezasDentales($scope.Source);

      	if(angular.isDefined(data) && data.length > 0){	
	        $scope.Listado = tratamientoServices.extraerTodosProcedimientos($scope.Source);
 		}

   	  }).error(function(error){
      	console.log(error);          
      })
	}

	//Como los elementos se estan pasando por referencia se puede guardar el mismo objeto que se cargo inicialmente
	$scope.guardarCommand = function(){
		
		var deferred = $q.defer();
		//Se obtienen las piezas dentales que han cambiado
		//Esto con el fin de no hacer llamados inecesarios al back end
		var listadoGuardar = piezasDentalesServices.getModifiedPiezas(true);

		if(listadoGuardar.length > 0){
			
			//Datos, Nombre tabla, partition key, y campo que servira como row key
	        dataTableStorageFactory.postTableArray(listadoGuardar, 'TmOdontograma',  idOdontograma, 'codigo')
	        .success(function (data) {
	         	deferred.resolve(data); 
	        })
	        .error(function (error) {           
	            deferred.reject(error);
	        });
    	}
    	else{
    		$timeout(function(){ deferred.resolve("Nada que salvar"); }, 3000);
    	}

        return deferred.promise;
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
			   	  diagnostico['realizado'] = true;
			   	  cambiarColorEvolucion(diagnostico);			   	  
			   }
			   else{
			   	  diagnostico['realizado'] = false;			   	  
			   }
   	   		}
   		}	   
	}

	// Cambia el color de la superficie a evolucion
	function cambiarColorEvolucion(diagnostico){
		piezaDentalSeleccionada[diagnostico.superficie + '_objectHefesoft'].color = diagnostico.objectHefesoftEvolucion.color;
		piezaDentalSeleccionada[diagnostico.superficie + '_objectHefesoft'].simbolo = diagnostico.objectHefesoftEvolucion.simbolo;
		piezaDentalSeleccionada[diagnostico.superficie + '_objectHefesoft'].fuente = diagnostico.objectHefesoftEvolucion.fuente;
		piezaDentalSeleccionada[diagnostico.superficie + '_objectHefesoft'].pathImagen = diagnostico.objectHefesoftEvolucion.pathImagen;		
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

	inicializarDatos();

}])