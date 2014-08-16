( function () {

  function tableController(scope) {

    this.editTask = function(task) {
      task.type = 'edit';
      scope.$emit('editTaskFromTableToMain', task);
    }
  }

  angular.module('taskApp')
    .controller('tableController', ['$scope', tableController])

}());