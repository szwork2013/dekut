(function(){
  'use strict';
  angular.module('app')
    .controller('STimetableCtrl', STimetableCtrl, ['lbServices', 'ionic', 'STimetablesCtrl']);

  function STimetableCtrl($scope, $stateParams, $ionicModal, User, Schooltt, $location, $cordovaLocalNotification, $ionicPlatform){

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
            window.plugins.socialsharing.share("Checkout Class TimeTable in DekutApp: " + $scope.schooltt.unit + ",By " + $scope.schooltt.location + ".",
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
// Instant Notification
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
$scope.remindertt = function () {
  var now = new Date().getTime();
//  var _5SecondsFromNow = new Date(now + 5000);
  var _when = $scope.schooltt.timestart;
  // 30 minutes reminder
  var _time = $scope.schooltt.timestart - 1800;

  $cordovaLocalNotification.schedule({
      id: 2,
      date: _time,
      text: 'You Have An Upcoming Lecture' +  $scope.schooltt.unit + 'At' + $scope.schooltt.location + ' ',
      title: 'Lecture'
  }).then(function () {
      alert("TimeTables Notifications Set");
  });
};

// show all Notification TimeTables for the whole day
$scope.EveryMorning = function () {
    $cordovaLocalNotification.schedule({
    id: 3,
    title: 'Your Lectures Today are',
    text: ' > ' +  $scope.schooltt.unit + 'At' + $scope.schooltt.location + ' ',
    firstAt: tomorrow_at_8_am,
    every: "day"
    }).then(function (result) {
    console.log('Every Day Notifications Set');
    });
};


  }
})();
