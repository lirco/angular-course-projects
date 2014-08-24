(function () {

  function formController(scope) {

    // Task model object
    function Task() {
      this.id =  '';
      this.title = '';
      this.description = '';
      this.done = false;
    }

    this.addTask = function (task) {
      if (scope.taskAppState.tasks.indexOf(task) == -1) {
        scope.taskAppState.tasks.push({
          title: task.title,
          description: task.description,
          done: false
        });
        scope.$emit('taskAppEvent', 'logEvent:userAction', 'New Task Added!');
      } else {
        scope.$emit('taskAppEvent', 'logEvent:userAction', 'Task has been updated');
      }
      scope.taskAppState.activeTask = {};
    };

  }

  angular.module('taskApp')
    .controller('formController', ['$scope', formController])

}());