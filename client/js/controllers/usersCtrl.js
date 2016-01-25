/**
 * Created by Jhonny on 18/11/2015.
 */

'use strict';

angular.module('dashboardApp')
    .controller('usersCtrl', function ($scope,$location,assessors,$routeParams,regionManager,assessorsAndroid) {

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
        company_name:""
    }

    $scope.assessorEdit = {};

    $scope.errorExistingEmail = false;
    $scope.search = "";

    $scope.assessorLoaded = false;//change icon logo
    $scope.createLabel = "Create Manager/Assessor";//change the label in header

    $scope.loadAssessors = function(){
        $scope.id = $routeParams.id;

        regionManager.getActive($scope.id)
        .then(function(data){
            angular.copy(data,$scope.company);

            assessors.get($scope.company.region)
            .then(function(data){
                angular.copy(data,$scope.assessorsList);
                $scope.assessorLoaded = true;
            })
            .catch(function(error){
                console.log(error);
            });
        })
        .catch(function(data){
            //$location.path("/");
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
                assessorsAndroid.post($scope.assessor)
                    .then(function(data){
                        console.log(data);
                    })
                    .catch(function(error){
                        console.log(error);
                    });
                $('#myModal').modal('hide');//hide modal
                $scope.loadAssessors();
            })
            .catch(function(error){
                if(error.code == 202){
                    $("#emailAssessorTextBox").focus();
                    $scope.errorExistingEmail = true;
                }
            });
    }

    $scope.copyAssessor = function(assesor){
        angular.copy(assesor,$scope.assessorEdit);
        $scope.assessorEdit.lastUsername = assesor.username;
        $scope.assessorEdit.verify_password = assesor.password;
        $scope.assessorEdit.lastEmail = assesor.email;//email saved to have a reference to find the object
        $scope.assessorEdit.lastRegion = assesor.region;//region saved to have a reference to find the object
        $scope.assessorEdit.uncrypt_password = assesor.password;
    }

    $scope.editAssessor = function(){
        $scope.assessorEdit.email = $scope.assessorEdit.username;

        assessors.update($scope.assessorEdit,$scope.myUser)
            .then(function(data){
                $('#editModal').modal('hide');//hide modal
                $scope.loadAssessors();
                $scope.assessorEdit = {};
            })
            .catch(function(data){
                if(data.code==202){
                    $("#emailAssessorTextBox").focus();
                    $scope.errorExistingEmail = true;
                }
            });

    }

    $scope.deleteAssessor = function(assessor){
      var r = confirm("Are you sure to delete this user?");
        if (r == true) {
             assessors.delete(assessor,$scope.myUser)
                    .then(function(data){
                        console.log(data);
                        $scope.loadAssessors();
                    })
                    .catch(function(data){
                        console.log(data);
                    });
        } else {
            r = "You pressed Cancel!";
        }
    }

    $scope.checkingUserChange = function(){
        if($scope.myUser.designation == 'manager'){
            $scope.createLabel = "Create Assessor";//change the label in headerdes
            $scope.assessor.designation = "assessor";
        }
    }

});
