 /*
 angular.module('odontologiaApp')
.controller('pacientesController', 
	['$scope','dataTableStorageFactory', 'users', '$cordovaCamera', 'imagesStorageFactory','$state','varsFactoryService','$ionicLoading','$rootScope', 'emailFactory', 'validarNavegacionService', 'messageService', 'platformService', 'inicializarTratamientosServices', '$rootScope',
	function ($scope, dataTableStorageFactory, users, $cordovaCamera, imagesStorageFactory, $state, varsFactoryService, $ionicLoading, $rootScope, emailFactory, validarNavegacionService, messageService, platformService, inicializarTratamientosServices) {
	
	$scope.Paciente = {fecha : new Date(), color : '#000000'};	

	//Cuando se selecciona un paciente
	$scope.Paciente = varsFactoryService.pacienteSeleccionado();
	$scope.Pacientes = new Array();
	$scope.shouldShowDelete = true;	
	$scope.Imagen = 'https://hefesoft.blob.core.windows.net/profile/profile.png';
	$scope.textoBuscar;
	inicializarTratamientosServices.inicializar();



	
	$scope.navegarAdjuntos = function(item){
		$rootScope.currentPacient = item;
		$scope.Paciente = item;
		varsFactoryService.fijarPaciente(item.RowKey);		
		//$state.go("app.gallery");
		$state.go("app.picker");		
	}

	$scope.irDiagnosticos = function(item){
		$rootScope.currentPacient = item;
		$scope.Paciente = item;
		varsFactoryService.fijarPaciente(item.RowKey);		
		//$state.go("app.gallery");
		$state.go("app.diagnosticosPacientes");
	}


	$scope.addPaciente = function(){

		var data = $scope.Paciente;		
		data.PartitionKey = Parse.User.current().get("email");

		//Cuando es un nuevo paciente el otro caso es cuando se edita un registro
		if(angular.isUndefined(data.RowKey)){
			data.generarIdentificador = true;
		}
		data.nombreTabla= 'TmPacientes';		

		if(!data.hasOwnProperty("urlImagen")){
			data["urlImagen"] = 'https://hefesoft.blob.core.windows.net/profile/profile.png';
		}

		dataTableStorageFactory.saveStorage(data).then(function(data){
			varsFactoryService.fijarPaciente(data.RowKey);
			messageService.showMessage("Paciente salvado al volver al listado sera visible");
		});
		
		if(angular.isUndefined(data.RowKey)){
			$scope.Pacientes.push(data);
		}
	}

	$scope.delete = function(data, $index){
		data.Estado_Entidad = "2";		
		dataTableStorageFactory.saveStorage(data);
		$scope.Pacientes.splice($index, 1);
	} 

	$scope.cargarImagen = function(item){
		if(platformService.esMobile()){
			obtenerFoto();
		}
		else{
			messageService.showMessage("Solo soportado en dispositivos moviles");
		}
	}

	$scope.edit = function(item){
		$rootScope.currentPacient = item;
		varsFactoryService.fijarPaciente(item.RowKey);
		$scope.Paciente = item;
		$scope.Imagen = item.urlImagen;
		varsFactoryService.fijarPaciente(item);
		$state.go("app.paciente");		

		//prueba
		/*
		var usuario = users.getCurrentUser();
		var email = "futbolito152@gmail.com, chibchombiano26@gmail.com";
		emailFactory.enviarEmail(usuario.email, email , "Test", "texto mensaje", "texto html");
	
		*/
	//}

/*
	$scope.nuevo = function(){
		$scope.Paciente = {};
		$scope.Imagen = 'https://hefesoft.blob.core.windows.net/profile/profile.png';
		$scope.Paciente.urlImagen = $scope.Imagen;
		varsFactoryService.fijarPaciente({});
		$state.go("app.paciente");		
	}

	function obtenerPacientes(){
		$ionicLoading.show();
		dataTableStorageFactory.getTableByPartition('TmPacientes', Parse.User.current().get("email"))
		.success(function(data){
      		$scope.Pacientes = data;
      		$ionicLoading.hide();
        }).error(function(error){
        	console.log(error);
        	$ionicLoading.hide();
        })
	}

	obtenerPacientes();

    function obtenerFoto(){

    	/*Propiedades de la camara*/
    	
    	/*
		var options = {
	      quality: 50,
	      destinationType: Camera.DestinationType.DATA_URL,
	      sourceType: Camera.PictureSourceType.CAMERA,
	      allowEdit: true,
	      encodingType: Camera.EncodingType.JPEG,
	      targetWidth: 100,
	      targetHeight: 100,
	      popoverOptions: CameraPopoverOptions,
	      saveToPhotoAlbum: false
	    };

	    $cordovaCamera.getPicture(options).then(function(imageData) {	      
	      $scope.Imagen = "data:image/jpeg;base64," + imageData;
	      postImage(imageData);
	    }, function(err) {
	      // error
	    });  
	}

	
	function postImage(data){

		var datos = 
		{
      			tipo : 1, 
      			ImagenString : data, 
      			folder: 'imagenes', 
      			name: Parse.User.current().get("email") + $scope.Paciente.nombre + $scope.Paciente.cedula + '.jpg'
  		};

		imagesStorageFactory.postImage(datos)
			.success(function(data){
        	$scope.Paciente.urlImagen = data;
        }).error(function(error){
        	console.log(data);
        })
	}

}])

.service('$cordovaCamera', [function () {

var dataFactory = {};

dataFactory.getPicture = function(){

}



return dataFactory;

}])

*/

 angular.module('odontologiaApp')
.controller('pacientesController',function($scope, $state, $stateParams, $q, parseService){
	
	$scope.Paciente;
	var idPaciente = "";
	
	if($stateParams.pacienteId.length > 0){
		idPaciente = $stateParams.pacienteId;
		obtenerPaciente(idPaciente);
	}
	

    function obtenerPaciente(id){
    	  var PacienteDfd = $q.defer();
		  var Paciente = Parse.Object.extend('Paciente');
		  var queryPaciente = new Parse.Query(Paciente);
		  
		  queryPaciente.get(id).then(function (data) {
		  	PacienteDfd.resolve(data);
		  }, function (error) {
		  	PacienteDfd.reject(error);
		  });
		  PacienteDfd.promise
		  .then(function (paciente) {
		  	$scope.Paciente = paciente.toJSON();
		  })
		  .catch(function (error) {
		  	//do something with the error
		  });
    }
  
	
	$scope.save = function(){
		
		var Paciente  = Parse.Object.extend("Paciente");
		var paciente = new Paciente();
		
		//Para que actualice y no inserte
		if(idPaciente.length > 0){
			paciente.id = idPaciente;
		}
		
		
		paciente.set("nombre", parseService.validateUndefined($scope.Paciente.nombre));
		paciente.set("cedula", parseService.validateUndefined($scope.Paciente.cedula));
		paciente.set("email", parseService.validateUndefined($scope.Paciente.email));
		paciente.set("ciudad", parseService.validateUndefined($scope.Paciente.ciudad));
		paciente.set("municipio", parseService.validateUndefined($scope.Paciente.municipio));
		paciente.set("fecha", parseService.validateUndefined($scope.Paciente.fecha));
		paciente.set("edad", parseService.validateUndefined($scope.Paciente.edad));
		paciente.set("telefono", parseService.validateUndefined($scope.Paciente.telefono));
		paciente.set("eps", parseService.validateUndefined($scope.Paciente.eps));
		paciente.set("ips", parseService.validateUndefined($scope.Paciente.ips));
		paciente.set("ars", parseService.validateUndefined($scope.Paciente.ars));
		paciente.set("regimenEspecial", parseService.validateUndefined($scope.Paciente.regimenEspecial));
		paciente.set("observaciones", parseService.validateUndefined($scope.Paciente.observaciones));
		paciente.set("medicoParticular", parseService.validateUndefined($scope.Paciente.medicoparticular));
		paciente.set("genero", parseService.validateUndefined($scope.Paciente.genero));
		
		paciente.set("username", Parse.User.current().get("email"));
		
		paciente.save(null,{
			success: function(paciente){
				idPaciente = paciente.id;
				$state.go("pages.listadopacientes");
			},
			error:function(paciente, error){
			  	console.log(error);	
			}
		});
	}
})

.controller("listadoPacientesCtrl", function($scope, $state, $q, $rootScope, varsFactoryService){

	$scope.pacientes =  [];
	
	$scope.getPicture = function(item){
		
		if(item.hasOwnProperty("genero")){
			if(item.genero == "Hombre"){
				return "img/profile-pics/4.jpg";
			}
			else {
			   return "img/profile-pics/5.jpg";
			}
		}
		else{
			return "img/icon.png";
		}
		
	}
	
	$scope.navegarAdjuntos = function(item){
		$rootScope.currentPacient = item;
		$scope.Paciente = item;
		varsFactoryService.fijarPaciente(item.RowKey, { pacienteId: item.objectId});
		$state.go("pages.picker");		
	}
	
	$scope.irDiagnosticos = function(item){
		$rootScope.currentPacient = item;
		$scope.Paciente = item;
		varsFactoryService.fijarPaciente(item.RowKey);
		$state.go("pages.diagnosticosPacientes", { pacienteId: item.objectId});
	}
	
	$scope.editar = function(item){
		$state.go("pages.paciente", { pacienteId: item.objectId});
	}
	
	$scope.eliminar = function(item, index){
		item.destroy();
		$scope.pacientes.splice(index, 1);
	}
	
	$scope.nuevo = function(){
		$scope.Paciente = {};
		$state.go("pages.paciente");		
	}
	
	function listarPacientes(){
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
		
		PacientesDfd.promise.then(function(result){
			for (var i = 0; i < result.length; i++) {
			  $scope.pacientes.push(result[i].toJSON());
			}	
		})
		.catch(function(error){
			
		});
	}
	
	listarPacientes();
	
})