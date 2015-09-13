 function onload() {
   if(hefesoftLogActivated){
  	 console.log("gapi cargado");
   }
 }

 function renderButton(){
 	gapi.signin2.render('my-signin2', {
        'scope': 'https://www.googleapis.com/auth/plus.login',
        'width': 200,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
      });
 }

  function onSuccess(googleUser) {
   if(hefesoftLogActivated){
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
   }
  }
    
  function onFailure(error) {
      console.log(error);
  }

 function onSignIn(googleUser) {
  if(hefesoftLogActivated){
   var profile = googleUser.getBasicProfile();
   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
   console.log('Name: ' + profile.getName());
   console.log('Image URL: ' + profile.getImageUrl());
   console.log('Email: ' + profile.getEmail());
  }
}

function onLoadPLatform(platform){
  gapi.load('auth2', function() {
      gapi.auth2.init();
  });
}