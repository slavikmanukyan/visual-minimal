'use strict';

angular.module('min.indeterminate', ['ngRoute','min.services','min.directives'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/indeterminate', {
    templateUrl: 'views/indeterminate/indeterminate.html',
    controller: 'indCtrl'
  });

}])

.controller('indCtrl', ["$scope",'minimal',function($scope,minimal) {
 $scope.$watchGroup(['n','func.length'],function(newG){
    // console.log(newG);
     $scope.minimal=[];
    $scope.system=[];
    $scope.new_system=[];
    $scope.new_system0=[];
});

$scope.solve=function(func,n){
        $scope.minimal=minimal.indeterminate.getMinimal(func,n);
        $scope.new_system0=minimal.indeterminate.new_system0;
        $scope.new_system=minimal.indeterminate.new_system;
        $scope.system=minimal.indeterminate.system;
}

}]);