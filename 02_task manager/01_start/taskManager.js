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

    this.tasks = [];

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
      taskToAdd.title = newTask.title;
      taskToAdd.description = newTask.description;
      self.tasks.push(taskToAdd);

      scope.$broadcast('newTaskAdded', '');
    })

  }

  function logController(scope) {

    this.logList = [];

    var self = this;

    scope.$on('newTaskAdded', function(ent, data) {

      var date = new Date();
      self.logList.push(date + ' New Task Added');
    })

  }

  function tableController(scope) {

  }

  function editController(scope) {

    this.addNewTask = function() {
      scope.$emit('addNewTask', this.newTask);
    }
  }


  angular.module('taskApp',[])
    .controller('mainController', ['$scope', mainController])
    .controller('logController', ['$scope', logController])
    .controller('tableController', ['$scope', tableController])
    .controller('editController', ['$scope', editController])





}());