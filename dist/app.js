(function () {
  angular.module('taskApp', [])
}());
(function () {

  function formController(scope) {

    // Task model object
    function Task() {
      this.id =  '';
      this.title = '';
      this.description = '';
      this.done = false;
    }

    this.addTask = function(newTask) {
      if (newTask.title || newTask.description) {

        // add a new task
        if (!newTask.id) {

          var task = new Task();
          task.title = newTask.title;
          task.description = newTask.description;
          task.id = scope.taskAppState.tasksCount;

          scope.taskAppState.tasks[task.id] = task;
          scope.taskAppState.tasksCount ++;
          scope.taskAppState.activeTask = '';

          scope.$emit('taskAppEvent', 'logEvent:userAction', 'New Task Added!');
        }
        //edit the existing task
        else {
          scope.taskAppState.tasks[newTask.id] = newTask;
          scope.$emit('taskAppEvent', 'logEvent:userAction', 'Task Edited!');
          scope.taskAppState.activeTask = '';
        }
      }
    };
  }

  angular.module('taskApp')
    .controller('formController', ['$scope', formController])

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
      //dataStorage.set should be written with a callback function!
      self.logList = dataStorage.get('log');

    });

    scope.$on('logEvent:clearLog', function() {
      self.logList = [];
      dataStorage.remove('log');
    });
  }

  angular.module('taskApp')
    .controller('logController', ['$scope', 'dataStorageService', logController])


}());

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
( function () {

  function tableController(scope) {

    this.editTask = function(id) {
      scope.taskAppState.activeTask = scope.taskAppState.tasks[id];
    };

    this.removeTask = function(id) {
      delete scope.taskAppState.tasks[id];
      scope.$emit('taskAppEvent', 'logEvent:userAction', 'Task Deleted!');
    };

    this.taskDone = function(id) {
      scope.taskAppState.tasks[id].done = !scope.taskAppState.tasks[id].done;
      if (scope.taskAppState.tasks[id].done) {
        scope.$emit('taskAppEvent', 'logEvent:userAction', 'Task Done!');
      }
    };

  }


  angular.module('taskApp')
    .controller('tableController', ['$scope', tableController])

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

    //make this an object with key:value pairs.

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

    this.get = function(key) {
      return JSON.parse(localStorage.getItem(key))
    };

    this.remove = function(key) {
      localStorage.removeItem(key);
    };

  }

  angular.module('taskApp')
    .service('dataStorageService', dataStorage)

}());