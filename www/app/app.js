(function(){
  'use strict';
  angular.module('app', ['ionic', 'ngResource', 'ionic-material', 'lbServices', 'bd.timedistance',
   'app.register', 'app.login', 'app.profile', 'jett.ionic.filter.bar'])
    .config(configBlock)
    .run(runBlock);

  function configBlock($stateProvider, $urlRouterProvider, $provide, $ionicFilterBarConfigProvider, $httpProvider){
    $stateProvider
    .state('loading', {
      url: '/loading',
      template: '<ion-spinner style="text-align: center; margin-top: 50%;"></ion-spinner>',
      controller: 'LoadingCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/authentication/login.html',
      controller: 'LoginCtrl'
    })
    // auth logics
    .state('signin', {
      url: '/signin',
      templateUrl: 'app/authentication/signin.html',
     controller: 'SigninCtrl'

    })
    .state('register', {
      url: '/register',
      templateUrl: 'app/authentication/register.html',
     controller: 'RegisterCtrl'
    })
    //main app with menuContent
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'app/layout/layout.html',
      controller: 'LayoutCtrl'
    })
    .state('app.twitts', {
      url: '/twitts',
      views: {
        'menuContent': {
          templateUrl: 'app/twitts/twitts.html',
          controller: 'TwittsCtrl'
        }
      }
    })
    .state('app.twitt', {
      url: '/twitts/:id',
      views: {
        'menuContent': {
          templateUrl: 'app/twitts/twitt.html',
          controller: 'TwittCtrl'
        }
      }
    })
    //profile page
    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'app/authentication/profile/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })
    // academics
    .state('app.timetables', {
      url: '/timetables',
      views: {
        'menuContent': {
          templateUrl: 'app/academics/timetables/timetables.html',
          controller: 'TimetablesCtrl'
        }
      }
    })
    .state('app.results', {
      url: '/results',
      views: {
        'menuContent': {
          templateUrl: 'app/academics/results.html',
          controller: 'TimetablesCtrl'
        }
      }
    })
    .state('app.elibrary', {
      url: '/elibrary',
      views: {
        'menuContent': {
          templateUrl: 'app/academics/elibrary.html',
          controller: 'ElibraryCtrl'
        }
      }
    })
    // dmall logics here
    .state('app.dmall', {
        url: '/dmall',
        views: {
          'menuContent': {
            templateUrl: 'app/dmall/dmall.html'
          }
        }
      })

      // school logics
      .state('app.tour', {
        url: '/tour',
        views: {
          'menuContent': {
            templateUrl: 'app/school/tour.html',
            controller: 'TourCtrl'
          }
        }
      })
      .state('app.eservices', {
        url: '/eservices',
        views: {
          'menuContent': {
            templateUrl: 'app/school/eservices.html',
            controller: 'EservicesCtrl'
          }
        }
      })
      .state('app.about', {
        url: '/about',
        views: {
          'menuContent': {
            templateUrl: 'app/about/about.html',
            controller: 'AboutCtrl'
          }
        }
      })
    .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'app/settings/settings.html',
          controller: 'SettingsCtrl',
          resolve: {
            resolvedSettings: function(Storage){
              return Storage.getUserSettings();
            }
          }
        }
      }
    });

    $urlRouterProvider.otherwise('/loading');

    // catch Angular errors
    $provide.decorator('$exceptionHandler', ['$delegate', function($delegate){
      return function(exception, cause){
        $delegate(exception, cause);
        var data = {};
        if(cause)               { data.cause    = cause;              }
        if(exception){
          if(exception.message) { data.message  = exception.message;  }
          if(exception.name)    { data.name     = exception.name;     }
          if(exception.stack)   { data.stack    = exception.stack;    }
        }
        Logger.error('Angular error: '+data.message, {cause: data.cause, stack: data.stack});
      };
    }]);
    // interceptors
/**    $httpProvider.interceptors.push(function($q, $location) {
        return {
            responseError: function(rejection) {
                console.log("Redirect");
                if (rejection.status == 401 && $location.path() !== '/signin' && $location.path() !== '/register') {
                    $location.nextAfterLogin = $location.path();
                    $location.path('#/app/twitts');
                }
                return $q.reject(rejection);
            }
        };
    }); **/
  }

  // catch JavaScript errors
  window.onerror = function(message, url, line, col, error){
    var stopPropagation = false;
    var data = {};
    if(message)       { data.message      = message;      }
    if(url)           { data.fileName     = url;          }
    if(line)          { data.lineNumber   = line;         }
    if(col)           { data.columnNumber = col;          }
    if(error){
      if(error.name)  { data.name         = error.name;   }
      if(error.stack) { data.stack        = error.stack;  }
    }
    if(navigator){
      if(navigator.userAgent)   { data['navigator.userAgent']     = navigator.userAgent;    }
      if(navigator.platform)    { data['navigator.platform']      = navigator.platform;     }
      if(navigator.vendor)      { data['navigator.vendor']        = navigator.vendor;       }
      if(navigator.appCodeName) { data['navigator.appCodeName']   = navigator.appCodeName;  }
      if(navigator.appName)     { data['navigator.appName']       = navigator.appName;      }
      if(navigator.appVersion)  { data['navigator.appVersion']    = navigator.appVersion;   }
      if(navigator.product)     { data['navigator.product']       = navigator.product;      }
    }
    Logger.error('JavaScript error: '+data.message, {cause: data.cause, stack: data.stack});
    return stopPropagation;
  };

  function runBlock($rootScope, User){
    $rootScope.safeApply = function(fn){
      var phase = this.$root ? this.$root.$$phase : this.$$phase;
      if(phase === '$apply' || phase === '$digest'){
        if(fn && (typeof(fn) === 'function')){
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
    // get user auth status
    if (User.getCachedCurrent() == null) {
        User.getCurrent();
    }
  }
})();
