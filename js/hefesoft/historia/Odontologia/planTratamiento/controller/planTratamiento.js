/*global angular, Parse, _, Hefesot, hefesoft, numeral*/
angular.module('Historia').
controller('planTratamientoCtrl', 
	['$scope', 'tratamientoServices', '$rootScope', 'dataTableStorageFactory', 'piezasDentalesServices', '$q', '$state', '$location', '$timeout', 'messageService', 'odontogramService','$stateParams', 'appScriptTemplateServices', 'growlService',
	function ($scope, tratamientoServices, $rootScope, dataTableStorageFactory, piezasDentalesServices, $q, $state, $location, $timeout, messageService, odontogramService, $stateParams, appScriptTemplateServices, growlService) {


	var idOdontograma;
	var diagnosticoPacienteId;
	var piezaDentalSeleccionada;
	var odontogramaData;

	$scope.Listado = [];
	$scope.Source = [];
	$scope.contextoProcedimientos = {};
	
	
	if($stateParams.diagnosticoPacienteId.length > 0){
		diagnosticoPacienteId = $stateParams.diagnosticoPacienteId;
		inicializarDatos();
	}

	$scope.odontograma = function(){
		$state.go("pages.odontograma", { diagnosticoPacienteId : diagnosticoPacienteId});
	}

	function inicializarDatos(){
      
  	  odontogramService.cargarOdontograma(diagnosticoPacienteId).then(function(data){
  	  	var datos = data;
	  	var result = data.toJSON().listado;
	  	
	  	idOdontograma = data.toJSON().objectId;
	  	odontogramaData = data.toJSON(); 
	  	
	  	$scope.Source = result;
      	piezasDentalesServices.fijarPiezasDentales($scope.Source);

      	if(angular.isDefined(result) && result.length > 0){	
	        $scope.Listado = tratamientoServices.extraerTodosProcedimientos($scope.Source);
 		}
	  	
  	  });
      
	}

	//Como los elementos se estan pasando por referencia se puede guardar el mismo objeto que se cargo inicialmente
	$scope.guardarCommand = function(){
		var dataToSave = angular.toJson($scope.Source, true);
		odontogramService.saveOdontograma(JSON.parse(dataToSave), diagnosticoPacienteId, idOdontograma).then(function(data){
			var item = data.toJSON();
			idOdontograma = item.objectId;
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
	
	$scope.generarCotizacion = function(){
 	   mostrarCotizacion();
 	}
 	
 	function mostrarCotizacion(){
 		
 		var paciente = angular.copy($rootScope.currentPacient);
 		delete paciente.pictureUrl;
 		delete paciente.objectId;
 		delete paciente.createdAt;
 		delete paciente.updatedAt;
 		
 		var parameters = {
 			templateid : '1Hs8YaOe5dZjzMuw84X4Bipft2NnUK33xovHQ9vKeOEY',
            name : $rootScope.currentPacient.nombre, 
            fileName : "cotizacion "  + $rootScope.currentPacient.nombre, 
            rowsData: [], 
            to: $rootScope.currentPacient.email, 
            subject: "Cotizacion",
            message : "Cotizacion",
            clinica: "Nombre medico : "  + Parse.User.current().get("name"),
            direccionClinica : "Direccion clinica :",
            telefono: "Telefono clinica :",
            email: "Email : " + Parse.User.current().get("email"),
            paciente : paciente,
            snap : odontogramaData.snap
        };
        
        var titulos = ['Pieza dental', 'Procedimiento', 'Superficie', 'Valor', 'Valor pagado','Saldo'];
        var lista = angular.copy($scope.Listado);
        var sumaValor = 0;
        var saldoValor = 0;
        var valorPagado = 0;
        
        
        
        parameters.rowsData.push(titulos);
        
        for (var i = 0; i < lista.length; i++) {
        	var item = [lista[i].numeroPiezaDental, lista[i].nombre, hefesoft.nombreToSuperficie(lista[i].superficie), numeral(lista[i].valor).format('$0,0.00'), numeral(lista[i].valorPagado).format('$0,0.00'), numeral(lista[i].saldo).format('$0,0.00')];
        	parameters.rowsData.push(item);
        }
        
        
        
        sumaValor = _.sum(lista, function(object) {
		  return object.valor;
		});
		
		saldoValor = _.sum(lista, function(object) {
		  return object.saldo;
		});
		
		valorPagado = _.sum(lista, function(object) {
		  return object.valorPagado;
		});
        
        sumaValor = numeral(sumaValor).format('$0,0.00');
        saldoValor = numeral(saldoValor).format('$0,0.00');
        valorPagado = numeral(valorPagado).format('$0,0.00');
        
        var footer = ['Total', '', '', sumaValor, valorPagado, saldoValor];
        parameters.rowsData.push(footer);
        appScriptTemplateServices.templateWindow(parameters);
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