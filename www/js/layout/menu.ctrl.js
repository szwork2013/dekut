(function(){
  'use strict';
  angular.module('app')
    .controller('MenuCtrl', MenuCtrl);

  function MenuCtrl($scope, $state, User){
    $scope.logout = function () {
        User.logout(function () {
            $location.path('/signin');
        });
    }
  }
})();
