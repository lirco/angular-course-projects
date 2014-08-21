( function () {

  function tableController(scope) {

    this.editTask = function(id) {
      scope.taskAppState.activeTask = scope.taskAppState.tasks[id];
    };

    this.removeTask = function(id) {
      delete scope.taskAppState.tasks[id];
      scope.$emit('taskAppEvent', 'logEvent:userAction', 'Task Deleted!');
    };

    this.taskDone = function(id) {
      scope.taskAppState.tasks[id].done = !scope.taskAppState.tasks[id].done;
      if (scope.taskAppState.tasks[id].done) {
        scope.$emit('taskAppEvent', 'logEvent:userAction', 'Task Done!');
      }
    };

  }


  angular.module('taskApp')
    .controller('tableController', ['$scope', tableController])

}());