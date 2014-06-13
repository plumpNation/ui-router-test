var myApp = angular.module('myApp', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/plans');

        $stateProvider
            .state('plans', {
                url: '/plans',
                templateUrl: 'partials/plans.html',
                controller: function ($scope, $state) {
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

                    $scope.$on('$stateChangeStart', function (event, toState) {
                        console.log(toState);
                    });
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
            })

            /**
             * This state demonstrates the onEnter and onExit state functionality. In this
             * specific example, we want to utilise the broswer history to take into consideration
             * the opening of a dialog/modal. In this way, we can use the back button to close
             * the modal, a behaviour one expects on some mobile devices.
             */
            .state('plans.focus.modal', {
                url: '/modal',
                template: '',

                onEnter: function ($state) {
                    // If there is no modal on the DOM, we shouldn't be in this state.
                    var modals = document.getElementsByClassName('modal');

                    if (!modals.length) {
                        console.log('redirected');
                        $state.go('plans', {}, {location: 'replace'});
                    }
                },

                onExit: function () {
                    // Clean up any modals when we change state
                    var modals = document.getElementsByClassName('modal');

                    angular.element(modals).remove();
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
            template: '<button ng-transclude ui-sref="plans.focus.modal"></button>',
            transclude: true,
            replace: true,

            controller: function ($scope, $state, $window) {

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
                        $window.history.back();
                        $scope.$apply();
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
