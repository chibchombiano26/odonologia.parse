angular.module('directivas').
directive('colorPicker', ['$parse', '$timeout', function ($parse, $timeout) {
	
	var Attr;
	var Element;
	var Scope;

	return {
		require: ['ngModel'],
		restrict: 'E',
		scope: {
			
		},
		templateUrl : 'vendors/hefesoft/Directivas/colorPicker/templates/colorPicker.html',
		link: function (scope, element, attr, ngModelCtrl) {			
		  		  
		  var text = $(element[0]).find('.cp-value');
		  var colorPicker = $(element[0]).find('.color-picker');
		  var span = $(element[0]).find('.cp-value');
		  var fb;

		  
		  if (colorPicker[0]) {
			 colorPicker.each(function(){
			    colorPicker.each(function(){
		            var colorOutput = $(this).closest('.cp-container').find('.cp-value');		                
		                colorPicker.farbtastic(colorOutput);
		                fb = $.farbtastic(colorPicker);
		                fb.callback = seleccionado;		                	                
		            });
		        });
		    }
		  
		  ngModelCtrl[0].$render = function(){
		  	if (!ngModelCtrl[0].$isEmpty(ngModelCtrl[0].$viewValue)) {
		  		var valor = ngModelCtrl[0].$viewValue;	
		  		$.farbtastic(colorPicker).setColor(valor);
            }
		  }

		  function seleccionado(e){
		  	text.val(e);
		  	span.css("background-color", e);
		  	ngModelCtrl[0].$setViewValue(e);
		  }
		}
	};
}])