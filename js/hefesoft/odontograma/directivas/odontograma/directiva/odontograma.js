angular.module('directivas').
directive('odontograma', ['$parse',
	function ($parse) {

	var directiva = {};
	directiva.restrict = 'E';
	directiva.link = function (scope, iElement, attrs) {
		
	  var existClick = attrs['piezaModificada'];
      if(angular.isDefined(existClick)){
         scope.fnModificado = $parse(attrs['piezaModificada']);
      }

      existClick = attrs['clickCallback'];
      if(angular.isDefined(existClick)){
         scope.fnClick = $parse(attrs['clickCallback']);
      }

      existClick = attrs['odontogramaBaseCargadoCallback'];
      if(angular.isDefined(existClick)){
         scope.fnOdontogramaBaseCargado = $parse(attrs['odontogramaBaseCargadoCallback']);
      }

      if(scope.contexto){
      	scope.contexto = function(){
      	  return scope;
      	}
      }

	}

	directiva.scope = {
		diagnosticoSeleccionado : "=",
		tratamientoSeleccionado : "=",
		numeroPiezaModificada : '=',
		contexto : '='
	};

	directiva.templateUrl = "js/hefesoft/odontograma/directivas/odontograma/template/odontograma.html";
	directiva.controller = "odontogramaCtrl";

	return directiva;

	
}])