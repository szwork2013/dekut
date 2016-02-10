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
//display modal for checkout
// goto order url
$scope.goToOrder = function () {
    $location.path('app.order({id: order.id})');
};
$ionicModal.fromTemplateUrl('app/dmall/makeorder.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.OrderModal = function () {
        $scope.modal.show();
      /**  $timeout(function () {
            $scope.modal.hide();
        }, 20000); **/
    };
    // Cleanup the modal when we're done with it
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });

 $scope.close = function() {
    $scope.modal.hide();
};

    $scope.currentUser = User.getCurrent();
//    $scope.product = Product.get;
    $scope.newOrder = {};
    // calculate total amount from quantity
//    $scope.productTotalAmount = $scope.product.price * $scope.productQuantity;

    $scope.MakeOrder = function () {
        $scope.close();
        $scope.newOrder.date = new Date().toJSON();
       $scope.newOrder.productName = $scope.product.name;
        $scope.newOrder.productQuantity = $scope.productQuantity;
        $scope.newOrder.productTotalAmount = $scope.productTotalAmount;
        $scope.newOrder.customerId = $scope.currentUser.id;
        $scope.newOrder.customerName = $scope.currentUser.names;
        $scope.newOrder.customerPhone = $scope.currentUser.phonenumber;
        $scope.newOrder.customerEmail = $scope.currentUser.email;

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
