(function(){
  'use strict';
  angular.module('app', ['ionic', 'ngResource', 'ionic-material', 'lbServices', 'bd.timedistance',
   'app.register', 'app.login', 'app.profile', 'jett.ionic.filter.bar', 'restangular', 'angularMoment',
    'ngCordova', 'ionic.service.core', 'ionic.service.push', 'firebase', 'dmall.controllers', 'dmall.directives', 'dmall.services', 'ionic.service.analytics'])
    .config(configBlock)
  //  .run(runBlock);

    .run(function($ionicPlatform, $ionicAnalytics, $rootScope, $window, $ionicLoading, $ionicPopup) {
    //  APP_ID=PARSE_APP_ID --variable CLIENT_KEY=PARSE_CLIENT_KEY
  //    Parse.initialize("U09YpxQvTxujzOmwdLP0U21qpMmIAxG7RlHAhVgU", "fYSt6pE2shi7qtIxULpvLgIw5XoedWXU7awRFmTg");
   Parse.initialize("nyPEebOF09JdRtPlcjcBMmoorDU1JnadLE0mDg4w", "MhpRKajED4WX773jjJcdqGKDLzeemhEF9rTqpZsl");
      $ionicPlatform.ready(function() {
        //ionic.Platform.fullScreen();
        $ionicAnalytics.register();
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        }
        if(window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
     window.parsePlugin.initialize("nyPEebOF09JdRtPlcjcBMmoorDU1JnadLE0mDg4w", "1VBlrXLz6De2faWBsEDSMx2b81KBD9Y95Sxg72WV", function() {

//      window.parsePlugin.initialize("U09YpxQvTxujzOmwdLP0U21qpMmIAxG7RlHAhVgU", "fYSt6pE2shi7qtIxULpvLgIw5XoedWXU7awRFmTg", function() {
          console.log('Parse initialized successfully.');
          window.parsePlugin.subscribe('SampleChannel', function() {
            console.log('Successfully subscribed to SampleChannel.');
              window.parsePlugin.getInstallationId(function(id) {
                // update the view to show that we have the install ID
                console.log('Retrieved install id: ' + id);
                  // *
                  //  * Now you can construct an object and save it to your own services, or Parse, and corrilate users to parse installations
                  //  *
                  //  var install_data = {
                  //     installation_id: id,
                  //     channels: ['SampleChannel']
                  //  }
                  //  *
              }, function(e) {
                console.log('Failure to retrieve install id.');
              });
          }, function(e) {
              console.log('Failed trying to subscribe to SampleChannel.');
          });
        }, function(e) {
            console.log('Failure to initialize Parse.');
        });
      });
      $rootScope.show = function(text) {
        $rootScope.loading = $ionicLoading.show({
          template: text ? text : 'Loading...',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 500,
          showDelay: 0
        });
      };
      $rootScope.hide = function() {
        $ionicLoading.hide();
      };
      $rootScope.longnotify = function(text) {
        $rootScope.show(text);
        $window.setTimeout(function() {
          $rootScope.hide();
        }, 2999);
      };
      $rootScope.quicknotify = function(text) {
        $rootScope.show(text);
        $window.setTimeout(function() {
          $rootScope.hide();
        }, 999);
      };
      $rootScope.confirm = function(title,text) {
        var confirmPopup = $ionicPopup.confirm({
           title: title,
           template: text
        });
        return confirmPopup;
      };
    })

  function configBlock($stateProvider, $urlRouterProvider, $provide, $ionicFilterBarConfigProvider, $httpProvider, $ionicAppProvider){
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
    // notices logics
    .state('app.notices', {
      url: '/notices',
      views: {
        'menuContent': {
          templateUrl: 'app/notices/notices.html',
          controller: 'NoticesCtrl'
        }
      }
    })
    .state('app.notice', {
      url: '/notices/:id',
      views: {
        'menuContent': {
          templateUrl: 'app/notices/notice.html',
          controller: 'NoticeCtrl'
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
            templateUrl: 'app/dmall/catalog.html',
            controller: 'CatalogController'

          }
        }
      })
      .state('app.catalog', {
        url: '/catalog',
        views: {
          'menuContent' :{
            templateUrl: "app/dmall/catalog.html",
            controller: 'CatalogController'
          }
        }
      })
      .state('app.search', {
        url: '/search',
        views: {
          'menuContent' :{
            templateUrl: "app/dmall/catalog.html",
            controller: 'SearchController'
          }
        }
      })
      .state('app.category', {
        url: "/category/:categoryId",
        views: {
          'menuContent': {
            templateUrl: "app/dmall/catalog.html",
            controller: 'CategoryController'
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
    // push config
    $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: '8bac5b39',
    // The public API key all services will use for this app
    api_key: '760b9a44ef5737e3e54ffdb2d213faa8bdc54a917cf9fd3e',
    // Set the app to use development pushes
    dev_push: true
  });
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

  function runBlock($rootScope, User, $ionicPlatform){
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
    // for ionic push
    $ionicPlatform.ready(function() {
  var push = new Ionic.Push({
    "debug": true
  });

  push.register(function(token) {
    console.log("Device token:", token.token);
  });
});
  }
})();
