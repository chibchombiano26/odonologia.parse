/*global angular, Parse, _*/  
angular.module("odontologiaApp")
.directive("buscadorPrestador", function($parse){
    
    var directive = {};
    
    directive.restrict = "E";
    directive.templateUrl = "js/hefesoft/Prestador/directives/templates/buscador.html";
    directive.controller = "buscadorPrestadorCtrl";
    
    directive.link = function(scope, element, attrs){
      
      var existClick = attrs['prestadorSeleccionado'];
      if(angular.isDefined(existClick)){
         scope.fnprestadorSeleccionado = $parse(attrs['prestadorSeleccionado']);
      }
      
    }
   
    return directive;
    
})

.controller('buscadorPrestadorCtrl', function($rootScope, $scope,  prestadorService, modalService){
    
    $scope.datosPrestador = [];
    $scope.seleccionadoPrestador;
    $scope.showPrestador = false;
    
     $scope.fnPrestadorSeleccionado = function(result) {

         if (angular.isDefined($scope.fnprestadorSeleccionado) && angular.isFunction($scope.fnprestadorSeleccionado)) {
             $scope.seleccionadoPrestador = result;
             $scope.showPrestador = true;
             $scope.fnprestadorSeleccionado($scope, {
                 'item': result
             });
         }
         else{
            $scope.showPrestador = false;
        }
     }
    
    $scope.nueva = function(){
        $rootScope['prestadorSeleccionado'] = undefined; 
        modalService.open('lg', 'js/hefesoft/Prestador/add.html', undefined);
    }
    
    $scope.editar = function(item){
        $rootScope['prestadorSeleccionado'] = item; 
        modalService.open('lg', 'js/hefesoft/Prestador/add.html', undefined);
    }
    
    $scope.fijarPrestador = function(prestador){
        $scope.seleccionadoPrestador = prestador;
        $scope.showPrestador = true;
		$scope.fnprestadorSeleccionado($scope, { 'item' : prestador });
    }
    
    $scope.buscadorPrestador = function(texto){
        return prestadorService.buscarPrestador(texto.toLowerCase());
    }
})