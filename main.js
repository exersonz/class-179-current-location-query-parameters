let latitude, longitude, destination;

$(document).ready(function(){
	alert("Please allow your browser to know your location.");
	initGeolocation();
});

$(function(){
	// navigating to a new page (ar_navigation.html) when the navigate button is clicked
	$("#navigate-button").click(function(){
		window.location.href = `ar_navigation.html?source=${latitude};${longitude}&destination=${destination.lat};${destination.lng}`
	});
});

function initGeolocation(){
	// checking if the geolocation property exists or not
	if(navigator.geolocation){
		// if getCurrentPosition() works properly and is able to get the user’s location, it will call the success() function
		navigator.geolocation.getCurrentPosition(success);
	}
	else{
		alert("Sorry, your browser does not support geolocation services.");
	}
}

function success(position){
	console.log(position);

	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	destination;

	// initializing mapbox
	mapboxgl.accessToken = 'pk.eyJ1IjoiYXBvb3J2ZWxvdXMiLCJhIjoiY2ttZnlyMDgzMzlwNTJ4a240cmEzcG0xNyJ9.-nSyL0Gy2nifDibXJg4fTA';

	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [longitude, latitude],
		zoom: 16
	});

	map.addControl(
		new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true
			},
			trackUserLocation: true
		})
	);
	
	map.addControl(
		new MapboxDirections({
			accessToken: mapboxgl.accessToken
		}),
		'top-left'
	);

	// e is an event that contains all the information about the click event that is happening
	// this is an alternative way to write jQuery functions
	map.on('click', function(e){
		console.log(e);

		// getting the destination of place you clicked on the map (lng, lat)
		destination = e.lngLat;
	});
}

 