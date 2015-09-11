angular.module('directivas').
controller('recaptchaController', ['$scope', '$state', '$timeout', 'varsFactoryService', 
	function($scope, $state, $timeout, varsFactoryService){
	

	function validarPlataforma(){
	  var deviceInformation = ionic.Platform.device();
      var isAndroid = ionic.Platform.isAndroid();
      var isWebView = ionic.Platform.isWebView();
      var isIPad = ionic.Platform.isIPad();
      var isIOS = ionic.Platform.isIOS();
      var isAndroid = ionic.Platform.isAndroid();
      var isWindowsPhone = ionic.Platform.isWindowsPhone();

      var currentPlatform = ionic.Platform.platform();
      var currentPlatformVersion = ionic.Platform.version();

      if(isAndroid || isWindowsPhone ||  isIOS){
      	  varsFactoryService.captchaSet('mobile');          
          $state.go("sigin");
      }

	}


	$scope.activarIngreso = false;

	if(varsFactoryService.getModoDesarrollo()){
		varsFactoryService.captchaSet("development");
		$scope.activarIngreso = true;
		$state.go("sigin");
	}

	$scope.irLogin = function(){
		$state.go("sigin");
	}

	 $scope.setCaptcha = function(response){
    	$scope.$apply(function () {
    		varsFactoryService.captchaSet(response);
            $scope.activarIngreso = true;
            $timeout(function(){$state.go("sigin");}, 1000);
        });
  	};

  	validarPlataforma();
}])