(function(){
'use strict';
angular.module('app')
  .controller('ElibraryCtrl', ElibraryCtrl);

function ElibraryCtrl($scope, User, Elibrary, ionicToast, $location){
  $scope.currentUser = User.getCurrent();
  $scope.elibrary = {};
  $scope.showToast = function(){
  // <!-- ionicToast.show(message, position, stick, time); -->
    ionicToast.show('PastPaper Request Sent, Check Email after a while!', 'bottom', false, 2500);
  };
  // do post
  $scope.RequestElibrary = function() {
    $scope.showToast();
    $location.path('app.twitts');

    Elibrary
      .create({
        unitcode : $scope.elibrary.unitcode,
        unittitle: $scope.elibrary.unittitle,
        email : $scope.elibrary.email,
        date : new Date().toJSON()

      })
      .$promise
      .then(function(err) {
      console.log(err)
      });
  };

}
})();
