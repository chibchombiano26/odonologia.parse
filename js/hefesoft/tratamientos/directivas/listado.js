  angular.module('odontologiaApp')
  .directive('listadoTratamientos', ['$parse',function ($parse) {
  	return {
  		restrict: 'E',
  		require: ['ngModel'],
  		link: function (scope, iElement, attrs, ngModelCtrl) {

       var existClick = attrs['seleccionadoCallback'];
       if(angular.isDefined(existClick)){
          scope.fnEdit = $parse(attrs['seleccionadoCallback']);
       }

       existClick = attrs['eliminarCallback'];
       if(angular.isDefined(existClick)){
          scope.fnEliminar = $parse(attrs['eliminarCallback']);
       }

       var cargarTratamiento = scope.inicializarElementos;
       ngModelCtrl[0].$render = function(){
       if (!ngModelCtrl[0].$isEmpty(ngModelCtrl[0].$viewValue)) {
          var valor = ngModelCtrl[0].$viewValue;  
          cargarTratamiento(valor);
        }
       }         			
  		},
  		controller : 'listadoTratamientosCtrl',
  		templateUrl : 'js/hefesoft/tratamientos/views/listado.html',
      scope:{
        ocultarAddTratamiento : '=',
        editable : '=',
        verSuperficies: '='
      }
  	};
  }])