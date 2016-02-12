(function(){
  'use strict';
  angular.module('app')
    .controller('TwittCtrl', TwittCtrl, ['lbServices', 'ionic', 'TwittsCtrl']);

  function TwittCtrl($scope, $stateParams, Storage, $ionicModal, User, Tweet, Avatar, $location, Comment, ionicToast, $rootScope){

Tweet
    .find({filter: {where: {id: $stateParams.id}}})
    .$promise
    .then(
    function (res) {
        $scope.tweet = res[0];

    },
    function (err) {

    });

    $scope.currentUser = User.getCurrent();
        $scope.tweet = {};
        $scope.comments = {};
    //open modal for comment
    $scope.currentUser = User.getCurrent();
        $scope.tweet = {};
        $scope.comments = {};

        //toast maneno's
        $scope.hideToast = function(){
          ionicToast.hide();
        };

     //Modal objects
     $ionicModal.fromTemplateUrl('app/twitts/newcomment.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function () {
            $scope.modal.show();
            $timeout(function () {
                $scope.modal.hide();
            }, 2000);
        };
        // Cleanup the modal when we're done with it
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });

     $scope.close = function() {
        $scope.modal.hide();
    };

    //comments func
    /**
     * @type {{object}}
     * See LoginCtrl why we need to initialiate the ng-model variable
     */
    $scope.newComment = {};

    /**
     * @name getComments()
     * Load all comments from the tweet
     */
    // get comments

      $scope.comments = Comment.find({
  /**      filter: {
          where: {
            tweetId: $scope.tweet.id
          },
          include: [
            'comments'
          ]
        } **/
      });
    $scope.getComments = function() {
        $scope.comments = [];
        Tweet
            .comments({
                id: $stateParams.id
            })
            .$promise
            .then(
                function(res) {
                    angular.forEach(res, function(values) {
                        /**
                         * Find avatar from the user
                         */
                        console.log(values);
                        Avatar
                            .find({
                                filter: {
                                    where: {
                                        ownerId: values.ownerId
                                    }
                                }
                            })
                            .$promise
                            .then(function(res) {
                                values.avatar = res[0].url;
                            })
                        $scope.comments.push(values);
                    })

                },
                function(err) {

                })
    };
  //  $scope.getComments();
  /**  $scope.saveComment = function() {
                $scope.close();

        $scope.newComment.date = new Date().toJSON();
        $scope.newComment.tweetId = $stateParams.id;
        $scope.newComment.ownerId = $scope.currentUser.id;
        $scope.newComment.username = $scope.currentUser.username;

        Tweet.comments.create({
                id: $stateParams.id
            }, $scope.newComment,
            function(res) {
                delete $scope.newComment;
                $scope.getComments();
            },
            function(err) {})
    }; **/
    // better approach to saving comments
    $scope.saveComment = function () {
        $scope.close();
        $scope.newComment.date = new Date().toJSON();
        $scope.newComment.ownerId = $scope.currentUser.id;
        $scope.newComment.ownerUsername = $scope.currentUser.username;
        $scope.newComment.tweetId = $scope.tweet.id;
        Comment.create($scope.newComment,
            function (res) {
                delete $scope.newComment;
        //        $scope.refresh();
        //        //show toast
               ionicToast.show('Your New Comment Has Been Posted.', 'bottom', true, 2500);
               $scope.hideToast();
            },
            function (err) {
                console.log(err)
            })
    };


  }
})();
