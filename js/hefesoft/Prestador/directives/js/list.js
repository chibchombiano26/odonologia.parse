/*global angular, messageService, Parse, parseService, hefesoft*/
angular.module('odontologiaApp')
.directive('listPrestadorDirective', function(){
    
    var directive = {};
    
    directive.templateUrl = 'js/hefesoft/Prestador/directives/templates/list.html';
    directive.restrict = 'E';
    directive.controller = 'listPrestadorCtrl';
    
    return directive;
})

.controller('listPrestadorCtrl', function($rootScope, $scope, $state, $stateParams, prestadorService, calendarGetData){
    
    $scope.listado = [];
    
    function inicializar(){
        
        hefesoft.util.loadingBar.start();
        prestadorService.list().then(function(result){
            $scope.listado = [];
            hefesoft.util.loadingBar.complete();
            for (var i = 0; i < result.length; i++) {
                var item = result[i].toJSON();
                $scope.listado.push(item);
            }
        })
    }
    
    $scope.nueva = function(){
        $rootScope['prestadorSeleccionado'] = undefined; 
        $rootScope.$broadcast('openPopUp', { size: "lg", template : 'js/hefesoft/Prestador/add.html'});
    }
    
    $scope.editar = function(item){
        $rootScope['prestadorSeleccionado'] = item; 
        $rootScope.$broadcast('openPopUp', { size: "lg", template : 'js/hefesoft/Prestador/add.html'});
    }
    
    $scope.eliminar = function(item, $index){
        calendarGetData.deleteCalendar(item.idCalendar);
        prestadorService.destroy(item.objectId);
        $scope.listado.splice($index, 1);
    }
    
    $rootScope.$on('prestador', function(event, payload) {
        var modo = payload.modo;
        
        if(modo === "Adicionado"){
            $scope.listado.push(payload.item);
        }
        else{
            inicializar();
        }
    })
    
    inicializar();
    
})