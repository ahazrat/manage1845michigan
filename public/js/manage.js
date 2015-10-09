angular.module('manageApp', ['ngAnimate'])
  .controller('manageCtrl', function ($http) {
    
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
    
    // initialize home page
    manageList.refreshProjects();
    manageList.viewAllProjects();
    
    manageList.toggle = false;
    
    manageList.list=[
      { name: "Asif", age: 27 },
      { name: "Tuba", age: 27 },
      { name: "Shiraz", age: 26 },
      { name: "Rizwan", age: 27 },
      { name: "Mustafa", age: 31 }
    ];
    
    manageList.addPerson = function () {
      manageList.list.push({ name: manageList.name, age: manageList.age });
      manageList.name ='';
      manageList.age = '';
    };
    
  });