angular.module('Routes', [])
  .config(['$routeProvider', '$locationProvider'
    , function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/home.html',
          controller: 'MainCtrl'
        })
        .when('/signup', {
          templateUrl: 'views/signup.html',
          controller: 'SignupCtrl'
        })
        .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        });
      $locationProvider.html5Mode(true);
    }
  ]);