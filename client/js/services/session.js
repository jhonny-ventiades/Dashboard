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
<<<<<<< HEAD
			Parse.Cloud.run('getSessions', {region:region}, {
			  success: function(data) {
				  // the user was updated successfully
				  var toReturn = [];

            	if($rootScope.platform == "ios"){
					for(var  i = 0; i< data.length; i++){
						console.log(data[i].get("user").get("region"));
						//if(data[i].get("user").get("region") ==  region){
							toReturn.push({
								username: data[i].get("user").get("username"),
								designation: data[i].get("user").get("designation"),
								lastConnection: data[i].updatedAt,
								type:data[i].get("createdWith").action
							});
						//}
					}
				}
				if($rootScope.platform == "andriod"){
					for(var  i = 0; i< data.length; i++){
						console.log(data[i].get("user").get("Region"));
						//if(data[i].get("user").get("region") ==  region){
							toReturn.push({
								username: data[i].get("user").get("username"),
								designation: data[i].get("user").get("Designation"),
								lastConnection: data[i].updatedAt,
								type:data[i].get("createdWith").action
							});
						//}
					}
				}
				//angular.copy(data,results);
				deferred.resolve(toReturn);
			  },
			  error: function(error) {
				  console.log(error);
				  deferred.reject(error);
				  }
			});
            return deferred.promise;
        }
    }

});


angular.module('dashboardApp')
    .factory('Audits', function ($q,$window,$rootScope) {
        return {
         get: function(region){
            var deferred = $q.defer();
            var query = new Parse.Query("Audit");
            //query.equalTo("region",region);
			query.ascending("createdAt");
            query.find({
                success: function (data) {
					var toReturn = [];
					var status = "";
					if($rootScope.platform == "ios")  status = "status";
					if($rootScope.platform == "android")  status = "Status";
					for(var  i = 0; i< data.length; i++){
						//if(data[i].get("user").get("region") ==  region){
							toReturn.push({
								username: data[i].get("username"),
								status: data[i].get(status),
								createdAt: data[i].createdAt
							});
						//}
					}
=======
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
>>>>>>> origin/analitycs
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
