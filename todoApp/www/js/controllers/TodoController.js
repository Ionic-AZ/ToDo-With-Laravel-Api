	angular
		.module('todoApp')
		.controller('ToDoController', ToDoController);

	ToDoController.$inject = ['$scope', 'Projects', '$ionicModal'];
	function ToDoController($scope, Projects, $ionicModal) {
		
		// Create our modal
		$ionicModal.fromTemplateUrl('templates/new-task.html', function(modal) {
			$scope.taskModal = modal;
		}, {
			scope: $scope
		});

		$scope.newTask = function () {
			console.log('ToDoController.newTask');
			$scope.taskModal.show();
		};
	
		$scope.closeNewTask = function () {
			console.log('ToDoController.closeNewTask');
			$scope.taskModal.hide();
		}
		
		$scope.createTask = function (task) {
			console.log('TodoController.createTask');		
			if (!$scope.activeProject || !task) {
				return;
			}
			
			Projects.newTask(task.title, $scope.activeProject).then(function (newTask) {
				console.log('toDoController.newTask', newTask);
				$scope.tasks.push(newTask);
			})
			.finally(function () {
				$scope.taskModal.hide();			
			});
		}
	}