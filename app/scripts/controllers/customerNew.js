'use strict';

angular.module('app')
    .controller('CustomerNewController', ['$scope','ActivityApi', '$state', function ($scope, ActivityApi, state) {
        var items = [];
        for (var i = 0; i <= 20; i++) {
            items.push('Customer New ' + i);
        }
        $scope.items = items;

        $scope.saveCustomer = function(){
            $scope.saving = true;
            var customer = {
                logonId: $scope.customer.loginId,
                name: $scope.customer.name,
                telephone: $scope.customer.telephone,
                address1: $scope.customer.address1,
                address2: $scope.customer.address2,
                town: $scope.customer.town,
                county: $scope.customer.county,
                postcode: $scope.customer.postcode,
                contact: $scope.customer.contact,
                url: $scope.customer.url
            };
            var customers = ActivityApi.all('customer');
            customers.post(customer).then(function (res) {
                $scope.saving = false;
                state.go('customer', {custId: res.id});
            });
        }

        function initialise(){
            $scope.customer = {loginId: 12345};
        }

        initialise();
    }]);
