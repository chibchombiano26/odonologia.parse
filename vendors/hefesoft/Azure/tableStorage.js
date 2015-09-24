angular.module('azure')
    .factory('dataTableStorageFactory', ['$http','urlServicioFactory','$q',
        function($http, urlServicioFactory, $q) {
    
    var urlBase = urlServicioFactory.getUrlService();
    var dataFactory = {};    

    dataFactory.getJsonData = function (nombre) {
        return $http.get('js/hefesoft/json/' + nombre);
    };

    dataFactory.getJsonDataPromise = function (nombre) {
        var deferred = $q.defer();
        $http.get('app/scripts/json/data/' + nombre)
        .success(function (data) {                
                deferred.resolve(data);
            })
            .error(function (error) {
                console.log(error);                
                deferred.reject(error);
            });

        return deferred.promise;
    };

    dataFactory.getTableByPartition = function (nombreTabla, PartitionKey) {
        return $http.get(urlBase + "table/?nombreTabla=" + nombreTabla +"&partitionKey="+ PartitionKey);
    };

    // Los 2 ultimos parametros no son de utilidad solo se envian xq el servicio los requiere
    dataFactory.getTableByRowKey = function (nombreTabla, RowKey) {
        return $http.get(urlBase + "table/?nombreTabla=" + nombreTabla +"&rowkey="+ RowKey + "&modo=a&modo2=b");
    };

    dataFactory.getTableByPartitionAndRowKey = function (nombreTabla, PartitionKey, rowKey) {
        return $http.get(urlBase + "table/?nombreTabla=" + nombreTabla +"&partitionKey="+ PartitionKey+ "&rowKey="+ rowKey);
    };

    dataFactory.postTable = function (data) {
        data = validarAntesEnviar(data);
        return $http.post(urlBase + "table", data);
    };

    //RowKey es el campo que actuara como rowKey
    dataFactory.postTableArray = function (data, nombreTabla ,PartitionKey, RowKey) {
        
        for (var i = data.length - 1; i >= 0; i--) {
            data[i]['nombreTabla'] = nombreTabla;
            data[i]['PartitionKey'] = PartitionKey;
            data[i]['RowKey'] = data[i][RowKey];

            validarAntesEnviar(data[i]);
        };
        
        return $http.post(urlBase + "tableGroup", data);
    };

    dataFactory.existeUsuario = function (api, data) {        
        return $http.post(urlBase + api, data);
    };


    function validarAntesEnviar(data){        

        //El servicio espera esta propiedad para saber si debe crear o eliminar la propiedad
        //Si no esta se debe crear
        //Crear = 1, Eliminar = 2
        if(!data.hasOwnProperty('Estado_Entidad')){
            data['Estado_Entidad'] = 1;
        }

        if(!data.hasOwnProperty('generarIdentificador')){
            data['generarIdentificador'] = false;
        }

        if(!data.hasOwnProperty('PartitionKey')){
            console.log('post sin partitionKey de la tabla');
             throw new Error("indique el partitionKey de la tabla");
        }        

        if(!data.hasOwnProperty('nombreTabla')){             
             console.log('post sin nombre de la tabla');
             throw new Error("indique el nombre de la tabla");

        }

        if(data.hasOwnProperty('partitionKey') && data.hasOwnProperty('PartitionKey')){
            delete data.partitionKey;
        }

        return data;
    }


     

    dataFactory.saveStorage = function (item){       
        var deferred = $q.defer();        
        dataFactory.postTable(item)
            .success(function (data) {                
                deferred.resolve(data);
            })
            .error(function (error) {
                console.log(error);                
                deferred.reject(error);
            });

        return deferred.promise;
    }

    dataFactory.deleteFromStorage = function (item){
        item.Estado_Entidad = 2;        
        dataFactory.postTable(item)
            .success(function (data) {
              
            })
            .error(function (error) {
               
            });
    }

    return dataFactory;
}]);