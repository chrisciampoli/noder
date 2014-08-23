/**
 * @name Inline Edit
 * @desc inline editing for table cells 
 */
var app = angular.module('swiftApp');

app.directive('inlineEdit', function() {
	'use strict';
    return function(scope, element) {
        element.bind('click', function(){
            var id = element.attr('id');
            element.toggleClass('inactive');
            if(element.hasClass('inactive')){
                element.blur();
                switch(id) {
                    case 'location':
                        scope.$parent.save(scope.location);
                    break;
                    case 'shift':
                        scope.$parent.shiftsCtrl.save(scope.shift);
                    break;
                    default:

                }
            }
        });
    };

});