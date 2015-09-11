angular.module('esanum')
.service('esanumService', ['$http', 'md5', '$window', '$q', function ($http, md5, $window, $q) {
	
	var service = {};

    service.login = function(email, password) {
     var deferred = $q.defer();
     var url = "https://api.esanum.com.co/v1/account",
          params = {},
          config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              'Authorization': ""
            }
          };

      params.email = email;
      params.password = md5.createHash(password);
      params.action = 'login';

      $http.post(url, $.param(params), config)
        .success(function(data, status, headers, config) {
          $window.localStorage.setItem('api_token', data.token);
          $window.document.cookie = 'esanum=' + data.token;
          deferred.resolve(data);
        })
        .error(function(data, status, headers, config) {
          console.log(data);
          deferred.reject(data);
        });

        return deferred.promise;
    };

    service.news = function(){      
      var deferred = $q.defer();
      var token = $window.localStorage.getItem('api_token');
      $.ajax({
		    url:"https://api.esanum.com.co/v1/news",
		    type: "POST",
		    data: {token:  token, action: 'read'},
		    success:function(response){
		         deferred.resolve(response);
		    },
		    error:function (xhr, textStatus, thrownError){
		      deferred.reject(xhr);  
		    },

		});

       return deferred.promise;
    }

	return service;

}])
