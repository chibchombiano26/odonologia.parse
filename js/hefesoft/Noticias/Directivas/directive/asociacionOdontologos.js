angular.module('directivas').
directive('asociacionOdontologos', function(){

   var directiva = {};   
   directiva.restrict = 'E';

   directiva.link = function(scope, element, attrs) {
      scope.inicializar(scope.url);
   };   
  

   directiva.controller = 'asociacionOdontologosCtrl';
   directiva.templateUrl = 'js/hefesoft/Noticias/Directivas/template/asociacionOdontologos.html';
   directiva.scope = {
   	contexto : '=',
   	url : '='
   }

   return directiva;
});