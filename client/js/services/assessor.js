/**
 * Angular Settings page services.
 *
 * User: Jhonny Ventiades<jhonny.ventiadesg@gmail.com>
 * Date: 2015-11-18
 */

angular.module('dashboardApp')
    .factory('assessors', function ($q) {
        return {
         get: function(region){
            var deferred = $q.defer();
            var results = [];
            var queryObject = new Parse.Query(Parse.User);
            queryObject.equalTo("designation", "assessor");
             queryObject.equalTo("region", region);
            queryObject.find({
            success: function (data) {
                angular.copy(data,results);
                results.forEach(function(item){
                    item.username = item.get("username");
                    item.password = item.get("uncrypt_password");
                    console.log(item.get("password"));
                    item.designation = item.get("designation");
                });
              deferred.resolve(results);
            },
            error: function (error) {
              deferred.reject(error);
            }
            });
            return deferred.promise;
        },


        post: function(manager){
            var user = new Parse.User();
            var deferred = $q.defer();
            user.set("username", manager.username);
            user.set("name", manager.username);
            user.set("password", manager.password);
            user.set("email", manager.email);
            user.set("region", manager.region);
            user.set("phone", manager.phone);
            user.set("address", manager.address);
            user.set("branch", manager.branch);
            user.set("designation",manager.designation);
            user.set("company_name", manager.company_name);
            user.set("uncrypt_password", manager.uncrypt_password);
            user.signUp(null, {
              success: function(user) {
                // Execute any logic that should take place after the object is saved.
                deferred.resolve(user);
              },
              error: function(user, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                deferred.reject(error);
              }
            });
            return deferred.promise;
        },

    }

});
