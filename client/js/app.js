/**
 * Angular Aplication.
 *
 * User: Jhonny Ventiades<jhonny.ventiadesg@gmail.com>
 * Date: 2015-09-07
 */

'use strict';


angular.module('dashboardApp', [
    'ngResource',
    'ngRoute',
    'dashboardAndroid'
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
                if (!currentUser) {// if there are no users connected
                    $location.path('/');
                }
            }

            else if(next.templateUrl == 'client/views/partials/main.html'){
                if (currentUser) {
                    $location.path('/companies');
                }
            }

        })
    });


angular.module('dashboardAndroid', [])
    .controller('usersCtrl', function ($scope,assessor) {
        Parse.initialize("ZrANjzvLT79i49LbEjGslE6KZkJzhSgtBZZpsP6u", "AM4vLyoJAYvgQkU21zcwbjwI0JmUxGXTTJiohX8u");//production
    })
    .factory('assessorsAndroid', function ($q) {
    return{
        post: function(manager){
            var user = new Parse.User();
            var deferred = $q.defer();
            user.set("username", manager.username);
            user.set("name", manager.username);
            user.set("password", manager.password);
            user.set("email", manager.email);
            user.set("region", manager.region);
            user.set("phone", manager.phone);
            user.set("address", manager.address);
            user.set("branch", manager.branch);
            user.set("designation",manager.designation);
            user.set("company_name", manager.company_name);
            user.set("uncrypt_password", manager.uncrypt_password);
            user.set("visible", true);
            user.signUp(null, {
              success: function(user) {
                // Execute any logic that should take place after the object is saved.
                deferred.resolve(user);
              },
              error: function(user, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                deferred.reject(error);
              }
            });
            return deferred.promise;
        }
    }
});
