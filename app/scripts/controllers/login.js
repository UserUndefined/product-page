'use strict';

angular.module('app')
    .controller('LoginController', ['$scope', '$state', 'ActivityApi', 'userService', function ($scope, $state, ActivityApi, userService) {

        this.initialize = function(){
            if (userService.isLoggedIn()){
                $state.transitionTo('summary');
            }

            $scope.message = null;

            $scope.values = {
                username: null,
                password: null,
                rememberMe: false
            };

            $scope.formSubmitted = false;

        };

        $scope.login = function () {

            $scope.formSubmitted = true;

            if (!$scope.loginForm.$invalid) {

                ActivityApi.all('session').post($scope.values).then(function (res) {
                    // Successful login

                    userService.logIn($scope.values.username, res.access_token, res.role, res.campaign);

                    $state.transitionTo('summary');

                }, function () {

                    // Unsuccessful Login
                    $scope.message = "There was an error logging you in, please try again";


                });
            }
        };

        this.initialize();
    }]);
