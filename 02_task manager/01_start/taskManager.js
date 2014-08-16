/**
 * Flows of the app:
 *
 * 1. Add new task:
 *  ng-model on editCtrl
 *  emit on click, only title and description emitted.
 *  catch the title and desc of new task on mainCtrl, create new task object with rest of params and add to array
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
   * mainController
   *
   * @param scope
   */
  function mainController(scope) {

    this.tasks = {};

    // I don't like counters.
    // Find out if there's a way to do this more elegant
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

    //Show/hide completed - better to do it with filter...
    //USE SCOPE.WATCH - watch the flag in order to invoke this function
     scope.$watch('mainCtrl.hideCompleted', function(flag) {
      console.log('hide completed: ' + flag);
      var key;
      for (key in self.tasks) {
        self.tasks[key].hideMe = flag;
      }
    })

  }


  /**
   * logController
   *
   * @param scope
   */
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

    scope.$on('taskEdited', function(ent, data) {
      var date = new Date();
      self.logList.push(date + ' Task Edited');
    });
  }


  /**
   * tableController
   *
   * @param scope
   */
  function tableController(scope) {

    this.editTask = function(task) {
      task.type = 'edit';
      scope.$emit('editTaskFromTableToMain', task);
    }
  }


  /**
   * editController
   * @param scope
   */
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
      console.log(task);
      self.newTask = task;

    })
  }

  /**
   * defining the App
   */
  angular.module('taskApp',[])
    .controller('mainController', ['$scope', mainController])
    .controller('logController', ['$scope', logController])
    .controller('tableController', ['$scope', tableController])
    .controller('editController', ['$scope', editController])





}());