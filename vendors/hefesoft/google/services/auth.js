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
	    
	    Parse.User.logOut();
	    
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
           error : function(e){ parseService.error(e, deferred)}
         });
         return deferred.promise;
       }

     dataFactory.signUp =  function(user, deferred){
         user.signUp(null, {
           success: function(user) {
             deferred.resolve(user);
             saveRegistrationId(user);
           },
           error: function(e){ parseService.error(e, deferred)}
         });
       }

      dataFactory.login =  function(username, pass, deferred){
         Parse.User.logIn(username, pass, {
          success: function(user) {
            deferred.resolve(user);
            saveRegistrationId(user);
          },
          error: function(e){ parseService.error(e, deferred)}
        });
       }
       
       //Cuando el usuario se loguea i hay posibilidad de enviar push notification en chrome guardar el id de la registracion
       function saveRegistrationId(user){
           var timer = $timeout(function(){
            if(subscriptionId){
                user.set("registrationId", subscriptionId);
                user.set("esMedico", true);
                user.save().then(function(result){
                    console.log(result);
                })
                //Detiene el timer
                $timeout.cancel(timer);
            }   
           },3000);
       }
       
      dataFactory.disconnectUser =  function(access_token) {
          var deferred = $q.defer();
          var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' +
              access_token;
        
          // Realiza una solicitud GET asíncrona.
          $.ajax({
            type: 'GET',
            url: revokeUrl,
            async: false,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(nullResponse) {
              deferred.resolve("200");
              // Lleva a cabo una acción ahora que el usuario está desconectado
              // La respuesta siempre está indefinida.
            },
            error: function(e) {
              deferred.reject("500");
              // Gestiona el error
              // console.log(e);
              // Puedes indicar a los usuarios que se desconecten de forma manual si se produce un error
              // https://plus.google.com/apps
            }
          });
          
          return deferred.promise;
          
        }
        
        dataFactory.logOutGoogle = function(){
            var win = window.open("http://accounts.google.com/logout", "something", "width=550,height=570");
            setTimeout("win.close();", 4000);
        }

	return dataFactory;

}])