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
				Projects.newProject(projectTitle).then(function (response) {
					$scope.projects.push(response);
					//				Projects.save($scope.projects);
					
					project.title = '';

					$scope.activeProject = response;
					Projects.setLastActiveIndex(response.id);

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
			Projects.setLastActiveIndex(project.id);
			$ionicSideMenuDelegate.toggleLeft();
		}
	}