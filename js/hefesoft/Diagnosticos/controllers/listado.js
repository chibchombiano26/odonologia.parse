  angular.module('odontologiaApp')
  .controller('DxListadoCtrl', 
    ['$scope', 'CieCupsServices', '$modal', 'dataTableStorageFactory', '$rootScope',
    function ($scope, CieCupsServices, $modal, dataTableStorageFactory, $rootScope) {

    var modalInstance;
    $scope.Listado = [];
    $scope.diagnosticoSeleccionado = {};
   
  	function inicializar(){
      dataTableStorageFactory.getTableByPartition('TmDiagnosticos', $rootScope.currentUser.id)
      .success(function(data){          
          $scope.Listado = data;
        }).error(function(error){
          console.log(error);          
        })
  	}

    $scope.eliminar = function(data, $index){
      data.Estado_Entidad = "2";    
      dataTableStorageFactory.saveStorage(data);      
    }

    $scope.modificado = function(item){
      dataTableStorageFactory.saveStorage(item);
    }
   
    
  inicializar();

}])