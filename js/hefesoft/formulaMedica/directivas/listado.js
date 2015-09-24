angular.module('odontologiaApp')
.directive('listadoFormulaMedicas', [function ($scope) {
	return {
		restrict: 'E',		
		link: function (scope, iElement, attributes, ngModelCtrl) {		   
		   
		},
		controller: 'listadoFormulaMedicaCtrl',
		templateUrl : 'js/hefesoft/formulaMedica/directivas/template/listado.html'		
	};
}])
