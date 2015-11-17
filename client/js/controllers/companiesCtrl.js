/**
 * Created by Jhonny on 07/09/2015.
 */

'use strict';

angular.module('dashboardApp')
    .controller('companiesCtrl', function ($scope,$location) {
       
    
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


    });
