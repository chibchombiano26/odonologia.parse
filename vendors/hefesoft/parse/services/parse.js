angular.module('hefesoft.parse')
.service('parseService', 
	['$q', '$timeout', function ($q, $timeout) {
	
	
	var dataFactory = {};
	
	dataFactory.error = function(er, promise) {
       
       if(hefesoftLogActivated){
       	alert("Error: " + er.code + " " + er.message);
       	console.log("Error: " + er.code + " " + er.message);
       }
       
       promise.reject(er);
    }
	
	 
	return dataFactory;

}])