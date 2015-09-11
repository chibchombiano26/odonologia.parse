angular.module('W8')
.service('UniversalApps', ['$timeout', function ($timeout) {
	
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	var dataFactory = {};


	/*
		Este servicio se utiliza para comunicarse con universal app el timer se utiliza para enviar mensajes 
		con intervalos de 6 segundos ya que la app de windows universal limpia los mensajes cada 5 segundos
	*/

	dataFactory.alert = function(mensaje, tiempo){
		$timeout(function(){

			 if(isIE){
	            window.external.notify("Alert," + mensaje);
	         }

		}, tiempo * 1000);

		
	}

	dataFactory.toast = function(mensaje, tiempo){
		$timeout(function(){

			if(isIE){
	            window.external.notify("Toast," + mensaje);
	         }

		},tiempo * 1000);


		
	}

	dataFactory.login = function(username, password){
		$timeout(function(){

			if(isIE){
				window.external.notify("Ingreso," + username + "," + password);
			}

		},1000);


	}

	dataFactory.push = function(to, mensaje, tiempo){

		$timeout(function(){

			if(isIE){
	            window.external.notify("Push," + to + "," + mensaje);
	         }

		},tiempo * 1000);

		
	}	

	return dataFactory;


}])