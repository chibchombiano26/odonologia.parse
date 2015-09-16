angular.module('directivas')
.controller('odontologoscomcoCtrl', ['$scope', 'readIoService',
	function ($scope, readIoService) {

	

	$scope.data = {};

	function inicializar(){
		var url = '//api.import.io/store/data/7b2d3d44-4b4d-4c27-b90d-e74da90cef63/_query?input/webpage/url=http%3A%2F%2Fwww.odontologos.com.co%2F&_user=5d6ea678-a4c1-4f98-86e4-8fd0526afca7&_apikey=';
		readIoService.readUrl(url).then(success);
	}

	function success(data){
		$scope.data =  data;
	}

	inicializar();

}])