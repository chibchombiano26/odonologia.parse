angular.module('Upload')
.controller('adjuntosListCtrl', 
	['$scope', 'validarNavegacionService', 'dataTableStorageFactory', 'users', 'varsFactoryService', '$rootScope',
	function ($scope, validarNavegacionService, dataTableStorageFactory, users, varsFactoryService, $rootScope) {

	 validarNavegacionService.validarPacienteSeleccionado();
	 $scope.items = [];

	 function load(){
        var paciente = varsFactoryService.pacienteSeleccionado();

	 	var partition = $rootScope.currentUser.id + "paciente" + paciente.RowKey;
        dataTableStorageFactory.getTableByPartition('TmArchivosAdjuntos', partition)
        .success(success)
        .error(error);	 	
	 }

	 $scope.eliminar = function(e){
	 	var index = $scope.items.indexOf(e);

        if(index >= 0){
            $scope.items.splice(index, 1);
        }

	 	dataTableStorageFactory.deleteFromStorage(e);
	 }

	 function success(data){
	 	$scope.items = data;
	 }

	 function error(error){
	 	console.log(error);
	 }


	 load();
	
}])