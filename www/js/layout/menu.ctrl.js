(function(){
  'use strict';
  angular.module('app')
    .controller('MenuCtrl', MenuCtrl);

  function MenuCtrl($scope, $state, $location, User){
    $scope.logout = function () {
        User.logout(function () {
            $location.path('/signin');
        });
    }
  }
})();
