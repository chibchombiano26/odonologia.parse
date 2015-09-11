angular.module('directivas').
directive('fullCalendar', 
    ['$parse', function ($parse) {

	var directiva = {};
    var $scope;

	directiva.require  = ['ngModel'];
	directiva.restrict = "E";
	directiva.link = function(scope, element, attrs, ngModelCtrl){        

		var events = element[0];
        scope.element = events;

		inicializarControl(events);

        var existClick = attrs['eventoAdicionado'];
        if(angular.isDefined(existClick)){
          scope.fnEventoAdicionado = $parse(attrs['eventoAdicionado']);
        }

        existClick = attrs['eventoModificado'];
        if(angular.isDefined(existClick)){
          scope.fnEventoModificado = $parse(attrs['eventoModificado']);
        }

        existClick = attrs['eventoEliminado'];
        if(angular.isDefined(existClick)){
          scope.fnEventoEliminado = $parse(attrs['eventoEliminado']);
        }

        if(scope.contexto){
        scope.contexto = function(){
          return scope;
        }
      }

		ngModelCtrl[0].$render = function(){
		  	if (!ngModelCtrl[0].$isEmpty(ngModelCtrl[0].$viewValue)) {
		  		var valor = ngModelCtrl[0].$viewValue;

		  		$(events).find('.hefesoft-full-calendar').fullCalendar( 'removeEventSource', []);
		  		$(events).find('.hefesoft-full-calendar').fullCalendar( 'addEventSource', valor );
            }
		}

        $scope = scope;
	}

    directiva.scope ={
        contexto : "="
    };

	directiva.templateUrl = "app/lib/hefesoft.standard/Directivas/fullCalendar/template/calendar.html";

	function inicializarControl(element){

		
        var cId = $(element).find('.hefesoft-full-calendar'); //Change the name if you want. I'm also using thsi add button for more actions
        var SelectedEvent;

        //Generate the Calendar
        cId.fullCalendar({
            header: {
                right: '',
                center: 'prev, title, next',
                left: ''
            },

            theme: true, //Do not remove this as it ruin the design
            selectable: true,
            selectHelper: true,
            editable: true,            
            defaultView: 'agendaDay',
            lang: 'es',

            //On Day Select
            select: function(start, end, allDay) {
                $scope.inicio = start;
                $('#addNew-event').modal('show');                
                $('#deleteEvent').hide();
                $('#addEvent').text("Adicionar");

                $scope.titulo = "";                
                $('#addNew-event #eventName').val('');

                $scope.inicio = start;
                $scope.fin = end;
                $('#addNew-event #horaInicial input:text').val(start.format('HH:mm'));
                $('#addNew-event #horaFinal input:text').val(end.format('HH:mm'));
            },

            eventClick: function(calEvent, jsEvent, view) {
                SelectedEvent = calEvent;
                $('#addNew-event').modal('show');
                $('#deleteEvent').show();
                $('#addEvent').text("Modificar");

                $scope.inicio = calEvent.start;
                $scope.fin = calEvent.end;
                $scope.titulo = calEvent.title;

                $('#addNew-event #eventName').val(calEvent.title);
                $('#addNew-event #horaInicial input:text').val(calEvent.start.format('HH:mm'));
                $('#addNew-event #horaFinal input:text').val(calEvent.end.format('HH:mm'));
            },
            eventResize: function(event, delta, revertFunc) {

                if(angular.isDefined($scope.fnEventoModificado) && angular.isFunction($scope.fnEventoModificado)){
                    $scope.fnEventoModificado($scope.$parent, { 'item' : event });
                }
            },
            eventDragStop: function(event, jsEvent, ui, view) {
                
                if(angular.isDefined($scope.fnEventoModificado) && angular.isFunction($scope.fnEventoModificado)){
                    $scope.fnEventoModificado($scope.$parent, { 'item' : event });
                }
            }
        });

        //Create and ddd Action button with dropdown in Calendar header. 
        var actionMenu = '<ul class="actions actions-alt" id="fc-actions">' +
                            '<li class="dropdown">' +
                                '<a href="" data-toggle="dropdown"><i class="md md-more-vert"></i></a>' +
                                '<ul class="dropdown-menu dropdown-menu-right">' +
                                    '<li class="active">' +
                                        '<a data-view="month" href="">Mensual</a>' +
                                    '</li>' +
                                    '<li>' +
                                        '<a data-view="basicWeek" href="">Semanal</a>' +
                                    '</li>' +
                                    '<li>' +
                                        '<a data-view="agendaWeek" href="">Agenda semanal</a>' +
                                    '</li>' +
                                    '<li>' +
                                        '<a data-view="basicDay" href="">Dia</a>' +
                                    '</li>' +
                                    '<li>' +
                                        '<a data-view="agendaDay" href="">Agenda Dia</a>' +
                                    '</li>' +
                                '</ul>' +
                            '</div>' +
                        '</li>';


        cId.find('.fc-toolbar').append(actionMenu);
        
        //Event Tag Selector
        (function(){
            $(element).on('click', '.event-tag > span', function(){
                $('.event-tag > span').removeClass('selected');
                $(this).addClass('selected');
            });
        })();
        
        //Add new Event
        $(element).on('click', '#addEvent', function(){
            var tagColor = $('.event-tag > span.selected').attr('data-tag');
            var modo = $('#addEvent').text();
                
            if ($scope.titulo != '' && modo == "Adicionar") {

                if(angular.isDefined($scope.fnEventoAdicionado) && angular.isFunction($scope.fnEventoAdicionado)){
                    $scope.fnEventoAdicionado($scope.$parent, { 'item' : { title: $scope.titulo, inicio: $scope.inicio, fin: $scope.fin } });
                }
            }
            else if($scope.titulo != '' && modo == "Modificar"){

                SelectedEvent.title = $scope.titulo;
                SelectedEvent.start = $scope.inicio;
                SelectedEvent.end = $scope.fin;
                SelectedEvent.allDay = $scope.todoElDia;
                SelectedEvent.className = $scope.tagColor;

                $(element).find('.hefesoft-full-calendar').fullCalendar('updateEvent', SelectedEvent);
                
                if(angular.isDefined($scope.fnEventoModificado) && angular.isFunction($scope.fnEventoModificado)){
                    $scope.fnEventoModificado($scope.$parent, { 'item' : SelectedEvent });
                }
                             
                cerrarModal();                
            }
            
            else {
                $('#eventName').closest('.form-group').addClass('has-error');
            }
        });

        $(element).on('click', '#deleteEvent', function(){
            $(element).find('.hefesoft-full-calendar').fullCalendar( 'removeEvents', SelectedEvent._id);

            if(angular.isDefined($scope.fnEventoEliminado) && angular.isFunction($scope.fnEventoEliminado)){
                $scope.fnEventoEliminado($scope.$parent, { 'item' : SelectedEvent });
            }

            cerrarModal();
        });

        //Calendar views
        $(element).on('click', '#fc-actions [data-view]', function(e){
            e.preventDefault();
            var dataView = $(this).attr('data-view');
            
            $('#fc-actions li').removeClass('active');
            $(this).parent().addClass('active');
            cId.fullCalendar('changeView', dataView);  
        });

        function cerrarModal(){
            $('#addNew-event form')[0].reset();
            $('#addNew-event').modal('hide');
        }
	}

    directiva.controller = "fullCalendarCtrl";

	return directiva;
}])

.controller('fullCalendarCtrl', ['$scope', function ($scope) {
    
    $scope.adicionarEvento = function(item){
        //Render Event
        $($scope.element).find('.hefesoft-full-calendar').fullCalendar('renderEvent',
        {
           title: item.summary,
           start: item.start,
           end:  item.end,
           id: item.id
        },true ); 

        cerrarModal();
    }

    function cerrarModal(){
        $('#addNew-event form')[0].reset();
        $('#addNew-event').modal('hide');
    }

}])