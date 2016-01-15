(function(){
  'use strict';
  angular.module('app')
    .controller('TwittsCtrl', TwittsCtrl);

  function TwittsCtrl($scope, Storage, Backend, $ionicFilterBar){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;
    var filterBarInstance;

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
  }
})();
