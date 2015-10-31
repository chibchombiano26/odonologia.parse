/*global angular*/
angular.module('odontologiaApp')
.controller('piezaDentalSeleccionadaCtrl', ['$scope', '$modalInstance', 'diagnostico', 'tratamiento', 'piezaDental', 'diagnosticoServices',
	function ($scope, $modalInstance, diagnostico, tratamiento, piezaDental, diagnosticoServices) {

	$scope.piezaDental = piezaDental;
	
}])