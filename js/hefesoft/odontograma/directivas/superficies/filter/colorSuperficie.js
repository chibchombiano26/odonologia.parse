/*
	Cuando no venga un simbolo en el binding pone un espacio en la supericie
*/

angular.module('odontologiaApp')
.filter('colorSuperficie', function() {
 return function(input) {
    
    if(input){
    	return input;
    }
    else{
    	return 'Transparent';	
    }

  };
});