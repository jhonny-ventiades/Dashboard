/**
 * Angular Settings page services.
 *
 * User: Jhonny Ventiades<jhonny.ventiadesg@gmail.com>
 * Date: 2015-11-17
 */

angular.module('dashboardApp')
    .factory('signIn', function ($q) {
        return {
         get: function(login,password){
             var deferred = $q.defer();
             Parse.User.logIn(login, password, {
                  success: function(user) {
                    // Do stuff after successful login.
                        deferred.resolve(user);
                  },
                  error: function(user, error) {
                    // The login failed. Check error to see why.
                        deferred.reject(error);
                  }
                });
             return deferred.promise;
        }
    }
});
