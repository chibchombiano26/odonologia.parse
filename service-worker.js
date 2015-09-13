'use strict';

self.addEventListener('push', function(event) {
  console.log('Nuevo mensaje recibido', event);
  
  var title = 'Nuevo mensaje';
  var body = 'Has recibido un mensaje';
  var icon = '/images/icon-192x192.png';
  var tag = 'simple-push-demo-notification-tag';
  
  var baseUrl = "https://gcm-node-chibchombiano26.c9.io/";

  event.waitUntil(
    self.registration.pushManager.getSubscription().then(function(subscription) {
      fetch(baseUrl + 'notifications', {
        method: 'post',
        body: JSON.stringify(subscription)
      })
      .then(function(response) {
        if (response.type === 'opaque') {
          console.log('Received a response, but it\'s opaque so can\'t examine it');
          return;
        }
  
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +  response.status);
          return;
        }
        else{
          return response;
        }
      })
      .then(function(data) {
         data.text().then(function(responseText) {
         var messageItem = JSON.parse(responseText);
          self.registration.showNotification(title, {
            body: messageItem.message,
            icon: icon,
            tag: tag
          })  
          
        });

        
      })
      .catch(function(err) {
        console.log('err');
        console.log(err);
      });
    })
  );
});


self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  // Android doesn’t close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url == '/' && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow)
      return clients.openWindow('/');
  }));

});
