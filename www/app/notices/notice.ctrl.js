(function(){
  'use strict';
  angular.module('app')
    .controller('NoticeCtrl', NoticeCtrl, ['lbServices', 'ionic', 'NoticesCtrl']);

  function NoticeCtrl($scope, $stateParams, Storage, $ionicModal, User, Notice, Avatar, $location, Restangular){

Notice
    .find({filter: {where: {id: $stateParams.id}}})
    .$promise
    .then(
    function (res) {
        $scope.notice = res[0];

    },
    function (err) {

    });

    $scope.currentUser = User.getCurrent();
        $scope.notice = {};




  }
})();
