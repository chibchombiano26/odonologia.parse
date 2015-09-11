angular.module('Util')
.filter('AceptadoDenegado', function () {
  return function (item) {      
  		if(item === "0" ){
  			return "En aprobacion";
  		}
  		else if(item === "1" ){
  			return "Aceptada";
  		}
  		else if(item === "2" ){
  			return "Denegada";
  		}
      else if(item === "3" ){
        return "Cancelado";
      }
  		else{
  			return "NA";
  		}
  };
});
