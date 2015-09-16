angular.module('directivas').
directive('esanum', function(){

   var directiva = {};   
   directiva.restrict = 'E';

   directiva.link = function(scope, element, attrs) {
      
   };   
  

   directiva.controller = 'esanumCtrl';
   directiva.templateUrl = 'app/scripts/controllers/Noticias/Directivas/template/esanum.html';
   return directiva;
});