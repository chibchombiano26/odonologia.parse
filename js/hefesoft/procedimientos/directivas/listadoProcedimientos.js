angular.module('odontologiaApp')
.directive('listadoProcedimientos', ['$parse',
	function ($parse) {
	return {
		restrict: 'E',
		require: ['ngModel'],
		link: function (scope, iElement, attrs, ngModelCtrl) {
		   var cargarTratamiento = scope.inicializarElementos;

		   var existClick = attrs['seleccionadoCallback'];
	       if(angular.isDefined(existClick)){
	          scope.fnEdit = $parse(attrs['seleccionadoCallback']);
	       }

	       existClick = attrs['eliminarCallback'];
	       if(angular.isDefined(existClick)){
	          scope.fnEliminar = $parse(attrs['eliminarCallback']);
	       }

	       existClick = attrs['adicionadoCallback'];
	       if(angular.isDefined(existClick)){
	          scope.fnAdicionado = $parse(attrs['adicionadoCallback']);
	       }

	       existClick = attrs['procedimientoRealizadoCallback'];
	       if(angular.isDefined(existClick)){
	          scope.fnProcedimientoRealizado = $parse(attrs['procedimientoRealizadoCallback']);
	       }

	       if(scope.contexto){
	        scope.contexto = function(){
	          return scope;
	    	}
	   	   }


		   ngModelCtrl[0].$render = function(){
		  	if (!ngModelCtrl[0].$isEmpty(ngModelCtrl[0].$viewValue)) {
		  		var valor = ngModelCtrl[0].$viewValue;	
		  		cargarTratamiento(valor);
            }		  	
		  }
		},
		controller: 'listadoProcedimientosCtrl',
		templateUrl : 'js/hefesoft/procedimientos/views/listado.html',
		scope:{
			dxSeleccionado : '=',
			ocultarAddProcedimiento : '=',
			editable : '=',
			modoPagos : '=',
			contexto :  '=' 
		}
	};
}])