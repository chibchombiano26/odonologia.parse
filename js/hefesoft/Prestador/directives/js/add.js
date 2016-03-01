/*global angular, messageService, Parse, parseService, hefesoft*/
angular.module('odontologiaApp')
.directive('addPrestadorDirective', function(){
    
    var directive = {};
    
    directive.templateUrl = 'js/hefesoft/Prestador/directives/templates/add.html';
    directive.restrict = 'E';
    directive.controller = 'addPrestadorCtrl';
    
    return directive;
})

.controller('addPrestadorCtrl', function($rootScope, $scope, $state, $stateParams, prestadorService, calendarGetData, modalService, driveApiUpload, $translate){
    
    $scope.prestador = {nombre: '', cedula: '', email : '', especialidad : '', telefono: ''};
    var modo = $translate.instant('SAVE');
    
    if($rootScope.prestadorSeleccionado){
        modo = $translate.instant('EDIT');
        $scope.prestador = $rootScope.prestadorSeleccionado;
    }
    
    $scope.prestador['pictureUrl'] = hefesoft.generoPic($scope.prestador, "genero");
    
    
    $scope.changeImage = function(file){
        hefesoft.util.loadingBar.start();
        driveApiUpload.insertFile(file,file.name, false, 'binary', "Fotos prestadores").then(function(link){
			hefesoft.util.loadingBar.complete();
			$scope.prestador.pictureUrl = "https://docs.google.com/uc?id=" + link.id;
			
			if(modo == $translate.instant('EDIT')){
			    prestadorService.save($scope.prestador);
			}
		})
	}
	
	$scope.genero = function() {
	    $scope.prestador['pictureUrl'] = hefesoft.generoPic($scope.prestador, "genero");
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
            
            //Volverlo publico
            calendarGetData.updateAcl($scope.prestador.idCalendar, "freeBusyReader");
        })
    }
    
    
})