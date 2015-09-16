  angular.module('odontologiaApp')
  .controller('AddFormulaMedicaCtrl', 
    ['$scope', 'CieCupsServices', '$modal', 'dataTableStorageFactory', 'messageService', 'seleccionado', '$modalInstance', '$rootScope',
    function ($scope, CieCupsServices, $modal, dataTableStorageFactory, messageService,  seleccionado, $modalInstance, $rootScope) {

    var esNuevo = true;
    $scope.formulaMedica = {};
    
    if(!angular.isUndefined(seleccionado)){
       $scope.formulaMedica = seleccionado;
       esNuevo = false;
    }
        
   $scope.adicionar = function(){
   	  var data = $scope.formulaMedica;
      data.PartitionKey = $rootScope.currentUser.id;
      
      //Cuando es un nuevo paciente el otro caso es cuando se edita un registro
      if(angular.isUndefined(data.RowKey)){
        data.generarIdentificador = true;
      }

      data.nombreTabla= 'TmFormulaMedica';       

      dataTableStorageFactory.saveStorage(data).then(function(data){        
        messageService.showMessage("Formula medica guardado");
        if(esNuevo){
          $modalInstance.dismiss(data);
        }
        else{
          $modalInstance.close(); 
        }
      });
   }    

   function success(data){
      $scope.listadoCup = data;
   }

   function error(err){
      console.log(err);
   }

  }])