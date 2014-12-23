var app = angular.module('appWatch', []);


app.controller('theController',function theController($scope, $http) {
    $scope.getPeople = function(count) {
       $http.jsonp('http://www.filltext.com/?rows='+count+'&fname={firstName}&callback=JSON_CALLBACK')
	   .success(function(data){
	   $scope.people=data
	   })
    };
	$scope.countSelection=10;
	$scope.getPeople($scope.countSelection);
	$scope.$watch('countSelection',function(newValue,oldValue){
	$scope.getPeople(newValue);
	
	})     
});

