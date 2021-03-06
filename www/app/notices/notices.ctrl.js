(function(){
  'use strict';
  angular.module('app')
    .controller('NoticesCtrl', NoticesCtrl);

  function NoticesCtrl($scope, $ionicFilterBar, User, $state, Notice, $location, Like, $ionicModal, $timeout, $rootScope, $ionicUser, $ionicPush){
   //end push here
    var filterBarInstance;
    $scope.currentUser = User.getCurrent();
  $scope.newNotice = {};
//  $scope.tweets = [];
  // GET the all twitts
  $scope.notices = Notice.find({

  });
  $scope.refresh = function () {
    $scope.notices = Notice.find({

    });
    //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
  };
    //filter bar shit here
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

// modal for new tweet
$ionicModal.fromTemplateUrl('newnotice.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.NoticeModal = function () {
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

  // post and save tweet
    $scope.PostNotice = function () {
        $scope.close();
        $scope.newNotice.date = new Date().toJSON();
        $scope.newNotice.ownerId = $scope.currentUser.id;
        $scope.newNotice.ownerUsername = $scope.currentUser.username;
        Notice.create($scope.newNotice,
            function (res) {
                delete $scope.newNotice;
        //        $scope.refresh();
            },
            function (err) {
                console.log(err)
            })
    };

    // social sharing
    $scope.shareNative = function() {
            if (window.plugins && window.plugins.socialsharing) {
                window.plugins.socialsharing.share("Checkout This Notice in DekutApp: " + $scope.notice.title + "" + " " + $scope.notice.content + ".",
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
