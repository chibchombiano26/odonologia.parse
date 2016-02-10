  /*global angular, Parse*/
  angular.module('odontologiaApp')
    .controller('DxListadoCtrl', ['$scope', 'CieCupsServices', '$modal', 'dataTableStorageFactory', '$rootScope', '$q', 'diagnosticosService', 'procedimientosService',
      function($scope, CieCupsServices, $modal, dataTableStorageFactory, $rootScope, $q, diagnosticosService, procedimientosService) {

        var modalInstance;
        $scope.Listado = [];
        $scope.diagnosticoSeleccionado = '';
        
        
        $scope.buscadorDiagnostico = function() {
          
          if($scope.diagnosticoSeleccionado.length == 0){
            $scope.Listado = [];
          }
          
          else if($scope.diagnosticoSeleccionado.length > 3){
            return diagnosticosService.buscarDiagnosticos($scope.diagnosticoSeleccionado).then(function(data) {
              $scope.Listado = data;
            })
          }
        }
        

        $scope.eliminar = function(data, $index) {
          var Diagnostico = new Parse.Object.extend("Diagnostico");
          var diagnostico = new Diagnostico();
          diagnostico.id = data.objectId;
          diagnostico.destroy();
        }

        $scope.modificado = function(data) {

        }

      }
    ])