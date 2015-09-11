angular.module('SignalR')
.service('procesarMensajes', ['messageService', '$rootScope', function (messageService, $rootScope) {
	
	var datafactory = {};

	datafactory.tipoMensaje = function(nombre, mensaje){
		var array = mensaje.split(",")
		var tipo = array[0];
		var mensaje = array[1];
		var accion = array[2];
		

		if(tipo == "mensaje"){
			datafactory.mostrarMensaje(nombre + " ha enviado " + mensaje);
		}
		else if(tipo == "ejecutar accion"){
			datafactory.ejecutar(accion,mensaje, nombre);
		}
	}

	datafactory.mostrarMensaje = function(mensaje){
		messageService.showMessage(mensaje);
	}

	datafactory.ejecutar = function(accion, mensaje, de){
		$rootScope.$broadcast(accion, { mensaje: mensaje, de : de } );   
	}

	return datafactory;

}])