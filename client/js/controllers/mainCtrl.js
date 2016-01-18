/**
 * Created by Jhonny on 07/09/2015.
 */

'use strict';

angular.module('dashboardApp')
    .controller('mainCtrl', function ($scope,$location,signIn,actualUserAndroid,currentUserAndroid) {

    //Parse.initialize("0PFoPjr5G4LTn82O6Cz2EwwzBJhDtvJuCpQy6dd7", "jezYGz4N2YgwgauGxv5e8ptR8ckfqqAx3NpocYgC");//test
    Parse.initialize("6G4jVxScRgDj6kKv8tcrPv21s3px6ugLGMYkURpr", "9xyK9Ci6IDT5TOaevK7WwFdbfN6YFyeF9duX1I6d");//production
    $scope.company = {};
    
    $scope.actualUserLabel = "";
    $scope.myUser = {};//actual user in session
    $scope.createLabel = "Create";

    $scope.logout = function(){
        Parse.User.logOut();
        $location.path("");
    }

    $scope.getActualUser = function(){
        var currentUser = Parse.User.current();//get the current user with parse
        if (currentUser) {
            signIn.getActualUser(currentUser.id)
            .then(function(data){
                $scope.actualUserLabel = data[0].get('username');
                angular.copy({'username':data[0].get('username'),
                              'password':data[0].get('uncrypt_password'),
                              'id': data[0].id,
                              'designation':data[0].get('designation')},$scope.myUser);

                $scope.redirectUser();
            })
            .catch(function(error){
            });
        } else {// if the user is not in ios parse, the app verify in android parse
            currentUserAndroid.get()
            .$promise
            .then(function(data){ console.log(data.id);
                actualUserAndroid.get({"id":data.id})
                .$promise
                .then(function(data){
                    $scope.actualUserLabel = data.username;
                    angular.copy({'username':data.username,
                                  'password':data.uncrypt_password,
                                  'id': data.id,
                                  'designation':data.designation},$scope.myUser);

                    $scope.redirectUser();
                })
                .catch(function(error){
                })
            })

        }
    }


    $scope.redirectUser = function(){ console.log($scope.myUser.designation);
        if($scope.myUser.designation == 'region_manager' || $scope.myUser.designation == 'manager'
          || $scope.myUser.designation == 'Regional_Manager' || $scope.myUser.designation == 'Manager'){//Android parse work with upper case
            $location.path("users/" +  $scope.myUser.id);
            console.log("entro " + $scope.myUser.id)
        } else if($scope.myUser.designation == 'admin' || $scope.myUser.designation == 'superadmin'
                 || $scope.myUser.designation == 'Admin' || $scope.myUser.designation == 'Super_Admin'){//Android parse work with upper case
            $location.path("companies");
        }
    }
    
    });
