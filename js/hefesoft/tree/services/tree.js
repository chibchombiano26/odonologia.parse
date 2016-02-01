/*global angular, hefesoft, Parse*/
angular.module("odontologiaApp")
    .service('treeService', function($q) {

        var dataFactory = {};

        dataFactory.odontogramaInicial = function(id) {
            var deferred = $q.defer();

            var Odontograma = Parse.Object.extend("Odontograma");
            var query = new Parse.Query(Odontograma);
            query.equalTo('pacienteId', id);
            query.equalTo('tipo', "Inicial");
            query.descending("createdAt");
            query.limit(1);

            query.find()
                .then(function(result) {

                        if (hefesoft.isEmpty(result)) {
                            deferred.resolve({existe: false, valor : []});
                        }
                        else {
                            deferred.resolve({existe: true, valor : result[0]});
                        }

                    },
                    function(entidad, error) {
                        //Cuando no se encuentra el registro
                        if (entidad.code === 101) {
                            deferred.resolve({});
                        }
                        else {
                            deferred.reject(error);
                        }
                        console.log(error);
                    }
                )

            return deferred.promise;
        }
        
        dataFactory.cotizacion = function(id) {
            var deferred = $q.defer();

            var Cotizacion = Parse.Object.extend("Cotizacion");
            var query = new Parse.Query(Cotizacion);
            query.equalTo('pacienteId', id);
            query.descending("createdAt");
            query.limit(1);

            query.find()
                .then(function(result) {

                        if (hefesoft.isEmpty(result)) {
                            deferred.resolve({existe: false, valor : []});
                        }
                        else {
                            deferred.resolve({existe: true, valor : result[0]});
                        }

                    },
                    function(entidad, error) {
                        //Cuando no se encuentra el registro
                        if (entidad.code === 101) {
                            deferred.resolve({});
                        }
                        else {
                            deferred.reject(error);
                        }
                        console.log(error);
                    }
                )

            return deferred.promise;
        }

        return dataFactory;

    })