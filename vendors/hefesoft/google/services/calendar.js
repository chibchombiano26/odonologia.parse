angular.module('hefesoft.google')
.service('calendarGetData', 
	['$q', function ($q) {
	
	  
	var dataFactory = {};

	dataFactory.getCalendar = function(calendarId){
        var deferred = $q.defer();
        var request = gapi.client.calendar.events.list({
          'calendarId': calendarId,
          'timeMin': (moment().add(-10, 'days')).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 500,
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
  
  //Change de acl for the calendar to private to public
  dataFactory.updateAcl = function(calendarID, role){
    var deferred = $q.defer();
    var setRequest = gapi.client.calendar.acl.insert({ calendarId: calendarID, role: role, scope: { type: "default"} });
    setRequest.execute(function(respt) {
      deferred.resolve(respt);
    });

    return deferred;

  }

	return dataFactory;

}])