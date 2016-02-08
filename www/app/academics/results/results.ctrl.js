(function(){
  'use strict';
  angular.module('app')
    .controller('ResultsCtrl', ResultsCtrl);

  function ResultsCtrl($scope, User, $state, Result, $location){
    $scope.currentUser = User.getCurrent();

  // GET the all results without filtering
  $scope.results = Result.find({

  });

}
})();
