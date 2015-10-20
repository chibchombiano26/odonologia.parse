/*global angular, Parse, _*/  
angular.module("odontologiaApp")
.directive("buscadorDiagnosticos", function($parse){
    
    
    
    var directive = {};
    
    directive.restrict = "E";
    directive.templateUrl = "js/hefesoft/Diagnosticos/directivas/template/buscadorDiagnosticos.html";
    directive.controller = "buscadorDiagnosticosCtrl";
    
    directive.link = function(scope, element, attrs){
      
      var existClick = attrs['diagnosticoSeleccionado'];
      if(angular.isDefined(existClick)){
         scope.fnDiagnosticoSeleccionado = $parse(attrs['diagnosticoSeleccionado']);
      }
      
    }
    
    
   
    return directive;
    
})

.controller('buscadorDiagnosticosCtrl', function($scope, diagnosticosService){
    
    $scope.datos = [];
    $scope.seleccionado;
    $scope.show = false;
    
    $scope.$watch('seleccionado', function(e) {
        if(e){
            var result = _.find($scope.datos, 'nombre', e);
            if(result){
                if(angular.isDefined($scope.fnDiagnosticoSeleccionado) && angular.isFunction($scope.fnDiagnosticoSeleccionado)){
                    $scope.seleccionado = result;
                    $scope.show = true;
        			$scope.fnDiagnosticoSeleccionado($scope, { 'item' : result });
        		}
                
            }
        }
    });
    
    function inicializar(){
        diagnosticosService.cargarDiagnosticos('').then(function(result){
            for (var i = 0; i < result.length; i++) {
                $scope.datos.push(result[i].toJSON());
            }
        })
    }
  
    inicializar();
})