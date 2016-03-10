'use strict';

angular.module('app')
    .controller('CustomerController', ['$scope', '$stateParams','ActivityApi', function ($scope, $stateParams, ActivityApi) {

        this.initialize = function(){
            $scope.custId = $stateParams.custId;
            if ($scope.custId && $scope.custId > 0){
                getCustomer($scope.custId);
            }
        }

        function getCustomer(custId){
            ActivityApi.one('customer',custId).get().then(function (customer) {
                $scope.customer = ActivityApi.stripRestangular(customer);
            }, function(response){
                console.error(JSON.stringify(response));
            });

        }

        this.initialize();
    }]);
