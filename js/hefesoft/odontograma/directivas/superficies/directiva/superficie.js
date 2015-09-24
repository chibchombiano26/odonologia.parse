angular.module('directivas').
directive('superficie', function(){

   var directiva = {};
   //directiva.require = ['ngModel'];
   directiva.restrict = 'E';

   directiva.link = function(scope, element, attrs, ngModelCtrl) {

    //cuando el valor cambia desde el modelo
    /*
    ngModelCtrl[0].$render = function(){
      if (!ngModelCtrl[0].$isEmpty(ngModelCtrl[0].$viewValue)) {
         var valor = ngModelCtrl[0].$viewValue;
         scope.color = valor.color;
         
       }
     }
     */

     //cambio de valor desde la directiva
     //ngModelCtrl[0].$setViewValue(e);
      
   };
   
   directiva.scope = {
      source : '=',
      color : '=',
      simbolo : '=',
      fuente : '=',
      pathImagen : '=' /* recordar que en el html debe ponerse asi path-imagen */
   };

   directiva.controller = 'SuperficieCtrl';   

   directiva.templateUrl = 'js/hefesoft/odontograma/directivas/superficies/template/superficie.html';
   return directiva;
});