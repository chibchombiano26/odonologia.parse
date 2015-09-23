angular.module('directivas').
controller('addGalleryCtrl', 
	['$scope', '$modalInstance', '$rootScope', function ($scope, $modalInstance, $rootScope) {
	
	$scope.partition = Parse.User.current().get("email");

	$scope.callback = function(data){
		$modalInstance.dismiss(data);
	}


}])