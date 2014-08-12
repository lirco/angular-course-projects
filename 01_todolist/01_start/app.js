( function () {
  function taskManager() {
    this.tasks = [
      { "title": "learn angular!", "description": "start from scratch, build your skills" },
      { "title": "play with controllers!", "description": "make sure to understand whats going on"},
      { "title": "try bootstrap", "description": "prototype a gui is easy"}
    ];
    this.addTask = function(newTask) {
      this.tasks.push(newTask)
    }
  }
  angular.module('myApp',[])
    .controller('taskController',taskManager);
}());