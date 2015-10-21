/*global angular, _*/
angular.module('odontologiaApp')
.controller('asociacionOdontologosCtrl', ['$scope', 'fbGroupsService',
	function ($scope, fbGroupsService) {

	$scope.data = {};
	
	$scope.inicializar = function(url){
		fbGroupsService.getWallFbApi(url).then(success);
	}

	function success(data){		
		
		var listado = _.uniq( ( [] ).concat(
        _.where( data, { 'type': "photo" } ),
        _.where( data, { 'type': "link" } ) ) );
        
        listado = _.sortBy(listado, function(o) { return new Date(o.created_time); })
		$scope.data = filtrarDatos(listado);
	}

	function filtrarDatos(listado){		
		var arrayRetornar = [];
		for (var i = listado.length - 1; i >= 0; i--) {			
			var elemento = listado[i];
			
			if(elemento.type == "photo"){
				filterPhoto(elemento, arrayRetornar);	
			}
			else if(elemento.type == "link"){
				filterLink(elemento, arrayRetornar);	
			}
		};
		

		return arrayRetornar;
	}
	
	function filterPhoto(elemento, arrayRetornar){
		
		var valido = (angular.isDefined(elemento.message) && elemento.message.length > 0);
		var validoHttp = (angular.isDefined(elemento.message) && (elemento.message.indexOf("https") == -1)) 
		var validoSoftware = (angular.isDefined(elemento.message) && ((elemento.message.indexOf("software") == -1) && (elemento.message.indexOf("Software") == -1)));

		if(valido && validoHttp && validoSoftware){
		   arrayRetornar.push(elemento);
		}
	}
	
	function filterLink(elemento, arrayRetornar){
		
		var valido = (angular.isDefined(elemento.description) && elemento.description.length > 0) && (elemento.description.indexOf("Sident") == -1) && (elemento.description.indexOf("sident") == -1) && (elemento.description.indexOf("SIDENT") == -1);
		var validoHttp = (angular.isDefined(elemento.description) && (elemento.description.indexOf("https") == -1)) 
		var validoSoftware = (angular.isDefined(elemento.name) && ((elemento.name.indexOf("software") == -1) && (elemento.name.indexOf("Software") == -1)));

		if(valido && validoHttp && validoSoftware){
		   arrayRetornar.push(elemento);
		}
	}

	
	
}])