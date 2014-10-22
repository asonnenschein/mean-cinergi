angular.module('Controllers', [])
  .controller('MainCtrl', function ($scope) {

  })
  .controller('SignupCtrl', function ($scope) {

  })
  .controller('LoginCtrl', function ($scope) {

  })
  .controller('UserCtrl', [
      '$scope'
    , '$location'
    , '$window'
    , 'UserService'
    , 'AuthService'
    , function UserCtrl ($scope, $location, $window, UserService, AuthService) {
        $scope.logIn = function (username, password) {
          if (username && password) {
            UserService.login(username, password)
              .success(function (data) {
                AuthService.isLogged = true;
                $window.sessionStorage.token = data.token;
                $location.path('/user');
              })
              .error(function (status, data) {
                console.log(status);
                console.log(data);
              })
          }
        };

        $scope.logout = function logout () {
          if (AuthService.isLogged) {
            AuthService.isLogged = false;
            delete $window.sessionStorage.token;
            $location.path('/');
          }
        }
    }
  ]);