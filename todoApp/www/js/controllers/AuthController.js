angular
	.module('todoApp')
	.controller('AuthController', AuthController);

AuthController.$inject = ['$scope', '$state', '$http', '$rootScope', '$auth', 'ApiEndpoint'];
function AuthController($scope, $state, $http, $rootScope, $auth, ApiEndpoint) {
	$scope.formData = {};
	$scope.newUser = {};
	$scope.loginError = false;
	$scope.loginErrorText = '';

	var baseUrl = ApiEndpoint.url;

	$scope.login = function () {
		console.log('AuthController.login');
		var credentials = {
			email: $scope.formData.email,
			password: $scope.formData.password
		}

		console.log('credentials', credentials);
		$auth.login(credentials).then(function () {

			return $http.get(baseUrl + '/authenticate/user');

		}, function (error) {
			$scope.loginError = true;
			$scope.loginErrorText = error.data.error;

		}).then(function (response) {
			console.log('response.', response);
			$scope.loginError = false;
			$scope.loginErrorText = '';

			$state.go('app.tasks');
		});
	}

	$scope.register = function () {

		console.log('register');
		console.log('newUser', $scope.newUser);
    $http.post(baseUrl + '/register', $scope.newUser)
      .success(function (data) {
        $scope.formData.email = $scope.newUser.email;
        $scope.formData.password = $scope.newUser.password;
        $scope.login();
      });

	};
};
