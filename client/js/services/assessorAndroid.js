angular.module('dashboardApp')
    .factory('assessorAndroid', function ($resource) {
       return $resource('api/assessors/:region',
            {}, { //parameters default
                get: {
                    method: 'GET',
                    params:{
                        region:'@region'
                    },
                    isArray:true
                }
            });
    });
angular.module('dashboardApp')
    .factory('createAssessorAndroid', function ($resource) {
       return $resource('api/assessors',
            {}, { //parameters default
                post: {
                    method: 'POST',
                }
            });
    });
