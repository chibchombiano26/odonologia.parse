/*
	Cuando no venga un simbolo en el binding pone un espacio en la supericie
*/

/* global angular*/
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
  
  switch (item.toLocaleLowerCase()) {
   case 'centro':
    return "Oclusal";
   case 'izquierda':
    return "Distal";
   case 'derecha':
    return "Mesial";
   case 'arriba':
    return "Vestibular";
   case 'abajo':
    return "Lingual o Palatino";
   case 'piezacompleta':
    return 'Pieza Completa';
   
   default:
    return item;
  }
  
 }
 
})