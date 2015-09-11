angular.module('directivas')
.controller('drillDownCtrl', function($scope, $http) {


	
   $scope.$watch('source', function(e) {
   	 if(e){
   	  inicializar();       
   	 }
   });
  

   function inicializar(){

	$scope.currentLevel = $scope.source;

	$scope.parentLevel = null;
	$scope.history = [];
  }

  $scope.displayNextLevel = function(i, item) {
		$scope.parentLevel = $scope.currentLevel[i];
		$scope.currentLevel = $scope.currentLevel[i][$scope.objetoArray];
		$scope.history.push(i);

		$scope.$parent.clickMenu(i, item);		
	}
	
  $scope.getBack = function() {
		var historyLevel = angular.copy($scope.source);
		var parentLevel;
		for (var j = 0; j < $scope.history.length - 1; j++) {
			parentLevel = angular.copy(historyLevel[$scope.history[j]]);
			historyLevel = historyLevel[$scope.history[j]][$scope.objetoArray];
		}
		$scope.currentLevel = historyLevel;
		$scope.parentLevel = parentLevel;
		$scope.history.pop();
  }

});