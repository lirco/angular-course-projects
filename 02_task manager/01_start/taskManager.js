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

  /**
   * mainController is responsible of:
   * 1. Holding the array of tasks
   * 2. Holding the model for a single task (which is active)
   * 3. Adding a new task OR Changing data of existing task - on emit from taskEditController
   * 4.
   *
   * @param scope
   */
  function mainController(scope) {

    this.Tasks = [];

    this.Task = {
      "id": '',
      "active": false,
      "title": '',
      "description": '',
      "done": false
    };

    this.addTask = function() {
      //scope.on('addTask', )

    }
  }

  /**
   * logController is responsible of:
   * 1. Adding a line to the log for every new action
   * 2. Holding the scope of logs that will be shown in it's view
   *
   * @param scope
   */
  function logController(scope) {

    this.logList = [];

    this.addLogLine = function() {

      //var date = new Date();

    }
  }

  /**
   * tasksListController is responsible of:
   * 1. Holding the scope for showing the list of tasks (inherited from mainController)
   * 2. Emitting an event for editing a task to mainController
   * 3. Emitting an event for deleting a task to mainController
   * 4. Emitting an event for done task to mainController
   *
   * @param scope
   */
  function tasksListController(scope) {

  }

  /**
   * taskEditController is responsible of:
   * 1. Holding a model for newTask to be added
   * 1. Adding a new task by Emitting the event with task data to mainController
   * 2. Catching an event of broadcast from mainController on editing task with task to edit as data
   * 3. Show the task to edit in the form
   * 4.
   */


  angular.module('TaskApp',[])
    .controller('mainController', ['$scope', mainController])
    .controller('logController', ['$scope', logController])
    .controller('tasksListController', ['$scope', tasksListController]);




}());