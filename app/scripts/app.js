angular.module('app', ['ui.router','activityApiRest','ivpusic.cookie', 'angular-flash.service', 'angular-flash.flash-alert-directive'])

    .run(['$rootScope', '$state', '$stateParams', function ($rootScope,   $state,   $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        //$rootScope.$on('$stateChangeError', function () {
        //    $state.transitionTo('login');
        //});
    }])

    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            var product = {
                url: '/',
                templateUrl: 'views/product.html',
                controller: 'ProductController'
            };

            $stateProvider

                .state('product', product)
                //.state('summary', summary)
                //.state('customer', customer)
                //.state('customernew', customernew)
                //.state('search', search)
                //.state('activity', activity)
                //.state('login', login)
                ;

            $urlRouterProvider.otherwise('/');

        }]);

angular.element(document).ready(function () {
    angular.bootstrap(document, ['app']);
    $(".button-collapse").sideNav();
    $('select').material_select();
});
