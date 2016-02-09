(function(){
  'use strict';
  angular.module('app')
    .controller('ProductCtrl', ProductCtrl, ['lbServices', 'ionic', 'ProductCtrl']);

  function ProductCtrl($scope, $stateParams, $ionicModal, User, Product, $location, Category, Order){

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
    $scope.newOrder = {};
    // calculate total amount from quantity
    $scope.productTotalAmount = $scope.price * $scope.productQuantity;

    $scope.MakeOrder = function () {
        $scope.close();
        $scope.newOrder.date = new Date().toJSON();
        $scope.newOrder.productName = $scope.productName;
        $scope.newOrder.productQuantity = $scope.productQuantity;
        $scope.newOrder.productTotalAmount = $scope.productTotalAmount;
        $scope.newOrder.customerId = $scope.currentUser.id;
        $scope.newOrder.customerName = $scope.currentUser.names;
        $scope.newOrder.customerPhone = $scope.currentUser.phonenumber;
        $scope.newOrder.customerEmail = $scope.currentUser.email;
        $scope.newOrder.location = $scope.location;
        $scope.newOrder.detail = $scope.detail;
        Order.create($scope.newOrder,
            function (res) {
                delete $scope.newOrder;
        //      do something after order

            },
            function (err) {
                console.log(err)
            })
    };


  }
})();
