angular.module('cinergi', ['ngResource', 'Controllers'])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {

    var isLoggedIn = function ($q, $timeout, $http, $location, $rootScope) {
      var deferred = $q.defer();
      $http.get('/user').success(function (user) {
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
          loggedin: isLoggedIn
        }
      })

  })
  .run(function ($rootScope, $http) {
    $rootScope.message = '';
    $rootScope.logout = function () {
      $rootScope.message = 'Logged out.';
    }
  })
;