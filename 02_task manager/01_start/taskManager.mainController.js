/**
 * Flows of the app:
 *
 * 1. Add new task:
 *  ng-model on editCtrl
 *  on click, only title and description emitted by editCtrl
 *  catch the title and description of new task on mainCtrl
 *  create new task object with rest of params
 *  broadcast to logCtrl
 *  catch on logCtrl and add line to log
 *
 * 2. Edit existing task:
 *  click on tableCtrl emits with task data with task.type=edit
 *  catch data on mainCtrl
 *  broadcast with data to editCtrl
 *  user changes
 *  click on add emits new data by ediCtrl
 *  catch on mainCtrl
 *  replace task in Tasks object list by id of the task
 *  broadcast to logCtrl
 *  catch on logCtrl and add line to log
 *
 * 3. Delete task:
 *  click invokes function that emits deleteTask with task id
 *  catch on mainCtrl
 *  delete task from array by id of the task
 *  broadcast to logCtrl
 *  catch on logCtrl and add line to log
 *
 * 4. Mark task as done:
 *  click on tableCtrl checkbox invokes function
 *  this function changes task.done state and broadcast to log
 *  .done property of the task changes the ng-class mode
 *
 * 5. Show/Hide all done tasks:
 *  click on the button changes the T/F flag on mainCtrl scope
 *  a $watch catches the change on this flag
 *  each change a for loop changes the showMe property of done tasks only
 *  ng-hide hides these done tasks
 *
 * 6. Clear log:
 * on click mainController $broadcast to logController
 * logController catches abd deletes the array content
 */


( function () {

  function mainController(scope) {

    this.tasks = {};

    //helps defining the id of a task
    this.tasksCount = 0;

    //flag for invoking the showHide function
    this.hideCompleted = false;

    // Task model object
    function Task() {
      this.id =  '';
      this.type = 'new';
      this.title = '';
      this.description = '';
      this.done = false;
      this.hideMe = false;
    }

    var self = this;

    // receiving a new task to add
    // Creates a new instance of Task (with type=new),
    // Creating a new id for the task (with the tasks counter),
    // filling data into task to add and adding to list of tasks
    scope.$on('addNewTask', function(evt, newTask) {

      var taskToAdd = new Task;
      taskToAdd.id = self.tasksCount;
      taskToAdd.title = newTask.title;
      taskToAdd.description = newTask.description;
      self.tasks[taskToAdd.id] = taskToAdd;
      self.tasksCount ++;

      scope.$broadcast('newTaskAdded', '');
    });

    // Removing a task by it's id.
    this.removeTask = function(id) {
      delete this.tasks[id];

      scope.$broadcast('taskDeleted', '');
    };

    // Editing a task - Before user changes
    // receive event from the table, with task.type=edit
    scope.$on('editTaskFromTableToMain', function(evt, task) {
      scope.$broadcast('editTaskFromMainToEditor', task);
    });

    // Editing a task - After user changes
    // Add to tasks list by id of the task - overwrite the original
    scope.$on('editTaskFromEditorToMain', function(evt, task) {
      self.tasks[task.id] = task;

      scope.$broadcast('taskEdited', '');
    });

    //if checkbox clicked change task.done state, and if true broadcast to log
    this.taskDone = function(task) {
      task.done = !task.done;
      if (task.done) {
        scope.$broadcast('doneTask','');
      }
    };

    //Use scope.$watch to watch the flag in order to invoke function
    this.hideShowCompleted = function() {
      this.hideCompleted = !this.hideCompleted;
    };

    scope.$watch('mainCtrl.hideCompleted', function(ShowHideflag) {
      var key;
      for (key in self.tasks) {
        if (self.tasks[key].done) {
          self.tasks[key].hideMe = ShowHideflag;
        }
      }
    });

    this.clearLog = function() {
      scope.$broadcast('clearLog','');
    }
  }

  angular.module('taskApp',[])
    .controller('mainController', ['$scope', mainController])

}());