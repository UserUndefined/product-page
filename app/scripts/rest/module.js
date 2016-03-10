'use strict';

angular.module('activityApiRest', [
    'restangular',
    'config',
    'angular-flash.service',
    'angular-flash.flash-alert-directive'
])
    .run(['Restangular', '$state', 'flash', function (Restangular, $state, flash) {

        Restangular.setErrorInterceptor(function (response) {
            if (response.status === 401 && response.config.url.indexOf('session') === -1) {
                flash.error = 'Your login has expired. Please login again.';
                $state.go('login');
                return false;
            }
            return true;
        });

    }])
;
