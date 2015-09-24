angular.module('directivas')
.directive('wizardSimbolo', [function () {

	var directiva = {};
	directiva.restrict = 'E';
	directiva.require = ['ngModel'];
	directiva.templateUrl = "js/hefesoft/tratamientos/directivas/wizardSimbolo/template/wizardSimbolo.html";
	directiva.controller = "wizardSimboloCtrl";
	directiva.scope  = {
		nombre  : '='
	}
	

	directiva.link = function (scope, iElement, iAttrs, ngModelCtrl) {
		scope.ngModelCtrl = ngModelCtrl;
	};


	return directiva;
	
}])