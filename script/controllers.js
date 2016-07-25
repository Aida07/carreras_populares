var findRoute = function (array, id) {
	for(var i=0; i<array.length; i++){
		if(array[i].id == id) {
			return array[i];
			break;
		};
	};
};

var insertMarker = function(data) { 
  var markers = []; 
  $.each(data, function(i, obj) {
    var icons = {"Carrera": 'img/logo_run.png' , "Bici": 'img/logo_bici.png', "Natacion": 'img/logo_swim.png'}
    var marker = new google.maps.Marker({
      title: obj.name,
      position: new google.maps.LatLng(obj.coords.lat, obj.coords.lng),
      map: map,
      tipo: obj.type,
      icon: icons[obj.type],
      animation: google.maps.Animation.DROP
    
    });
    markers.push(marker);
   
  });
  return markers; 
};

var insertInfo = function(data) {
  var infowindows = [];
  $.each(data, function(i, obj){
  var infowindow = new google.maps.InfoWindow({
      content: '<h3>'+ obj.name + '</h3>' + 'Lugar: '+ obj.place + '<br>' + obj.date + '<br>' + obj.start + '<br>' + '<a target="_blank" href='+ obj.web +'>'+ 'Accede a la web' + '</a>' + '<br>' + '<img id="col" src='+ obj.img + '>',
      maxWidth: 200
    });
    infowindows.push(infowindow);
  });
  return infowindows;
};

var insertBoth = function(data){
  var marker = insertMarker(data);
  var infowindow = insertInfo(data);
  for( var i = 0; i < marker.length; i++ ) {
    google.maps.event.addListener(marker[i],'click', (function (marker, i) {
      return function(){
        //infowindow[i].open(map, marker); 
        //infoContent(infowindow[i]);
        document.getElementById('route-map').innerHTML = infowindow[i].content;
      }
    })(marker[i], i)); 
  };
};

/*var insertRoute = function (data) {
  var routes = [];
  $.each(data, function(i, obj){
    var directionsService = new google.maps.DirectionsService; 
    var directionsDisplay = new google.maps.DirectionsRenderer({map:map2});
    directionsDisplay.setMap(map2); 
    var ruta = directionsService.route({
      origin: new google.maps.LatLng(obj.origin.lat , obj.origin.lng),
      destination: new google.maps.LatLng(obj.destination.lat, obj.destination.lng),
      travelMode: google.maps.TravelMode.WALKING 
    }, function(response, status) {
        if(status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          } else {
          window.alert("Directions request failed due to" + status);
          };
        });
    routes.push(ruta);  
  })
 return routes;
};*/
function indexController (){};

function index1Controller ($scope, $http){
	var ENDPOINT = "./data/places.json";
 	$http.get(ENDPOINT).then(function(response){
    var items = response.data;  
    $scope.points = response.data;
	});

  $scope.query = {};    
     $scope.setQuery = function(parameter) {
       if ($scope.query[parameter]) {
          delete $scope.query[parameter]
       } else {
          $scope.query[parameter] = true;
         }
     }
};

function showController ($scope, $routeParams, $http){
	var ENDPOINT = "./data/places.json";
	var point_id = $routeParams.pointId;
 	$http.get(ENDPOINT).$q.then(function(response){
    var items = response.data;  
    $scope.point = findRoute(items, point_id);
	});
};

function mapController ($scope, $http) {
  var ENDPOINT = "./data/places.json";
  $http.get(ENDPOINT).then(function(response){
    var items = response.data;  
    $scope.points = response.data;
    $scope.items = insertMarker(items); 
    $scope.windows = insertBoth(items);
    });
};


             
(function (){                              
	angular.module("myApp.controllers", []) 
	.controller('indexController', indexController)	
	.controller('index1Controller', index1Controller)
	.controller('showController', showController)
	.controller('mapController', mapController)
	
})();