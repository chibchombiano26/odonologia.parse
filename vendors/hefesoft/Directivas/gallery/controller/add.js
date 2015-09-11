angular.module('directivas').
controller('addGalleryCtrl', 
	['$scope', '$modalInstance', '$rootScope', function ($scope, $modalInstance, $rootScope) {
	
	$scope.partition = $rootScope.currentUser.id;

	$scope.callback = function(data){
		$modalInstance.dismiss(data);
	}


}])