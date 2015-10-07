angular.module('odontologiaApp')
.controller('citasCtrl', function($scope, $q, calendarGetData, agendaHelperService, $state, citasService, $rootScope, PubNub){
    
    $scope.data = [];
    $scope.calendarId = 'primary';
    var channelName = Parse.User.current().get("username");
    
    $rootScope.$on(PubNub.ngMsgEv(channelName), function(event, payload) {
        inicializar();
    })
    
    
	function noAutorizado(data){
		
	}
	
	function autorizado(data){		
		calendarGetData.loadEventApi().then(eventApiCargada);
	}

	function eventApiCargada(){		
		
	}
    
    function inicializar(){
        $scope.data = [];
        
        //Acceso al calendario de google
        calendarGetData.auth().then(autorizado, noAutorizado);
        
        citasService.obtenerCitas().then(function(result){
            for (var i = 0; i < result.length; i++) {
                $scope.data.push(result[i].toJSON());
            }
        })
    }
    
    $scope.agenda = function(){
        $state.go("pages.agenda");
    }
    
    $scope.aprobacion = function(item, aprobado){
        item.estado = aprobado;
        item['title'] = "Nueva cita medica con : " + item.name;
        
        citasService.actualizarCita(item.objectId, aprobado);
        
        if(aprobado === "aprobado"){
            item.start = moment(item.start);
            item.end = moment(item.end);
            adicionarGoogleCalendar(item);
        }
    }
   
    
    function adicionarGoogleCalendar(item){
        var elementoProcesado = agendaHelperService.procesarAdicionado(item);
		calendarGetData.insert(elementoProcesado, $scope.calendarId).then(
		 function(insertado){
		 	console.log(insertado);
		 });
    }
    
    inicializar();
    
})