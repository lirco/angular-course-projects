(function () {

  function formController(scope) {

    // Task model object
    function Task() {
      this.id =  '';
      this.title = '';
      this.description = '';
      this.done = false;
    }

    this.addTask = function(newTask) {
      if (newTask.title || newTask.description) {

        // add a new task
        if (!newTask.id) {

          var task = new Task();
          task.title = newTask.title;
          task.description = newTask.description;
          task.id = scope.taskAppState.tasksCount;

          scope.taskAppState.tasks[task.id] = task;
          scope.taskAppState.tasksCount ++;
          scope.taskAppState.activeTask = '';

          scope.$emit('taskAppEvent', 'logEvent:userAction', 'New Task Added!');
        }
        //edit the existing task
        else {
          scope.taskAppState.tasks[newTask.id] = newTask;
          scope.$emit('taskAppEvent', 'logEvent:userAction', 'Task Edited!');
          scope.taskAppState.activeTask = '';
        }
      }
    };
  }

  angular.module('taskApp')
    .controller('formController', ['$scope', formController])

}());