function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 42.352271, lng: -71.05524200000001}
  });

  // check geolocation
  if (navigator.geolocation) {  

    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var myLoc = new google.maps.Marker({
        position: pos,
        map: map,
      });

      myLoc.addListener('click', function(){
        var shortestDistance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(position.coords.latitude,position.coords.longitude), new google.maps.LatLng(42.284652,-71.06448899999999));
        for (var i = 0; i < tstops.length; i++)
        {
          var stop = tstops[i];
          var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(position.coords.latitude,position.coords.longitude), new google.maps.LatLng(stop[1], stop[2]));
          if (distance <= shortestDistance){
            shortestDistance = distance;
            var nearest = stop[0];
            //return;
          }
        }
        infoWindow = new google.maps.InfoWindow;
        infoWindow.setPosition(pos);
        infoWindow.setContent('Closest MBTA Station: ' + nearest);
        infoWindow.open(map);
      });
      map.setCenter(pos);
    }, 
    function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } 

  else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

  setMarkers(map);

  // Coordinates for Polyline
  var linePathCoords = [
    {lat: 42.395428, lng:-71.142483},
    {lat: 42.39674, lng:-71.121815},
    {lat: 42.3884, lng: -71.11914899999999},
    {lat: 42.373362, lng:-71.118956},
    {lat: 42.365486, lng:-71.103802},
    {lat: 42.36249079, lng:-71.08617653},
    {lat: 42.361166, lng:-71.070628},
    {lat: 42.35639457, lng:-71.0624242},
    {lat: 42.355518, lng:-71.06022},
    {lat: 42.352271, lng: -71.05524200000001},
    {lat: 42.342622, lng:-71.0569672},
    {lat: 42.330154, lng: -71.057655},
    {lat: 42.320685, lng: -71.052391},

    {lat: 42.275275, lng:-71.029583},
    {lat: 42.2665139, lng:-71.0203369},
    {lat: 42.251809, lng:-71.005409},
    {lat: 42.233391, lng:-71.007153},
    {lat: 42.2078543, lng:-71.0011385}
  ];

  var forkPathCoords = [
    {lat: 42.320685, lng:-71.052391},
    {lat: 42.31129, lng:-71.053331},
    {lat: 42.300093, lng:-71.061667},
    {lat: 42.29312583,lng:-71.06573796000001},
    {lat: 42.284652, lng:-71.06448899999999}
  ];

  //polyline for stops from Alewife to Braintree
  var linePath = new google.maps.Polyline({
    path: linePathCoords,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  //polyline from JFK to Ashmont
  var forkPath = new google.maps.Polyline({
    path: forkPathCoords,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  linePath.setMap(map);
  forkPath.setMap(map);

}

// Data for the stop markers with name and LatLng 
var tstops = [
  ['sstat', 42.352271, -71.05524200000001],
  ['andrw', 42.330154, -71.057655],
  ['portr', 42.3884, -71.11914899999999],
  ['harsq', 42.373362, -71.118956],
  ['jfk', 42.320685, -71.052391],
  ['shmnl', 42.31129, -71.053331],
  ['pktrm', 42.35639457, -71.0624242],
  ['brdwy', 42.342622, -71.0569672],
  ['nqncy', 42.275275, -71.029583],
  ['smmnl', 42.29312583,-71.06573796000001],
  ['davis', 42.39674, -71.121815],
  ['alfcl', 42.395428, -71.142483],
  ['knncl', 42.36249079, -71.08617653],
  ['chmnl', 42.361166, -71.070628],
  ['dwnxg', 42.355518, -71.06022],
  ['qnctr', 42.251809, -71.005409],
  ['qamnl', 42.233391, 71.007153],
  ['asmnl', 42.284652, -71.06448899999999],
  ['wlsta', 42.2665139, -71.0203369],
  ['fldcr', 42.300093, -71.061667],
  ['cntsq', 42.365486, -71.103802],
  ['brntn', 42.2078543, -71.0011385]
];

function setMarkers(map) {
  var image = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };
  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };
  for (var i = 0; i < tstops.length; i++) {
    var stop = tstops[i];
    var marker = new google.maps.Marker({
      position: {lat: stop[1], lng: stop[2]},
      map: map,
      icon: image,
      shape: shape,
      title: stop[0],
      zIndex: stop[3]
    });
  }
}








/*var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13
    center: {lat: 42.352271, lng: -71.05524200000001},
    mapTypeId: 'roadmap'
  });

  setMarkers(map);
}

var tstops = [
  ['jfk', 42.320685, -71.052391],
  ['shmnl', 42.31129, -71.053331],
  ['pktrm', 42.35639457, -71.0624242],
  ['brdwy', 42.342622, -71.0569672]
];

function setMarkers(map){
  var image = {
    url: 'https://cdn-images-1.medium.com/max/360/1*u_oCmFQK1PvE36p3OzTpzQ.png',
    size: new google.maps.Size(30, 30),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 0)
  };

  for (var i = 0; i < tstops.length; i++) {
    var stop = tstops[i];
    var marker = new google.maps.Marker({
      position: {lat: stop[1], lng: stop[2]},
      map: map,
      icon: image
    });
  }
}
*/




/*var jfk = new google.maps.Marker({
  position: new google.maps.Latlng(42.320685,-71.052391),
  icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/MBTA.svg/768px-MBTA.svg.png',
  map: map
});

var shmnl = new google.maps.Marker({
  position: new google.maps.Latlng(42.31129,-71.053331),
  icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/MBTA.svg/768px-MBTA.svg.png',
  map: map
});

var pktrm = new google.maps.Marker({
  position: new google.maps.Latlng(42.35639457,-71.0624242),
  icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/MBTA.svg/768px-MBTA.svg.png',
  map: map
});

var brdwy = new google.maps.Marker({
  position: new google.maps.Latlng(42.342622,-71.0569672),
  icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/MBTA.svg/768px-MBTA.svg.png',
  map: map
});*/
