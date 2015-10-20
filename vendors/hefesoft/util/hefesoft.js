/*global angular, Parse*/
var hefesoft = window.LibName || {};

hefesoft = function () {
  
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  function saveStorageObject(key, item){
      if(validateStorage()){
          localStorage[key] = JSON.stringify(item);
      }
  }
  
  function getStorageObject(key){
      if(validateStorage() && localStorage[key]){
          return JSON.parse(localStorage[key]);
      }
  }
  
  function validateStorage(){
      if('localStorage' in window && window['localStorage'] !== null) {
          return true;
        } 
        else { 
            return false; 
        }
  }
  
  function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  }
  
  function angularObjectToParse(item){
    var result = {};
    if(!isEmpty(item)){
      result = angular.toJson(item);
      result = JSON.parse(result);
    }
    
    return result;
  }
  
  function generoPic(item, key){
    if(item.hasOwnProperty(key)){
			if(item.genero == "Hombre"){
				return "img/profile-pics/4.jpg";
			}
			else {
			   return "img/profile-pics/5.jpg";
			}
		}
		else{
			return "img/icon.png";
		}
  }


  return {
    "saveStorageObject" :  saveStorageObject,
    "getStorageObject" : getStorageObject,
    "isEmpty" : isEmpty,
    "angularObjectToParse": angularObjectToParse,
    "generoPic": generoPic,
    "debug" : true,
    "experimental": false
  }

}();