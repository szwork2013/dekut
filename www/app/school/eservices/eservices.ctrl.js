(function(){
'use strict';
angular.module('app')
  .controller('EservicesCtrl', EservicesCtrl);

function EservicesCtrl($scope, User, Eservice){
  $scope.currentUser = User.getCurrent();
  $scope.eservice = {};

  // do post for inquiry
  $scope.PostInquiry = function() {
    $scope.eservice.type = 'inquiry';

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

  // do post for complaints
  $scope.PostComplaint = function() {
     $scope.eservice.type = 'complaint';

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

  // do post for complaints
  $scope.PostSuggestion = function() {
     $scope.eservice.type = 'suggestion';

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

  // do post for complaints
  $scope.PostFeedback = function() {
     $scope.eservice.type = 'Feedback';

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
