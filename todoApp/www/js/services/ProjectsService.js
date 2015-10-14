	angular
		.module('todoApp')
		.factory('Projects', Projects);

	Projects.$inject = ['$http', '$q'];
	function Projects($http, $q) {
		var service = {
			all: all,
			save: save,
			newProject: newProject,
			getLastActiveIndex: getLastActiveIndex,
			setLastActiveIndex: setLastActiveIndex,
			deleteProject: deleteProject,
			getTasks: getTasks,
			newTask: newTask
		};
		
		var globalProjects = [];
		var baseUrl = "http://localhost:8000/api";
		
		return service;

		////////////////
		function all() {
			console.log("Projects.all");
			// var projectString = window.localStorage['projects'];
			var url = baseUrl + '/projects';
			console.log(url);
			return $http.get(baseUrl + '/projects').then(function (response) {
				//angular.forEach(response.data.projects, function (data) {
					//globalProjects.push(data);
				//})
				globalProjects = response.data.projects;
				return globalProjects;	
			})
			// if (projectString) {
			// 	globalProjects = angular.fromJson(projectString); 				
			// }
		}
		
		function deleteProject(project) {
			console.log("Projects.deleteProject");
			console.log(globalProjects);
			console.log(project);
			var index = globalProjects.indexOf(project);
			globalProjects.splice(index, 1);
			save(globalProjects);
			
			var currentIndex = getLastActiveIndex();

			if (index == currentIndex && currentIndex == globalProjects.length){
				setLastActiveIndex(index - 1);	
			}
			else if (index < currentIndex)
			{
				setLastActiveIndex(currentIndex - 1);
			}
			else {
				setLastActiveIndex(index);	
			}
		}


		function save(projects) {
			console.log("Projects.save");
      		window.localStorage['projects'] = angular.toJson(projects);
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
			// Add a new project
			// return {
			// 	title: projectTitle,
			// 	tasks: []
			// };
		}
		
		function getLastActiveIndex() {
			console.log("Projects.getLastActiveIndex");
			return parseInt(window.localStorage['lastActiveProject']) || 0;
		}
		
		function setLastActiveIndex(index) {
			console.log("Projects.setLastActiveIndex");
			window.localStorage['lastActiveProject'] = index;			
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