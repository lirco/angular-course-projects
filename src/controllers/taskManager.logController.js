( function() {

  function logController(scope) {

    this.logList = [];

    var self = this;

    scope.$on('logEvent:userAction', function (evt, data) {
      var date = new Date();
      self.logList.unshift(date + data);
    });

    scope.$on('logEvent:clearLog', function() {
      self.logList = [];
    });
  }

  angular.module('taskApp')
    .controller('logController', ['$scope', logController])


}());