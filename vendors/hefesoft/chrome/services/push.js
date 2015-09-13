angular.module('hefesoft.google')
.service('pushGcmService',
	['$http', function ($http) {

var baseUrl = "https://gcm-node-chibchombiano26.c9.io/";
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