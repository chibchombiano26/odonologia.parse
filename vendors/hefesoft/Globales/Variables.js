angular.module('Global')
.factory('varsFactoryService', [function () {
	
	var vars = {};
	var pacienteSeleccionado;
	var prestadorSeleccionado;
	var captcha;
	var captchaFijado = false;	
	var autologueado = true;
	var modoDesarrollo = true;
	var proxyInicializado = false;
    var proxyEnLinea = false;
    var tipoOdontograma = "";


	vars.fijarPrestador = function(prestador){
		prestadorSeleccionado = prestador;
	}

	vars.captchaSet = function(response){
		captcha = response;
		captchaFijado = true;
	}

	vars.captchaFijado = function(){
		return captchaFijado;
	}

	vars.prestadorSeleccionado = function(){
		return prestadorSeleccionado;
	}

	//Si ya se llamo a la funcion inicializar
    vars.setproxyInicializado = function(item){
        proxyInicializado = item;
    }

    vars.setproxyEnLinea = function(item){
        proxyEnLinea = item;
    }

	//Si ya se llamo a la funcion inicializar
    vars.obtenerproxyInicializado = function(){
        return proxyInicializado;
    }

    vars.obtenerproxyEnLinea = function(){
        return proxyEnLinea;
    }

	vars.fijarPaciente = function(paciente){
		pacienteSeleccionado = paciente;
	}

	vars.pacienteSeleccionado = function(){
		return pacienteSeleccionado;
	}

	vars.getAutologueado = function(){
		return autologueado;
	}

	vars.setAutologueado = function(valor){
		autologueado = valor;
	}

	vars.getModoDesarrollo = function(){
		return modoDesarrollo;
	}

	vars.setTipoOdontograma = function(tipo){
		tipoOdontograma = tipo;
	}

	vars.getTipoOdontograma = function(){
		return tipoOdontograma;
	}

	return vars;	
}])