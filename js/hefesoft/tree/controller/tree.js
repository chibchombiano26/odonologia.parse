/*global angular, hefesoft, Parse, numeral, _*/
angular.module("odontologiaApp")
.controller("treeCtrl", function($scope, $rootScope, $state, treeService, $q, $timeout, tratamientoServices, appScriptTemplateServices, modalService, odontogramService, $translate){
    
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
		hefesoft.util.loadingBar.complete();
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
 			templateid : $translate.instant("FILES.HISTORY"),
            name : $rootScope.currentPacient.nombre, 
            fileName : $translate.instant("REPORT.PRICE") + " "  + $rootScope.currentPacient.nombre, 
            rowsData: [], 
            to: $rootScope.currentPacient.email, 
            subject: $translate.instant("REPORT.PRICE"),
            message : $translate.instant("REPORT.PRICE"),
            clinica:  $translate.instant("REPORT.NAME_OF_MEDICO") + " : "  + Parse.User.current().get("name"),
            direccionClinica : $translate.instant("REPORT.CLINIC_ADDRESS") + " :",
            telefono: $translate.instant("REPORT.CLINIC_PHONE") + " :",
            email: $translate.instant("EMAIL") + " : " + Parse.User.current().get("email"),
            paciente : paciente,
            outTitle : $translate.instant("REPORT.TITLE_OUT"),
            outMessage : $translate.instant("REPORT.MESSAGE")
            
        };
        
        if(Parse.User.current().get('idLogo'))
        {
        	parameters['idLogo'] = Parse.User.current().get('idLogo');
        }
        
        
        if($scope.ElementosHabilitados.odontogramaInicial.existe){
            var Odontograma = hefesoft.util.obtenerTipoOdontograma().toJSON();
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
		hefesoft.util['tipoOdontograma'] = $translate.instant("SAVE_ODONTOGRAMA.INITIAL");
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
        
        var Odontograma = angular.copy(hefesoft.util.obtenerTipoOdontograma()).toJSON();
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
		hefesoft.util['tipoOdontograma'] = $translate.instant("SAVE_ODONTOGRAMA.THREATMENT_PLAN");
		hefesoft.util['infoPaciente'] = $scope.ElementosHabilitados;
        $state.go("pages.planTratamiento", { diagnosticoPacienteId : $scope.paciente.objectId});
    }
    
    function tutorial() {
        
        if (!hefesoft.getStorageObject("tutorialTree")) {
            hefesoft.tutorial.inicializar(3);
            hefesoft.saveStorageObject("tutorialTree", {
                mostrarTutorial: true
            });
        }
    }
    
    
    function crearOdontogramaInicial(odontogramaCargado) {
        if (odontogramaCargado.existe === false) {
            hefesoft.util.loadingBar.start();
            odontogramService.generarOdontogramaBase({
                pacienteId: $scope.paciente.objectId,
                tipo : $translate.instant("SAVE_ODONTOGRAMA.INITIAL")
            }).then(function(data) {
                hefesoft.util.loadingBar.complete();
                inicializar();
            });
        }
    }
    
    function inicializar(){
        if($scope.paciente){
            
            var odontogramaInicialQuery = treeService.odontograma($scope.paciente.objectId, $translate.instant("SAVE_ODONTOGRAMA.INITIAL"), "descending");
            var cotizacionQuery = treeService.cotizacion($scope.paciente.objectId);
            var odontogramaActualQuery = treeService.odontograma($scope.paciente.objectId, null, "descending");
            
            hefesoft.util.loadingBar.start();
            $q.all([odontogramaInicialQuery, cotizacionQuery, odontogramaActualQuery]).then(function(result){
                var odontogramaInicial = result[0];
                var cotizacion = result[1];
                var OdontogramaActual = result[2];
                
                $scope.ElementosHabilitados = { odontogramaInicial : result[0], cotizacion : cotizacion, odontogramaActual : OdontogramaActual}
                hefesoft.util.loadingBar.complete();
                
                crearOdontogramaInicial(odontogramaInicial);
                
                $timeout(function(){
                    tutorial();    
                }, 2000);
                
                
                
            })
            
        }
    }
    
    // Obtiene el odontograma que este disponible
    hefesoft.util.obtenerTipoOdontograma = function(){
        if($scope.ElementosHabilitados.odontogramaActual && $scope.ElementosHabilitados.odontogramaActual.existe){
            return $scope.ElementosHabilitados.odontogramaActual.valor;    
        }
        else{
            return $scope.ElementosHabilitados.odontogramaInicial.valor;    
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