angular.module('directivas').
directive('socialLogin', 
	['$parse', function ($parse) {
	
	var directiva = {};

	directiva.restrict = "E";
	directiva.templateUrl= "app/lib/hefesoft.standard/Directivas/social-login/template/template.html";
	directiva.link = function (scope, iElement, attrs) {
			
	 var existClick = attrs['onSign'];
     if(angular.isDefined(existClick)){
        scope.fnOnSign = $parse(attrs['onSign']);
     }

	}

	directiva.controller = "socialLoginCtrl";

	directiva.scope = {
		googleId : "=",
		fbId : "="
	}

	return directiva;
}])

.controller('socialLoginCtrl', ['$scope', function ($scope) {
	
	$scope.sigIn = function sigIn(item){

	   if(angular.isDefined($scope.fnOnSign) && angular.isFunction($scope.fnOnSign)){
            $scope.fnOnSign($scope.$parent, { 'item' : item });
       }
	}

}])