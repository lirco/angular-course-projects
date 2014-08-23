describe('unit: Task bar Controller', function() {

  var ctrl;
  var scope;

  beforeEach(module('taskApp'));

  beforeEach(inject(function($rootScope, $controller) {

    scope = $rootScope.$new;
    ctrl = $controller('barController', {$scope: scope})

  }));

  it('Should have a hideShowCompleted method', function() {
    expect(ctrl.hideShowCompleted).toBeDefined()
    scope.taskAppState.hideCompleted = false;
    ctrl.hideShowCompleted();
    expect(scope.taskAppState.hideCompleted).toBeTruthy()


  });


});