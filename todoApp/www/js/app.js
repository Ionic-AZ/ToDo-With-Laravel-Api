//"proxyUrl": "http://laraveltodo.herokuapp.com/api"
//"proxyUrl": "http://localhost:8000/api"
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('todoApp', ['ionic', 'satellizer'])
  .constant('ApiEndpoint', { url: 'http://laraveltodo.herokuapp.com/api' })
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
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: '/templates/login.html',
        controller: 'AuthController'
      })
      .state('register', {
        url: '/register',
        templateUrl: '/templates/register.html',
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
      
    function redirectWhenLoggedOut($q, $injector) {
            console.log('redrectWhenLoggedOut');  
          return {
                responseError: function (rejection) {
                  console.log('redrectWhenLoggedOut.responseError', rejection);  
                      var $state = $injector.get('$state');
                    var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];
 
                    angular.forEach(rejectionReasons, function (value, key) {
                        if (rejection.data.error === value) {
                            localStorage.removeItem('user');
                            $state.go('login');
                        }
                    });
 
                    return $q.reject(rejection);
                }
            }
        }
 
        // $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

      // Push the new factory onto the $http interceptor array
			$httpProvider.interceptors.push(redirectWhenLoggedOut);

  });
