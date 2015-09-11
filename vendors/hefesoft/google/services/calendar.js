angular.module('hefesoft.google')
.service('calendarGetData', 
	['$q', function ($q) {
	
	var CLIENT_ID = '505952414500-c04fnrdu3njem1cl2ug9h5gbd6rs025k.apps.googleusercontent.com';
    var SCOPES = ["https://www.googleapis.com/auth/calendar"];
	var dataFactory = {};

	dataFactory.getCalendar = function(calendarId){
        var deferred = $q.defer();
        var request = gapi.client.calendar.events.list({
          'calendarId': calendarId,
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        });

        request.execute(function(resp) {
          var events = resp.items;
          deferred.resolve(events);
        });

        return deferred.promise;
	}

  dataFactory.loadEventApi = function(){
      var deferred = $q.defer();
      gapi.client.load('calendar', 'v3').
        then(function(){ 
            console.log('loaded.');
            deferred.resolve(); 
      });

      return deferred.promise;
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

  dataFactory.insert = function(event, calendarId){
    var deferred = $q.defer();
    var request = gapi.client.calendar.events.insert({
      'calendarId': calendarId,
      'resource': event
    });

    request.execute(function(event) {      
      deferred.resolve(event);
      console.log(event.htmlLink);      
    });
    return deferred.promise;
  }

  dataFactory.update = function(calendarId, eventId, event){
    var deferred = $q.defer();
    var request = gapi.client.calendar.events.update({
      'calendarId': calendarId,
      'eventId': eventId,
      'resource': event
    });

    request.execute(function(event) {      
      deferred.resolve(event);
      console.log(event.htmlLink);      
    });
    return deferred.promise;
  }

  dataFactory.deleteEvent = function(calendarId, eventId){
    var deferred = $q.defer();
    var request = gapi.client.calendar.events.delete({
      'calendarId': calendarId,
      'eventId': eventId
    });

    request.execute(function(event) {      
      deferred.resolve(event);            
    });

    return deferred.promise;
  }

  dataFactory.listCalendars = function(){
    var deferred = $q.defer();
     gapi.client.calendar.calendarList.list({}).execute(
      function(resp) { 
          deferred.resolve(resp);
      })

     return deferred.promise;
  }

	return dataFactory;

}])