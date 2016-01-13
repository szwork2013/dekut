(function(){
  'use strict';
  angular.module('app')
    .config(configure);

  function configure($stateProvider){
    $stateProvider
      .state('pages', {
      url: '/pages',
      templateUrl: 'js/pages/pages.html',
      controller: 'PagesCtrl'
    });
  }
})();
