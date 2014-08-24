//(function () {
//
//  function loadFactory(dataStorage, window) {
//
//    this.load = function() {
//      if (window) {
//        this.tasksList = dataStorage.get('tasks');
//        this.logList = dataStorage.get('log');
//      }
//    }
//
//  }
//
//  angular.module('taskApp')
//    .factory('loadFactory', 'dataStorageService', '$window', loadFactory)
//
//}());