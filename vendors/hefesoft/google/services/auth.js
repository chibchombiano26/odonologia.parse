/*global angular, Parse, gapi, hefesoft*/

angular.module('hefesoft.google')
.service('authGoogleService', 
	['$q', '$timeout', 'parseService', function ($q, $timeout, parseService) {
	
	
	var dataFactory = {};
	
	 var SCOPES = [
          'https://www.googleapis.com/auth/photos',
          'https://www.googleapis.com/auth/drive',
          "https://www.googleapis.com/auth/photos.upload",
          "https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/calendar",
          "https://www.googleapis.com/auth/tasks"
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
              dataFactory.connectGoogleSuccess(response);
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
           dataFactory.saveGoogleUserParse(data);
        });
      });
    }
    
    dataFactory.getUserInfo = function(){
      var deferred = $q.defer();
      gapi.client.load('oauth2', 'v2', function() {
        var request = gapi.client.oauth2.userinfo.get();
        request.execute(function(data){
           dataFactory.saveGoogleUserParse(data).then(function(data){
               deferred.resolve(data);
           })
        });
      });
      
      return deferred.promise;
    }

    dataFactory.saveGoogleUserParse =  function(data){
          var deferred = $q.defer();
          var user = new Parse.User();
          user.set("username", data.email);
          user.set("name", data.name);
          user.set("password", data.id);
          user.set("email", data.email);
          user.set("pictureUrl", data.picture);
          user.set("authAs", "Google");
          user.set("esMedico", true);
          
          dataFactory.existUser(data.email).then(function(result){
            if(result.length == 0){
              dataFactory.signUp(user).then(function(data){
                deferred.resolve(data);  
              })
            }
            else{
              dataFactory.login(data.email, data.id).then(function(data){
                deferred.resolve(data);    
              })
            }
          });
          
          return deferred.promise;
       }

     dataFactory.existUser =  function (user){
         var deferred = $q.defer();
         var query = new Parse.Query(Parse.User);
         query.equalTo("username", user);
         query.equalTo("esMedico", true);
         query.find({
           success: function(result) {
             
             var existe = !hefesoft.isEmpty(result[0]);
             
             if(existe){
                 var item = result[0].toJSON();
                 if(item.authAs && item.authAs === "Facebook"){
                  deferred.reject("Este correo se encuentra vinculada a una cuenta de google ya existente , debes salir de tu cuenta actual de facebook e ingresar con otra" + item.email);
                 }
                 else{
                 deferred.resolve(result);
                 }
             }
             else{
                 deferred.resolve([]);
             }
           },
           error : function(e){ 
               if(!e.code === 107){
                   deferred.reject(e);
               }
               else{
                   deferred.resolve([]);
               }
           }
         });
         return deferred.promise;
       }

     dataFactory.signUp =  function(user){
         var deferred = $q.defer();
         user.signUp(null, {
           success: function(user) {
             deferred.resolve(user);
             //saveRegistrationId(user);
           },
           error: function(e,  error){ 
             deferred.reject(e);
             
             if(error.code === 202){
                alert("Este correo electronico ya ha sido registrado, probablemente con una paciente por favor use otra cuenta");
                dataFactory.logOutGoogle();
             }
             else{
                 alert(error.message);
             }
           }
         });
         
         return deferred.promise;
       }

      dataFactory.login =  function(username, pass){
         var deferred = $q.defer();
         Parse.User.logIn(username, pass, {
          success: function(user) {
            deferred.resolve(user);
            //saveRegistrationId(user);
          },
          error: function(e){ 
            deferred.resolve(e);
          }
        });
       
        return deferred.promise;
      }
       
       //Cuando el usuario se loguea i hay posibilidad de enviar push notification en chrome guardar el id de la registracion
       function saveRegistrationId(user){
           var timer = $timeout(function(){
            if(subscriptionId){
                user.set("registrationId", subscriptionId);
                user.set("esMedico", true);
                user.set("authAs", "Google");
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
             var win = window.open("http://accounts.google.com/logout", "something", "width=550,height=570", "_blank");
             $timeout(function(){
                  win.close();
             },8000);
        }

	return dataFactory;

}])