var meanApp = angular.module('meanApp', ['ngRoute']);


meanApp.config(function($routeProvider,$locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $routeProvider
    .when("/", {
        templateUrl : "partials/home.html",
        controller : "appCtrl"
    })
    .when("/city", {
        templateUrl : "partials/city.html",
        controller : "cityCtrl"
    })
    .when("/town", {
        templateUrl : "partials/town.html",
        controller : "townCtrl"
    })
    .when("/list", {
        templateUrl : "partials/list.html",
        controller : "listCtrl"
    })
    .otherwise({ redirectTo: '/' });
});

meanApp.controller('appCtrl', function($http) {
    var apc = this;
    var url = "http://localhost:3030";

    apc.thingsFromMongo = [];

    apc.submit = function(thing){
      console.log('apc submited');
       $http.post(url + '/add', {thingInput: thing})
       .then(function(response) {
            console.log("Server response ");
            apc.respost = response.data.a;
        });
       /*.success(function(data, status, headers, config){
        apc.respost = data;
       })
       .error(function(data, status, headers, config){
        apc.respost = status;
      });*/



    }



});



meanApp.controller('townCtrl', function($http) {
    var town = this;
    var url = "http://localhost:3030";

    town.townButtonClick = function(townItem){
      debugger;
      console.log('town button clicked');
       $http.post(url + '/townAdd', {townItemClient: townItem})
       .then(function(response) {
            console.log("Server response ");
            town.responsePost = response.data.townA;
        });
    }


});



meanApp.service('mongoDb', function($http) { debugger;
    var self = this;
    var url = "http://localhost:3030";

    self.getRecord = function () {
      console.log('Get record from mongodb');
      return $http.post(url + '/getRecord', {action: 'getRecord'})
       .then(function(response) {

            console.log("Server response");debugger;
            return response.data.responseAction;

      });
    }

    self.addRecord = function(recordInput){
      console.log('Add record to mongodb');
      return $http.post(url + '/addRecord', {action: 'addRecord', recordAddClient: recordInput})
       .then(function(response) {
            console.log("Server response");
            //self.responseAction = response.data.responseAddRecord;
            //self.getAllDataDb();
            return response.data.responseAction;
      });
    }

    self.removeRecord = function(recordId){debugger;
      console.log('Remove record from mongodb');
      return $http.post(url + '/removeRecord', {action: 'removeRecord', recordRemoveClient: recordId})
       .then(function(response) {
            console.log("Server response");
            //self.responseAction = response.data.responseAddRecord;
            //self.getAllDataDb();
            return response.data.responseAction;
      });
    }

    self.updateRecord = function(id,val){debugger;
      console.log('Update record from mongodb');
      return $http.post(url + '/updateRecord', {action: 'updateRecord', recordUpdateClient: {'id':id,'val':val} })
       .then(function(response) {
            console.log("Server response");
            //self.responseAction = response.data.responseAddRecord;
            //self.getAllDataDb();
            return response.data.responseAction;
      });
    }

});

meanApp.controller('listCtrl', function($http, mongoDb) {
    var self = this;
    var url = "http://localhost:3030";


    self.getAllDataDb = function(){ debugger;
      mongoDb.getRecord().then(function(data){
          self.items = data;
       });
       debugger;
    }



    /*
    self.getAllDataDb = function(){

      console.log('Get record from mongodb');
      $http.post(url + '/getAllRecord', {recordAddClient: self.recordInput})
       .then(function(response) {
            console.log("Server response");
            self.responseAction = response.data.responseAddRecord;
      });

    }
    */

    self.addRecord = function(){

      console.log('Add record button clicked');
      mongoDb.addRecord(self.recordInput).then(function(data){debugger;
          self.items = data;
       });
       debugger;
      /*
      $http.post(url + '/addRecord', {recordAddClient: self.recordInput})
       .then(function(response) {debugger;
            console.log("Server response");
            //self.responseAction = response.data.responseAddRecord;
            //self.getAllDataDb();
            self.items = response.data.responseAction;
      });
      */
    }



    self.removeRecord = function(id){ debugger;
      console.log('Remove record button clicked');
      mongoDb.removeRecord(id).then(function(data){debugger;
          self.items = data;
       });
       debugger;
    }


    self.updateRecord = function(id,val){ debugger;
      console.log('Update record button clicked');
      mongoDb.updateRecord(id,val).then(function(data){debugger;
          self.items = data;
       });
       debugger;
    }


    self.getInitItem = function(item){debugger;
      return item;
    }


});

meanApp.directive('todoLine',function(){
  return {
    restrict : "A",
    scope: false,
    transclude: true,
    //templateUrl: 'todoLineTemplate.html'
    template: '<td>{{item.item}}</td><td><button type="button" class="btn btn-default" ng-click="list.removeRecord(item.id)">Remove</button></td>'    
  }
});

