angular.module('directivas').
controller('listGalleryCtrl', 
  ['$scope', 'Lightbox', 'dataTableStorageFactory', '$modal', '$rootScope',
	function ($scope, Lightbox, dataTableStorageFactory, $modal, $rootScope) {

  $scope.images = [];


  $scope.openLightboxModal = function (index) {
    Lightbox.openModal($scope.images, index);
  };

  $scope.eliminar = function(elemento, $index){
	var index = $scope.images.indexOf(elemento);

    if(index >= 0){
        $scope.images.splice(index, 1);
    }

 	dataTableStorageFactory.deleteFromStorage(elemento.item);
  }

  function inicializar(){
  	dataTableStorageFactory.getTableByPartition('TmArchivosAdjuntos', Parse.User.current().get("email")) 
		.success(success)
        .error(error);
  }

  function success(data){
  	$scope.images = [];
  	for (var i = data.length - 1; i >= 0; i--) {
  		$scope.images.push({url : data[i].path, thumbUrl : data[i].path, caption : data[i].name, item : data[i] });  		
  	};
  }

  function error(err){
  	console.log(err);
  }

  /****************** adicionar ******************/
   $scope.open = function (size, seleccionado) {
     var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/lib/hefesoft.standard/Directivas/gallery/views/add.html',
        controller : 'addGalleryCtrl',
        size: size,
        resolve: {
          
        }
      });

    modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, 
      function (data) {        
        inicializar();        
      });
  };

  inicializar();
	
}])