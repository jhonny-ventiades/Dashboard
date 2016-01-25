/**
 * Angular Settings page services.
 *
 * User: Jhonny Ventiades<jhonny.ventiadesg@gmail.com>
 * Date: 2015-11-18
 */

angular.module('dashboardApp')
    .factory('Sessions', function ($q,$window,$rootScope) {
        return {
         get: function(region){
            var deferred = $q.defer();
			var regionQuery = new Parse.Query("_User");
			if($rootScope.platform == "ios") regionQuery.equalTo("region", region);
			else if($rootScope.platform == "android") regionQuery.equalTo("Region", region);

            //var Sessions = Parse.Object.extend("_Session");
            var query = new Parse.Query("_Session");
            query.include("user");
            //query.matchesQuery("user",regionQuery);
            //query.equalTo("user.region",region);
            query.find({
                success: function (data) {
					var toReturn = [];
					for(var  i = 0; i< data.length; i++){
						console.log(data[i].get("user").get("region"));
						if(data[i].get("user").get("region") ==  region){
							toReturn.push({
								username: data[i].get("user").get("username"),
								designation: data[i].get("user").get("designation"),
								lastConnection: data[i].updatedAt
							});
						}
					}
                    //angular.copy(data,results);
                    deferred.resolve(toReturn);
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

/*getSessions: function(region){

            var deferred = $q.defer();
            var results = [];

			var regionQuery = Parse.User();


			var Session = Parse.Object.extend("_Session");
            var queryObject = new Parse.Query(Session);
            //review wich platform is
			queryObject.include("users");
			queryObject.matchesQuery('user', regionQuery);
            if($rootScope.platform == "android")
                queryObject.equalTo("Designation", "Regional_Manager");
             if($rootScope.platform == "ios")
                queryObject.equalTo("designation", "region_manager");
            queryObject.find({
            success: function (data) {
                angular.copy(data,results);
                if($rootScope.platform == "android")
                    results.forEach(function(item){
                        item.username = item.get("username");
                        item.email = item.get("Email");
                        item.role = item.get("Designation");
                        item.region = item.get("Region");
                        item.phone = item.get("Phone");
                        item.address = item.get("Address");
                        item.company_name = item.get("Company_Name");
                        item.uncrypt_password = item.get("Uncrypt_Password");
                    });
                if($rootScope.platform == "ios")
                    results.forEach(function(item){
                        item.username = item.get("username");
                        item.email = item.get("email");
                        item.role = item.get("designation");
                        item.region = item.get("region");
                        item.phone = item.get("phone");
                        item.address = item.get("address");
                        item.company_name = item.get("company_name");
                        item.uncrypt_password = item.get("uncrypt_password");
                    });
              deferred.resolve(results);
            },
            error: function (error) {
              deferred.reject(error);
            }
            });
            return deferred.promise;
        },

*/
