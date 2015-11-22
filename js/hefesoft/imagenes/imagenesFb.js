/*global angular, FB, hefesoft, Parse*/
angular.module('odontologiaApp')
.controller('fbImagesCtrl', function($scope, $interval, fbHefesoftService, imgur, $q){
    
    $scope.data = [];
    imgur.setAPIKey('Client-ID d17cf745c618359');
    var tokenFbUser = "CAAXqi2mgmHkBAEWK3hOMUbbbCFyugVesg0rtZB20zqAZCMeispKOrL6oIO3AWZAYnEDadPL5fy7G6twk3oJSOWWmEWUFA5ZAKvzPreZBMsCZC8Q5nSBqhF3ISZCBoiQRaNuv7rF0GntE8VJIecdEoxWL7TaKfAP0KFTMYwcX3fT4yldzl3bnCLp";
    
    
    function inicializar(){
        var interval = $interval(function(){
            if(typeof FB !== 'undefined'){
                $interval.cancel(interval);
                obtenerImagenes();
           }
            
        }, 1000);
    }
    
    
    function obtenerImagenes(){
        
        fbHefesoftService.getImages().then(function(result){
            $scope.data = result; 
        })
        
        
        /*
        
        imgur.getAlbums().then(function(results){
            debugger
        })
        */
        
        /*
        imgur.getAlbumImages("xyhhW").then(function(results){
            $scope.data = results; 
        })
        */
    }
    
    $scope.fileLoaded = function(file){
        uploadImgUr(file).then(function(result){
            fbHefesoftService.postImage(result.link, tokenFbUser).then(function(item){
              $scope.data.push(item);
            })
        })
    }
    
    
    function uploadImgUr(file){
        var deferred = $q.defer();
        /*
        fbHefesoftService.postImage(fileUpload).then(function(fileUpload){
            
        })
        */
        
        imgur.upload(file, "xD0UaXP8pBQ0TIR").then(function then(model) {
            console.log('Your adorable cat be here: ' + model.link);
            deferred.resolve(model);
        });
        
        /*
        
        imgur.getAlbums().then(function(results){
            debugger
        })
        
        imgur.createAlbum('hefesoft dentiline', 'public').then(function(results){
            debugger
        })
        
        */
        
        return deferred.promise;
    }
    
    obtenerImagenes();
    
})