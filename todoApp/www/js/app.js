//"proxyUrl": "http://laraveltodo.herokuapp.com/api"
//"proxyUrl": "http://localhost:8000/api"
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('todoApp', ['ionic', 'satellizer'])
  .constant('ApiEndpoint', { url: 'http://laraveltodo.herokuapp.com/api' })
  .constant('Auth_Events', {
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .config(function ($stateProvider, $urlRouterProvider, $authProvider, $provide, ApiEndpoint, $httpProvider) {

    var baseUrl = ApiEndpoint.url;

    $authProvider.loginUrl = baseUrl + '/authenticate';
    $urlRouterProvider.otherwise(function ($injector, $location) {
      var $state = $injector.get("$state");
      $state.go("login");
    });

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'AuthController'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'AuthController'
      })
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppController'
      })
      .state('app.about', {
        url: "/about",
        views: {
          'menuContent': {
            templateUrl: "templates/about.html"
          }
        }
      })
      .state('app.tasks', {
        url: "/tasks",
        views: {
          'menuContent': {
            templateUrl: "templates/tasks.html",
            controller: 'ToDoController'
          }
        }
      });
  })
  .factory('AuthInterceptor', function ($q, $rootScope, Auth_Events) {
    return {

      responseError: function (rejection) {
        console.log('AuthInterceptor', rejection);
        console.log('redrectWhenLoggedOut.responseError', rejection);
        $rootScope.$broadcast({
          401: Auth_Events.notAuthenticated,
          403: Auth_Events.notAuthorized,
          400: Auth_Events.notAuthorized
        }[rejection.status], rejection);

        return $q.reject(rejection);
      }
    }
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  })
;
