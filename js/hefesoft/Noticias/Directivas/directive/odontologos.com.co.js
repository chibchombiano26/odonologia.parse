angular.module('directivas').
directive('odontologoscomco', function(){

   var directiva = {};   
   directiva.restrict = 'E';

   directiva.link = function(scope, element, attrs) {
      
   };   
  

   directiva.controller = 'odontologoscomcoCtrl';   

   directiva.templateUrl = 'js/hefesoft/Noticias/Directivas/template/odontologos.com.co.html';

   directiva.scope = {
   	contexto : '='
   }

   return directiva;
});