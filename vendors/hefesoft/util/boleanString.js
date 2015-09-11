angular.module('Util')
.filter('boleanString', function () {
  return function (item) {      
	if(angular.isUndefined(item)){
	    return false; 
    }
    else if(item === "False" || item === "false" || item === "0"){
	    return false; 
    }
    else if(item === "True" || item === "true" || item === "1"){
	    return true; 
    }
    else{
    	return item;
    }
  };
});