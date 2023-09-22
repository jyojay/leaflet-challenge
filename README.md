# leaflet-challenge

## Module 15 - Mapping Challenge
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.
In this challenge, we were tasked with developing a way to visualise USGS data that will allow them to better educate the public and other government organisations (and hopefully secure more funding) on issues facing our planet.

**Part 1: Creating the Earthquake Visualisation**
The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visiting the USGS GeoJSON Feed `https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php` page, chose  'All Earthquakes from the Past 7 Days' to visualise. Using Leaflet, created a map that plots all the earthquakes from the dataset based on their longitude and latitude. The data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by colour. Earthquakes with higher magnitudes appear larger, and earthquakes with greater depth appear darker in colour on the map. Also included popups that provide additional information about the earthquake when its associated marker is clicked along with a legend that provides context for the map data.

**Part 2: Gather and Plot More Data**
Plotted a second dataset on the map to illustrate the relationship between tectonic plates and seismic activity alongside the original data using dataset on tectonic plates found at `https://github.com/fraxen/tectonicplates`

**Repository Folders and Contents:**
- **Leaflet-Part-1/static** - Folder containing Part 1 code and style sheet
    - css
        - `style.css` - Style sheet
    - js
        - `logic1.js` - Javascript code solution for Part 1 
- **Leaflet-Part-2/static** - Folder containing Part 2 code and style sheet
    - css
        - `style.css` - Style sheet
    - js
        - `logic2.js` - Javascript code solution for Part 2
- **index.html** - html code

**Usage Instructions**
- The html code currently points to the file path to Part 2 code and css which includes overall solution for both Part 1 and 2. In order to see solution to just Part 1 on map, please uncomment the relevant file path, commenting out the current file path appropriately.  
  
**Data URL used:**
- `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson`

**Addtional data URL used**
- `https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json`
    
**Deployment Link:**
  - https://jyojay.github.io/leaflet-challenge/
    
**Screen Shots of map generated:**
![image](https://github.com/jyojay/leaflet-challenge/assets/132628129/973e47b1-54bf-49a1-9e61-c5329985fd57)

![image](https://github.com/jyojay/leaflet-challenge/assets/132628129/d5872dbf-19bf-4235-b984-0b96c67dd7de)






