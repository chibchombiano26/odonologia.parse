angular.module('directivas')
.directive('simbolo', [function () {

	var directiva = {};
	directiva.restrict = 'E';
	directiva.templateUrl = "app/scripts/controllers/tratamientos/directivas/wizardSimbolo/template/simbolo.html";
	directiva.controller = "SimboloCtrl";

	directiva.link = function (scope, iElement, iAttrs) {			
	};


	return directiva;
	
}])