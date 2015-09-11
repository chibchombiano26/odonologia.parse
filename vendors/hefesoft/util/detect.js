angular.module('Util')
.service('detectBrowser', [function () {	
	
	var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
	var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	    // At least Safari 3+: "[object HTMLElementConstructor]"
	var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
	var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6

	var dataFactory = {};

	dataFactory.isOpera = function(){
		return isOpera;
	}

	dataFactory.isFirefox = function(){
		return isFirefox;
	}

	dataFactory.isSafari = function(){
		return isSafari;
	}

	dataFactory.isChrome = function(){
		return isChrome;
	}

	dataFactory.isIE = function(){
		return isIE;
	}

	dataFactory.getBrowserName = function(){
		if(isOpera){
			return "Opera";
		}
		else if(isFirefox){
			return "Firefox";
		}
		else if(isSafari){
			return "Safari";
		}
		else if(isChrome){
			return "Chrome";
		}
		else if(isIE){
			return "IE";
		}
		else{
			return "NA";
		}
	}


	return dataFactory;


}])