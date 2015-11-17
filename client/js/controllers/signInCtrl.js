/**
 * Created by Jhonny on 07/09/2015.
 */

'use strict';

angular.module('dashboardApp')
    .controller('signInCtrl', function ($scope, $location,signIn,$window) {
        $scope.user = {
            login:"",
            password:""
        };

        $scope.errorSignIn = false;
        $scope.signIn = function(){    
            /*if($scope.user.login == "admin" && $scope.user.password == "admin"){
                $('#myModal').modal('hide');   
                $('.modal-backdrop').remove();
                $location.path("companies");                
                
            }
            else{
                $scope.errorSignIn = true;
            }*/
            $scope.errorSignIn = false; // display the message of error
            signIn.get($scope.user.login, $scope.user.password)
            .then(function(data){
                $('#myModal').modal('hide');//hide modal
                $('.modal-backdrop').remove();//clean the modal blur
                $location.path("companies");//change the view
                console.log(data);
                $window.sessionStorage.token = data.sessionToken;
            })
            .catch(function(error){
                $scope.errorSignIn = true;// show error message
            });
        }                

    });
