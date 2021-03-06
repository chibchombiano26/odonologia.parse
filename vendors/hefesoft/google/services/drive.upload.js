/*global angular, gapi, google*/
angular.module('hefesoft.google')
.service('driveApiUpload', function ($q) {
    
    var dataFactory = {};
    
    function createFolder(folder){
        return gapi.client.drive.files.insert(
            {
                'resource':{
                    "title": folder,
                    "mimeType": "application/vnd.google-apps.folder"
                }
            }
        )
    }
    
    
    function ensureUploadFolderPresent(folder){
        var folderQuery = "title=" + "'" + folder + "'";
        var query = "mimeType = 'application/vnd.google-apps.folder' and " +  folderQuery + " and trashed = false";
        return gapi.client.drive.files.list(
            {q: query}
        ).then(function(files){
            var directory=files.result.items;
    
            if(!directory.length){
                return createFolder(folder).then(function(res){
                    return res.result;
                });
            }else{
                return directory[0];
            }
        });
    }
    
    function insertFileWithOutRead(fileData, filename,parentId) {
        
        var deferred = $q.defer();
    
        var boundary = '-------314159265358979323846';
        var delimiter = "\r\n--" + boundary + "\r\n";
        var close_delim = "\r\n--" + boundary + "--";
    
        var contentType = fileData.type || 'application/octet-stream';
        var metadata = {
            'title': filename,
            'mimeType': contentType,
            "parents": [{"id":parentId}]
        };

        var base64Data = btoa(fileData.content);
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
        request.then(function(file){
            deferred.resolve(file.result);
        },function(reason){
            deferred.reject(reason);
        });
        
    
        return deferred.promise;
    }
    
    function insertFile(fileData, filename,parentId, toBinary) {
        
        if(toBinary){
            fileData = dataURItoBlob(fileData);
        }
        
        var deferred = $q.defer();
    
        var boundary = '-------314159265358979323846';
        var delimiter = "\r\n--" + boundary + "\r\n";
        var close_delim = "\r\n--" + boundary + "--";
    
        var reader = new FileReader();
        reader.readAsBinaryString(fileData);
        reader.onload = function (e) {
            var contentType = fileData.type || 'application/octet-stream';
            var metadata = {
                'title': filename,
                'mimeType': contentType,
                "parents": [{"id":parentId}]
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
            request.then(function(file){
                deferred.resolve(file.result);
            },function(reason){
                deferred.reject(reason);
            });
        };
    
        return deferred.promise;
    }
    
    function waitForFileToBecomeActive(fileId){
        var deferred = $q.defer();
    
        gapi.client.request({
            'path': '/drive/v2/files/'+fileId,
            'method': 'GET'
        }).then(function(){
            deferred.resolve();
        },function(){
            setTimeout(function(){
                waitForFileToBecomeActive(fileId).then(function(){
                    deferred.resolve();
                },function(reason){
                    deferred.reject(reason);
                })
            },1000);
        });
    
        return deferred.promise;
    }

    function insertPermission(file){
        return gapi.client.drive.permissions.insert({
            'fileId': file.id,
            'resource': {
                "withLink": true,
                "role": "reader",
                "type": "anyone"
            }
        })
    }
    
    function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}
    
    dataFactory.insertFile = function (fileData, filename, toBinary, modo, folder) {
        return gapi.client.load('drive', 'v2')
        .then(function(){
            return ensureUploadFolderPresent(folder);
        }).then(function(directory){
            if(!modo){
                return insertFile(fileData,filename,directory.id, toBinary);
            }
            else{
                return insertFileWithOutRead(fileData,filename,directory.id, toBinary)
            }
            
        }).then(function(file){
            return waitForFileToBecomeActive(file.id).then(function(){
                return insertPermission(file).then(function(){
                    return file;
                });
            });
        });
    }
    
    
    return dataFactory;
    
    
});