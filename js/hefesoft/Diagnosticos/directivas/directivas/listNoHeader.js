/*global angular, Parse, _*/
angular.module('odontologiaApp')
.directive('listadosDiagnosticosNoHeader', ['$parse', 
	function ($parse) {

	var directiva = {};
	
	directiva.restrict = "E";
	directiva.templateUrl = "js/hefesoft/Diagnosticos/directivas/template/DiagnosticosNoHeader.html";
	
	directiva.scope = {
		modoLectura : "=",
		source : "=",
		source1 : "=",
		source2 : "=",
		source3 : "=",
		source4 : "=",
		source5 : "=",
		
		sourceLabel : "=",
		source1Label : "=",
		source2Label : "=",
		source3Label : "=",
		source4Label : "=",
		source5Label : "=",
		
    verSuperficie : '=',
    ocultarEliminar : "=",
    tituloTabla : "="
	};

	directiva.controller = "listadosDiagnosticosCtrl";

	directiva.link = function (scope, iElement, attrs) {
    
	   var existClick = attrs['tratamientosCallback'];
       if(angular.isDefined(existClick)){
          scope.fnTratamientos = $parse(attrs['tratamientosCallback']);
       }

       var existClick = attrs['modificadoCallback'];
       if(angular.isDefined(existClick)){
          scope.fnFinModificado = $parse(attrs['modificadoCallback']);
       }

       existClick = attrs['editCallback'];
       if(angular.isDefined(existClick)){
          scope.fnEdit = $parse(attrs['editCallback']);
       }

      
       existClick = attrs['eliminarCallback'];
       if(angular.isDefined(existClick)){
          scope.fnEliminar = $parse(attrs['eliminarCallback']);
       }

       existClick = attrs['newCallback'];
       if(angular.isDefined(existClick)){
          scope.fnNew = $parse(attrs['newCallback']);
       }
			
	}

	return directiva;	
}])

.controller('listadosDiagnosticosCtrl', ['$scope', '$modal', 
	function ($scope, $modal) {
	
	$scope.diagnosticoSeleccionado;
	
	$scope.test = function(item){
	  
	}

	$scope.openTratamiento = function(item){
		if(angular.isDefined($scope.fnTratamientos) && angular.isFunction($scope.fnTratamientos)){
			$scope.fnTratamientos($scope.$parent, { 'item' : item });
		}

		$scope.openTratamiento(item);
	}

	$scope.open = function(item){
		if(angular.isDefined($scope.fnEdit) && angular.isFunction($scope.fnEdit)){
			$scope.fnEdit($scope.$parent, { 'item' : item });
		}

		$scope.openEdit(item);
	}

	$scope.new = function(){
		if(angular.isDefined($scope.fnNew) && angular.isFunction($scope.fnNew)){
			$scope.fnEdit($scope.$parent);
		}

		$scope.openEdit();
	}

	$scope.eliminar = function(source, item, $index){
    
    source.splice($index, 1);
    
		if(angular.isDefined($scope.fnEliminar) && angular.isFunction($scope.fnEliminar)){
			$scope.fnEliminar($scope.$parent, { 'item' : item, '$index' : $index });
		}
	}

	/****************** Tratamientos pop up ******************/
  $scope.openTratamiento = function (seleccionado) {
      $scope.diagnosticoSeleccionado = seleccionado;
      modalInstance = $modal.open({
      animation: true,
      templateUrl: 'js/hefesoft/tratamientos/views/listadoTratamientosProcedimientos.html',
      controller : 'listadoProcedimientosTratamientosCtrl',
      size: 'lg',
      windowClass: 'my-dialog',
      backdrop : 'static',
      resolve: {
        dxSeleccionado : function () {
          return $scope.diagnosticoSeleccionado;
        }
      }
  });
    modalInstance.result.then(closed);   
  };

  function closed(data){
    if(angular.isDefined($scope.fnFinModificado) && angular.isFunction($scope.fnFinModificado)){
		  $scope.fnFinModificado($scope.$parent, { 'item' : $scope.diagnosticoSeleccionado });
	  }
  }

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
 /*****************************************************/

/****************** Editar ******************/
$scope.openEdit = function (seleccionado) {
 var modalInstance = $modal.open({
    animation: true,
    templateUrl: 'js/hefesoft/Diagnosticos/views/addDiagnostico.html',
    controller: 'AddDxCtrl',
    size: 'lg',
    resolve: {
      dxSeleccionado : function () {
        return seleccionado;
      }
    }
  });

modalInstance.result.then(function (selectedItem) {
    $scope.selected = selectedItem;
  }, 
  function (data) {
    if(data !==  "backdrop click" && !angular.isUndefined(data)){
      
      if(data.modo === "Insercion"){
        $scope.source.push(data);
      }

      if(angular.isDefined($scope.fnFinModificado) && angular.isFunction($scope.fnFinModificado)){
		    $scope.fnFinModificado($scope.$parent, { 'item' : $scope.diagnosticoSeleccionado });
	    }          
    }
  });
};
}])