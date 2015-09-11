angular.module('azure')
    .factory('emailFactory', ['$http','urlServicioFactory', function($http, urlServicioFactory) {
    
    var urlBase = urlServicioFactory.getUrlService() + 'email';
    var dataFactory = {};


  	dataFactory.enviarEmail = function(from, recipients, subject, mensajetext, mensajehtml){
		var data = {from: from, recipients: recipients, subject : subject, mensajetext: mensajetext, mensajehtml: mensajehtml};
		return $http.post(urlBase, data);
	}
  

    return dataFactory;
}]);