'use strict';

angular.module('app')
    .controller('SearchController', ['$scope', '$state', 'ActivityApi', function ($scope, $state, ActivityApi) {

        this.initialize = function(){
            getCustomers();
        };

        function getCustomers(){
            ActivityApi.all('customer/search').getList().then(function (customers) {
                $scope.customers = ActivityApi.stripRestangular(customers);
            }, function(response){
                console.error(JSON.stringify(response));
            });
        }

        $scope.getCustomer = function(id){
            $state.transitionTo('customer', {custId: id});
        }

        this.initialize();
    }]);
