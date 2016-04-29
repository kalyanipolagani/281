//loading the 'cart' angularJS module
var cart = angular.module('cart', []);
console.log("in angular cart")
//defining the cart controller
cart.controller('cart', function($scope, $http) {
	console.log("in angular cart - 1")
	$scope.addCart = function(data) {
		$scope.itemcode = data;
		console.log("button in angular: "+$scope.itemcode);
		$http({
			method : "POST",
			url : '/addcart',
			data : {
				"item_code" : $scope.itemcode
			}
		}).success(function(data) {
			if (data.statusCode == 401) {
				
				console.log("yes");
			}
			else
				{
				
				console.log("no");
				//window.location.assign("/homepage"); 
				}
		}).error(function(error) {
			console.log("no no");
		});			
	};
	
	
//	updateQty
	
	$scope.updateQty = function(data) {
		$scope.itemcode = data;
		console.log("item code to update: "+$scope.itemcode);
		$http({
			method : "POST",
			url : '/updatecart',
			data : {
				"quantity" : $scope.quantity, 
				"item_code" : $scope.itemcode
			}
		}).success(function(data) {
			if (data.statusCode == 401) {
				
				console.log("yes in update");
			}
			else
				{
				
				console.log("no in update");
				//window.location.assign("/homepage"); 
				}
		}).error(function(error) {
			console.log("no no in update");
		});			
	};
	
	
})
