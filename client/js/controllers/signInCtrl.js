/**
 * Created by Jhonny on 07/09/2015.
 */

'use strict';

angular.module('dashboardApp')
    .controller('signInCtrl', function ($scope, $location) {
        $scope.user = {
            login:"",
            password:""
        };

        $scope.errorSignIn = false;
        $scope.signIn = function(){    
            if($scope.user.login == "admin" && $scope.user.password == "admin"){                
                $('#myModal').modal('hide');   
                $('.modal-backdrop').remove();
                $location.path("companies");                
                
            }
            else{
                $scope.errorSignIn = true;
            }
        }                

    });