angular.module('odontologiaApp')
.controller('AgendaCtrl', 
	['$scope', 'calendarGetData', 'agendaHelperService', 'dataTableStorageFactory', '$rootScope',
	function ($scope, calendarGetData, agendaHelperService, dataTableStorageFactory, $rootScope) {
	 
	$scope.mostrarBotonAutorizar = false;
	$scope.listadoEventos = [];
	$scope.contextoCalendar = {};
	$scope.calendarId = 'primary';

	var listadoGoogleCalendar = [];

	var event = {
	  'summary': 'Google I/O 2015',
	  'location': '800 Howard St., San Francisco, CA 94103',
	  'description': 'A chance to hear more about Google\'s developer products.',
	  'start': {
	    'dateTime': '2015-05-28T09:00:00-07:00',
	    'timeZone': 'America/Los_Angeles'
	  },
	  'end': {
	    'dateTime': '2015-05-28T17:00:00-07:00',
	    'timeZone': 'America/Los_Angeles'
	  },
	  'recurrence': [
	    'RRULE:FREQ=DAILY;COUNT=2'
	  ],
	  'attendees': [
	    {'email': 'lpage@example.com'},
	    {'email': 'sbrin@example.com'}
	  ],
	  'reminders': {
	    'useDefault': false,
	    'overrides': [
	      {'method': 'email', 'minutes': 24 * 60},
	      {'method': 'sms', 'minutes': 10}
	    ]
	  }
	};

	$scope.auth = function(){
		calendarGetData.auth().then(autorizado, noAutorizado);
	}

	$scope.adicionado = function(item){
		var elementoProcesado = agendaHelperService.procesarAdicionado(item);
		calendarGetData.insert(elementoProcesado, $scope.calendarId).then(
		 function(insertado){
		 	var contexto = $scope.contextoCalendar();
		 	insertado = agendaHelperService.procesarDato(insertado);
		 	contexto.adicionarEvento(insertado);
		 	listadoGoogleCalendar.push(insertado);
		 });
	}

	$scope.modificado = function(item){
		var index = _.findIndex(listadoGoogleCalendar, { 'id': item.id});
		var elementoActualizar = listadoGoogleCalendar[index];

		elementoActualizar = agendaHelperService.procesarDato.actualizar(elementoActualizar, item);		
		calendarGetData.update($scope.calendarId, elementoActualizar.id, elementoActualizar);
	}

	$scope.eliminado = function(item){
		var index = _.findIndex(listadoGoogleCalendar, { 'id': item.id});
		var elementoEliminar = listadoGoogleCalendar[index];
		calendarGetData.deleteEvent($scope.calendarId, elementoEliminar.id);
	}	

	function inicializar(){
		calendarGetData.getAuth().then(autorizado, noAutorizado);
	}

	function noAutorizado(data){
		$scope.mostrarBotonAutorizar = true;
	}
	
	function autorizado(data){		
		calendarGetData.loadEventApi().then(eventApiCargada);
		mostrarBotonAutorizar = false;
	}

	function eventApiCargada(){		
		calendarGetData.getCalendar($scope.calendarId).then(eventosCargados);		
		calendarGetData.listCalendars().then(listCalendarsSuccess);
	}

	function eventosCargados(data){
		mostrarBotonAutorizar = false;
		listadoGoogleCalendar = data;
		agendaHelperService.procesarDatos(data);
		$scope.listadoEventos = data;
	}

	function listCalendarsSuccess(resp){		
		var items = resp.items;
		var array = [];

		for(var i in items){
			if(angular.isDefined(items[i].id)){
				array.push({id : items[i].id, row: i });
			}
		}

		dataTableStorageFactory.postTableArray(array, 'TmCalendarsUsuario',  Parse.User.current().get("email"), 'row');
	}
    
	inicializar();

}])