/*global angular, messageService, Parse, parseService, hefesoft*/
angular.module('odontologiaApp')
.service('pacienteService', function($q, parseService){
    
    var dataFactory = {};
    
    dataFactory.listarPacientes = function(){
		var PacientesDfd = $q.defer();
		var Pacientes = Parse.Object.extend("Paciente");
		var pacientes = new Parse.Query(Pacientes);
		
		pacientes.equalTo("username", Parse.User.current().get("email"));
		pacientes.find()
		.then(function(data){
		  PacientesDfd.resolve(data);	
		},
		function(data, error){
		 console.log(error);
		 PacientesDfd.reject(error);	
		});
		
		return PacientesDfd.promise;
	}
    
    dataFactory.obtenerPaciente = function(id){
	  var PacienteDfd = $q.defer();
	  var Paciente = Parse.Object.extend('Paciente');
	  var queryPaciente = new Parse.Query(Paciente);
	  
	  queryPaciente.get(id).then(function (data) {
	  	PacienteDfd.resolve(data);
	  }, function (error) {
	  	PacienteDfd.reject(error);
	  });
		  
	  return PacienteDfd.promise;
    }
    
    dataFactory.validarExistePacienteFacebook = function(id){
	  var PacienteDfd = $q.defer();
	  var Paciente = Parse.Object.extend('Paciente');
	  var queryPaciente = new Parse.Query(Paciente);
	  queryPaciente.equalTo("idFacebook", id);
	  queryPaciente.first().then(function (data) {
	  	PacienteDfd.resolve(data);
	  }, function (error) {
	  	PacienteDfd.reject(error);
	  });
		  
	  return PacienteDfd.promise;
    }
    
    dataFactory.saveFromFacebook = function(w){
    	var deferred = $q.defer();
		var Paciente  = Parse.Object.extend("Paciente");
		var paciente = new Paciente();
		
		paciente.set("nombre", w.user);
		paciente.set("email", w.text);
		paciente.set("pictureUrl", w.img);
		paciente.set("username", Parse.User.current().get("email"));
		paciente.set("idFacebook", w.id);
		
		paciente.save().then(function(result){
		    deferred.resolve(result);
		});
		
		return deferred.promise;
    }
    
    dataFactory.save = function(idPaciente, item){
		var deferred = $q.defer();
		var Paciente  = Parse.Object.extend("Paciente");
		var paciente = new Paciente();
		
		//Para que actualice y no inserte
		if(idPaciente.length > 0){
			paciente.id = idPaciente;
		}
		
		
		paciente.set("nombre", parseService.validateUndefined(item.nombre));
		paciente.set("cedula", parseService.validateUndefined(item.cedula));
		paciente.set("email", parseService.validateUndefined(item.email));
		paciente.set("ciudad", parseService.validateUndefined(item.ciudad));
		paciente.set("municipio", parseService.validateUndefined(item.municipio));
		paciente.set("fecha", parseService.validateUndefined(item.fecha));
		paciente.set("edad", parseService.validateUndefined(item.edad));
		paciente.set("telefono", parseService.validateUndefined(item.telefono));
		paciente.set("eps", parseService.validateUndefined(item.eps));
		paciente.set("ips", parseService.validateUndefined(item.ips));
		paciente.set("ars", parseService.validateUndefined(item.ars));
		paciente.set("regimenEspecial", parseService.validateUndefined(item.regimenEspecial));
		paciente.set("observaciones", parseService.validateUndefined(item.observaciones));
		paciente.set("medicoParticular", parseService.validateUndefined(item.medicoparticular));
		paciente.set("genero", parseService.validateUndefined(item.genero));
		
		if(hefesoft.isEmpty(item.pictureUrl)){
			paciente.set("pictureUrl", hefesoft.generoPic(item, "genero"));
		}
		
		paciente.set("username", Parse.User.current().get("email"));
		
		paciente.save(null,{
			success: function(paciente){
			    deferred.resolve(paciente);
			},
			error:function(paciente, error){
			  	deferred.reject(error);
			}
		});
		
		return deferred.promise;
	}
    
    
    return dataFactory;
    
})