( function() {

  function logController(scope) {

    this.logList = [];

    var self = this;

    scope.$on('newTaskAdded', function(ent, data) {
      var date = new Date();
      self.logList.unshift(date + ' New Task Added');
    });

    scope.$on('taskDeleted', function(ent, data) {
      var date = new Date();
      self.logList.unshift(date + ' Task Deleted');
    });

    scope.$on('taskEdited', function(ent, data) {
      var date = new Date();
      self.logList.unshift(date + ' Task Edited');
    });

    scope.$on('doneTask', function(ent, data) {
      var date = new Date();
      self.logList.unshift(date + ' Task Done');
    });

    scope.$on('clearLog', function(ent, data) {
      self.logList = [];
    });
  }

  angular.module('taskApp')
    .controller('logController', ['$scope', logController])


}());