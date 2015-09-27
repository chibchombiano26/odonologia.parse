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
     
     scope.fijarElemento = function(superficie,tipo, item){
         if(item && item.hasOwnProperty(superficie + "Diagnosticos_arrayHefesoft")){
             
             var elementoRetornar = item[superficie + "Diagnosticos_arrayHefesoft"];
             elementoRetornar = elementoRetornar[elementoRetornar.length -1];
             
             if(elementoRetornar && elementoRetornar.hasOwnProperty("tratado")){
                 //Aca saldra si se toma diagnostico o evolucion
                 elementoRetornar = elementoRetornar[elementoRetornar.tratado];
                 
                 if(tipo === "color"){
                    return elementoRetornar.color;
                 }
                 else if(tipo === "simbolo"){
                    return elementoRetornar.simbolo;
                 }
                 else if(tipo === "fuente"){
                    return elementoRetornar.objectHefesoftFuente.fuente;
                 }
                 else if(tipo === "imagen"){
                    return elementoRetornar.pathImagen;
                 }
             }
             else{
                 return "";
             }
            
         }
         else{
             return "";
         }
     }

    scope.clickSuperficie = function(e){
        
     var dxSeleccionado = angular.copy(scope.$root.$root.diagnosticoSeleccionado);
     scope.modo = scope.$root.$root.modo;
     dxSeleccionado["tratado"] = "diagnostico";
     
 	 var arrayNombre = e + "Diagnosticos_arrayHefesoft";

 	 if(angular.isUndefined(scope.item[arrayNombre])){
 		scope.item[arrayNombre] = [];
 	 }
     
     scope.item[arrayNombre].push(dxSeleccionado);
     
        
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
