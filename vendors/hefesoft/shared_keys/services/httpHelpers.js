angular.module('Shared')
.service('sharedSignatureHttpHelper', ['$q', function ($q) {
	
	var dataService = {};
    var start = "%28"
    var end = "%27%29"
    var eq = "%20eq%20%27";
    var and = "%20and%20%28";


    /*Ejemplo de invocacion */
    //shared key, Partition, RowKey, data
    //sharedSignatureHttpHelper.insertOrUpdate('?sv=2014-02-14&tn=TmPacientes&sig=nfdIsEBb1m%2FRNCf6COaG1%2FV8icIFspGZXCpk0X5OG30%3D&se=2016-05-16T23%3A40%3A36Z&sp=raud','a', "1", {Titulo: "Prueba storage", modo : "Shared Key" });
    //sharedSignatureHttpHelper.get('','futbolito152', "511");
    //sharedSignatureHttpHelper.delete('','a', "1");

    dataService.getAll = function(table, shared){        
        
        var deferred = $q.defer();
        //Se le agrega a la peticion que el resultado se devuelva como un objeto json
        shared = shared + '&$format=json';       
        var url =  "https://hefesoft.table.core.windows.net/" + table + shared;

         $.ajax({
                url: url,
                type: "GET",                
                success: function (data, status) {                    
                    deferred.resolve(data);
                },
                error: function (xhr, desc, err) {
                    console.log(desc);
                    console.log(err);
                    deferred.reject(xhr);
                }
            });

          return deferred.promise;
     }



     dataService.get = function(table, shared, partitionKey, rowKey){        
        
        //Se le agrega a la peticion que el resultado se devuelva como un objeto json
        shared = shared + '&$format=json';
        var filter = "&$filter=" + start + "PartitionKey" + eq + partitionKey + end;

        /*Validacion si ademas se filtra por rowkey*/

        var filtrarPorRowKey = !(angular.isUndefined(rowKey));

        if(filtrarPorRowKey){
            filter =  filter + and + "RowKey" + eq + rowKey + end;
        }


        shared = shared + filter;
        var url =  "https://hefesoft.table.core.windows.net/" + table + shared;

         $.ajax({
                url: url,
                type: "GET",                
                success: function (data, status) {
                    console.log(data);                    
                },
                error: function (xhr, desc, err) {
                    console.log(desc);
                    console.log(err);                    
                }
            });

     }


	dataService.insertOrUpdate = function(table, shared, partitionKey, rowKey, data){
	
		var url = "https://hefesoft.table.core.windows.net/" + table + "(PartitionKey='" + partitionKey + "',RowKey='" + rowKey + "')" + shared;
        var datos = JSON.stringify(data);

		 $.ajax({
                url: url,
                type: "PUT",
                data: datos,
                dataType: "json",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Accept', 'application/json;odata=minimalmetadata');
                    //xhr.setRequestHeader('Accept-Charset', 'UTF-8');
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    //xhr.setRequestHeader('Host', 'hefesoft.table.core.windows.net');
                    
                },
                success: function (data, status) {
                    console.log(data);
                    
                },
                error: function (xhr, desc, err) {
                    console.log(desc);
                    console.log(err);                    
                }
            });
	}


    /*No soportado por el browser*/
    dataService.delete = function(table, shared, partitionKey, rowKey){

        var url = "https://hefesoft.table.core.windows.net/"+ table + "(PartitionKey='" + partitionKey + "',RowKey='" + rowKey + "')" + shared;        

         $.ajax({
                url: url,
                type: 'DELETE',
                //crossDomain: true, // enable this
                //dataType: 'jsonp',               
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Accept', 'application/json;odata=minimalmetadata');
                    xhr.setRequestHeader('Accept-Charset', 'UTF-8');
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('If-Match', '*');
                    //xhr.setRequestHeader('Origin:', 'chrome-extension://fdmmgilgnpjigdojojpjoooidkmcomcm');
                    xhr.setRequestHeader('Host', 'hefesoft.table.core.windows.net');
                    
                },
                success: function (data, status) {
                    console.log(data);
                    
                },
                error: function (xhr, desc, err) {
                    console.log(desc);
                    console.log(err);                    
                }
            });
    }   


	return dataService;

}])