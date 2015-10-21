/*global angular*/
angular.module('odontologiaApp')
.directive('periodontogramaPiezaDental', [function () {
	return {
		restrict: 'E',
		scope:{			
			zoom : '=',			
			item: '=',
			ocultarNumeroPiezaDental : '='
		},
		templateUrl : 'js/hefesoft/periodontograma/piezaDental/views/piezaDental.html',
		controller : 'periodontogramaPiezaDentalCtrl',
		link: function (scope, el, attr) {
			$(el[0]).css('zoom', scope.zoom);
		}
	};
}])