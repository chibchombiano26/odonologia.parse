angular.module('odontologiaApp').
service('fbGroupsService', ['$q', function ($q) {
	
  var dataFactory = {};

  dataFactory.getWall = function(ur){
  	var deferred = $q.defer();
  	$.ajax({
	  url: url,
	  type: 'GET',	  
	  success: function(data) {
	    deferred.resolve(data);
	  },
	  error: function(e) {
	    deferred.reject(e);
	  }
	});

		return deferred.promise; 
  }
  
  dataFactory.getWallFbApi = function(query){
  	var deferred = $q.defer();
  	FB.api(query,
	    {
	        "access_token": "426977727468725|02f6z047IaTUyc8tLE4mkfVP61E"
	    },
	    function (response) {
	    	
	      if (response && !response.error) {
	        deferred.resolve(response.data);
	      }
	    }
		);
		return deferred.promise;
  }

  return dataFactory;

}])