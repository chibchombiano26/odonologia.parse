/*
    Se utiliza para pasar el token en el header de autenticacion
*/

angular.module('auth')
.factory('authInterceptorService', ['$q', '$localstorage', '$location',
    function ($q, $localstorage, $location) {
 
    var Hefesot = window.Hefesot;
    var authInterceptorServiceFactory = {};

    
    var _request = function (config) {
        config.headers = config.headers || {};        
        var authData = $localstorage.getObject('authorizationData');
        config.headers.Authorization = authData.access_token;

        if(!angular.isUndefined(config.data)){
            config.data = Hefesot.listTostring(config.data, config.method);
        }

        return config;
    }
 
    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            $location.path('/login');
        }
        return $q.reject(rejection);
    }

    var _response = function (response) {
        if(!angular.isUndefined(response.data)){
            Hefesot.procesarList(response.data);
        }
        return response;
    }
 
    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;
    authInterceptorServiceFactory.response = _response;
 
    return authInterceptorServiceFactory;
}])
