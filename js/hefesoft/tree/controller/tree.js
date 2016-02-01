/*global angular, hefesoft, Parse*/
angular.module("odontologiaApp")
.controller("treeCtrl", function($scope, $rootScope, $state, treeService, $q, tratamientoServices){
    
    $scope.paciente = hefesoft.util['pacienteSeleccionado'];
    $scope.ElementosHabilitados = {};
    
    $scope.opcionSeleccionada = function(tipo, paciente){
        
        hefesoft.util.loadingBar.start();
        
        switch (tipo) {
            case 'adjuntos':
                adjuntos();
                break;
            case 'odontograma inicial':
                odontogramaInicial();   
                break;
            case 'email':
                $state.go("pages.email", {recipient: $scope.paciente.email}, {reload: true})
                break;
            case 'editar':
                $state.go("pages.paciente", { pacienteId: $scope.paciente.email} , {reload: true});
                break;
            case 'eliminar':
                $state.go("pages.paciente", { pacienteId: $scope.paciente.email} , {reload: true});
                break;
            case 'cotizacion':
                cotizacion();
                break;
            case 'odontograma de tratamiento':
                odontogramaInicial();
                break;
            case 'Plan de tratamiento':
                planTratamiento();
                break;
            
            
            
            default:
                // code
        }
        
    }
    
    function odontogramaInicial(){
        var item = $scope.paciente;
        $rootScope.currentPacient = item;
		$scope.Paciente = item;
		hefesoft.util['tipoOdontograma'] = "Inicial";
		$state.go("pages.odontograma", {"diagnosticoPacienteId": $scope.paciente.objectId});
    }
    
    function adjuntos(){
        var item = $scope.paciente;
        $rootScope.currentPacient = item;
		$scope.Paciente = item;
		$state.go("pages.picker", { pacienteId: item.objectId}, {reload: true});
    }
    
    function eliminarPaciente(){
        var item = $scope.paciente;
    	var Paciente = Parse.Object.extend("Paciente");
		var paciente = new Paciente;
		paciente.set("id", item.objectId);
		paciente.destroy();
    }
    
    function cotizacion(){
        
        
        var Odontograma = $scope.ElementosHabilitados.odontogramaInicial.valor.toJSON();
        var item = $scope.paciente;
        $rootScope.currentPacient = item;
		$scope.Paciente = item;
        
    	hefesoft.util['listadoDiagnosticos'] = tratamientoServices.extraerTodosDiagnosticos(Odontograma.listado);
	  	hefesoft.util['pacienteSeleccionado'] = $rootScope.currentPacient;
	  	$state.go("pages.cotizador");
    }
    
    function planTratamiento(){
        var item = $scope.paciente;
        $rootScope.currentPacient = item;
		$scope.Paciente = item;
		hefesoft.util['tipoOdontograma'] = "Plan de tratamiento";
        $state.go("pages.planTratamiento", { diagnosticoPacienteId : $scope.paciente.objectId});
    }
    
    function inicializar(){
        if($scope.paciente){
            
            var odontogramaInicialQuery = treeService.odontogramaInicial($scope.paciente.objectId);
            var cotizacionQuery = treeService.cotizacion($scope.paciente.objectId);
            
            
            $q.all([odontogramaInicialQuery, cotizacionQuery]).then(function(result){
                var odontogramaInicial = result[0];
                var cotizacion = result[1];
                
                $scope.ElementosHabilitados = { odontogramaInicial : result[0], cotizacion : cotizacion}
            })
            
        }
    }
    
    inicializar();
    
})