'use strict';

angular.module('min.matrix', ['ngRoute','min.services'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/matrix', {
    templateUrl: 'views/matrix/matrix.html',
    controller: 'matrixCtrl'
  });
}])

.controller('matrixCtrl', ['$scope','minimal',function($scope,minimal) {
      $scope.$watchGroup(['n','func.length'],function(newG){
        $scope.minimal=[];
        $scope.groups=[];
        $scope.matrix=[];
      });
      $scope.solve=function(func,n){
        $scope.minimal=minimal.matrixlike.getMinimal(func,n,'kvayn');
        $scope.groups=minimal.matrixlike.matrix.groups;
        if($scope.groups[0].length) $scope.groups.push([]);
        $scope.kvayn=minimal.matrixlike.matrix.kvayn;
        $scope.kvayns=minimal.matrixlike.matrix.kvayns;
        $scope.matrix=minimal.matrixlike.matrix.matrix;
      }
}]);