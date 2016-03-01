/*global angular*/
angular.module('materialAdmin')
	.service('hefesoft_util_service', function($translate) {

		var datafactory = {};

		datafactory.generoPic = function(item, key) {
			if (item.hasOwnProperty(key)) {
				if (item[key] == $translate.instant("GENDER.OPTIONS.MAN")) {
					return "img/profile-pics/4.jpg";
				}
				else {
					return "img/profile-pics/5.jpg";
				}
			}
			else {
				return "img/icon.png";
			}
		}

		datafactory.languaje = function() {
			var userLang = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
			return userLang;
		}


		return datafactory;

	});