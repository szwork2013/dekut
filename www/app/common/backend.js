(function(){
  'use strict';
  angular.module('app')
    .factory('Backend', Backend);

  function Backend($http, Storage, C){
    return {
      getTweets: getTweets
    };

    function getTweets(){
      return $http.get(C.backendUrl+'/tweets').then(function(res){
        return Storage.setTweets(res.data).then(function(){
          return res.data;
        });
      });
    }
  }
})();
