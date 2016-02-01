/*global angular, FB*/
angular.module('odontologiaApp').
service('fbGroupsService', ['$q', '$interval', function($q, $interval) {

	var dataFactory = {};

	dataFactory.getWall = function(url) {
		var deferred = $q.defer();
		$.ajax({
			url: url,
			type: 'GET',
			success: function(data) {
				deferred.resolve(data);
			},
			error: function(e) {
				deferred.reject(e);
			}
		});

		return deferred.promise;
	}

	dataFactory.getWallFbApi = function(query) {
		var deferred = $q.defer();
		var promise = $interval(function() {

			if (FB) {
				$interval.cancel(promise);
				getWall(query).then(function(data) {
					deferred.resolve(data)
				})
			}

		}, 1000);

		return deferred.promise;

	}

	function getWall(query) {
		var deferred = $q.defer();
		FB.api(query, {
				"fields": "name,type,picture,link,message,description,comments{message}",
				"access_token": "1665259377039481|sFBCPhvzZ0hYVZHJYZblYBV_yi8"
			},
			function(response) {

				if (response && !response.error) {
					deferred.resolve(response.data);
				}
			}
		);
		return deferred.promise;
	}

	return dataFactory;

}])