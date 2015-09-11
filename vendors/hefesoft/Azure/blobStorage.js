angular.module('azure')
    .factory('dataBlobStorageFactory', ['$http', 'urlServicioFactory', function($http, urlServicioFactory) {

    var urlBase = urlServicioFactory.getUrlService();
    var dataFactory = {};

    dataFactory.getTableByPartition = function (nombreTabla,PartitionKey) {
        return $http.get(urlBase + "blob/?nombreTabla=" + nombreTabla +"&partitionKey="+ PartitionKey);
    };

    dataFactory.getTableByPartitionAndRowKey = function (nombreTabla, PartitionKey, rowKey) {
        return $http.get(urlBase + "blob/?nombreTabla=" + nombreTabla +"&partitionKey="+ PartitionKey+ "&rowKey="+ rowKey);
    };

    dataFactory.postBlob = function (data) {
        data = validarAntesEnviar(data);    
        return $http.post(urlBase + "blob", data);
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
        else{
            data.nombreTabla = data.nombreTabla.toLowerCase();
        }

        if(data.hasOwnProperty('partitionKey') && data.hasOwnProperty('PartitionKey')){
            delete data.partitionKey;
        }

        return data;
    }

    dataFactory.saveStorage = function (item){
        dataFactory.postTable(item)
            .success(function (data) {
                $ionicLoading.hide();
            })
            .error(function (error) {
                console.log(error);
                $ionicLoading.hide();
            });
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