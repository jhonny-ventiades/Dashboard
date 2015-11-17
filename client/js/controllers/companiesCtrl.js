/**
 * Created by Jhonny on 07/09/2015.
 */

'use strict';

angular.module('dashboardApp')
    .controller('companiesCtrl', function ($scope,$location,regionManager) {
       
    $scope.regionsManagers = [];
    $scope.regionManager = {
        username:"",
        password:"",
        verify_password:"",
        email:"",
        region:"",
        phone:"",
        address:"",
        branch:"branch",
        designation:"region_manager",
        company_name:"",
    }
    $scope.errorSameRegion = false;
    
    $scope.selectCompany = function(){
        $location.path("company");
    }
    
    $scope.showReport = function(){
        $location.path("report");
    }
    
    $scope.logout = function(){
        Parse.User.logOut();
        $location.path("");
    }

    $scope.loadRegionalManagersList = function(){
        regionManager.get()
        .then(function(data){
            console.log(data);
            angular.copy(data,$scope.regionsManagers);
        })
        .catch(function(data){

        });
    }

    $scope.createRegionManager = function(){
        $scope.regionManager.email = $scope.regionManager.username;
        regionManager.validateRegion($scope.regionManager.region)
        .then(function(data){
            // validate if there are no other fields with the same region
            console.log(data.length);
            if(data.length <= 0){
                regionManager.post($scope.regionManager)
                    .then(function(data){
                        $('#myModal').modal('hide');//hide modal
                    })
                    .catch(function(data){

                    });
            }
            else{
                $scope.errorSameRegion = true;
            }
        })
        .catch(function(data){

        });

    }


});
