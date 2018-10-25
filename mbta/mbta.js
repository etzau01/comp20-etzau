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
            var nearest = stop[3];
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
  ['place-sstat', 42.352271, -71.05524200000001, 'South Station'],
  ['place-andrw', 42.330154, -71.057655, 'Andrew'],
  ['place-portr', 42.3884, -71.11914899999999, 'Porter'],
  ['place-harsq', 42.373362, -71.118956, 'Harvard Square'],
  ['place-jfk', 42.320685, -71.052391, 'JFK'],
  ['place-shmnl', 42.31129, -71.053331, 'Savin Hill'],
  ['place-pktrm', 42.35639457, -71.0624242, 'Park St'],
  ['place-brdwy', 42.342622, -71.0569672, 'Broadway'],
  ['place-nqncy', 42.275275, -71.029583, 'North Quincy'],
  ['place-smmnl', 42.29312583,-71.06573796000001, 'Shawmut'],
  ['place-davis', 42.39674, -71.121815, 'Davis'],
  ['place-alfcl', 42.395428, -71.142483, 'Alewife'],
  ['place-knncl', 42.36249079, -71.08617653, 'MIT'],
  ['place-chmnl', 42.361166, -71.070628, 'Charles MGH'],
  ['place-dwnxg', 42.355518, -71.06022, 'Downtown Crossing'],
  ['place-qnctr', 42.251809, -71.005409, 'Quincy Center'],
  ['place-qamnl', 42.233391, 71.007153, 'Quincy Adams'],
  ['place-asmnl', 42.284652, -71.06448899999999, 'Ashmont'],
  ['place-wlsta', 42.2665139, -71.0203369, 'Wollaston'],
  ['place-fldcr', 42.300093, -71.061667, 'Fields Corner'],
  ['place-cntsq', 42.365486, -71.103802, 'Central Sq'],
  ['place-brntn', 42.2078543, -71.0011385, 'Braintree']
];

function setMarkers(map) {
  var image = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    size: new google.maps.Size(20, 32),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 32)
  };
  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };

  for (var i = 0; i < tstops.length; i++) {
        //Place a marker at each stop
        stop = tstops[i];
        var marker = new google.maps.Marker({
          position: {lat: stop[1], lng: stop[2]},
          map: map,
          icon: image,
          shape: shape,
          title: stop[3],
        });
      
        // When marker is clicked, info window shows resulting JSON content  
        marker.addListener('click', function(){
          request = new XMLHttpRequest();
          var key =  "5d139598cb69481eb0ec0c79431ebdd7";
          request.open("GET", "https://api-v3.mbta.com/predictions?filter[route]=Red&filter[stop]=" + 'place-cntsq' + "&page[limit]=10&page[offset]=0&sort=departure_time&api_key="+ key, true);
          
          //load json messages for each stop
          request.onreadystatechange = function() 
          {
            if (request.readyState == 4 && request.status == 200)
            {
              data = request.responseText;
              messages = JSON.parse(data);
              contentText = "<ul>";
              for (k = 1; k < messages.data.length; k++) 
              {
                contentText += "<li> Arrival Time: " + messages.data[k].attributes.arrival_time + "<br />"+ " Departure Time: " + messages.data[k].attributes.departure_time + "</li>";

              }
              contentText += "</ul>";
               infoWindow = new google.maps.InfoWindow;
                infoWindow.setPosition({lat: stop[1]+.01, lng: stop[2]});
                infoWindow.setContent(contentText);
                infoWindow.open(map);
              function callBack(request)
              {
                document.getElementById("map").innerHTML = request.responseText;
              }
            }
          }
          request.send();

          //info windows show contentText 
         
        });
  }

}







