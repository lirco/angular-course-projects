
(function () {

  function dataStorage() {

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

    this.updateStr = function(key, newData) {
      localStorage.setItem(key, newData);
    };

    this.update = function(key, id, newVal) {

      var content = this.get(key);
      content[id] = newVal;
      content = JSON.stringify(content);
      localStorage.setItem(key, content);
      return content;
    };

    this.get = function(key) {
      return JSON.parse(localStorage.getItem(key))
    };

    this.remove = function(key, id) {
      var content = this.get(key);
      content.splice(id,1)


      content = JSON.stringify(content);
      localStorage.setItem(key, content);
      return content;
    };

    this.clear = function(key) {
      localStorage.removeItem(key);
    };


  }

  angular.module('taskApp')
    .service('DataStorageService', dataStorage)

}());