angular.module('hefesoft.google')
.directive('googlePicker', [function () {
	
	var directiva = {};

	directiva.restrict = "E";
	directiva.link = function (scope, iElement, iAttrs) {
			
	}

	directiva.templateUrl = "vendors/hefesoft/google/directivas/picker/template/picker.html";
	directiva.controller = "googlePickerCtrl";

	return directiva;	
}])