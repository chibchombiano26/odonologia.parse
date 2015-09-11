var app = angular.module('SignalR');
app.service('signalrService', ['$rootScope','$q', 'urlServicioFactory', 'tokenService', 'users', 'varsFactoryService', 'procesarMensajes',
    function ($rootScope, q,  urlServicioFactory, tokenService, users, varsFactoryService, procesarMensajes) {
    
    var username;
    var self = this;
    var deferred = q.defer();
    var accessToken;
    var dataFactory = {};
    var tryingToReconnect = false;
    
    
    // example of WebAPI call using bearer token
    var bearerToken = tokenService.getTokenDocument();
    var proxy;

   

    dataFactory.inicializarProxy = function(nombreMetodoOir){
            varsFactoryService.setproxyInicializado(true);
            var token = tokenService.getTokenDocument();

            $.connection.hub.logging = true;               
            //La url a la que nos deseamos conectar
            var connection = $.hubConnection(urlServicioFactory.getUrlWebSocket());

            connection.error(function (error) {
                    console.log('SignalR error: ' + error);
                    deferred.reject(error);
                    varsFactoryService.setproxyInicializado(false);
            });

            connection.reconnecting(function() {
                console.log('Reconectando');
                tryingToReconnect = true;
            });

            connection.reconnected(function() {
                console.log('Reconectado');
                tryingToReconnect = false;
            });

            connection.disconnected(function() {
               setTimeout(function() {
                   console.log('Desconectado y reconectando');
                   dataFactory.connect(connection, deferred);
               }, 5000); // Restart connection after 5 seconds.
            });

            //Nombre del hub a conectar
            proxy = connection.createHubProxy("chatHub");

            proxy.on("broadcastMessage", function (name, message) {
                procesarMensajes.tipoMensaje(name, message);                             
            });

            debugger
            //var usuario = users.getCurrentUser();
            var usuario = $rootScope.currentUser;

            connection.qs = { bearer_token: token, usuario: usuario.email};               

            dataFactory.connect(connection, deferred);

            return deferred.promise;
    };
    
    dataFactory.connect =function(connection, deferred){
     //Se hace con longpoling xq websocket en azure (las cuentas gratis solo soportan 5 conexiones simultaneas)
        connection.start({ transport: 'longPolling', jsonp : true}).done(function(){ 
                console.log("Proxy inicializado");
                deferred.resolve('Proxy inicializado'); 
                varsFactoryService.setproxyEnLinea(true);
            }
        );
    }

    dataFactory.getHeaders =   function () {
            var token = tokenService.getTokenDocument();
            if (token) {
                return { "Authorization": "Bearer " + token };
            }
     }

    function error(msg){
        deferred.reject(msg);
    }


    dataFactory.sendMessage = function(user, datos){  
        var stringData = JSON.stringify(datos);
        console.log(proxy.connection.id);
        proxy.invoke('Send', user, stringData);
    };

    return dataFactory;

}])