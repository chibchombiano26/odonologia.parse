materialAdmin 

    // =========================================================================
    // CALENDAR WIDGET
    // =========================================================================

    .directive('fullCalendar', function(){
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.fullCalendar({
                    contentHeight: 'auto',
                    theme: true,
                    header: {
                        right: '',
                        center: 'prev, title, next',
                        left: ''
                    },
                    defaultDate: new Date(),
                    editable: true
                });
            }
        }
    })
    

    // =========================================================================
    // MAIN CALENDAR
    // =========================================================================

    .directive('calendar', function($compile, $window){
        
        var elementGlobal;
        
        return {
            restrict: 'A',
            require : ['ngModel'],
            scope: {
                select: '&',
                actionLinks: '=',
                lang: '=',
                defaultView : '='
            },
            link: function(scope, element, attrs, ngModelCtrl) {
                
                var date = new Date();
                var d = date.getDate();
                var m = date.getMonth();
                var y = date.getFullYear();
                
                elementGlobal = element;
                
                ngModelCtrl[0].$render = function(){
                  if (!ngModelCtrl[0].$isEmpty(ngModelCtrl[0].$viewValue)) {
            		var source = ngModelCtrl[0].$viewValue;
            		element.fullCalendar( 'addEventSource', source);
                  }
                }

                //Generate the Calendar
                element.fullCalendar({
                    header: {
                        right: '',
                        center: 'prev, title, next',
                        left: ''
                    },
                    lang: scope.lang,
                    theme: true, //Do not remove this as it ruin the design
                    selectable: true,
                    selectHelper: true,
                    editable: true,
                    defaultView : scope.defaultView,
                    

                    //On Day Select
                    select: function(start, end, allDay) {
                        scope.select({
                            start: start, 
                            end: end
                        });
                    },
                    
                    //Event click
                    eventClick: function(calEvent, jsEvent, view) {
                       $window.open(calEvent.htmlLink, '_blank');
                    }
                });
                
                  
                //Add action links in calendar header
                element.find('.fc-toolbar').append($compile(scope.actionLinks)(scope));
            }
        }
    })
    

    //Change Calendar Views
    .directive('calendarView', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('click', function(){
                    $('#calendar').fullCalendar('changeView', attrs.calendarView);  
                })
            }
        }
    })

