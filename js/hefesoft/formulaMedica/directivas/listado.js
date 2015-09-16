angular.module('odontologiaApp')
.directive('listadoFormulaMedicas', [function ($scope) {
	return {
		restrict: 'E',		
		link: function (scope, iElement, attributes, ngModelCtrl) {		   
		   
		},
		controller: 'listadoFormulaMedicaCtrl',
		templateUrl : 'app/scripts/controllers/formulaMedica/directivas/template/listado.html'		
	};
}])
