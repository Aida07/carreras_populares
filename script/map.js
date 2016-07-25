
var map = new google.maps.Map(document.getElementById('map'),{
    zoom: 6,
    center: new google.maps.LatLng(40.418132, -3.699943),
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    });

var map2 = new google.maps.Map(document.getElementById('map2'),{
    zoom: 10,
    center: new google.maps.LatLng(40.771, -3.699943),
    mapTypeId: google.maps.MapTypeId.TERRAIN,
  });

var insertMarker = function(data) { 
  var markers = []; 
  $.each(data, function(i, obj) {
    var icons = {"Carrera": 'img/running.gif' , "Bici": 'img/bici.png', "Natacion": 'img/SwimmingPool.gif'}
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
      content: obj.name + '<br>' + 'Lugar: '+ obj.place + '<br>' + obj.date + '<br>' + obj.start + '<br>' + '<a href='+ obj.web
       +'>'+ obj.web + '</a>' + '<br>' + '<img id="col" src='+ obj.img + '>',
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

var insertRoute = function (data) {
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

/*var infoContent = function(obj){

   var map2 = new google.maps.Map(document.getElementById('route-map'),{
      zoom: 10,
      center: new google.maps.LatLng(40.771, -3.699943),
      mapTypeId: google.maps.MapTypeId.TERRAIN,
    });
  document.getElementById('info-content').innerHTML = obj.content; // ACCEDER AL DOM Y CAMBIANDO EL HTML INTERNO.
};*/

};



/*function setConfig($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true); 
  $routeProvider
  .when('/templates/index.html',{
    controller: 'indexController', 
    templateUrl: './templates/cards.html',
    controllerAs: 'index'
  })
  .when('/templates/index.html/showRoutes/:routeId', {
    controller: 'showController',
    templateUrl: './templates/show.html',
    controllerAs: 'routes'
  })
};
 */

/*function showController ($scope, $routeParams, $http){
  var routeId = $routeParams.routeId;
   $http.get(ENDPOINT).then(function(response){
    var items = response.data;  
    $scope.points = findRoutes(items, routeId);
});
};*/

function mapController ($scope, $http) {
  var ENDPOINT = "./data/places.json";
  $http.get(ENDPOINT).then(function(response){
    var items = response.data;  
    $scope.points = response.data;
    $scope.items = insertMarker(items); 
    //$scope.infos = insertInfo(cocos);
    $scope.windows = insertBoth(items);
    //$scope.routes = insertRoute(items);
    });
};


(function(){
	var app2 = angular.module("myApp", []);
	app2.controller('mapController', mapController)
  //app.controller('showController', showController)

})();