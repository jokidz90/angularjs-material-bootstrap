'use strict';

// Declare app level module which depends on views, and core components
angular.module('apps', [
  'ngRoute',
  'pascalprecht.translate',
  'ngCookies',
  'apps.material',
  
  'apps.core',
  'apps.webstorage',
  'apps.translate',
  'apps.interceptor'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

    // $routeProvider.otherwise({ redirectTo: '/orders'});
}]);
