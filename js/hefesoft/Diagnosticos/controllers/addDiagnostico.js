  angular.module('odontologiaApp')
  .controller('AddDxCtrl', 
    ['$scope', 'CieCupsServices', '$modal', 'dataTableStorageFactory', 'messageService', 'dxSeleccionado', '$modalInstance', '$rootScope',
    function ($scope, CieCupsServices, $modal, dataTableStorageFactory, messageService, dxSeleccionado, $modalInstance, $rootScope) {

    var esNuevo = true; 
    $scope.Diagnostico = {};
    $scope.listadoCie = [];  	

    $scope.Tipo = [{nombre: 'Pieza', codigo : 1}, {nombre: 'Superficie', codigo : 2}, {nombre: 'General', codigo : 3}];

   
    /* Modo edicion */
    if(!angular.isUndefined(dxSeleccionado))
    {
      $scope.Diagnostico = dxSeleccionado;      
      esNuevo = false;
    }

  	function inicializar(){  	
      CieCupsServices.listadoCie().then(cie, error);
  	}

    $scope.adicionar = function(){
      var data = $scope.Diagnostico;      
      data.PartitionKey = $rootScope.currentUser.id;

      //Cuando es un nuevo paciente el otro caso es cuando se edita un registro
      if(angular.isUndefined(data.RowKey)){
        data.generarIdentificador = true;
      }

      data.nombreTabla= 'TmDiagnosticos';       

      dataTableStorageFactory.saveStorage(data).then(function(data){        
        messageService.showMessage("Diagnostico guardado");
        if(esNuevo){
          $modalInstance.dismiss(data);
        }
        else{
          $modalInstance.close(); 
        }
      });      
   }

    function cie(data){
      $scope.listadoCie = data;
    }

    function error(err){
      console.log(err);
    }

  	inicializar();

  }])