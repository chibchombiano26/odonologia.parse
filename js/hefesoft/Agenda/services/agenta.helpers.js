angular.module('odontologiaApp')
.service('agendaHelperService', [function () {
	
	var dataService = {};

	dataService.procesarAdicionado = function (item){

		var start = moment(item.inicio).format("YYYY-MM-DDTHH:MM:SS.SSSZ");
		var end = moment(item.fin).format("YYYY-MM-DDTHH:MM:SS.SSSZ");

		start = moment(item.inicio).add(5, 'h');
		end = moment(item.fin).add(5, 'h');

		var elementoRetornar = {};
		elementoRetornar['summary'] = item.title;
		elementoRetornar['start'] = { dateTime : start};
		elementoRetornar['end'] = { dateTime : end};
		elementoRetornar['description'] = item.title;
		return elementoRetornar;
	}

	dataService.procesarDatos = function (data){
		for (var i = data.length - 1; i >= 0; i--) {
			data[i] = procesarDato(data[i]);
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
		var start = moment(item.inicio).format("YYYY-MM-DDTHH:MM:SS.SSSZ");
		var end = moment(item.fin).format("YYYY-MM-DDTHH:MM:SS.SSSZ");
		
		elementoActualizar['summary'] = item.title;
		elementoActualizar['start'] = { dateTime : start};
		elementoActualizar['end'] = { dateTime : end};
		elementoActualizar['description'] = item.title;

		return elementoActualizar;
	}

	return dataService;

}])