angular.module('directivas').
directive('piezaDental', function($parse){

   var directiva = {};
   var fn;
   
   directiva.require = ['ngModel'];
   directiva.restrict = 'E';


   directiva.link = function(scope, element, attrs, ngModelCtrl) {

    scope.modo = "diagnostico";
    
    var existClick = attrs['clickSuperficie'];
    if(angular.isDefined(existClick)){
      fn = $parse(attrs['clickSuperficie']);
    }

  	ngModelCtrl[0].$render = function(){
        if (!ngModelCtrl[0].$isEmpty(ngModelCtrl[0].$viewValue)) {
    		var valor = ngModelCtrl[0].$viewValue;
            scope.item = valor;
    
            if(valor.parte == "boca"){
              scope.esBoca = true;
            }

      }
     }

    scope.clickSuperficie = function(e){
        
     var dxSeleccionado = scope.$root.$root.diagnosticoSeleccionado.diagnostico;
     scope.modo = scope.$root.$root.modo;
     scope.item[e + "_objectHefesoft"] = dxSeleccionado;
     
 	 var arrayNombre = e + "Diagnosticos_arrayHefesoft";

 	 if(angular.isUndefined(scope.item[arrayNombre])){
 		scope.item[arrayNombre] = [];
 	 }
     
     scope.item[arrayNombre].push(scope.$root.$root.diagnosticoSeleccionado);
     
        
      var funcion = fn;
      if(angular.isDefined(funcion)){
        fn(scope.$parent,{'superficie' :e});
      }
    }

   }; // Fin de la directiva

      
   directiva.scope = {
      source : '=',
   };   

   directiva.templateUrl = 'js/hefesoft/odontograma/directivas/piezaDental/template/template.html';
   return directiva;
});
