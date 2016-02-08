(function(){
  'use strict';
  angular.module('app')
    .controller('TwittsCtrl', TwittsCtrl);

  function TwittsCtrl($scope, $ionicFilterBar, User, $state, Tweet, $location, Like, $ionicModal, $timeout, $rootScope, $ionicUser, $ionicPush, ionicToast){
//    var data = {}, fn = {};
//    $scope.data = data;
//    $scope.fn = fn;
// push shit
/**
$rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
   alert("Successfully registered token " + data.token);
   console.log('Ionic Push: Got token ', data.token, data.platform);
   $scope.token = data.token;
 });

 // Identifies a user with the Ionic User service
 $scope.identifyUser = function() {
   console.log('Ionic User: Identifying with Ionic User service');

   var user = $ionicUser.get();
   if(!user.user_id) {
     // Set your user_id here, or generate a random one.
     user.user_id = $ionicUser.generateGUID();
   };

   // Add some metadata to your user object.
   angular.extend(user, {
     name: 'Ionitron',
     bio: 'I come from planet Ion'
   });

   // Identify your user with the Ionic User Service
   $ionicUser.identify(user).then(function(){
     $scope.identified = true;
     alert('Identified user ' + user.name + '\n ID ' + user.user_id);
   });
 };

 // Registers a device for push notifications and stores its token
  $scope.pushRegister = function() {
    console.log('Ionic Push: Registering user');

    // Register with the Ionic Push service.  All parameters are optional.
    $ionicPush.register({
      canShowAlert: true, //Can pushes show an alert on your screen?
      canSetBadge: true, //Can pushes update app icon badges?
      canPlaySound: true, //Can notifications play a sound?
      canRunActionsOnWake: true, //Can run actions outside the app,
      onNotification: function(notification) {
        // Handle new push notifications here
        alert(notification);
        return true;
      }
    });
  };
  **/
   //end push here
    var filterBarInstance;
    $scope.currentUser = User.getCurrent();
  // $scope.tweets = [];
  //  $scope.tweet = {};
  $scope.newTweet = {};
//  $scope.tweets = [];
  // GET the all twitts
  $scope.tweets = Tweet.find({

  });
/**    $scope.$on('$ionicView.enter', function(){
      Storage.getTweets().then(function(tweets){
        data.tweets = tweets;
        Backend.getTweets().then(function(tweets){
          data.tweets = tweets;
        });
      });
    }); **/

    //filter bar shit here
    $scope.showFilterBar = function () {
    filterBarInstance = $ionicFilterBar.show({
      tweets: $scope.tweets,
      update: function (filteredTweets, filterText) {
        $scope.tweets = filteredTweets;
        if (filterText) {
          console.log(filterText);
        }
      }
    });
  };

//toast maneno's
$scope.hideToast = function(){
  ionicToast.hide();
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
        //        //show toast
               ionicToast.show('Your New Tweet Has Been Posted.', 'bottom', true, 2500);
               $scope.hideToast();
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
