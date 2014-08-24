( function() {

  function logController(scope, dataStorage) {

    this.logList = [];

    var self = this;

    scope.$on('logEvent:userAction', function (evt, data) {
      var date = new Date();
      data = date + data;
      dataStorage.set('log', data);

      //isn't there an async problem here?
      self.logList = dataStorage.get('log');

    });

    scope.$on('logEvent:clearLog', function() {
      self.logList = [];
      dataStorage.clear('log');
    });
  }

  angular.module('taskApp')
    .controller('logController', ['$scope', 'DataStorageService', logController])


}());