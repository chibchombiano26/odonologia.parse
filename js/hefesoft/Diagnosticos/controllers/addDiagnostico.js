  angular.module('odontologiaApp')
  .controller('AddDxCtrl', 
    ['$scope', 'CieCupsServices', '$modal', 'dataTableStorageFactory', 'messageService', 'dxSeleccionado', '$modalInstance', '$rootScope', '$q',
    function ($scope, CieCupsServices, $modal, dataTableStorageFactory, messageService, dxSeleccionado, $modalInstance, $rootScope, $q) {

    var esNuevo = true; 
    $scope.Diagnostico = {};
    $scope.listadoCie = [];  	

    $scope.Tipo = [{nombre: 'Pieza', codigo : 1}, {nombre: 'Superficie', codigo : 2}, {nombre: 'General', codigo : 3}];

   
    /* Modo edicion */
    if(!angular.isUndefined(dxSeleccionado))
    {
      $scope.Diagnostico = dxSeleccionado;      
      esNuevo = false;
    }

  	function inicializar(){  	
      CieCupsServices.listadoCie().then(cie, error);
  	}

    $scope.adicionar = function(){
      var data = $scope.Diagnostico;
      
      var DiagnosticoDfd = $q.defer();
      var Diagnostico = Parse.Object.extend("Diagnostico");
      var diagnostico = new Diagnostico();
      diagnostico.set("nombre", data.nombre);
      diagnostico.set("idiceCie", data.idiceCie);
      diagnostico.set("tipo", data.objectHefesoftTipo);
      diagnostico.set("diagnostico", data.objectHefesoftDiagnostico);
      diagnostico.set("evolucion", data.objectHefesoftEvolucion);
      diagnostico.set("username", Parse.User.current().get("email"));
      
      diagnostico.save().then(
        function(diagnostico){
          DiagnosticoDfd.resolve(diagnostico);
      },
        function(diagnostico, error){
          console.log(error);
          DiagnosticoDfd.reject(error);
      });
      
      DiagnosticoDfd.promise.then(function(result){
        $modalInstance.dismiss(result);
      })
      .catch(function(error){
        $modalInstance.dismiss();
        console.log(error);
      })
   }

    function cie(data){
      $scope.listadoCie = data;
    }

    function error(err){
      console.log(err);
    }

  	inicializar();

  }])