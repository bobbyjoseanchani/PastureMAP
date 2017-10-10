'use strict';

angular.module('paddockApp.createPaddock', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/createPaddock', {
    templateUrl: 'createPaddock/createPaddock.html',
    controller: 'CreatePaddockCtrl'
  });
}])

.controller('CreatePaddockCtrl', ['$scope',function($scope) {
	
	$scope.paddockCoordinates = [];
	
	// Function to add points to the paddock
	$scope.addCoordinate = function (paddock){
		$scope.paddockCoordinates.push({'xcoord':paddock.xcoord, 'ycoord':paddock.ycoord});
		var canvas = document.getElementById("paddockCanvas");
		var ctx = canvas.getContext("2d");	
		ctx.fillStyle = "#ff2626"; // Red color
		ctx.beginPath(); //Start path
		ctx.arc(paddock.xcoord, paddock.ycoord, 3, 0, Math.PI * 2, true); 
		ctx.fill(); // Close the path and fill		
	} 

	// Function to draw a shape
	$scope.drawPaddock = function (){
		var canvas = document.getElementById("paddockCanvas");
		var ctx = canvas.getContext("2d");	
		ctx.fillStyle = "#FF0000";
		ctx.beginPath();
		ctx.strokeStyle="green";		
		ctx.moveTo($scope.paddockCoordinates[0].xcoord, $scope.paddockCoordinates[0].ycoord);
		for(var i = 1; i < $scope.paddockCoordinates.length; i++){
			ctx.lineTo($scope.paddockCoordinates[i].xcoord, $scope.paddockCoordinates[i].ycoord);
		}
		ctx.closePath();
		ctx.stroke();
		//$scope.sortPaddockPoints();
	} 

	$scope.sortPaddockPoints = function (){	
		$scope.paddockCoordinates = $scope.paddockCoordinates.sort(sort_by('xcoord', true, parseInt));
	}
	
	// Function to calculate the area of the paddock given the coordinates of the polygon corners in the right order
	$scope.calcArea = function(){
		var area2add = 0;
		var area2substract = 0;
		for(var i = 0; i < $scope.paddockCoordinates.length; i++){
			var point1 = $scope.paddockCoordinates[i];
			var point2 = {};
			if( i == $scope.paddockCoordinates.length -1){
				point2 = $scope.paddockCoordinates[0];
			} else {
				point2 = $scope.paddockCoordinates[i+1];
			}	
			if(point2.xcoord > point1.xcoord){
				area2add = area2add + (parseInt(point2.ycoord) + parseInt(point1.ycoord))/2*(parseInt(point2.xcoord) - parseInt(point1.xcoord))
			} else {
				area2substract = area2substract + (parseInt(point2.ycoord) + parseInt(point1.ycoord))/2*(parseInt(point1.xcoord) - parseInt(point2.xcoord))
			}
		}
		$scope.paddockArea = Math.abs(area2add - area2substract)/100;	
	}
	
	$scope.clearPaddock = function (){	
		var canvas = document.getElementById("paddockCanvas");
		var ctx = canvas.getContext("2d");	
		ctx.clearRect(0, 0, canvas.width, canvas.height); 
	}
	
	var sort_by = function(field, reverse, primer){
		var key = primer ? 
		   function(x) {return primer(x[field])} : 
		   function(x) {return x[field]};

		reverse = !reverse ? 1 : -1;

		return function (a, b) {
		   return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
		} 
	}	
	
}]);