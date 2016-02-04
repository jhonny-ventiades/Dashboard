/**
 * Created by Jhonny on 07/09/2015.
 */

'use strict';

angular.module('dashboardApp')
    .controller('mainCtrl', function ($scope,$location,signIn) {

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
    }


    $scope.redirectUser = function(){ console.log($scope.myUser.designation);
        if($scope.myUser.designation == 'region_manager' || $scope.myUser.designation == 'manager'){
            $location.path("users/" +  $scope.myUser.id);
            console.log("entro")
        } else if($scope.myUser.designation == 'admin' || $scope.myUser.designation == 'superadmin'){
            $location.path("companies");
        }
<<<<<<< HEAD

        $scope.changeDashboard = function(title){
                $rootScope.titleLogin = title + " Dashboard";
                if(title == 'iOS' || title == 'ios'){
                    applicationId ="6G4jVxScRgDj6kKv8tcrPv21s3px6ugLGMYkURpr";
                    javascriptKey ="9xyK9Ci6IDT5TOaevK7WwFdbfN6YFyeF9duX1I6d";
                    $rootScope.platform = 'ios';

                }
                else if(title == 'Android' || title == 'android'){
                    applicationId ="ZrANjzvLT79i49LbEjGslE6KZkJzhSgtBZZpsP6u";
                    javascriptKey ="AM4vLyoJAYvgQkU21zcwbjwI0JmUxGXTTJiohX8u";
                    $rootScope.platform = 'android';
                }
            }
		$scope.showLoginLayout = function(){
			$("#platformsButtons").fadeOut(500);
					setTimeout(function(){
						$("#loginLayout").fadeIn(1000);
					}, 500);
		}

		$scope.hideLoginLayout = function(){
			$("#loginLayout").fadeOut(500);
					setTimeout(function(){
						$("#platformsButtons").fadeIn(1000);
					}, 500);
		}

=======
    }
>>>>>>> origin/analitycs
    
    });
