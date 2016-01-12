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
            $scope.errorSignIn = false; // display the message of error
            signIn.get($scope.user.login, $scope.user.password)
            .then(function(data){
                $('#myModal').modal('hide');//hide modal
                $('.modal-backdrop').remove();//clean the modal blur
                //$location.path("companies");//change the view
                $window.sessionStorage.token = data.sessionToken;
                $scope.getActualUser();
            })
            .catch(function(error){
                $scope.errorSignIn = true;// show error message
            });
        }


    });
