/**
 * Angular Settings page services.
 *
 * User: Jhonny Ventiades<jhonny.ventiadesg@gmail.com>
 * Date: 2015-11-18
 */

angular.module('dashboardApp')
    .factory('assessors', function ($q,$window) {
        return {
         get: function(region){
            var deferred = $q.defer();
            var results = [];

            var queryDesignationAssesor = new Parse.Query(Parse.User);
            queryDesignationAssesor.equalTo("designation","manager");

            var queryDesignationManager= new Parse.Query(Parse.User);
            queryDesignationManager.equalTo("designation","assessor");

            var queryObject = new Parse.Query.or(queryDesignationAssesor,queryDesignationManager);

            //queryObject.equalTo("visible", true);
            queryObject.find({
            success: function (data) {
                angular.copy(data,results);
                results.forEach(function(item){
                    item.username = item.get("username");
                    item.email = item.get("email");
                    item.password = item.get("uncrypt_password");
                    item.designation = item.get("designation");
                    item.region = item.get("region");
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
            user.set("visible", true);
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
        update: function(assessor,actualUser){
                var deferred = $q.defer();
                //login the user to edit his values
                Parse.User.logIn(assessor.lastUsername, assessor.uncrypt_password, {
                  success: function(user) {
                        var query = new Parse.Query(Parse.User);
                        query.equalTo("username", assessor.lastUsername);
                        query.equalTo("designation", "assessor");
                        query.equalTo("region", assessor.lastRegion);
                        query.first({//get the object of the users
                         success: function(objectToUpdate) {
                                console.log(assessor);
                                objectToUpdate.set("username", assessor.username);
                                if(assessor.password != "")
                                    objectToUpdate.set("password", assessor.password);
                                objectToUpdate.set("email", assessor.email);
                                objectToUpdate.save();

                                Parse.User.logOut();//logout the user edited
                                //login in the actual user(admin)
                                console.log(actualUser);
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
                                console.log(error);
                                 deferred.reject(error);
                            }
                        });
                  },
                  error: function(user, error) {
                      console.log(error);
                    // The login failed. Check error to see why.
                  }
                });

            return deferred.promise;
        },
            delete: function(manager,actualUser){
                 var deferred = $q.defer();
                //login the user to edit his values
                /*Parse.User.logIn(manager.username, manager.password, {
                  success: function(user) {
                        var query = new Parse.Query(Parse.User);

                        query.equalTo("username", manager.username);
                        query.equalTo("designation", "assessor");
                        query.equalTo("region", manager.region);
                        query.first({//get the object of the users
                         success: function(objectToUpdate) {
                                objectToUpdate.set("visible", false);
                                objectToUpdate.save();

                                Parse.User.logOut();//logout the user edited
                                //login in the actual user(admin)
                                console.log(actualUser);
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
                });*/

                /*var results = [];

                var queryDesignationAssesor = new Parse.Query(Parse.User);
                queryDesignationAssesor.equalTo("designation","manager");

                var queryDesignationManager= new Parse.Query(Parse.User);
                queryDesignationManager.equalTo("designation","assessor");

                var queryObject = new Parse.Query.or(queryDesignationAssesor,queryDesignationManager);

                //queryObject.equalTo("visible", true);
                queryObject.first({
                success: function (user) {
                    console.log(user);
                    //Parse.Cloud.useMasterKey();
                    user.destroy();
                    deferred.resolve(results);
                },
                error: function (error) {
                  deferred.reject(error);
                }
                });*/

                var query = new Parse.Query(Parse.User);
                query.get("GqjutUtZbJ", {
                  success: function(gameScore) {
                      console.log(gameScore);
                    // The object was retrieved successfully.
                      gameScore.destroy({
                          success: function(myObject) {
                            // The object was deleted from the Parse Cloud.
                              deferred.resolve(myObject);
                          },
                          error: function(myObject, error) {
                            // The delete failed.
                            // error is a Parse.Error with an error code and message.
                              deferred.resolve(error);
                          }
                        });
                  },
                  error: function(object, error) {
                    // The object was not retrieved successfully.
                    // error is a Parse.Error with an error code and message.
                  }
                });


            return deferred.promise;
        },

    }

});
