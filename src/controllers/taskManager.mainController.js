
( function () {

  function mainController(scope) {

    scope.taskAppState = {
      'tasks': [],
      'activeTask': {},
      'taskToUpdate': {},
      'hideCompleted': false   
    };

    this.logEvent = function(evt, type, data) {
      scope.$broadcast(type, data);
    };

    scope.$on('taskAppEvent', this.logEvent);

  }

  angular.module('taskApp')
    .controller('mainController', ['$scope', mainController])

}());