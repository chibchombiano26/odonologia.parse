/*global angular, hefesoft*/
  angular.module('odontologiaApp')
  .controller('videosCtrl', function ($scope, youtube) {
      
      $scope.list = [];

  function inicializar(){
    youtube.loadApi().then(function(){
        youtube.playList('PLc4ZtAvk4ejZkxCVetOmabqZ-AEBpn61u').then(function(result){
            $scope.list = [];
            $scope.list = result.items; 
        })
    })      
   }
   
   $scope.reproduceVideo = function(item){
       var video = item.snippet.resourceId.videoId;
       hefesoft.util.ytPlayer.loadVideoById(video);
   }
   
   
   inicializar();

})