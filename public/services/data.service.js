angular.module('myApp')
	.service('meanData', ['$http', 'authentication', 
		function($http, authentication){
		   var getProfile = function () {
	      		return $http.get('/api/profile', {
	        	headers: {
	            Authorization: 'Bearer '+ authentication.getToken()
        	}
      	});
    };

    var afterUpdateProfile = function(){
    	return $http.get('/api/reset/:ptoken', {
    			headers: {
	            Authorization: 'Bearer '+ authentication.getToken()
        	}
    	});
    };

    return {
      getProfile : getProfile,
      afterUpdateProfile: afterUpdateProfile
    };

	}]);