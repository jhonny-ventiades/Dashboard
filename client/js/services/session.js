/**
 * Angular Settings page services.
 *
 * User: Jhonny Ventiades<jhonny.ventiadesg@gmail.com>
 * Date: 2015-11-18
 */

angular.module('dashboardApp')
    .factory('Sessions', function ($q,$window) {
        return {
         get: function(region){
            var deferred = $q.defer();
            var results = [];

            var User = Parse.Object.extend("_User");
            var queryUser = new Parse.Query(User);
            queryUser.equalTo("region",region);

            var Sessions = Parse.Object.extend("_Session");
            var query = new Parse.Query(Sessions);
            query.include("user");
            query.matchesQuery("user",queryUser);
            //query.equalTo("user.region",region);
            query.find({
                success: function (data) {
                    //angular.copy(data,results);
                    deferred.resolve(data);
                },
                error: function (error) {
                  deferred.reject(error);
                    console.log(error);
                }
            });
            return deferred.promise;
        }
    }

});
