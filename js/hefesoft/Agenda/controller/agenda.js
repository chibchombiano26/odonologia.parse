/*global _, angular, moment, hefesoft*/
angular.module('odontologiaApp')
.controller('AgendaCtrl', 
	['$scope', 'calendarGetData', 'agendaHelperService', 'dataTableStorageFactory', '$rootScope', 'prestadorService',
	function ($scope, calendarGetData, agendaHelperService, dataTableStorageFactory, $rootScope, prestadorService) {
	 
	$scope.mostrarBotonAutorizar = false;
	$scope.prestadores = [];
	$scope.listadoEventos = [];
	$scope.contextoCalendar = {};
	$scope.calendarId = 'primary';
	var listadoGoogleCalendar = [];

    
    $scope.cargarEventos = function(id){
        $('#calendar').fullCalendar('removeEvents');
        $scope.calendarId = id;
        eventApiCargada();
    }

	$scope.adicionado = function(item){
		var elementoProcesado = agendaHelperService.procesarAdicionado(item);
		calendarGetData.insert(elementoProcesado, $scope.calendarId).then(
		 function(insertado){
		 	insertado = agendaHelperService.procesarDato(insertado);
		 	listadoGoogleCalendar.push(insertado);
		 	$('#calendar').fullCalendar('renderEvent', insertado, true );
		 });
	}

	$scope.modificado = function(item, eventoOriginal){
		var index = _.findIndex(listadoGoogleCalendar, { 'id': item.id});
		var elementoActualizar = listadoGoogleCalendar[index];

		elementoActualizar = agendaHelperService.actualizar(elementoActualizar, item);		
		calendarGetData.update($scope.calendarId, elementoActualizar.id, elementoActualizar);
		
		
		eventoOriginal.start = item.start;
		eventoOriginal.end = item.end;
		$('#calendar').fullCalendar('updateEvent', eventoOriginal);
	}

	$scope.eliminado = function(item){
		var index = _.findIndex(listadoGoogleCalendar, { 'id': item.id});
		var elementoEliminar = listadoGoogleCalendar[index];
		calendarGetData.deleteEvent($scope.calendarId, elementoEliminar.id);
		$('#calendar').fullCalendar('removeEvents', elementoEliminar.id);
	}	

	function inicializar(){
		calendarGetData.loadEventApi().then(eventApiCargada);
		
		/*Listado de prestadores*/
		prestadorService.list().then(function(result){
		    
		    $scope.prestadores = [];
		    for (var i = 0; i < result.length; i++) {
		        $scope.prestadores.push(result[i].toJSON());
		    }
		    
		})
	}

	function eventApiCargada(){
	    hefesoft.util.loadingBar.start();
		calendarGetData.getCalendar($scope.calendarId).then(eventosCargados);		
		calendarGetData.listCalendars().then(listCalendarsSuccess);
		
		//Hace el calendario publico
		calendarGetData.updateAcl($scope.calendarId, "freeBusyReader");
	}

	function eventosCargados(data){
		$scope.mostrarBotonAutorizar = false;
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
		
		hefesoft.util.loadingBar.complete();
	}
	
	
	$scope.$on('nuevoEvento', function(event, args) {
        $scope.adicionado(args.evento);
    });
    
    $scope.$on('editarEvento', function(event, args){
        $scope.modificado(args.evento, args.eventoOriginal);
    })
    
    $scope.$on('eliminarEvento', function(event, args){
        $scope.eliminado(args.evento);
    })
    
    
	inicializar();

}])

    //=================================================
    // CALENDAR
    //=================================================

    .controller('calendarAgendaCtrl', function($modal){

        //Create and add Action button with dropdown in Calendar header.
        this.month = 'month';
       
        this.actionMenu = '<ul class="actions actions-alt" id="fc-actions">' +
                            '<li class="dropdown" dropdown>' +
                                '<a href="" dropdown-toggle><i class="zmdi zmdi-more-vert"></i></a>' +
                                '<ul class="dropdown-menu dropdown-menu-right">' +
                                    '<li>' +
                                        '<a data-calendar-view="month" href="">Vista mensual</a>' +
                                    '</li>' +
                                    '<li class="active">' +
                                        '<a data-calendar-view="basicWeek" href="">Vista semanal</a>' +
                                    '</li>' +
                                '</ul>' +
                            '</div>' +
                        '</li>';


        //Open new event modal on selecting a day
        this.onSelect = function(argStart, argEnd) {
            var modalInstance  = $modal.open({
                templateUrl: 'js/hefesoft/Agenda/modal/add.html',
                controller: 'addeventAgendaCtrl',
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    calendarData: function() {
                        var x = [{modo: "insertar"}, argStart, argEnd];
                        return x;
                    }
                }
            });
        }
        
        this.onEventSelected = function(calEvent, jsEvent, view){
            var modalInstance  = $modal.open({
                templateUrl: 'js/hefesoft/Agenda/modal/add.html',
                controller: 'addeventAgendaCtrl',
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    calendarData: function() {
                        var x = [{modo: "editar"}, calEvent];
                        return x;
                    }
                }
            });
        }
    })

    //Add event Controller (Modal Instance)
    .controller('addeventAgendaCtrl', function($scope, $modalInstance, calendarData, $rootScope){

        var tipo =calendarData[0];

        //Calendar Event Data
        $scope.calendarData = {
            eventStartDate: calendarData[1],
            eventEndDate:  calendarData[2]
        };
        
        if(tipo.modo === "editar"){
            var event = calendarData[1];
            $scope.calendarData.eventName = event.title;
            $scope.getStart = new moment(event.start).format("HH:mm");
            $scope.getEnd = new moment(event.end).format("HH:mm");;
            $scope.link = event.htmlLink;
            $scope.mostrarEliminar = true;
            $scope.action = "Editar";
        }
        else{
            $scope.action = "Adicionar";
        }

        //Tags
        $scope.tags = [
            'bgm-teal',
            'bgm-red',
            'bgm-pink',
            'bgm-blue',
            'bgm-lime',
            'bgm-green',
            'bgm-cyan',
            'bgm-orange',
            'bgm-purple',
            'bgm-gray',
            'bgm-black',
        ]

        //Select Tag
        $scope.currentTag = '';

        $scope.onTagClick = function(tag, $index) {
            $scope.activeState = $index;
            $scope.activeTagColor = tag;
        }

        //Add new event
        $scope.addEvent = function() {
            if ($scope.calendarData.eventName) {

				var fecha = moment(calendarData[1]);
				var y = moment(fecha).get('year');
				var m = moment(fecha).get('month');
				var d = moment(fecha).get('date');
				
				
				var start = new moment($scope.getStart, 'HH:mm');
				var end = new moment($scope.getEnd, 'HH:mm');
				
				start.set({'year': y, 'month': m, 'date' : d});
				end.set({'year': y, 'month': m, 'date' : d});
				
				var evento ={
                    title: $scope.calendarData.eventName,
                    start: $.fullCalendar.moment(start),
                    end:  $.fullCalendar.moment(end),
                    allDay: false,
                    editable: true,
                    className: $scope.activeTagColor
                }

                

                 if(tipo.modo === "insertar"){
                    $rootScope.$broadcast('nuevoEvento', {evento: evento});
                 }
                 else{
                     evento['id'] = calendarData[1].id;
                     $rootScope.$broadcast('editarEvento', {evento: evento, eventoOriginal : calendarData[1]});
                 }


				/* validar para el drag an drop
                //Render Event
                $('#calendar').fullCalendar('renderEvent',{
                    title: $scope.calendarData.eventName,
                    start: $scope.calendarData.eventStartDate,
                    end:  $scope.calendarData.eventEndDate,
                    allDay: true,
                    className: $scope.activeTagColor

                },true ); //Stick the event
                */

                $scope.activeState = -1;
                $scope.calendarData.eventName = '';
                $modalInstance.close();
            }
        }
        
        //Delete event
        $scope.eliminar = function(){
            $rootScope.$broadcast('eliminarEvento', {evento: calendarData[1]});
            $scope.activeState = -1;
            $scope.calendarData.eventName = '';
            $modalInstance.close();
        }

        //Dismiss
        $scope.eventDismiss = function() {
            $modalInstance.dismiss();
        }
    })