angular.module('Services', [])
  .service('AuthService', function () {
    var loggedIn;
    return {
      isLoggedIn: function () {
        return loggedIn;
      },
      setLoggedIn: function (val) {
        loggedIn = val;
      }
    }
  })
;