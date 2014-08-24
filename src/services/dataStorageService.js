
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