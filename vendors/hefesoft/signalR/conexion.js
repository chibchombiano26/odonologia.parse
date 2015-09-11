angular.module('SignalR')
.service('conexionSignalR', ['$rootScope', 'messageService', '$timeout', '$q', '$interval', 'varsFactoryService', 'signalrService',
	function (messageService, $rootScope, $timeout, $q, $interval, varsFactoryService, signalrService) {

	var datafactory = {};
	

	datafactory.procesarMensaje = function(para, de, tipo, mensaje, accion){
		var valido = validarDatos(para, de, tipo);

		if(valido){
			var mensajeString = tipo;

			if(!angular.isUndefined(mensaje)){
				mensajeString  = mensajeString + "," + mensaje;
			}
			if(!angular.isUndefined(accion)){
				mensajeString  = mensajeString + "," + accion;
			}

			datafactory.sendMessage(de,para, mensajeString);
		}
	}

	datafactory.sendMessage = function(de, para, message){
		validarEstadoProxy().then(function(){
			signalrService.sendMessage(de, {mensaje : message , to: para});	
		})		
	}


	

	function validarEstadoProxy(){
		var deferred = $q.defer();
		var enLinea = false;
		var proxyInicializado = varsFactoryService.obtenerproxyInicializado();
		var enLinea = varsFactoryService.obtenerproxyEnLinea();
		
		//Si el proxy no esta inicializado inicializelo
		if(!proxyInicializado || !enLinea){
			signalrService.inicializarProxy('chatHub');

			var interval = $interval(function(){
				enLinea = varsFactoryService.obtenerproxyEnLinea();
				//Si ya esta en linea detenga el interval
				if(enLinea){
					$interval.cancel(interval);
					deferred.resolve();
				}
			}, 1000);
		}
		else{
			$timeout(function(){
				deferred.resolve();
			}, 500);		
		}

		return deferred.promise;
	}

	

	function validarDatos(para, de, tipo){
		var valido = true;
		if(angular.isUndefined(para)){
			valido = false;
			throw "el campo para es requerido";
		}
		if(angular.isUndefined(de)){
			valido = false;
			throw "el campo de es requerida";
		}
		if(angular.isUndefined(tipo)){
			valido = false;
			throw "el campo tipo es requerido";
		}

		return valido;

	}


	return datafactory;


	
}])