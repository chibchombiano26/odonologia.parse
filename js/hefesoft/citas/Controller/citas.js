angular.module('odontologiaApp')
.controller('citasCtrl', function($scope, $q, calendarGetData, agendaHelperService, $state, citasService, $rootScope, PubNub, growlService){
    
    $scope.data = [];
    $scope.calendarId = 'primary';
    var channelName = Parse.User.current().get("username");
    
    $rootScope.$on(PubNub.ngMsgEv(channelName), function(event, payload) {
        inicializar();
    })
    
    

	function eventApiCargada(){		
		
	}
    
    function inicializar(){
        $scope.data = [];
        
        //Acceso al calendario de google
        calendarGetData.loadEventApi().then(eventApiCargada);
        
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
    
    $scope.eliminar = function(item, $index){
        $scope.data.splice($index, 1);
        
        var obj = new Parse.Object("Citas"); 
        obj.id = item.objectId;
        obj.destroy();
        
        growlService.growl('la cita ha sido eliminada si ha sido agendada tambien debe eliminarse de la agenda', 'inverse');
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