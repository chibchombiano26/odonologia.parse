  angular.module('odontologiaApp')
  .controller('AddProcedimientoCtrl', ['$scope', 'CieCupsServices', 'dataTableStorageFactory', 'messageService', '$modalInstance', 'listado', 'seleccionado',
    function ($scope, CieCupsServices, dataTableStorageFactory, messageService, $modalInstance, listado, seleccionado) {

    var esNuevo = true;
    $scope.Procedimiento = {};
    $scope.listadoCup = [];
    $scope.modo = "Guardar";

    if(!angular.isUndefined(seleccionado)){
       $scope.Procedimiento = seleccionado;
       $scope.modo = "Editar";
       esNuevo = false;
    }

    $scope.Especialidades = [{nombre: 'ODONTOLOGIA', codigo : 1}, {nombre: 'ODONTOPEDIATRIA', codigo : 2}, {nombre: 'ORTOPEDIA, ORTODONCIA Y OTROS PROCEDIMIENTOS', codigo : 3}];
  

   $scope.adicionar = function(){
   	 var data = $scope.Procedimiento;
   	 if(esNuevo){
        listado.push(data);
   	 }
   	 else{
   	    seleccionado = data;     
   	 }
   	 
     $modalInstance.close();
   }
    
    function inicializar(){
     CieCupsServices.listadoCup().then(success, error);
   }

   function success(data){
      $scope.listadoCup = data;
   }

   function error(err){
      console.log(err);
   }

   inicializar();

  }])