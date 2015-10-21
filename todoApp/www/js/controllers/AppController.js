angular
	.module('todoApp')
	.controller('AppController', AppController);

AppController.$inject = ['$scope', '$ionicModal', '$ionicSideMenuDelegate', 'Projects', '$auth', '$rootScope',
	'$state', 'Auth_Events'];
function AppController($scope, $ionicModal, $ionicSideMenuDelegate, Projects, $auth, $rootScope, $state, Auth_Events) {
	// Load or initialize projects
	$scope.$on(Auth_Events.notAuthorized, function(event){
		$state.go('login');
	});
	
	$scope.$on(Auth_Events.notAuthenticated, function(event){
		$scope.logout();
	});
	
	Projects.all().then(function (data) {
		$scope.projects = data;
	})

	$ionicModal.fromTemplateUrl('templates/new-project.html', function (modal) {
		$scope.projectModal = modal;
	}, {
			scope: $scope
		});

	$scope.showProjectModal = function () {
		$scope.projectModal.show();
	}

	$scope.closeNewProject = function () {
		$scope.projectModal.hide();
	}

	$scope.newProject = function (project) {
		var projectTitle = project.title;
		if (projectTitle) {
			Projects.newProject(projectTitle).then(function (newProject) {
				$scope.projects.push(newProject);
				project.title = '';

				$scope.selectProject(newProject);
			}).finally(function () {
				$scope.closeNewProject();
				$ionicSideMenuDelegate.toggleLeft();
			});

		}
	}

	$scope.selectProject = function (project) {
		console.log('AppController.selectProject');
		console.log(project);
		$scope.activeProject = project;
		console.log('active project', $scope.activeProject);
		Projects.getTasks($scope.activeProject).then(function (tasks) {
			$scope.tasks = tasks;
		});
		$ionicSideMenuDelegate.toggleLeft();
	}
	
	$scope.logout = function () {
		console.log('AppController.logout');
        $auth.logout().then(function () {
            $state.go('login');			
        });
    }
}