/*global angular, hefesoft*/
angular.module('odontologiaApp')
    .controller('guardarCotizacionModal', function($scope, callback, modalServiceSecondPopUp, $q) {


        $scope.cotizacion = {};

        $scope.save = function() {
            callback($scope.cotizacion);
        }

        $scope.limpiar = function() {
            $scope.cotizacion = {};
            
            if(hefesoft.util['pacienteSeleccionado']){
                delete hefesoft.util.pacienteSeleccionado;
            }
        }

        $scope.buscarPaciente = function() {
            var deferred = $q.defer();
            modalServiceSecondPopUp.open('lg', 'js/hefesoft/pacientes/template/buscadorModal.html', 'buscarPacienteModalCtrl', undefined, function(e) {
                modalServiceSecondPopUp.close();
                fijarElementos(e);
            })
            return deferred.promise;
        }

        function fijarElementos(e) {
            if (e.nombre) {
                $scope.cotizacion.nombres = e.nombre;
            }

            if (e.cedula) {
                $scope.cotizacion.documento = e.cedula;
            }

            if (e.email) {
                $scope.cotizacion.email = e.email;
            }

            if (e.telefono) {
                $scope.cotizacion.telefono = e.telefono;
            }
        }

        function inicializar() {

            if (hefesoft.util['pacienteSeleccionado']) {
                fijarElementos(hefesoft.util['pacienteSeleccionado']);
            }

        }
        
        inicializar();

    })