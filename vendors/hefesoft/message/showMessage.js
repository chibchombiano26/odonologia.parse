angular.module('Message')
.service('messageService', ['$timeout',function ($timeout) {

	var dataFactory = {};	
	var esIonic = (typeof ionic != 'undefined');    

	if(esIonic){
		var deviceInformation = ionic.Platform.device();
	    var isWebView = ionic.Platform.isWebView();
	    var isIPad = ionic.Platform.isIPad();
	    var isIOS = ionic.Platform.isIOS();
	    var isAndroid = ionic.Platform.isAndroid();
	    var isWindowsPhone = ionic.Platform.isWindowsPhone();

	    var currentPlatform = ionic.Platform.platform();
	    var currentPlatformVersion = ionic.Platform.version();
	}

    var lastMessage= "";

	dataFactory.showMessage = function(message){
		try{
			if(lastMessage !== message){
				browser(message);
				lastMessage = message;
			}
			else{
				
				//Despues de 20 segundos limpie la validacion del mismo mensaje
				$timeout(function(){ lastMessage= "";}, 20000);
			}
		}
		catch(ex){
			
		}
	}

	dataFactory.notify = function(message, type){
		 notify(message, type);
	}

	function browser(message){
	 if (!("Notification" in window)) {
	 	toastr.options.closeButton = true;
	 	toastr.options.preventDuplicates = true;
	    toastr.info(message);
	  }
	  else{
	  	sendNotifyBrowser(message);
	  }
	}

	function sendNotifyBrowser(message) {
	  // Let's check if the browser supports notifications
	  if (!("Notification" in window)) {
	    alert("This browser does not support desktop notification");
	  }

	  // Let's check if the user is okay to get some notification
	  else if (Notification.permission === "granted") {
	    // If it's okay let's create a notification
	    var notification = new Notification('Odontologia', {
			    icon: 'assets/img/icon.png',
			    body: message,
			  });
	  }

	  // Otherwise, we need to ask the user for permission
	  else if (Notification.permission !== 'denied') {
	    Notification.requestPermission(function (permission) {
	      // If the user is okay, let's create a notification
	      if (permission === "granted") {
	        var notification = new Notification('Odontologia', {
			    icon: 'assets/img/icon.png',
			    body: message,
			  });
	      }
	    });
	  }
	 }

	 function notify(message, type){
        $.growl({
            message: message
        },{
            type: type,
            allow_dismiss: false,
            label: 'Cancel',
            className: 'btn-xs btn-inverse',
            placement: {
                from: 'top',
                align: 'right'
            },
            delay: 2500,
            animate: {
                    enter: 'animated bounceIn',
                    exit: 'animated bounceOut'
            },
            offset: {
                x: 20,
                y: 85
            }
        });
    };

	return dataFactory;
	
}])