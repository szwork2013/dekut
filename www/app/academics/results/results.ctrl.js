(function(){
  'use strict';
  angular.module('app')
    .controller('ResultsCtrl', ResultsCtrl);

  function ResultsCtrl($scope, User, $state, Result, $location){
    $scope.currentUser = User.getCurrent();

  // GET the all results without filtering
  $scope.results = Result.find({

  });

  $scope.getStyle = function(){
               var transform = ($scope.isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';
               return {
                   'top': $scope.isSemi ? 'auto' : '50%',
                   'bottom': $scope.isSemi ? '5%' : 'auto',
                   'left': '50%',
                   'transform': transform,
                   '-moz-transform': transform,
                   '-webkit-transform': transform,
                   'font-size': $scope.radius/3.5 + 'px'
               };
           };


}
})();
