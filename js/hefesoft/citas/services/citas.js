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
    
    
    return datafactory;
    
})