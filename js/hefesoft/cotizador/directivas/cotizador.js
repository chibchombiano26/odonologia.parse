/*global angular, _, Parse, numeral, hefesoft*/
angular.module("odontologiaApp")
.directive('cotizador', function(){
    
    var directiva = {};
    directiva.templateUrl = "js/hefesoft/cotizador/template/cotizador.html";
    directiva.controller = "cotizadorCtrl";
    
    return directiva;
    
})

.controller('cotizadorCtrl', function($scope, $rootScope, $state, appScriptTemplateServices, modalService, cotizacionService, $q, $translate){
    
    $scope.listado = [];
    $scope.footer = { suma : 0 };
    $scope.mostrarDiagnosticoInfo = false;
    
    $scope.dxSeleccionado = function(item){
        
        var elemento = angular.copy(item);
        elemento["valor"] = _.sumBy(elemento.arrayHefesoftTratamientos, function(o){ return parseFloat(o.valor);});
        $scope.listado.push(elemento);
        sumar();
    }
    
    $scope.eliminar = function(item, $index){
        $scope.listado.splice($index, 1);
        sumar();
    }
    
    $scope.buscarCotizacion = function(){
        var deferred = $q.defer();
 		 modalService.open('lg', 'js/hefesoft/cotizador/template/buscadorCotizacionesModal.html', 'buscarCotizacionModalCtrl', undefined, function(e){
 		 	modalService.close();
 	        
 	        $scope.listado = e.listado;
 	        sumar();
 		 })
 		return deferred.promise;
    }
    
    $scope.limpiar = function(){
        $scope.listado = [];
        sumar();
        
        if(hefesoft.util['pacienteSeleccionado']){
            delete hefesoft.util.pacienteSeleccionado;
        }
        
        if(hefesoft.util['listadoDiagnosticos']){
            delete hefesoft.util.listadoDiagnosticos;
        }
    }
    
    $scope.guardarCommand = function(){
 		var deferred = $q.defer();
 		 modalService.open('lg', 'js/hefesoft/cotizador/vistas/guardarModal.html', 'guardarCotizacionModal', undefined, function(e){
 		 	modalService.close();
 		 	
 		 	var listado = angular.copy($scope.listado);
 		 	listado = JSON.parse(angular.toJson(listado));
 		 	
 		 	hefesoft.util.loadingBar.start();
 		 	cotizacionService.saveCotizacion(e,  listado).then(function(){
 		 	    hefesoft.util.loadingBar.complete();
 		 	    hefesoft.util['pacienteSeleccionado'] = $rootScope.currentPacient;
				$state.go("pages.tree");    
 		 	})
 		 	
 		 })
 		return deferred.promise;
 	}
    
    $scope.generarCotizacion = function(){
 		
 		var parameters = {
 			templateid : $translate.instant("FILES.BUDGET"),
            name : '', 
            fileName : $translate.instant("REPORT.PRICE") + " ", 
            rowsData: [], 
            to: '', 
            subject: $translate.instant("REPORT.PRICE"),
            message : $translate.instant("REPORT.PRICE"),
            clinica: $translate.instant("REPORT.NAME_OF_MEDICO") + " : "  + Parse.User.current().get("name"),
            direccionClinica : $translate.instant("REPORT.CLINIC_ADDRESS") +  " :",
            telefono: $translate.instant("REPORT.CLINIC_PHONE") + " :",
            email: $translate.instant("REPORT.EMAIL") + " : " + Parse.User.current().get("email"),
            paciente : {},
            outTitle : $translate.instant("REPORT.TITLE_OUT"),
            outMessage : $translate.instant("REPORT.MESSAGE")
        };
        
        if(Parse.User.current().get('idLogo'))
        {
        	parameters['idLogo'] = Parse.User.current().get('idLogo');
        }
        
        var titulos = [$translate.instant("REPORT.NUMBER"), $translate.instant("REPORT.DESCRIPTION"), $translate.instant("REPORT.VALUE")];
        var lista = angular.copy($scope.listado);
        
        
        parameters.rowsData.push(titulos);
        
        for (var i = 0; i < lista.length; i++) {
        	var item = [i, lista[i].nombre, numeral(lista[i].valor).format('$0,0.00')];
        	parameters.rowsData.push(item);
        }
		
        var sumaValor = numeral($scope.footer.suma).format('$0,0.00');
        
        var footer = ['','Total', sumaValor];
        parameters.rowsData.push(footer);
        appScriptTemplateServices.templateWindow(parameters);
 	}
    
    function sumar(){
        $scope.footer.suma = _.sumBy($scope.listado, function(o) { return parseFloat(o.valor); });
    }
    
    function inicializar(){
        if(hefesoft.util['listadoDiagnosticos'] && (hefesoft.util['listadoDiagnosticos']).length > 0){
            _.each(hefesoft.util['listadoDiagnosticos'], function(e){
                $scope.dxSeleccionado(e);
            });
        }
    }
    
    inicializar();
})
