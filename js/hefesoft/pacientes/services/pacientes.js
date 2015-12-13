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
	  queryPaciente.equalTo("username", Parse.User.current().get("email"));
	  
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
		paciente.set("idFacebook", w.text);
		paciente.set("telefonoCelular", parseService.validateUndefined(w.numeroContacto).toString());
		
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
		paciente.set("medicoParticular", parseService.validateUndefined(item.medicoParticular));
		paciente.set("genero", parseService.validateUndefined(item.genero));
		
		
		paciente.set("telefonoFijo", parseService.validateUndefined(item.telefonoFijo));
		paciente.set("telefonoCelular", parseService.validateUndefined(item.telefonoCelular));
		paciente.set("direccion", parseService.validateUndefined(item.direccion));
		
		
		paciente.set("vinculacionEps", parseService.validateUndefined(item.vinculacionEps));
		paciente.set("tipoVinculacion", parseService.validateUndefined(item.tipoVinculacion));
		paciente.set("Ocupacion", parseService.validateUndefined(item.Ocupacion));
		paciente.set("grupoPoblacion", parseService.validateUndefined(item.grupoPoblacion));
		
		paciente.set("nombreAcudiente", parseService.validateUndefined(item.nombreAcudiente));
		paciente.set("parentescoAcudiente", parseService.validateUndefined(item.parentescoAcudiente));
		paciente.set("telefonoAcudiente", parseService.validateUndefined(item.telefonoAcudiente));
		
		
		paciente.set("tratamientoMedico", parseService.validateUndefined(item.tratamientoMedico));
		paciente.set("ingestionMedicamentos", parseService.validateUndefined(item.ingestionMedicamentos));
		paciente.set("reaccionesAlergicas", parseService.validateUndefined(item.reaccionesAlergicas));
		paciente.set("hemorragias", parseService.validateUndefined(item.hemorragias));
		paciente.set("irradiaciones", parseService.validateUndefined(item.irradiaciones));
		paciente.set("sinusitis", parseService.validateUndefined(item.sinusitis));
		paciente.set("enfermedadesRespiratorias", parseService.validateUndefined(item.enfermedadesRespiratorias));
		paciente.set("cardiopatias", parseService.validateUndefined(item.cardiopatias));
		paciente.set("diabetes", parseService.validateUndefined(item.diabetes));
		paciente.set("fiebreReumatica", parseService.validateUndefined(item.fiebreReumatica));
		paciente.set("hepatitis", parseService.validateUndefined(item.hepatitis));
		paciente.set("hipertensionArterial", parseService.validateUndefined(item.hipertensionArterial));
		paciente.set("otrasEnfermedades", parseService.validateUndefined(item.otrasEnfermedades));
		
		paciente.set("cepillado", parseService.validateUndefined(item.cepillado));
		paciente.set("cepilladoCuantasVeces", parseService.validateUndefined(item.cepilladoCuantasVeces));
		
		paciente.set("sedaDental", parseService.validateUndefined(item.sedaDental));
		paciente.set("sedaDentalCuantasVeces", parseService.validateUndefined(item.sedaDentalCuantasVeces));
		
		
		paciente.set("articulacionTemporalMandibular", parseService.validateUndefined(item.articulacionTemporalMandibular));
		paciente.set("labios", parseService.validateUndefined(item.labios));
		paciente.set("lengua", parseService.validateUndefined(item.lengua));
		paciente.set("paladar", parseService.validateUndefined(item.paladar));
		paciente.set("pisoBoca", parseService.validateUndefined(item.pisoBoca));
		paciente.set("carrillo", parseService.validateUndefined(item.carrillo));
		paciente.set("glandulasSalivares", parseService.validateUndefined(item.glandulasSalivares));
		paciente.set("maxilares", parseService.validateUndefined(item.maxilares));
		paciente.set("senosMaxilares", parseService.validateUndefined(item.senosMaxilares));
		paciente.set("musculosMasticadores", parseService.validateUndefined(item.musculosMasticadores));
		
		paciente.set("sitemaNervioso", parseService.validateUndefined(item.sitemaNervioso));
		paciente.set("sitemaVascular", parseService.validateUndefined(item.sitemaVascular));
		paciente.set("sitemaLinfaticoRegional", parseService.validateUndefined(item.sitemaLinfaticoRegional));
		paciente.set("funcionOclusion", parseService.validateUndefined(item.funcionOclusion));
		paciente.set("otrosExamenFisico", parseService.validateUndefined(item.otrosExamenFisico));
		
		paciente.set("supernumerarios", parseService.validateUndefined(item.supernumerarios));
		paciente.set("abrasion", parseService.validateUndefined(item.abrasion));
		paciente.set("manchas", parseService.validateUndefined(item.manchas));
		paciente.set("patalogiaPulpar", parseService.validateUndefined(item.patalogiaPulpar));
		paciente.set("placaBacteriana", parseService.validateUndefined(item.placaBacteriana));
		paciente.set("placaCalificada", parseService.validateUndefined(item.placaCalificada));
		paciente.set("examenOralOtros", parseService.validateUndefined(item.examenOralOtros));
		
		
		
		
		
		
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