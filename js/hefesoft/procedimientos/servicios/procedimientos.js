/*global angular, Parse*/
angular.module('odontologiaApp')
.service('procedimientosService', function($q, $http, diagnosticosService){
    
   var datafactory = {};
    
   datafactory.cargarDiagnosticosEjemplo = function(){
      
      var deferred = $q.defer();
        
      var Diagnosticos = Parse.Object.extend("Precios_Procedimientos_Referencia");
      var Diagnostico = Parse.Object.extend("Pocedimientos");
      var arrayDiagnostico = [];
      
  	  var query = new Parse.Query(Diagnosticos);
  	  query.limit(500);
  	  
  	  $q.all([query.find(), datafactory.obtenerEsquema("Diagnostico.json")]).then(function(data){
  	      var procedimientos =   data[0];
  	      var diagnostcoMockup = data[1].data;
  	      
  	      //Convierte los procedimietos de referencia en diagnosticos del sistema
  	      var listadoProcedimientos = procesarProcedimientosPrueba(diagnostcoMockup, procedimientos);
  	      
  	      debugger
  	      //Guarda los diagnosticos
  	      Parse.Object.saveAll(listadoProcedimientos).then(function(result){
  	         deferred.resolve(result); 
  	      },
  	      function(result, error){
  	          deferred.reject(error);
  	      }
  	      );
  	  })
  	  
      return deferred.promise;
    }
    
    function procesarProcedimientosPrueba(mockup, listado){
        
        
        var array = [];
        for (var i = 0; i < listado.length; i++) {
            var item = listado[i].toJSON();
            var itemInsertar = angular.copy(mockup);
            
            
            itemInsertar.nombre = item.Descripcion;
            itemInsertar.arrayHefesoftTratamientos[0].nombre = item.Descripcion;
            itemInsertar.arrayHefesoftTratamientos[0].valor = item.precio_Valor;
            
            itemInsertar.arrayHefesoftTratamientos[0].arrayHefesoftProcedimientos[0].nombre = item.Descripcion;
            itemInsertar.arrayHefesoftTratamientos[0].arrayHefesoftProcedimientos[0].valor = item.precio_Valor;
            
            var element = diagnosticosService.addDiagnostico(itemInsertar);
            array.push(element);
        }
        
        
        return array;
    }
    
    datafactory.obtenerEsquema = function(nombre){
        return $http.get('js/hefesoft/json/' + nombre);
    }
  
    
    return datafactory;
})