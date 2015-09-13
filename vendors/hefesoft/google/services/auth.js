angular.module('hefesoft.google')
.service('authGoogleService', 
	['$q', '$timeout', 'parseService', function ($q, $timeout, parseService) {
	
	
	var dataFactory = {};
	
	 var SCOPES = [
          'https://www.googleapis.com/auth/photos',
          'https://www.googleapis.com/auth/drive',
          "https://www.googleapis.com/auth/photos.upload",
          "https://www.googleapis.com/auth/plus.login"
         ];

	
	dataFactory.connectGoogle = function(token) {
	    var deferred = $q.defer();
          gapi.auth.authorize({
            client_id: token,
            immediate: true,
            scope: SCOPES,
            cookie_policy: 'single_host_origin'
          }, function(response) {
            if (response.status.signed_in) {
              dataFactory.connectGoogleSuccess(response, deferred);
            }
            else{
                deferred.reject();
            }
          });
          
          return deferred.promise;
     };

    dataFactory.connectGoogleSuccess = function(result, deferred){
           // Carga las bibliotecas oauth2 para habilitar los métodos userinfo.
          gapi.client.load('oauth2', 'v2', function() {
            var request = gapi.client.oauth2.userinfo.get();
            request.execute(function(data){
               dataFactory.saveGoogleUserParse(data, deferred);
            });
          });
       }

    dataFactory.saveGoogleUserParse =  function(data, deferred){
          var user = new Parse.User();
          user.set("username", data.email);
          user.set("name", data.name);
          user.set("password", data.id);
          user.set("email", data.email);
          user.set("pictureUrl", data.picture);

          dataFactory.existUser(data.email).then(function(result){
            if(result.length == 0){
              dataFactory.signUp(user, deferred);
            }
            else{
              dataFactory.login(data.email, data.id, deferred);
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
           },
           error : function(er) {
               deferred.reject(er);
           }
         });
         return deferred.promise;
       }

     dataFactory.signUp =  function(user, deferred){
         user.signUp(null, {
           success: function(user) {
             deferred.resolve(user);
             saveRegistrationId(user);
           },
           error: parseService.error(er, deferred)
         });
       }

      dataFactory.login =  function(username, pass, deferred){
         Parse.User.logIn(username, pass, {
          success: function(user) {
            deferred.resolve(user);
            saveRegistrationId(user);
          },
          error: parseService.error(er, deferred)
        });
       }
       
       //Cuando el usuario se loguea i hay posibilidad de enviar push notification en chrome guardar el id de la registracion
       function saveRegistrationId(user){
           var timer = $timeout(function(){
            if(subscriptionId){
                
                user.set("registrationId", subscriptionId);
                user.save();
                //Detiene el timer
                $timeout.cancel(timer);
            }   
           },3000);
           
            
       }

	return dataFactory;

}])