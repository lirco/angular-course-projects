( function () {
  function taskManager() {
      this.tasks = [
          {
              "title": "learn angular!",
              "description": "start from scratch, build your skills"
          },
          {
              "title": "play with controllers!",
              "description": "make sure to understand whats going on"
          },
          {
              "title": "try bootstrap",
              "description": "prototype a gui is easy"
          }
      ];
    this.addTask = function() {
      if (this.newTask) {
        this.tasks.push(this.newTask)
        this.newTask = '';
      }
    }
  }
  angular.module('myApp',[])
    .controller('taskController',taskManager);
}());