/*global angular, annyang */

angular.module("odontologiaApp")
.service("speechService", function(){
    
    var dataFactory = {};
    
    dataFactory.inicializar = function(){
        annyang.setLanguage('es-CO');
        
        var commands = {
            'asistente *term': asistente
        };
        
        annyang.addCommands(commands);
    
        // Start listening. You can call this here, or attach this call to an event, button, etc.
        annyang.start();
    }
    
    function asistente(e){
        alert(e);
    }
    
    return dataFactory;
    
})