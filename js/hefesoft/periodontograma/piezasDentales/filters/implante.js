angular.module('odontologiaApp')
.filter('implanteFilter', function () {
  return function (item) {      
  	if(!angular.isUndefined(item)){    	
  		
  		if(item.implante == ""){
			if(item.parte == "parte1" || item.parte == "parte2"){
				item.rutaPiezaDental = "img/Periodontograma/periodontograma-dientes-arriba-" +  item.numeroPiezaDental + ".png";		
			}
			else if(item.parte == "parte3" || item.parte == "parte4"){
				item.rutaPiezaDental = "img/Periodontograma/periodontograma-dientes-abajo-" +  item.numeroPiezaDental + ".png";		
			}
		}

		else if(item.implante == "tornillo"){
			if(item.parte == "parte1" || item.parte == "parte2"){
				item.rutaPiezaDental = "img/Periodontograma/periodontograma-dientes-arriba-tornillo-" +  item.numeroPiezaDental + ".png";				
			}
			else if(item.parte == "parte3" || item.parte == "parte4"){
				item.rutaPiezaDental = "img/Periodontograma/periodontograma-dientes-abajo-tornillo-" +  item.numeroPiezaDental + ".png";		
			}
		}

		else if(item.implante == "tachado"){
			if(item.parte == "parte1" || item.parte == "parte2"){
				item.rutaPiezaDental = "img/Periodontograma/periodontograma-dientes-arriba-tachados-" +  item.numeroPiezaDental + ".png";				
			}
			else if(item.parte == "parte3" || item.parte == "parte4"){
				item.rutaPiezaDental = "img/Periodontograma/periodontograma-dientes-abajo-tachados-" +  item.numeroPiezaDental + ".png";		
			}
		}

		return item.rutaPiezaDental;

    }
    else{
    	return item;
    }
  };
})

.filter('furcaFilter', function () {
  return function (item) {      
  	if(!angular.isUndefined(item)){    	
  		
  		if(item.tipoFurca == "vacio"){			
			item.tipoFurca = "";
		}
		else if(item.tipoFurca == ""){			
			item.tipoFurca = "";
		}
		else if(item.tipoFurca == "mediolleno"){
			item.tipoFurca = "img/Periodontograma/mediolleno.png";
		}
		else if(item.tipoFurca == "lleno"){
			item.tipoFurca = "img/Periodontograma/lleno.png";
		}
		else if(item.tipoFurca == "cuadrado"){
			item.tipoFurca = "img/Periodontograma/cuadrado.png";
		}
		else if(item.tipoFurca == "circulo_vacio"){
			item.tipoFurca = "img/Periodontograma/vacio.png";
		}		

		return item.tipoFurca;

    }
    else{
    	return item;
    }
  };
});