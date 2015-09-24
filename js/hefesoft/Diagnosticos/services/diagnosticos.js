angular.module('odontologiaApp')
.service('diagnosticosService', function($q){
    
    var datafactory = [];
    
    datafactory.cargarDiagnosticos = function(id){
      var deferred = $q.defer();
        
      var Diagnosticos = Parse.Object.extend("Diagnostico");
  	  var query = new Parse.Query(Diagnosticos);
  	  query.equalTo("username", Parse.User.current().get("email"));
  	  
  	  query.find().then(function(data){
  	    deferred.resolve(data);
  	  },
  	  function(result,error){
  	    console.log(error);
  	    deferred.reject(error);
  	  });
        
        
      return deferred.promise;
    }
    
    return datafactory;
    
})
