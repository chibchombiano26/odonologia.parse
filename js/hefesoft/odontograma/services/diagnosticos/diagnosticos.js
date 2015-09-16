angular.module('odontologiaApp')
.service('diagnosticoServices', [function () {

	var dataFactory = {};

	dataFactory.extraerDesdeDiagnostico = function(elementoDevolver){
	
	 var partes = ['centro','izquierda','derecha','abajo','arriba','inferior','superior'];

	 for (var i = partes.length - 1; i >= 0; i--) {
	        var arrayNombre = partes[i] + "Diagnosticos_arrayHefesoft";

	        if(angular.isDefined(elementoDevolver[arrayNombre])){

	            //Eje item.centro_objectHefesoft.color
	            var nombreObjetoCrear = partes[i] + "_objectHefesoft";
	            var itemsEnSupericie = elementoDevolver[arrayNombre];
	            //saca el ultimo diagnostico para esta superficie
	            var diagnostico = itemsEnSupericie[0];

	            if(angular.isDefined(diagnostico) && angular.isDefined(diagnostico.objectHefesoftDiagnostico))
	            {

		            if(angular.isUndefined(elementoDevolver[nombreObjetoCrear])){
		            	elementoDevolver[nombreObjetoCrear] = {};
		        	}

		            elementoDevolver[nombreObjetoCrear].color = diagnostico.objectHefesoftDiagnostico.color;
		            elementoDevolver[nombreObjetoCrear].simbolo = diagnostico.objectHefesoftDiagnostico.simbolo;
		            elementoDevolver[nombreObjetoCrear].fuente = diagnostico.objectHefesoftDiagnostico.fuente;
		            elementoDevolver[nombreObjetoCrear].pathImagen = diagnostico.objectHefesoftDiagnostico.pathImagen;
	        	}
	        	else{

	        		diagnostico = {};
	        		diagnostico.objectHefesoftDiagnostico = {};

	        		elementoDevolver[nombreObjetoCrear].color = undefined;
		            elementoDevolver[nombreObjetoCrear].simbolo = undefined;
		            elementoDevolver[nombreObjetoCrear].fuente = undefined;
		            elementoDevolver[nombreObjetoCrear].pathImagen = undefined;
	        	}
	        }      
	 };

     return elementoDevolver;
   }


   /*
   	Mostrar el ultimo color o texto por superficie
   */
   dataFactory.extraerUltimoDiagnosticoPorSuperficie = function(elementoDevolver){
	
	 var partes = ['centro','izquierda','derecha','abajo','arriba','inferior','superior'];

	 for (var i = partes.length - 1; i >= 0; i--) {
	        var arrayNombre = partes[i] + "Diagnosticos_arrayHefesoft";

	        //Eje item.centro_objectHefesoft.color
            var nombreObjetoCrear = partes[i] + "_objectHefesoft";
            var itemsEnSupericie = elementoDevolver[arrayNombre];
            

	        if(angular.isDefined(elementoDevolver[arrayNombre]) && elementoDevolver[arrayNombre].length > 0 ){

	        	//saca el ultimo diagnostico para esta superficie   
	            var diagnostico = itemsEnSupericie[0];

	            if(angular.isUndefined(elementoDevolver[nombreObjetoCrear])){
	            	elementoDevolver[nombreObjetoCrear] = {};
	        	}

	            elementoDevolver[nombreObjetoCrear].color = diagnostico.objectHefesoftDiagnostico.color;
	            elementoDevolver[nombreObjetoCrear].simbolo = diagnostico.objectHefesoftDiagnostico.simbolo;
	            elementoDevolver[nombreObjetoCrear].fuente = diagnostico.objectHefesoftDiagnostico.fuente;
	            elementoDevolver[nombreObjetoCrear].pathImagen = diagnostico.objectHefesoftDiagnostico.pathImagen;
	        }
	        else{
	        	elementoDevolver[nombreObjetoCrear].color = undefined;
	            elementoDevolver[nombreObjetoCrear].simbolo = undefined;
	            elementoDevolver[nombreObjetoCrear].fuente = undefined;
	            elementoDevolver[nombreObjetoCrear].pathImagen = undefined;
	        }
	 };

     return elementoDevolver;
   }

    /*
		Valida si ya existe el diagnostico
	 */
	dataFactory.validarYaExisteDiagnostico =  function (superficie, diagnosticoAdicionar, piezaDental){
	 	var arrayNombre = superficie + "Diagnosticos_arrayHefesoft";

	 	if(angular.isUndefined(piezaDental[arrayNombre])){
	 		return true;
	 	}
	 	
	 	var result = _.findIndex(piezaDental[arrayNombre], { 'RowKey': diagnosticoAdicionar.RowKey });

	 	if(result >= 0){
	 		return false;
	 	}
	 	else{
	 		return true;
	 	}
	 }

	return dataFactory;
	
}])