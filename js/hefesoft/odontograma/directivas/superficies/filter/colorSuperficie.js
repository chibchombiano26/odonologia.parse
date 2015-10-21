/*
	Cuando no venga un simbolo en el binding pone un espacio en la supericie
*/

/* global angular, hefesoft*/
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
})

.filter('nombreSuperficie', function(){
 
 return function(item){
  
  return hefesoft.nombreToSuperficie(item);
  
 }
 
})