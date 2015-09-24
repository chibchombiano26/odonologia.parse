angular.module('odontologiaApp')
.controller('listadoProcedimientosCtrl', 
  ['$scope', 'dataTableStorageFactory', '$modal', '$rootScope', 'piezasDentalesServices',
	function ($scope, dataTableStorageFactory, $modal, $rootScope, piezasDentalesServices) {

	$scope.listado = [];  
  $scope.footer = {};
  $scope.modificado = false;

/*************************** Procedimientos *********************/
  $scope.openProcedimientos = function (size, seleccionado) {
     var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'js/hefesoft/procedimientos/views/addProcedimiento.html',
        controller: 'AddProcedimientoCtrl',
        size: size,
        resolve: {
          seleccionado : function () {
            return seleccionado;
          },
          listado : function () {
            return $scope.listado;
          }
        }
      });

    modalInstance.result.then(function (data) {
    	//Avisa cuando se agrego un procedimiento
    	//al que contiene la directiva de procedimiento
    	if(angular.isDefined($scope.fnAdicionado) && angular.isFunction($scope.fnAdicionado)){
   	 		$scope.fnAdicionado($scope.$parent, { 'item' : data });
   		}
    });
  };


  $scope.inicializarElementos = function(elementos){	  
  	$scope.listado = Hefesot.aListado(elementos);
    inicializarSaldos($scope.listado);
    sumarValorFooter($scope.listado);
  }

  $scope.eliminar = function(item, $index){
  	$scope.listado.splice($index, 1);

  	if(angular.isDefined($scope.fnEliminar) && angular.isFunction($scope.fnEliminar)){
   	 	$scope.fnEliminar($scope.$parent, { 'item' : item, "index" : $index });
   	}
  }

  $scope.cambioValorPagado = function(item){
    item.saldo = item.valor - item.valorPagado;
    sumarValorFooter($scope.listado);
    $scope.setModified(item);
  }

  $scope.checkPagado = function(item){
    if(item.Pagado){
      item.saldo = 0;
      item.valorPagado = item.valor;      
    }
    else{
      item.saldo = item.valor;
      item.valorPagado = 0;      
    }

    $scope.setModified(item);
    sumarValorFooter($scope.listado);
  }

  $scope.realizado = function(item){
    if(angular.isDefined($scope.fnProcedimientoRealizado) && angular.isFunction($scope.fnProcedimientoRealizado)){
      $scope.fnProcedimientoRealizado($scope.$parent, { 'item' : item});     
      $scope.setModified(item);
    }
  }

  $scope.setModified = function(item){
    var numero = String(item.codigo);   
    piezasDentalesServices.setModified(numero);
  }

  $scope.generarPdf = function(){
    var columns = [
        {title: "Numero", key: "numeroPiezaDental"},
        {title: "Superficie", key: "superficie"}, 
        {title: "Especialidad", key: "especialidad"}, 
        {title: "Indice de Cups", key: "indiceCups"},
        {title: "Valor", key: "valor"}
    ];  

    var doc = new jsPDF('l', 'pt');
    doc.setFontSize(10);
    doc.text($rootScope.currentUser.name, 100, 60);
    doc.addImage($rootScope.currentUser.dataImagen64, 'JPEG', 30, 40, 50, 50);
    doc.autoTable(columns, formatearParaImprimir(), {startY: 120});
    //var data = doc.output('arraybuffer');
    doc.save('table.pdf');
  }

  function inicializarSaldos(array){
    if(array.length){
      for (var i = array.length - 1; i >= 0; i--) {
          
          if(angular.isUndefined(array[i]['saldo'])){
            array[i]['saldo'] = array[i]['valor']; 
          }
      };  
    }
  }

  function formatearParaImprimir(){
    var arrayImprimir = [];

    for (var i = $scope.listado.length - 1; i >= 0; i--) {
        var elemento = $scope.listado[i];
        var numero = String(elemento.numeroPiezaDental);
        numero = numero.replace("tachados-", "");
        numero = numero.replace("tornillo-", "");

        var valor = parseFloat(Math.round(elemento.valor * 100) / 100).toFixed(2);

        arrayImprimir.push({
          numeroPiezaDental: numero,
          superficie : elemento.superficie,
          especialidad : elemento.objectHefesoftEspecialidad.nombre,
          indiceCups: elemento.idiceCup,
          valor : valor
        })
    };

    var valorTotal = parseFloat(Math.round($scope.footer.valor * 100) / 100).toFixed(2);
    arrayImprimir.push({valor : valorTotal});
    return arrayImprimir;
  }

  function sumarValorFooter(array){
    $scope.footer.valor = _.sum(array, function(object) {
      return object.valor;
     });

    $scope.footer.saldo = _.sum(array, function(object) {
      return object.saldo;
     });
  }

}])