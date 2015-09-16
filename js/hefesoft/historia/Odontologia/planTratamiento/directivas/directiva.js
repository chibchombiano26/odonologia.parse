angular.module('odontologiaApp')
.directive('planTratamiento', ['$parse', function ($parse) {

	var directiva = {};

	directiva.restrict = "E";
	directiva.templateUrl = "app/scripts/controllers/historia/Odontologia/planTratamiento/directivas/template.html"; 
	directiva.controller = "planTratamientoCtrl";

	directiva.link = function (scope, iElement, iAttrs) {
			
	}

	return directiva;	
}])