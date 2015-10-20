  /*global angular, Parse, _*/  
  angular.module('odontologiaApp')
  .service('CieCupsServices', ['sharedSignatureHttpHelper', '$q', 
  	function (sharedSignatureHttpHelper, $q) {

  		var dataFactory = {};

  		dataFactory.listadoCie = function(){
  			var deferred = $q.defer();
  			$q.all([sharedSignatureHttpHelper.getAll("TRCIE", '?tn=TRCIE&sv=2014-02-14&si=Shared&sig=uHj3pBPqCIIVhYsNXaiSdValKIqu9Q0dydf9%2FPzePdk%3D')
		    	])
		    .then(function(data){            
		        var Cie = data[0].value;		        
				var listado = procesarCie(Cie);
				deferred.resolve(listado);
		    });

		    return deferred.promise;
  		}

  		dataFactory.listadoCup = function(){
  			var deferred = $q.defer();
  			$q.all([sharedSignatureHttpHelper.getAll("TRCUPS", '?tn=TRCUPS&sv=2014-02-14&si=Shared&sig=z45zzlAqNKC5wxghBsKDQFXPXrTwDrLBnh%2FApTKIwoU%3D')
		    	])
		    .then(function(data){            
		        var Cup = data[0].value;		        
				var listado = procesarCups(Cup);
				deferred.resolve(listado);
		    });

		    return deferred.promise;
  		}

  		function procesarCie(data){
  			var listado = [];
			for (var i = 0; i < data.length; i++) {
				var item = data[i];
				var busqueda = item.PartitionKey + " " + item.RowKey;

				listado.push({Codigo : item.PartitionKey, Descripcion: item.RowKey, Tipo : "Cie", Busqueda: busqueda});
			};

			return listado;
		}

		function procesarCups(data){
			var listado = [];
			for (var i = 0; i < data.length; i++) {
				var item = data[i];
				var busqueda = item.PartitionKey + " " + item.RowKey;

				listado.push({Codigo : item.PartitionKey, Descripcion: item.RowKey, Tipo : "Cup", Busqueda: busqueda});
			};

			return listado;
		}



  		return dataFactory;
  	
  }])