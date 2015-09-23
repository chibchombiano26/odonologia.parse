/*
	La idea de esta directiva es cargar un archivo a las vez
	los archivos se guardan en un array y apenas se van subiento al storage se van eliminando del array
	cuando el array esta en cero ya se subieron todos
*/

angular.module('directivas')
.directive('fileUploadMultipleImageWidget', 
	['uploadService', '$timeout', 'dataTableStorageFactory', '$parse', '$rootScope',
	function (uploadService, $timeout, dataTableStorageFactory, $parse, $rootScope) {

	var urlUploadFiles = "http://hefesoft.blob.core.windows.net/files/files?sv=2014-02-14&sr=c&sig=RqRcu1vwp56UdXTdRpZfEEWzv7rYrDT87B5iZafAOS4%3D&st=2015-05-15T05%3A00%3A00Z&se=2030-12-02T05%3A00%3A00Z&sp=rwl";       
    var path = "//hefesoft.blob.core.windows.net/files/files/";
    var ngCtrl;
    var filesToUpload = [];
    var partitionKey;
    var uploadedImages = [];
    var callback;
    var scopeDirective;

	var directiva = {};
	directiva.require= ['ngModel'];
	directiva.restrict = 'E';
	directiva.template = '<input type="file"  multiple="true" class="file">';
	directiva.scope = {
		partitionKey : '='
	}

	directiva.link = function (scope, element, attr, ngModelCtrl) {
	  scopeDirective = scope;
	  callback = $parse(attr.callBack);	  
	  partitionKey = scope.partitionKey;

	  ngCtrl = ngModelCtrl;
	  var options = 
	  {
	  	'showUpload':false,
	  	'language': 'es', 
	  	'showCaption' : false,
	  	'maxFileSize' : 2000,	  	
	  	'allowedFileExtensions' : ['jpg', 'png','gif'],
	  	'fileType': 'image'
	  };

	  var fileInput = $(element).find('.file').fileinput(options);


	  fileInput.on('filebatchselected', function(event, files) {
	  	uploadedImages = [];
  		filesToUpload = Array.prototype.slice.call(files);
  		for (var i = filesToUpload.length - 1; i >= 0; i--) {
  			filesToUpload[i]['blobname'] = window.Hefesot.random();
  		};

		uploadFileInBlocks();  		

	  });

	}; /* Fin de la directiva */

	function uploadFileInBlocks() {        
        if(filesToUpload.length > 0){            
            uploadService.upload(filesToUpload[0], urlUploadFiles).then(success, error, notify);
        }
        else{            
            callback(scopeDirective.$parent, {'data' : uploadedImages});
        }
    }

     function success(){
        if(filesToUpload.length > 0){
            var ultimoArchivoSubido = filesToUpload[0];
            salvarEnStorage(ultimoArchivoSubido);
            filesToUpload.splice(0, 1);
            $timeout(function(){uploadFileInBlocks();}, 2000);            
        }
     }

      function error(data){        
        console.log(data);
     }

     function notify(data){
        console.log(data);  
     }

     function salvarEnStorage(data){

     	if(angular.isUndefined(partitionKey)){
     		partitionKey = Parse.User.current().get("email");
     	}       

        var imagen = {};
        imagen.nombreTabla = 'TmArchivosAdjuntos';        
        imagen.PartitionKey = partitionKey;
        imagen.generarIdentificador = true;
        imagen.path = path + data.blobname;
        imagen['name'] = data.name;
        imagen['type'] = data.type;
        imagen['size'] = data.size;

        
        dataTableStorageFactory.saveStorage(imagen).then(succesImagen);
     }

     function succesImagen(data){
     	uploadedImages.push(data);
     }

	

	return directiva;

	
	
}])