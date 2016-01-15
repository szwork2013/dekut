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
/**   $scope.postTweet = function() {
      Tweet
        .create({
          content: $scope.tweet.content,
          id: $scope.tweet.id,
          date : new Date().toJSON(),
          ownerId : $scope.currentUser.id,
          ownerUsername : $scope.currentUser.username
        })
        .$promise
        .then(function() {
          $state.go('app.twitts');
        });
    }; **/
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

/**  .controller('AddReviewController', ['$scope', 'CoffeeShop', 'Review',
      '$state', function($scope, CoffeeShop, Review, $state) {
    $scope.action = 'Add';
    $scope.coffeeShops = [];
    $scope.selectedShop;
    $scope.review = {};
    $scope.isDisabled = false;

    CoffeeShop
      .find()
      .$promise
      .then(function(coffeeShops) {
        $scope.coffeeShops = coffeeShops;
        $scope.selectedShop = $scope.selectedShop || coffeeShops[0];
      });

    $scope.submitForm = function() {
      Review
        .create({
          rating: $scope.review.rating,
          comments: $scope.review.comments,
          coffeeShopId: $scope.selectedShop.id
        })
        .$promise
        .then(function() {
          $state.go('all-reviews');
        });
    };
  }]) **/
})();
