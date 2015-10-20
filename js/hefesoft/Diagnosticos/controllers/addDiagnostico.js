  /*global angular, Parse, hefesoft*/  
  angular.module('odontologiaApp')
  .controller('AddDxCtrl', 
    ['$scope', 'CieCupsServices', '$modal', 'dataTableStorageFactory', 'messageService', 'dxSeleccionado', '$modalInstance', '$rootScope', '$q',
    function ($scope, CieCupsServices, $modal, dataTableStorageFactory, messageService, dxSeleccionado, $modalInstance, $rootScope, $q) {

    $scope.Diagnostico = {};
    $scope.listadoCie = []; 
    $scope.modo = "Guardar";
    $scope.Tipo = [{nombre: 'Pieza', codigo : 1}, {nombre: 'Superficie', codigo : 2}, {nombre: 'General', codigo : 3}];
    
    if(!hefesoft.isEmpty(dxSeleccionado)){
      $scope.modo = "Editar";
      $scope.Diagnostico = dxSeleccionado;
    }


  	function inicializar(){  	
      CieCupsServices.listadoCie().then(cie, error);
  	}

    $scope.adicionar = function(){
      var data = $scope.Diagnostico;
      var DiagnosticoDfd = $q.defer();
      var Diagnostico = Parse.Object.extend("Diagnostico");
      var diagnostico = new Diagnostico();
      
      diagnostico.set("activo", data.activo);
      diagnostico.set("nombre", data.nombre);
      diagnostico.set("idiceCie", data.idiceCie);
      diagnostico.set("tipo", data.tipo);
      diagnostico.set("diagnostico", data.diagnostico);
      diagnostico.set("evolucion", data.evolucion);
      diagnostico.set("username", Parse.User.current().get("email"));
      
      if($scope.modo == "Editar"){
        diagnostico.set("id", dxSeleccionado.objectId);
      }
      
      diagnostico.save().then(
        function(diagnostico){
          DiagnosticoDfd.resolve(diagnostico);
      },
        function(diagnostico, error){
          console.log(error);
          DiagnosticoDfd.reject(error);
      });
      
      DiagnosticoDfd.promise.then(function(result){
        
        var returnData = result.toJSON();
        
        //Cuando se edita no se debe adicionar al listado
        if($scope.modo === "Editar"){
          returnData["modo"] = "Edicion";
        }
        else{
          returnData["modo"] = "Insercion";
        }
        
        $modalInstance.dismiss(returnData);
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