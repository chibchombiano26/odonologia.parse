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
  
  var detectPopUp = {
        check: function(popup_window){
            var _scope = this;
            if (popup_window) {
                if(/chrome/.test(navigator.userAgent.toLowerCase())){
                    setTimeout(function () {
                        _scope._is_popup_blocked(_scope, popup_window);
                     },200);
                }else{
                    popup_window.onload = function () {
                        _scope._is_popup_blocked(_scope, popup_window);
                    };
                }
            }else{
                _scope._displayError();
            }
        },
        _is_popup_blocked: function(scope, popup_window){
            if ((popup_window.innerHeight > 0)==false){ scope._displayError(); }
        },
        _displayError: function(){
            alert("Chrome esta bloquenado una ventana que se intenta abrir en la parte superior derecha veras un icono da click y habilitalos");
        }
    };
  
  
  
  
  function nombreToSuperficie(item){
    switch (item && item.toLocaleLowerCase()) {
     case 'centro':
      return "Oclusal";
     case 'izquierda':
      return "Distal";
     case 'derecha':
      return "Mesial";
     case 'arriba':
      return "Vestibular";
     case 'abajo':
      return "Lingual o Palatino";
     case 'piezacompleta':
      return 'Pieza Completa';
     
     default:
      return item;
  }
  }


  return {
    "saveStorageObject" :  saveStorageObject,
    "getStorageObject" : getStorageObject,
    "isEmpty" : isEmpty,
    "angularObjectToParse": angularObjectToParse,
    "generoPic": generoPic,
    "detectPopUp" : detectPopUp,
    "debug" : true,
    "experimental": false,
    "nombreToSuperficie" : nombreToSuperficie,
    "googleAuth" : {},
    "global" : {}
  }

}();