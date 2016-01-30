(function(){
  'use strict';
  angular.module('app')
    .controller('LoadingCtrl', LoadingCtrl);

  function LoadingCtrl($state, $ionicHistory, Storage, User){
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
  /**  Storage.getUser().then(function(user){
      if(user){
        $state.go('app.twitts');
      } else {
        $state.go('signin');
      }
    }); **/

    if (User.getCachedCurrent() !== null) {

    $state.go('app.twitts');
  }
    else {
      $state.go('signin');
    }

  }
})();
