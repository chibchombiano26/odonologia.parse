/*global gapi, angular, moment, jstz, hefesoft*/
angular.module('hefesoft.google')
.service('youtube', 
	['$q', function ($q) {
	
	  
	var dataFactory = {};


    dataFactory.loadApi = function(){
      var deferred = $q.defer();
      gapi.client.load('youtube', 'v3').
        then(function(){ 
            deferred.resolve(); 
      });

      return deferred.promise;
    }
    
    dataFactory.search = function(query) {
        var deferred = $q.defer();
        var q = query;
        var request = gapi.client.youtube.search.list({
            q: q,
            part: 'snippet',
            //part: 'contentDetails'
        });
        
        request.execute(function(response) {
            deferred.resolve(response.result); 
        });
        
        return deferred.promise;
    }
    
    dataFactory.playList = function(id){
        var deferred = $q.defer();
        var requestOptions = {
            playlistId: id,
            part: 'snippet',
            maxResults: 50
          };
        
        var request = gapi.client.youtube.playlistItems.list(requestOptions);
        request.execute(function(response) {
           deferred.resolve(response.result); 
        });
        
        return deferred.promise;
        
    }

	
 
	return dataFactory;

}])