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

.controller('buscadorPrestadorCtrl', function($rootScope, $scope,  prestadorService){
    
    $scope.datosPrestador = [];
    $scope.seleccionadoPrestador;
    $scope.showPrestador = false;
    
    $scope.$watch('seleccionadoPrestador', function(e) {
        if(e){
            var result = _.find($scope.datosPrestador, 'nombre', e);
            if(result){
                if(angular.isDefined($scope.fnprestadorSeleccionado) && angular.isFunction($scope.fnprestadorSeleccionado)){
                    $scope.seleccionadoPrestador = result;
                    $scope.showPrestador = true;
        			$scope.fnprestadorSeleccionado($scope, { 'item' : result });
        		}
            }
        }
    });
    
    $scope.nueva = function(){
        $rootScope['prestadorSeleccionado'] = undefined; 
        $rootScope.$broadcast('openPopUp', { size: "lg", template : 'js/hefesoft/Prestador/add.html'});
    }
    
    $scope.editar = function(item){
        $rootScope['prestadorSeleccionado'] = item; 
        $rootScope.$broadcast('openPopUp', { size: "lg", template : 'js/hefesoft/Prestador/add.html'});
    }
    
    $scope.fijarPrestador = function(prestador){
        $scope.seleccionadoPrestador = prestador;
        $scope.showPrestador = true;
		$scope.fnprestadorSeleccionado($scope, { 'item' : prestador });
    }
    
    function inicializar(){
        prestadorService.list().then(function(result){
            $scope.datosPrestador = [];
            for (var i = 0; i < result.length; i++) {
                $scope.datosPrestador.push(result[i].toJSON());
            }
        })
    }
    
    $rootScope.$on('prestador', function(event, payload) {
        var modo = payload.modo;
        
        if(modo === "Adicionado"){
            $scope.listado.push(payload.item);
        }
        else{
            inicializar();
        }
    })
  
    inicializar();
})