Array.prototype.concatByReference = function(array){
	
	for (var i = array.length - 1; i >= 0; i--) {
			this.push(array[i]);
		};
}

Array.prototype.obtenerElementoPorPropiedad = function(propiedad){
	var listadoRetorno = [];

	for (var i = this.length - 1; i >= 0; i--) {
		if(angular.isDefined(this[i][propiedad]) && this[i][propiedad].length > 0){
			listadoRetorno.push(this[i]);
		}
	};

	return listadoRetorno;
}