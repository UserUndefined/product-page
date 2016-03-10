'use strict';

angular.module('app')
    .controller('ProductController', ['$scope', '$state', 'ActivityApi', function ($scope, $state, ActivityApi) {

        $scope.mytime = new Date();
        $scope.dateOpenedStatus = false;
        $scope.activityStatusOpened = false;
        $scope.activityStatus = 'Called';
        $scope.minDate = $scope.minDate ? null : new Date();
        $scope.maxDate = new Date(2018, 12, 31);
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };
        $scope.open = function($event) {
            $scope.dateOpenedStatus = true;
        };

        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };

        $scope.ismeridian = true;
        $scope.toggleMode = function() {
            $scope.ismeridian = ! $scope.ismeridian;
        };

        $scope.update = function() {
            var d = new Date();
            d.setHours( 14 );
            d.setMinutes( 0 );
            $scope.mytime = d;
        };

        $scope.changed = function () {
            $log.log('Time changed to: ' + $scope.mytime);
        };

        $scope.clear = function() {
            $scope.mytime = null;
        };

        $scope.saveActivity = function(){
            $scope.saving = true;
            var activity = {
                customerId: 2000,
                customerName: $scope.activity.name,
                action: 'telephone',
                activityDateTime: new Date(),
                activityType: 'callback',
                notes: 'notes',
                logonId: $scope.activity.loginId,
                logonName: 'smiths01'
            };
            var activities = ActivityApi.all('activity');
            activities.post(activity).then(function (res) {
                $scope.saving = false;
                $state.go('summary');
            });
        }

        function initialise(){
            $scope.activity = {loginId: 12345};
        }

        initialise();
    }]);
