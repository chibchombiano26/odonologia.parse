/*global angular, Parse, _, hefesoft*/
angular.module('odontologiaApp')
.service('diagnosticosService', function($q){
    
    var datafactory = [];
    hefesoft.global['cargandoDiagnosticosEjemplo'] = false;
    
    datafactory.cargarDiagnosticos = function(id){
      var deferred = $q.defer();
        
      var Diagnosticos = Parse.Object.extend("Diagnostico");
  	  var query = new Parse.Query(Diagnosticos);
  	  query.equalTo("username", Parse.User.current().get("email"));
  	  
  	  query.find().then(function(data){
  	    if(!hefesoft.isEmpty(data)){
  	      deferred.resolve(data);
  	    }
  	    else{
  	      //if(!hefesoft.global['cargandoDiagnosticosEjemplo']){
  	        //hefesoft.global['cargandoDiagnosticosEjemplo'] =  true;
    	      datafactory.cargarDiagnosticosEjemplo().then(function(data){
              	deferred.resolve(data);
    	      })
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
      var Diagnostico = Parse.Object.extend("Diagnostico");
      var arrayDiagnostico = [];
      
  	  var query = new Parse.Query(Diagnosticos);
  	  query.find().then(function(data){
  	    
  	      
  	     for (var i = 0; i < data.length; i++) {
  	       
   	       var element = new Diagnostico();
  	       var item = data[i].toJSON();
  	       element.set("nombre", item.nombre);
  	       element.set("activo", item.activo);
  	       element.set("diagnostico", item.diagnostico);
  	       element.set("evolucion", item.evolucion);
  	       element.set("tipo", item.tipo);
  	       element.set("username", Parse.User.current().get("email"));
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
    
    return datafactory;
    
})
