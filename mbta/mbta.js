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

      // Render polyline and info window onclick
      myLoc.addListener('click', function(){
        var shortestDistance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(position.coords.latitude,position.coords.longitude), new google.maps.LatLng(42.284652,-71.06448899999999));
        for (var i = 0; i < tstops.length; i++)
        {
          var stop = tstops[i];
          var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(position.coords.latitude,position.coords.longitude), new google.maps.LatLng(stop[1], stop[2]));
          if (distance <= shortestDistance){
            shortestDistance = distance;
            var nearest = stop[0];
            var nearestlat = stop[1];
            var nearestlng = stop[2];
          }
        }

        //Render polyline from curr loc to nearest t stop
        var nearestPathCoords = [
          {lat: position.coords.latitude, lng:position.coords.longitude},
          {lat: nearestlat, lng: nearestlng}
        ];
        var nearestPath = new google.maps.Polyline({
          path: nearestPathCoords,
          geodesic: true,
          strokeColor: '#0000CD',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        nearestPath.setMap(map);

        // Set up info window
        infoWindow = new google.maps.InfoWindow;
        infoWindow.setPosition(new google.maps.LatLng(position.coords.latitude +.01, position.coords.longitude));
        infoWindow.setContent("<p>"+'Nearest MBTA Station: ' + nearest + "<br />"+ 'Distance: ' + shortestDistance*0.000621371 + ' mi' + "</p>");
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

  var sstat = new google.maps.Marker({
  position: {lat:42.352271, lng: -71.05524200000001},
  icon: image,
  shape: shape,
  map: map,
  title: 'South Station'
});

var andrw = new google.maps.Marker({
  position: {lat:42.330154, lng:-71.057655},
  icon: image,
  shape: shape,
  map: map,
  title: 'Andrew'
});

var portr = new google.maps.Marker({
  position: {lat: 42.3884, lng: -71.11914899999999},
  icon: image,
  shape: shape,
  map: map,
  title: 'Porter'
});

var harsq = new google.maps.Marker({
  position: {lat:42.373362, lng:-71.118956},
  icon: image,
  shape: shape,
  map: map,
  title: 'Harvard'
});

var jfk = new google.maps.Marker({
  position: {lat:42.320685, lng:-71.052391},
  icon: image,
  shape: shape,
  map: map,
  title: 'jfk'
});

var shmnl = new google.maps.Marker({
  position: {lat:42.31129, lng:-71.053331},
  icon: image,
  shape: shape,
  map: map,
  title: 'Savin Hill'
});

var pktrm = new google.maps.Marker({
  position: {lat:42.35639457, lng:-71.0624242},
  icon: image,
  shape: shape,
  map: map,
  title: 'Park'
});

var brdwy = new google.maps.Marker({
  position: {lat:42.342622, lng:-71.056967},
  icon: image,
  shape: shape,
  map: map,
  title: 'Broadway'
});

var nqncy = new google.maps.Marker({
  position: {lat: 42.275275, lng:-71.029583},
  icon: image,
  shape: shape,
  map: map,
  title: 'North Quincy'
});

var smmnl = new google.maps.Marker({
  position: {lat:42.29312583, lng: -71.06573796000001},
  icon: image,
  shape: shape,
  map: map,
  title: 'Shawmut'
});

var davis = new google.maps.Marker({
  position: {lat:42.39674, lng: -71.121815},
  icon: image,
  shape: shape,
  map: map,
  title: 'Davis'
});

var alfcl = new google.maps.Marker({
  position: {lat: 42.395428, lng:-71.142483},
  icon: image,
  shape: shape,
  map: map,
  title: 'Alewife'
});

var knncl = new google.maps.Marker({
  position: {lat:42.36249079, lng:-71.08617653},
  icon: image,
  shape: shape,
  map: map,
  title: 'MIT'
});

var chmnl = new google.maps.Marker({
  position: {lat:42.361166, lng:-71.070628},
  icon: image,
  shape: shape,
  map: map,
  title: 'Charles MGH'
});

var dwnxg = new google.maps.Marker({
  position: {lat:42.355518, lng:-71.060225},
  icon: image,
  shape: shape,
  map: map,
  title: 'Downtown Xing'
});

var qnctr = new google.maps.Marker({
  position: {lat:42.251809, lng:-71.005409},
  icon: image,
  shape: shape,
  map: map,
  title: 'Quincy Center'
});

var qamnl = new google.maps.Marker({
  position: {lat:42.233391, lng:-71.007153},
  icon: image,
  shape: shape,
  map: map,
  title: 'Quincy Adams'
});

var wlsta = new google.maps.Marker({
  position: {lat:42.2665139, lng: -71.0203369},
  icon: image,
  shape: shape,
  map: map,
  title: 'Wollaston'
});

var fldcr = new google.maps.Marker({
  position: {lat:42.300093, lng: -71.061667},
  icon: image,
  shape: shape,
  map: map,
  title: 'Fields Corner'
});

var cntsq = new google.maps.Marker({
  position: {lat:42.365486, lng:-71.103802},
  icon: image,
  shape: shape,
  map: map,
  title: 'Central Sq'
});

var brntn = new google.maps.Marker({
  position: {lat:42.2078543, lng:-71.0011385},
  icon: image,
  shape: shape,
  map: map,
  title: 'Braintree'
});

  /*for (var i = 0; i < tstops.length; i++) {
    var stop = tstops[i];
    var marker = new google.maps.Marker({
      position: {lat: stop[1], lng: stop[2]},
      map: map,
      icon: image,
      shape: shape,
      title: stop[0],
    });
  }*/
}








