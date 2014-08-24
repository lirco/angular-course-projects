
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

    this.update = function(key, oldVal, newVal) {
      var content = this.get(key);
      var index = content.indexOf(oldVal);
      content.splice(index,1,newVal);
      this.replace(key, content)

    };

    this.replace = function(key, newVal) {
      localStorage.removeItem(key);
      localStorage.setItem(key, JSON.stringify(newVal));
    };

    this.get = function(key) {
      return JSON.parse(localStorage.getItem(key))
    };

    this.remove = function(key, data) {
      var content = this.get(key);
      var index = content.indexOf(data);
      console.log(index);
      content.splice(index,1);
      localStorage.setItem(key, JSON.stringify(content));
    };

    this.clear = function(key) {
      localStorage.removeItem(key);
    };

    this.updateStr = function(key, newData) {
      localStorage.setItem(key, newData);
    };


  }

  angular.module('taskApp')
    .service('dataStorageService', dataStorage)

}());