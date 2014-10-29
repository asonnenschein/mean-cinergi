angular.module('cinergi', ['ngRoute', 'ngResource', 'Services', 'Controllers'])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    var loggedIn;

    loggedIn = function ($q, $timeout, $http, $location, $rootScope) {
      var deferred = $q.defer();
      $http.get('/loggedin').success(function (user) {
        if (user !== '0') {
          $timeout(deferred.resolve, 0);
        } else {
          $rootScope.message = 'Please log in.';
          $timeout(function(){deferred.reject();}, 0);
          $location.url('/');
        }
      });
      return deferred.promise;
    };

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
        controller: 'AuthCtrl'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        resolve: {
          loggedin: loggedIn
        }
      })

  })
  .run(function ($rootScope, $http, $location, AuthService) {

    var auth = AuthService;

    $rootScope.message = '';
    $rootScope.logout = function () {
      $http.get('/logout', {

      })
      .success(function () {
        auth.setLoggedIn(false);
        $location.url('/');
      })
      .error(function () {
        auth.setLoggedIn(true);
        $location.url('/');
      })
    }
  })
;