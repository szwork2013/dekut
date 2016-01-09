(function(){
  'use strict';
  angular.module('app')
    .config(configure);

  function configure($stateProvider){
    $stateProvider
      .state('app.timetables', {
      url: '/timetables',
      views: {

          templateUrl: 'js/academics/timetables/timetables.html',
          controller: 'ChatsCtrl'

      }
    });
  }
})();
