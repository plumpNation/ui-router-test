'use strict';

angular.module('myApp', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/plans');

        $stateProvider
            .state('plans', {
                url: '/plans',
                templateUrl: 'partials/plans.html',
                controller: function ($scope, $state, $window) {
                    $scope.plans = [
                        'Plan 0',
                        'Plan 1',
                        'Plan 2',
                        'Plan 3',
                        'Plan 4',
                        'Plan 5'
                    ];

                    $scope.setFocusPlan = function (index) {
                        $state.go('plans.focus', {'planId': index});
                    };

                    $scope.createPlan = function (planName) {
                        var newIndex;

                        $scope.plans.push(planName);
                        newIndex = $scope.plans.length - 1;
                        $scope.setFocusPlan(newIndex);
                    };

                    $scope.setFocusPlan(0);

                    $scope.$on('$stateChangeStart',
                        function (event, toState, toParams, fromState, fromParams) {
                            // if any modals are open, close them, remove them, whatever
                            var modals = document.getElementsByClassName('modal');

                            if (modals.length) {
                                // stop the navigation
                                event.preventDefault();

                                angular.element(modals).remove();
                            }
                        }
                    );
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
                    // defers the focusing until the end of the digest, in case DOM is updated
                    // and the focus is then lost.
                    $timeout(function () {
                        document.getElementById('plan-name').focus();
                    }, 0);
                }
            });
    })

    /**
     * This directive is created in a way that would mimic a third party one, like jQuery UI.
     * i.e. It is supposed to be non angularish :)
     *
     */
    .directive('modalButton', function () {
        return {
            restrict: 'E',
            template: '<button ng-transclude></button>',
            transclude: true,
            replace: true,

            controller: function ($rootScope, $scope) {

                $scope.createModal = function () {
                    var button = document.createElement('button'),
                        $button = angular.element(button),
                        modal = document.createElement('div'),
                        $modal = angular.element(modal);

                    $button.text('Close');

                    $modal
                        .text('I am a modal')
                        .addClass('modal')
                        .append(button);

                    angular.element(document.body).append(modal);

                    $button.on('click', function () {
                        $button.off('click');
                        $modal.remove();
                    });
                };
            },

            link: function (scope, element) {
                element.on('click', function () {
                    scope.createModal();
                });
            }
        };
    });
