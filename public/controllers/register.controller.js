angular.module('myApp')
	.controller('registerCtrl', ['$scope', '$location', 'authentication',
	 function($scope, $location, authentication){
	 	$scope.here = "iam here";
	 	$scope.onRegister = function(){
	 		alert('register function');
	 		if($scope.password === $scope.confirmPassword){
	 			var credentials = {
	 			name: $scope.name,
	 			email: $scope.email,
	 			password: $scope.password
	 		};
	 			console.log(credentials);

	 		authentication
	 			.register(credentials)
	 			.error(function(err){
	 				alert(err);
	 			})
	 			.then(function(){
	 				$location.path('/profile');
	 			});

	 		}else{
	 			$scope.message = 'passwords dint match';
	 			$scope.password = "";
	 			$scope.confirmPassword = "";
	 		}
	 		
	 	
	 	};
		
	}]);