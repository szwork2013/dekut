(function(){
  'use strict';
  angular.module('app', ['ionic', 'ngResource', 'ionic-material', 'lbServices', 'bd.timedistance',
   'app.register', 'app.signin', 'app.profile', 'jett.ionic.filter.bar', 'restangular', 'angularMoment',
    'ngCordova', 'ionic.service.core', 'ionic.service.push', 'ionic.service.analytics', 'ionic-toast',
     'ionicShop', 'angular-svg-round-progress', 'ui.gravatar', 'ionic-datepicker', 'ionic-modal-select', 'angular.filter'])
    .config(configBlock)
  //  .run(runBlock);

    .run(function($ionicPlatform, $ionicAnalytics, $window, $ionicPopup, ionicToast, User) {

      $ionicPlatform.ready(function() {
        //ionic.Platform.fullScreen();
        $ionicAnalytics.register();
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }

        // get user auth status
        if (User.getCachedCurrent() == null) {
            User.getCurrent();
        }
        if (ionic.Platform.isWebView()) {
         }
        // add mob initialize here
   // admob plugin here
        if(window.plugins && window.plugins.AdMob) {
            var admob_key = device.platform == "Android" ? "ca-app-pub-8427277104243864/6066974633" : "ca-app-pub-8427277104243864/6066974633";
            var admob = window.plugins.AdMob;
            admob.createBannerView(
                {
                    'publisherId': pub-8427277104243864,
                    'adSize': admob.AD_SIZE.BANNER,
                    'bannerAtTop': false
                },
                function() {
                    admob.requestAd(
                        { 'isTesting': false },
                        function() {
                            admob.showAd(true);
                        },
                        function() { console.log('failed to request ad'); }
                    );
                },
                function() { console.log('failed to create banner view'); }
            );
        }
         $scope.showToast = function(){
     ionicToast.show('This App Needs Internet Connection', 'bottom', false, 2500);
   };
   $scope.showToast2 = function(){
     ionicToast.show('Enable it First', 'bottom', false, 2500);
   };

   // check internet connectivity
   if(window.Connection) {
                 if(navigator.connection.type == Connection.NONE) {
                    //  $ionicPopup.confirm({
                    //      title: "Internet Disconnected",
                    //      content: "The internet is disconnected on your device."
                    //  })
                    //  show connection is not available toast
$scope.showToast();
                      //
                      // .then(function(result) {
                      //    if(!result) {
                      //     //   ionic.Platform.exitApp();
                      //  $scope.showToast2();
                      //   }
                      // });

      }
    }
    // Notificatons trigger

    		$rootScope.$on('$cordovaLocalNotification:schedule',
    			function (event, notification, state) {
    				console.log("SCHEDULE");
    				console.log('event', event);
    				console.log('notification', notification);
    				console.log('state', state);
    			});

    		$rootScope.$on('$cordovaLocalNotification:trigger',
    			function (event, notification, state) {
    				console.log("TRIGGER");
    				console.log('event', event);
    				console.log('notification', notification);
    				console.log('state', state);
    			});

    		$rootScope.$on('$cordovaLocalNotification:update',
    			function (event, notification, state) {
    				console.log('UPDATE');
    				console.log('event', event);
    				console.log('notification', notification);
    				console.log('state', state);
    			});

    		$rootScope.$on('$cordovaLocalNotification:cancel',
    			function (event, notification, state) {
    				console.log('CANCEL');
    				console.log('event', event);
    				console.log('notification', notification);
    				console.log('state', state);
    			});
})

    })

  function configBlock($stateProvider, $urlRouterProvider, $provide, $ionicFilterBarConfigProvider, $httpProvider, $ionicAppProvider){
    $stateProvider
    .state('loading', {
      url: '/loading',
      template: '<ion-spinner style="text-align: center; margin-top: 50%;"></ion-spinner>',
      controller: 'LoadingCtrl'
    })
// into logics
.state('intro', {
  url: '/intro',
  templateUrl: 'app/about/intro.html'
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
    //edit Profile
    .state('app.profile', {
      url: '/profile/:id/edit',
      views: {
        'menuContent': {
          templateUrl: 'app/authentication/profile/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })
    .state('app.users', {
      url: '/users',
      views: {
        'menuContent': {
          templateUrl: 'app/authentication/profile/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })
    .state('app.user', {
      url: '/user/:id',
      views: {
        'menuContent': {
          templateUrl: 'app/authentication/profile/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })
    // academics
    .state('app.ptimetables', {
      url: '/ptimetables',
      views: {
        'menuContent': {
          templateUrl: 'app/academics/ptimetables/timetables.html',
          controller: 'PTimetablesCtrl'
        }
      }
    })
    .state('app.stimetables', {
      url: '/stimetables',
      views: {
        'menuContent': {
          templateUrl: 'app/academics/stimetables/timetables.html',
          controller: 'STimetablesCtrl'
        }
      }
    })
    .state('app.stimetable', {
      url: '/stimetable/:id',
      views: {
        'menuContent': {
          templateUrl: 'app/academics/stimetables/timetable.html',
          controller: 'STimetableCtrl'
        }
      }
    })
    .state('app.results', {
      url: '/results',
      views: {
        'menuContent': {
          templateUrl: 'app/academics/results/results.html',
          controller: 'ResultsCtrl'
        }
      }
    })
    .state('app.result', {
      url: '/result/:id',
      views: {
        'menuContent': {
          templateUrl: 'app/academics/results/result.html',
          controller: 'ResultCtrl'
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
            templateUrl: 'app/dmall/dmall.html',
            controller: 'ProductsCtrl'

          }
        }
      })
      // each product detail as per id
    .state('app.product', {
        url: '/product/:id',
        views: {
          'menuContent': {
            templateUrl: 'app/dmall/product.html',
            controller: 'ProductCtrl'
          }
        }
      })
      // url for placing order, place order in each id
      .state('app.order', {
          url: '/product/:id/order',
          views: {
            'menuContent': {
              templateUrl: 'app/dmall/order.html',
              controller: 'ProductCtrl'
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
      // eservices logics
      .state('app.eservices', {
        url: '/eservices',
        views: {
          'menuContent': {
            templateUrl: 'app/school/eservices/dashboard.html',
            controller: 'EservicesCtrl'
          }
        }
      })
      .state('app.complaints', {
        url: '/complaints',
        views: {
          'menuContent': {
            templateUrl: 'app/school/eservices/complaints.html',
            controller: 'EservicesCtrl'
          }
        }
      })
      .state('app.suggestions', {
        url: '/suggestions',
        views: {
          'menuContent': {
            templateUrl: 'app/school/eservices/suggestions.html',
            controller: 'EservicesCtrl'
          }
        }
      })
      .state('app.inquiry', {
        url: '/inquiry',
        views: {
          'menuContent': {
            templateUrl: 'app/school/eservices/inquiry.html',
            controller: 'EservicesCtrl'
          }
        }
      })
      .state('app.feedback', {
          url: '/feedback',
          views: {
            'menuContent': {
              templateUrl: 'app/school/eservices/feedback.html',
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

    $urlRouterProvider.otherwise('/intro');

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
   $httpProvider.interceptors.push(function($q, $location) {
        return {
            responseError: function(rejection) {
                console.log("Redirect");
                if (rejection.status == 401 && $location.path() !== '/signin' && $location.path() !== '/register') {
                    $location.nextAfterLogin = $location.path();
                    $state.go('app.twitts');
                }
                return $q.reject(rejection);
            }
        };
    });

    'gravatarServiceProvider', function(gravatarServiceProvider) {
        gravatarServiceProvider.defaults = {
          size     : 100,
          "default": 'img/student.png'  // Mystery man as default for missing avatars, so let's give him one
        };

        // Use https endpoint
        gravatarServiceProvider.secure = false;

        // Force protocol
        gravatarServiceProvider.protocol = 'http';

        // Override URL generating function
        gravatarServiceProvider.urlFunc = function(options) {
          // Code to generate custom URL
        };
      }
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

// gravatar manenoz
//

  }
})();
