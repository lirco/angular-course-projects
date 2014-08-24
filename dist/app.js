(function () {
  angular.module('taskApp', [])
}());
(function () {

  function formController(scope, dataStorage) {

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
      } else {
        scope.$emit('taskAppEvent', 'logEvent:userAction', 'Task has been updated');
        dataStorage.update('tasks', scope.taskAppState.taskToUpdate, newTask)
      }
      scope.taskAppState.activeTask = {};
    };

  }

  angular.module('taskApp')
    .controller('formController', ['$scope', 'dataStorageService', formController])

}());
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
    .controller('logController', ['$scope', 'dataStorageService', logController])


}());

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
( function () {

  function tableController(scope, dataStorage) {

    this.editTask = function(task) {
      scope.taskAppState.taskToUpdate = task;
      scope.taskAppState.activeTask = scope.taskAppState.tasks[scope.taskAppState.tasks.indexOf(task)];
    };

    this.removeTask = function(task) {
      scope.taskAppState.tasks.splice(scope.taskAppState.tasks.indexOf(task), 1);
      dataStorage.remove('tasks', task);
      scope.$emit('taskAppEvent', 'logEvent:userAction', 'Task Deleted!');
    };

    this.taskDone = function(task) {
      scope.taskAppState.tasks[scope.taskAppState.tasks.indexOf(task)].done =
      !scope.taskAppState.tasks[scope.taskAppState.tasks.indexOf(task)].done;
      if (scope.taskAppState.tasks[scope.taskAppState.tasks.indexOf(task)].done) {
        scope.$emit('taskAppEvent', 'logEvent:userAction', 'Task Done!');
      }
    };

  }


  angular.module('taskApp')
    .controller('tableController', ['$scope', 'dataStorageService', tableController])

}());
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

(function () {

  function dataStorage() {

    //Shouldn't this be with a callback function??

    this.set = function(key, newData) {
      var data = localStorage.getItem(key);
      if (data) {
        data = JSON.parse(data);
      }
      else {
        data = [];
      }
      data.push(newData);
      data = JSON.stringify(data);
      localStorage.setItem(key, data);
    };

    this.update = function(key, oldVal, newVal) {
      var content = this.get(key);
      var index = content.indexOf(oldVal);
      content.splice(index,1,newVal);
      this.replace(key, content)
    };

    this.replace = function(key, newVal) {
      localStorage.removeItem(key);
      localStorage.setItem(key, JSON.stringify(newVal));
    };

    this.get = function(key) {
      return JSON.parse(localStorage.getItem(key))
    };

    this.remove = function(key, data) {
      var content = this.get(key);
      var index = content.indexOf(data);
      content.splice(index,1);
      localStorage.setItem(key, JSON.stringify(content));
    };

    this.clear = function(key) {
      localStorage.removeItem(key);
    };

  }

  angular.module('taskApp')
    .service('dataStorageService', dataStorage)

}());