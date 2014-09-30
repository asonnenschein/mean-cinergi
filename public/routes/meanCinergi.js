'use strict';

angular.module('mean.mean-cinergi').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('meanCinergi example page', {
      url: '/meanCinergi/example',
      templateUrl: 'mean-cinergi/views/index.html'
    });
  }
]);
