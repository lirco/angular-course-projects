( function () {

  function tableController(scope, dataStorage) {

    this.editTask = function(task) {
      scope.taskAppState.taskToUpdate = task;
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