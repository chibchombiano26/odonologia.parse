  angular.module('odontologiaApp')
  .controller('AddTratamientoCtrl', ['$scope', 'CieCupsServices', '$modal', 'dataTableStorageFactory', 'messageService',  '$modalInstance', 'listado',
    function ($scope, CieCupsServices, $modal, dataTableStorageFactory, messageService,  $modalInstance, listado) {

    var esNuevo = true;
    $scope.Tratamiento = {};


   $scope.adicionar = function(){
   	 var data = $scope.Tratamiento;
      agregarTratamiento(data);
   }


   function agregarTratamiento(item){    
     listado.push(item);     
     $modalInstance.dismiss(); 
   }

}])