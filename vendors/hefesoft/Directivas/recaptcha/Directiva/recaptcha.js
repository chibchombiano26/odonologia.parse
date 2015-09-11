angular.module('directivas').
directive('recaptcha', ['$parse', '$timeout', function ($parse, $timeout) {
	
	var Attr;
	var Element;
	var Scope;

	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			Attr =attr;
			Element =element;
			Scope = scope;
            $timeout(iniciarCaptcha, 1000);
		}
	};

	 function iniciarCaptcha(){
	 	grecaptcha.render('captcha', {
	      'sitekey' : '6LcuNwYTAAAAAJjbc9x9utQtFmRiBYVfOh9_6KwU"',
	      'callback' : verifyCallback,
	      'theme' : 'light'
    	});
	 }	

    function verifyCallback(response) {      		
			var fn = $parse(Attr.recaptcha);                       
            fn(Scope, {'token' : response});
  	};
}])