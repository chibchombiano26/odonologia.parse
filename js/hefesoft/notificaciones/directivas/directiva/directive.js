angular.module('directivas')
.directive('notificationList', [function () {
	
	var directiva = {};
	directiva.restrict  = "E";
	directiva.templateUrl = "app/scripts/controllers/notificaciones/directivas/template/notificaciones.html";
	directiva.controller = "listadoNotificacionesCtrl";
	directiva.replace= true;

	directiva.link = function (scope, iElement, iAttrs) {
			
	}

	return directiva;
	
}])