angular.module('hefesoft.google')
.service('googlePickerService', 
	['$q', function ($q) {
	
	var CLIENT_ID = '505952414500-c04fnrdu3njem1cl2ug9h5gbd6rs025k.apps.googleusercontent.com';
  var SCOPES = [
  'https://www.googleapis.com/auth/photos', 
  'https://www.googleapis.com/auth/drive',
  "https://www.googleapis.com/auth/photos.upload"
  ];
	var dataFactory = {};

  dataFactory.load = function(onPickerApiLoad){
     gapi.load('picker', {'callback': onPickerApiLoad});
  }

	dataFactory.getAuth = function(){
		var deferred = $q.defer();
		gapi.auth.authorize(
        {
            'client_id': CLIENT_ID,
            'scope': SCOPES,
            'immediate': true
        }, function(result){
        	if (result && !result.error) {
        		deferred.resolve(result);
        	}
        	else{
        		deferred.reject(result);
        	}
        });

        return deferred.promise;
	}

  dataFactory.auth = function(){
    var deferred = $q.defer();
     gapi.auth.authorize(
      {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
      function(result){
        if (result && !result.error) {
            deferred.resolve(result);
          }
          else{
            deferred.reject(result);
          }
      });
     return deferred.promise;
  }

	return dataFactory;

}])