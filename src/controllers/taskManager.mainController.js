
( function () {

  function mainController(scope) {

    scope.taskAppState = {
      'tasks': {},
      'activeTask': {},
      'tasksCount': 1,
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