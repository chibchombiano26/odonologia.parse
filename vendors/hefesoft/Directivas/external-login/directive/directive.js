angular.module('directivas').
directive('externalLogin', [function () {
	
	var directiva = {};

	directiva.restrict = "E";

	directiva.link = function (scope, iElement, iAttrs) {
			
	}

	directiva.templateUrl = "app/lib/hefesoft.standard/Directivas/external-login/template/template.html";
	directiva.controller = "externalLoginCtrl";

	return directiva;

	
}])