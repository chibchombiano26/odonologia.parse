/*global angular, Parse, _, hefesoft*/
angular.module('odontologiaApp').
controller('realizarPeriodontogramaCtrl', 
    ['$scope', 'dataTableStorageFactory', '$rootScope', 'piezasDentalesPeriodontogramaServices', 'messageService', '$stateParams', 'periodontogramaServiceParse', '$interval', '$timeout', 'modalService', '$state',
    function ($scope, dataTableStorageFactory, $rootScope, piezasDentalesServices, messageService, $stateParams, periodontogramaServiceParse, $interval, $timeout, modalService, $state) {
	
	$scope.selecionado = {numeroPiezaDental: 18, mostrarFurca : false, tipoFurca: 'vacio', "movilidad" : "", parte: 'parte1'};
	$scope.mostrarFurca = false;
	$scope.contextoPiezaDental = {};
	var cambioDetectado = false;
	var prestador;
	$scope.prestadorNombre = "";
	
	$scope.seleccionado = false;
    $scope.zoom = 0.8;

    var idPeriodontograma = 0;
    var diagnosticoPacienteId = 0;
    var periodontograma;
	
	if($stateParams.diagnosticoPacienteId.length > 0){
		diagnosticoPacienteId = $stateParams.diagnosticoPacienteId;
		inicializarDatos();
	}
   

    function inicializarDatos(){
    
      hefesoft.util.loadingBar.start();
      periodontogramaServiceParse.cargarPeriodontograma(diagnosticoPacienteId).then(function(data){
	  hefesoft.util.loadingBar.complete();
	  
	  	if(data){
	  	    var result = data.toJSON();
	  	    idPeriodontograma = result.objectId;
	  	    var Periodontograma = result.listado;
	  	    
	  	    if(result.prestador){
	  	        $scope.prestadorNombre = "Prestador: " +  result.prestador.nombre;
	  	    }
	  	    
	  	    //Ordenarlos deacuerdo al codigo como en la nube se guardan en string no los ordena bien
            data = _.sortBy(Periodontograma, function(item) {
               return parseFloat(item.id);
            });
	  		
      		var promise = $interval(function(){
      			if(angular.isFunction($scope.contextoPiezaDental)){
      		
      		         var contextoPiezas = $scope.contextoPiezaDental();
                     contextoPiezas.items = data; 
        
                     if(contextoPiezas.items.length > 0){
                        piezasDentalesServices.fijarPiezasDentales(contextoPiezas.items);
                     }
                     
                     $interval.cancel(promise);
      			}
      			
      		}, 1000);
	  	}
	  	else{
	  		
	  		var promise = $timeout(function(){
	  			
	  			//se ponen aca xq aca ya tienen valor
	 		    var contextoPiezas = $scope.contextoPiezaDental();
                contextoPiezas.obtenerPeriodontogramaBase();
	 			$timeout.cancel(promise);
	  			
	  		}, 8000);
	  	}
	  	
	  })

    }
    
    $scope.seleccionarPrestador = function(){
        modalService.open('lg', 'js/hefesoft/modal/prestadorModal.html', 'prestadorModelCtrl', undefined, function(e){
            modalService.close();
            prestador = e.item;
            $scope.prestadorNombre = "Prestador: " +  prestador.nombre;
        });
    }

	$scope.piezaDentalSeleccionada = function(item){
		$scope.selecionado = item;
        $scope.mostrarFurca = Boolean(item.mostrarFurca);
        cambioDetectado = true;
        $scope.seleccionado = true;
        piezasDentalesServices.setModified(item.codigo);
	}

	$scope.sangradoSupurado = function(parte){
        //Valida que este en una pieza dental
        if($scope.selecionado.hasOwnProperty(parte)){
            //Gris
            if($scope.selecionado[parte] == "#e6e6e6"){
                $scope.selecionado[parte] =  "#fa5858"; 
            }
            //Rojo
            else if($scope.selecionado[parte] == "#fa5858"){
                $scope.selecionado[parte] =  "#e6e6e6"; 
            }
        }
    }

    $scope.placa = function(parte){
        //Valida que este en una pieza dental
        if($scope.selecionado.hasOwnProperty(parte)){
            //Gris
            if($scope.selecionado[parte] == "#e6e6e6"){
                $scope.selecionado[parte] =  "#58acfa"; 
            }
            //Azul
            else if($scope.selecionado[parte] == "#58acfa"){
                $scope.selecionado[parte] =  "#e6e6e6"; 
            }
        }
    }

    $scope.implante = function(){
        if($scope.selecionado.implante == ""){
            $scope.selecionado.implante = "tornillo";
        }
        else if($scope.selecionado.implante == "tornillo"){
            $scope.selecionado.implante = "tachado";
        }
        else if($scope.selecionado.implante == "tachado"){
            $scope.selecionado.implante = "";
        }
    }

    $scope.furca = function(){
        
        if($scope.selecionado.tipoFurca == ""){
            $scope.selecionado.tipoFurca = "mediolleno";
        }
        //Medio lleno
        else if($scope.selecionado.tipoFurca == "img/Periodontograma/mediolleno.png"){
            $scope.selecionado.tipoFurca = "lleno";
        }
        //Lleno
        else if($scope.selecionado.tipoFurca == "img/Periodontograma/lleno.png"){
            $scope.selecionado.tipoFurca = "cuadrado";   
        }
        //
        else if($scope.selecionado.tipoFurca == "img/Periodontograma/cuadrado.png"){
            $scope.selecionado.tipoFurca = "circulo_vacio";   
        }
        //Circulo vacio
        else if($scope.selecionado.tipoFurca == "img/Periodontograma/vacio.png"){
            $scope.selecionado.tipoFurca = "vacio";
        }       
    }

	$scope.guardarCommand = function(){
	    var contextoPiezas = $scope.contextoPiezaDental();
        var Listado = contextoPiezas.items;
        guardar(Listado, true);
        
	}

    function guardar(Listado, navegar){
        
        var contextoPiezas = $scope.contextoPiezaDental();
        hefesoft.util.loadingBar.start();
        periodontogramaServiceParse.savePeriodontograma(Listado, diagnosticoPacienteId, idPeriodontograma, prestador).then(function(result){
            var item = result.toJSON();
            idPeriodontograma = item.objectId;
            hefesoft.util.loadingBar.complete();
            
            if(navegar){
                $state.go("pages.tree");    
            }
            
        })
    }

    //Periodontograma base cargado
    $scope.periodontogramaBaseCargado = function(item){        
        var listadoGuardar = item;
        guardar(listadoGuardar, false);
    }
    
}])