/*global angular, Parse, modalInstance*/
angular.module('odontologiaApp')
  .directive('wizardSimple', function(){
      
      var directiva = {};
      directiva.templateUrl = "js/hefesoft/Diagnosticos/directivas/template/wizardSimple.html";
      directiva.controller = "wizardSimpleCtrl";
      
      return directiva;
      
  })
  
  .controller('wizardSimpleCtrl', function($scope, procedimientosService){
    
    $scope.VisualizarTipoDiagnostico = { mostrarColor : true, mostrarTexto : false, mostrarImagen : false};
    $scope.VisualizarTipoEvolucion = { mostrarColor : true, mostrarTexto : false, mostrarImagen : false};
    $scope.tipoSeleccionadoDiagnostico = "Color";
    $scope.tipoSeleccionadoEvolucion = "Color";
    $scope.esquemaLimpio = {};
    $scope.esquema = {};
    $scope.diagnostico = { 
      diagnostico:  {
      },
      evolucion: {
      },
      nombre: "",
      valor: 0
    }
    
    $scope.cambioVisualizacion = function(tipo, etapaDiagnostico){
      mostrarOcultar(tipo, etapaDiagnostico);
    }
    
    $scope.seleccionadoDiagnostico = function(item){
      
      //Se inicializa el diagnostico vacio
      $scope.esquema.diagnostico = $scope.esquemaLimpio.diagnostico;
      
      if(item.modo.mostrarColor){
        $scope.esquema.diagnostico['color'] = item.color;
      }
      else if(item.modomostrar.Texto){
        $scope.esquema.diagnostico['simbolo'] = item.simbolo;
        $scope.esquema.diagnostico.objectHefesoftFuente = item.objectHefesoftFuente;
      }
      else if(item.modo.mostrarImagen){
        $scope.esquema.diagnostico['pathImagen'] = item.urlImagen;
      }
      
    }
    
    $scope.seleccionadoEvolucion = function(item){
      console.log(item);
    }
    
    (function obtenerEsquema(){
      procedimientosService.obtenerEsquema("Diagnostico.json").then(function(data){
          $scope.esquema = data.data;
          $scope.esquemaLimpio = angular.copy($scope.esquema);
      })
    }());
    
    function mostrarOcultar(tipo, etapaDiagnostico) {
      
      switch (tipo) {
        case 'Texto':
          $scope[etapaDiagnostico].mostrarColor = false;
          $scope[etapaDiagnostico].mostrarImagen = false;
          $scope[etapaDiagnostico].mostrarTexto = true;
          break;
        case 'Imagen':
          $scope[etapaDiagnostico].mostrarColor = false;
          $scope[etapaDiagnostico].mostrarImagen = true;
          $scope[etapaDiagnostico].mostrarTexto = false;
          break;
        case 'Color':
          $scope[etapaDiagnostico].mostrarColor = true;
          $scope[etapaDiagnostico].mostrarImagen = false;
          $scope[etapaDiagnostico].mostrarTexto = false;
          break;


      }
    }
    
    $scope.save = function(){
      
    }
    
    
  })
  
  