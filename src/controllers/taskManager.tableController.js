( function () {

  function tableController(scope, dataStorage) {

    this.editTask = function(task) {
      //this is a temporary walk-around
      scope.taskAppState.taskToUpdate = {description: task.description, done: task.done, title: task.title};
      scope.taskAppState.activeTask = scope.taskAppState.tasks[scope.taskAppState.tasks.indexOf(task)];
    };

    this.removeTask = function(task) {
      scope.taskAppState.tasks.splice(scope.taskAppState.tasks.indexOf(task), 1);
      dataStorage.remove('tasks', task);
      scope.$emit('taskAppEvent', 'logEvent:userAction', 'Task Deleted!');
    };

    this.taskDone = function(task) {
      scope.taskAppState.tasks[scope.taskAppState.tasks.indexOf(task)].done =
      !scope.taskAppState.tasks[scope.taskAppState.tasks.indexOf(task)].done;
      if (scope.taskAppState.tasks[scope.taskAppState.tasks.indexOf(task)].done) {
        scope.$emit('taskAppEvent', 'logEvent:userAction', 'Task Done!');
      }
    };

  }


  angular.module('taskApp')
    .controller('tableController', ['$scope', 'dataStorageService', tableController])

}());