/* global angular, Parse*/

angular.module('odontologiaApp')
.service('odontogramService', function($q){

   var dataFactory = {};
    
    dataFactory.cargarOdontograma = function (id){
		var deferred = $q.defer();
		var Odontograma = Parse.Object.extend("Odontograma");
		var query = new Parse.Query(Odontograma);
		query.equalTo('idOdontograma', id);
		query.first()
		.then(function(result){
			deferred.resolve(result);
		},
		function(entidad, error){
			//Cuando no se encuentra el registro
 			if(entidad.code === 101){
 				deferred.resolve({});
 			}
 			else{
 			 deferred.reject(error);
 			}
 		 	console.log(error);	
		}
	  )
		
		return deferred.promise;
	}
	
	dataFactory.saveOdontograma = function(listadoGuardar, id, odontogramaId){
 		var deferred = $q.defer();
 		
 		var Odontograma = Parse.Object.extend("Odontograma");
 		var odontograma = new Odontograma();
 		
 		//Se le quitan primero los caracteres especialesw como $ y puntos
 		//Y luevo se vuelve a convertir a json
 		listadoGuardar = angular.toJson(listadoGuardar, true);
 		listadoGuardar = JSON.parse(listadoGuardar);
 		
 		odontograma.set("idOdontograma", id);
 		odontograma.set("listado", listadoGuardar);
 		
 		if(odontogramaId){
 			odontograma.set("id", odontogramaId);
 		}
 		
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