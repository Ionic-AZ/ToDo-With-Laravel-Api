	angular
		.module('todoApp')
		.factory('Projects', Projects);

	Projects.$inject = ['$http', '$q', 'ApiEndpoint'];
	function Projects($http, $q, ApiEndpoint) {
		var service = {
			all: all,
			newProject: newProject,
			getTasks: getTasks,
			newTask: newTask
		};
		
		var globalProjects = [];
		var baseUrl = ApiEndpoint.url;
		
		return service;

		////////////////
		function all() {
			console.log("Projects.all");
			var url = baseUrl + '/projects';
			console.log(url);
			return $http.get(baseUrl + '/projects').then(function (response) {
				globalProjects = response.data.projects;
				return globalProjects;	
			})
		}

		function newProject(projectTitle) {
			console.log("Projects.newProject");
			var project = {
				name: projectTitle
			};

			var url = baseUrl + '/projects';
			return $http.post(url, project).then(function (response) {
				console.log(response);
				return response.data.project;
			});
		}
			
		function getTasks(project) {
			var url = baseUrl + '/project/' + project.id + '/tasks'
			return $http.get(url).then(function (response) {
				console.log('tasks', response);
				return response.data.tasks;
			})
			
		}
		
		function newTask(taskName, project) {
			console.log("Projects.newTask");
			var task = {
				name: taskName,
				completed: false
			};

			var url = baseUrl + '/project/' + project.id + '/tasks';
			return $http.post(url, task).then(function (response) {
				console.log(response);
				return response.data.task;
			});
		}
		
	}