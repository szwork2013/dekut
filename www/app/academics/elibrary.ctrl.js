(function(){
'use strict';
angular.module('app')
  .controller('ElibraryCtrl', ElibraryCtrl);

function ElibraryCtrl($scope, User, Elibrary){
  $scope.currentUser = User.getCurrent();
  $scope.elibrary = {};

  // do post
  $scope.RequestElibrary = function() {
    Elibrary
      .create({
        unitcode : $scope.elibrary.unitcode,
        unittitle: $scope.elibrary.unittitle,
        email : $scope.elibrary.email

      })
      .$promise
      .then(function() {
      console.log('err')
      });
  };

}
})();
