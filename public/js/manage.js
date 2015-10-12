var manageApp = angular.module('manageApp', ['ui.router', 'ngAnimate']);

manageApp.config(function ($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise('/projects');
  
  $stateProvider.state('projects', {
    url: '/projects',
    templateUrl: 'templates/home.html'
  });
  
  $stateProvider.state('page2', {
    url: '/page2',
    templateUrl: 'templates/page2.html'
  });
  
  $stateProvider.state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html'
  });
  
});

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
  
  manageList.getUser = function () {
    manageList.user = user;
    // $http.get('/user').success(function (response) {
    //   manageList.user = response;
    // });
  };
  
  manageList.refreshProjects = function () {
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
  // manageList.getUser();
  
});