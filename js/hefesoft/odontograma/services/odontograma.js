angular.module('odontologiaApp')
.service('odontogramService', function($q){

   var dataFactory = {};
    
    dataFactory.cargarOdontograma = function (id){
		var deferred = $q.defer();
		var Odontograma = Parse.Object.extend("Odontograma");
		var query = new Parse.Query(Odontograma);
		query.get(id)
		.then(function(result){
			deferred.resolve(result);
		},
		function(entidad, error){
			deferred.reject(error);
			console.log(error);
		}
	  )
		
		return deferred.promise;
	}
	
	dataFactory.saveOdontograma = function(listadoGuardar, id){
 		var deferred = $q.defer();
 		
 		var Odontograma = Parse.Object.extend("Odontograma");
 		var odontograma = new Odontograma();
 		
 		//Se le quitan primero los caracteres especialesw como $ y puntos
 		//Y luevo se vuelve a convertir a json
 		listadoGuardar = angular.toJson(listadoGuardar, true);
 		listadoGuardar = JSON.parse(listadoGuardar);
 		
 		odontograma.id = "Kb1CqPZmlr";
 		odontograma.set("idOdontograma", id);
 		odontograma.set("listado", listadoGuardar);
 		odontograma.save()
 		.then(function(entidad){
 			deferred.resolve(entidad);
 		},
 		function(entidad, error){
 			deferred.reject(error);
 		 	console.log(error);	
 		}
 		)
 		
 		return deferred.promise;
 	}
    
    
    return dataFactory;
    
})