(function(){
  'use strict';
  angular.module('app')
    .controller('NoticeCtrl', NoticeCtrl, ['lbServices', 'ionic', 'NoticesCtrl']);

  function NoticeCtrl($scope, $stateParams, Storage, $ionicModal, User, Notice, Avatar, $location){

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

// social sharing
$scope.shareNative = function() {
        if (window.plugins && window.plugins.socialsharing) {
            window.plugins.socialsharing.share("Checkout Notice in DekutApp: " + $scope.notice.title + ",By" + $scope.notice.author + ".",
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
