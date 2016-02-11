/*global angular, Parse, modalInstance, hefesoft*/
angular.module('odontologiaApp')
  .directive('tipoVisualizacionDiagnostico', function(){
      
      var directiva = {};
      directiva.templateUrl = "js/hefesoft/Diagnosticos/directivas/template/tipoVisualizacionDiagnostico.html";
      directiva.controller = "tipoVisualizacionDiagnosticoCtrl";
      
      directiva.scope = {
          item : '=',
          callback: '&'
      }
      
      return directiva;
      
  })
  
  .controller('tipoVisualizacionDiagnosticoCtrl', function($scope, driveApiUpload){
      
      $scope.wizard = {
          'color' : '#e0767e',
          'simbolo' : 'X',
          objectHefesoftFuente: {
            'font-family' : 'Arial',
            'fuenteColor' : '#e0767e',
          }
      };
      
       $scope.$watch("wizard",function(e){
           propagateEvent();
       });
       
       $scope.$watch("wizard.color", function(e){
           propagateEvent();
       });
       
       $scope.$watch("wizard.simbolo", function(e){
           propagateEvent();
       });
       
       $scope.$watch("wizard.objectHefesoftFuente.fuenteColor", function(e){
           propagateEvent();
       });
      
      $scope.changeImage = function(file) {
          hefesoft.util.loadingBar.start();
          driveApiUpload.insertFile(file, file.name, false, 'binary', "Imagenes pacientes").then(function(link) {
              hefesoft.util.loadingBar.complete();
              var url = "https://docs.google.com/uc?id=" + link.id;

              $scope.wizard.urlImagen = url;
              propagateEvent();
          })
      }
      
      function propagateEvent() {
          
          $scope.wizard.modo = $scope.item;
          
          if ($scope.callback) {
              $scope.callback({
                  item: $scope.wizard
              });
          }
      }
      
  })
  