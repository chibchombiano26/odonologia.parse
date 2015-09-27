angular.module('directivas').
service('piezasDentalesServices', [function () {

	var dataFactory = {};
	var PiezasDentales = [];

	dataFactory.addPieza = function(item){
		PiezasDentales.push(item);
	}

	dataFactory.fijarPiezasDentales = function(data){
		PiezasDentales = data;
	}

	dataFactory.getModifiedPiezas = function(fijarModificado){
		return PiezasDentales;
	}

	dataFactory.setModified = function(number){
		var pieza = dataFactory.getPiezaByNumber(number);
		if(pieza){
		  pieza["Modificado"] = true;
		}
	}

	dataFactory.getPiezaByNumber = function(number){

	  var item = _.findIndex(PiezasDentales, function(chr) {
		  return chr.codigo == number;
	   });

	  var Pieza = PiezasDentales[item]; 
	  return Pieza;

	}

	dataFactory.getPiezaByNombre = function(numeroPiezaDental){

	  var item = _.findIndex(PiezasDentales, function(chr) {
		  return chr.numeroPiezaDental == numeroPiezaDental;
	   });

	  var Pieza = PiezasDentales[item]; 
	  return Pieza;

	}

	function fijarModificadoFalso(){
		for (var i = 0; i < PiezasDentales.length; i++) {
			var item = PiezasDentales[i];
			if(item.Modificado == true){
				item.Modificado = false;
			}
		}
	}

	return dataFactory;
	
}])