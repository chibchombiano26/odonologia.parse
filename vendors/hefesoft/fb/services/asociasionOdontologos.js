angular.module('odontologiaApp').
service('fbGroupsService', ['$q', function ($q) {
	
  var url = "https://graph.facebook.com/351781574835113/feed?access_token=426977727468725|02f6z047IaTUyc8tLE4mkfVP61E";

  var dataFactory = {};

  dataFactory.getWall = function(){
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

  return dataFactory;

}])