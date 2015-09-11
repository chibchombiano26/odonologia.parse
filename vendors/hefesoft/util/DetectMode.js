angular.module('Util')
.service('connectionMode', ['platformService', function (platformService) {
  var dataFactory = {};
	var esMobile = platformService.esMobile();

  document.body.addEventListener("offline", function () {
         updateOnlineStatus("offline")
       }, false);
       document.body.addEventListener("online", function () {
         updateOnlineStatus("online")
       }, false);

      function updateOnlineStatus(msg) {
       $rootScope.$broadcast("Cambio de conexion", {Online : navigator.onLine});       
     }

      dataFactory.conexionStatus = function(){
        return navigator.onLine || esMobile;
      }      

     return dataFactory;
	
}])