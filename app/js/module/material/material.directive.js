'use strict';
angular
    .module('apps.material', [])
    .directive('elemReady', function( $parse ) {
        return {
            restrict: 'A',
            link: function( $scope, elem, attrs ) {    
               elem.ready(function(){
                 $scope.$apply(function(){
                     var func = $parse(attrs.elemReady);
                     func($scope);
                 })
               })
            }
         }
     });