angular.module('Util')
.controller('modalCtrl', ['$scope', '$modalInstance', 
	function ($scope, $modalInstance) {

   $scope.$watch('cerrar', function(e) {      
      if(e && e == true){
      	$modalInstance.dismiss();
      } 
   });

	function cerrarVentana(){
	  $modalInstance.dismiss();
	}

	/* version alternativa
	$scope.$on('Cerrar-ventana', function(event, args) {
		cerrarVentana();
	});
	*/
}])