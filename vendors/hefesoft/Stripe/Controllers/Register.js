angular.module('Stripe')
.controller('StripeCtrl', ['$scope', 'dataTableStorageFactory', 'users' , 'messageService', 'stripeService',
	function ($scope, dataTableStorageFactory, users, messageService, stripeService) {
	
	Stripe.setPublishableKey('pk_test_OUODqwD5OAZpCT6yS2hlJ3Bz');
	$scope.MesAnioNoValido = true;	
	$scope.tarjetaNoValida = true;
	$scope.tieneCupon = false;
	$scope.cupon = "";
	$scope.card;

	var mes = 0;
	var anio = 0;
	var token;	
	
	$scope.cuponText = function(m){
		$scope.cupon = m;		
	}

	$scope.cuponChange = function(m){
		$scope.tieneCupon = m;
	}

	$scope.submit = function(){
		var validoCupon = validarTieneCupon();

		if(validoCupon){
			var $form = $('#payment-form');	

			$form.find('button').prop('disabled', true);

		    Stripe.card.createToken($form, stripeResponseHandler);

		    // Prevent the form from submitting with the default action
		    return false;
		}
		else{
			messageService.showMessage("Si posee un cupon de descuento por favor ingreselo");
		}
	}

	function stripeResponseHandler(status, response) {
	  var $form = $('#payment-form');

	  if (response.error) {
	    // Show the errors on the form
	    $form.find('.payment-errors').text(response.error.message);
	    $form.find('button').prop('disabled', false);
	    messageService.showMessage(response.error.message);
	  } 
	  else {
	    // response contains id and card, which contains additional card details
	    token = response.id;
	    // Insert the token into the form so it gets submitted to the server
	    $form.append($('<input type="hidden" name="stripeToken" />').val(token));

	    //el token que llega se debe enviar a el backend

	    // and submit
	    //$form.get(0).submit();
	    var data = response;
	    data.PartitionKey = users.getCurrentUser().username;
	    data.nombreTabla = "TmStripeUserCard";
	    data.RowKey = response.id;
	    data.card = JSON.stringify(response.card);
	    $scope.card = data.card;
	    dataTableStorageFactory.saveStorage(data).then(success);
	  }
	};

	//Ya con el token se debe suscribir a el plan
	function success(data){
		var item = {
			email : users.getCurrentUser().email,
			descripcion : "Suscripcion odontologia",
			planId : "Odontologia",
			tienecupon : $scope.tieneCupon,
			Cupon : $scope.cupon,
			token : token
		};
		stripeService.saveStorage(item).then(function(response){
			//Se guarda el registro delusuario suscrito a un plan
			var data = response;
		    data.PartitionKey = users.getCurrentUser().username;
		    data.nombreTabla = "TmStripeSubscription";
		    data.RowKey = response.id;
		    data.card = $scope.card;
		    data.plan1 = JSON.stringify(response.subscriptions.data[0]);		    

			dataTableStorageFactory.saveStorage(data);
			messageService.showMessage("Se ha inscrito satisfactoriamente");
		});		
	}

	$scope.month = function(m){		
		mes = m;
		$scope.MesAnioNoValido = !(Stripe.card.validateExpiry(mes, anio));		
	}

	$scope.year = function(m){
		anio = m;
		$scope.MesAnioNoValido = !(Stripe.card.validateExpiry(mes, anio)); 		
	}

	$scope.validateCard = function(card){
		try{
			if(card.length > 0){
				$scope.cardType = Stripe.card.cardType(card);

				if($scope.cardType == "Unknown"){
					$scope.cardType = "";
				}

				$scope.tarjetaNoValida = !(Stripe.card.validateCardNumber(card)); 
			}
		}
		catch(ex){

		}	
	}

	function validarTieneCupon(){
		var valido = true;
		if($scope.tieneCupon && $scope.cupon.length == 0){
			valido = false;
		}

		return valido;
	}
	
}])