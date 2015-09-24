angular.module('odontologiaApp')
.controller('datosClinicaCtrl', 
	['$scope', 'dataTableStorageFactory', 'image64Service', '$rootScope',
	function ($scope, dataTableStorageFactory, image64Service, $rootScope) {
	
	$scope.clinica = {};
	$scope.cambiarImagen = false;
	var dataImagen64;

	$scope.cancelarClick = function(){
		$scope.cambiarImagen = false;
	}

	$scope.cambiarImagenClick = function(){
		$scope.cambiarImagen = true;		
	}

	$scope.guardar = function(){
		
		$scope.clinica['nombreTabla'] = 'TmDatosClinica';
		$scope.clinica['PartitionKey'] = Parse.User.current().get("email");
		$scope.clinica['RowKey'] = "1";
		
		dataTableStorageFactory.saveStorage($scope.clinica);
	}

	$scope.fileUpload = function(item){
		$scope.cambiarImagen = false;
		$scope.guardar();	
	}

	function inicializarElementos(){
	dataTableStorageFactory.getTableByPartitionAndRowKey('TmDatosClinica', Parse.User.current().get("email"), "1")
      .success(function(data){
      	if(!data == null){
      	   $scope.clinica = data;
      	}
      	else{
      	   $scope.clinica = {};
      	   $scope.clinica.pathImagen = $rootScope.currentUser.picture;
      	   $scope.clinica.nombreEntidad = $rootScope.currentUser.name;
      	   $scope.clinica.email = $rootScope.currentUser.email;
      	}
      	
      	image64Service.convertImgToBase64($scope.clinica.pathImagen, image64);

   	  }).error(function(error){
      	console.log(error);          
      })
	}

	function image64(data){
		$rootScope.currentUser.dataImagen64 = data;
	}	

	inicializarElementos();

}])