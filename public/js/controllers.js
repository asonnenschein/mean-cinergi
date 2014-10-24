angular.module('Controllers', [])
  .controller('AuthCtrl', function ($scope, $rootScope, $http, $location) {
    $scope.user = {};

    $scope.register = function () {
      $http.post('/register', {
        email: $scope.register.email,
        password: $scope.register.password
      })
      .success(function (user) {
        $location.url('/user');
      })
      .error(function () {
        $location.url('/');
      })
    };

    $scope.login = function () {
      $http.post('/login', {
        email: $scope.login.email,
        password: $scope.login.password
      })
      .success(function (user) {
        $location.url('/user');
      })
      .error(function () {
        $location.url('/');
      })
    };

  })
  .controller('UserCtrl', function ($scope, $q, $timeout, $rootScope, $http, $location) {
    $scope.loggedIn = function () {
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
    }
  })
;