var plans = [
    {'title': 'Plan 1', 'description': 'A detailed description of 1'},
    {'title': 'Plan 2', 'description': 'A detailed description of 2'},
    {'title': 'Plan 3', 'description': 'A detailed description of 3'},
    {'title': 'Plan 4', 'description': 'A detailed description of 4'},
    {'title': 'Plan 5', 'description': 'A detailed description of 5'}
];

var myApp = angular.module('myApp', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/plans/focus/0');

        $stateProvider
            .state('plans', {
                url: '/plans',
                templateUrl: 'partials/plans.html',
                controllerAs: 'pvm',

                controller: function ($scope, $state, $location) {
                    var self = this;

                    self.plans = plans;

                    $scope.balls = 'trumpet';

                    self.createPlan = function (planName, planDescription) {
                        self.plans.push({
                            'title': planName,
                            'description': planDescription
                        });

                        $state.go('plans.focus', {
                            'planId': $scope.plans.length - 1
                        });
                    };
                }
            })
            .state('plans.focus', {
                url: '/focus/:planId',
                views: {
                    focusArea: {
                        templateUrl: 'partials/plans.focus.html',
                        controllerAs: 'pfvm',
                        controller: function ($scope, $stateParams) {
                            this.planDetail = plans[$stateParams.planId - 1];

                            console.log($scope.balls);
                        }
                    }
                }
            })
            .state('plans.focus.extra', {
                url: '/extra',
                views: {
                    focusAreaInner: {
                        template: '<div>extra</div>',
                        controllerAs: 'pfevm',
                        controller: function ($scope) {
                            console.log($scope.balls);
                        }
                    }
                }
            })
            .state('plans.create', {
                url: '/create',
                templateUrl: 'partials/plans.create.html',
                controllerAs: 'pcvm',

                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('plan-name').focus();
                    });
                }
            });
    });
