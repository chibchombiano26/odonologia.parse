/*global angular, Parse*/

angular.module('hefesoft.parse')
.service('parseService', 
	['$q', '$timeout', function ($q, $timeout) {
	
	
	var dataFactory = {};
	
	dataFactory.error = function(er, promise) {
       alert("Error: " + er.code + " " + er.message);
       console.log("Error: " + er.code + " " + er.message);
       promise.reject(er);
    }
    
    
    dataFactory.errorHandler = function error(error){
        if (error.code === Parse.Error.OBJECT_NOT_FOUND) {
          alert("Uh oh, we couldn't find the object!");
        } else if (error.code === Parse.Error.CONNECTION_FAILED) {
          alert("Uh oh, we couldn't even connect to the Parse Cloud!");
        }
    }
    
    dataFactory.validateUndefined = function(item){
      if(item === undefined){
        return null;
      }
      else{
        return item;
      }
    }
	
	 
	return dataFactory;

}])