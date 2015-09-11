angular.module('auth')
.controller('signUpController', ['$scope', 'signFactoryService','$ionicLoading', 'validarNavegacionService', 'messageService','$state', 'connectionMode', 'inicializarServicios',
	function ($scope, signFactoryService, $ionicLoading, validarNavegacionService, messageService, $state, connectionMode, inicializarServicios) {
	
	//validarNavegacionService.validarCaptcha();
	$scope.loginData= {};

	$scope.onSign = function(item){
		 $scope.$apply(function () {
            $scope.loginData.username = item.email.split('@')[0];
			$scope.loginData.email = item.email;
        });
	}

	$scope.doSignUp = function(){
		if(connectionMode.conexionStatus()){
			$ionicLoading.show();
			signFactoryService.signUp($scope.loginData).then(success, error);
		}
		else{
			messageService.showMessage("No se ha detectado una conexion a internet activa");	
		}
	}

	$scope.goLogin = function(){
		$state.go("sigin");
	}

	//Apenas se registre se loguea en la app
	function success(data){
		signFactoryService.sign(data)
		.then(successLogin, error);
		messageService.showMessage("Bienvenido: " + $scope.loginData.username);
	}

	function successLogin(data){
		try{
			console.log(data);
			$ionicLoading.hide();
			inicializarServicios.inicializar($scope.loginData.username);
			clinicaNavigation.validarDatosClinica();
		}
		catch(ex){
			$ionicLoading.hide();
			$state.go("app.citas");

			//Molesta el push en wp8
			//alert(ex);
		}
	}

	function error(data){
		$ionicLoading.hide();
		console.log(data);
		messageService.showMessage("Error al registrar usuario");
	}

}])