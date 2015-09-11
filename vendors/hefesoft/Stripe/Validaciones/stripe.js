angular.module('Stripe')
.directive('validateCard', ['$q', '$timeout', function($q, $timeout) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {

      ctrl.$asyncValidators.validateCard = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // consider empty model valid
          return $q.when();
        }

        var def = $q.defer();

        var result = Stripe.card.validateCardNumber(modelValue);

        if(result){
            def.resolve();
        }
        else{
            def.reject();
        }

        return def.promise;
      };
    }
  };
}])

.directive('validateCvc', ['$q', '$timeout', function($q, $timeout) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {

      ctrl.$asyncValidators.Cvc = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // consider empty model valid
          return $q.when();
        }

        var def = $q.defer();

        var result = Stripe.card.validateCVC(modelValue);

        if(result){
            def.resolve();
        }
        else{
            def.reject();
        }

        return def.promise;
      };
    }
  };
}])

.directive('passwordValidate', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {

                var result = Stripe.card.validateCardNumber(viewValue);
                ctrl.$setValidity('pwd', true);
            });
        }
    };
});


