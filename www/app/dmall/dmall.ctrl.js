(function(){
  'use strict';
  angular.module('app')
    .controller('ProductsCtrl', ProductsCtrl);


    function ProductsCtrl($scope, $ionicFilterBar, User, $state, Product, $location, $ionicModal, $timeout, $rootScope, $ionicUser, $ionicPush){

var filterBarInstance = {};
    $scope.showFilterBar = function () {
    filterBarInstance = $ionicFilterBar.show({
      products: $scope.products,
      update: function (filteredProducts, filterText) {
        $scope.products = filteredProducts;
        if (filterText) {
          console.log(filterText);
        }
      }
    });
  };

$scope.products = Product.find({

})

}
})();
