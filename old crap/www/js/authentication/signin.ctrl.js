angular.module('app.login', ['lbServices', 'ionic'])
    .controller('SigninCtrl', function ($scope, User, $location, $ionicPopup, $ionicLoading) {
        if (User.getCachedCurrent()!==null) {
           $location.path('app/tabs/twitts');
        }
        /**
         * Currently you need to initialiate the variables
         * you use whith ng-model. This seems to be a bug with
         * ionic creating a child scope for the ion-content directive
         */
        $scope.credentials = {};

       // Add Loading while it sends data and waits
       /*
         * Show loading while data is being processed
         * Then hide loading when feedback is gotten
         */
        $scope.show = function(message) {
            $ionicLoading.show({
                template: '<div class="ionic loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div> <div>Signin In...</div>'
            });
        };
        //Hide function
        $scope.hide = function() {
            $ionicLoading.hide();
        };
        /**
         * @name showAlert()
         * @param {string} title
         * @param  {string} errorMsg
         * @desctiption
         * Show a popup with the given parameters
         */
        $scope.showAlert = function (title, errorMsg) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: errorMsg
            });
            alertPopup.then(function (res) {
                console.log($scope.loginError);
            });
        };

        /**
         * @name login()
         * @description
         * sign-in function for users which created an account
         */
        $scope.login = function () {
          $scope.show();
            $scope.loginResult = User.login({
              include: 'user', rememberMe: true
            },
            $scope.credentials,
                function () {
                    var next = $location.nextAfterLogin || 'app/tabs/twitts';
                    $location.nextAfterLogin = null;
                    $location.path(next);
                    $scope.hide();
                },
                function (err) {
                    $scope.hide();
                    $scope.loginError = err;
                    $scope.showAlert(err.statusText, err.data.error.message);
                }
            );
        };
        $scope.goToRegister = function () {
            $location.path('register');
        };


    });
