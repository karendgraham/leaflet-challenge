// function createMap(earthQuakes)
//  {

  var myMap = L.map("map", {
    center: [35.3733, -119.0187], //Bakersfield, CA coordinates
    zoom: 8
  });

    // Create the tile layer that will be the background 
    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", 
      {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
      }
      ).addTo(myMap);

    //var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson" (Moved this down, but still doesn't work)

    

  //   // Create a baseMaps object to hold the lightmap layer
  //   var baseMaps = {
  //     "Light Map": lightmap
  //   };
  
  //   // Create an overlayMaps object to hold the earthquakes layer
  //   var overlayMaps = {
  //     "Earthquakes": earthQuakes
  //   };
  
  //   // Create the map object with options
  //   var map = L.map("map-id", {
  //     center: [35.3733, -119.0187], //(Bakersfield, CA coordinates)
  //     zoom: 12,
  //     layers: [lightmap, earthQuakes]
  //   });
  
  //   // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  //   L.control.layers(baseMaps, overlayMaps, {
  //     collapsed: false
  //   }).addTo(map);
  // }
  var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson"

  d3.json(link, function(response)
   { 
      
      // Pull the "quakes" property off of response.data
      var quakes = response.features.length;

      console.log("This is the data", response)
      console.log("quakes", response)
      
      // Initialize an array to hold earthquake markers
      var quakeCircles = [];
      
        //  Loop through the quakes array
        for (var index = 0; index < response.features.length; index++) 
              {
              var quake = quakes[index];
            
              //   For each earthquake, create a marker and bind a popup with the earthquakes [time? richter scale rating?]
              var quakeCircle = L.circle([quake.lat, quake.lon])
                .bindPopup("<h3>" + quake.name + "<h3><h3>Capacity: " + quake.capacity + "<h3>");
            
              //   Add the circle to the bikeCircles array
              quakeCircle.push(quakeCircles);
              }
      
        //  Create a layer group made from the quake markers array, pass it into the createMap function
        //createMap(L.layerGroup(quakeCircles));
  });
  



  /*
  
  Perform an API call to the geojson to get station information. Call createMarkers when complete
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson", createMarkers);
  */
