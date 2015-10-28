/*global angular*/
angular.module('hefesoft.pubnub')
.service('pubNubService', ['PubNub', '$q', function (PubNub, $q) {

	var dataFactory = {};

	dataFactory.initialise = function(channel){
      PubNub.init(
        {
            publish_key:'pub-c-83d779e5-66a9-4062-ad3b-7545407dcc2f',
            subscribe_key:'sub-c-db16133a-5b56-11e5-854b-02ee2ddab7fe',
            //uuid:'an_optional_user_uuid',
            ssl : (('https:' == document.location.protocol) ? true : false)
        })
        
        PubNub.ngSubscribe({ channel: channel })
	    
	}
	
	dataFactory.sendMessage = function(channel, message){
        PubNub.ngPublish({
            channel: channel,
            message: message
        });
    }

	return dataFactory;
	
}])