angular.module('odontologiaApp')
.service('wizardPasoVariablesServices', [function () {

	var simbolo;
	var dataService = {};

	dataService.setDiagnosticoSimbolo = function(e){
		simbolo = e;
	}

	dataService.getDiagnosticoSimbolo = function(){
		return simbolo;
	}

	return dataService;	
}])