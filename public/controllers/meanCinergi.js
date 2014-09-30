'use strict';

angular.module('mean.mean-cinergi').controller('MeanCinergiController', ['$scope', 'Global', 'MeanCinergi',
  function($scope, Global, MeanCinergi) {
    $scope.global = Global;
    $scope.package = {
      name: 'mean-cinergi'
    };
  }
]);
