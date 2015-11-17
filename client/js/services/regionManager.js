/**
 * Angular Settings page services.
 *
 * User: Jhonny Ventiades<jhonny.ventiadesg@gmail.com>
 * Date: 2015-11-17
 */

angular.module('dashboardApp')
    .factory('regionManager', function ($q) {
        return {
         get: function(){
            var RegionalManager = Parse.Object.extend("User");
            var deferred = $q.defer();
            var results = [];
            var queryObject = new Parse.Query(RegionalManager);
            queryObject.equalTo("designation", "region_manager");
            queryObject.find({
            success: function (data) {
                angular.copy(data,results);
                results.forEach(function(item){
                    item.username = item.get("username");
                    item.email = item.get("email");
                    item.role = item.get("role");
                    item.region = item.get("region");
                    item.phone = item.get("phone");
                    item.address = item.get("address");
                    item.company_name = item.get("company_name");
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
            user.set("password", manager.password);
            user.set("email", manager.email);
            user.set("region", manager.region);
            user.set("phone", manager.phone);
            user.set("address", manager.address);
            user.set("branch", manager.branch);
            user.set("designation",manager.designation);
            user.set("company_name", manager.company_name);
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

        validateRegion: function(region){
            var RegionalManager = Parse.Object.extend("User");
            var deferred = $q.defer();
            var results = [];
            var queryObject = new Parse.Query(RegionalManager);
            queryObject.equalTo("region",region);
            queryObject.find({
            success: function (data) {
                angular.copy(data,results);
              deferred.resolve(results);
            },
            error: function (error) {
              deferred.reject(error);
            }
            });
            return deferred.promise;
        },


        delete: function(id){
            var Risk = Parse.Object.extend("risk");
            var deferred = $q.defer();
            var deleteRisk = new Risk();
            deleteRisk.id = id;
            deleteRisk.destroy({
                success: function(myObject) {
                    // The object was deleted from the Parse Cloud.
                    deferred.resolve(myObject);
                },
                error: function(myObject, error) {
                    // The delete failed.
                    // error is a Parse.Error with an error code and message.+
                    deferred.reject(error);
                }
            });
            return deferred.promise;
        }
    }

});
