var Config = (function(){
  'use strict';
  var cfg = {
    appVersion: '~',
    debug: true, // to toggle features between dev & prod
    verbose: true, // should log in console more infos
    track: false, // should send tracking events to a server
    storage: true, // should save data to browser storage
    storagePrefix: 'app-', // prefix all stoarge entries with this prefix
    emailSupport: 'dkutapp@gmail.com',
    backendUrl: 'data', // 'http://myserver.com/api/v1',
    parse: {
      applicationId: '',
      restApiKey: ''
    },
    gcm: {
      // create project here : https://console.developers.google.com/
      senderID: '*****', // Google project number
      apiServerKey: '******' // used only to send notifications
    }
  };
  return cfg;
})();
