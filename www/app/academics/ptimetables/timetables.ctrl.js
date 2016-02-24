  (function(){
  'use strict';
  angular.module('app')
    .controller('PTimetablesCtrl', PTimetablesCtrl);

  function PTimetablesCtrl($scope, User, Personaltt, $ionicModal, $timeout, ionicToast, $cordovaLocalNotification, $ionicPlatform){
    $scope.currentUser = User.getCurrent();
    $scope.personaltt = {};

    // GET the entered timetables
    $scope.personaltts = Personaltt.find({

    });
      $scope.refresh = function () {
          $scope.personaltts = Personaltt.find({

          });
          //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        };

    $ionicModal.fromTemplateUrl('app/academics/ptimetables/newppt.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.showToast = function(){
        // <!-- ionicToast.show(message, position, stick, time); -->
          ionicToast.show('Personal TimeTable Saved..', 'bottom', false, 2500);
        };

        $scope.NewPTTModal = function () {
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


      $scope.PostPTT = function() {
        $scope.close();
        $scope.showToast();
        $scope.refresh();
        Personaltt
          .create({
            unit : $scope.personaltt.unit,
            timestart: $scope.personaltt.timestart,
            timestop : $scope.personaltt.timestop,
            ownerId : $scope.currentUser.id
          })
          .$promise
          .then(function(err) {
          console.log(err)
          });
      };
      $scope.scheduleInstantNotification = function () {
      $cordovaLocalNotification.schedule({
      id: 1,
      text: 'Instant Notification',
      title: 'Instant'
    }).then(function () {
      alert("Instant Notification set");
    });
  };
  // five seconds Notification
  $scope.FiveSeconds = function () {
    var now = new Date().getTime();
    var _5SecondsFromNow = new Date(now + 5000);

    $cordovaLocalNotification.schedule({
        id: 2,
        date: _5SecondsFromNow,
        text: 'Notification After 5 Seconds Has Been Triggered',
        title: 'After 5 Seconds'
    }).then(function () {
        alert("Notification After 5 seconds set");
    });
};




  }
})();
