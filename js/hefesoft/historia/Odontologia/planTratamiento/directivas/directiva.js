angular.module('odontologiaApp')
.directive('planTratamiento', ['$parse', function ($parse) {

	var directiva = {};

	directiva.restrict = "E";
	directiva.templateUrl = "js/hefesoft/historia/Odontologia/planTratamiento/directivas/template.html"; 
	directiva.controller = "planTratamientoCtrl";

	directiva.link = function (scope, iElement, iAttrs) {
			
	}

	return directiva;	
}])