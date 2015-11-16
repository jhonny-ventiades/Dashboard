/**
 * Angular Aplication.
 *
 * User: Jhonny Ventiades<jhonny.ventiadesg@gmail.com>
 * Date: 2015-09-07
 */

'use strict';

angular.module('dashboardApp', [
    'ngResource',
    'ngRoute'
])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'client/views/partials/main.html',
                controller: ''
            })          
            .when('/companies', {
                templateUrl: 'client/views/partials/companies.html',
                controller: 'companiesCtrl'
            })          
            .when('/report', {
                templateUrl: 'client/views/partials/report.html',
                controller: ''
            })          
            .when('/users', {
                templateUrl: 'client/views/partials/users.html',
                controller: ''
            })          
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    });