/*global angular, _, Parse, numeral, hefesoft*/
angular.module("odontologiaApp")
.directive('cotizador', function(){
    
    var directiva = {};
    directiva.templateUrl = "js/hefesoft/cotizador/template/cotizador.html";
    directiva.controller = "cotizadorCtrl";
    
    return directiva;
    
})

.controller('cotizadorCtrl', function($scope, appScriptTemplateServices, modalService, cotizacionService, $q){
    
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
 		 	
 		 	cotizacionService.saveCotizacion(e,  listado);
 		 	
 		 })
 		return deferred.promise;
 	}
    
    $scope.generarCotizacion = function(){
 		
 		var parameters = {
 			templateid : '1F-fnU4-KIs1LQY1l2qkfgq6uxNwGLHwFulx31GNjOSY',
            name : '', 
            fileName : "cotizacion ", 
            rowsData: [], 
            to: '', 
            subject: "Cotizacion",
            message : "Cotizacion",
            clinica: "Nombre medico : "  + Parse.User.current().get("name"),
            direccionClinica : "Direccion clinica :",
            telefono: "Telefono clinica :",
            email: "Email : " + Parse.User.current().get("email"),
            paciente : {}
        };
        
        if(Parse.User.current().get('idLogo'))
        {
        	parameters['idLogo'] = Parse.User.current().get('idLogo');
        }
        
        var titulos = ['Numero', 'Descripcion', 'Valor'];
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
