'use strict';

angular.module('activityApiRest')
    .factory('ActivityApi', ['Restangular', 'ACTIVITY_API_URL', function (Restangular, url) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(url);
        });
    }]);
