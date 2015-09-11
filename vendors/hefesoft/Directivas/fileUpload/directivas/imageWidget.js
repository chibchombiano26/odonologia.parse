angular.module('directivas')
.directive('fileUploadImageWidget', 
	['uploadService', '$parse', function (uploadService, $parse) {

	var urlUploadFiles = "http://hefesoft.blob.core.windows.net/files/files?sv=2014-02-14&sr=c&sig=RqRcu1vwp56UdXTdRpZfEEWzv7rYrDT87B5iZafAOS4%3D&st=2015-05-15T05%3A00%3A00Z&se=2030-12-02T05%3A00%3A00Z&sp=rwl";       
    var path = "http://hefesoft.blob.core.windows.net/files/files/";
    var ngCtrl;
    var scopeGlobal;
    
	var directiva = {};
	directiva.require= ['ngModel'];
	directiva.restrict = 'E';
	directiva.templateUrl = "app/lib/hefesoft.standard/Directivas/fileUpload/template/imageWidget.html";


	directiva.link = function (scope, element, attrs, ngModelCtrl) {
	  
	  var existClick = attrs['fileUpload'];
      if(angular.isDefined(existClick)){
         scope.fnFileUpload = $parse(attrs['fileUpload']);
      }

      scopeGlobal = scope;

	  ngCtrl = ngModelCtrl;
	  var options = 
	  {
	  	'showUpload':false,
	  	'language': 'es', 
	  	'showCaption' : false,
	  	'maxFileSize' : 2000,
	  	'allowedFileTypes' : ['image']
	  };

	  var fileInput = $(element).find('.file').fileinput(options);

	  fileInput.on('fileloaded', function(event, file, previewId, index, reader) {
	  	 //nombre de la imagen
	  	 file.blobname = window.Hefesot.random();
    	 uploadService.upload(file, urlUploadFiles).then(success);   	 

	  });
	};	

	function success(e){
		ngCtrl[0].$setViewValue(e);
		console.log(e);

		if(angular.isDefined(scopeGlobal.fnFileUpload) && angular.isFunction(scopeGlobal.fnFileUpload)){
			scopeGlobal.fnFileUpload(scopeGlobal, { 'item' : e });
		}
	}

	return directiva;

	
	
}])