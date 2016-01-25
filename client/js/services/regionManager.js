/**
 * Angular Settings page services.
 *
 * User: Jhonny Ventiades<jhonny.ventiadesg@gmail.com>
 * Date: 2015-11-17
 */

angular.module('dashboardApp')
    .factory('regionManager', function ($q,$window,$rootScope) {
        return {
         get: function(){
            var RegionalManager = Parse.Object.extend("_User");
            var deferred = $q.defer();
            var results = [];
            var queryObject = new Parse.Query(RegionalManager);
            //review wich platform is
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
        getActive: function(id){
            var RegionalManager = Parse.Object.extend("_User");
            var deferred = $q.defer();
            var results = {};
            var queryObject = new Parse.Query(RegionalManager);
            queryObject.equalTo("objectId", id);
            queryObject.first({
                success: function (data) {
                    angular.copy(data,results);
                    if(results.id != null){
                         if($rootScope.platform == "android"){
                            results.username = data.get("username");
                            results.email = data.get("Email");
                            results.role = data.get("Designation");
                            results.region = data.get("Region");
                            results.phone = data.get("Phone");
                            results.address = data.get("Address");
                            results.company_name = data.get("Company_Name");
                            results.uncrypt_password = data.get("Uncrypt_Password");
                         }
                        if($rootScope.platform == "ios"){
                                results.username = data.get("username");
                                results.email = data.get("email");
                                results.role = data.get("designation");
                                results.region = data.get("region");
                                results.phone = data.get("phone");
                                results.address = data.get("address");
                                results.company_name = data.get("company_name");
                                results.uncrypt_password = data.get("uncrypt_password");
                        }
                        deferred.resolve(results);
                    }
                    else{
                        deferred.reject(error);
                    }
                },
                error: function (error) {
                    deferred.reject(error);
                }
            });
            return deferred.promise;
        },

        post: function(manager){
            var User = Parse.Object.extend("_User");
            var user = new User();
            var deferred = $q.defer();

            if($rootScope.platform == "android"){
				user.set("username", manager.username);
				user.set("Name", manager.username);
				user.set("password", manager.password);
				user.set("Email", manager.email);
				user.set("Region", manager.region);
				user.set("Phone", manager.phone);
				user.set("Address", manager.address);
				user.set("Branch", manager.branch);
				if(manager.designation == 'region_manager' || manager.designation == 'regional_manager') manager.designation = "Regional_Manager"
				else if(manager.designation == 'manager') manager.designation = "Manager"
				else if(manager.designation == 'assessor') manager.designation = "Assessor"
				user.set("Designation",manager.designation);
				user.set("Company_Name", manager.company_name);
				user.set("Uncrypt_Password", manager.password);
			}
			if($rootScope.platform == "ios"){
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
				user.set("uncrypt_password", manager.password);
			}
            user.save(null, {
              success: function(user) {
                deferred.resolve(user);
                // Execute any logic that should take place after the object is saved.
                //deferred.resolve(user);
              },
              error: function(user, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                deferred.reject(error);
              }
            });
            return deferred.promise;
        },
        update: function(manager){
			var deferred = $q.defer();
			//login the user to edit his values
			Parse.Cloud.run('editCompany', manager, {
			  success: function(status) {
				  // the user was updated successfully
				  console.log(status);
				  deferred.resolve(status);

			  },
			  error: function(error) {
				  console.log(error);
				  deferred.reject(error);
				  }
			});
            return deferred.promise;
        },
        delete: function(manager){
			var deferred = $q.defer();
			//login the user to edit his values
			Parse.Cloud.run('deleteCompany', {username:manager.username,
											 region:manager.region}, {
			  success: function(status) {
				  // the user was updated successfully
				  console.log(status);
				  deferred.resolve(status);
			  },
			  error: function(error) {
				  console.log(error);
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
            queryObject.equalTo("designation","region_manager");
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
    }
});
