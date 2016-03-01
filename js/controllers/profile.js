/*global materialAdmin, Parse, Hefesoft, hefesoft*/
materialAdmin
.controller('profileCtrl', function($scope, growlService){
  
  
    
})

.controller('profileAboutCtrl', function($scope, growlService, driveApiUpload, $translate){
    
    var modo = "insertar";
    var objectRetrieved;
    
     //User
    this.profileSummary = $translate.instant("CLINIC_INFORMATION.SUMMARY");

    this.fullName = $translate.instant("CLINIC_INFORMATION.FULL_NAME");
    this.gender = $translate.instant("CLINIC_INFORMATION.GENDER");
    this.birthDay = $translate.instant("CLINIC_INFORMATION.BIRTHDAY");
    this.mobileNumber = $translate.instant("CLINIC_INFORMATION.MOBILE_NUMBER");
    this.emailAddress = $translate.instant("CLINIC_INFORMATION.EMAIL_ADDRESS");
    this.twitter = $translate.instant("CLINIC_INFORMATION.TWITTER");
    this.twitterUrl = $translate.instant("CLINIC_INFORMATION.TWITTER_URL");
    this.skype = $translate.instant("CLINIC_INFORMATION.SKYPE");
    this.addressSuite = $translate.instant("CLINIC_INFORMATION.ADDRESSSUITE");
    this.addressCity = $translate.instant("CLINIC_INFORMATION.ADDRESSCITY");
    this.addressCountry = $translate.instant("CLINIC_INFORMATION.ADDRESSCOUNTRY");
    
    if(Parse.User.current() !== null){
        $scope.urlPicture = Parse.User.current().get("pictureUrl");
        this.fullName = Parse.User.current().get("name");
        this.emailAddress = Parse.User.current().get("email");
    }
    
  

    //Edit
    this.editSummary = 0;
    this.editInfo = 0;
    this.editContact = 0;
    
    this.changePicture = function(file){
        hefesoft.util.loadingBar.start();
        
        driveApiUpload.insertFile(file,file.name, false, 'binary', "logo dentiline").then(function(link){
			hefesoft.util.loadingBar.complete();
			
			$scope.urlPicture = "https://docs.google.com/uc?id=" + link.id;
			Parse.User.current().set('pictureUrl', "https://docs.google.com/uc?id=" + link.id);
			Parse.User.current().set('idLogo', link.id);
			Parse.User.current().save();
		})
    }


    this.submit = function(item, message) {
        var itemToSave = this;
        if(item === 'profileSummary') {
            this.editSummary = 0;
        }

        if(item === 'profileInfo') {
            this.editInfo = 0;
        }

        if(item === 'profileContact') {
            this.editContact = 0;
        }
        
        saveChanges(itemToSave, message);
    }
    
    function saveChanges(item, message){
        if(modo === "insertar"){
            insertar(item, message);
        }
        else{
            update(item, message, objectRetrieved);
        }
    }
    
    function update(item, message, profile){
        profile.set("username", Parse.User.current().get("email"));
        profile.set("profileSummary", item.profileSummary);
        profile.set("fullName", item.fullName);
        profile.set("gender", item.gender);
        profile.set("birthDay", item.birthDay);
        profile.set("mobileNumber", item.mobileNumber);
        profile.set("emailAddress", item.emailAddress);
        profile.set("twitter", item.twitter);
        profile.set("twitterUrl", item.twitterUrl);
        profile.set("skype", item.skype);
        profile.set("addressSuite", item.addressSuite);
        profile.set("addressCity", item.addressCity);
        profile.set("addressCountry", item.addressCountry);
        
        
        profile.save(null, {
          success: function(profile) {
            
          },
          error: function(profile, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            
          }
        });
    }
    
    function insertar(item, message){
        var Profile = Parse.Object.extend("Profile");
        var profile = new Profile();
        
        profile.set("username", Parse.User.current().get("email"));
        profile.set("profileSummary", item.profileSummary);
        profile.set("fullName", item.fullName);
        profile.set("gender", item.gender);
        profile.set("birthDay", item.birthDay);
        profile.set("mobileNumber", item.mobileNumber);
        profile.set("emailAddress", item.emailAddress);
        profile.set("twitter", item.twitter);
        profile.set("twitterUrl", item.twitterUrl);
        profile.set("skype", item.skype);
        profile.set("addressSuite", item.addressSuite);
        profile.set("addressCity", item.addressCity);
        profile.set("addressCountry", item.addressCountry);
        
        
        profile.save(null, {
          success: function(profile) {
            objectRetrieved = profile;
            modo = "editar";
          },
          error: function(profile, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            
          }
        });
    }
    
    function getData(elementoActualizar){
        hefesoft.util.loadingBar.start();
        var Profile = Parse.Object.extend("Profile");
        var query = new Parse.Query(Profile);
        query.equalTo("username", Parse.User.current().get("email"));
        query.first({
          success: function(object) {
            convertirAObjeto(elementoActualizar, object);
            hefesoft.util.loadingBar.complete();
          },
          error: function(error) {
            hefesoft.util.loadingBar.complete();
          }
        });
    }
    
    function convertirAObjeto(elementoActualizar, item){
        
        if(item !== undefined){
            elementoActualizar.profileSummary =       item.get("profileSummary");
            elementoActualizar.fullName =             item.get("fullName");
            elementoActualizar.gender =               item.get("gender");
            elementoActualizar.birthDay =             item.get("birthDay");
            elementoActualizar.mobileNumber =         item.get("mobileNumber");
            elementoActualizar.emailAddress =         item.get("emailAddress");
            elementoActualizar.twitter =              item.get("twitter");
            elementoActualizar.twitterUrl =           item.get("twitterUrl");
            elementoActualizar.skype =                item.get("skype");
            elementoActualizar.addressSuite =         item.get("addressSuite");
            elementoActualizar.addressCity =          item.get("addressCity");
            elementoActualizar.addressCountry =       item.get("addressCountry");
            elementoActualizar.fullName =             item.get("fullName");
            elementoActualizar.emailAddress =         item.get("emailAddress");
            modo = "editar";
            objectRetrieved = item;
        }
    }
    
    getData(this);
    
})