/*global angular, moment*/
angular.module("hefesoft.google")
.service("appScriptEmailServices", function($timeout){
  
  var dataFactory = {};
  
  
  dataFactory.sendEmailWindow = function(recipient, subject, body){
      var url = "https://script.google.com/macros/s/AKfycbys8yRou7As5TYyYrynutnsCWFHOUzNqK3dV09rUqvLu6hD_zE/exec?recipient=" + recipient + "&subject=" + subject + "&body=" + body + "&callback=?";
      var win = window.open(url, "_blank");
      
      $timeout(function(){
          win.close();
      },8000);
  }
  
 
  return dataFactory;
    
})