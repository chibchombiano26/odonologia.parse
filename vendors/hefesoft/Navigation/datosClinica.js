angular.module('hefesoft.services')
.service('clinicaNavigation', 
	['dataTableStorageFactory', '$state', '$rootScope', function (dataTableStorageFactory, $state, $rootScope) {
	
	var dataFactory = {};

	dataFactory.validarDatosClinica = function(){
		dataTableStorageFactory.getTableByPartitionAndRowKey('TmDatosClinica', Parse.User.current().get("email"), "1")
      .success(function(data){
        if(data == null){
           $state.go("app.datosclinica");
        }
        else{           
           $state.go("app.main");
        }
      }).error(function(error){
        console.log(error);          
      })
	}

	return dataFactory;


}])