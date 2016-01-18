/**
 * Angular Settings page services.
 *
 * User: Jhonny Ventiades<jhonny.ventiadesg@gmail.com>
 * Date: 2015-01-12
 */


angular.module('dashboardApp')
    .factory('signInAndroid', function ($resource) {
       return $resource('api/signIn/:login/:password',
            {}, { //parameters default
                get: {
                    method: 'GET',
                    params:{
                        login:'@login',
                        password:'@password'
                    }
                }
            });
    });

angular.module('dashboardApp')
    .factory('actualUserAndroid', function ($resource) {
       return $resource('api/actual/user/:id',
            {}, { //parameters default
                get: {
                    method: 'GET',
                    params:{
                        id:'@id'
                    }
                }
            });
    });

angular.module('dashboardApp')
    .factory('currentUserAndroid', function ($resource) {
       return $resource('api/current/user',
            {}, { //parameters default
                get: {
                    method: 'GET'
                }
            });
    });


angular.module('dashboardApp')
    .factory('reportInformationAndroid', function ($resource) {
       return $resource('api/report/:region',
            {}, { //parameters default
                get: {
                    method: 'GET',
                    params: {
                        region:"@region"
                    }
                }
            });
    });
