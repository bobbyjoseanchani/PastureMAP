'use strict';

// Declare app level module which depends on views, and components
angular.module('paddockApp', [
  'ngRoute',
  'paddockApp.createPaddock'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/createPaddock'});
}]);