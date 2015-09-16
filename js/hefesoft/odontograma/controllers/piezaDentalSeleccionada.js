angular.module('odontologiaApp')
.controller('piezaDentalSeleccionadaCtrl', ['$scope', '$modalInstance', 'diagnostico', 'tratamiento', 'piezaDental', 'diagnosticoServices',
	function ($scope, $modalInstance, diagnostico, tratamiento, piezaDental, diagnosticoServices) {

	$scope.piezaDental = piezaDental;

	 /* 
	 	Se le agregan a la superficie seleccionada los procedimientos y tratamientos
	    que se encuentran dentro del bjeto diagnostico 
	 */

	 $scope.clickSuperficie = function(superficie){
	 	var uuid = chance.string({length: 40});
 	 	var diagnosticoAdicionar = angular.copy(diagnostico);
 	 	diagnosticoAdicionar.superficie = superficie;
 	 	diagnosticoAdicionar.uuid = uuid;

 	 	diagnosticoAdicionar.numeroPiezaDental = piezaDental.numeroPiezaDental; 
 	 	diagnosticoAdicionar.codigo = piezaDental.codigo; 

 	 	if(diagnosticoServices.validarYaExisteDiagnostico(superficie,diagnosticoAdicionar, piezaDental)){
			agregarElementoDiagnosticoASuperficie(superficie, diagnosticoAdicionar, diagnosticoAdicionar.numeroPiezaDental, uuid, diagnosticoAdicionar.codigo);
			$scope.piezaDental = diagnosticoServices.extraerDesdeDiagnostico($scope.piezaDental);
		}
	 }

	 /*
		Se agrega el elemento diagnostico a la superficies para cuando se persista
		quede guarado el diagnostico que se realizo
	 */
	 function agregarElementoDiagnosticoASuperficie(superficie, diagnosticoAdicionar, numeroPiezaDental, uuid, codigo){
	 	var arrayNombre = superficie + "Diagnosticos_arrayHefesoft";

	 	if(angular.isUndefined($scope.piezaDental[arrayNombre])){
	 		$scope.piezaDental[arrayNombre] = [];
	 	}


	 	adicionarATratamientos(diagnosticoAdicionar, numeroPiezaDental, superficie, uuid, codigo);
	 	$scope.piezaDental[arrayNombre].push(diagnosticoAdicionar);


	 }

	 //Agrega el numero de pieza dental y superficie a procedimientos tratamientos de un diagnostico
	 function adicionarATratamientos(diagnostico, numeroPiezaDental, superficie, uuid, codigo){
	 	if(angular.isDefined(diagnostico.arrayHefesoftTratamientos)){
		 	for (var i = diagnostico.arrayHefesoftTratamientos.length - 1; i >= 0; i--) {
		 		diagnostico.arrayHefesoftTratamientos[i]['numeroPiezaDental'] = numeroPiezaDental;
		 		diagnostico.arrayHefesoftTratamientos[i]['superficie'] = superficie;
		 		diagnostico.arrayHefesoftTratamientos[i]['uuid'] = uuid;
		 		diagnostico.arrayHefesoftTratamientos[i]['codigo'] = codigo;
		 		adicionarAProcedimientos(diagnostico.arrayHefesoftTratamientos[i], numeroPiezaDental, superficie, uuid, codigo);
		 	};
	 	}
	 }

	 function adicionarAProcedimientos(Tratamiento, numeroPiezaDental, superficie, uuid, codigo){

	 	for (var i = Tratamiento.arrayHefesoftProcedimientos.length - 1; i >= 0; i--) {
	 		Tratamiento.arrayHefesoftProcedimientos[i]['numeroPiezaDental'] = numeroPiezaDental;
	 		Tratamiento.arrayHefesoftProcedimientos[i]['superficie'] = superficie;
	 		Tratamiento.arrayHefesoftProcedimientos[i]['uuid'] = uuid;
	 		Tratamiento.arrayHefesoftProcedimientos[i]['codigo'] = codigo;
	 	};
	 }
}])