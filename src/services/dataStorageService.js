(function () {

  function dataStorage() {

    //Shouldn't this be with a callback function??
    this.set = function(key, data) {
      localStorage.setItem(key, data);
    };

    this.get = function(key) {
      localStorage.getItem(key);
    };

    this.remove = function(key) {
      localStorage.removeItem(key);
    };

    this.replace = function (key, data) {
      localStorage[key] = data;
    }

  }

  angular.module('taskApp')
    .service('dataStorage', dataStorage)

}());