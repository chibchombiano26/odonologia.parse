/*global angular, _, Parse, numeral*/
angular.module("odontologiaApp")
.directive('buscadorCotizaciones', function(){
    
    var directiva = {};
    directiva.templateUrl = "js/hefesoft/cotizador/template/buscadorCotizaciones.html";
    directiva.controller = "buscadorCotizacionesCtrl";
    directiva.scope = {
       callback: '&'
    };
    
    return directiva;
    
})

.controller('buscadorCotizacionesCtrl', function($scope, cotizacionService){
    
      $scope.datos = [];
      $scope.seleccionadoCotizacion;
      

      $scope.fnSeleccionadoCotizacion = function(result) {
          
          $scope.seleccionadoCotizacion = result;
          
          if($scope.callback){
              $scope.callback({
                    item: result
              });
          }
          
          $scope.seleccionadoCotizacion = "";
          
      }
      
      $scope.cotizaciones = function(textoBuscar) {
          return cotizacionService.buscarCotizacion(textoBuscar);
      };
    
    
})