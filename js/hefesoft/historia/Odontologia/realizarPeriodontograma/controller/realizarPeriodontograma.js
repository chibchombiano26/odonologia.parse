/*global angular, Parse, _*/
angular.module('odontologiaApp').
controller('realizarPeriodontogramaCtrl', 
    ['$scope', 'dataTableStorageFactory', '$rootScope', 'piezasDentalesPeriodontogramaServices', 'messageService', '$stateParams', 'periodontogramaServiceParse', '$interval', '$timeout',
    function ($scope, dataTableStorageFactory, $rootScope, piezasDentalesServices, messageService, $stateParams, periodontogramaServiceParse, $interval, $timeout) {
	
	$scope.selecionado = {numeroPiezaDental: 18, mostrarFurca : false, tipoFurca: 'vacio', "movilidad" : "", parte: 'parte1'};
	$scope.mostrarFurca = false;
	$scope.contextoPiezaDental = {};
	var cambioDetectado = false; 
	$scope.seleccionado = false;
    $scope.zoom = 0.9;

    var idPeriodontograma = 0;
    
    var idPaciente = 0;
    var periodontograma;
	
	if($stateParams.diagnosticoPacienteId.length > 0){
		idPaciente = $stateParams.diagnosticoPacienteId;
		inicializarDatos();
	}
   

    function inicializarDatos(){
    
      periodontogramaServiceParse.cargarPeriodontograma("AemNcskkZ0").then(function(data){
	  
	  	if(data){
	  	    var result = data.toJSON();
	  	    var Periodontograma = result.listado;
	  	    
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
        guardar(Listado);
        
	}

    function guardar(Listado){
        var contextoPiezas = $scope.contextoPiezaDental();
        periodontogramaServiceParse.savePeriodontograma(Listado, "AemNcskkZ0");
    }

    //Periodontograma base cargado
    $scope.periodontogramaBaseCargado = function(item){        
        var listadoGuardar = item;
        guardar(listadoGuardar);
    }
    
}])