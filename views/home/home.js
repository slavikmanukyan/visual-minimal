/**
 * Created by Slavik on 10/12/2015.
 */
'use strict';

angular.module('min.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'views/home/home.html',
            controller: 'homeCtrl'
        });
    }])

    .controller('homeCtrl', [function() {

    }]);