/*global angular, Parse, _.,_*/
angular.module('odontologiaApp')
.controller('piezasDentalesCtrl', ['$scope', 'odontogramaJsonServices', '$modal', 'diagnosticoServices', 'piezasDentalesServices',
	function ($scope, odontogramaJsonServices, $modal, diagnosticoServices, piezasDentalesServices) {

	$scope.listado = [];	
	$scope.tratamientoPiezaDental = [];
	$scope.piezaSeleccionada = {};
	$scope.esBoca = true;
	$scope.esSupernumerario = false;
	
	var piezaBaseSupernumerario = {};
	var index = {};

	var Hefesoft  = window.Hefesot;


	//Hasta aca se propaga el evento
    $scope.$watch('numeroPiezaModificada', function(e) {      
      if(e){
      	modificado(e);      	
      } 
    });

	$scope.dynamicPopover = {
	    content: 'Acciones sobre la pieza dental',
	    templateUrl: 'opcionesPiezaDental.html',
	    title: 'Pieza dental'
	};

	$scope.seleccionar = function(item, $index){
		index = $index;
		$scope.piezaSeleccionada = item;

		if(angular.isDefined($scope.fnClick) && angular.isFunction($scope.fnClick)){
			$scope.fnClick($scope.$parent, { 'item' : item });
		}

		//Activa o inactiva las opciones para la boca
 		if(item.parte == "boca"){
 			$scope.esBoca = true;
 		}
 		else{
 			$scope.esBoca = false;	
 		}

 		//Activa o inactiva las opciones de eliminar
 		if(angular.isDefined(item.esSupernumerario)){
 			
 			var supernumerario = (item.esSupernumerario == "True" || item.esSupernumerario == "true" || item.esSupernumerario == true);  
 			if(supernumerario){
 				$scope.esSupernumerario = true;
 			}
 			else{
 				$scope.esSupernumerario = false;	
 			}
 		}
 		else{
 			$scope.esSupernumerario = false;	
 		}
	}

	/* Elementos seleccionado del menu lateral */
	$scope.clickPiezaDental = function(){
		var piezaSeleccionada = $scope.piezaSeleccionada;
		var diagnosticoSeleccionado = $scope.$parent.diagnosticoSeleccionado;
		var tratamientoSeleccionado = $scope.$parent.tratamientoSeleccionado;
				
		hidePopOver();
		mostrarModalSeleccionado(piezaSeleccionada,diagnosticoSeleccionado, tratamientoSeleccionado);
	}

	$scope.supernumerario = function(posicion){
		var numero = $scope.piezaSeleccionada.numeroPiezaDental + "+";
		agregarSupernumerario(index, numero, posicion);
		hidePopOver();
	}

	$scope.ausente = function(){
		$scope.piezaSeleccionada.numeroPiezaDental = eliminarTextosNumeros($scope.piezaSeleccionada.numeroPiezaDental);
		$scope.piezaSeleccionada.numeroPiezaDental = "tachados-" + $scope.piezaSeleccionada.numeroPiezaDental;
	}

	$scope.implante = function(){
		$scope.piezaSeleccionada.numeroPiezaDental = eliminarTextosNumeros($scope.piezaSeleccionada.numeroPiezaDental);
		$scope.piezaSeleccionada.numeroPiezaDental = "tornillo-" + $scope.piezaSeleccionada.numeroPiezaDental;	
	}

	$scope.normal = function(){
		$scope.piezaSeleccionada.numeroPiezaDental = eliminarTextosNumeros($scope.piezaSeleccionada.numeroPiezaDental);			
	}

	$scope.eliminar = function(){
		$scope.listado.splice(index, 1);
		hidePopOver();
	}

	$scope.leerOdontogramaBase = function(){
		odontogramaJsonServices.obtenerOdontogramaBase().then(success);
	}

	$scope.actualizarPiezas = function(elementosActualizar){
		
		for (var i = elementosActualizar.length - 1; i >= 0; i--) {
			var pieza = elementosActualizar[i];

			var index = _.findIndex($scope.listado, function(chr) {
			  return chr.codigo == pieza.codigo;
		    });

		   if(index >= 0){
		   		$scope.listado[index] = pieza;
		   }			
		};

	}

	function agregarSupernumerario(index, numero, posicision){
		var elemento = $scope.listado[0];
		var elementoInsertar = angular.copy(elemento);
		elementoInsertar.codigo = randomCodigo();
		limpiarPropiedadesSupernumerario(elementoInsertar);
		elementoInsertar["Modificado"] = true;

		elementoInsertar.numeroPiezaDental = numero;
		elementoInsertar['esSupernumerario'] = true;

		if(posicision == "right"){
			index = index +1;
			//Se usa para al guardar quede a la izquierda o derecha
			//De la pieza dental
			var id = parseFloat($scope.piezaSeleccionada.id + 0.001);
			elementoInsertar.id = String(id);
			$scope.listado.splice(index, 0, elementoInsertar);
		}
		else if(posicision == "left"){
			var id = parseFloat($scope.piezaSeleccionada.id - 0.001);
			//Se usa para al guardar quede a la izquierda o derecha
			//De la pieza dental
			elementoInsertar.id = String(id);
			$scope.listado.splice(index, 0, elementoInsertar);
		}
	}

	function limpiarPropiedadesSupernumerario(object){
		for (var property in object) {
		    if (object.hasOwnProperty(property)){
		        if(property.indexOf("array") >= 0){
		        	object[property] = [];
		    	}
		    	else if(property.indexOf("objectHefesoft") >= 0){
		        	object[property] = {};
		    	}
		    }
		}
	}

	function randomCodigo(){
		return Math.floor((Math.random() * 1000) + 1000);
	}

	//elimina los textos tachado y tornillo del numero
	function eliminarTextosNumeros(item){
		item = String(item);
		item = item.replace("tachados-", "");
		item = item.replace("tornillo-", "");
		return item; 
	}

	function success(data){
		//Se usa una pieza dental como base para cuando se neceite agregar
		//Un diente supernumerario		
		$scope.listado = data;

		if(angular.isDefined($scope.fnOdontogramaBaseCargado) && angular.isFunction($scope.fnOdontogramaBaseCargado)){
			$scope.fnOdontogramaBaseCargado($scope.$parent, { 'item' : data });
		}
	}

	function modificado(item){
		var pieza = _.find($scope.listado, { 'numeroPiezaDental': item.numeroPiezaDental});
		var index = _.findIndex($scope.listado, { 'numeroPiezaDental': item.numeroPiezaDental});

		//Cuando se guarda en azure los enteros se vuelven string por eso se hace esta validacion
		if(angular.isUndefined(pieza)){
			var numeroPiezaDental = String(item.numeroPiezaDental);
			pieza = _.find($scope.listado, { 'numeroPiezaDental': numeroPiezaDental});
			index = _.findIndex($scope.listado, { 'numeroPiezaDental': numeroPiezaDental});
		}

		if(index >=0){
			var nombreDiagnostico = item.superficie + 'Diagnosticos_arrayHefesoft';
			Hefesoft.eliminar(item, $scope.listado[index][nombreDiagnostico]);
			diagnosticoServices.extraerUltimoDiagnosticoPorSuperficie($scope.listado[index]);
		}
	}

	/**************** Mostrar pieza dental seleccionada *****************/
	function mostrarModalSeleccionado(item, diagnostico, tratamiento){
		var modalInstance = $modal.open({
	        animation: true,
	        templateUrl: 'js/hefesoft/odontograma/directivas/piezaDental/template/seleccionada.html',
	        controller: 'piezaDentalSeleccionadaCtrl',
	        size: 'sm',
	        resolve: {
	          diagnostico : function () {
	            return diagnostico;
	          },
	          tratamiento : function () {
	            return tratamiento;
	          },
	          piezaDental : function () {
	            return item;
	          }
	        }
	      });

		//El primero es cerrar el segundo es dimiss
		 modalInstance.result.then(
		 	function(data){},
		 	function (data) {
       	 		$scope.fnModificado($scope.$parent, { 'item' : item });
	     });
	}

	//Oculta todos los pop over abiertos
	function hidePopOver(){
		$('.popover').hide();
	}
}])