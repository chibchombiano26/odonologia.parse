angular.module('Util')
.filter('piezaDentalImage', function () {
  return function (item) {      
  		if(angular.isDefined(item)){

        var element = String(item);
        var lastCharacter = element.substr(element.length - 1);

        if(lastCharacter == "+"){
          return element.replace("+", "");
        }
        else{
          return item;
        }

      }
      else{
        return item;
      }
  };
})

.filter('piezaDentalNumero', function () {
  return function (item) {

      if(angular.isDefined(item)){
        item = String(item);
        item = item.replace("tachados-", "");
        item = item.replace("tornillo-", "");

        return item;
      }
      else{
        return item;
      }
  };
});
