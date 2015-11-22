/*global angular, FB*/
angular.module("odontologiaApp")
.service("fbHefesoftService", function($q){
    
    var dataFactory = {};
    
    dataFactory.getImageById = function(id, token){
    	var deferred = $q.defer();
    	var idImage = "/"+ id; 
    	FB.api(idImage,
    		"GET",
		    {
		        "access_token": token,
		        "fields":"name,link,images"
		    },
		    function (response) {
		      if (response && !response.error) {
		        deferred.resolve(response);
		      }
		    }
		);
		return deferred.promise;
    }
    
    dataFactory.postImage = function(url, token){
    	var deferred = $q.defer();
    	FB.api("/1491345774500031/photos",
		    "POST",
		    {
		        "url": url,
		        "access_token": token
		    },
		    function (response) {
		      if (response && !response.error) {
		        dataFactory.getImageById(response.id, token).then(function(result){
		        	deferred.resolve(result);
		        })
		      }
		    }
		);
		return deferred.promise;
    }
    
    dataFactory.getImages = function(){
  	var deferred = $q.defer();
  	    FB.api('/1491345774500031/photos',
        'GET',
	    {
	        "fields": "images,comments{message}",
	        "access_token": "1665259377039481|sFBCPhvzZ0hYVZHJYZblYBV_yi8"
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
    
})