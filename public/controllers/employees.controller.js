angular.module('myApp')
	.controller('employeesCtrl', ['$scope', 'adminData',
	 function($scope, adminData){
	 	$scope.allEmps = {};

		adminData.getAllEmployees()
			.success(function(data){
				$scope.allEmps = data;
			})
			.error(function (e) {
			    console.log(e);
			    console.log("you are not authorized to look into this page");
			});

		
	}]);