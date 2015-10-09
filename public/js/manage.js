var manageApp = angular.module('manageApp', ['ngAnimate']);

manageApp.controller('manageCtrl', function ($http) {
  
  var manageList = this;
  
  manageList.refreshProjects = function() {
    $http.get('/projects').success(function (response) {
      manageList.projects = response;
      manageList.viewprojects = response;
      manageList.openprojects = manageList.projects.filter(function (projects) {
        return projects.status === 'Open';
      });
    });
  };
  manageList.viewAllProjects = function () {
    manageList.viewprojects = manageList.projects;
  };
  manageList.viewOpenProjects = function () {
    manageList.viewprojects = manageList.openprojects;
  };
  manageList.showNewProjectForm = false;
  manageList.toggleNewProjectForm = function () {
    manageList.showNewProjectForm === true ? manageList.showNewProjectForm = false : manageList.showNewProjectForm = true;
  };
  manageList.addProject = function () {
    manageList.toggleNewProjectForm();
    manageList.projects.push({ title: manageList.newProject.title, status: manageList.newProject.status });
    $http.post('/projects', manageList.newProject).success(function (response) {
      manageList.refreshProjects();
      manageList.newProject.title = '';
      manageList.newProject.status = '';
    });
  };
  
  // initialize home page
  manageList.refreshProjects();
  manageList.viewAllProjects();
  
});