/*global angular, messageService, Parse, parseService, hefesoft*/
angular.module('odontologiaApp')
.directive('addPrestadorDirective', function(){
    
    var directive = {};
    
    directive.templateUrl = 'js/hefesoft/Prestador/directives/templates/add.html';
    directive.restrict = 'E';
    directive.controller = 'addPrestadorCtrl';
    
    return directive;
})

.controller('addPrestadorCtrl', function($rootScope, $scope, $state, $stateParams, prestadorService, calendarGetData, modalService){
    
    $scope.prestador = {nombre: '', cedula: '', email : '', especialidad : '', telefono: ''};
    var modo = 'Adicionado';
    
    if($rootScope.prestadorSeleccionado){
        modo = 'Editar';
        $scope.prestador = $rootScope.prestadorSeleccionado;
    }
    
    $scope.save = function(){
        hefesoft.util.loadingBar.start();
        
        //Si ya tiene calendario no lo cree
        if(!$scope.prestador.idCalendar){
            /*Obtiene el id del calendario del prestador creado*/
            calendarGetData.createCalendar($scope.prestador.nombre, 'Dentiline calendar').then(function(result){
                savePrestador(result.id);
            })
        }
        else{
            savePrestador(undefined);
        }
    }
    
    function savePrestador(idCalendar){
        
        if(idCalendar){
            $scope.prestador['idCalendar'] = idCalendar;
        }
        
        prestadorService.save($scope.prestador).then(function(result){
            $scope.prestador = result.toJSON();
            hefesoft.util.loadingBar.complete();
            $rootScope.$broadcast('prestador', { modo: modo, item : $scope.prestador});
            modalService.close();
        })
    }
    
    
})