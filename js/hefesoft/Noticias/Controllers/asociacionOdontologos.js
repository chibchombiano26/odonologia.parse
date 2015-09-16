angular.module('odontologiaApp')
.controller('asociacionOdontologosCtrl', ['$scope', 'fbGroupsService',
	function ($scope, fbGroupsService) {

	$scope.data = {};
	
	function inicializar(){
		fbGroupsService.getWall().then(success);
	}

	function success(data){		
		var listado = _.where(data.data, { 'type': "photo" });
		$scope.data = filtrarDatos(listado);
	}

	function filtrarDatos(listado){		
		var arrayRetornar = [];
		for (var i = listado.length - 1; i >= 0; i--) {			
			var elemento = listado[i];
			var valido = (angular.isDefined(elemento.message) && elemento.message.length > 0);
			var validoHttp = (angular.isDefined(elemento.message) && (elemento.message.indexOf("https") == -1)) 
			var validoSoftware = (angular.isDefined(elemento.message) && ((elemento.message.indexOf("software") == -1) && (elemento.message.indexOf("Software") == -1)));

			if(valido && validoHttp && validoSoftware){
			   arrayRetornar.push(elemento);
			} 
		};

		return arrayRetornar;
	}

	inicializar();

}])