function createMap(earthQuakes) {

    // Create the tile layer that will be the background 
    var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", 
      attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: API_KEY
    });
  
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Light Map": lightmap
    };
  
    // Create an overlayMaps object to hold the earthquakes layer
    var overlayMaps = {
      "Earthquakes": earthQuakes
    };
  
    // Create the map object with options
    var map = L.map("map-id", {
      center: [35.3733, -119.0187], //(Bakersfield, CA coordinates)
      zoom: 12,
      layers: [lightmap, earthQuakes]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  
  function createMarkers(response) {
  
    // Pull the "quakes" property off of response.data
    var quakes = response.data.quakes;
  
    // Initialize an array to hold earthquake markers
    var quakeMarkers = [];
  
    // Loop through the quakes array
    for (var index = 0; index < quakes.length; index++) {
      var quake = quakes[index];
  
      // For each earthquake, create a marker and bind a popup with the earthquakes [time? richter scale rating?]
      var quakeMarker = L.marker([quake.lat, quake.lon])
        .bindPopup("<h3>" + quake.name + "<h3><h3>Capacity: " + quake.capacity + "<h3>");
  
      // Add the marker to the bikeMarkers array
      quakeMarkers.push(quakeMarker);
    }
  
    // Create a layer group made from the quake markers array, pass it into the createMap function
    createMap(L.layerGroup(quakeMarkers));
  }
  
  
  // Perform an API call to the geojson to get station information. Call createMarkers when complete
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson", createMarkers);
  