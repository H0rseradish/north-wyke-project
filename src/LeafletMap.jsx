export default function LeafletMap() {
    // console.log('working');

    //docs: https://leafletjs.com/reference.html
    //initialize the map and set chosen view to geographical coordinates, plus a zoom level:
    var map = L.map('map').setView([50.740801, -3.937569], 12);

    //add the actual tile layer (check usage policies for prod at: https://operations.osmfoundation.org/policies/tiles/)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Adding a marker (flag)
    var marker = L.marker([50.769484, -3.901724]).addTo(map);

    // Add a circle:
    // var circle = L.circle([50.770014, -3.90358], {
    //     color: 'red',
    //     fillColor: '#f03',
    //     fillOpacity: 0.2,
    //     radius: 1100
    // }).addTo(map);

    // Adding a polygon:
    var polygon = L.polygon([
        [50.691238, -4.05],
        [50.713852, -3.941345],
        [50.607646, -3.823242],
        [50.436516, -3.900146],
        [50.518666, -4.007263]
    ]).addTo(map);

    // popups can bind to shapes etc:
    marker.bindPopup("<p>North Wyke Farm Platform</p>").openPopup();
    // circle.bindPopup("North Wyke location");
    polygon.bindPopup("Dartmoor");

    // can also be standalone (note openOn()) 
    // var popup = L.popup()
    //     .setLatLng([50.749328, -3.909931])
    //     .setContent("I am a standalone popup.")
    //     .openOn(map);

    // dealing with events:
    // function onMapClick(e) {
    //     alert("You clicked the map at " + e.latlng);
    // }
    // map.on('click', onMapClick);

    var popup = L.popup();

    // make a popup on the event
    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }

    map.on('click', onMapClick);


    //ok this works now:
    fetch('./geojson/epsg/fields_fenced_area_epsg4326.geojson')
        .then(response => response.json())
        .then(geojsonData => {
            // console.log(geojsonData)
        L.geoJSON(geojsonData).addTo(map);
        });

    // fetch('static/fields-fenced-area.geojson')
    // .then(function(result) {
    //     result.json().then(function(json) {
    //         console.log(json)
    //     })

    // }).catch(function(e) {
    //     console.log(e)
    // });

    //debugging with this to work out out what I had done wrong:
    // fetch('./fields_fenced_area_epsg4326.geojson')
    //     .then(response => response.text())  // Read the response as text
    //     .then(text => {
    //         console.log(text);  // Log the raw response
    //         const geojsonData = JSON.parse(text);  // Parse the text manually
    //         L.geoJSON(geojsonData).addTo(map);
    //     })
    //     .catch(err => console.error("Error loading GeoJSON:", err));
    return <div id="map"></div>
}

