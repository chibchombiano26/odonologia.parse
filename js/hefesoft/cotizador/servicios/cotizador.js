/*global angular, Parse, moment, hefesoft*/
angular.module('odontologiaApp')
.service('cotizacionService', function($q){
    
    var dataFactory ={};
    
    
    dataFactory.saveCotizacion = function(item, listado){
        var deferred = $q.defer();
        var Cotizacion = Parse.Object.extend("Cotizacion");
        var cotizacion = new Cotizacion();
        
        
        if(item.objectId){
            cotizacion.set('id', item.objectId);
        }
        
        if(item.nombres){
            cotizacion.set('nombres', item.nombres);
        }
        
        
        if(item.documento){
            cotizacion.set('documento', item.documento);
        }
        
        if(item.email){
            cotizacion.set('email', item.email);
        }
        
        if(item.telefono){
            cotizacion.set('telefono', item.telefono);
        }
        
        if(listado){
            cotizacion.set('listado', listado);
        }
        
        cotizacion.set('pacienteId', hefesoft.util['pacienteSeleccionado'].objectId);
        
        
        cotizacion.set("fechaFormat", moment(new Date()).format("dddd, MMMM Do YYYY"));
        cotizacion.set("fecha", new Date());
        cotizacion.set("user", Parse.User.current().get("email"));
        cotizacion.set("buscar", terminosBusqueda(item));
        
        cotizacion.save().then(function(entidad){
            deferred.resolve(entidad);
        }, function(entidad, error){
            deferred.resolve(error);
        })
        
        
    	return deferred.promise;
    }
    
    dataFactory.buscarCotizacion = function(texto){
        var deferred = $q.defer();
        var Cotizacion = Parse.Object.extend("Cotizacion");
        
        var query = new Parse.Query(Cotizacion);
        query.contains("buscar", texto);
        query.find().then(function(data){
            var result = [];
            
            for (var i = 0; i < data.length; i++) {
                result.push((data[i]).toJSON());
            }
            
            deferred.resolve(result);
            
        },
        function(data, error){
            deferred.reject(error);
        }
        )
        
        return deferred.promise;
        
    }
    
    function terminosBusqueda(item){
        var result = " ";
        
        if(item.nombres){
            result += item.nombres + " ";
        }
        
        
        if(item.documento){
            result += item.documento + " ";
        }
        
        if(item.email){
            result += item.email + " ";
        }
        
        if(item.telefono){
            result += item.telefono + " ";
        }
        
        return result;
    }
    
    
    return dataFactory;
})