/*global angular, Parse, hefesoft, _,  numeral*/

angular.module('odontologiaApp')
.controller('listadoProcedimientosTratamientosCtrl', ['$scope', 'dxSeleccionado','$modalInstance', 
	function ($scope, dxSeleccionado, $modalInstance) {
		
		$scope.diagnosticoSeleccionado = dxSeleccionado;
		$scope.tratamientoSeleccionado = {};
		$scope.mostrarProcedimentos = false;

		if(angular.isUndefined($scope.diagnosticoSeleccionado.arrayHefesoftTratamientos)){
			$scope.diagnosticoSeleccionado.arrayHefesoftTratamientos = [];
		}

		$scope.tratamientoSeleccionadoCallBack = function(item){
			$scope.tratamientoSeleccionado = item;
			$scope.mostrarProcedimentos = true;

			if(angular.isUndefined($scope.tratamientoSeleccionado.arrayHefesoftProcedimientos)){
				$scope.tratamientoSeleccionado.arrayHefesoftProcedimientos = [];
			}
		}

		//Ocurre cuando se agrega o se elimina un nuevo procedimiento
		$scope.cambiado = function(item){
		   sumar($scope.tratamientoSeleccionado);
		}

		$scope.close = function(tipo){
			if(tipo == "close"){
				var valor = _.sumBy($scope.diagnosticoSeleccionado.arrayHefesoftTratamientos, function(o){ return parseFloat(o.valor);});
				valor = numeral(valor).format('$0,0.00');
				
				$scope.diagnosticoSeleccionado.valor = valor;
				var elementoActualizar = JSON.parse(angular.toJson(angular.copy($scope.diagnosticoSeleccionado)));
				
				if(!hefesoft.isEmpty(elementoActualizar.arrayHefesoftTratamientos)){
					addTratamiento(elementoActualizar.objectId, elementoActualizar.arrayHefesoftTratamientos);
				}
				
				$modalInstance.close($scope.diagnosticoSeleccionado);
			}
			else if(tipo == "dismiss"){
				$modalInstance.dismiss();
			}
		}

		//Suma el valor de los procedimientos y se lo asigna al tratamiento
		function sumar(data){
		 var valor = 0;

		 if(angular.isDefined(data) && angular.isDefined(data.arrayHefesoftProcedimientos) && angular.isArray(data.arrayHefesoftProcedimientos) && data.arrayHefesoftProcedimientos.length > 0){	      
	      for (var i = data.arrayHefesoftProcedimientos.length - 1; i >= 0; i--) {
	         //Decimal con 2 decimales
	         valor = parseFloat(valor) + parseFloat(data.arrayHefesoftProcedimientos[i].valor); 
	         valor = valor.toFixed(2);
	      };
	  	}

	      data.valor = valor;
	   }
	   
	   function addTratamiento(id, tratamientos){
	   	
		   	//Solo se debe persistir en parametrizacion cuando se esta parametrizando no desde el odontograma
		   	//En el odontograma se guarda en el objeto diagnostico copiado
		   	if(hefesoft.global.currentState.name === "pages.listadoDiagnosticos")
		   	{
			   	var Tratamiento = Parse.Object.extend("Diagnostico");
			   	var tratamiento = new Tratamiento();
			   	
			   	tratamiento.set("id", id);
			   	tratamiento.set("arrayHefesoftTratamientos", tratamientos);
			   	
			   	var valor = _.sumBy(tratamientos, function(o) {
			   		return parseFloat(o.valor);
			   	});
			   	
			   	valor = numeral(valor).format('$0,0.00');
			   	tratamiento.set("valor", valor);
			   	
			   	tratamiento.save();
		   	}
	   	
	   }
}])