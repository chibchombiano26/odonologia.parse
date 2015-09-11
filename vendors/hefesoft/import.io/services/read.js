angular.module('importIo')
.service('readIoService', ['$http', '$q', 
	function ($http, $q) {

	var dataFactory = {};
	var key = "5d6ea678-a4c1-4f98-86e4-8fd0526afca7:Pj4UFx5TJNCmbqvR2Vcn5e7cc/ZdRxTX/uBVV7N937go/1HeKmfD/nnKdjIVfOtkz/taaoePgxW8zOp68vMsXg==";

	dataFactory.readUrl = function(url){
		var pathUrl = url + key;
		var deferred = $q.defer();

		$.ajax({
		  dataType: "json",
		  url: pathUrl,		  
		  success: function(e){
		  	deferred.resolve(e.results);
		  }
		});	

        return deferred.promise;
	}

	return dataFactory;
	
}])