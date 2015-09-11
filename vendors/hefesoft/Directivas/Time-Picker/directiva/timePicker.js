angular.module('directivas').
directive('timePicker', ['$parse', '$timeout', function ($parse, $timeout) {
	
	var Attr;
	var Element;
	var Scope;

	return {
		require: ['ngModel'],
		restrict: 'E',
		scope: {
			format : '=',
			titulo : "="
		},
		templateUrl : 'app/lib/hefesoft.standard/Directivas/Time-Picker/template/time.html',
		link: function (scope, element, attr, ngModelCtrl) {			
		  var datePicker = $(element).find('.time-picker').datetimepicker({
		      format: 'LT'
		  });

		  datePicker.on("dp.change", function(e){
		  	ngModelCtrl[0].$setViewValue(e.date);
		  });

		  ngModelCtrl[0].$render = function(){

		  	if (!ngModelCtrl[0].$isEmpty(ngModelCtrl[0].$viewValue)) {
		  		var valor = ngModelCtrl[0].$viewValue;		  		
		  		$(datePicker).find('.form-control').val(valor);
            }
		  	
		  }
		}
	};
}])