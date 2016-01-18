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
            .when('/report/:id', {
                templateUrl: 'client/views/partials/report.html',
                controller: 'reportCtrl'
            })          
            .when('/users/:id', {
                templateUrl: 'client/views/partials/users.html',
                controller: 'usersCtrl'
            })          
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    })
    .run(function($rootScope, $location) {
        $rootScope.$on('$routeChangeStart', function (event, next, current,$scope) {
            var currentUser = Parse.User.current();//get the current user with parse
            if (next.templateUrl == 'client/views/partials/companies.html'
                || next.templateUrl == 'client/views/partials/users.html') {
             /*   if (!currentUser) {// if there are no users connected
                    $location.path('/');
                }*/
            }

            else if(next.templateUrl == 'client/views/partials/main.html'){
                if (currentUser) {
                    $location.path('/companies');
                }
            }

        })
    });
