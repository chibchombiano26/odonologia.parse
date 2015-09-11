angular.module('directivas').
directive('datePicker', ['$parse', '$timeout', function ($parse, $timeout) {
	
	var Attr;
	var Element;
	var Scope;

	return {
		require: ['ngModel'],
		restrict: 'E',
		scope: {
			format : '='
		},
		templateUrl : 'app/lib/hefesoft.standard/Directivas/Date-Picker/templates/DatePicker.html',
		link: function (scope, element, attr, ngModelCtrl) {			
		  var datePicker = $(element).find('.input-group').datetimepicker({
		      format: scope.format
		  });

		  datePicker.on("dp.change", function(e){
		  	ngModelCtrl[0].$setViewValue(e.date.toString());
		  });

		  ngModelCtrl[0].$render = function(){

		  	if (!ngModelCtrl[0].$isEmpty(ngModelCtrl[0].$viewValue)) {
		  		var valor = ngModelCtrl[0].$viewValue;
		  		valor = moment(valor).format(scope.format);
		  		$(datePicker).find('.form-control').val(valor);
            }
		  	
		  }
		}
	};
}])