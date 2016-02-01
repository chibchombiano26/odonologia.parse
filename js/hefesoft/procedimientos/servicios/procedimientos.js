/*global angular, Parse*/
angular.module('odontologiaApp')
.service('procedimientosService', function($q, $http, diagnosticosService){
    
   var datafactory = {};
    
   datafactory.cargarDiagnosticosEjemplo = function() {
       var deferred = $q.defer();
       var Diagnosticos = Parse.Object.extend("Diagnostico");
       var query = new Parse.Query(Diagnosticos);
       query.count({
           success: function(count) {
               if (count == 0) {
                   diagnosticosEjemplo().then(function(data) {
                       deferred.resolve(data);
                   })
               }
               else {
                   deferred.resolve(count);
               }
           },
           error: function(error) {
               deferred.resolve(error);
           }
       });

       return deferred.promise;
   }
   
   function diagnosticosEjemplo() {
       var deferred = $q.defer();
       var Diagnostico = Parse.Object.extend("Pocedimientos");
       var arrayDiagnostico = [];


       $q.all([datafactory.getFromGoogleSheet(), datafactory.obtenerEsquema("Diagnostico.json")]).then(function(data) {


           var procedimientos = data[0];
           var diagnostcoMockup = data[1].data;

           //Convierte los procedimietos de referencia en diagnosticos del sistema
           var listadoProcedimientos = procesarProcedimientosPrueba(diagnostcoMockup, procedimientos);


           //Guarda los diagnosticos
           Parse.Object.saveAll(listadoProcedimientos).then(function(result) {
                   deferred.resolve(result);
               },
               function(result, error) {
                   deferred.reject(error);
               }
           );

       })

       return deferred.promise;
   }
       
   datafactory.obtenerEsquema = function(nombre){
        return $http.get('js/hefesoft/json/' + nombre);
   }
   
   datafactory.getFromGoogleSheet = function(){
       var defered = $q.defer();
       $http.get('https://spreadsheets.google.com/feeds/list/1eTBT2zJir3ihr8sr4kE03z_nRXiklckTj0Y5q_s0VQY/od6/public/values?alt=json').then(function(data){
           
           var result = data.data.feed.entry;
           
           result = result.map(function(item, id) {
               return {
                   codigo: item.gsx$codigo.$t,
                   tipo: item.gsx$tipo.$t,
                   subtipo: item.gsx$subtipo.$t,
                   descripcion: item.gsx$descripcion.$t,
                   precioConFormato: item.gsx$precio.$t,
                   precio2ConFormato: item.gsx$precio2.$t,
                   precio: item.gsx$preciovalor.$t,
                   precio2: item.gsx$precio2valor.$t,

                   //Letra color
                   tipoSimbolo: item.gsx$tipo_2.$t,
                   tipoValor: item.gsx$valortipo.$t,
                   valorDiagnostico: item.gsx$valordiagnostico.$t,
                   valorEvolucion: item.gsx$valorevolucion.$t,
                   pais: item.gsx$pais.$t,
                   anio: item.gsx$año.$t
               }
           })
           
           defered.resolve(result);
       })
       
       return defered.promise;
   }
    
   function procesarProcedimientosPrueba(mockup, listado){
        
        var array = [];
        for (var i = 0; i < listado.length; i++) {
            var item = listado[i];
            var itemInsertar = angular.copy(mockup);
            var nombre = item.codigo + ' ' + item.tipo + ' ' + item.subtipo + ' ' + item.descripcion;
            
            itemInsertar.nombre = nombre;
            itemInsertar.arrayHefesoftTratamientos[0].nombre = nombre;
            itemInsertar.arrayHefesoftTratamientos[0].valor = item.precio2;
            
            itemInsertar.arrayHefesoftTratamientos[0].arrayHefesoftProcedimientos[0].nombre = nombre;
            itemInsertar.arrayHefesoftTratamientos[0].arrayHefesoftProcedimientos[0].valor = item.precio2;
            
            if(item.tipoSimbolo === "Letra"){
                itemInsertar.diagnostico.objectHefesoftFuente.fuenteColor = item.valorDiagnostico;
                itemInsertar.evolucion.objectHefesoftFuente.fuenteColor = item.valorEvolucion;
                
                itemInsertar.diagnostico.simbolo = item.tipoValor;
                itemInsertar.evolucion.simbolo = item.tipoValor;
            }
            else if (item.tipoSimbolo === "Imagen"){
                
                delete itemInsertar.diagnostico.objectHefesoftFuente;
                delete itemInsertar.evolucion.objectHefesoftFuente;
                
                itemInsertar.diagnostico.pathImagen = item.valorDiagnostico;
                itemInsertar.evolucion.pathImagen = item.valorEvolucion;
                
                
            }
            else if (item.tipoSimbolo === "Color"){
                itemInsertar.diagnostico['color'] = item.valorDiagnostico;
                itemInsertar.evolucion['color'] = item.valorEvolucion;
            }
            
            var element = diagnosticosService.addDiagnostico(itemInsertar);
            array.push(element);
        }
        
        
        return array;
    }
    
    return datafactory;
})