angular.module('odontologiaApp')
.controller('esanumCtrl', ['$scope', 'esanumService',
	function ($scope, esanumService) {

	$scope.data = {};
	
	function inicializar(){
		esanumService.login("futbolito152@gmail.com", "iguazo26").then(success);
	}

	function success(data){		
		esanumService.news().then(function(news){
			var result = news.obtenerElementoPorPropiedad('text');
			$scope.data = result;
		})
	}

	inicializar();

}])