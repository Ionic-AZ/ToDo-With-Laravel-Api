	angular
		.module('todoApp')
		.controller('AppController', AppController);
			
	AppController.$inject = ['$scope', '$ionicModal', '$ionicSideMenuDelegate', 'Projects'];
	function AppController($scope, $ionicModal, $ionicSideMenuDelegate, Projects) {
		// Load or initialize projects
		Projects.all().then(function (data) {
			$scope.projects = data;
		})
		
		$ionicModal.fromTemplateUrl('templates/new-project.html', function(modal) {
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

					$scope.activeProject = newProject;
					
					Projects.setLastActiveIndex(newProject.id);

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
			Projects.setLastActiveIndex(project.id);
			Projects.getTasks($scope.activeProject).then(function (tasks) {
				$scope.tasks = tasks;
			});
			$ionicSideMenuDelegate.toggleLeft();
		}
	}