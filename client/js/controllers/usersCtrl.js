/**
 * Created by Jhonny on 18/11/2015.
 */

'use strict';

angular.module('dashboardApp')
    .controller('usersCtrl', function ($scope,$location,assessors) {

    $scope.assessorsList = [];

    $scope.assessor = {
        username:"",
        password:"",
        verify_password:"",
        email:"",
        region:"",
        phone:"",
        address:"",
        branch:"branch",
        designation:"assessor",
        company_name:"",
    }

    $scope.assessorLoaded = false;//change icon logo
    $scope.createLabel = "Create Assessors";//change the label in header

    $scope.validateCompany = function(){
        if($scope.company.username === undefined)
            $location.path("companies");
    }

    $scope.loadAssessors = function(){
        assessors.get($scope.company.region)
            .then(function(data){
                angular.copy(data,$scope.assessorsList);
                $scope.assessorLoaded = true;
            })
            .catch(function(error){
                console.log(error);
            });
    }

    $scope.createAssessor = function(){

        $scope.assessor.email = $scope.assessor.username;
        $scope.assessor.region = $scope.company.region;
        $scope.assessor.phone = $scope.company.phone;
        $scope.assessor.address = $scope.company.address;
        $scope.assessor.company_name = $scope.company.company_name;
        $scope.assessor.uncrypt_password = $scope.assessor.password;

        assessors.post($scope.assessor)
            .then(function(data){
                $('#myModal').modal('hide');//hide modal
                $scope.loadAssessors();
            })
            .catch(function(error){
                console.log(error);
            });
    }

});
