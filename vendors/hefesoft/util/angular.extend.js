window.Hefesot = {};
var Hefesoft  = window.Hefesot;

Hefesot.aListado = function(listado){
  	 
    if(angular.isString(listado)){
        listado = validarYaEsObjeto(listado);
    }

  	 return listado;
  }

Hefesot.convertirListasAString = function(item){
    try{
        for (var i in item)
        {
            var n = i.indexOf("arrayHefesoft");
            var m = i.indexOf("objectHefesoft");

            if(n >=0 || m >=0){
                item[i] = JSON.stringify(item[i]);
            }          
        }
    }
    catch(ex){
        throw('error al convertir array hefesoft');
    }

    return item;
}

Hefesot.convertirstringAListas = function (item){
    try{
        for (var i in item)
        {
            var nombrePropiedad = i;
            var n = nombrePropiedad.indexOf("arrayHefesoft");
            var m = nombrePropiedad.indexOf("objectHefesoft");

            if(n >=0 || m >=0){
                if(angular.isString(item[i])){
                    item[i] = validarYaEsObjeto(item[i]);
                }
            }          
        }
    }
    catch(ex){
        throw('error al parsear convertirstringAListas' + ex);
    }

    return item;
}


Hefesot.procesarList = function (data){
    if(!angular.isUndefined(data)){
        var esObjeto = (!angular.isUndefined(data) && data !== null && typeof data === 'object');

        if(esObjeto){
            var esArray = (Array.isArray(data));
            if(esArray){
                for (x in data) {
                    var item = data[x];
                    data[x] = Hefesoft.convertirstringAListas(item);
                }               
            }
            else{
                data = Hefesoft.convertirstringAListas(data);
            }
        }
    }

    return data;
}

Hefesot.listTostring = function(elemento, method){
     var aplicarTransformarObjetos = (!angular.isUndefined(elemento) && method === "POST");

     if(aplicarTransformarObjetos){
        var esArray = (Array.isArray(elemento));
        if(esArray){
            for (x in elemento) {
                var data = elemento[x];
                elemento[x] = Hefesot.convertirListasAString(data);
            }               
        }
        else{
            elemento = Hefesot.convertirListasAString(elemento);
        }
    }

    return elemento; 
}

Hefesot.random = function(){
    var rString = random(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    return rString;    
}

// Elemento a eliminar array del que se eliminara
Hefesoft.eliminar = function(item, array){

    if(angular.isDefined(item) && angular.isDefined(array) && angular.isObject(item) && angular.isArray(array)){

        var index = array.indexOf(item);

        if (index > -1) {
            array.splice(index, 1);
        }
    }
}

Hefesoft.getHash = function(path){
    var idx = path.indexOf('#');
    var elemento = path.substr(idx + 2);
    elemento = elemento.replace("/",".");
    return elemento; 
}

function random(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}


function validarYaEsObjeto(item){

    while(angular.isString(item)){
       item = JSON.parse(item);
    }

    return item;
}

