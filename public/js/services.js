angular.module('Services', [])

  .factory('AuthService', function () {
    return {isLogged: false};
  })

  .factory('UserService', function ($http) {
    return {
      logIn: function (username, password) {
        var postUrl = options.api.base_url + '/login'
          , postParams = {username: username, password: password}
          ;

        return $http.post(postUrl, postParams);
      },
      logOut: function () {

      }
    }
  })

  .factory('TokenService', function ($q, $window, $location, AuthService) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        return config;
      },
      requestError: function (err) {
        return $q.reject(err);
      },
      response: function (res) {
        if (res.status === 200 && $window.sessionStorage.token && !AuthService.isAuthenticated) {
          AuthService.isAuthenticated = true;
        }
        return res || $q.when(res);
      },
      responseError: function (err) {
        if (err.status === 401 && ($window.sessionStorage.token || AuthService.isAuthenticated)) {
          delete $window.sessionStorage.token;
          AuthService.isAuthenticated = false;
          $location.path('/login');
        }
        return $q.reject(err);
      }
    }
  })
;