// function createMap(earthQuakes)
//  {

  var myMap = L.map("map", {
    center: [0, 0], 
    zoom: 2
  });

    // Create the tile layer that will be the background 
    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.streets",
      //accessToken: API_KEY
      accessToken: "pk.eyJ1Ijoia2FyZW5kZ3JhaGFtIiwiYSI6ImNrMnBqYWQ5ZzA0dW4zbW1iMDVld2hhYzUifQ.16bXGk1UQ-1mcXN2HpMPpA"
      //could not get config file to read correctly for the life of me 
    }).addTo(myMap);


    

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
  //var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson"
  var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson"

  d3.json(link, function(response)
   { 
      
      // Pull the "quakes" property off of response.data
   //

      console.log("This is the data", response)
      console.log("quakes", response)
      
      // Initialize an array to hold earthquake markers
      var quakeCircles = [];
      
        //  Loop through the quakes array
        for (var index = 0; index < response.features.length; index++) 
              {
              //var quake = quakes[index];
              var quakeSpot = response.features[index].geometry.coordinates;
              var magnitude = response.features[index].properties.mag;
               
              console.log(magnitude);

            
              //   For each earthquake, create a marker and bind a popup with the earthquakes [time? richter scale rating?]
                L.circle( [quakeSpot[1], quakeSpot[0], ],
                  {
                    fillColor: "red",
                    stroke: false,
                    radius: magnitude*100000
                  })
                  .bindPopup("<h3>" +"magnitude " + magnitude + "<h3><h3> " + "Lat " + quakeSpot[1] + " Lon " + quakeSpot[0] + "<h3>")
                  .addTo(myMap);
              //   Add the circle to the quakeCircles array
              // quakeCircle.push(quakeCircles);
              }
      
        //  Create a layer group made from the quake markers array, pass it into the createMap function
        //createMap(L.layerGroup(quakeCircles));
  });
  



  /*
  
  Perform an API call to the geojson to get station information. Call createMarkers when complete
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson", createMarkers);
  */
