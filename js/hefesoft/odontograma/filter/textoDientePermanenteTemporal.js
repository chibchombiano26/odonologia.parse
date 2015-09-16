angular.module('odontologiaApp')
.filter('textoDientePermanenteTemporal', function() {
 return function(input) {
    var item = Boolean(input);

    if(item){
    	return "Dientes permanentes";
    }
    else{
    	return "Dientes temporales";	
    }

  };
});