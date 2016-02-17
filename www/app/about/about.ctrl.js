(function(){
  'use strict';
  angular.module('app')
    .controller('AboutCtrl', AboutCtrl);

  function AboutCtrl($state, $scope, $ionicHistory, Storage, User){
    $scope.currentUser = User.getCurrent();
    // social sharing
    $scope.shareNative = function() {
            if (window.plugins && window.plugins.socialsharing) {
                window.plugins.socialsharing.share("Checkout The Updated DekutApp, fully functional",
                    '', null, "http://twitter.com/DekutApp",
                    function() {
                        console.log("Success")
                    },
                    function (error) {
                        console.log("Share fail " + error)
                    });
            }
            else console.log("Share plugin not available");
    }

  }
})();
