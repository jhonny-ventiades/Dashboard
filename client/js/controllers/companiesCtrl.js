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
        company_name:""
    };
    $scope.regionManagerEdit = {};

    $scope.createLabel = "Create Company & Corporate Leader";//change the label in header

    $scope.errorSameRegion = false;
    $scope.regionsLoaded = false;
    $scope.errorExistingEmail = false;
    
    $scope.selectCompany = function(){
        $location.path("company");
    }
    
    $scope.showReport = function(id){
        $location.path("report/" + id);
    }

    $scope.loadRegionalManagersList = function(){
        regionManager.get()
        .then(function(data){
            $scope.regionsLoaded = true;
            angular.copy(data,$scope.regionsManagers);
        })
        .catch(function(data){
            console.log(data);

        });
    }

    $scope.createRegionManager = function(){
        $scope.regionManager.email = $scope.regionManager.username;
        regionManager.validateRegion($scope.regionManager.region)
            .then(function(data){
            // validate if there are no other fields with the same region
            if(data.length <= 0){
                regionManager.post($scope.regionManager)
                    .then(function(data){
                        $('#myModal').modal('hide');//hide modal
                        $scope.loadRegionalManagersList();
                        $scope.errorExistingEmail = false;
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
                            company_name:""
                        };

                    })
                    .catch(function(data){
                        if(data.code==202){
                            $("#emailTextBox").focus();
                            $scope.errorExistingEmail = true;
                        }
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
        $location.path("users/"+ company.id);
    }

    //copy the region manager object to the modal fields
    $scope.copyRegionManager = function(regionManger){
        angular.copy(regionManger,$scope.regionManagerEdit);
        $scope.regionManagerEdit.username = regionManger.username;
        $scope.regionManagerEdit.lastUsername = regionManger.username;
        $scope.regionManagerEdit.password = regionManger.password;
        $scope.regionManagerEdit.verify_password = regionManger.password;
        $scope.regionManagerEdit.lastEmail = regionManger.email;//email saved to have a reference to find the object
        $scope.regionManagerEdit.email = regionManger.email;
        $scope.regionManagerEdit.lastRegion = regionManger.region;//region saved to have a reference to find the object
        $scope.regionManagerEdit.region = regionManger.region;
        $scope.regionManagerEdit.phone = regionManger.phone;
        $scope.regionManagerEdit.address = regionManger.address;
        $scope.regionManagerEdit.branch = "branch";
        $scope.regionManagerEdit.designation = "region_manager";
        $scope.regionManagerEdit.company_name = regionManger.company_name;
        $scope.regionManagerEdit.uncrypt_password = regionManger.uncrypt_password;
    }

    $scope.editRegionManager = function(){
        $scope.regionManagerEdit.email = $scope.regionManagerEdit.username;
        regionManager.validateRegion($scope.regionManagerEdit.region)
        .then(function(data){
            // validate if there are no other fields with the same region
            var flag = false;
            if($scope.regionManagerEdit.region === $scope.regionManagerEdit.lastRegion){
                flag = true;
            }else{
                if(data.length <= 0 ){
                    flag = true;
                }
                else{
                    flag = false;
                }
            }

            if(flag == true){
                regionManager.update($scope.regionManagerEdit,$scope.myUser)
                    .then(function(data){
                        $('#editModal').modal('hide');//hide modal
                        $scope.loadRegionalManagersList();
                        $scope.regionManagerEdit = {};
                    })
                    .catch(function(data){
                        if(data.code==202){
                            $("#emailEditTextBox").focus();
                            $scope.errorExistingEmail = true;
                        }
                    });
            }
            else{
                $scope.errorSameRegion = true;
            }
        })
        .catch(function(data){

        });
    }

    $scope.deleteRegionManager = function(manager){
        var r = confirm("Are you sure to delete this user?");
        if (r == true) {
             regionManager.delete(manager,$scope.myUser)
                    .then(function(data){
                        $scope.loadRegionalManagersList();
                        $scope.getActualUser();
                    })
                    .catch(function(data){

                    });
        } else {
            r = "You pressed Cancel!";
        }
    }

});
