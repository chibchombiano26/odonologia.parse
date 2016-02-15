/*global angular, Parse, modalInstance*/
angular.module('odontologiaApp')
  .directive('wizardSimple', function(){
      
      var directiva = {};
      directiva.templateUrl = "js/hefesoft/Diagnosticos/directivas/template/wizardSimple.html";
      directiva.controller = "wizardSimpleCtrl";
      
      directiva.scope = {
         callback: '&'
      };
      
      return directiva;
      
  })
  
  .controller('wizardSimpleCtrl', function($scope, procedimientosService, $interval){
    
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
    
    $scope.seleccionadoDiagnostico = function(item) {
      inicializarValoresDiagnosticoEvolucion(item, "diagnostico");
    }
    
    $scope.seleccionadoEvolucion = function(item){
      inicializarValoresDiagnosticoEvolucion(item, "evolucion");
    }
    
    function inicializarValoresDiagnosticoEvolucion(item, tipo){
      var promise = $interval(function(){
        if ($scope.esquema[tipo]) {
          esquema(item, tipo);
          $interval.cancel(promise);
        }
      }, 3000);
      
    }
    
    function esquema(item, tipo){
      if ($scope.esquema[tipo]) {
        //Se inicializa el diagnostico vacio
        $scope.esquema[tipo] = angular.copy($scope.esquemaLimpio.diagnostico);
    
        if (item.modo.mostrarColor) {
          $scope.esquema[tipo]['color'] = item.color;
        }
        else if (item.modo.mostrarTexto) {
          $scope.esquema[tipo]['simbolo'] = item.simbolo;
          $scope.esquema[tipo].objectHefesoftFuente = item.objectHefesoftFuente;
        }
        else if (item.modo.mostrarImagen) {
          $scope.esquema[tipo]['pathImagen'] = item.urlImagen;
        }
      }
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
    
    $scope.save = function() {
      
      $scope.esquema['nombre'] = $scope.diagnostico.nombre;
      $scope.esquema['valor'] = $scope.diagnostico.valor;
      
      $scope.esquema.arrayHefesoftTratamientos[0].nombre = $scope.diagnostico.nombre;
      $scope.esquema.arrayHefesoftTratamientos[0].arrayHefesoftProcedimientos[0].nombre = $scope.diagnostico.nombre;
      
      $scope.esquema.arrayHefesoftTratamientos[0].valor = $scope.diagnostico.valor;
      $scope.esquema.arrayHefesoftTratamientos[0].arrayHefesoftProcedimientos[0].valor = $scope.diagnostico.valor;
      
      
      if ($scope.callback) {
        $scope.callback({
          item: $scope.esquema
        });
      }
    }
    
  })
  
  .controller('wizardDiagnosticoSimple', function($scope, callback){
    
    $scope.callback = function(item){
      callback(item);
    }
    
  })
  
  