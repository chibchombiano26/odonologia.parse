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

.controller('buscadorDiagnosticosCtrl', function($scope, diagnosticosService, modalService){
    
    $scope.datos = [];
    $scope.seleccionado;
    $scope.show = false;
    
    $scope.fnSeleccionado = function(result){
        
        if(angular.isDefined($scope.fnDiagnosticoSeleccionado) && angular.isFunction($scope.fnDiagnosticoSeleccionado)){
         $scope.seleccionado = result;
         
		 $scope.fnDiagnosticoSeleccionado($scope, { 'item' : result });
		 mostrarDiagnosticoEvolucion();
		 
        }
    }
    
    $scope.limpiar = function(){
        $scope.seleccionado = "";
    }
    
    function mostrarDiagnosticoEvolucion() {
        try {
            if ($scope.mostrarDiagnosticoInfo == false) {
                $scope.show = false;
            }
            else {
                $scope.show = true;
            }
        }
        catch (ex) {
            $scope.show = true;
        }
    }
    
    $scope.buscadorBuscarDiagnosticos = function(texto){
        return diagnosticosService.buscarDiagnosticos(texto);
    }
    
    $scope.new = function() {
        modalService.open('lg', 'js/hefesoft/Diagnosticos/views/wizard.html', undefined, undefined, function(e) {
            modalService.close();
        })
    }
  
   
})