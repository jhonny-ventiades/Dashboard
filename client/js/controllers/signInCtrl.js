/**
 * Created by Jhonny on 07/09/2015.
 */

'use strict';

angular.module('dashboardApp')
    .controller('signInCtrl', function ($scope, $location,signIn,$window,$rootScope,$cookies) {
        $scope.user = {
            login:"",
            password:""
        };
		$scope.showAlertProcessSignIn = false;
        $scope.errorSignIn = false;
        $scope.signIn = function(){
            $scope.initParse();
			$scope.showAlertProcessSignIn = true;
            $scope.errorSignIn = false; // display the message of error
            signIn.get($scope.user.login, $scope.user.password)
            .then(function(data){
            	$scope.showAlertProcessSignIn = false;
                $('#myModal').modal('hide');//hide modal
                $('.modal-backdrop').remove();//clean the modal blur
                //$window.sessionStorage.token = data.sessionToken;
                $scope.getActualUser();
            })
            .catch(function(error){ console.log(error);
				$scope.showAlertProcessSignIn = false;
                $scope.errorSignIn = true;// show error message
            });
        }


    });
