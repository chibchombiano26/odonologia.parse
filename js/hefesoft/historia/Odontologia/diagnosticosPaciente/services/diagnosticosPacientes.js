/*global angular, Parse, hefesoft*/
angular.module("Historia")
.service("diagnosticoPacienteService", function($q){
    
    var dataFactory = {};
    
    dataFactory.load  = function(idPaciente){
        
        var DiagnosticoPacienteDfd = $q.defer();
		var DiagnosticoPaciente = Parse.Object.extend("Diagnostico_Paciente");
		var query = new Parse.Query(DiagnosticoPaciente);
		query.equalTo("paciente", idPaciente);
		
		query.find().then(function(entidad){
			DiagnosticoPacienteDfd.resolve(entidad);
		},
		function(entidad, error){
			DiagnosticoPacienteDfd.reject(error);
		});
		
		return DiagnosticoPacienteDfd.promise;
    }
    
    dataFactory.add = function(item){
    	var DiagnosticoPacienteDfd = $q.defer();
		var DiagnosticoPaciente = Parse.Object.extend("Diagnostico_Paciente");
		var diagnosticoPaciente = new DiagnosticoPaciente();
		
		diagnosticoPaciente.set("paciente", item.idPaciente);
		diagnosticoPaciente.set("fecha", new Date());
		
		if(!hefesoft.isEmpty(item.paciente)){
			diagnosticoPaciente.set('objPaciente', item.paciente);	
		}
		
		diagnosticoPaciente.save().then(function(diagnosticoPaciente){
			DiagnosticoPacienteDfd.resolve(diagnosticoPaciente);
		},
		function(diagnosticoPaciente, error){
			DiagnosticoPacienteDfd.reject(error);
		});
		
		return DiagnosticoPacienteDfd.promise;
    }
    
    dataFactory.destroy = function(idPaciente){
    	var deferred = $q.defer();
		var DiagnosticoPaciente = Parse.Object.extend("Diagnostico_Paciente");
		var diagnosticoPaciente = new DiagnosticoPaciente();
		diagnosticoPaciente.set("id", idPaciente);
		diagnosticoPaciente.destroy().then(function(result){
			deferred.resolve(result);
		})
		
		return deferred.promise;
    }
    
    return dataFactory;
    
})