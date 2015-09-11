angular.module('auth')

.factory('users', ['$localstorage', function($localstorage) {
  
  var userFactory = {};

  userFactory.getCurrentUser = function(){
  	try{
	    var data = $localstorage.getObject('user');

	    if(data && data.hasOwnProperty('username')){
		    var username = data.username.split('@')[0];
		    return {username : username, email : data.username, password: data.password};
		}
	}
	catch(ex) {
		throw ex;
	}
  }

  userFactory.userEmailToUser = function(usernameEmail){
  	try{
        var username = usernameEmail.split('@')[0];
	    return username;		
	}
	catch(ex) {
		throw ex;
	}
  }

  return userFactory; 

}]);