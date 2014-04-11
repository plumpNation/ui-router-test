var myApp = angular.module('myApp', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/plans/focus');

        $stateProvider
            .state('plans', {
                url: '/plans',
                templateUrl: 'partials/plans.html',
                controller: function ($scope, $location) {
                    $scope.plans = [
                        'Plan 1',
                        'Plan 2',
                        'Plan 3',
                        'Plan 4',
                        'Plan 5'
                    ];

                    $scope.setFocusPlan = function (index) {
                        $scope.focusPlan = $scope.plans[index];
                    };

                    $scope.createPlan = function (planName) {
                        $scope.plans.push(planName);
                        $scope.setFocusPlan($scope.plans.length - 1);
                        $location.path('/');
                    };

                    $scope.setFocusPlan(0);
                }
            })
            .state('plans.focus', {
                url: '/focus',
                templateUrl: 'partials/plans.focus.html',
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
