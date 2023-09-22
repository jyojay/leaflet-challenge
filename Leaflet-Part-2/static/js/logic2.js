// Storing our API endpoint as queryUrl.
//let queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
//let queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&endtime=2021-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
let tectonicplatesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Performing a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(data.features);
    console.log(data.features);
});

function createFeatures(earthquakeData) {

  // Defining a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><p><b>Magnitude:</b> ${feature.properties.mag}; <b>Depth:</b> ${feature.geometry.coordinates[2]} Km</p>`);
  }

  // Creating a GeoJSON layer that contains the features array on the earthquakeData object.
  // Running the onEachFeature function once for each piece of data in the array.
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function(feature, latlng) {
      color = markerColour(feature.geometry.coordinates[2]);
      
      var geojsonMarkerOptions = {
        radius: markerSize(feature.properties.mag),
        fillColor: color,
        color: "black",
        weight: 1,
        opacity: 1,
        fillOpacity: 1
      };
      return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  });
  // Sending earthquakes layer to the createMap function
  createMap(earthquakes);
}

// A function to determine the marker size based on the magnitude of earthquake
function markerSize(magnitude) {
    return magnitude * 2;
  }
// A function to determine the marker colour based on the depth of earthquake  
function markerColour(depth){
  if (depth<=10){
    colour = "#FF8A65";
  }
  else if(depth<=30){
    colour = "#FF5722";
  }
  else if(depth<=50){
    colour = "#BF360C";
  }
  else if(depth<=70){
    colour = "#8D6E63";
  }
  else if(depth<=90){
    colour = "#6D4C41";
  }
  else {
    colour = "#3E2723";
  }
  return colour;
  }

  //createMap function
  function createMap(earthquakes) {
    // Creating the base layers.
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // Creating layer groups:for earthquake markers.
    let earthquake = L.layerGroup(earthquakes);

    // Create layer for tectonic plates
    let tectonicPlates = new L.layerGroup();

    // Perform a GET request to the tectonicplatesURL
    d3.json(tectonicplatesUrl).then(function (plates) {

      // Console log the data retrieved 
      console.log(plates);
      L.geoJSON(plates, {
          color: "yellow",
          weight: 2
      }).addTo(tectonicPlates);
  });
  
    // Creating a baseMaps object.
    let baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
  
    // Creating an overlay object.
    let overlayMaps = {
      Earthquakes: earthquakes,
      'Tectonic Plates': tectonicPlates

   };
  
    // Defining a map object.
    let myMap = L.map("map", {
      center: [28, 2],
      zoom: 2.8,
      layers: [street, earthquakes]
    });
  
    // Set up the legend.
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      let div = L.DomUtil.create("div", "info legend")
      let depth = [-10, 10, 30, 50, 70, 90];
      let labels =[];

      div.innerHTML += "<h3 style='text-align: center'>Depth</h3>"
       
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < depth.length; i++) {
        div.innerHTML +=
            '<i style="background-color:' + markerColour(depth[i]+1) + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
            depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
      }

      return div;
    };

    legend.addTo(myMap);

    // Passing map layers to layer control.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
   }).addTo(myMap);

  } 


