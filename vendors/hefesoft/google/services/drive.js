/*global angular, gapi, google*/
angular.module('hefesoft.google')
.service('driveApi', 
	['$q', function ($q) {
	
	var CLIENT_ID = '505952414500-c04fnrdu3njem1cl2ug9h5gbd6rs025k.apps.googleusercontent.com';
  var SCOPES = [
  "https://www.googleapis.com/auth/drive", 
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/drive.appdata",
  "https://www.googleapis.com/auth/drive.apps.readonly",
  "https://www.googleapis.com/auth/drive.metadata"
  ];
	var dataFactory = {};


  dataFactory.list = function(callback) {
  var retrievePageOfFiles = function(request, result) {
    request.execute(function(resp) {
      result = result.concat(resp.items);
      var nextPageToken = resp.nextPageToken;
      if (nextPageToken) {
        request = gapi.client.drive.files.list({
          'pageToken': nextPageToken
        });
        retrievePageOfFiles(request, result);
      } else {
        callback(result);
      }
    });
  }
  var initialRequest = gapi.client.drive.files.list();
  retrievePageOfFiles(initialRequest, []);
  }

  dataFactory.loadApi = function(){
      var deferred = $q.defer();
      gapi.client.load('drive', 'v2').
        then(function(){ 
            console.log('loaded.');
            deferred.resolve(); 
      });

      return deferred.promise;
  }

	dataFactory.getAuth = function(){
		var deferred = $q.defer();
		gapi.auth.authorize(
        {
            'client_id': CLIENT_ID,
            'scope': SCOPES,
            'immediate': true
        }, function(result){
        	if (result && !result.error) {
        		deferred.resolve(result);
        	}
        	else{
        		deferred.reject(result);
        	}
        });

        return deferred.promise;
	}

  dataFactory.auth = function(){
    var deferred = $q.defer();
     gapi.auth.authorize(
      {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
      function(result){
        if (result && !result.error) {
            deferred.resolve(result);
          }
          else{
            deferred.reject(result);
          }
      });
     return deferred.promise;
  }
 

  dataFactory.insert = function(fileData, callback) {
  var deferred = $q.defer();
  const boundary = '-------314159265358979323846';
  const delimiter = "\r\n--" + boundary + "\r\n";
  const close_delim = "\r\n--" + boundary + "--";

  var reader = new FileReader();
  reader.readAsBinaryString(fileData);
  reader.onload = function(e) {
    var contentType = fileData.type || 'application/octet-stream';
    var metadata = {
      'title': fileData.fileName,
      'mimeType': contentType
    };

    var base64Data = btoa(reader.result);
    var multipartRequestBody =
        delimiter +
        'Content-Type: application/json\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: ' + contentType + '\r\n' +
        'Content-Transfer-Encoding: base64\r\n' +
        '\r\n' +
        base64Data +
        close_delim;

    var request = gapi.client.request({
        'path': '/upload/drive/v2/files',
        'method': 'POST',
        'params': {'uploadType': 'multipart'},
        'headers': {
          'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
        },
        'body': multipartRequestBody});
    if (!callback) {
      callback = function(file) {
        deferred.resolve(event);
        console.log(file)
      };
    }
    request.execute(callback);
  }

  return deferred.promise;
  }

  dataFactory.updateFile = function (fileId, fileMetadata, fileData, callback) {
  var deferred = $q.defer();
  const boundary = '-------314159265358979323846';
  const delimiter = "\r\n--" + boundary + "\r\n";
  const close_delim = "\r\n--" + boundary + "--";

  var reader = new FileReader();
  reader.readAsBinaryString(fileData);
  reader.onload = function(e) {
    var contentType = fileData.type || 'application/octet-stream';
    // Updating the metadata is optional and you can instead use the value from drive.files.get.
    var base64Data = btoa(reader.result);
    var multipartRequestBody =
        delimiter +
        'Content-Type: application/json\r\n\r\n' +
        JSON.stringify(fileMetadata) +
        delimiter +
        'Content-Type: ' + contentType + '\r\n' +
        'Content-Transfer-Encoding: base64\r\n' +
        '\r\n' +
        base64Data +
        close_delim;

    var request = gapi.client.request({
        'path': '/upload/drive/v2/files/' + fileId,
        'method': 'PUT',
        'params': {'uploadType': 'multipart', 'alt': 'json'},
        'headers': {
          'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
        },
        'body': multipartRequestBody});
    if (!callback) {
      callback = function(file) {
        console.log(file)
        deferred.resolve(event);
      };
    }
    request.execute(callback);
  }
  
  return deferred.promise;

  }

	return dataFactory;

}])