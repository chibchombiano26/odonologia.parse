angular.module('hefesoft.google')
.service('authGoogleService', 
	['$q', function ($q) {
	
	
	var dataFactory = {};
	
	 var SCOPES = [
          'https://www.googleapis.com/auth/photos',
          'https://www.googleapis.com/auth/drive',
          "https://www.googleapis.com/auth/photos.upload",
          "https://www.googleapis.com/auth/plus.login"
         ];

	
	dataFactory.connectGoogle = function(token) {
          gapi.auth.authorize({
            client_id: token,
            immediate: true,
            scope: SCOPES,
            cookie_policy: 'single_host_origin'
          }, function(response) {
            if (response.status.signed_in) {
              dataFactory.connectGoogleSuccess(response);
            }
          });
         };

    dataFactory.connectGoogleSuccess = function(result, deferred){
           // Carga las bibliotecas oauth2 para habilitar los métodos userinfo.
          gapi.client.load('oauth2', 'v2', function() {
            var request = gapi.client.oauth2.userinfo.get();
            request.execute(function(data){
               dataFactory.saveGoogleUserParse(data);
            });
          });
       }

    dataFactory.saveGoogleUserParse =  function(data){
          var user = new Parse.User();
          user.set("username", data.email);
          user.set("name", data.name);
          user.set("password", data.id);
          user.set("email", data.email);
          user.set("pictureUrl", data.picture);

          dataFactory.existUser(data.email).then(function(result){
            if(result.length == 0){
              dataFactory.signUp(user);
            }
            else{
              dataFactory.login(data.email, data.id);
            }
          });
       }

     dataFactory.existUser =  function (user){
         var deferred = $q.defer();
         var query = new Parse.Query(Parse.User);
         query.equalTo("username", user);
         query.find({
           success: function(result) {
             console.log(result);
             deferred.resolve(result);
           }
         });
         return deferred.promise;
       }

     dataFactory.signUp =  function(user){
         user.signUp(null, {
           success: function(user) {
             console.log(user);
           },
           error: function(user, error) {
             // Show the error message somewhere and let the user try again.
             alert("Error: " + error.code + " " + error.message);
           }
         });
       }

      dataFactory.login =  function(username, pass){
         Parse.User.logIn(username, pass, {
          success: function(user) {
            console.log(user);
          },
          error: function(user, error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
       }

	return dataFactory;

}])