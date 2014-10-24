angular.module('Controllers', [])
  .controller('MainCtrl', function ($scope, AuthService) {

    var auth = AuthService;
    $scope.logged = function () {
      return auth.isLoggedIn();
    };

  })
  .controller('AuthCtrl', function ($scope, $rootScope, $http, $location, AuthService) {

    var auth = AuthService;
    $scope.register = function () {
      $http.post('/register', {
        email: $scope.register.email,
        password: $scope.register.password
      })
      .success(function (user) {
        auth.setLoggedIn(true);
        $location.url('/user');
      })
      .error(function () {
        auth.setLoggedIn(false);
        $location.url('/');
      })
    };

    $scope.login = function () {
      $http.post('/login', {
        email: $scope.login.email,
        password: $scope.login.password
      })
      .success(function (user) {
        auth.setLoggedIn(true);
        $location.url('/user');
      })
      .error(function () {
        auth.setLoggedIn(false);
        $location.url('/');
      })
    };

    $scope.logout = function () {
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
    };

    /*
    $scope.loggedIn = function () {
      return true;
    };
    */

  })
  .controller('UserCtrl', function ($scope) {

  })
;