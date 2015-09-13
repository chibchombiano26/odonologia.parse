angular.module('hefesoft.google')
.service('pushGcmService',
	['$http', function ($http) {

var baseUrl = "https://gcm-hefesoft.azurewebsites.net/";
	var dataFactory = {};
	
	dataFactory.push = function(data){
	    $.ajax({
          type: "POST",
          url: baseUrl + 'push',
          data: data,
          success: function(e){
              console.log(e);
          },
        });
	}
	
	return dataFactory;

}])