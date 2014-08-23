(function () {

  function barController(scope) {

    this.hideShowCompleted = function() {
      scope.taskAppState.hideCompleted = !scope.taskAppState.hideCompleted;
    };

    this.clearLog = function() {
      scope.$emit('taskAppEvent','logEvent:clearLog', 'Clear The Log!!!');
    };
  }

  angular.module('taskApp')
    .controller('barController', ['$scope', barController])

}());