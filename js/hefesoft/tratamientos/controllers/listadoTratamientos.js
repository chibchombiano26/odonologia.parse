  
  /*global angular, Parse, Hefesoft, Hefesot*/
  angular.module('odontologiaApp')
  .controller('listadoTratamientosCtrl', ['$scope', '$modal', 'dataTableStorageFactory', 'messageService', '$timeout',
    function ($scope, $modal, dataTableStorageFactory, messageService, $timeout) {
    	
    	$scope.listado = [];

    	//Aca llega diagnosticoSeleccionado $scope.diagnosticoSeleccionado     
       $scope.selected = function(item){
       	 $scope.tratamientoSeleccionado = item;

       	 if(angular.isDefined($scope.fnEdit) && angular.isFunction($scope.fnEdit)){
       	 	$scope.fnEdit($scope.$parent, { 'item' : item });
       	 }
       }

       /**************** Tratamientos *****************************/
	   $scope.openTratamiento = function (size, seleccionado) {
	     var modalInstance = $modal.open({
	        animation: true,
	        templateUrl: 'js/hefesoft/tratamientos/views/addTratamiento.html',
	        controller: 'AddTratamientoCtrl',
	        windowClass: 'my-dialog',
	        size: size,
	        resolve: {
	          listado : function () {
	            return $scope.listado;
	          }
	        }
	      });

	    modalInstance.result.then(function (selectedItem) {
	        $scope.selected = selectedItem;
	      }, 
	      function (data) {	      	
	       
	      });
	  };

	  $scope.inicializarElementos = function(elementos){	  	
	  	$scope.listado = Hefesot.aListado(elementos);
	  	
	  	
	  	if($scope.listado && $scope.listado.length > 0){
	  		
	  		$timeout(function(){
	  			$scope.selected($scope.listado[0]);	
	  		},500);
	  		
	  	}
	  	
	  }

	  $scope.eliminar = function(item, $index){	      
	    $scope.listado.splice($index, 1);

	    if(angular.isDefined($scope.fnEliminar) && angular.isFunction($scope.fnEliminar)){
	   	 	$scope.fnEliminar($scope.$parent, { 'item' : item, "index" : $index });
	   	}	      	      
      }
}])