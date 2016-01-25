/**
 * Angular Settings page services.
 *
 * User: Jhonny Ventiades<jhonny.ventiadesg@gmail.com>
 * Date: 2015-11-18
 */

angular.module('dashboardApp')
    .factory('assessors', function ($q,$window,$rootScope) {
        return {
         get: function(region){
            var deferred = $q.defer();
            var results = [];
            var designationKey, valueAssesor,valueManager, regionKey,emailKey,uncrypt_passwordKey;
             console.log($rootScope.platform);
            if($rootScope.platform == "android"){
                designationKey = "Designation";
                valueManager = "Manager";
                valueAssesor = "Assessor";
                regionKey = "Region";
                emailKey = "Email";
                uncrypt_passwordKey = "Uncrypt_Password";
            }
            else if($rootScope.platform == "ios"){
                designationKey = "designation";
                valueManager = "manager";
                valueAssesor = "assessor";
                regionKey = "region";
                emailKey = "email";
                uncrypt_passwordKey = "uncrypt_password";
            }
			var queryDesignationAssesor = new Parse.Query(Parse.User);
			queryDesignationAssesor.equalTo(designationKey,valueAssesor);

			var queryDesignationManager= new Parse.Query(Parse.User);
			queryDesignationManager.equalTo(designationKey,valueManager);

            var queryObject = new Parse.Query.or(queryDesignationAssesor,queryDesignationManager);
            queryObject.equalTo(regionKey, region);
            queryObject.find({
            success: function (data) { console.log(data);
                angular.copy(data,results);
                results.forEach(function(item){
                    item.username = item.get("username");
                    item.email = item.get(emailKey);
                    item.password = item.get(uncrypt_passwordKey);
                    item.designation = item.get(designationKey);
                    item.region = item.get(regionKey);
                    if(item.designation == "Assessor")item.designation = "assessor";
                    if(item.designation == "Manager")item.designation = "manager";
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
				if(manager.designation == 'manager') manager.designation = "Manager";
				else if(manager.designation == 'assessor') manager.designation = "Assessor";
				user.set("Designation",manager.designation);
				user.set("Company_Name", manager.company_name);
				user.set("Uncrypt_Password", manager.uncrypt_password);
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
				user.set("uncrypt_password", manager.uncrypt_password);
			}
            user.save(null, {
              success: function(user) {
                console.log(user);
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
        update: function(assessor){
			var deferred = $q.defer();
			if(assessor.designation == 'manager') assessor.designation = "Manager";
			else if(assessor.designation == 'assessor') assessor.designation = "Assessor";
			Parse.Cloud.run('editAssessor', assessor, {
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
            delete: function(assessor){
                var deferred = $q.defer();
			//login the user to edit his values
			Parse.Cloud.run('deleteAssessor', {username:assessor.username}, {
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

    }

});
