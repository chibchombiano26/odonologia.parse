/*global gapi, angular, moment, jstz, hefesoft*/
angular.module('hefesoft.google')
.service('calendarGetData', 
	['$q', function ($q) {
	
	  
	var dataFactory = {};

	dataFactory.getCalendar = function(calendarId){
        
    var deferred = $q.defer();
    
    var apiCargada = !hefesoft.isEmpty(gapi.client.calendar);
    
    if(apiCargada){
      getCalendar(calendarId).then(function(result){
        deferred.resolve(result);
      })
    }
    else{
      dataFactory.loadEventApi().then(function(){
        getCalendar(calendarId).then(function(result){
          deferred.resolve(result);
        })
      })
    }
    
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
  dataFactory.updateAcl = function(calendarID, role) {
  
    var deferred = $q.defer();
  
    var apiCargada = !hefesoft.isEmpty(gapi.client.calendar);
  
    if (apiCargada) {
      updateCalendar(calendarID, role, deferred)
    }
    else{
      dataFactory.loadEventApi().then(function(){
        updateCalendar(calendarID, role, deferred);
      })
    }
  
    return deferred.promise;
  }
  
  function updateCalendar(calendarID, role, deferred){
    var setRequest = gapi.client.calendar.acl.insert({
        calendarId: calendarID,
        role: role,
        scope: {
          type: "default"
        }
      });
      setRequest.execute(function(respt) {
        deferred.resolve(respt);
      });
  }
  
  dataFactory.createCalendar = function(name, description){
    var deferred = $q.defer();
    
    var apiCargada = !hefesoft.isEmpty(gapi.client.calendar);
    
    if(apiCargada){
      createCalendar(name, description).then(function(result){
        deferred.resolve(result);
      })
    }
    else{
      dataFactory.loadEventApi().then(function(){
        createCalendar(name, description).then(function(result){
          deferred.resolve(result);
        })
      })
    }
    
    return deferred.promise;
  }
  
  dataFactory.deleteCalendar = function(id){
    
    var deferred = $q.defer();
    
    var apiCargada = !hefesoft.isEmpty(gapi.client.calendar);
    
    if(apiCargada){
      deleteCalendar(id).then(function(result){
        deferred.resolve(result);
      })
    }
    else{
      dataFactory.loadEventApi().then(function(){
        deleteCalendar(id).then(function(result){
          deferred.resolve(result);
        })
      })
    }
    
    return deferred.promise;
   
  }
  
  function getCalendar(calendarId){
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
  
  function createCalendar(name, description){
    var deferred = $q.defer();
    var tz = jstz.determine().name();
    var request = gapi.client.calendar.calendars.insert({
        
        "summary": name,
        "description": description,
        "timeZone": tz
        
      });
      request.execute(function(result){
        deferred.resolve(result);
        dataFactory.updateAcl(result.id, "freeBusyReader");
      })
      
      return deferred.promise;
  }
  
  function deleteCalendar(id){
    var deferred = $q.defer();
    var request = gapi.client.calendar.calendars.delete({
      "calendarId": id
    })
    
    request.execute(function(result){
      deferred.resolve(result);
    })
    
    return deferred.promise;
  }
  
  function createCalendarRest(name, description){
    var tz = jstz.determine().name();
    var deferred = $q.defer();
    
    var restRequest = gapi.client.request({
        'path': '/calendar/v3/calendars',
        'method': 'POST',
        'body': {'summary': name, 'description': description, "timeZone": tz}
      });
      restRequest.then(function(resp) {
        deferred.resolve(resp.result);
      }, function(reason) {
        deferred.reject(reason.result.error.message);
        console.log('Error: ' + reason.result.error.message);
      });
      
      return deferred.promise;
  }

	return dataFactory;

}])