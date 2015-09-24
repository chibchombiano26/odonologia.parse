materialAdmin
.controller('profileCtrl', function($scope, growlService){
  
    
})

.controller('profileAboutCtrl', function($scope, growlService){
    
    var modo = "insertar";
    var objectRetrieved;
    
     //User
    this.profileSummary = "Informacion relativa a la clinica";

    this.fullName = "Nombre";
    this.gender = "Genero";
    this.birthDay = "23/06/1988";
    this.martialStatus = "Soltero";
    this.mobileNumber = "57315241218";
    this.emailAddress = "correo@gmail.com";
    this.twitter = "@twitter";
    this.twitterUrl = "twitter.com/twitter";
    this.skype = "hefesoft.twitter";
    this.addressSuite = "Direccion clinica";
    this.addressCity = "Bogota";
    this.addressCountry = "Colombia";
    
    if(Parse.User.current() !== null){
        $scope.urlPicture = Parse.User.current().get("pictureUrl");
        this.fullName = Parse.User.current().get("name");
        this.emailAddress = Parse.User.current().get("email");
    }
    
  

    //Edit
    this.editSummary = 0;
    this.editInfo = 0;
    this.editContact = 0;


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
        profile.set("martialStatus", item.martialStatus);
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
            growlService.growl(message+' Ha sido actualizado', 'inverse');
            
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
        profile.set("martialStatus", item.martialStatus);
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
            growlService.growl(message+' Ha sido actualizado', 'inverse');
            
          },
          error: function(profile, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            
          }
        });
    }
    
    function getData(elementoActualizar){
        var Profile = Parse.Object.extend("Profile");
        var query = new Parse.Query(Profile);
        query.equalTo("username", Parse.User.current().get("email"));
        query.first({
          success: function(object) {
            convertirAObjeto(elementoActualizar, object);
          },
          error: function(error) {
            
          }
        });
    }
    
    function convertirAObjeto(elementoActualizar, item){
        
        if(item !== undefined){
            elementoActualizar.profileSummary =       item.get("profileSummary");
            elementoActualizar.fullName =             item.get("fullName");
            elementoActualizar.gender =               item.get("gender");
            elementoActualizar.birthDay =             item.get("birthDay");
            elementoActualizar.martialStatus =        item.get("martialStatus");
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