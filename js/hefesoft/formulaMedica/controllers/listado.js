angular.module('odontologiaApp')
.controller('listadoFormulaMedicaCtrl', 
	['$scope', 'dataTableStorageFactory', '$modal', '$rootScope',
	function ($scope, dataTableStorageFactory, $modal, $rootScope) {

	$scope.listados = [];
	
	/*************************** Formula Medica *********************/
	  $scope.open = function (size, seleccionado) {
	     var modalInstance = $modal.open({
	        animation: true,
	        templateUrl: 'app/scripts/controllers/formulaMedica/views/addFormulaMedica.html',
	        controller: 'AddFormulaMedicaCtrl',
	        size: size,
	        resolve: {	          
	          seleccionado : function(){
	          	return seleccionado; 
	          }
	        }
	      });

	    modalInstance.result.then(function (selectedItem) {
	        $scope.selected = selectedItem;
	      }, 
	      function (data) {
	       	inicializarElementos();
	      });
	  };
     /*************************************************************/
        
     $scope.eliminar = function(data, $index){
        data.Estado_Entidad = "2";    
        dataTableStorageFactory.saveStorage(data);
        $scope.listados.splice($index, 1);
     }

      function inicializarElementos(){          
          //El ultimo parametro es el tratamiento seleccionado
	  	dataTableStorageFactory.getTableByPartition('TmFormulaMedica', $rootScope.currentUser.id)
      	.success(function(data){
          $scope.listados = data;        
        }).error(function(error){
          console.log(error);          
        })	  	
	  }

	  inicializarElementos();
}])