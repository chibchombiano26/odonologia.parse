  angular.module('odontologiaApp')
  .controller('wizardSimboloCtrl', ['$scope', 'dataTableStorageFactory', '$modal', 'wizardPasoVariablesServices',
    function ($scope, dataTableStorageFactory, $modal, wizardPasoVariablesServices) {

    $scope.openWizard = function (size, seleccionado) {
	     var modalInstance = $modal.open({
	        animation: true,
	        templateUrl: 'js/hefesoft/tratamientos/directivas/wizardSimbolo/views/wizardSimbolo.html',
	        controller : 'modalCtrl',	        
	        size: size,
	        resolve: {
	          
	        }
	      });

	    modalInstance.result.then(function (selectedItem) {
	        
	    }, 
	    function (data) {
	    	var valor = wizardPasoVariablesServices.getDiagnosticoSimbolo();
	    	$scope.ngModelCtrl[0].$setViewValue(valor);
	    });
	    
	  };
}])