/**
 * Created by Jhonny on 07/09/2015.
 */

'use strict';

angular.module('dashboardApp')
    .controller('mainCtrl', function ($scope,$location,signIn) {

    //Parse.initialize("0PFoPjr5G4LTn82O6Cz2EwwzBJhDtvJuCpQy6dd7", "jezYGz4N2YgwgauGxv5e8ptR8ckfqqAx3NpocYgC");
    Parse.initialize("6G4jVxScRgDj6kKv8tcrPv21s3px6ugLGMYkURpr", "9xyK9Ci6IDT5TOaevK7WwFdbfN6YFyeF9duX1I6d");
    $scope.company = {};
    
    $scope.actualUserLabel = "";
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
        })
        .catch(function(error){
        });
    }
    
    });
