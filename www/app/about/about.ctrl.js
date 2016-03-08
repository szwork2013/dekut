(function(){
  'use strict';
  angular.module('app')
    .controller('AboutCtrl', AboutCtrl);

  function AboutCtrl($state, $scope, $ionicHistory, Storage, User, Feedback, $ionicModal, ionicToast){
    $scope.currentUser = User.getCurrent();
    // social sharing
    $scope.shareNative = function() {
            if (window.plugins && window.plugins.socialsharing) {
                window.plugins.socialsharing.share("Checkout The Updated DekutApp, fully functional",
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

// toasts are sweet
$scope.showToast = function(){
  ionicToast.show('Thanks, your feedback is highly appreciated.', 'bottom', false, 2500);
};
    // modal for Feedback
    $ionicModal.fromTemplateUrl('app/about/feedback.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.FeedbackModal = function () {
            $scope.modal.show();

        };
        // Cleanup the modal when we're done with it
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });

     $scope.close = function() {
        $scope.modal.hide();
    };

// feedback form
$scope.newFeedback = {};
// clear form after being filled
$scope.content = '';

$scope.saveFeedback = function() {
  $scope.close();
  $scope.showToast();
   Feedback
     .create({
       content: $scope.newFeedback.content,
       usernames: $scope.currentUser.names,
       userid: $scope.currentUser.id,
       type: $scope.newFeedback.type
     })
     .$promise
     .then(function() {
       $state.go('about');
     });
 };
  }
})();
