 //var serviceBase = 'http://localhost:3481/';
 var serviceBase = 'https://hefesoftdynamicbackend.azurewebsites.net/';
  
 angular.module('auth')  
 .constant('ngAuthSettings', {
      apiServiceBaseUri: serviceBase,
      clientId: 'ngAuthApp',
      googleClientId: '505952414500-c04fnrdu3njem1cl2ug9h5gbd6rs025k.apps.googleusercontent.com'
});