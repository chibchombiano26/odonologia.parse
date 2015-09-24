  angular.module('odontologiaApp')
  .controller('DxListadoCtrl', 
    ['$scope', 'CieCupsServices', '$modal', 'dataTableStorageFactory', '$rootScope', '$q', 'diagnosticosService',
    function ($scope, CieCupsServices, $modal, dataTableStorageFactory, $rootScope, $q, diagnosticosService) {

    var modalInstance;
    $scope.Listado = [];
    $scope.diagnosticoSeleccionado = {};
   
  	function inicializar(){
  	  diagnosticosService.cargarDiagnosticos(Parse.User.current().get("email")).then(function(result){
  		  for (var i = 0; i < result.length; i++) {
			    $scope.Listado.push(result[i].toJSON());
			  }
  	  })
  	}

    $scope.eliminar = function(data, $index){
      var Diagnostico = new Parse.Object.extend("Diagnostico");
      var diagnostico = new Diagnostico();
      diagnostico.id = data.objectId;
      diagnostico.destroy();
    }

    $scope.modificado = function(data){
      var Diagnostico = new Parse.Object.extend("Diagnostico");
      var diagnostico = new Diagnostico();
      diagnostico.id = data.objectId;
      diagnostico.set("nombre", data.nombre);
      diagnostico.set("idiceCie", data.idiceCie);
      diagnostico.set("tipo", data.objectHefesoftTipo);
      diagnostico.set("diagnostico", data.objectHefesoftDiagnostico);
      diagnostico.set("evolucion", data.objectHefesoftEvolucion);
      diagnostico.set("arrayHefesoftTratamientos", data.arrayHefesoftTratamientos);
      diagnostico.save();
    }
   
    
  inicializar();

}])