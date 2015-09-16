angular.module('directivas').
directive('asociacionOdontologos', function(){

   var directiva = {};   
   directiva.restrict = 'E';

   directiva.link = function(scope, element, attrs) {
      
   };   
  

   directiva.controller = 'asociacionOdontologosCtrl';
   directiva.templateUrl = 'app/scripts/controllers/Noticias/Directivas/template/asociacionOdontologos.html';
   directiva.scope = {
   	contexto : '='
   }

   return directiva;
});