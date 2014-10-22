angular.module('Routes', [])
  .config(['$routeProvider', '$locationProvider', '$httpProvider'
    , function ($routeProvider, $locationProvider, $httpProvider) {

      $httpProvider.interceptors.push(function ($q, $location) {
        return function (promise) {
          return promise.then(
            function (response) {
              return response;
            },
            function (response) {
              if (response.status === 401) {
                $location.url('/');
              }
              return $q.reject(response);
            }
          )
        }
      });

      $routeProvider
        .when('/', {
          templateUrl: 'views/home.html',
          controller: 'MainCtrl'
        })
        .when('/user', {
          templateUrl: 'views/user.html',
          controller: 'UserPostListCtrl',
          access: {requiredLogin: true}
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