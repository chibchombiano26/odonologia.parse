/*global angular, hefesoft*/
angular.module('odontologiaApp')
.controller('guardarOdontogramaModal', function($scope, callback){
    
    $scope.mostrarOtro = false;
    $scope.odontograma = {observaciones : "", tipoSeleccionado : ""};
    
    if(hefesoft.util['tipoOdontograma']){
        $scope.odontograma.tipoSeleccionado = hefesoft.util['tipoOdontograma'];
    }
    
    $scope.tipoOdontograma = function(){
        if($scope.odontograma.tipoSeleccionado === "Otro"){
            $scope.mostrarOtro = true;
            $scope.odontograma.tipoSeleccionado = "";
        }
        else{
            $scope.mostrarOtro = false;        
        }
    }
    
    $scope.save = function(){
        callback($scope.odontograma);
    }
    
})