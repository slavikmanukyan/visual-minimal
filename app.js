'use strict';

// Declare app level module which depends on views, and components
angular.module('visual-minimal', [
  'ngRoute',
  'min.indeterminate',
  'min.matrix',
  'min.cluskey',
  'min.home'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]).controller('appCtrl',function($scope,$location){
      $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
      };
    });
