(function(){
  'use strict';
  angular.module('app')
    .controller('TwittsCtrl', TwittsCtrl);

  function TwittsCtrl($scope, Storage, Backend, $ionicFilterBar, User, $state, Tweet, $location, Like, $ionicModal, $timeout){
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

// modal for new tweet
$ionicModal.fromTemplateUrl('newtweet.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.TweetModal = function () {
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
    $scope.PostTweet = function () {
        $scope.close();
        $scope.newTweet.date = new Date().toJSON();
        $scope.newTweet.ownerId = $scope.currentUser.id;
        $scope.newTweet.ownerUsername = $scope.currentUser.username;
        Tweet.create($scope.newTweet,
            function (res) {
                delete $scope.newTweet;
        //        $scope.refresh();
            },
            function (err) {
                console.log(err)
            })
    };


// like function
$scope.like = function (index) {
    if ($scope.tweets.userLikedTweet) {
        /**
         * If user liked the tweet before find the id
         * belonging to his like and remove them
         */
        Like
            .find({filter: {where: {ownerId: $scope.currentUser.id, tweetId: $scope.tweets.id}}})
            .$promise
            .then(function (res) {
                Like.destroyById({id: res[0].id},
                    function (res) {
                        /**
                         * Remove like from the view
                         */
                        $scope.tweets.userLikedTweet = false;
                        $scope.tweets.likes -= 1;
                    },
                    function (err) {
                        console.log(err);
                    })
            })
    } else {
        /**
         * Create a new entry in the like model
         */
        Like.create({
           tweetId: $scope.tweets.id,
           ownerId: $scope.currentUser.id
         },
            function (res) {
                $scope.tweets.userLikedTweet = true;
                $scope.tweets.likes += 1;
            },
            function (err) {
                console.log(err);
            })


}
};
}
})();
