var myApp = angular.module('myApp', ['ui.router']);

myApp.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
});

myApp.config(function ($stateProvider, $urlRouterProvider) {
   $urlRouterProvider.otherwise('/home');
   // $stateProvider.state();
});

myApp.controller('myListCtrl', ['$scope', '$http', function ($scope, $http) {
  
  var refreshProjects = function () {
    $http.get('/projects').success(function (response) {
      $scope.projects = response;
      $scope.viewprojects = $scope.projects;
      $scope.openprojects = $scope.projects.filter(function (projects) {
        return projects.status === 'Open';
      });
    });
  };
  $scope.viewAllProjects = function () {
    $scope.viewprojects = $scope.projects;
  };
  $scope.viewOpenProjects = function () {
    $scope.viewprojects = $scope.openprojects;
  };
  $scope.toggleNewProjectForm = function () {
    $scope.showNewProjectForm = $scope.showNewProjectForm === false ? true : false;
  };
  $scope.addProject = function () {
    var newProject = $scope.project;
    $scope.project = '';
    $scope.showNewProjectForm = false;
    $http.post('/projects', newProject).success(function (response) {
      refreshProjects();
    });
  };
  
  // initialize home page
  refreshProjects();
  $scope.viewAllProjects();
  $scope.showNewProjectForm = false;
  
}]);