angular.module('azure')
.factory('pushFactory', ['$http','urlServicioFactory' , '$q', '$rootScope','$cordovaPush', 
  function ($http, urlServicioFactory, $q, $rootScope, $cordovaPush) {
  
  var urlBase = urlServicioFactory.getUrlBase();
  var dataFactory = {};

    var androidConfig = {
        "senderID": "505952414500",
    };


    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
      switch(notification.event) {
        case 'registered':
          if (notification.regid.length > 0 ) {
            console.log('registration ID = ' + notification.regid);            
          }
          break;

        case 'message':
          // this is the actual push notification. its format depends on the data model from the push server
          alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
          break;

        case 'error':
          alert('GCM error = ' + notification.msg);
          break;

        default:
          alert('An unknown GCM event has occurred');
          break;
      }
    });

    dataFactory.registerAndroid = function(){
        var deviceInformation = ionic.Platform.device();
        var isAndroid = ionic.Platform.isAndroid();

      if(isAndroid){
            $cordovaPush.register(androidConfig).then(function(result) {
                console.log(result);
                var key = result;
                dataFactory.register(key);
            }, function(err) {
                console.log(err);
            })
          }
      else{

        //Key de pruebas
        var key = "APA91bFFa2kqzL9AE8utHBuoE4B-AtnQZKQuRPIdSP50PbeQEbjTsLUC4ZCyLOnKc7A1jYg91TuQ7_29PUqZjh5H9lyqT0-pmcDQE4JTWNLHlEdCMXyV3nPUCLQMdnGs22fEKSTO5ht9I5paXjCabIxT4veR55F9bfx2d4U7GRKaNRn3q212m2Q";
        dataFactory.register(key);
      }
    }

    dataFactory.register = function(key){
      var deferred = $q.defer();
      var key = key;
      $http.post(urlBase + "api/register", {key : key}).success(function (data) {                
                updateRegister(data, deferred, key);
            })
            .error(function (error) {
                
            });

       return deferred.promise;
    }

    //Un tag o un nombre
    dataFactory.enviarMensaje = function(enviarA, mensaje){
      var platformVersion = getPlatform();
      var item = { platform : platformVersion, to_tag : enviarA, mensaje : mensaje};
      $http.post(urlBase + "api/notifications", item)
      .success(function (data) {                
          console.log(data);        
        })
        .error(function (error) {
            console.log(error);      
        });
    }

    dataFactory.enviarMensajePlatform = function(enviarA, mensaje, platform){      
      var item = { platform : platform, to_tag : enviarA, mensaje : mensaje};
      $http.post(urlBase + "api/notifications", item)
      .success(function (data) {                
          console.log(data);        
        })
        .error(function (error) {
            console.log(error);      
        });
    }

    dataFactory.enviarMensajeUsername = function(enviarA, mensaje){      
      var item = {to_tag : enviarA, mensaje : mensaje};
      $http.post(urlBase + "api/NotifyPushUsername", item)
      .success(function (data) {                
          console.log(data);        
        })
        .error(function (error) {
            console.log(error);      
        });
    }

  dataFactory.getPlatform = function(){
      return getPlatform();    
  }

  return  dataFactory;

  function updateRegister(data, promise, key){
    var deferred = promise;
    var tag = "Pacientes, Odontologia";
    var platform = getPlatform();

    //Falta habilitar para m
    var item ={idhubazure : data, tag : tag, platform: platform, key : key};

    var req = {
                method: 'PUT', 
                url: urlBase + "api/register",
                data: item,
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/json'
              }
            }
            $http(req).success(function(data) { 
                console.log(data);               
                deferred.resolve(data);
                //Prueba
                //dataFactory.enviarMensaje("futbolito152@gmail.com", "futbolito152@gmail.com");
            }).error(function(data) { 
                console.log(data);
                deferred.reject(data);                 
            });
  }

  function getPlatform(){
      var deviceInformation = ionic.Platform.device();
      var isAndroid = ionic.Platform.isAndroid();
      var isWebView = ionic.Platform.isWebView();
      var isIPad = ionic.Platform.isIPad();
      var isIOS = ionic.Platform.isIOS();
      var isAndroid = ionic.Platform.isAndroid();
      var isWindowsPhone = ionic.Platform.isWindowsPhone();

      var currentPlatform = ionic.Platform.platform();
      var currentPlatformVersion = ionic.Platform.version();

      if(isAndroid){
        return  "gcm";
    }
      else{
        return "gcm";
      }
  }

}])