angular.module('odontologiaApp')
.factory('odontogramaJsonServices', ['dataTableStorageFactory', '$q',
	function (dataTableStorageFactory, $q) {

    var dataFactory = {};	
	
    //Mockup del odontograma
    dataFactory.obtenerOdontogramaBase = function(){
        var deferred = $q.defer();
        dataTableStorageFactory.getJsonData('Odontograma.json')
        .success(function (data) {
            deferred.resolve(data);                        
        })
        .error(function (error) {
            console.log(error);
            deferred.reject(error);           
        });

        return deferred.promise;
    }

	

	return dataFactory;

}])