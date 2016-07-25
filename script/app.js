
var map = new google.maps.Map(document.getElementById('map'),{
    zoom: 6,
    center: new google.maps.LatLng(40.418132, -3.699943),
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    });

function setConfig($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(true); 
	$routeProvider
	.when('/', {
		controller: 'indexController', 
		templateUrl: './templates/index.html', 
		controllerAs: 'index'
	})
	.when('/filtros', {
		controller: 'index1Controller', 
		templateUrl: './templates/index1.html', 
		controllerAs: 'index1'
	})
	.when('/showRoutes/:pointId', {
		controller: 'showController',
		templateUrl: './templates/show.html',
		controllerAs: 'routes'
	})
};


(function (){
	var app = angular.module("myApp", ['ngRoute', /*'ngMap'*/,'myApp.controllers', 'myApp.directives']);
	app.config(['$locationProvider', '$routeProvider', setConfig]);
	
})();