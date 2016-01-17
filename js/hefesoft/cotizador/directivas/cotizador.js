/*global angular, _, Parse, numeral*/
angular.module("odontologiaApp")
.directive('cotizador', function(){
    
    var directiva = {};
    directiva.templateUrl = "js/hefesoft/cotizador/template/cotizador.html";
    directiva.controller = "cotizadorCtrl";
    
    return directiva;
    
})

.controller('cotizadorCtrl', function($scope, appScriptTemplateServices){
    
    $scope.listado = [];
    $scope.footer = { suma : 0 };
    $scope.mostrarDiagnosticoInfo = false;
    
    $scope.dxSeleccionado = function(item){
        
        var elemento = angular.copy(item);
        elemento["valor"] = _.sumBy(elemento.arrayHefesoftTratamientos, function(o){ return parseFloat(o.valor);});
        $scope.listado.push(elemento);
        
        $scope.footer.suma = _.sumBy($scope.listado, function(o) { return parseFloat(o.valor); });
    }
    
    $scope.eliminar = function(item, $index){
        $scope.listado.splice($index, 1);
        
        $scope.footer.suma = _.sumBy($scope.listado, function(o) { return parseFloat(o.valor); });
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
    
})
