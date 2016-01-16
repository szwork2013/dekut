(function(){
  'use strict';
  angular.module('app')
    .controller('TimetablesCtrl', function(){


      // post and save tweet
        $scope.PostTT = function () {
            $scope.close();
            $scope.newTweet.date = new Date().toJSON();
            $scope.newTweet.ownerId = $scope.currentUser.id;
            $scope.newTweet.ownerUsername = $scope.currentUser.username;
            Tweet.create($scope.newTweet,
                function (res) {
                    delete $scope.newTweet;
                    $scope.refresh();
                },
                function (err) {
                    console.log(err)
                })
        };


    });
})();
