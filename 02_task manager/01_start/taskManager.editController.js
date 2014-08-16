(function () {

  function editController(scope) {

    var self = this;

    // If there is no type for the task, it means that it is a new one.
    // That's because newTask only contains title and description before it goes through main controller,
    // where the full task with ID and other flags is created and inserted into tasks object
    this.addTask = function() {
      if (!this.newTask.type) {
        scope.$emit('addNewTask', this.newTask);
        this.newTask = '';
      }
      else {
        scope.$emit('editTaskFromEditorToMain', this.newTask);
        this.newTask = '';
      }
    };

    scope.$on('editTaskFromMainToEditor', function(ent, task) {
      self.newTask = task;

    })
  }

  angular.module('taskApp')
    .controller('editController', ['$scope', editController])

}());