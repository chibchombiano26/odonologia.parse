/*global Parse, angular*/
angular.module('odontologiaApp')
.service('citasService', function($q){
    
    var datafactory = {};
    
    datafactory.obtenerCitas = function(){
        var deferred = $q.defer()
        var Citas = Parse.Object.extend('Citas');
        var query = new Parse.Query(Citas);
        query.equalTo("medico", Parse.User.current().get('email'));
        query.equalTo('estado', "solicitada");
        query.find().then(function(result){
            deferred.resolve(result);
        })
        return deferred.promise;
    }
    
    datafactory.actualizarCita = function (id ,aprobado){
        var Citas = Parse.Object.extend('Citas');
        var citas = new Citas;
        citas.set('id', id);
        citas.set('estado', aprobado);
        citas.save();
    }
    
    datafactory.saveCitasIntervalos = function(item){
        var deferred = $q.defer();
        var CitaIntervalos = new Parse.Object.extend("Citas_Intervalos");
        var citasIntervalos = new CitaIntervalos;
        
        citasIntervalos.set("prestador", Parse.User.current().get("email"));
        citasIntervalos.set("horaInicio", item.horaInicio);
        citasIntervalos.set("numeroHorasTrabajo", item.numeroHorasTrabajo);
        citasIntervalos.set("intervaloCitas", item.intervaloCitas);
        
        if(item.hasOwnProperty("objectId")){
            citasIntervalos.set("id", item.objectId);
        }
        
        citasIntervalos.save().then(function(entidad){
            deferred.resolve(entidad);
        })
        
        return deferred.promise;
    }
    
    datafactory.getCitasInvervalo = function(){
        var deferred = $q.defer()
        var Citas = Parse.Object.extend('Citas_Intervalos');
        var query = new Parse.Query(Citas);
        query.equalTo("prestador", Parse.User.current().get('email'));
        query.find().then(function(result){
            deferred.resolve(result);
        })
        return deferred.promise;
    }
    
    
    return datafactory;
    
})