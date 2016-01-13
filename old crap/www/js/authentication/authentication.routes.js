(function(){
  'use strict';
  angular.module('app')
    .config(configure);

  function configure($stateProvider){
    $stateProvider
  /**    .state('login', {
      url: '/login',
      templateUrl: 'js/authentication/login.html',
      controller: 'LoginCtrl',
      data: {
        restrictAccess: ['notLogged']
      }
    }) **/
    .state('signin', {
      url: '/signin',
      templateUrl: 'js/authentication/signin.html',
     controller: 'SigninCtrl'

    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/authentication/register.html',
     controller: 'RegisterCtrl'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'js/authentication/profile/account.html',
     controller: 'AccountCtrl'
    });
  }
})();
