/*global angular, React, ReactDOM*/
angular.module('directivas').
directive('fbReactNews', function($parse){

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
  

   directiva.controller = 'fbNewsReactCtrl';
   directiva.template = "<div id='reactNewsContainer'></div>";
   directiva.require = ['ngModel'];
   
   
   
   directiva.scope = {
   	
   }

   return directiva;
})

.controller('fbNewsReactCtrl', ['$scope', 'fbGroupsService',
	
	function ($scope, fbGroupsService) {

	var NewsWall = React.createClass({
      render: function() {
         return (
          <div className="news">
            <NewComponent/>            
          </div>
        );
      }
    });
    
    
    
    ReactDOM.render(
      <NewsWall />,
      document.getElementById('reactNewsContainer')
    );
	
}])