(function(){
  'use strict';
  angular.module('app')
    .controller('ProductCtrl', ProductCtrl, ['lbServices', 'ionic', 'ProductCtrl']);

  function ProductCtrl($scope, $stateParams, $ionicModal, User, Product, $location, Category){

Product
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
        $scope.product = res[0];

    },
    function (err) {

    });

    $scope.currentUser = User.getCurrent();
        $scope.product = {};




  }
})();