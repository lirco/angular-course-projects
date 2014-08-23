describe('unit: Task Main Controller', function() {

  var ctrl;
  var scope;

  beforeEach(module('taskApp'));

  beforeEach(inject(function($rootScope, $controller) {

    scope = $rootScope.$new;
    ctrl = $controller('mainController', {$scope: scope})

    //spyOn(scope, '$emit');
    //spyOn(scope, '$on');

  }));

  it('Should init a taskAppState to the scope', function() {
    expect(scope.taskAppState).toBeDefined();
    expect(scope.taskAppState.tasks).toBeDefined();
    expect(scope.taskAppState.activeTask).toBeDefined();
    expect(scope.taskAppState.tasksCount).toEqual(1);
    expect(scope.taskAppState.hideCompleted).toBeFalsy();
  });

  it('Should catch events from child scopes', function() {

    scope.$emit('task:added');
    scope.$digest(); //

    //expect(ctrl.logEvent).toBeDefined();
  });

});