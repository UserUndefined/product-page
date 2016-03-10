'use strict';

angular.module('app')
    .directive('tlUser',['userService', '$state', function (userService, $state) {
        return {
            templateUrl: 'views/user/details.html',
            restrict: 'E',
            replace: true,
            link: function postLink($scope) {

                $scope.user = userService.getCurrentUser();

                $scope.logout = function() {
                    userService.logout().then(function(){
                        // success
                        $state.go('login');
                        $scope.user = userService.getCurrentUser();
                    }, function(){
                        //failure ??
                    });
                };
            }
        };
    }]);
