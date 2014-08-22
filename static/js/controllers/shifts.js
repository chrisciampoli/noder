angular.module('myApp', ['inline-edit']).controller('shiftsCtrl',
['$scope', '$http', function($scope, $http) {
	$http.get('/shifts/getShifts')
		.success(function(data, status, headers, config) {
			$scope.locations = data;
			$scope.error = "";
		}).
		error(function(data, status, headers, config) {
			$scope.locations = {};
			$scope.error = data;
			
		});
}]);