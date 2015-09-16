angular.module('odontologiaApp')
.controller('piezasDentalesPeriodontogramaCtrl', 
	['$scope', 'dataTableStorageFactory', '$rootScope', 'piezasDentalesPeriodontogramaServices',
	function ($scope, dataTableStorageFactory, $rootScope, piezasDentalesServices) {

	var i = 0;	
    $scope.zoom = 0.7;
    $scope.items = [];

	
	$scope.obtenerPeriodontogramaBase = function (){
        dataTableStorageFactory.getJsonData('Periodontograma.json').success(function (data) {               
            $scope.items = data;
            piezasDentalesServices.fijarPiezasDentales($scope.items);            
            if(angular.isDefined($scope.fnPeriodontogranaBaseCargado) && angular.isFunction($scope.fnPeriodontogranaBaseCargado)){
                $scope.fnPeriodontogranaBaseCargado($scope.$parent, { 'item' : data });
            }

        })
        .error(function (error) {
            console.log(error);
        });
    }

    $scope.clickPiezaDental = function(item){

        if(angular.isDefined($scope.fnPiezaDental) && angular.isFunction($scope.fnPiezaDental)){
            $scope.fnPiezaDental($scope.$parent, { 'item' : item });
         }
    }

    $scope.actualizarPiezas = function(elementosActualizar){

        for (var i = elementosActualizar.length - 1; i >= 0; i--) {
            var pieza = elementosActualizar[i];

            var index = _.findIndex($scope.items, function(chr) {
              return chr.codigo == pieza.codigo;
            });

           if(index >= 0){
                $scope.items[index] = pieza;
           }            
        };
    }
}])