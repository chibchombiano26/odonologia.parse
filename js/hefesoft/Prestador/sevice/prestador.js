/*global angular, messageService, Parse, parseService, hefesoft*/
angular.module('odontologiaApp')
.service('prestadorService', function($q, parseService, calendarGetData){

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
		    crearPrestadoDefecto(deferred);
		  }
		},
		function(data, error){
		 deferred.reject(error);	
		});
        
        return deferred.promise;
    }
    
    function crearPrestadoDefecto(deferred){
        var prestador = Parse.User.current().toJSON();
        dataFactory.save({email: prestador.email, nombre: prestador.email, especialidad : '', telefono : '', idCalendar : prestador.email, pictureUrl : prestador.pictureUrl })
        .then(function(result){
            var data = [];
            data.push(result);
            deferred.resolve(data);
            calendarGetData.updateAcl(prestador.email, "freeBusyReader");
        })
    }
    
    dataFactory.save= function(item){
        var deferred = $q.defer();
        var Prestador = Parse.Object.extend("Prestador");
        var prestador = new Prestador;
        
        if(item.objectId){
            prestador.set("id", item.objectId);
        }
        
        var buscador = "";
        
        if(item.nombre){
            buscador += item.nombre.toLowerCase() + " ";
            prestador.set("nombre", item.nombre);
        }
        
        if(item.especialidad){
            buscador += item.especialidad.toLowerCase() + " ";
            prestador.set("especialidad", item.especialidad);
        }
        
        if(item.cedula){
            buscador += item.cedula.toLowerCase() + " ";
            prestador.set("cedula", item.cedula);
        }
        
        if(item.email){
            buscador += item.email.toLowerCase() + " ";
            prestador.set("email", item.email);
        }
                
        
        prestador.set("telefono", item.telefono);
        prestador.set("idCalendar", item.idCalendar);
        prestador.set("username", Parse.User.current().get("email"));
        
        
        if(hefesoft.isEmpty(item.pictureUrl)){
			prestador.set("pictureUrl", hefesoft.generoPic(item, "genero"));
		}
		else{
		    prestador.set("pictureUrl", item.pictureUrl);
		}
		
		prestador.set("buscar", buscador);
        
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
    
    dataFactory.buscarPrestador = function(texto) {
         var deferred = $q.defer();
         var Prestador = Parse.Object.extend("Prestador");

         var query = new Parse.Query(Prestador);
         query.equalTo("username", Parse.User.current().get("email"));
         query.contains("buscar", texto);
         query.limit(20);
          
         query.find().then(function(data) {
                 var result = [];

                 for (var i = 0; i < data.length; i++) {
                     result.push((data[i]).toJSON());
                 }

                 deferred.resolve(result);

             },
             function(data, error) {
                 deferred.reject(error);
             }
         )

         return deferred.promise;

     }

    return dataFactory;
});