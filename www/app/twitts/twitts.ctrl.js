(function(){
  'use strict';
  angular.module('app')
    .controller('TwittsCtrl', TwittsCtrl);

  function TwittsCtrl($scope, Storage, Backend, $ionicFilterBar, User, $state, Tweet, $location){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;
    var filterBarInstance;
    $scope.currentUser = User.getCurrent();
  // $scope.tweets = [];
  //  $scope.tweet = {};
  $scope.newTweet = {};
  $scope.tweets = [];

    $scope.$on('$ionicView.enter', function(){
      Storage.getTweets().then(function(tweets){
        data.tweets = tweets;
        Backend.getTweets().then(function(tweets){
          data.tweets = tweets;
        });
      });
    });

    //filter bar shit here
    $scope.showFilterBar = function () {
    filterBarInstance = $ionicFilterBar.show({
      twitts: $scope.twitts,
      update: function (filteredTwitts, filterText) {
        $scope.twitts = filteredTwitts;
        if (filterText) {
          console.log(filterText);
        }
      }
    });
  };

  // post and save tweet
    $scope.postTweet = function () {
    //    $scope.close();
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
  }

// like function
$scope.like = function (index) {
    if ($scope.tweets[index].userLikedTweet) {
        /**
         * If user liked the tweet before find the id
         * belonging to his like and remove them
         */
        Like
            .find({filter: {where: {ownerId: $scope.currentUser.id, tweetId: $scope.tweets[index].id}}})
            .$promise
            .then(function (res) {
                Like.destroyById({id: res[0].id},
                    function (res) {
                        /**
                         * Remove like from the view
                         */
                        $scope.tweets[index].userLikedTweet = false;
                        $scope.tweets[index].likes -= 1;
                    },
                    function (err) {
                        console.log(err);
                    })
            })
    } else {
        /**
         * Create a new entry in the like model
         */
        Like.create({tweetId: $scope.tweets[index].id, ownerId: $scope.currentUser.id},
            function (res) {
                $scope.tweets[index].userLikedTweet = true;
                $scope.tweets[index].likes += 1;
            },
            function (err) {
                console.log(err);
            })
    }


};

})();
