'use strict';

angular.module('app')
    .controller('SummaryController', ['$scope', '$state', 'userService', 'ActivityApi', function ($scope, $state, userService, ActivityApi) {

        this.initialize = function(){
            $scope.user = userService.getCurrentUser();
            if (!$scope.searchStartDate){
                $scope.searchStartDate = moment().startOf('week');
            }
            getActivities();
        };

        function getSearchStartDate(){
            return $scope.searchStartDate.format('YYYY-MM-DD');
        }

        function getSearchEndDate(){
            return moment($scope.searchStartDate).add(1,'weeks').format('YYYY-MM-DD');
        }

        function getActivities(){
            ActivityApi.one('user',12345).one('activities').get({access_token: userService.getToken(), searchStartDate: getSearchStartDate(), searchEndDate: getSearchEndDate()}).then(function (activities) {
                $scope.items = ActivityApi.stripRestangular(activities);
            }, function(response){
                console.error(JSON.stringify(response));
            });

        }

        $scope.goPreviousWeek = function(){
            $scope.searchStartDate = moment($scope.searchStartDate).subtract(1, 'weeks');
            getActivities();
        }

        $scope.goNextWeek = function(){
            $scope.searchStartDate = moment($scope.searchStartDate).add(1, 'weeks');
            getActivities();
        }

        $scope.getCustomer = function(activity){
            $state.transitionTo('customer', {custId: activity.customerId});
        }

        $scope.getActivity = function(activity){
            $state.transitionTo('activity', {activityId: activity._id});
        }

        this.initialize();

    }]);
