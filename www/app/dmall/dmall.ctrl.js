(function(){
  'use strict';
  angular.module('app')
    .controller('ProductsCtrl', ProductsCtrl);


    function ProductsCtrl($scope, $ionicFilterBar, User, $state, Product, $location, $ionicModal, $timeout, $rootScope, $ionicUser, $ionicPush){

    $scope.showFilterBar = function () {
    filterBarInstance = $ionicFilterBar.show({
      notices: $scope.notices,
      update: function (filteredNotices, filterText) {
        $scope.notices = filteredNotices;
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
