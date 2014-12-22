var myModule = angular.module('myModule', []);
myModule.factory('mySharedService', function($rootScope) {
    var sharedService = {
	message:'',
	prepForBroadcast:function(msg) {
        this.message = msg;
        this.broadcastItem();
    },
	broadcastItem:function() {
        $rootScope.$broadcast('handleBroadcast');
    }	
	};   
   //this will also work fine as also an object!!!!
   /*  sharedService.message = '';
    sharedService.prepForBroadcast = function(msg) {
        this.message = msg;
        this.broadcastItem();
    };

    sharedService.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    }; */

    return sharedService;
});

myModule.controller('ControllerZero',function ControllerZero($scope, mySharedService) {
    $scope.handleClick = function(msg) {
        mySharedService.prepForBroadcast(msg);
    };
        
    $scope.$on('handleBroadcast', function() {
        $scope.message = 'Zero: ' + mySharedService.message;
    });        
});

myModule.controller('ControllerOne',function ControllerOne($scope, mySharedService) {
    $scope.$on('handleBroadcast', function() {
        $scope.message = 'ONE: ' + mySharedService.message;
    });        
});

myModule.controller('ControllerTwo',function ControllerTwo($scope, mySharedService) {
    $scope.$on('handleBroadcast', function() {
        $scope.message = 'TWO: ' + mySharedService.message;
    });
});
//Promise Example!!!!

myModule.controller('ControllerForPromise',function ControllerTwo($scope, $q) {
  $scope.addOne = function(num){
  var q = $q.defer();
  if(angular.isNumber(num)){
  q.resolve(num+1)
  }
  else{
  q.reject('NaN')
  }
  return q.promise
  
  }
$scope.CallAddOne = function(numCall){
$scope.addOne(numCall).then(function(res){
 return $scope.addOne(res)},
function(res){
return $scope.addOne(res)}
).then(function(res){
$scope.message=res},
function(res){
$scope.message=res})
};
  
});

//setTimeOut()function
myModule.controller('ControllerForPromiseWithSetTimeout',function ControllerTwo($scope, $q) {
 $scope.step = 0;
 $scope.addOne = function(num){
  $scope.step++;
  var q = $q.defer();
  if(angular.isNumber(num)){
  setTimeout(function(){q.resolve(num+1)},1000)
  }
  else{
  q.reject('NaN')
  }
  return q.promise
  
  }
$scope.CallAddOne = function(numCall){
$scope.addOne(numCall)
.then(function(res){
 return $scope.addOne(res)},
function(res){
return $scope.addOne(res)}
).then(function(res){
 return $scope.addOne(res)},
function(res){
return $scope.addOne(res)}
).then(function(res){
 return $scope.addOne(res)},
function(res){
return $scope.addOne(res)}
).then(function(res){
 return $scope.addOne(res)},
function(res){
return $scope.addOne(res)}
).then(function(res){
$scope.message=res},
function(res){
$scope.message=res})
};
  
})

/* ControllerZero.$inject = ['$scope', 'mySharedService'];        
        
ControllerOne.$inject = ['$scope', 'mySharedService'];

ControllerTwo.$inject = ['$scope', 'mySharedService']; */