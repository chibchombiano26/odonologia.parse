angular.module('hefesoft.google')
.directive('signUpGoogle',
	['$parse', function ($parse) {


	var directiva = {};
	directiva.restrict = "E";
	directiva.templateUrl = "vendors/hefesoft/google/directivas/signUp/template/template.html";

	directiva.link = function(scope, element, attrs) {
		gapi.signin2.render(element[0], {
        'scope': 'https://www.googleapis.com/auth/plus.login',
        'longtitle': false,
        'onsuccess': onSuccess,
        'onfailure': onFailure
      });

	   var existClick = attrs['sigIn'];
       if(angular.isDefined(existClick)){
          scope.fnSigIn = $parse(attrs['sigIn']);
       }

       function onSuccess(googleUser) {
       	var profile = googleUser.getBasicProfile();
       	var item = {
       		//type : googleUser.B.idpId,
       		//id_token : googleUser.B.id_token,
       		//access_token : googleUser.B.access_token,
       		email: profile.G,
       		name : profile.ha,
       		id :  profile.B,
       		urlImage : profile.wc
       	};

      	if(angular.isDefined(scope.fnSigIn) && angular.isFunction(scope.fnSigIn)){
            //scope.$parent.fnSigIn(scope, { 'item' : item });
						scope.fnSigIn(item);
        }
	  }

	  function onFailure(error) {
	    console.log(error);
	  }
	}

	return directiva;
}])
