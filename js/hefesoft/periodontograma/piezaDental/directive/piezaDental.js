angular.module('odontologiaApp')
.directive('periodontogramaPiezaDental', [function () {
	return {
		restrict: 'E',
		scope:{			
			zoom : '=',			
			item: '='
		},
		templateUrl : 'app/scripts/controllers/periodontograma/piezaDental/views/piezaDental.html',
		controller : 'periodontogramaPiezaDentalCtrl',
		link: function (scope, el, attr) {
			$(el[0]).css('zoom', scope.zoom);
		}
	};
}])