angular.module("odontologiaApp")
.service("periodontogramaServiceParse", function($q){
    
    var dataFactory = {};
    
     dataFactory.cargarPeriodontograma = function (id){
		var deferred = $q.defer();
		var Odontograma = Parse.Object.extend("Periodontograma");
		var query = new Parse.Query(Odontograma);
		query.get(id)
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
	
	dataFactory.savePeriodontograma = function(listadoGuardar, id){
	    
 		var deferred = $q.defer();
 		
 		var Odontograma = Parse.Object.extend("Periodontograma");
 		var odontograma = new Odontograma();
 		
 		//Se le quitan primero los caracteres especialesw como $ y puntos
 		//Y luevo se vuelve a convertir a json
 		listadoGuardar = angular.toJson(listadoGuardar, true);
 		listadoGuardar = JSON.parse(listadoGuardar);
 		
 		if(id){
 		    odontograma.id = id;
 		    odontograma.set("idPeriodontograma", id);
 		}
 		
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