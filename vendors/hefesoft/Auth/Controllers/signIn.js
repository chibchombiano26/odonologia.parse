angular.module('auth')
.controller('signInController', 
	['$scope','signFactoryService','$state', 'users', 'varsFactoryService', 'validarNavegacionService',  '$timeout', 'stripeService', 'inicializarServicios', 'messageService', 'clinicaNavigation',
	function ($scope, signFactoryService, $state, users, varsFactoryService, validarNavegacionService,  $timeout,  stripeService, inicializarServicios, messageService, clinicaNavigation) {
	
	$scope.loginData= {};	

	$scope.doSign = function(){	
		var data = $scope.loginData;
		signFactoryService.sign(data).then(success, error);
	}

	function success(data){
		 clinicaNavigation.validarDatosClinica();
		 inicializarServicios.inicializar($scope.loginData.username);
	}

	function error(data){
		messageService.notify('Error al ingresar verifique su nombre de usuario y contraseña', 'danger');	
	}

}]);