/*global angular, messageService, Parse, parseService, hefesoft*/
angular.module('odontologiaApp')
.service('prestadorService', function($q, parseService){

    var dataFactory = {};
    
    dataFactory.list = function(){
        var deferred = $q.defer();
        var Pacientes = Parse.Object.extend("Prestador");
		var pacientes = new Parse.Query(Pacientes);
		
		pacientes.equalTo("username", Parse.User.current().get("email"));
		pacientes.find()
		.then(function(data){
		  if(!hefesoft.isEmpty(data))
		  {
		    deferred.resolve(data);	
		  }
		  else{
		    var prestador = Parse.User.current().toJSON();
	        dataFactory.save({email: prestador.email, nombre: prestador.email, especialidad : '', telefono : '', idCalendar : prestador.email, pictureUrl : prestador.pictureUrl })
	        .then(function(result){
	            var data = [];
	            data.push(result);
	            deferred.resolve(data);
	        })
		  }
		},
		function(data, error){
		 deferred.reject(error);	
		});
        
        return deferred.promise;
    }
    
    dataFactory.save= function(item){
        var deferred = $q.defer();
        var Prestador = Parse.Object.extend("Prestador");
        var prestador = new Prestador;
        
        if(item.objectId){
            prestador.set("id", item.objectId);
        }
        
        prestador.set("nombre", item.nombre);
        prestador.set("especialidad", item.especialidad);
        prestador.set("cedula", item.cedula);
        prestador.set("email", item.email);
        prestador.set("telefono", item.telefono);
        prestador.set("idCalendar", item.idCalendar);
        prestador.set("username", Parse.User.current().get("email"));
        
        
        if(hefesoft.isEmpty(item.pictureUrl)){
			prestador.set("pictureUrl", hefesoft.generoPic(item, "genero"));
		}
		else{
		    prestador.set("pictureUrl", item.pictureUrl);
		}
        
        prestador.save().then(function(entidad){
            deferred.resolve(entidad);
        },
        function(error){
            deferred.reject(error);
        })
        
        return deferred.promise;
    }
    
    dataFactory.destroy = function(id){
        var Prestador = Parse.Object.extend("Prestador");
        var prestador = new Prestador;
        prestador.set("id", id);
        prestador.destroy();
    }

    return dataFactory;
});