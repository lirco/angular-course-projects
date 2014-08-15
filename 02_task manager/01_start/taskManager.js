/**
 * Flows of the app:
 *
 * 1. Add new task:
 *  ng-model on editCtrl
 *  emit on click (and clear the new task)
 *  catch on mainCtrl and add to array
 *  broadcast to logCtrl
 *  catch on logCtrl and add line to log
 *
 * 2. Edit existing task:
 *  click on listCtrl emits with task data + action=edit
 *  catch data on mainCtrl
 *  broadcast with data to editCtrl
 *  user changes
 *  click on add emits new data by ediCtrl
 *  catch on mainCtrl
 *  replace task in array by id of the task
 *  broadcast to logCtrl
 *  catch on logCtrl and add line to log
 *
 * 3. Delete task:
 *  click on listCtrl emits with task data + action=delete
 *  catch data on mainCtrl
 *  delete task from array by id of the task
 *  broadcast to logCtrl
 *  catch on logCtrl and add line to log
 *
 * 4. Mark task as done:
 *  click on listCtrl emits with task data + action=done
 *  catch data on mainCtrl
 *  mainCtrl changes task 'done' flag to true
 *  mainCtrl adds the task to done array (not so efficient to open a new array - resolve later)
 *  broadcast to logCtrl
 *  catch on logCtrl and add line to log
 *
 *
 */


( function () {

  function mainController(scope) {

    this.tasks = {};

    // I don't like counters.
    // Find out if there's a way to do this more elegant
    this.tasksCount = 0;

    function task() {
      this.id =  '';
      //this.active = false;
      this.title = '';
      this.description = '';
      this.done = false;
    }

    var self = this;

    scope.$on('addNewTask', function(evt, newTask) {

      var taskToAdd = new task;
      taskToAdd.id = self.tasksCount;
      taskToAdd.title = newTask.title;
      taskToAdd.description = newTask.description;
      self.tasks[taskToAdd.id] = taskToAdd;
      self.tasksCount ++;

      scope.$broadcast('newTaskAdded', '');
    });

    this.removeTask = function(id) {
      delete this.tasks[id];

      scope.$broadcast('taskDeleted', '');
    };

    scope.$on('editTaskFromTableToMain', function(evt, task) {
      scope.$broadcast('editTaskFromMainToEditor', task);
    })

  }

  function logController(scope) {

    this.logList = [];

    var self = this;

    scope.$on('newTaskAdded', function(ent, data) {
      var date = new Date();
      self.logList.push(date + ' New Task Added');
    });

    scope.$on('taskDeleted', function(ent, data) {
      var date = new Date();
      self.logList.push(date + ' Task Deleted');
    });
  }

  function tableController(scope) {

    this.editTask = function(task) {
      scope.$emit('editTaskFromTableToMain', task);
    }
  }

  function editController(scope) {

    this.addNewTask = function() {
      scope.$emit('addNewTask', this.newTask);
    };

    scope.$on('editTaskFromMainToEditor', function(ent, task) {
      console.log(task)
      /**
       * NEED TO GO ON FROM HERE.
       * SHOW THIS TASK ON THE EDITOR
       */
    })
  }


  angular.module('taskApp',[])
    .controller('mainController', ['$scope', mainController])
    .controller('logController', ['$scope', logController])
    .controller('tableController', ['$scope', tableController])
    .controller('editController', ['$scope', editController])





}());