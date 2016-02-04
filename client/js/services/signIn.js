/**
 * Angular Settings page services.
 *
 * User: Jhonny Ventiades<jhonny.ventiadesg@gmail.com>
 * Date: 2015-11-17
 */

angular.module('dashboardApp')
    .factory('signIn', function ($q,$rootScope) {
        return {
         get: function(login,password){
             var deferred = $q.defer();
             Parse.User.logIn(login, password, {
                  success: function(user) {
                    // Do stuff after successful login.
                       deferred.resolve(user);
                  },
                  error: function(user1, error) {
                    // The login failed. Check error to see why.
                       deferred.reject(error);
                  }
                });
             return deferred.promise;
        },
        getActualUser: function(id){
            var deferred = $q.defer();
            var query = new Parse.Query(Parse.User);
            query.equalTo("objectId", id);  // find all the women
            query.find({
              success: function(user) {
                deferred.resolve(user);
              }
            });
            return deferred.promise;
        },
        countUsers: function(region){
            var deferred = $q.defer();
            var query = new Parse.Query(Parse.User);
            if($rootScope.platform == "android")
            	query.equalTo("Region", region);
			if($rootScope.platform == "ios")
            	query.equalTo("region", region);
            query.count({
              success: function(count) {
                // The count request succeeded. Show the count
                deferred.resolve(count);
              },
              error: function(error) {
                // The request failed
                deferred.resolve(error);
                  console.log(error)
              }
            });
            return deferred.promise;
        },

        countManagers: function(region){
            var deferred = $q.defer();
            var query = new Parse.Query(Parse.User);
			if($rootScope.platform == "ios"){
            	query.equalTo("region", region);
            	query.equalTo("designation", "manager");
			}
			else if($rootScope.platform == "android"){
            	query.equalTo("Region", region);
            	query.equalTo("Designation", "Manager");
			}
            query.count({
              success: function(count) {
                // The count request succeeded. Show the count
                deferred.resolve(count);
              },
              error: function(error) {
                // The request failed
                deferred.resolve(error);
                  console.log(error)
              }
            });
            return deferred.promise;
        },
        countAssessor: function(region){
            var deferred = $q.defer();
            var query = new Parse.Query(Parse.User);
            if($rootScope.platform == "ios"){
            	query.equalTo("region", region);
            	query.equalTo("designation", "assessor");
			}
			else if($rootScope.platform == "android"){
            	query.equalTo("Region", region);
            	query.equalTo("Designation", "Assessor");
			}
            query.count({
              success: function(count) {
                // The count request succeeded. Show the count
                deferred.resolve(count);
              },
              error: function(error) {
                // The request failed
                deferred.resolve(error);
                  console.log(error)
              }
            });
            return deferred.promise;
        },
		countAllRegions: function(){
            var deferred = $q.defer();
            var query = new Parse.Query(Parse.User);
            query.count({
              success: function(count) {
                // The count request succeeded. Show the count
                deferred.resolve(count);
              },
              error: function(error) {
                // The request failed
                deferred.resolve(error);
                  console.log(error)
              }
            });
            return deferred.promise;
        },
		countAllManagers: function(region){
            var deferred = $q.defer();
            var query = new Parse.Query(Parse.User);
            query.count({
              success: function(count) {
                // The count request succeeded. Show the count
                deferred.resolve(count);
              },
              error: function(error) {
                // The request failed
                deferred.resolve(error);
                  console.log(error)
              }
            });
            return deferred.promise;
        },
        countAllAssessors: function(region){
            var deferred = $q.defer();
            var query = new Parse.Query(Parse.User);
            query.count({
              success: function(count) {
                // The count request succeeded. Show the count
                deferred.resolve(count);
              },
              error: function(error) {
                // The request failed
                deferred.resolve(error);
                  console.log(error)
              }
            });
            return deferred.promise;
        },
    }
});
