/**
 * Created by Jhonny on 07/09/2015.
 */

'use strict';

angular.module('dashboardApp')
    .controller('mainCtrl', function ($scope,$location,signIn,$rootScope,$cookies) {
        var applicationId ="";
        var javascriptKey ="";
        $rootScope.platform = "";
        $scope.company = {};
        $scope.actualUserLabel = "";
        $rootScope.myUser = {};//actual user in session
        $scope.createLabel = "Create";
        $rootScope.titleLogin ="";

        $scope.initParse = function(){
			$cookies.put('parseUser', $rootScope.platform );
            Parse.initialize(applicationId, javascriptKey);
        };

        $scope.logout = function(){
            Parse.User.logOut();
            $location.path("");
        }

        $scope.getActualUser = function(){
			if($cookies.get('parseUser') !== null){
				$scope.changeDashboard($cookies.get('parseUser')) ;
			  	$scope.initParse();
				var currentUser = Parse.User.current();//get the current user with parse
				if (currentUser) {
					signIn.getActualUser(currentUser.id)
					.then(function(data){
						$scope.actualUserLabel = data[0].get('username');
						angular.copy({'username':data[0].get('username'),
									  'password':data[0].get('uncrypt_password'),
									  'id': data[0].id,
									  'designation':data[0].get('designation')},$rootScope.myUser);
						 if($rootScope.platform == "ios")
							 $rootScope.myUser.designation = data[0].get('designation');
						 else if($rootScope.platform == "android")
							 $rootScope.myUser.designation = data[0].get('Designation');
						$scope.redirectUser();
					})
					.catch(function(error){
					});
				}
			}
			else{
            	$location.path("");
			}
        }


        $scope.redirectUser = function(){
            if($rootScope.myUser.designation == 'region_manager' || $rootScope.myUser.designation == 'manager'
              || $rootScope.myUser.designation == 'Regional_Manager' || $rootScope.myUser.designation == 'Manager'){//Android parse work with upper case
                $location.path("users/" +  $scope.myUser.id);
                console.log("entro " + $scope.myUser.id)
            } else if($rootScope.myUser.designation == 'admin' || $rootScope.myUser.designation == 'superadmin'
                     || $rootScope.myUser.designation == 'Admin' || $rootScope.myUser.designation == 'Super_Admin'){//Android parse work with upper case
                $location.path("companies");
            }
        }

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

    
    });
