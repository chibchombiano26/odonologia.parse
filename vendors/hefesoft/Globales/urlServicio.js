angular.module('Global')
.factory('urlServicioFactory', [function () {

	var urlFactory = {};

	urlFactory.getUrlService = function(){

		//Produccion
	    var urlBase = 'https://hefesoftdynamicbackend.azurewebsites.net/api/';
	    //Pruebas
	    //var urlBase = 'http://localhost:3481/api/'
	    return urlBase;

	}

	urlFactory.getUrlBase = function(){

		//Produccion
	    var urlBase = 'https://hefesoftdynamicbackend.azurewebsites.net/';
	    //Pruebas
	    //var urlBase = 'http://localhost:3481/'
	    return urlBase;

	}

	urlFactory.getUrlWebSocket = function(){

		//Produccion
	    var urlBase = 'https://hefesoftdynamicbackend.azurewebsites.net';
	    //Pruebas
	    //var urlBase = 'http://localhost:3481'
	    return urlBase;

	}

	return urlFactory;

}])