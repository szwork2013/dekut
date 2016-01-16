  (function(){
  'use strict';
  angular.module('app')
    .controller('TimetablesCtrl', TimetablesCtrl);

  function TimetablesCtrl($scope, User, Personaltt){
    $scope.currentUser = User.getCurrent();
    $scope.personaltt = {};

/**
    // post and save tweet
      $scope.PostPTT = function () {
    //      $scope.close();
        $scope.newPTT.unit = $scope.unit;
          $scope.newPTT.timestart = new Date().toJSON();
           $scope.newPTT.timestart = new Date().toJSON();
          $scope.newPTT.ownerId = $scope.currentUser.id;
          $scope.newPTT.ownerUsername = $scope.currentUser.username;
          Personaltt.create($scope.newPTT,
              function (res) {
                  delete $scope.newPTT;
            //      $scope.refresh();
              },
              function (err) {
                  console.log(err)
              })
      }; **/
      $scope.PostPTT = function() {
        Personaltt
          .create({
            unit : $scope.personaltt.unit,
            timestart: $scope.personaltt.timestart,
            timestop : $scope.personaltt.timestop,
            ownerId : $scope.currentUser.id

          })
          .$promise
          .then(function() {
          console.log('err')
          });
      };


  }
})();
