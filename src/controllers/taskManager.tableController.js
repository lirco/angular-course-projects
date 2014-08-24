( function () {

  function tableController(scope, dataStorage, log) {

    this.editTask = function(task) {
      scope.taskAppState.taskToUpdate = task;
      scope.taskAppState.activeTask = scope.taskAppState.tasks[scope.taskAppState.tasks.indexOf(task)];
      log.debug('Debug on Edit!');
    };

    this.removeTask = function(task) {
      scope.taskAppState.tasks.splice(scope.taskAppState.tasks.indexOf(task), 1);
      dataStorage.remove('tasks', task);
      scope.$emit('taskAppEvent', 'logEvent:userAction', 'Task Deleted!');
      log.debug('Debug on Delete!');
    };

    this.taskDone = function(task) {
      scope.taskAppState.tasks[scope.taskAppState.tasks.indexOf(task)].done =
      !scope.taskAppState.tasks[scope.taskAppState.tasks.indexOf(task)].done;
      if (scope.taskAppState.tasks[scope.taskAppState.tasks.indexOf(task)].done) {
        scope.$emit('taskAppEvent', 'logEvent:userAction', 'Task Done!');
        log.debug('Debug on Done!');
      }
    };

  }


  angular.module('taskApp')
    .controller('tableController', ['$scope', 'dataStorageService', '$log', tableController])

}());