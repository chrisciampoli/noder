angular.module('myApp', []).
	controller('myController',
['$scope', '$http', function($scope, $http) {
	$http.get('/user/profile')
		.success(function(data, status, headers, config) {
			$scope.user = data;
			$scope.error = "";
		}).
		error(function(data, status, headers, config) {
			$scope.user = {};
			$scope.error = data;
		});
}]).controller('locationsCtrl',
['$scope', '$http', function($scope, $http) {
	$http.get('/locations/getLocations')
		.success(function(data, status, headers, config) {
			$scope.locations = data;
			$scope.error = "";
		}).
		error(function(data, status, headers, config) {
			$scope.locations = {};
			$scope.error = data;
			
		});
	$scope.remove = function(location) {
		$http.post('/locations/delete', location)
		.success(function(data, status, headers, config) {
			$http.get('/locations/getLocations')
				.success(function(data, status, headers, config) {
					$scope.locations = data;
					$scope.error = "";
				}).
				error(function(data, status, headers, config) {
					$scope.locations = {};
					$scope.error = data;
					
				});
		})
		.error(function(data, status, headers, config) {

		});
	};
}]);
