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

    $scope.createLabel = "Create Company/Region Manager";//change the label in header

    $scope.errorSameRegion = false;
    $scope.regionsLoaded = false;
    
    $scope.selectCompany = function(){
        $location.path("company");
    }
    
    $scope.showReport = function(){
        $location.path("report");
    }

    $scope.loadRegionalManagersList = function(){
        regionManager.get()
        .then(function(data){
            $scope.regionsLoaded = true;
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
                        $scope.loadRegionalManagersList();
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

    $scope.companySelected = function(company){
        angular.copy(company, $scope.company);
        $location.path("users");
    }

});
