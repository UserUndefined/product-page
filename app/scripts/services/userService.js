'use strict';

angular.module('app')
    .service('userService', ['ipCookie', 'ActivityApi', '$q', function userService(ipCookie, ActivityApi, $q) {

        var loggedIn = false;
        var authTokenIsValid = false;


        this.getCurrentUser = function () {
            return ipCookie('currentUser');
        };

        this.setCurrentUser = function (user) {
            ipCookie('currentUser', user, { expires: 7 });
            authTokenIsValid = true;
        };


        this.logIn = function (username, token, role, campaign) {

            var user = {
                username: username,
                token: token,
                role: role,
                campaign: campaign
            };

            this.setCurrentUser(user);

            // these could be methods in the future
            loggedIn = true;

        };

        this.getToken = function () {
            var user = this.getCurrentUser();

            if (user) {
                return user.token;
            } else {
                return false;
            }
        };

        this.getRole= function () {
            var user = this.getCurrentUser();

            if (user) {
                return user.role;
            } else {
                return false;
            }
        };

        this.getCampaign= function () {
            var user = this.getCurrentUser();

            if (user) {
                return user.campaign;
            } else {
                return false;
            }
        };

        this.checkTokenValidity = function (token) {

            var defer = $q.defer();

            if (authTokenIsValid) {

                defer.resolve(true);

            } else {

                var dis = this;
                ActivityApi.one('session', token).get().then(function () {
                    loggedIn = true;
                    authTokenIsValid = true;
                    defer.resolve(true);

                }, function () {
                    dis.logout();

                    defer.resolve(false);

                });
            }

            return defer.promise;
        };

        this.isLoggedIn = function () {

            var isLoggedIn = $q.defer();
            var token = this.getToken();

            if (token) {
                this.checkTokenValidity(token).then(isLoggedIn.resolve);

            } else {
                ipCookie.remove('currentUser');
                isLoggedIn.resolve(false);

            }

            return isLoggedIn.promise;

        };

        this.logout = function () {
            var defer = $q.defer();
            var token = this.getToken();

            if (!this.getCurrentUser()) {
                defer.resolve(false);
            }

            ActivityApi.one('session', token).remove().then(function () {
                // success
                ipCookie.remove('currentUser');

                loggedIn = false;

                authTokenIsValid = false;

                defer.resolve(true);

            }, function () {
                // failure
                defer.resolve(false);

            });

            return defer.promise;
        };

    }]);