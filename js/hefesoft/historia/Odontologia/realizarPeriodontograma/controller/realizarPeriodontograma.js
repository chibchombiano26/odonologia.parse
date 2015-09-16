angular.module('odontologiaApp').
controller('realizarPeriodontogramaCtrl', 
    ['$scope', 'dataTableStorageFactory', '$rootScope', 'piezasDentalesPeriodontogramaServices', 'messageService',
    function ($scope, dataTableStorageFactory, $rootScope, piezasDentalesServices, messageService) {
	
	$scope.selecionado = {numeroPiezaDental: 18, mostrarFurca : false, tipoFurca: 'vacio', "movilidad" : "", parte: 'parte1'};
	$scope.mostrarFurca = false;
	$scope.contextoPiezaDental = {};
	var cambioDetectado = false; 
	$scope.seleccionado = false;
    $scope.zoom = 0.9;

    var idPeriodontograma = "usuario" + $rootScope.currentUser.id + "paciente" + $rootScope.currentPacient.RowKey + "diagnosticoPaciente" + $rootScope.currentDiagnostico;

    $scope.$on('$locationChangeStart', function(event) {      
        var Listado = piezasDentalesServices.getModifiedPiezas();

        if(Listado.length > 0){
            event.preventDefault();
            messageService.notify('Hay elementos sin guardar', 'danger');
        }              
    });

    function inicializarDatos(){
      //Carga de Odontograma
      dataTableStorageFactory.getTableByPartition('TmPeriodontograma', idPeriodontograma)
      .success(function(data){
        
        if(angular.isDefined(data) && data.length > 0){
            //Ordenarlos deacuerdo al codigo como en la nube se guardan en string no los ordena bien
            data = _.sortBy(data, function(item) {
               return parseFloat(item.id);
            });
            
            var contextoPiezas = $scope.contextoPiezaDental();
            contextoPiezas.items = data; 

            if(contextoPiezas.items.length > 0){
                piezasDentalesServices.fijarPiezasDentales(contextoPiezas.items);
            }
        }
        else{
             var contextoPiezas = $scope.contextoPiezaDental();
             contextoPiezas.obtenerPeriodontogramaBase();
        }
      }).error(function(error){
        console.log(error);          
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
        else if($scope.selecionado.tipoFurca == "assets/img/Periodontograma/mediolleno.png"){
            $scope.selecionado.tipoFurca = "lleno";
        }
        //Lleno
        else if($scope.selecionado.tipoFurca == "assets/img/Periodontograma/lleno.png"){
            $scope.selecionado.tipoFurca = "cuadrado";   
        }
        //
        else if($scope.selecionado.tipoFurca == "assets/img/Periodontograma/cuadrado.png"){
            $scope.selecionado.tipoFurca = "circulo_vacio";   
        }
        //Circulo vacio
        else if($scope.selecionado.tipoFurca == "assets/img/Periodontograma/vacio.png"){
            $scope.selecionado.tipoFurca = "vacio";
        }       
    }

	$scope.guardarCommand = function(){
        //var Listado = contextoPiezas.items;
        var Listado = piezasDentalesServices.getModifiedPiezas(true);
        guardar(Listado);
        
	}

    function guardar(Listado){
        var contextoPiezas = $scope.contextoPiezaDental();
        //Datos, Nombre tabla, partition key, y campo que servira como row key
        dataTableStorageFactory.postTableArray(Listado, 'TmPeriodontograma',  idPeriodontograma, 'codigo')
        .success(function (data) {           
            contextoPiezas.actualizarPiezas(data);
        })
        .error(function (error) {           
            console.log(error);                    
        });
    }

    //Periodontograma base cargado
    $scope.periodontogramaBaseCargado = function(item){        
        var listadoGuardar = item;
        guardar(listadoGuardar);
    }

    inicializarDatos()
}])