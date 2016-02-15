(function(){
  'use strict';
  angular.module('app')
    .controller('STimetableCtrl', STimetableCtrl, ['lbServices', 'ionic', 'STimetablesCtrl']);

  function STimetableCtrl($scope, $stateParams, $ionicModal, User, Schooltt, $location){

Schooltt
    .find({filter: {where: {id: $stateParams.id}}})
    .$promise
    .then(
    function (res) {
        $scope.schooltt = res[0];

    },
    function (err) {

    });

    $scope.currentUser = User.getCurrent();
        $scope.schooltt = {};

// social sharing
$scope.shareNative = function() {
        if (window.plugins && window.plugins.socialsharing) {
            window.plugins.socialsharing.share("Checkout Class TimeTable in DekutApp: " + $scope.schooltt.title + ",By " + $scope.notice.author + ".",
                '', null, "http://twitter.com/DekutApp",
                function() {
                    console.log("Success")
                },
                function (error) {
                    console.log("Share fail " + error)
                });
        }
        else console.log("Share plugin not available");
}


  }
})();
