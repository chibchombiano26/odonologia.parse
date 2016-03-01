/*global angular*/
angular.module('directivas').
directive('fbNews', function($parse){

   var directiva = {};   
   directiva.restrict = 'E';

   directiva.link = function(scope, element, attrs, ngModelCtrl) {
      
      
      ngModelCtrl[0].$render = function() {
         if (!ngModelCtrl[0].$isEmpty(ngModelCtrl[0].$viewValue)) {
            var valor = ngModelCtrl[0].$viewValue;
            scope.inicializar(valor);
         }
      }
   };   
  

   directiva.controller = 'fbNewsCtrl';
   directiva.templateUrl = 'js/hefesoft/Noticias/Directivas/template/fbTemplate.html';
   directiva.require = ['ngModel'];
   
   
   
   directiva.scope = {
   	contexto : '=',
   	url : '='
   }

   return directiva;
})

.controller('fbNewsCtrl', ['$scope', 'fbGroupsService',
	function ($scope, fbGroupsService) {

	$scope.data = {};
	
	$scope.inicializar = function(url){
		fbGroupsService.getWallFbApi(url).then(success);
	}

	function success(data){		
		$scope.data = data;
	}

	
}])