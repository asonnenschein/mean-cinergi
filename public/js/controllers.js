angular.module('Controllers', [])
  .controller('AuthCtrl', function ($scope, $rootScope, $http, $location) {
    $scope.user = {};

    $scope.register = function () {
      $http.post('/register', {
        email: $scope.register.email,
        password: $scope.register.password
      })
      .success(function (user) {
        console.log('success');
        $rootScope.message = 'Authentication successful!';
        $location.url('/user');
      })
      .error(function () {
        console.log('failure');
        $rootScope.message = 'Authentication failed.';
        $location.url('/');
      })
    };

    $scope.login = function () {

    };

  })
  .controller('UserCtrl', function ($scope) {

  })
;