/*global angular, Parse, _, hefesoft, numeral*/
angular.module('odontologiaApp')
.service('diagnosticosService', function($q, $http){
    
    var datafactory = [];
    hefesoft.global['cargandoDiagnosticosEjemplo'] = false;
    
    
   datafactory.buscarDiagnosticos = function(texto) {
         var deferred = $q.defer();
         var Diagnostico = Parse.Object.extend("Diagnostico");

         var query = new Parse.Query(Diagnostico);
         query.equalTo("username", Parse.User.current().get("email"));
         query.contains("buscar", texto);
         query.limit(20);
          
         query.find().then(function(data) {
                 var result = [];

                 for (var i = 0; i < data.length; i++) {
                     result.push((data[i]).toJSON());
                 }

                 deferred.resolve(result);

             },
             function(data, error) {
                 deferred.reject(error);
             }
         )

         return deferred.promise;

     }
    
    datafactory.cargarDiagnosticos = function(id){
      var deferred = $q.defer();
        
      var Diagnosticos = Parse.Object.extend("Diagnostico");
  	  var query = new Parse.Query(Diagnosticos);
  	  query.limit(500);
  	  query.equalTo("username", Parse.User.current().get("email"));
  	  
  	  
  	  query.find().then(function(data){
  	    if(!hefesoft.isEmpty(data)){
  	      deferred.resolve(data);
  	    }
  	    else{
  	      //if(!hefesoft.global['cargandoDiagnosticosEjemplo']){
  	        //hefesoft.global['cargandoDiagnosticosEjemplo'] =  true;
    	      /*datafactory.cargarDiagnosticosEjemplo().then(function(data){
              	deferred.resolve(data);
    	      })*/
  	      //}
  	    }
  	  },
  	  function(result,error){
  	    console.log(error);
  	    deferred.reject(error);
  	  });
        
        
      return deferred.promise;
    }
    
    datafactory.cargarDiagnosticosEjemplo = function(){
      var deferred = $q.defer();
        
      var Diagnosticos = Parse.Object.extend("Diagnosticos_Ejemplo");
      var arrayDiagnostico = [];
      
  	  var query = new Parse.Query(Diagnosticos);
  	  query.find().then(function(data){
  	     
  	     for (var i = 0; i < data.length; i++) {
   	       var item = data[i].toJSON();
   	       var element = datafactory.addDiagnostico(item);
  	       arrayDiagnostico.push(element);
  	     }
  	    
  	     Parse.Object.saveAll(arrayDiagnostico).then(function(result){
  	       deferred.resolve(result);
  	     },
  	     function(entidad, error){
  	      deferred.reject(entidad);  
  	     })
  	    
  	  },
  	  function(result,error){
  	    console.log(error);
  	    deferred.reject(error);
  	  });
        
        
      return deferred.promise;
    }
    
    datafactory.addDiagnostico = function(item){
        
       var Diagnostico = Parse.Object.extend("Diagnostico");
       var element = new Diagnostico();
       
       element.set("activo", item.activo);
       element.set("nombre", item.nombre);
       element.set("buscar", item.nombre.toLowerCase());
       element.set("tipo", item.tipo);
       element.set("diagnostico", item.diagnostico);
       element.set("evolucion", item.evolucion);
       element.set("username", Parse.User.current().get("email"));
       
       if(item.arrayHefesoftTratamientos){
        element.set('arrayHefesoftTratamientos', item.arrayHefesoftTratamientos);
        
        var valor = _.sumBy(item.arrayHefesoftTratamientos, function(o){ return parseFloat(o.valor);});
        valor = numeral(valor).format('$0,0.00');
        element.set("valor", valor);
        
       }
       else{
           var arrayHefesoftTratamientos = angular.copy(datafactory.diagnosticoMockup.arrayHefesoftTratamientos);
           arrayHefesoftTratamientos.nombre = item.nombre;
           arrayHefesoftTratamientos.valor = 0;
           arrayHefesoftTratamientos[0].arrayHefesoftProcedimientos[0].nombre = item.nombre;
           arrayHefesoftTratamientos[0].arrayHefesoftProcedimientos[0].valor = 0;
           element.set('arrayHefesoftTratamientos', arrayHefesoftTratamientos);
           
           var valor = _.sumBy(arrayHefesoftTratamientos, function(o){ return parseFloat(o.valor);});
           valor = numeral(valor).format('$0,0.00');
           element.set("valor", valor);
       }
       
       
       
       
       
       return element;
    }
    
    datafactory.obtenerEsquema = function(nombre){
        return $http.get('js/hefesoft/json/' + nombre);
    }
      
    datafactory.inicializar = function(){
        datafactory.obtenerEsquema("Diagnostico.json").then(function(data){
            datafactory['diagnosticoMockup'] =  data.data;   
        });
        
    }
    
    datafactory.inicializar();
    
    
    return datafactory;
    
})
