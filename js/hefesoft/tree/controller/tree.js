/*global angular, hefesoft, Parse, numeral, _*/
angular.module("odontologiaApp")
.controller("treeCtrl", function($scope, $rootScope, $state, treeService, $q, tratamientoServices, appScriptTemplateServices, modalService){
    
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
                editar();
                break;
            case 'eliminar':
                eliminarPaciente();
                $state.go("pages.listadopacientes", { pacienteId: $scope.paciente.email} , {reload: true});
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
            case 'periodontograma':
                periodontograma();
                break;
            case 'historia':
                historiaPaciente();
                break;
            default:
                // code
        }
        
    }
    
    function editar(){
        var item = $scope.paciente;
        hefesoft.util['pacienteSeleccionado'] = item;
        modalService.open('lg', 'js/hefesoft/pacientes/views/paciente.html', 'pacientesController', 'my-dialog', function(e) {
            var item = e;
            hefesoft.util['pacienteSeleccionado'] = e;
			modalService.close();
		});
    }
    
    function historiaPaciente(){
        
        var item = $scope.paciente;
        $rootScope.currentPacient = item;
        
        var paciente = angular.copy($rootScope.currentPacient);
 		delete paciente.pictureUrl;
 		delete paciente.objectId;
 		delete paciente.createdAt;
 		delete paciente.updatedAt;
 		
 		var parameters = {
 			templateid : '1Hs8YaOe5dZjzMuw84X4Bipft2NnUK33xovHQ9vKeOEY',
            name : $rootScope.currentPacient.nombre, 
            fileName : "cotizacion "  + $rootScope.currentPacient.nombre, 
            rowsData: [], 
            to: $rootScope.currentPacient.email, 
            subject: "Cotizacion",
            message : "Cotizacion",
            clinica: "Nombre medico : "  + Parse.User.current().get("name"),
            direccionClinica : "Direccion clinica :",
            telefono: "Telefono clinica :",
            email: "Email : " + Parse.User.current().get("email"),
            paciente : paciente
        };
        
        if(Parse.User.current().get('idLogo'))
        {
        	parameters['idLogo'] = Parse.User.current().get('idLogo');
        }
        
        
        if($scope.ElementosHabilitados.odontogramaInicial.existe){
            var Odontograma = $scope.ElementosHabilitados.odontogramaInicial.valor.toJSON();
            var odontogramaListado = Odontograma.listado;
            cotizacionDiagnosticos(parameters, odontogramaListado);
            
            if(Odontograma.snap){
                parameters.snap = Odontograma.snap;
            }
        }

        appScriptTemplateServices.templateWindow(parameters);
        hefesoft.util.loadingBar.complete();
    }
    
    function cotizacionDiagnosticos(parameters, listado){
        
        var titulos = ['Pieza dental', 'Procedimiento', 'Superficie', 'Valor', 'Valor pagado','Saldo'];
        var lista = tratamientoServices.extraerTodosProcedimientos(listado);
        var sumaValor = 0;
        var saldoValor = 0;
        var valorPagado = 0;
        
        
        
        parameters.rowsData.push(titulos);
        
        for (var i = 0; i < lista.length; i++) {
        	var item = [lista[i].numeroPiezaDental, lista[i].nombre, hefesoft.nombreToSuperficie(lista[i].superficie), numeral(lista[i].valor).format('$0,0.00'), numeral(lista[i].valorPagado).format('$0,0.00'), numeral(lista[i].saldo).format('$0,0.00')];
        	parameters.rowsData.push(item);
        }
        
        sumaValor = _.sumBy(lista, function(object) {
		  return parseFloat(object.valor);
		});
		
		saldoValor = _.sumBy(lista, function(object) {
		  return parseFloat(object.saldo);
		});
		
		valorPagado = _.sumBy(lista, function(object) {
		  return parseFloat(object.valorPagado);
		});
        
        sumaValor = numeral(sumaValor).format('$0,0.00');
        saldoValor = numeral(saldoValor).format('$0,0.00');
        valorPagado = numeral(valorPagado).format('$0,0.00');
        
        var footer = ['Total', '', '', sumaValor, valorPagado, saldoValor];
        parameters.rowsData.push(footer);
    }
    
    function periodontograma(){
        var item = $scope.paciente;
        $rootScope.currentPacient = item;
		$scope.Paciente = item;
        $state.go("pages.periodontograma", {"diagnosticoPacienteId": item.objectId});
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
            
            hefesoft.util.loadingBar.start();
            $q.all([odontogramaInicialQuery, cotizacionQuery]).then(function(result){
                var odontogramaInicial = result[0];
                var cotizacion = result[1];
                
                $scope.ElementosHabilitados = { odontogramaInicial : result[0], cotizacion : cotizacion}
                hefesoft.util.loadingBar.complete();
            })
            
        }
    }
    
    $scope.$on('pacienteSeleccionado', function(event, payload) { 
        hefesoft.util['pacienteSeleccionado'] = payload.paciente;
        $scope.paciente = payload.paciente;
        $scope.ElementosHabilitados = {};
        inicializar();
    });
    
    inicializar();
    
})