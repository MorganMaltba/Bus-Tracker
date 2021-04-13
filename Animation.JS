mapboxgl.accessToken = 'pk.eyJ1IjoibWFsdGJhbW9yZ2FuIiwiYSI6ImNrbjhhNWliNjB2eGEybm4xZ3hkdWMwNzUifQ.O01WSPe2Vk-KQAj_1n4PrA'
// Access token for mapbox.

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: ([-71.104081, 42.357575]),
	zoom: 13
});
// Creates a map in the div element 'map'.

async function run() {
// This function will run repeatedly to add and remove markers as the bus positions update.
    
	const locations = await getBusLocations();
    // Captures the response from getBusLocation.

	console.log(new Date());
	console.log(locations);
    // Logs the data and data captured in the locations variable.

	locations.forEach( (bus) => {
		var marker = addMarker(bus)	
	});
    // Creates a marker for each bus in the locations data array.
        // See addMarker for details.

	setTimeout(run, 15000);
    // Sets a timer to call on itself repeatedly every 15s.

    setTimeout(removeMarkers, 15000);
    // Sets a timer to call on function that removes existing markers every 15s.
        // See removeMarkers for details.

};


var markers = [];
// This array will hold all of the generated markers.

function addMarker (bus) {
// Creates a new marker element, sets the longitude and latitude, and adds it to the map.

	var marker = new mapboxgl.Marker()
	    .setLngLat([bus.attributes.longitude, bus.attributes.latitude])
		.addTo(map)
    
	markers.push(marker);
    // Pushes the newly generated marker element into the markers array.

};

function removeMarkers (marker) {
// Steps through the markers array and removes each marker element.

    markers.forEach ( marker => {
    marker.remove()
    });

};

async function getBusLocations(){
    // Requests bus data from the MBTA

	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    // Handle for MBTA url

	const response = await fetch(url);
    // Captures the response from fetching the URL

	const json     = await response.json();
    // Captures the JSON data from the fetched response.

	return json.data;
    // Returns the JSON data.
};

run();
// Calls the run function.