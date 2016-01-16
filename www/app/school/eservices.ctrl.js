(function(){
'use strict';
angular.module('app')
  .controller('EservicesCtrl', EservicesCtrl);

function EservicesCtrl($scope, User, Eservice){
  $scope.currentUser = User.getCurrent();
  $scope.eservice = {};

  // do post
  $scope.RequestEservice = function() {
    Eservice
      .create({
        type : $scope.eservice.type,
        content: $scope.eservice.content,
        phonenumber : $scope.eservice.phonenumber,
        email : $scope.eservice.email

      })
      .$promise
      .then(function(err) {
      console.log(err)
      });
  };

}
})();
