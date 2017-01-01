angular.module('myApp')
	.service('adminData', ['$http', 'authentication', 
		function($http, authentication){
		   var getAllEmployees = function () {
	      		return $http.get('/api/employees', {
	        	headers: {
	            Authorization: 'Bearer '+ authentication.getToken()
        	}
      	});
    };

    return {
      getAllEmployees : getAllEmployees
    };

	}]);