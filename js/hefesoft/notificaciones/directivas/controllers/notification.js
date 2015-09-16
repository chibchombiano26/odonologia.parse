angular.module('directivas')
.controller('listadoNotificacionesCtrl', 
	['$scope', 'dataTableStorageFactory', '$rootScope', 
	function ($scope, dataTableStorageFactory, $rootScope) {
	
	$scope.listado = [];
	$scope.numeroNotificaciones = 0;

	function inicializarElementos(){
	   dataTableStorageFactory.getTableByPartition('TMNuevaCita', $rootScope.currentUser.email)
      .success(function(data){      	
        if(data){        	
        	$scope.listado = procesarListado(data);
        	$scope.numeroNotificaciones = $scope.listado.length;
        } 
      }).error(function(error){
        console.log(error);          
      })
	}

	function procesarListado(data){
		for (var i = data.length - 1; i >= 0; i--) {
			data[i]['paciente'] = JSON.parse(data[i]['paciente']);
			data[i]['clinica'] = JSON.parse(data[i]['clinica']);
		};

		return data;
	}
	
	inicializarElementos();

}])