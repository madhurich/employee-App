angular.module('myApp')
	.controller('welcomeCtrl', ['$scope', '$location', 'meanData', '$http', '$rootScope', 'authentication',
		function($scope, $location, meanData, $http, $rootScope, authentication){
			$scope.employee = {};

			$scope.afterUpdateEmployee = {};

			meanData.getProfile()
			      .success(function(data) {
			        $scope.employee = data;
			      })
			      .error(function (e) {
			        console.log(e);
			      });

			/*meanData.afterUpdateProfile()
			      .success(function(data) {
			        $scope.afterUpdateEmployee = data;
			      })
			      .error(function (e) {
			        console.log(e);
			      });*/
      


			$rootScope.deleteEmployee = function(id){
        		alert('deleteEmployee'+ id);
        		confirm('Are you sure ?');
        		
            	$http.delete('/api/employee/'+id, {headers: {
	            Authorization: 'Bearer '+ authentication.getToken()
        	}}).success(function(data){
            	console.log(data);
        	});

        $location.path('/get-employees');
      } ;     

		
	}]);