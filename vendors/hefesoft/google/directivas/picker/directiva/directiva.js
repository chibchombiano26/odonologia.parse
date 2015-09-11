angular.module('hefesoft.google')
.directive('googlePicker', [function () {
	
	var directiva = {};

	directiva.restrict = "E";
	directiva.link = function (scope, iElement, iAttrs) {
			
	}

	directiva.templateUrl = "app/lib/hefesoft.standard/google/directivas/picker/template/picker.html";
	directiva.controller = "googlePickerCtrl";

	return directiva;	
}])