var manageApp = angular.module('manageApp', ['ngAnimate']);

manageApp.filter('unique', function () {
  return function (collection, keyname) {
    var output = [];
    var keys = [];
    
    angular.forEach(collection, function (item) {
      var key = item[keyname];
      if (keys.indexOf(key)===-1) {
        keys.push(key);
        output.push(item);
      }
    });
    
    return output;
  };
});

manageApp.controller('manageCtrl', function ($http) {
  
  var manageList = this;
  
  manageList.refreshProjects = function() {
    $http.get('/projects').success(function (response) {
      manageList.projects = response;
    });
  };
  manageList.showNewProjectForm = false;
  manageList.toggleNewProjectForm = function () {
    manageList.showNewProjectForm = manageList.showNewProjectForm === true ? false : true;
  };
  manageList.addProject = function () {
    manageList.toggleNewProjectForm();
    manageList.projects.push({ title: manageList.newProject.title, status: manageList.newProject.status });
    $http.post('/projects', manageList.newProject).success(function (response) {
      manageList.newProject.title = '';
      manageList.newProject.status = '';
    });
  };
  
  // initialize home page
  manageList.refreshProjects();
  
});