(function(){
  'use strict';
  angular.module('app')
    .controller('ResultCtrl', ResultCtrl, ['lbServices', 'ionic', 'ResultsCtrl']);

  function ResultCtrl($scope, $stateParams, Storage, $ionicModal, User, Result){

Result
    .find({
      filter: {
        where: {
          id: $stateParams.id
        }
      }
    })
    .$promise
    .then(
    function (res) {
        $scope.result = res[0];

    },
    function (err) {

    });

    $scope.currentUser = User.getCurrent();
        $scope.result = {};




  }
})();
