angular.module('directivas')
.directive('drillDown', [function () {

	var directiva = {};
	directiva.restrict= 'E';

	directiva.link = function (scope, iElement, iAttrs) {
			
	}

	directiva.controller = "drillDownCtrl";
	directiva.templateUrl = "vendors/hefesoft/Directivas/drillDown/template/drillDown.html";
	directiva.scope = {
		source : "=",
		objetoArray : "=",
		title : '='
	};

	return directiva;
	
}])