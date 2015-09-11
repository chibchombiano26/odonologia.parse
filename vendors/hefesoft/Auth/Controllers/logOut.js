angular.module('auth')
.controller('signOutCtrl', ['$scope', "$state", 'authService', function ($scope, $state, authService) {
	

	$scope.logOut = function(){
		authService.logOut();
		signOut();
	}

	function signOut() {
	    var auth2 = gapi.auth2.getAuthInstance();
	    auth2.signOut().then(function () {
	      console.log('User signed out.');
	 });
	}

}])