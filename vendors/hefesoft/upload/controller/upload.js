angular.module('Upload')
.controller('uploadCtrl', ['$scope', 'uploadService', '$timeout', 'varsFactoryService', 'users', '$ionicLoading', 'validarNavegacionService', 'dataTableStorageFactory', 'messageService',
    function ($scope, uploadService, $timeout, varsFactoryService, users, $ionicLoading, validarNavegacionService, dataTableStorageFactory, messageService) {

        
        validarNavegacionService.validarPacienteSeleccionado();

        $scope.fileUploadProgress = "0.00 %";
        $scope.fileName = "";
        $scope.mostrarUploadButton = true;

        var urlUploadFiles = "http://hefesoft.blob.core.windows.net/files/files?sv=2014-02-14&sr=c&sig=RqRcu1vwp56UdXTdRpZfEEWzv7rYrDT87B5iZafAOS4%3D&st=2015-05-15T05%3A00%3A00Z&se=2030-12-02T05%3A00%3A00Z&sp=rwl";       
        var path = "http://hefesoft.blob.core.windows.net/files/files/";

        $scope.files = [];         
    

        function validateDevice(){
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                // Great success! All the File APIs are supported.
            } 
            else {
                messageService.showMessage("No soportado en este dispositivo"); 
            }
        }

         
        //Read the file and find out how many blocks we would need to split it.
        $scope.handleFileSelect = function(e) {

            var usuario = users.getCurrentUser();
            var pacienteId = varsFactoryService.pacienteSeleccionado();

            $scope.files = Array.prototype.slice.call(e);

            //Se debe garantizar que para un mismo usuario y paciente no se sobrescribar archivos
            //Por eso se le agrega el nombre del paciente y el usuario logueado
            for (var i = $scope.files.length - 1; i >= 0; i--) {
                $scope.files[i]["blobname"] = $rootScope.currentUser.id + "_" + pacienteId.RowKey + "_"+ $scope.files[i].name;
            };


            $scope.mostrarCargar = true;
        }
 
        
 
     $scope.uploadFileInBlocks = function() {
        $ionicLoading.show();
        if($scope.files.length > 0){
            $scope.mostrarUploadButton = false;
            uploadService.upload($scope.files[0], urlUploadFiles).then(success, error, notify);
        }
        else{
            $scope.mostrarUploadButton = true;
            $ionicLoading.hide();
        }
     } 

     $scope.eliminar = function(n){        
        var index = $scope.files.indexOf(n);

        if(index >= 0){
            $scope.files.splice(index, 1);
        }
     }

     //Validar que hayan mas archivos para subir
     function success(){
        if($scope.files.length > 0){

            var ultimoArchivoSubido = $scope.files[0];
            salvarEnStorage(ultimoArchivoSubido);
            $scope.files.splice(0, 1);
            $timeout(function(){$scope.uploadFileInBlocks();}, 2000);            
        }
     }

     function error(data){
        $ionicLoading.hide();
        console.log(data);
     }

     function notify(data){
        $scope.fileUploadProgress = data.percent;
        $scope.fileName = data.filename;
     }

     //Se debe guardar el listado de los archivos en una tabla para despues poderlos cargar
     function salvarEnStorage(data){ 
        var usuario = users.getCurrentUser();
        var pacienteId = varsFactoryService.pacienteSeleccionado();

        var imagen = {};
        imagen.nombreTabla = 'TmArchivosAdjuntos';        
        imagen.PartitionKey = $rootScope.currentUser.id + "paciente" + pacienteId.RowKey;
        imagen.generarIdentificador = true;
        imagen.path = path + data.blobname;
        imagen['name'] = data.name;
        imagen['type'] = data.type;
        imagen['size'] = data.size;

        dataTableStorageFactory.saveStorage(imagen);
     }

     validateDevice();
	
}])