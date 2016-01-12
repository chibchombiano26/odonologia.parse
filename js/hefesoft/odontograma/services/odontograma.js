/* global angular, Parse, hefesoft*/

angular.module('odontologiaApp')
.service('odontogramService', function($q){

   var dataFactory = {};
   
    
    dataFactory.cargarOdontograma = function (id){
		var deferred = $q.defer();
		var Odontograma = Parse.Object.extend("Odontograma");
		var query = new Parse.Query(Odontograma);
		query.equalTo('pacienteId', id);
		query.descending("createdAt");
		query.limit(1);
		
		query.find()
		.then(function(result){
			
			if(hefesoft.isEmpty(result)){
				deferred.resolve([]);	
			}
			else{
				deferred.resolve(result[0]);	
			}
			
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
	
	dataFactory.saveOdontograma = function(listadoGuardar, id, odontogramaId, item, guardarHistorico){
 		
 		var deferred = $q.defer();
 		var Odontograma = Parse.Object.extend("Odontograma");
 		var odontograma = new Odontograma();
 		
 		//Se le quitan primero los caracteres especialesw como $ y puntos
 		//Y luevo se vuelve a convertir a json
 		listadoGuardar = angular.toJson(listadoGuardar, true);
 		listadoGuardar = JSON.parse(listadoGuardar);
 		
 		//odontograma.set("idOdontograma", id);
 		
 		odontograma.set("pacienteId", item.pacienteId);
 		
 		odontograma.set("listado", listadoGuardar);
 		
 		if(item && item.numeroPiezasDentales){
 			odontograma.set("numeroPiezasDentales", item.numeroPiezasDentales.toString());
 		}
 		
 		if(item && item.indiceCie){
 			odontograma.set("indiceCie", item.indiceCie.toString());
 		}
 		
 		if(item && item.indiceCup){
 			odontograma.set("indiceCup", item.indiceCup.toString());
 		}
 		
 		if(item && item.prestador){
 			odontograma.set("prestador", item.prestador);
 		}
 		else{
 			odontograma.set("prestador", {nombre: "No indicado"});
 		}
 		
 		if(item && item.tipo){
 			odontograma.set("tipo", item.tipo);
 		}
 		else{
 			odontograma.set("tipo", "No indicado");
 		}
 		
 		if(item && item.observaciones){
 			odontograma.set("observaciones", item.observaciones);
 		}
 		else{
 			odontograma.set("observaciones", "No indicado");
 		}
 		
 		if(item && item.snap){
 			odontograma.set("snap", item.snap);
 		}
 		
 		
 		if(item && item.ppr){
 			var ppr = JSON.parse(angular.toJson(item.ppr));
 			odontograma.set("ppr", ppr);
 		}
 		
 		
 		if(odontogramaId){
 			odontograma.set("id", odontogramaId);
 		}
 		
 		
 		odontograma.save()
 		.then(function(entidad){
 			if(guardarHistorico){
	 			var result = entidad.toJSON();
	 			dataFactory.savehistorico({odontogramaId: result.objectId, tipo: result.tipo, prestador : result.prestador.nombre, pacienteId : item.pacienteId, observaciones: result.observaciones});
 			}
 			deferred.resolve(entidad);
 		},
 		function(entidad, error){
 			deferred.reject(error);
 		 	console.log(error);	
 		}
 		)
 		
 		return deferred.promise;
 	}
 	
 	dataFactory.savehistorico = function(item){
 		var deferred = $q.defer();
 		var Historico = Parse.Object.extend("Historico_Odontograma");
 		var historico = new Historico();
 		
 		historico.set('odontogramaId', item.odontogramaId);
 		historico.set('tipo', item.tipo);
 		historico.set('prestador', item.prestador);
 		historico.set('pacienteId', item.pacienteId);
 		historico.set('observaciones', item.observaciones);
 		
 		historico.save().then(function(result){
 			deferred.resolve(result);
 		})
 		
 		return deferred.promise;
 	}
 	
 	dataFactory.getHistorico = function(pacienteId){
	   	var deferred = $q.defer();
	   	
	   	var Odontograma = Parse.Object.extend("Historico_Odontograma");
		var query = new Parse.Query(Odontograma);
		query.equalTo('pacienteId', pacienteId);
		query.descending("createdAt");
		query.find().then(function(result){
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
		})
		
		return deferred.promise;
 	}
	  
	dataFactory.getOdontogramaByid = function(idOdontograma){
	   	var deferred = $q.defer();
	   	
	   	var Odontograma = Parse.Object.extend("Odontograma");
		var query = new Parse.Query(Odontograma);
		query.get(idOdontograma)
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
    
    return dataFactory;
    
})