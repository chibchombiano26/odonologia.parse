/*global angular*/

angular.module('odontologiaApp')
.service('agendaHelperService', [function () {
	
	var dataService = {};

	dataService.procesarAdicionado = function (item){

		//var start = moment(item.start).format("YYYY-MM-DDTHH:MM:SS.SSSZ");
		//var end = moment(item.end).format("YYYY-MM-DDTHH:MM:SS.SSSZ");

		/*
		start = moment(item.start).add(5, 'h');
		end = moment(item.end).add(5, 'h');
		*/

		var elementoRetornar = {};
		elementoRetornar['summary'] = item.title;
		elementoRetornar['start'] = { dateTime : item.start};
		elementoRetornar['end'] = { dateTime : item.end};
		elementoRetornar['description'] = item.title;
		return elementoRetornar;
	}

	dataService.procesarDatos = function (data){
		for (var i = data.length - 1; i >= 0; i--) {
			data[i] = dataService.procesarDato(data[i]);
		};
	}

	dataService.procesarDato = function(item){

		item['title'] = item.summary;
		item.start = item.start.dateTime;
		item.end = item.end.dateTime;

		/*
		if(angular.isDefined(item.colorId)){
			var color = gapi.client.calendar.colors.get(item.colorId);
			item['eventBackgroundColor'] = "red";
		}
		*/

		return item;
	}

	dataService.actualizar = function(elementoActualizar, item){
		
		//var start = moment(item.start).format("YYYY-MM-DDTHH:MM:SS.SSSZ");
		//var end = moment(item.end).format("YYYY-MM-DDTHH:MM:SS.SSSZ");
		
		elementoActualizar['summary'] = item.title;
		elementoActualizar['start'] = { dateTime : item.start};
		elementoActualizar['end'] = { dateTime : item.end};
		elementoActualizar['description'] = item.title;

		return elementoActualizar;
	}

	return dataService;

}])