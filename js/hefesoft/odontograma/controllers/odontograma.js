angular.module('odontologiaApp')
.controller('odontogramaCtrl', ['$scope', 
	function ($scope) {

	$scope.piezasDentales = { Permanente : true };
	$scope.permanente = false;
	$scope.numeroPiezaModificada = {};
	$scope.piezasDentalesScope = {};

	//Propaga el elemento hacia abajo
	$scope.$watch('numeroPiezaModificada', function(e) {      
      if(e){
      	$scope.numeroPiezaModificada = e;      	
      } 
    });

	$scope.modificado = function(item){		
		$scope.fnModificado($scope.$parent, { 'item' : item });
	}

	$scope.clickPiezaDental = function(item){
		if(angular.isDefined($scope.fnClick) && angular.isFunction($scope.fnClick)){
			$scope.fnClick($scope.$parent, { 'item' : item });
		}
	}

	$scope.odontogramaCargado = function(item){

		if(angular.isDefined($scope.fnOdontogramaBaseCargado) && angular.isFunction($scope.fnOdontogramaBaseCargado)){
			$scope.fnOdontogramaBaseCargado($scope.$parent, { 'item' : item });
		}
	}
}])