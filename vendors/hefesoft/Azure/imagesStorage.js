angular.module('azure')
    .factory('imagesStorageFactory', ['$http','urlServicioFactory', function($http, urlServicioFactory) {
    
    var urlBase = urlServicioFactory.getUrlService() + 'images';
    var dataFactory = {};


    dataFactory.postImage = function (data) {
        data = validarAntesEnviar(data);
        return $http.post(urlBase, data);
    };


    function validarAntesEnviar(data){
        //El servicio espera esta propiedad para saber si debe crear o eliminar la propiedad
        //Si no esta se debe crear
        //Crear = 1, Eliminar = 2
        if(!data.hasOwnProperty('tipo')){
            data['tipo'] = 1;
        }
        

        if(!data.hasOwnProperty('ImagenString')){
            console.log('post sin la imagen');
             throw new Error("ImagenString");
        }        

        if(!data.hasOwnProperty('folder')){             
             console.log('indique el nombre de la carpeta para la imagen');
             throw new Error("folder de la imagen");

        }

        if(!data.hasOwnProperty('name')){             
             console.log('indique el nombre de la imagen');
             throw new Error("indique el nombre de la imagen");
        }
        
        return data;
    }
  

    return dataFactory;
}]);