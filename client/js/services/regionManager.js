/**
 * Angular Settings page services.
 *
 * User: Jhonny Ventiades<jhonny.ventiadesg@gmail.com>
 * Date: 2015-11-17
 */

angular.module('dashboardApp')
    .factory('regionManager', function ($q,$window,actualUserAndroid,createAssessorAndroid) {
        return {
         get: function(){
            var RegionalManager = Parse.Object.extend("User");
            var deferred = $q.defer();
            var results = [];
            var queryObject = new Parse.Query(RegionalManager);
            queryObject.equalTo("designation", "region_manager");
            //queryObject.equalTo("visible", true);
            queryObject.find({
            success: function (data) {
                angular.copy(data,results);
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
            var RegionalManager = Parse.Object.extend("User");
            var deferred = $q.defer();
            var results = {};
            var queryObject = new Parse.Query(RegionalManager);
            queryObject.equalTo("objectId", id);
            //queryObject.equalTo("visible", true);
            queryObject.first({
                success: function (data) {
                    angular.copy(data,results);
                    if(results.id != null){
                        results.username = data.get("username");
                        results.email = data.get("email");
                        results.role = data.get("designation");
                        results.region = data.get("region");
                        results.phone = data.get("phone");
                        results.address = data.get("address");
                        results.company_name = data.get("company_name");
                        results.uncrypt_password = data.get("uncrypt_password");
                        deferred.resolve(results);
                    }
                    else{
                        actualUserAndroid.get({"id":id})
                        .$promise
                        .then(function(data){
                            angular.copy(data,results);
                            deferred.resolve(results);
                        })
                        .catch(function(error){
                            deferred.reject(error);
                        })
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
            user.set("visible", true);
            user.set("uncrypt_password", manager.password);
            user.save(null, {
              success: function(user) {
                createAssessorAndroid.post(manager)//rewriting the method
                .$promise
                .then(function(data){
                    console.log(data);
                    deferred.resolve(user);
                })
                .catch(function(error){
                    console.log(error);
                });
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
            update: function(manager,actualUser){
                var deferred = $q.defer();
                //login the user to edit his values
                Parse.User.logIn(manager.lastUsername, manager.uncrypt_password, {
                  success: function(user) {
                        var query = new Parse.Query(Parse.User);
                        query.equalTo("email", manager.lastEmail);
                        query.equalTo("designation", "region_manager");
                        query.equalTo("region", manager.lastRegion);
                        query.first({//get the object of the users
                         success: function(objectToUpdate) {
                                objectToUpdate.set("username", manager.username);
                                if(manager.password != "")
                                    objectToUpdate.set("password", manager.password);
                                objectToUpdate.set("email", manager.email);
                                objectToUpdate.set("region", manager.region);
                                objectToUpdate.set("phone", manager.phone);
                                objectToUpdate.set("address", manager.address);
                                objectToUpdate.set("branch", manager.branch);
                                objectToUpdate.set("designation",manager.designation);
                                objectToUpdate.set("company_name", manager.company_name);
                                objectToUpdate.save();

                                Parse.User.logOut();//logout the user edited
                                //login in the actual user(admin)
                                Parse.User.logIn(actualUser.username,
                                                actualUser.password,{
                                         success: function(user) {
                                            deferred.resolve(user);
                                         },
                                        error: function(error) {
                                                 deferred.reject(error);
                                            }
                                         });

                            },
                            error: function(error) {
                                 deferred.reject(error);
                            }
                        });
                  },
                  error: function(user, error) {
                    // The login failed. Check error to see why.
                  }
                });

            return deferred.promise;
        },
            delete: function(manager,actualUser){
                 var deferred = $q.defer();
                //login the user to edit his values
                Parse.User.logIn(manager.username, manager.uncrypt_password, {
                  success: function(user) {
                        var query = new Parse.Query(Parse.User);

                        query.equalTo("email", manager.email);
                        query.equalTo("designation", "region_manager");
                        query.equalTo("region", manager.region);
                        query.first({//get the object of the users
                         success: function(objectToUpdate) {
                                objectToUpdate.set("visible", false);
                                objectToUpdate.save();

                                Parse.User.logOut();//logout the user edited
                                //login in the actual user(admin)
                                Parse.User.logIn(actualUser.username,
                                                actualUser.password,{
                                         success: function(user) {
                                            $window.sessionStorage.token = user.sessionToken;
                                            deferred.resolve(user);
                                         },
                                        error: function(error) {
                                                 deferred.reject(error);
                                            }
                                         });

                            },
                            error: function(error) {
                                 deferred.reject(error);
                            }
                        });
                  },
                  error: function(user, error) {
                    // The login failed. Check error to see why.
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
