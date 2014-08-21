
( function () {

  function mainController(scope) {

    scope.taskAppState = {
      'tasks': {},
      'activeTask': {},
      'tasksCount': 1,
      'hideCompleted': false   
    };

    this.hideShowCompleted = function() {
      scope.taskAppState.hideCompleted = !scope.taskAppState.hideCompleted;
    };

    this.logEvent = function(evt, type, data) {
      scope.$broadcast(type, data);
    };

    scope.$on('taskAppEvent', this.logEvent);

    this.clearLog = function() {
      scope.$broadcast('logEvent:clearLog','');
    };

  }

  angular.module('taskApp',[])
    .controller('mainController', ['$scope', mainController])

}());