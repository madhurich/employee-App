var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	//$locationProvider.html5Mode(true).hashPrefix('!');
	$routeProvider
			.when('/', {
				templateUrl: 'views/home.view.html',
				controller: 'homeCtrl'
			})
			.when('/login', {
				templateUrl: 'views/login.view.html',
				controller: 'loginCtrl'
			})
			.when('/profile', {
				templateUrl: 'views/welcome.view.html',
				controller: 'welcomeCtrl'
			})
			.when('/register', {
				templateUrl: 'views/register.view.html',
				controller: 'registerCtrl'
			})
			.when('/get-employees', {
				templateUrl: 'views/employees.view.html',
				controller: 'employeesCtrl'
			})
			.when('/update/:id', {
				templateUrl: 'views/update.view.html',
				controller: 'updateCtrl'
			})
			.when('/forgot', {
				templateUrl: 'views/forgot.view.html',
				controller: 'forgotCtrl'
			})
			.when('/api/reset/:ptoken', {
				templateUrl: 'views/reset.view.html',
				controller: 'resetCtrl'
			})
			.when('/createNewEmployee', {
				templateUrl: 'views/createNewEmployee.view.html',
				controller: 'createNewEmployeeCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});

			 // $locationProvider.html5Mode({
			 // 	enabled: true,
			 // 	requireBase: false
			 // }).hashPrefix('!');

}]);

app.run(['$rootScope', '$location', 'authentication', 
	function($rootScope, $location, authentication){
		  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      	  if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
          $location.path('/');
      }
    });

}]);