var myApp = angular.module('myApp', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/plans/focus/0');

        $stateProvider
            .state('plans', {
                url: '/plans',
                templateUrl: 'partials/plans.html',
                controller: function ($scope, $state, $location) {
                    $scope.plans = [
                        'Plan 1',
                        'Plan 2',
                        'Plan 3',
                        'Plan 4',
                        'Plan 5'
                    ];

                    $scope.createPlan = function (planName) {
                        $scope.plans.push(planName);
                        $state.go('plans.focus', {planId: $scope.plans.length - 1});
                    };
                }
            })
            .state('plans.focus', {
                url: '/focus/:planId',
                templateUrl: 'partials/plans.focus.html',
                controller: function ($scope, $stateParams) {
                    $scope.focusPlan = $scope.plans[$stateParams.planId];
                }
            })
            .state('plans.create', {
                url: '/create',
                templateUrl: 'partials/plans.create.html',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('plan-name').focus();
                    }, 0);
                }
            });
    });
