/*global angular, Parse*/
angular.module("odontologiaApp")
.service("periodontogramaServiceParse", function($q){
    
    var dataFactory = {};
    
     dataFactory.cargarPeriodontograma = function (id){
		var deferred = $q.defer();
		var Periodontograma = Parse.Object.extend("Periodontograma");
		var query = new Parse.Query(Periodontograma);
		query.equalTo('idPeriodontograma', id);
		query.first()
		.then(function(result){
			deferred.resolve(result);
		},
		function(entidad, error){
		    //Objeto encontrado
		    if(entidad.code === 101){
		        deferred.resolve();
		    }
		    else{
			    deferred.reject(error);
		    }
			console.log(error);
		}
	  )
		
		return deferred.promise;
	}
	
	dataFactory.savePeriodontograma = function(listadoGuardar, id, periodontogramaId, prestador){
	    
 		var deferred = $q.defer();
 		
 		var Periodontograma = Parse.Object.extend("Periodontograma");
 		var periodontograma = new Periodontograma();
 		
 		//Se le quitan primero los caracteres especialesw como $ y puntos
 		//Y luevo se vuelve a convertir a json
 		listadoGuardar = angular.toJson(listadoGuardar, true);
 		listadoGuardar = JSON.parse(listadoGuardar);
 		
 		if(periodontogramaId){
 		    periodontograma.set("id", periodontogramaId);
 		}
 		
 		periodontograma.set("idPeriodontograma", id);
 		periodontograma.set("listado", listadoGuardar);
 		
 		if(prestador){
 			periodontograma.set("prestador", prestador);
 		}
 		
 		periodontograma.save()
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