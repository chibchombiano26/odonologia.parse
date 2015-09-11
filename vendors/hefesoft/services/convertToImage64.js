angular.module('hefesoft.services')
.service('image64Service', [function () {

	var dataFactory = {};

	dataFactory.convertImgToBase64 = function (url, callback, outputFormat){
		var img = new Image();
		img.crossOrigin = 'Anonymous';
		img.onload = function(){
		    var canvas = document.createElement('CANVAS');
		    var ctx = canvas.getContext('2d');
			canvas.height = this.height;
			canvas.width = this.width;
		  	ctx.drawImage(this,0,0);
		  	var dataURL = canvas.toDataURL(outputFormat || 'image/png');
		  	callback(dataURL);
		  	canvas = null; 
		};
		img.src = url;
	}

	return dataFactory;
	
}])