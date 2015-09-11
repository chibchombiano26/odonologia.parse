angular.module('Stripe')
    .factory('stripeService', ['$http','urlServicioFactory','$ionicLoading', '$q', 'dataTableStorageFactory',
        function($http, urlServicioFactory, $ionicLoading, $q, dataTableStorageFactory) {
    
    var urlBase = urlServicioFactory.getUrlService();
    var dataFactory = {};


    dataFactory.postTable = function (data) {        
        return $http.post(urlBase + "stripeCustomer", data);
    };


    dataFactory.cancelSubscription = function (data) {        
        return $http.post(urlBase + "stripeSubscription", data);
    };

    dataFactory.getSubscription = function (partitionKey) {
        var deferred = $q.defer();
        dataTableStorageFactory.getTableByPartition('TmStripeSubscription', partitionKey)
        .success(function(data){
            if(data.length == 0){
                deferred.reject("No ha registrado medio de pago");
            }
            else{
                $http.get(urlBase + "stripeSubscription?customer=" + data[0].RowKey)
                .success(function(dataStripe){
                    deferred.resolve(dataStripe);
                })
                .error(function(error){
                    deferred.reject(data);
                })
            }
        }).error(function(error){
            deferred.reject(data);
        })

        return deferred.promise;        
    };



    dataFactory.cancelCard = function (data) {        
        return $http.post(urlBase + "StripeCards", data);
    };


    dataFactory.saveStorage = function (item){
        var deferred = $q.defer();
        $ionicLoading.show();
        dataFactory.postTable(item)
            .success(function (data) {
                $ionicLoading.hide();
                deferred.resolve(data);
            })
            .error(function (error) {
                console.log(error);
                $ionicLoading.hide();
                deferred.reject(error);
            });

        return deferred.promise;
    }  

    return dataFactory;
}])

.service('$ionicLoading', [function () {

    var dataFactory = {};

    dataFactory.show = function(){

    }

    dataFactory.hide = function(){
        
    }

    return dataFactory;
    
}])