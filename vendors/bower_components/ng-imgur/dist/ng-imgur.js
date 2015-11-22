(function($angular) {

    "use strict";

    // Something may or may not happen!
    var app = $angular.module('ngImgur', []);

    /**
     * @constant imgurOptions
     * @type {Object}
     */
    app.constant('imgurOptions', {

        /**
         * @constant UPLOAD_URL
         * @type {String}
         */
        UPLOAD_URL: 'https://api.imgur.com/3/image',

        /**
         * @constant UPLOAD_METHOD
         * @type {String}
         */
        UPLOAD_METHOD: 'POST',

        /**
         * @constant API_KEY
         * @type {String}
         */
        API_KEY: ''

    });

    /**
     * @service Imgur
     * @author Adam Timberlake <adam.timberlake@gmail.com>
     * @link https://github.com/Wildhoney/ngImgur
     */
    app.service('imgur', ['$window', '$http', '$q', 'imgurOptions', function ImgurService($window, $http, $q, imgurOptions) {

        var service = {};

        /**
         * @method setAPIKey
         * @param apiKey {String}
         * @return {void}
         */
        service.setAPIKey = function setAPIKey(apiKey) {
            imgurOptions.API_KEY = apiKey;
        };

        /**
         * @method upload
         * @param imageData {String}
         * @return {$q.promise}
         */
        service.upload = function upload(imageData, album) {

            if (!imgurOptions.API_KEY) {

                // Ensure the `API_KEY` has been defined.
                throw "ngImgur: You must define your API key in `imgurOptions.API_KEY`.";

            }

            if (!$angular.isArray(imageData)) {

                // Single image has been supplied so upload and return the promise immediately.
                return this.send(imageData, album);

            }

            var defer    = $q.defer(),
                promises = [];

            // Otherwise we're dealing with an array of images.
            $angular.forEach(imageData, function forEach(imageModel) {

                // Attempt to send the image and keep a track of the promise it returns.
                promises.push(service.send(imageModel, album));

            });

            // Once all the promises have been resolved then we can resolve our promise.
            $q.all(promises).then(function then(resultModels) {
                defer.resolve(resultModels);
            });

            return defer.promise;

        };

        /**
         * @method send
         * @param imageData {Object}
         * @return {$q.promise}
         */
        service.send = function send(imageData, album) {

            var defer  = $q.defer();

            // Strip the image type from the base64 data.
            
            var headerModel = { Authorization: imgurOptions.API_KEY },
                dataModel   = { image: imageData.content, album: album };

            // Issue the request to upload the image data.
            var request = $http({
                url:     imgurOptions.UPLOAD_URL,
                method:  imgurOptions.UPLOAD_METHOD,
                headers: headerModel,
                data:    dataModel
            });

            // Everything was a success!
            request.then(function then(response) {
                defer.resolve(response.data.data);
            });

            // Something went wrong.
            request.error(function error() {
                defer.reject();
            });

            
            return defer.promise;

        };
        
        service.getAlbums = function(){
            var defer  = $q.defer();
            
             var headerModel = { Authorization: imgurOptions.API_KEY };

            //JoseDouglasRamirezEspitia
            // Issue the request to upload the image data.
            var request = $http({
                url:     'https://api.imgur.com/3/account/JoseDouglasRamirezEspitia/albums/',
                method:  'GET',
                headers: headerModel,
            });

            // Everything was a success!
            request.then(function then(response) {
                defer.resolve(response.data.data);
            });

            // Something went wrong.
            request.error(function error() {
                defer.reject();
            });

            
            return defer.promise;
        }
        
        service.getAlbumImages = function(album){
            var defer  = $q.defer();
            
             var headerModel = { Authorization: imgurOptions.API_KEY };

            //JoseDouglasRamirezEspitia
            // Issue the request to upload the image data.
            var request = $http({
                url:     'https://api.imgur.com/3/album/'+ album +'/images',
                method:  'GET',
                headers: headerModel,
            });

            // Everything was a success!
            request.then(function then(response) {
                defer.resolve(response.data.data);
            });

            // Something went wrong.
            request.error(function error() {
                defer.reject();
            });

            
            return defer.promise;
        }
        
        service.createAlbum = function(title, privacy){
            var defer  = $q.defer();
            
             var headerModel = { Authorization: imgurOptions.API_KEY },
             dataModel   = { title : title, privacy : privacy };

            //JoseDouglasRamirezEspitia
            // Issue the request to upload the image data.
            var request = $http({
                url:     'https://api.imgur.com/3/album',
                method:  'POST',
                headers: headerModel,
                data: dataModel
            });

            // Everything was a success!
            request.then(function then(response) {
                defer.resolve(response.data.data);
            });

            // Something went wrong.
            request.error(function error() {
                defer.reject();
            });

            
            return defer.promise;
        }

        return service;

    }]);

})(window.angular);