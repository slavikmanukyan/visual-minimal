/**
 * Created by Slavik on 10/12/2015.
 */
'use strict';

angular.module('min.cluskey', ['ngRoute','min.services'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/cluskey', {
            templateUrl: 'views/cluskey/cluskey.html',
            controller: 'cluskeyCtrl'
        });
    }])

    .controller('cluskeyCtrl', ['$scope','minimal',function($scope,minimal) {
        $scope.$watchGroup(['n','func.length'],function(newG){
            $scope.minimal=[];
        });
        $scope.solve=function(func,n){
            $scope.minimal=minimal.matrixlike.getMinimal(func,n,'cluskey');
            $scope.groups=minimal.matrixlike.cluskey.groups;
            $scope.kvayn=minimal.matrixlike.cluskey.kvayn;
            $scope.matrix=minimal.matrixlike.cluskey.matrix;
            $scope.stars=minimal.matrixlike.cluskey.stars;
        }
    }]);