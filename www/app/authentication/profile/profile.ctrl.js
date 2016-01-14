angular.module('app.profile', ['lbServices', 'ionic'])
    .controller('ProfileCtrl', function ($scope, $location, User) {
        $scope.currentUser = User.getCurrent();
    /**    Tweet.count({ownerId: $scope.currentUser.id})
            .$promise
            .then(function (res) {
                $scope.currentUser.tweets = res.count;
            });
**/
        /**
         * @name logout()
         * logout user and redirect to the login page
         */
        $scope.logout = function () {
            User.logout(function () {
                $location.path('/signin');
            });
        }

    });
