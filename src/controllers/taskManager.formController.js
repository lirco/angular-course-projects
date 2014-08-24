(function () {

  function formController(scope, dataStorage, log) {

    this.addTask = function (task) {
      var newTask = {
        title: task.title,
        description: task.description,
        done: false
      };
      if (scope.taskAppState.tasks.indexOf(task) == -1) {
        scope.taskAppState.tasks.push(newTask);
        dataStorage.set('tasks', newTask);
        scope.$emit('taskAppEvent', 'logEvent:userAction', 'New Task Added!');
        log.debug('Debug on new Task Added!')
      } else {
        dataStorage.update('tasks', scope.taskAppState.taskToUpdate, newTask);
        scope.$emit('taskAppEvent', 'logEvent:userAction', 'Task has been updated');
        log.debug('Debug on Task Updated!')
      }
      scope.taskAppState.activeTask = {};
    };

  }

  angular.module('taskApp')
    .controller('formController', ['$scope', 'dataStorageService', '$log', formController])

}());