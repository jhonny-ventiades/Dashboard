/**
 * Created by Jhonny on 04/12/2015.
 */

'use strict';

angular.module('dashboardApp')
    .controller('reportCtrl', function ($scope,Sessions,$routeParams,regionManager,signIn,reportInformationAndroid) {
        $scope.sessions = [];
        $scope.counterIphoneUsers = 0;
        $scope.countAssessor = 0;
        $scope.countManager = 0;

        $scope.android ={
            sessions:0,
            assessors:0,
            managers:0,
            totalUsers:0
        }

        $scope.loadInformation = function(){
            $scope.id = $routeParams.id;

            regionManager.getActive($scope.id)
            .then(function(data){
                angular.copy(data,$scope.company);

                Sessions.get($scope.company.region)
                .then(function(data){
                    angular.copy(data,$scope.sessions);
                })
                .catch(function(data){
                    console.log(data);
                });


                signIn.countUsers($scope.company.region)
                .then(function(data){
                    $scope.counterIphoneUsers = data;
                })
                .catch(function(data){
                    console.log(data)
                });

                signIn.countAssessor($scope.company.region)
                .then(function(data){
                    $scope.countAssessor = data;
                })
                .catch(function(data){
                    console.log(data)
                });

                signIn.countManagers($scope.company.region)
                .then(function(data){
                    $scope.countManager = data;
                })
                .catch(function(data){
                    console.log(data)
                });

                reportInformationAndroid.get({region: $scope.company.region})
                .$promise
                .then(function(data){
                    angular.copy(data,$scope.android); console.log(data);

                })
                .catch(function(error){
                    console.log(error);
                })

            })
            .catch(function(data){
                //$location.path("/");
            });


        }
    });
