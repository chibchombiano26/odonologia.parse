/*global angular, gapi*/
angular.module('hefesoft.google')
.service('googlePickerService', 
	['$q', function ($q) {
	
    var dataFactory = {};

    dataFactory.load = function(onPickerApiLoad){
         gapi.load('picker', {'callback': onPickerApiLoad});
    }
    
	return dataFactory;

}])